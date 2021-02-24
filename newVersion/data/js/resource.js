




// todo  箭头函数
var _stepStart = null, _stepArr = [0,11,23,34,47,61,73,85,98],_stepIndex = 0;
function tjTransform(ele) {  // ele jqdom对象
    if (_stepIndex >= _stepArr.length ) {
        ele.hide()
        clearTimeout()
        return false
    }
    ele.css('top', _stepArr[_stepIndex]/92+'rem')
    ele.show()
    _stepIndex ++
    _stepStart = setTimeout(function() {
        tjTransform(ele)
    }, 1000)
}



// 设置第三阶段的step

/**
 * ele   jq节点对象  整个步骤条的父级容器
 * val   百分比值 0-100的整数  num
*/
function setThreeStep(ele, val) {
    ele.animate({'width': val+'%'},'slow')
}

function initThree() {
    //第三阶段
    getWord('.rk-num-con-three', RESOURE.three.storeNum, String(RESOURE.three.storeNum).length>=8)
    var threeStepArr = RESOURE.three.mainData
    var myArr =  threeStepArr.map(function(item, index) {
        var rendeFather = $($('.three-con-item')[index])
        if (item.num >= 10000) {
            item.num  = (item.num / 10000).toFixed(2) + '万'
        }
        rendeFather.find('div.txt').text(item.num)

        rendeFather.find('span.percent').text(item.percent + '%')
        return item.percent
    })
    myArr.map(function(val,index) {
        setThreeStep($($('.three-step')[index]).find('.step-img'), val)
    })
}

// 第三部数据循环渲染13s
initThree()
setInterval(() => {
    initThree()
    echarts_3()
}, 1000*13);

/**
 * 圆环动画  && 背景高亮
 * ele  jqdom对象
 * className  添加的类字符串
 * val boolen
 */

 function _addClassAn(ele,className, val = true) {
    val ? ele.addClass(className)  : ele.removeClass(className)
 }

 /**
  * 标题划入
  * ele  jq对象
 */
function _titleSlideAn(ele, _t = 100) {
    ele.css('left','-160px')
    ele.animate({left:0}, _t*2)
}
// 阶段二标题划入效果
function _titleSlideDownAn(ele, _t = 100) {
    ele.css('top','-215px')
    ele.animate({top:0}, _t*2)
}


/**
 * 阶段一动画
*/

// _fristAn()
/**
 * 启动 && 撤销阶段一特效
 * _val boolen  true/false  启动/撤销
 * */
// tjTransform($('.first-item .step-jt-warp i'))
function _fristAn(_val = true) {
    _addClassAn($('.first-header .step-wap'), 'step-item-activing', _val);
    _val && tjTransform($('.first-item .step-jt-warp i'))
    _val && _titleSlideAn($('.first-header .rk-title span'), 1000)
    _addClassAn($('.frist-con'),'frist-con-action', _val)
    if (_val) {
        var _arr = $('.frist-main-con-item'),_len = _arr.length
        for(var _i = 0; _i<_len; _i++){
            !function(i) {
                setTimeout(function() {
                    $(_arr[i]).addClass('frist-main-con-item-action').siblings().removeClass('frist-main-con-item-action')
                }, 2000*i)
            }(_i)
        }
    } else {
        $('.frist-main-con-item').removeClass('frist-main-con-item-action')
    }
}

/**
 * 阶段二动画
 * _val  boolen  true/false  启动/撤销
 *
*/
// _seccondAn()
function _seccondAn(_val = true) {
    _addClassAn($('.second-warp .step-wap'), 'step-item-activing', _val);
    _addClassAn($('.right-warp'),'right-warp-action', _val)
    _val && tjTransform($('.second-warp .step-jt-warp i'))
    _val && _titleSlideDownAn($('.second-title p'), 1000)
    _val ? $('.seccond-firth-item').addClass('seccond-firth-item-action') : $('.seccond-firth-item').removeClass('seccond-firth-item-action')

    var _secondDefauItem = $('.second-default-item'), len = _secondDefauItem.length;
    if(_val) {
        for(var _i = 0; _i<len; _i++) {
            !function(i) {
                setTimeout(function() {
                    $('.seccond-firth-item').removeClass('seccond-firth-item-action')
                    $(_secondDefauItem[i]).addClass('second-default-item-action').siblings().removeClass('second-default-item-action')
                }, 2000*(i+1))
            }(_i)
        }
    } else {
        $('.seccond-firth-item').removeClass('seccond-firth-item-action')
        _secondDefauItem.removeClass('second-default-item-action')
    }
}


