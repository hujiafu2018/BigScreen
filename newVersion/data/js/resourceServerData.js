


var resourceUrl = baseUrl;
 // resourceUrl = 'http://10.2.14.40:8013/'


// 建议提案
var apiProposalCount = 'screen/uirb/proposalCount.html',
// 新闻资讯
apiNewsCount = 'screen/uirb/newsCount.html',
// 政策文件
apiZCCount = 'screen/uirb/zcCount.html',
// 政务公开总量区分
apiGovOpenDataBySiteDatabasesPart = 'screen/iip/govOpenDataBySiteDatabasesPart.html',

apiGovGuideline = 'screen/uirb/govGuideline.html',
// 资源库数据总览
apiUirbDataAll = 'screen/uirb/uirbDataAll.html',
// 清洗数据
apiUirbTypeAutoTagCount = 'screen/uirb/uirbTypeAutoTagCount.html',


// 资源库打标标签总数 ：
apiTagKindsTypes = 'screen/uirb/tagKindsTypes.html',
// 资源库总的标签数量 ：
apiTagKindsCount = 'screen/uirb/tagKindsCount.html',


// 数据库走势图
apiUirbDatabase = 'screen/uirb/uirbDatabase.html';

initResourceServerData()
function initResourceServerData(params) {
    _govGuideline()
    _overview()
    _databaseChart()
    _uirbTypeAutoTagCount()
    _tagKindsTypes()
    _tagKindsCount()
}
//十分钟请求一次真实数据
setInterval(() => {
    initResourceServerData();
}, 10*60*1000)


// 建议提案
function _suggestBill(params) {
    httpRequest(resourceUrl+apiProposalCount).then(function(res) {
        console.log(res, '建议提案')
        res.code === 0 && (RESOURE.frist.mainData[2].num = res.data)
    })
}

// 新闻资讯
function _getNews(params) {
    httpRequest(resourceUrl+apiNewsCount).then(function(res) {
        console.log(res, '新闻资讯')
        res.code === 0 && (RESOURE.frist.mainData[3].num = res.data)
    })
}

// 政务公开总量区分
function _amountGov(params) {
    httpRequest(resourceUrl+apiGovOpenDataBySiteDatabasesPart).then(function(res) {
        if(res.code !== 0) return
        console.log(res.data)
        var num = 0;
        Object.keys(res.data).forEach(function(key) {
            num += res.data[key]
        })
        RESOURE.frist.mainData[0].num = num
    })
}

function _govGuideline(params) {
    httpRequest(resourceUrl+apiGovGuideline).then(function(res) {
        if(res.code !== 0)return
        res = res.data
        var mainData = RESOURE.frist.mainData,counts = Number(res.ZWGK.count) + Number(res.XWZX.count) + Number(res.LDR.count) + Number(res.ZWFW.count)
        mainData[0].num = res.ZWGK.count
        mainData[0].percent = (res.ZWGK.count / counts * 100).toFixed(2)

        mainData[1].num = res.XWZX.count
        mainData[1].percent = (res.XWZX.count / counts * 100).toFixed(2)


        mainData[2].num = res.LDR.count
        mainData[2].percent = (res.LDR.count / counts * 100).toFixed(2)

        mainData[3].num = res.ZWFW.count
        mainData[3].percent = (res.ZWFW.count / counts * 100).toFixed(2)
        initData_1()
        echarts_1()
    })

}
// 资源库数据总览
function _overview(params) {
    httpRequest(resourceUrl+apiUirbDataAll).then(function(res) {
        console.log(JSON.parse(res.data), '资源库数据总览')
        res = JSON.parse(res.data).data.data
        var obj = {
            data: '文本',
            pics: '图片',
            videos:'音视频',
            files: '其他附件'
        },counts = 0;
        res.map(function(item) {
            counts += item.count
        })
        RESOURE.three.storeNum = counts
        res.map(function(item,index) {
            switch(obj[item.type]){
                case '文本': RESOURE.three.mainData[0].num =  item.count;
                            RESOURE.three.mainData[0].percent =  (item.count/counts*100).toFixed(2);
                break;
                case '图片':RESOURE.three.mainData[1].num =  item.count;
                            RESOURE.three.mainData[1].percent =  (item.count/counts*100).toFixed(2);
                break;
                case '音视频':RESOURE.three.mainData[2].num =  item.count;
                            RESOURE.three.mainData[2].percent =  (item.count/counts*100).toFixed(2);
                break;
                case '其他附件': RESOURE.three.mainData[3].num =  item.count;
                                RESOURE.three.mainData[3].percent = (item.count/counts*100).toFixed(2);
                break;
                default:;
            }
        })
        initThree()
        echarts_3()
    })
}

// 数据库走势图
function _databaseChart(params) {
    httpRequest(resourceUrl+apiUirbDatabase).then(function(res) {
        if(res.code !== 0)return
        res = res.data
        var month = JSON.parse(res.month).data.data
        var week = JSON.parse(res.week).data.data
        var year = JSON.parse(res.year).data.data
        var echartData = RESOURE.seccond.echartData,
        weekArrEn = ['SUNDAY', 'MONDAY', 'TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'],
        weekArrZh = ['日', '一', '二','三','四','五','六'];
        week.map(function(item, i) {
            echartData.weekData_x[i] = '星期' + weekArrZh[weekArrEn.findIndex((str) => item.week === str)]
            echartData.weekData_y[i] = item.count
        })
        /*month.map(function(item,i) {
            echartData.monthData_x[i] = (item.day).substring(5).replace('-','/')
            echartData.monthData_y[i] = item.count
        })*/
        const cur_month = (new Date()).getMonth() + 1;
        echartData.monthData_x = [];
        echartData.monthData_y = [];
        year.forEach((item,i) => {
            var _month = parseInt(item.month);
            if (_month < cur_month+1) {
                echartData.monthData_x.push(item.month + '月')
                echartData.monthData_y.push(item.count)
            }
        })
        echarts_2()
        initData_1_dayData()
    })
}

function _uirbTypeAutoTagCount(params) {
    httpRequest(resourceUrl + apiUirbTypeAutoTagCount).then(function(res) {
        if(res.code !== 0 )return
        var mainData = RESOURE.seccond.mainData;
        res = res.data
        mainData[0].num = res.autoTotal
        // mainData[1].num1 = res.typedDayCount
        mainData[1].num1 = res.typedTotal
        // mainData[2].num1 = res.tagDayCount
        mainData[2].num1 = res.tagTotal
        initData_2()
    })
}

function _tagKindsTypes(params) {
    var mainData = RESOURE.seccond.mainData;
    httpRequest(resourceUrl + apiTagKindsTypes).then(function(res) {
        if(res.code !== 0 )return
        mainData[1].num2 = res.data
    })
}


function _tagKindsCount(params) {
    var mainData = RESOURE.seccond.mainData;
    httpRequest(resourceUrl + apiTagKindsCount).then(function(res) {
        console.log(res)
        if(res.code !== 0 )return
        mainData[2].num2 = res.data
    })
}
