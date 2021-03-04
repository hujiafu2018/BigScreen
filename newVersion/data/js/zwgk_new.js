$(function () {
  IndexData();//初始化所有配置
  /****************定时切换动画逻辑 start**************************/
  setInterval(() => {
    getGFWJZL();//规范文件数量
    echarts_1();//行政规范文件图表
    tabSort();//行政规范文件发文走势图表切换
    echarts_3();//市政府政策解读比例
    echarts_4();//委办局政策解读比例
    echarts_5();//区县政府政策解读比例
    echarts_6();//政策解读排行
    getZWZL();//政务公开总量
    getSZFZWZL();//政务公开发稿总量
    getZTFL();//获取主题分类
    // getZCZL();//政策总量
  },9000)
  /****************定时切换动画逻辑 end**************************/

  /****************定时请求数据逻辑 start**************************/
  setInterval(() => {
    IndexData();
  }, 10*60*1000);
  /****************定时请求数据逻辑 end**************************/
});

var _interValByRoate, _setTimeByRoate;//控制定时器
//初始化所有配置
function IndexData () {
  getAdministrativeFile();//行政规范文件数据及图表
  getAdministrative();//行政规范发文走势图表
  getPolicyCount();//政策解读排行
  getZCJDZL();//获取政策解读总量
  getGovOpenDataCount('zwgk');//政务公开发稿数据及图表
  getThemeDataStat();//主题库列表数据
  getGovOpenData();//圆球旋转动画
  rainBg();//淋雨效果

  // getZTFL();//获取主题分类
  // echarts_6();//政策解读排行
  // getSZFZWZL();//政务公开发稿总量
  // getZCZL();//获取政策总量
}
//行政规范文件发文走势图表切换
function tabSort () {
  resData.clickIndex_zw>1 ? resData.clickIndex_zw = 0 : '';
  changeSort($('.echart-1-btn span').eq(resData.clickIndex_zw)[0]);
  resData.clickIndex_zw ++;
}
//获取规范文件总量
function getGFWJZL () {
  getWord('#xzgfzl',resData.XZGFZL_Data,false);//渲染行政规范总量数字

  // getWord('#xzgf_szf',resData.XZGF_SZF_Data,false);//渲染市政府行政规范文件数量数字

  getWord('#xzgf_szfb',resData.XZGF_SZFB_Data,false);//渲染市政府办公厅行政规范文件数字

  getWord('#xzgf_szfbm',resData.XZGF_SZFBM_Data,false);//渲染市政府部门行政规范文件数字

  getWord('#xzgf_qxzf',resData.XZGF_QXZF_Data,false);//渲染区县政府行政规范文件数字

}
//行政规范文件图表
function echarts_1() {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById('echart-l-t'));

  var dataStyle = {
    normal: {
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      //shadowBlur: 40,
      //shadowColor: 'rgba(40, 40, 40, 1)',
    }
  };
  var placeHolderStyle = {
    normal: {
      color: 'rgba(255,255,255,.05)',
      label: {show: false,},
      labelLine: {show: false}
    },
    emphasis: {
      color: 'rgba(0,0,0,0)'
    }
  };
  const option = {
    color: ['#00d896', '#009fd5', '#007ed5'],
    tooltip: {
      trigger: 'item',
      position: ['20%', '50%'],
      formatter: function(params) {
        if (params.value != 0)
          return params.data.name + "：" + params.data.resdata + ' ('+ params.data.value +'%)';
        else
          return '';
      },
    },
    legend: {
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 12,
      bottom: '0%',
      padding: [5,0,15,0],
      data: ['市政府及市政府办公厅', '市政府部门', '区县政府'],
      textStyle: {
        color: 'rgba(255,255,255,.6)',
      }
    },

    series: [
      /*{
        name: '市政府',
        type: 'pie',
        clockWise: false,
        avoidLabelOverlap: true,//是否启用防止标签重叠策略
        center: ['50%', '42%'],
        radius: ['29%', '40%'],
        itemStyle: dataStyle,
        hoverAnimation: false,
        selectedMode: 'single',
        data: [{
          value: (resData.XZGF_SZF_Data*100/resData.XZGFZL_Data).toFixed(1),
          resdata: resData.XZGF_SZF_Data,
          name: '市政府'
        }, {
          value: 100 - (resData.XZGF_SZF_Data/resData.XZGFZL_Data)*100,
          name: 'invisible',
          tooltip: {show: false},
          itemStyle: placeHolderStyle
        }]
      },*/
      {
        name: '市政府及市政府办公厅',
        type: 'pie',
        clockWise: false,
        center: ['50%', '42%'],
        radius: ['39%', '50%'],
        itemStyle: dataStyle,
        hoverAnimation: false,
        data: [{
          value: (resData.XZGF_SZFB_Data*100/resData.XZGFZL_Data).toFixed(1),
          resdata: resData.XZGF_SZFB_Data,
          name: '市政府及市政府办公厅'
        }, {
          value: 100 - (resData.XZGF_SZFB_Data/resData.XZGFZL_Data)*100,
          name: 'invisible',
          tooltip: {show: false},
          itemStyle: placeHolderStyle
        }]
      },
      {
        name: '市政府部门',
        type: 'pie',
        clockWise: false,
        hoverAnimation: false,
        center: ['50%', '42%'],
        radius: ['49%', '60%'],
        itemStyle: dataStyle,
        data: [{
          value: (resData.XZGF_SZFBM_Data*100/resData.XZGFZL_Data).toFixed(1),
          resdata: resData.XZGF_SZFBM_Data,
          name: '市政府部门'
        }, {
          value: 100 - (resData.XZGF_SZFBM_Data/resData.XZGFZL_Data)*100,
          name: 'invisible',
          tooltip: {show: false},
          itemStyle: placeHolderStyle
        }]
      },
      {
        name: '区县政府',
        type: 'pie',
        clockWise: false,
        hoverAnimation: false,
        center: ['50%', '42%'],
        radius: ['59%', '70%'],
        itemStyle: dataStyle,
        data: [{
          value: (resData.XZGF_QXZF_Data*100/resData.XZGFZL_Data).toFixed(1),
          resdata: resData.XZGF_QXZF_Data,
          name: '区县政府'
        }, {
          value: 100 - (resData.XZGF_QXZF_Data/resData.XZGFZL_Data)*100,
          name: 'invisible',
          tooltip: {show: false},
          itemStyle: placeHolderStyle
        }]
      }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.clear();
  myChart.setOption(option);
  window.addEventListener("resize",function(){
    myChart.resize();
  });
}
//行政规范文件发文走势图表
function echarts_2 (type ='week') {
  let weekData_x = resData.ZWFW.weekData_x,
      weekData_y = resData.ZWFW.weekData_y,
      monthData_x = resData.ZWFW.monthData_x,
      monthData_y = resData.ZWFW.monthData_y,
      yearData_x = resData.ZWFW.yearData_x,
      yearData_y = resData.ZWFW.yearData_y,
      xAxisData, //x轴数据
      yAxisData, //y轴数据
      rotate = 0;//倾斜角度
  if (type == 'month') {
    xAxisData = monthData_x;
    yAxisData = monthData_y;
    rotate = 90;
  } else if (type == 'year') {
    xAxisData = yearData_x;
    yAxisData = yearData_y;
  } else {
    xAxisData = weekData_x;
    yAxisData = weekData_y;
  }
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById('echart-l-b'));
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#dddc6b'
        }
      }
    },
    legend: {
      show: false,
      top:'0%',
      data:['PV','UV'],
      textStyle: {
        color: 'rgba(255,255,255,.5)',
        fontSize:'12',
      }
    },
    grid: {
      left: '10',
      top: '15%',
      right: '10',
      bottom: '10',
      height: '85%',
      containLabel: true
    },

    xAxis: [{
      type: 'category',
      boundaryGap: false,
      axisLabel:  {
        verticalAlign: 'left',
        textStyle: {
          color: "rgba(255,255,255,.6)",
          fontSize:12
        },
        rotate: rotate,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,.2)'
        }

      },

      data: xAxisData

    }, {

      axisPointer: {show: false},
      axisLine: {  show: false},
      position: 'bottom',
      offset: 20,



    }],

    yAxis: [{
      type: 'value',
      axisTick: {show: false},
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,.1)'
        }
      },
      axisLabel:  {
        textStyle: {
          color: "rgba(255,255,255,.6)",
          fontSize:12,
        },
      },

      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,.1)'
        }
      }
    }],
    series: [
      {
        // name: 'PV',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {

          normal: {
            color: '#00d887',
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(0, 216, 135, 1)'
            }, {
              offset: 0.8,
              color: 'rgba(0, 216, 135, 0.1)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
          }
        },
        itemStyle: {
          normal: {
            color: '#00d887',
            borderColor: 'rgba(221, 220, 107, .1)',
            borderWidth: 12
          }
        },
        data: yAxisData

      }

    ]

  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize",function(){
    myChart.resize();
  });
}
//获取政策总量
/*function getZCZL () {
  getWord('#zczl',resData.ZCZL_Data,false);//渲染政策总量数字
}*/
//市政府政策解读比例
function echarts_3 () {
  let echartTitle = parseInt(resData.ZC_SZF_Data);
  /*if(echartTitle > 100000000){//亿
    echartTitle = (echartTitle/100000000).toFixed(1) + '亿';
  }else if(echartTitle > 10000){//万
    echartTitle = (echartTitle / 10000).toFixed(1) + ' 万';
    // r = (value/10000) + '万';
  }else{
    echartTitle = echartTitle;
  }*/
  const myChart = echarts.init(document.getElementById('echart-m-t-1'));
  const option = {

    title: {
      text: echartTitle,
      textStyle: {
        color: '#20dbfd',
        fontSize: 35,
        fontFamily: 'LCdd',
      },
      left: 'center',
      top: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        if (params.value != 0)
          return params.data.name + "：" + params.data.resdata + ' ('+ params.data.value +'%)';
        else
          return '';
      },
    },
    angleAxis: {
      max: 100, // 满分
      clockWise: true,//顺时针旋转
      startAngle: 180, //起始角度
      radius: ['65%', '70%'],
      // 隐藏刻度线
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    radiusAxis: {
      type: 'category',
      // 隐藏刻度线
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    polar: {
      center: ['50%', '50%'],
      radius: '180%' //图形大小
    },
    series: [
      {
        type: 'bar',
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 8,
        barGap: '-100%', // 两环重叠
        z: 2,
        data: [{
          name: '重庆市人民政府',
          resdata: resData.ZC_SZF_Data,
          value: (resData.ZC_SZF_Data*100/resData.ZWGKFGZL).toFixed(1),
          itemStyle: {
            normal: {
              borderWidth: 8,
              borderColor: {
                colorStops: [{
                  offset: 0,
                  color: '#1d54f7' || '#00cefc' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#68eaf9' || '#367bec' // 100% 处的颜色
                }]
              },
              color: { // 完成的圆环的颜色
                colorStops: [{
                  offset: 0,
                  color: '#1d54f7' || '#00cefc' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#68eaf9' || '#367bec' // 100% 处的颜色
                }]
              },
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
        }]
      },{ // 灰色环
        type: 'bar',
        data: [{
          value: 100,
          name: '发稿总量',
          resdata: resData.ZWGKFGZL,
          itemStyle: {
            color: 'rgba(0,0,0,0.5)',
            // shadowColor: 'rgba(0, 0, 0, 0.2)',
            // shadowBlur: 5,
            // shadowOffsetY: 2
          }
        }],
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 13,
        barGap: '-100%', // 两环重叠
        z: 1
      }]
  }
  myChart.clear();
  myChart.setOption(option);
  window.addEventListener("resize",function(){
    myChart.resize();
  });
}
//委办局政策解读比例
function echarts_4 () {
  const myChart = echarts.init(document.getElementById('echart-m-t-2'));
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        if (params.value != 0)
          return params.data.name + "：" + params.data.resdata + ' ('+ params.data.value +'%)';
        else
          return '';
      },
    },
    title: {
      text: resData.ZC_WBJ_Data,
      textStyle: {
        color: '#20dbfd',
        fontSize: 35,
        fontFamily: 'LCdd'
      },
      left: 'center',
      top: 'center'
    },
    angleAxis: {
      max: 100, // 满分
      clockWise: true,//顺时针旋转
      startAngle: 180, //起始角度
      radius: ['65%', '70%'],
      // 隐藏刻度线
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    radiusAxis: {
      type: 'category',
      // 隐藏刻度线
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    polar: {
      center: ['50%', '50%'],
      radius: '180%' //图形大小
    },
    series: [
      {
        type: 'bar',
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 8,
        barGap: '-100%', // 两环重叠
        z: 2,
        data: [{
          name: '委办局',
          resdata: resData.ZC_WBJ_Data,
          value: (resData.ZC_WBJ_Data*100/resData.ZWGKFGZL).toFixed(1),
          itemStyle: {
            normal: {
              borderWidth: 8,
              borderColor: {
                colorStops: [{
                  offset: 0,
                  color: '#24aed0' || '#01dc9a' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#01dc9a' || '#24aed0' // 100% 处的颜色
                }]
              },
              color: { // 完成的圆环的颜色
                colorStops: [{
                  offset: 0,
                  color: '#24aed0' || '#01dc9a' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#01dc9a' || '#24aed0' // 100% 处的颜色
                }]
              },
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
        }]
      },{ // 灰色环
        type: 'bar',
        data: [{
          value: 100,
          name: '发稿总量',
          resdata: resData.ZWGKFGZL,
          itemStyle: {
            color: 'rgba(0,0,0,0.5)',
            // shadowColor: 'rgba(0, 0, 0, 0.2)',
            // shadowBlur: 5,
            // shadowOffsetY: 2
          }
        }],
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 13,
        barGap: '-100%', // 两环重叠
        z: 1
      }]
  }
  myChart.clear();
  myChart.setOption(option);
  window.addEventListener("resize",function(){
    myChart.resize();
  });
}
//区县政府政策解读比例
function echarts_5 () {
  const myChart = echarts.init(document.getElementById('echart-m-t-3'));
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        if (params.value != 0)
          return params.data.name + "：" + params.data.resdata + ' ('+ params.data.value +'%)';
        else
          return '';
      },
    },
    title: {
      text: resData.ZC_QXZF_Data,
      textStyle: {
        color: '#20dbfd',
        fontSize: 35,
        fontFamily: 'LCdd'
      },
      left: 'center',
      top: 'center'
    },
    angleAxis: {
      max: 100, // 满分
      clockWise: true,//顺时针旋转
      startAngle: 180, //起始角度
      radius: ['65%', '70%'],
      // 隐藏刻度线
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    radiusAxis: {
      type: 'category',
      // 隐藏刻度线
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    polar: {
      center: ['50%', '50%'],
      radius: '180%' //图形大小
    },
    series: [
      {
        type: 'bar',
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 8,
        barGap: '-100%', // 两环重叠
        z: 2,
        data: [{
          name: '区县政府',
          resdata: resData.ZC_QXZF_Data,
          value: (resData.ZC_QXZF_Data*100/resData.ZWGKFGZL).toFixed(1),
          itemStyle: {
            normal: {
              borderWidth: 8,
              borderColor: {
                colorStops: [{
                  offset: 0,
                  color: '#fe6f36' || '#eba848' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#eba848' || '#fe6f36' // 100% 处的颜色
                }]
              },
              color: { // 完成的圆环的颜色
                colorStops: [{
                  offset: 0,
                  color: '#fe6f36' || '#eba848' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#eba848' || '#fe6f36' // 100% 处的颜色
                }]
              },
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
        }]
      },{ // 灰色环
        type: 'bar',
        data: [{
          value: 100,
          name: '发稿总量',
          resdata: resData.ZWGKFGZL,
          itemStyle: {
            color: 'rgba(0,0,0,0.5)',
            // shadowColor: 'rgba(0, 0, 0, 0.2)',
            // shadowBlur: 5,
            // shadowOffsetY: 2
          }
        }],
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 13,
        barGap: '-100%', // 两环重叠
        z: 1
      }]
  }
  myChart.clear();
  myChart.setOption(option);
  window.addEventListener("resize",function(){
    myChart.resize();
  });
}
//获取政策解读总量
function getZCJDZL () {
  getWord('#zcjd',resData.ZCJD_All,false);//渲染数字
}
//政策解读排行
function echarts_6 () {
  const myChart = echarts.init(document.getElementById('echart-r-t'));
  let yAxisData, seriesData;
  yAxisData = resData.ZCJD_Data.yAxisData;
  seriesData = resData.ZCJD_Data.seriesData;
  const option = {
    xAxis: {
      show: false
    },
    tooltip: {
      trigger: 'item',
      formatter:'{b0}:{c0}'
    },
    grid: {
      left: '-2%',
      top: '2%',
      height: '100%',
      containLabel: true
    },
    yAxis: {
      type: 'category',
      data: yAxisData,
      axisLabel: {
        show: true,
        // interval: 0,//标签间隔
        fontSize: 12,
        color: '#fff',
        align: 'left',
        verticalAlign: 'center',
        margin: 55
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#4574D6'
        }
      },
      axisTick: {
        show: false,
        alignWithLabel: true
      }
    },
    series: [
      {
        name: '政策解读排行',
        type: 'bar',
        barWidth:'55%',
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient( 0, 0, 1, 0, [{
              offset: 0,
              color: '#00579a'
            }, {
              offset: 1,
              color: '#00d891'
            }]),
            barBorderRadius: 50,
            borderWidth: 0,
            borderColor: '#333',
          }
        },
        data: seriesData,
        label: {
          show: true, //开启显示
          position: 'right', //在上方显示
          color: '#1dceee',
          fontSize: 14,
          padding: [0, 0, 0, 5],
          formatter:function(data,index){
            var r = '', value = data.value;
            if(value>100000000){//亿
              r = (value/100000000).toFixed(1) + '亿';
            }else if(value>10000){//万
              // r = (value/10000).toFixed(1) + '万';
              r = (value/10000) + '万';
            }else{
              r = value;
            }
            return r;
          }
        }
      }
    ]
  };
  //创建图表
  myChart.clear();
  myChart.setOption (option);
  window.addEventListener("resize",function(){
    myChart.resize();
  });
}
//获取主题分类
function getZTFL () {
  getWord('#ztfl',resData.ZWGK_ZTK_All,false);//渲染数字
}
//获取政务公开发稿总量数据
function getZWZL () {
  getWord('#zwgkzl',resData.ZWGKFGZL,false);//渲染政策总量数字
}
//获取市政府政务公开发稿总量数据
function getSZFZWZL () {
  getWord('#zwgkzl_szf',resData.SZFZWGKZL_Data,false);//渲染政策总量数字
}
//圆球旋转动画
function roateFun () {
  let cur_index = 1,cur_index_1 = 1,cur_index_2 = 1, cur_dom = 0;
  let Data = resData.ZWFG_Data_WBJ;
  let Data_1 = resData.ZWFG_Data_QX;
  //请求数据...
  /****************渲染初始数据 start************************/
  let data_name1 = Data[0].name, data_value1 = Data[0].value,data_name2 = Data[1].name, data_value2 = Data[1].value;
  let data_1_name1 = Data_1[0].name, data_1_value1 = Data_1[0].value,data_2_name2 = Data_1[1].name, data_2_value2 = Data_1[1].value;
  $('.roate-item').eq(0).find('p').text(data_name1)
  $('.roate-item').eq(0).find('span').text(data_value1)
  $('.roate-item').eq(3).find('p').text(data_1_name1)
  $('.roate-item').eq(3).find('span').text(data_1_value1)
  $('.roate-item').eq(2).find('p').text(data_name2)
  $('.roate-item').eq(2).find('span').text(data_value2)
  $('.roate-item').eq(1).find('p').text(data_2_name2)
  $('.roate-item').eq(1).find('span').text(data_2_value2)
  //开始动画
  $('.roate-item').eq(0).addClass('cicle8');
  $('.roate-item').eq(1).addClass('cicle9');
  $('.roate-item').eq(2).addClass('cicle10');
  $('.roate-item').eq(3).addClass('cicle11');
  /****************渲染初始数据 end************************/
  //第一个圆球内容变化
  _setTimeByRoate = setTimeout(() => {
      Data.forEach((item, index) => {
        if (index == (cur_index + 1)) {
          $('.roate-item').eq(0).find('p').text(item.name)
          $('.roate-item').eq(0).find('span').text(item.value)
        }
      });
      //后面的球内容按顺序依次变化
    _interValByRoate = setInterval(() => {
        let Data = resData.ZWFG_Data_WBJ;
        let Data_1 = resData.ZWFG_Data_QX;
        cur_dom ++;
        (cur_index>((Data.length)*2-1)) ?  (cur_index =1) : (cur_index++);
        //旋转容错处理
        let dataArray, dataIndex;
        if (cur_index%2 == 0) {
          (cur_index_2>Data_1.length-1) ?  (cur_index_2 =0) : (cur_index_2++);
          dataArray = Data_1;
          dataIndex = cur_index_2;
        } else {
          (cur_index_1>(Data.length-1)) ?  (cur_index_1 =0) : (cur_index_1++);
          dataArray = Data;
          dataIndex = cur_index_1;
        }
        dataArray.forEach((item, index) => {
          if (cur_dom > 3) {
            cur_dom = 0;
          }
          if (index == (dataIndex + 1)) {
            if (cur_dom == 0) {
              $('.roate-item').eq(0).find('p').text(item.name)
              $('.roate-item').eq(0).find('span').text(item.value)
            }
            if (cur_dom == 1) {
              $ ('.roate-item').eq (3).find ('p').text (item.name)
              $ ('.roate-item').eq (3).find ('span').text (item.value)
            }
            if (cur_dom == 2) {
              $ ('.roate-item').eq (2).find ('p').text (item.name)
              $ ('.roate-item').eq (2).find ('span').text (item.value)
            }
            if (cur_dom == 3) {
              $ ('.roate-item').eq (1).find ('p').text (item.name)
              $ ('.roate-item').eq (1).find ('span').text (item.value)
            }
          }
        })
      }, 5000)
  },15000)
}
//主题库列表数据
function getThemeList () {
  let dataArray = resData.ZWGK_ZTK_List;
  dataArray.forEach((item, index) => {
    $('.r-b-list').append(`<div class="r-list-item">
              <span>${index+1}</span>
              <span>${item.resource_name}</span>
              <span>${item.data_count}</span>
            </div>`)
  })
}
//切换发文走势数据
function changeSort (_this) {
  let text = $ (_this).text ();
  $ (_this).siblings ().removeClass ('btn-active');
  $ (_this).addClass ('btn-active');
  if (text == '周') {
    echarts_2 ('week');
  // } else if (text == '月') {
  //   echarts_2 ('month');
  } else {
    echarts_2 ('year');
  }
}