/**
 * 阶段三动画
 * _val  boolen  true/false  启动/撤销
 *
*/
// _threeAn()
function _threeAn(_val=true) {
    _addClassAn($('.three-item .step-wap'), 'step-item-activing', _val);
    _addClassAn($('.three-con'),'three-con-action', _val)
    _val && tjTransform($('.three-item .step-jt-warp i'))
    _val && _titleSlideAn($('.three-item .rk-title span'), 1000)

    var _secondDefauItem = $('.three-con-item'), len = _secondDefauItem.length;
    if(_val) {
        for(var _i = 0; _i<len; _i++) {
            !function(i) {
                setTimeout(function() {
                    $('.three-con-item').removeClass('three-con-item-action')
                    $(_secondDefauItem[i]).addClass('three-con-item-action').siblings().removeClass('three-con-item-action')
                }, 2000*(i+1))
            }(_i)
        }
    } else {
        $('.three-con-item').removeClass('three-con-item-action')
        _secondDefauItem.removeClass('three-con-item-action')
    }
}

 // d动画启动
_initAn()
setInterval(() => {
    _initAn()
}, 30000);
function _initAn(params) {
    _stepIndex = 0
    _fristAn()
    _threeAn(false)
    setTimeout(function() {
        _stepIndex = 0
        _fristAn(false)
        _seccondAn()
    }, 9500)
    setTimeout(function() {
        _stepIndex = 0
        _seccondAn(false)
        _threeAn()
    }, 20000)
}



// initData_1()
//  10s数据更新
setInterval(() => {
    initData_1()
    echarts_1()
    initData_2()
    initData_1_dayData()
}, 1000*10);


function initData_1_dayData() {
 //  入库量设置
 var weekData_y = RESOURE.seccond.echartData.weekData_y, len = weekData_y.length;
 getWord('.rk-num-con', weekData_y[len-1],String(weekData_y[len-1]).length >= 8)
}
function initData_1() {

     // 设置第一阶段主体数据
     var firstMainData = RESOURE.frist.mainData

    $('.frist-main-con-item').each(function(i,el) {
        $(el).find('span').eq(0).text(firstMainData[i].name)
        $(el).find('span').eq(1).text(firstMainData[i].num)
        $(el).find('span').eq(2).text(firstMainData[i].percent + "%")
        // todo  设置状态
        if (firstMainData[i].status === 0)$(el).find('i').addClass('down')
    })
}


function initData_2(){
    var seccondMainData = RESOURE.seccond.mainData
       //  第二阶段数据
    $('.second-con-wap>div').each(function(i,el) {
        if (i === 0) {
            $(el).find('.con-text span').text(seccondMainData[i].num)
        } else {
            $(el).find('.con-text').find('span').eq(0).text(seccondMainData[i].num1)
            $(el).find('.con-text').find('span').eq(1).text(seccondMainData[i].num2)
        }
    })
}
var _stepTypeArr = ['week','month'],_stepTypeArrIndex = 0;
setInterval(() => {
    if(_stepTypeArrIndex > 1 )(_stepTypeArrIndex = 0)
    echarts_2(_stepTypeArr[_stepTypeArrIndex])
    _stepTypeArrIndex ++
}, 1000*9);

$('.time-type').on('click','span',function() {
    // $(this).addClass('active').siblings().removeClass('active')
    switch($(this).text()){
        case '周': echarts_2('week');break;
        case '月': echarts_2('month');break;
        // case '年': echarts_2('year');break;
        default: ;
    }
})



