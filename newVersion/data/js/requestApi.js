//获取稿件总数
function getGJNums () {
  Api.getGJNums().then(res => {
    let data = JSON.parse(res.data);
    resData.PTFGZL = data.datas.totaldoccount;
    getPTFGZL();//获取稿件总数动画
  }).catch(() => {
    getPTFGZL();//获取稿件总数动画
  })
}
//获取政务公开发稿数
function getGovOpenDataCount (type = 'index') {
  Api.getGovOpenDataCount().then(res => {
    let res_data = res.data;
    for (var key in res_data) {
      if (key == '总量') {
        resData.ZWGKFGZL = res_data[key]
      } else if (key == '市政府') {
        resData.ZC_SZF_Data = res_data[key]
      } else if (key == '区县') {
        resData.ZC_QXZF_Data = res_data[key]
      } else {
        resData.ZC_WBJ_Data = res_data[key]
      }
    }
    if (type == 'index') {
      getZWFGZL();//获取政务公开发稿数动画
    } else {
      //政务公开页面
      getZWZL();//获取政务公开发稿数动画
      echarts_3();//市政府政策解读比例
      echarts_4();//委办局政策解读比例
      echarts_5();//区县政府政策解读比例
    }
  }).catch(() => {
    if (type == 'index') {
      getZWFGZL();//获取政务公开发稿数动画
    } else {
      //政务公开页面
      getZWZL();//获取政务公开发稿数动画
      echarts_3();//市政府政策解读比例
      echarts_4();//委办局政策解读比例
      echarts_5();//区县政府政策解读比例
    }
  })
}
//获取平台访问月总量
function getmpAppSummaryMonth () {
  Api.getmpAppSummaryMonth().then(res => {
    resData.PTFWZL = res.data;
    getFWYZL();//获取平台访问月总量动画
  }).catch(() => {
    getFWYZL();
  })
}
//获取区域访问量
function getMpAppSummary () {
  Api.getMpAppSummary().then(res => {
    let data = res.data, keyArray = [], dataArray = [];
    for (var key in data) {
      keyArray.push(key.substring(0,4))
      dataArray.push(JSON.parse(data[key].Records.webs).PV30)
    }
    //修改地图区域数据
    cityArray.forEach((item, index) => {
      keyArray.forEach((item1,index1) => {
        if (item.mpId == item1) {
          item.value = dataArray[index1]
        }
      })
    });
    //修改地图线条数据
    cityArray.forEach((item, index) => {
      for (var key in mapData0) {
        if (key == item.name) {
          mapData0[key] = dataArray[index]
        }
      }
    })
    echarts_3();//地图
    window.clearInterval(_interValByMap);
    getAreaVisits();//切换区县访问量数据
  }).catch(() => {
    echarts_3();//地图
    window.clearInterval(_interValByMap);
    getAreaVisits();//切换区县访问量数据
  })
}
//平台访问走势——天
function getMpAppSummaryTrend () {
  Api.getMpAppSummaryTrend().then(res => {
    let res_data = res.data, dayData_x = [], dayData_y_pv = [], dayData_y_uv = [], this_week = [];
    for (var i = 0; i> -7;i--) {
      this_week.push(_getDay(i))
      dayData_x.push(_xingqi(-i))
    }
    dayData_x = dayData_x.reverse();
    this_week.reverse().forEach( item => {
      for (var key in res_data) {
        if (key == item) {
          var y_pv_data = res_data[key].PV;
          var y_uv_data = res_data[key].UV;
          dayData_y_pv.push(y_pv_data);
          dayData_y_uv.push(y_uv_data);
        }
      }
    });
    resData.PTFW.dayData_x = dayData_x;
    resData.PTFW.dayData_y_pv = dayData_y_pv;
    resData.PTFW.dayData_y_uv = dayData_y_uv;
  }).then(r => {
    //平台访问走势——小时
    Api.getMpAppSummaryTrendHours().then(res1 => {
      let res_data = res1.data, hourData_x = [], hourData_y_pv = [], hourData_y_uv = [];
      for (var key in res_data) {
        hourData_x.push(key);
        hourData_y_pv.push(res_data[key].PV);
        hourData_y_uv.push(res_data[key].UV);
      }
      resData.PTFW.hourData_x = hourData_x;
      resData.PTFW.hourData_y_pv = hourData_y_pv;
      resData.PTFW.hourData_y_uv = hourData_y_uv;
      echarts_1();
    }).catch(() => {
      echarts_1();
    })
  }).catch(() => {
    echarts_1();
  })
}
//平台发稿走势
function getPublishTrend () {
  Api.getPublishTrend().then(res => {
    let res_data = res.data,
        weekData_x = [],
        weekData_y = [],
        monthData_x = [],
        monthData_y = [],
        yearData_x = [],
        yearData_y = [],
        this_week = [];
    //周x轴数据
    for (var i = 0; i> -7;i--) {
      this_week.push(_getDay(i))
      weekData_x.push(_xingqi(-i))
    }
    weekData_x = weekData_x.reverse();
    //周y轴数据
    res_data.day.slice(0,7).reverse().forEach((item,index) => {
        if (index < this_week.length) {
          weekData_y.push(item.count)
        }
    });
    //月x/y轴数据
    res_data.day.forEach((item,index) => {
      monthData_x.push(item.days.substring(6,10))
      monthData_y.push(item.count)
    });
    //年x/y轴数据
    const cur_month = (new Date()).getMonth() + 1;
    res_data.month.reverse().forEach((item,index) => {
      var _month = parseInt(item.months.substring(5,7));
      if (_month < cur_month+1) {
        yearData_x.push(_month + '月')
        yearData_y.push(item.count)
      }
    });
    resData.ZDFG.weekData_x = weekData_x;
    resData.ZDFG.weekData_y = weekData_y;
    resData.ZDFG.monthData_x = monthData_x;
    resData.ZDFG.monthData_y = monthData_y;
    resData.ZDFG.yearData_x = yearData_x;
    resData.ZDFG.yearData_y = yearData_y;
    echarts_2();
  }).catch(() => {
    echarts_2();
  })
}
//资源库数据总数
function getAllUirbData () {
  Api.getAllUirbData().then(res => {
    let data = JSON.parse(res.data).data.data, nums = 0;
    data.forEach(item => {
      nums+=item.count;
    });
    resData.ZYKZL = nums
    getZYZL();//获取资源库数据总数动画
  }).catch(() => {
    getZYZL();
  })
}
//获取防火墙数据
function getServerStatus () {
  Api.getServerStatus().then(res => {
    let res_data = res.data;
    resData.CPU = res_data.cpuAvgIdle;
    resData.NC = res_data.memoryAvgIdle;
    resData.CP = res_data.sizeAvgIdle;
    resData.LRLC = res_data.cpuAvgIdle;
    resData.LJCS = res_data.webAttackNum ? res_data.webAttackNum : '184256';
    getStepData();//渲染CPU动画
  }).catch(() => {
    getStepData();
  })
}
//获取行政性规范文件数据
function getAdministrativeFile () {
  Api.getAdministrativeFile().then(res => {
    let res_data = res.data, XZGF_SZFB_Data = 0;
    for (var key in res_data) {
      var x_data = key.substring(10, key.length);
      if (x_data == '市政府') {
        XZGF_SZFB_Data += res_data[key]
      } else if (x_data == '市政府办公厅') {
        XZGF_SZFB_Data += res_data[key]
      } else if (x_data == '部门') {
        resData.XZGF_SZFBM_Data = res_data[key]
      } else if (x_data == '区县') {
        resData.XZGF_QXZF_Data = res_data[key]
      } else {
        resData.XZGFZL_Data = res_data[key];
      }
      resData.XZGF_SZFB_Data = XZGF_SZFB_Data;
    }
    getGFWJZL();//获取规范文件总量
    echarts_1();//行政规范文件图表
  }).catch(() => {
    getGFWJZL();//获取规范文件总量
    echarts_1();//行政规范文件图表
  })
}
//获取行政规范文件走势数据——周&月
function getAdministrative () {
  Api.getAdministrativeFileDays().then(res => {
    let res_data = res.data,
        weekData_x = [], weekData_y = [], this_week = [],
        monthData_x = [], monthData_y = [];
    //周x轴数据
    for (var i = 0; i> -7;i--) {
      this_week.push(_getDay(i))
      weekData_x.push(_xingqi(-i))
    }
    weekData_x = weekData_x.reverse();
    //周y轴数据
    res_data.reverse().forEach((item,index) => {
      if (index < this_week.length) {
        weekData_y.push(item.count)
      }
    });
    //月x/y轴数据
    res_data.reverse().forEach((item,index) => {
      monthData_x.push(item.days.substring(6,10))
      monthData_y.push(item.count)
    });
    resData.ZWFW.weekData_x = weekData_x;
    resData.ZWFW.weekData_y = weekData_y;
    resData.ZWFW.monthData_x = monthData_x;
    resData.ZWFW.monthData_y = monthData_y;
    Api.getAdministrativeFileMonth().then(res1 => {
      let res_data = res1.data,
          yearData_x = [], yearData_y = [];
          //年x/y轴数据
      const cur_month = (new Date()).getMonth() + 1;
      res_data.reverse().forEach((item,index) => {
        var _month = parseInt(item.month.substring(5,7));
        if (_month < cur_month+1) {
          yearData_x.push(_month + '月')
          yearData_y.push(item.count)
        }
      });
      resData.ZWFW.yearData_x = yearData_x;
      resData.ZWFW.yearData_y = yearData_y;
      echarts_2();//行政规范发文走势图表
    }).catch(() => {
      echarts_2();//行政规范发文走势图表
    })
  }).catch(() => {
    echarts_2();//行政规范发文走势图表
  })
}
//获取政务公开数据
function getGovOpenData () {
  Api.getGovOpenData().then(res => {
    let res_data = res.data;
    resData.ZWFG_Data_WBJ = res_data.BM;
    resData.ZWFG_Data_QX = res_data.QX;
    window.clearInterval(_interValByRoate);
    window.clearTimeout(_setTimeByRoate);
    roateFun();//圆球旋转动画
  }).catch( ()=> {
    window.clearInterval(_interValByRoate);
    window.clearTimeout(_setTimeByRoate);
    roateFun();//圆球旋转动画
  })
}
//获取政策解读数据
function getPolicyCount () {
  Api.getPolicyAnalyzingCount().then(res => {
    let res_data = res.data, yAxisData = [], seriesData = [], nums = 0;
    res_data.forEach(item => {
      for (var key in item) {
        yAxisData.push(key)
        seriesData.push(item[key])
        nums+=item[key]
      }
    });
    resData.ZCJD_All = nums;
    resData.ZCJD_Data.yAxisData = yAxisData.slice (0, 8).reverse();
    resData.ZCJD_Data.seriesData = seriesData.slice (0, 8).reverse();
    getZCJDZL();//获取政策解读总量动画
    echarts_6();//政策解读排行图表
  }).catch( ()=> {
    getZCJDZL();//获取政策解读总量动画
    echarts_6();//政策解读排行图表
  })
}
//获取主题分类数据
function getThemeDataStat () {
  Api.getThemeDataStat().then(res => {
    let res_data = JSON.parse(res.data).data.data;
    let rea_allData = JSON.parse(res.data).data.dataStat.totalNum;
    res_data.sort(compare('desc', 'data_count'));
    resData.ZWGK_ZTK_List = res_data;
    resData.ZWGK_ZTK_All = rea_allData;
    getZTFL();//主题分类总数
    getThemeList();//渲染主题库列表数据
  }).catch( ()=> {
    getZTFL();//主题分类总数
    getThemeList();//渲染主题库列表数据
  })
}
//获取安全运行天数
function getSafeRun() {
  Api.getSafeRun().then(res => {
    resData.AQYX = res.data;
    getSafeDay();//安全运行动画
  }).catch( ()=> {
    getSafeDay();//安全运行动画
  })
}
