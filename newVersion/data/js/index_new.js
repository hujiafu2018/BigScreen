$(function () {
  IndexData();//初始化所有配置
  /****************9秒钟定时切换动画逻辑 start**************************/
  setInterval(() => {
    tabSort_pt();//平台访问走势
    tabSort_zd();//站点发稿走势图表切换
    getWZZL();//站点总量
    getPTFGZL();//平台发稿总量
    getZWFGZL();//政务公开发稿总量
    getZYZL();//资源库总量
    getFWYZL();//平台访问总量
    getSafeDay();//安全运行天数
    getStepData();//cpu动画
  },9000);
  /****************9秒钟定时切换动画逻辑 end**************************/

  /****************10分钟定时请求数据逻辑 start**************************/
  setInterval(() => {
    IndexData();
  }, 10*60*1000);
  /****************10分钟定时请求数据逻辑 end**************************/
});

var _interValByMap;
//初始化所有配置
function IndexData () {
  getGJNums();//获取稿件总数
  getMpAppSummary();//获取区域访问量
  getPublishTrend();//站点发稿量走势
  getMpAppSummaryTrend();//平台访问走势
  getmpAppSummaryMonth();//平台访问总量
  getGovOpenDataCount();//政务公开发稿总量
  getAllUirbData();//资源库数据总量
  getWZZL();//网站总量数据
  getSafeRun();//安全运行天数
  getServerStatus();//渲染CPU数据

  // getHoldTime();//拦截次数
  // echarts_1();//平台访问走势
  // echarts_2();//站点发稿量走势
  // echarts_3();//地图
  // getZWFGZL();//政务公开发稿总量
  // getZYZL();//资源总量
  // getFWYZL();//平台访问总量
  // getAreaVisits();//切换区县访问量数据
  // getSafeDay();//安全运行天数
}
//平台访问走势图表切换
function tabSort_pt () {
  resData.clickIndex_pt>1 ? resData.clickIndex_pt = 0 : '';
  changeVisitSort($('.echart-1-btn span').eq(resData.clickIndex_pt)[0]);
  resData.clickIndex_pt ++;
}
//平台发稿走势图表切换
function tabSort_zd () {
  resData.clickIndex_zd>1 ? resData.clickIndex_zd = 0 : '';
  changeSiteSort($('.echart-2-btn span').eq(resData.clickIndex_zd)[0]);
  resData.clickIndex_zd ++;
}
//平台访问走势
function echarts_1(type = 'hour') {
  let hourData_x = resData.PTFW.hourData_x,
      hourData_y_pv = resData.PTFW.hourData_y_pv,
      hourData_y_uv = resData.PTFW.hourData_y_uv,
      dayData_x = resData.PTFW.dayData_x,
      dayData_y_pv = resData.PTFW.dayData_y_pv,
      dayData_y_uv = resData.PTFW.dayData_y_uv,
      xAxisData, //x轴数据
      yAxisData_PV, //y轴数据
      yAxisData_UV; //y轴数据
  if (type == 'hour') {
    xAxisData = hourData_x;
    yAxisData_PV = hourData_y_pv;
    yAxisData_UV = hourData_y_uv;
  }  else {
    xAxisData = dayData_x;
    yAxisData_PV = dayData_y_pv;
    yAxisData_UV = dayData_y_uv;
  }
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById('echart-l-t'));

  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#dddc6b'
        }
      }
    },
    legend: {
      width: 'auto',
      height: 'auto',
      padding: [15,0,0,0],
      data:['PV','UV'],
      textStyle: {
        color: 'rgba(255,255,255,.5)',
        fontSize:'12',
      }
    },
    grid: {
      left: '10',
      top: '30',
      right: '25',
      bottom: '10',
      containLabel: true
    },

    xAxis: [{
      type: 'category',
      boundaryGap: false,
      axisLabel:  {
        textStyle: {
          color: "rgba(255,255,255,.6)",
          fontSize:12,
        },
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
        formatter:function(value,index){
          var r = '';
          if(value>99999999){//亿
            r = (value/100000000).toFixed(1) + '亿';
          }else if(value>9999){//万
            r = (value/10000).toFixed(1) + '万';
          }else{
            r = value;
          }
          return r;
        }
      },

      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,.1)'
        }
      }
    }],
    series: [
      {
        name: 'PV',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {

          normal: {
            color: '#0184d5',
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(1, 132, 213, 1)'
            }, {
              offset: 0.8,
              color: 'rgba(1, 132, 213, 0.1)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
          }
        },
        itemStyle: {
          normal: {
            color: '#0184d5',
            borderColor: 'rgba(221, 220, 107, .1)',
            borderWidth: 12
          }
        },
        data: yAxisData_PV

      },
      {
        name: 'UV',
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
        data: yAxisData_UV

      },

    ]

  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.clear();
  myChart.setOption(option);
  window.addEventListener("resize",function(){
    myChart.resize();
  });
};
//站点发稿量走势
function echarts_2(type = 'week') {
  let weekData_x = resData.ZDFG.weekData_x,
      weekData_y = resData.ZDFG.weekData_y,
      monthData_x = resData.ZDFG.monthData_x,
      monthData_y = resData.ZDFG.monthData_y,
      yearData_x = resData.ZDFG.yearData_x,
      yearData_y = resData.ZDFG.yearData_y,
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
  var myCharts = echarts.init(document.getElementById('echart-l-b'));
  var option = {

    grid: {
      left: '10',
      top: '15%',
      right: '10',
      bottom: '10',
      height: '85%',
      containLabel: true
    },
    tooltip: {
      show: "true",
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter:'{b0}:{c0}'
    },
    yAxis: {
      type: 'value',
      axisTick: {show: false},
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,.1)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,.1)'
        }
      },
      axisLabel: {
        textStyle: {
          color: 'rgba(255,255,255,.6)',
          fontSize:12,
        },
        formatter:function(value,index){
          var r = '';
          if(value>99999999){//亿
            r = (value/100000000).toFixed(1) + '亿';
          }else if(value>9999){//万
            r = (value/10000).toFixed(1) + '万';
          }else{
            r = value;
          }
          return r;
        }
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#353E47',
          },
        },
        axisLabel:{
          textStyle:{
            color:'#fff'
          },
          rotate: rotate,
          interval:0,
          formatter : function(params){
            var newParamsName = "";
            var paramsNameNumber = params.length;
            var provideNumber = 4;
            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
            if (paramsNameNumber > provideNumber) {
              for (var p = 0; p < rowNumber; p++) {
                var tempStr = "";
                var start = p * provideNumber;
                var end = start + provideNumber;
                if (p == rowNumber - 1) {
                  tempStr = params.substring(start, paramsNameNumber);
                } else {
                  tempStr = params.substring(start, end) + "\n";
                }
                newParamsName += tempStr;
              }

            } else {
              newParamsName = params;
            }
            return newParamsName
          }
        },
        data: xAxisData
      }
    ],
    series: [
      {
        name: '',
        type: 'bar',
        barWidth: '40%',
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#00d891'
            }, {
              offset: 1,
              color: '#00579a'
            }]),
            barBorderRadius: 50,
            borderWidth: 0,
            borderColor: '#333',
          }
        },
        label: {
          normal: {
            show: false,
            position: 'top',
            textStyle: {
              color: '#fff'
            }
          }
        },
        data: yAxisData
      }

    ]
  };
  myCharts.clear();
  myCharts.setOption(option);
    window.addEventListener("resize",function(){
        myCharts.resize();
    });
};
//地图
function echarts_3 () {
  //获取城市数据并渲染到地图图表上
  const geoGpsMap = [106.50288, 29.656742];
  let data_array = cityArray.map(item => {
    return item.value;
  });
  let maxSize = Math.max(...data_array);
  let t = 1;//流入流出控制
  const myChart_3 = echarts.init ($ ('#echart-m-b')[0]);
  var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
        });
      }
    }
    return res;
  };
  var convertToLineData = function(data, gps) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i];
      var toCoord = geoCoordMap[dataItem.name];
      var fromCoord = gps; //郑州
      //  var toCoord = geoGps[Math.random()*3];
      if (fromCoord && toCoord) {
        if(t==1){
          res.push([{
            coord: toCoord,
          },{
            coord: fromCoord,
            name: dataItem.name,
            value: dataItem.value,
            dayValue: dataItem.dayValue
          }]);
        }else{
          res.push([{
            coord: fromCoord,
            name: dataItem.name,
            value: dataItem.value,
            dayValue: dataItem.dayValue
          },{
            coord: toCoord,
          }]);
        }

      }
    }
    if(t==0){
      t=1;
    }else{
      t=0;
    }
    return res;
  };
  //地图图表配置
  const year = ["2020-01", "2020-02"];
  const colors = ["#1DE9B6", "#EEDD78"];
  let mapData = [[],[],[],[],[],[]];
  for (var key in geoCoordMap) {
    mapData[0].push({
      "year": '2020-01',
      "name": key,
      "value": mapData0[key],
      "dayValue": mapData0[key],
    });
    mapData[1].push({
      "year": '2020-02',
      "name": key,
      "value": mapData0[key],
      "dayValue": mapData0[key],
    });
  }
  const option_3 = {
    timeline: {
      show: false,
      data: year,
      axisType: 'category',
      autoPlay: true,
      playInterval: 5000,
      left: '10%',
      right: '10%',
      bottom: '3%',
      width: '80%',
      //  height: null,
      label: {
        show: false,
        normal: {
          textStyle: {
            color: '#ddd'
          }
        },
        emphasis: {
          textStyle: {
            color: '#fff'
          }
        }
      }
    },
    baseOption: {
      //聚焦框
      tooltip: {
        trigger: 'item',
        formatter: function (params, ticket, callback) {
          var tip = params.name;
          if (!isNaN (params.value)) {
            // tip = tip + '<br/>' + '当月访问量:' + params.data.value + '<br/>' + '今日访问量:' + params.data.dayValue;
            tip = tip + '<br/>' + '当月访问量:' + params.data.value;
          }
          return tip;
        }
      },
      //操作框
      toolbox: {
        show: false,
      },
      //视觉视图
      visualMap: {
        show: false,
        min: 0,
        max: maxSize,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],
        textStyle:{
          color:'white'
        },
        // 表示 目标系列 的视觉样式 和 visualMap-piecewise 共有的视觉样式。
        /*inRange: {
          color: ['rgba(147, 235, 248, .15)', '#e5cf0d', '#5ab1ef','#c05050'],
        },*/
        // calculable: true,
        colorLightness: [0.8, 100],
        color: ['#c05050','#e5cf0d','rgba(147, 235, 248, .2)'],
        dimension: 0,
      },
      /*visualMap: {
        show: false,
        min: 0,
        max: 1500,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['rgba(147, 235, 248, .2)']
        }
      },*/
      //阴影
      geo: {
        map: '重庆',
        zoom: 1.25,
        // roam: true,
          mapType: '重庆', // 自定义扩展图表类型
          geoIndex: 2,
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            borderColor: 'rgba(147, 235, 248, 1)',
            borderWidth: 1,
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [{
                offset: 0,
                color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
              }, {
                offset: 1,
                color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
              }],
              globalCoord: true // 缺省为 false
            },
            shadowColor: 'rgba(128, 217, 248, 1)',
            // shadowColor: 'rgba(255, 255, 255, 1)',
            shadowOffsetX: -2,
            shadowOffsetY: 2,
            shadowBlur: 10
          },
          emphasis: {
            areaColor: '#389BB7',
            borderWidth: 0
          }
        }
      },
    },
    options: []
  };
  for (var n = 0; n < year.length; n++) {
    option_3.options.push({
      //数据
      series: [
        {
          name: '重庆',
          type: 'map',
          // roam: true,
          zoom: 1.25,//缩放比例
          mapType: '重庆', // 自定义扩展图表类型
          geoIndex: 1,
          // aspectScale: 1, //长宽比
          // showLegendSymbol: false, // 存在legend时显示
          // selectedMode: 'single',
          data: cityArray,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false,
              textStyle: {
                color: '#fff'
              }
            }
          },
          itemStyle: {
              normal: {
                  opacity: 0,
              },
              emphasis: {
                  areaColor: '#389BB7',
                  borderWidth: 0
              }
          },
        },
        //地图点的动画效果
        {
          //  name: 'Top 5',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(markPointData.sort(function(a, b) {
            return b.value - a.value;
          })),
          symbol: 'circle',
          symbolSize: function(val) {
            return 8;
          },
          showEffectOn: 'render',
          rippleEffect: {
            color: 'rgba(147, 235, 248, .2)',
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              color: '#e5cf0d',
              formatter: function (params, ticket, callback) {
                var tip = params.name;
                if (!isNaN (params.value)) {
                  // tip = tip + '<br/>' + '当月访问量:' + params.data.value + '<br/>' + '今日访问量:' + params.data.dayValue;
                  tip = tip + '<br/>' + '当月访问量:' + params.data.value;
                }
                return tip;
              },
              position: 'bottom',
              offset: [0, 0],
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: colors[n],
              // borderColor:"#fff",
              shadowBlur: 10,
              shadowColor: colors[n]
            }
          },
          zlevel: 1
        },
        //地图线的动画效果
        {
          type: 'lines',
          zlevel: 2,
          effect: {
            show: true,
            period: 5, //箭头指向速度，值越小速度越快
            trailLength: 0.2, //特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'arrow', //箭头图标
            symbolSize: 6, //图标大小
          },
          lineStyle: {
            normal: {
              color: colors[n],
              width: 1, //尾迹线条宽度
              opacity: 0.2, //尾迹线条透明度
              curveness: .3 //尾迹线条曲直度
            }
          },
          data: convertToLineData(mapData[n], geoGpsMap)
        },
        // {
        //   type: 'lines',
        //   show: false,
        //   data: mapData0
        // }
      ]
    })
  }
  Api.getCityMap ().then (geoJson => {
    myChart_3.hideLoading ();
    echarts.registerMap ('重庆', geoJson);
    myChart_3.setOption (option_3);
      window.addEventListener("resize",function(){
          myChart_3.resize();
      });
  })
}
//获取站点总量
function getWZZL () {
  getWord('#wzzl',resData.ZDZS);//渲染数字
}
//获取平台发稿总量
function getPTFGZL () {
  getWord('#ptfgrzzl',resData.PTFGZL);//渲染数字
}
//获取政务公开发稿总量
function getZWFGZL () {
  getWord('#zwgk',resData.ZWGKFGZL);//渲染数字
}
//获取资源库总量
function getZYZL () {
  getWord('#zyzl',resData.ZYKZL);//渲染数字
}
//获取平台访问总量
function getFWYZL () {
  getWord('#ptfgzl',resData.PTFWZL,false);//渲染数字
}
//获取区县访问量
function getAreaVisits () {
  let curIndex = 0;
  let Data = resData.QXFWZL.reverse();
  $('#cur_month_name').text(Data[0].name);
  $('#cur_month_data').text(Data[0].value);
  _interValByMap = setInterval(() => {
    curIndex > Data.length -1 ? curIndex = 0 : curIndex++;
    Data.forEach((item,index) => {
      if (curIndex == index) {
        $('#cur_month_name').text(item.name);
        $('#cur_month_data').text(item.value);
      }
    })
  },5000)
}
//获取安全运行天数
function getSafeDay () {
  getWord('#run_data',resData.AQYX);//渲染数字
}
//获取拦截次数
/*function getHoldTime () {
  $('#cpu_val').text(resData.CPU+ '%');
  $('#nc_val').text(resData.NC+ '%');
  $('#cp_val').text(resData.CP+ '%');
  $('#io_val').text(resData.LRLC+ '%');
  setThreeStep($('.three-step'), resData.CPU)
  setThreeStep($('.three-step'), resData.NC)
  setThreeStep($('.three-step'), resData.CP)
  setThreeStep($('.three-step'), resData.LRLC)
}*/
//切换站点发稿量数据
function changeVisitSort (_this) {
  let text = $ (_this).text ();
  $ (_this).siblings ().removeClass ('btn-active');
  $ (_this).addClass ('btn-active');
  if (text == '小时') {
    echarts_1 ('hour');
  } else {
    echarts_1 ('day');
  }
}
//切换站点发稿量数据
function changeSiteSort (_this) {
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
//渲染CPU动画
function getStepData(){
  getWord('#hold_time',resData.LJCS, false);//渲染数字
  $('#CPU, #NC, #CP, #LRLC').css('width','0');
  $('#cpu_val').text(resData.CPU +'%');
  $('#nc_val').text(resData.NC +'%');
  $('#cp_val').text(resData.CP +'%');
  $('#io_val').text(resData.LRLC +'%');
  $('#CPU').animate({'width': parseInt(resData.CPU) +'%'},2000,'linear');
  $('#NC').animate({'width': parseInt(resData.NC) + '%'},2000,'linear');
  $('#CP').animate({'width': parseInt(resData.CP) + '%'},2000,'linear');
  $('#LRLC').animate({'width': parseInt(resData.LRLC) + '%'},2000,'linear');
}
