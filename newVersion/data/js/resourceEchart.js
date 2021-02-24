//行政规范文件图表
function echarts_1() {
    // 基于准备好的dom，初始化echarts实例
    const myChart1 = echarts.init(document.getElementById('echart-l-t'));
    var mainData = RESOURE.frist.mainData
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
      color: ['#00d896', '#00bbd7', '#009fd5', '#007ed5'],
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          if (params.value != 0)
            return params.data.name + "：" + params.data.resdata + ' ('+ params.data.value +'%)';
          else
            return '';
        },
        position: ['20%', '50%'],
        extraCssText:'width:auto;height:20px'
      },
      legend: {
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 12,
        width: 180,
        right: '5%',
        bottom: '40%',
        data: ['政府信息公开', '新闻资讯', '政府领导', '政务服务'],
        textStyle: {
          color: 'rgba(255,255,255,.6)',
        },
        formatter:function(params){
          if (params === '政府领导')params = params + '       '
          return params
        }
      },

      series: [
        {
          name: mainData[0].name,
          type: 'pie',
          clockWise: false,
          avoidLabelOverlap: true,//是否启用防止标签重叠策略
          center: ['50%', '42%'],
          radius: ['29%', '40%'],
          left: -150,
          top: 30,
          itemStyle: dataStyle,
          hoverAnimation: false,
          // selectedMode: 'single',
          data: [{
            value: mainData[0].percent,
            resdata: mainData[0].num,
            name: mainData[0].name
          }, {
            value: 100 - mainData[0].percent,
            name: 'invisible',
            tooltip: {show: false},
            itemStyle: placeHolderStyle
          }]
        },
        {
          name: mainData[1].name,
          type: 'pie',
          clockWise: false,
          center: ['50%', '42%'],
          radius: ['39%', '50%'],
          left: -150,
          top: 30,
          itemStyle: dataStyle,
          hoverAnimation: false,
          data: [{
            value: mainData[1].percent,
            resdata: mainData[1].num,
            name: mainData[1].name
          }, {
            value: 100 - mainData[1].percent,
            name: 'invisible',
            tooltip: {show: false},
            itemStyle: placeHolderStyle
          }]
        },
        {
          name: mainData[2].name,
          type: 'pie',
          clockWise: false,
          hoverAnimation: false,
          center: ['50%', '42%'],
          radius: ['49%', '60%'],
          left: -150,
          top: 30,
          itemStyle: dataStyle,
          data: [{
            value: mainData[2].percent,
            resdata: mainData[2].num,
            name: mainData[2].name
          }, {
            value: 100 - mainData[2].percent,
            name: 'invisible',
            tooltip: {show: false},
            itemStyle: placeHolderStyle
          }]
        },
        {
          name: mainData[3].name,
          type: 'pie',
          clockWise: false,
          hoverAnimation: false,
          center: ['50%', '42%'],
          radius: ['59%', '70%'],
          left: -150,
          top: 30,
          itemStyle: dataStyle,
          data: [{
            value: mainData[3].percent,
            resdata: mainData[3].num,
            name: mainData[3].name
          }, {
            value: 100 - mainData[3].percent,
            name: 'invisible',
            tooltip: {show: false},
            itemStyle: placeHolderStyle
          }]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.clear();
    myChart1.setOption(option);
    window.addEventListener("resize",function(){
        myChart1.resize();
    });
  }
  //站点发稿量走势
function echarts_2(type = 'week') {
 var stepTypeArr = ['week','month']
 $('.time-type span').eq(stepTypeArr.findIndex(function(params) { return params === type})).addClass('active').siblings().removeClass('active')
  let echartData = RESOURE.seccond.echartData,weekData_x = echartData.weekData_x,
  weekData_y = echartData.weekData_y,
  monthData_x = echartData.monthData_x,
  monthData_y = echartData.monthData_y,
  yearData_x = echartData.yearData_x,
  yearData_y = echartData.yearData_y,
  xAxisData, //x轴数据
  yAxisData; //y轴数据
if (type == 'month') {
  xAxisData = monthData_x;
  yAxisData = monthData_y;
}else {
xAxisData = weekData_x;
yAxisData = weekData_y;
}
    var myCharts2 = echarts.init(document.getElementById('echart-l-b'));
    var option = {

      grid: {
        left: '10',
        top: '5%',
        right: '10',
        bottom: '5%',
        height: '85%',
        containLabel: true
      },
      legend: {
        show: false
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter:'{b0}:{c0}',
        extraCssText:'width:auto;height:20px'
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
          show: false,
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
            lineStyle: {
              color: '#353E47',
            }
          },
          splitLine: {
            show: false,
          },
          axisLabel:{
            textStyle:{
              color:'#fff'
            },
            rotate: 0,
            interval:0,
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
    myCharts2.clear();
    myCharts2.setOption(option);
    window.addEventListener("resize",function(){
        myCharts2.resize();
    });
  };


//行政规范文件图表
function echarts_3() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('echart-l-end'));
    var mainData = RESOURE.three.mainData
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
      color: ['#00d896', '#00bbd7', '#009fd5', '#007ed5'],
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          if (params.value != 0)
            return params.data.name + "：" + params.data.resdata + ' ('+ params.data.value +'%)';
          else
            return '';
        },
        extraCssText:'width:auto;height:20px'
      },
      legend: {
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 20,
        width: 150,
        right: '10%',
        bottom: '40%',
        data: ['文本', '图片', '音视频', '其他附件'],
        textStyle: {
          color: 'rgba(255,255,255,.6)',
        },
        formatter:function(params){
            if (params === '文本')params = params + '   '
            return params
        }

      },

      series: [
        {
          name: mainData[0].name,
          type: 'pie',
          clockWise: false,
          avoidLabelOverlap: true,//是否启用防止标签重叠策略
          center: ['50%', '42%'],
          radius: ['29%', '40%'],
          left: -150,
          top: 30,
          itemStyle: dataStyle,
          hoverAnimation: false,
          // selectedMode: 'single',
          data: [{
            value: mainData[0].percent,
            resdata: mainData[0].num,
            name: mainData[0].name
          }, {
            value: 100 - mainData[0].percent,
            name: 'invisible',
            tooltip: {show: false},
            itemStyle: placeHolderStyle
          }]
        },
        {
          name: mainData[1].name,
          type: 'pie',
          clockWise: false,
          center: ['50%', '42%'],
          radius: ['39%', '50%'],
          left: -150,
          top: 30,
          itemStyle: dataStyle,
          hoverAnimation: false,
          data: [{
            value: mainData[1].percent,
            resdata: mainData[1].num,
            name: mainData[1].name
          }, {
            value: 100 - mainData[1].percent,
            name: 'invisible',
            tooltip: {show: false},
            itemStyle: placeHolderStyle
          }]
        },
        {
          name: mainData[2].name,
          type: 'pie',
          clockWise: false,
          hoverAnimation: false,
          center: ['50%', '42%'],
          radius: ['49%', '60%'],
          left: -150,
          top: 30,
          itemStyle: dataStyle,
          data: [{
            value: mainData[2].percent,
            resdata: mainData[2].num,
            name: mainData[2].name
          }, {
            value: 100 - mainData[2].percent,
            name: 'invisible',
            tooltip: {show: false},
            itemStyle: placeHolderStyle
          }]
        },
        {
          name: mainData[3].name,
          type: 'pie',
          clockWise: false,
          hoverAnimation: false,
          center: ['50%', '42%'],
          radius: ['59%', '70%'],
          left: -150,
          top: 30,
          itemStyle: dataStyle,
          data: [{
            value: mainData[3].percent,
            resdata: mainData[3].num,
            name: mainData[3].name
          }, {
            value: 100 - mainData[3].percent,
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
