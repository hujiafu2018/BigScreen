//获取资源库数据总览数据
function getZYKData () {
  //初始化图表实例
  const myChart_1 = echarts.init ($ ('#echart-l-t')[0]);
  let legendData = [], seriesData = [], target;//标签&数据&文本格式
  let datasNum = 0;//资源数据总量
  //获取图表数据
  Api.getZYKUirb ().then (res => {
    // console.log (res);
    let result = res.data.data;
    result.forEach (item => {
      datasNum += item.count;
      if (item.type == 'data') {
        legendData.push ('文本');
        seriesData.push ({
          value: item.count,
          name: '文本'
        })
      } else if (item.type == 'pics') {
        legendData.push ('图片');
        seriesData.push ({
          value: item.count,
          name: '图片'
        })
      } else if (item.type == 'videos') {
        legendData.push ('音视频');
        seriesData.push ({
          value: item.count,
          name: '音视频'
        })
      } else {
        legendData.push ('其他附件');
        seriesData.push ({
          value: item.count,
          name: '其他附件'
        })
      }
    })
  }).then (res => {
    //渲染资源总量数据
    // console.log('datasNum:',datasNum);
    getWord('#zyzl',datasNum);
    setInterval( res => {
      getWord('#zyzl',datasNum);
    },9000);
    //资源库数据总览图表配置
    const option_1 = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      color: ['#0F6DE9', '#AC4ED3', '#E6AF0B', '#00AF6D'],//饼图颜色
      legend: {
        orient: 'vertical',
        right: 10,
        top: 160,
        data: legendData,
        formatter: function (name) {
          let target;
          for (let i = 0; i < seriesData.length; i++) {
            if (seriesData[i].name === name) {
              target = seriesData[i].value
            }
          }
          let arr = ['{b|' + name + '}' + '     ' + '{a|' + target + '}']
          return arr.join ('\n');
        },
        textStyle: {
          color: '#fff',
          rich: {
            a: {
              color: '#00FCF9',
            },
            b: {
              color: '#fff',
            }
          }
        }
      },
      series: [
        {
          name: '',
          type: 'pie',
          width: '90%',
          right: '10%',
          smooth: 1,
          radius: ['15%', '50%'],
          roseType: 'area',
          clockwise: false,
          label: {
            position: 'outside',
            formatter: '{b|{b}}  {per|{d}%}  ',
            verticalAlign: 'top',
            rich: {
              b: {
                color: '#fff',
                fontSize: 16,
                lineHeight: 33
              },
              per: {
                color: '#fff',
                fontSize: 16,
              },
            },
          },
          labelLine: {
            normal: {
              length: 10,
              smooth: false,
              lineStyle: {
                color: '#4574D6'
              },
            }
          },
          data: seriesData
        }
      ]
    };
    //执行图表构建
    myChart_1.setOption (option_1);
  }).catch (r => {
    $ ('#echart-l-t').html ('<div class="no-data" style="margin-top: 100px;">暂无数据</div>');
    //渲染资源总量数据
    datasNum = 1999;
    getWord('#zyzl',datasNum);
    setInterval( res => {
      getWord('#zyzl',datasNum)
    },9000);
  });
  /*************模拟数据 start*******************/
  // legendData.push('文本', '图片', '音视频', '其他附件');
  // console.log('legendData',legendData);
  // seriesData.push({value: 335, name: '文本'},{value: 310, name: '图片'},{value: 234, name: '音视频'},{value: 135, name: '其他附件'});
  // console.log('seriesData',seriesData);
  /*************模拟数据 end*******************/

}

//获取数据入库数据
function getRKUirb (type) {
  //初始化图表实例
  const myChart_2 = echarts.init ($ ('#echart-l-b')[0]);
  //获取图表数据
  let weekData_x = [],
      weekData_y = [],
      monthData_x = [],
      monthData_y = [],
      yearData_x = [],
      yearData_y = [],
      xAxisData, //x轴数据
      yAxisData, //y轴数据
      rotate = 0, //字体倾斜角度
      barWidth = '23px';//柱状宽

  //周走势
  Api.getRKUirb (encodeURI ('data/week/trend')).then (res => {
    // console.log (res);
    let result = res.data.data;
    weekData_x = result.map (item => {
      return item.week;
    });
    weekData_x.forEach( (item,index) => {
      if (item == 'SATURDAY') {
        // console.log('SATURDAY');
        weekData_x[index] = '星期六';
      } else if (item == 'SUNDAY') {
        weekData_x[index] = '星期天';
      } else if (item == 'MONDAY') {
        weekData_x[index] = '星期一';
      } else if (item == 'TUESDAY') {
        weekData_x[index] = '星期二';
      } else if (item == 'WEDNESDAY') {
        weekData_x[index] = '星期三';
      } else if (item == 'THURSDAY') {
        weekData_x[index] = '星期四';
      } else {
        weekData_x[index] = '星期五';
      }
    });
    weekData_y = result.map (item => {
      return item.count;
    })
  }).then (re => {
    //月走势
    Api.getRKUirb (encodeURI ('data/month/trend')).then (res => {
      // console.log (res);
      let result = res.data.data;
      monthData_x = result.map (item => {
        return item.day;
      })
      monthData_y = result.map (item => {
        return item.count;
      })
    }).then (r => {
      //年走势
      Api.getRKUirb (encodeURI ('data/year/trend')).then (res => {
        // console.log (res);
        // console.log (res);
        let result = res.data.data;
        yearData_x = result.map (item => {
          return item.month + '月';
        });
        yearData_y = result.map (item => {
          return item.count;
        })
      }).then (rl => {
        if (type == 'month') {
          xAxisData = monthData_x;
          yAxisData = monthData_y;
          barWidth = '5px';
          rotate = 90;
        } else if (type == 'year') {
          xAxisData = yearData_x;
          yAxisData = yearData_y;
        } else {
          xAxisData = weekData_x;
          yAxisData = weekData_y;
          rotate = 0;
        }
        //数据入库图表配置
        var option_2 = {
          color: ['#00C4F5'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: xAxisData,
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                rotate: rotate
              },
              axisLine: {
                lineStyle: {
                  color: '#4574D6'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value}',
                textStyle: {
                  color: '#fff'
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#4574D6'
                },
              },
              splitLine: {
                show: false
              }
            }
          ],
          series: [
            {
              name: '',
              type: 'bar',
              barWidth: barWidth,
              data: yAxisData,
              itemStyle: {
                barBorderRadius: 2
              },
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: 'white'
                  }
                }
              }
            },
            {
              name: '',
              type: 'line',
              // yAxisIndex: 1,
              itemStyle: {
                normal: {
                  color: '#00D5E3',
                  lineStyle: {
                    color: '#00C4F5'
                  }
                }
              },
              data: yAxisData,
            }
          ]
        };
        //执行图表构建
        myChart_2.setOption (option_2);
      }).catch (r => {
        // console.log('入库走势暂无数据')
        $ ('#echart-l-b').html ('<div class="no-data" style="margin-top: 100px;">暂无数据</div>')
      });
    }).catch (r => {
      // console.log('入库走势暂无数据')
      $ ('#echart-l-b').html ('<div class="no-data" style="margin-top: 100px;">暂无数据</div>')
    });
  }).catch (r => {
    // console.log('入库走势暂无数据')
    $ ('#echart-l-b').html ('<div class="no-data" style="margin-top: 100px;">暂无数据</div>')
  });
  /*************模拟数据 start*******************/
  // weekData_x = ['SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
  // weekData_y = [400, 500, 600, 700, 800, 1000, 1520, 2000];
  /*************模拟数据 end*******************/

  /*************模拟数据 start*******************/
  // monthData_x = ['5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9', '5.10', '5.11', '5.12','5.13', '5.14', '5.15', '5.16', '5.17', '5.18', '5.19', '5.20', '5.21', '5.22', '5.23', '5.24', '5.25', '5.26', '5.27', '5.28', '5.29', '5.30', '5.31'];
  // monthData_y = [400, 500, 600, 700, 800, 1000, 1520, 2000, 3340, 3900, 3300, 2200, 3800,400, 500, 600, 7000, 800, 1000, 1520, 2000, 3340, 3900, 3300, 2200, 3800, 2000, 3340, 3900, 3300, 2200, 3800];
  /*************模拟数据 end*******************/

  /*************模拟数据 start*******************/
  // yearData_x = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  // yearData_y = [400, 500, 600, 700, 800, 1000, 1520, 2000, 3340, 4900, 3300, 2200, 3800];
  /*************模拟数据 end*******************/
}

//点击下拉按钮
function selectView () {
  if ($ ('.aside-select').hasClass ('selected')) {
    $ ('.aside-select img').removeClass ('img-roate-in').addClass ('img-roate-out');
    $ ('.aside-select').removeClass ('selected');
    $ ('.select-option').fadeOut ();
  } else {
    $ ('.aside-select img').removeClass ('img-roate-out').addClass ('img-roate-in');
    $ ('.select-option').fadeIn ();
    $ ('.aside-select').addClass ('selected');
  }
}

//选中下拉选项
function selectOption (_this) {
  let text = $ (_this).text ();
  if (text == '近一周') {
    getRKUirb ('week');
  } else if (text == '近一月') {
    getRKUirb ('month');
  } else {
    getRKUirb ('year');
  }
  $ ('.aside-select img').removeClass ('img-roate-in').addClass ('img-roate-out');
  $ ('.aside-select div').text (text);
  $ ('.select-option').fadeOut ();
}

//获取网站入驻总量
function getWZRZZZL () {
  /*let html_b, html_s;
  Api.getGovsite ('1', '500000').then (res => {
    let TOTALNUM = res.DATA.TOTALNUM;
    let MONTHNUM = res.DATA.MONTHNUM;
    // html_b = transformWord (TOTALNUM, 'big');//数字转换图片
    html_b = transformWord (86, 'big');//数字转换图片
    html_s = transformWord (MONTHNUM, 'small');//数字转换图片
  }).then (res => {
    $ ('#wzrzzl').html (html_b);
    $ ('#wzrzzl').parent ().next ().find ('span').html (html_s);
  });*/
  /*************模拟数据 start*******************/
  // html_b = transformWord (12, 'big');//数字转换图片
  // html_s = transformWord (12, 'small');//数字转换图片
  /*************模拟数据 end*******************/
  getWord('#wzrzzl',89);//渲染数字
}

//获取移动端入驻总量
function getYDDRZZL () {
  let html_b, html_s;
  Api.getGovsite ('2', '500000').then (res => {
    let TOTALNUM = res.DATA.TOTALNUM;
    let MONTHNUM = res.DATA.MONTHNUM;
    html_b = transformWord (TOTALNUM, 'big');//数字转换图片
    html_s = transformWord (MONTHNUM, 'small');//数字转换图片
  }).then (res => {
    $ ('#yddrzzl').html (html_b);
    $ ('#yddrzzl').parent ().next ().find ('span').html (html_s);
  });
  /*************模拟数据 start*******************/
  // html_b = transformWord (34, 'big');//数字转换图片
  // html_s = transformWord (34, 'small');//数字转换图片
  /*************模拟数据 end*******************/
}

//获取新媒体入驻总量
function getXMTRZZL () {
  let html_b, html_s;
  Api.getGovsite ('3', '500000').then (res => {
    html_b = res.DATA.TOTALNUM;
    html_s = res.DATA.MONTHNUM;
  }).then (data => {
    Api.getGovsite ('4', '500000').then (result => {
      html_b += result.DATA.TOTALNUM;
      html_s += result.DATA.MONTHNUM;
      html_b = transformWord (html_b, 'big');//数字转换图片
      html_s = transformWord (html_s, 'small');//数字转换图片
    }).then (re => {
      $ ('#xmtrzzl').html (html_b);
      $ ('#xmtrzzl').parent ().next ().find ('span').html (html_s);
    }).catch (r => {
      html_b = transformWord (html_b, 'big');//数字转换图片
      html_s = transformWord (html_s, 'small');//数字转换图片
      $ ('#xmtrzzl').html (html_b);
      $ ('#xmtrzzl').parent ().next ().find ('span').html (html_s);
    });
  });
  /*************模拟数据 start*******************/
  // html_b = transformWord (567, 'big');//数字转换图片
  // html_s = transformWord (567, 'small');//数字转换图片
  /*************模拟数据 end*******************/
}

//获取平台发稿入驻总量
function getPTFGRZZL () {
  let totaldoccount;
  Api.getDocCountByArea ('500000',false).then (res => {
    totaldoccount = res.datas.totaldoccount;
    // html_b = transformWord (totaldoccount, 'big');//数字转换图片
    // html_s = transformWord (todaydoccount, 'small');//数字转换图片
  }).then (re => {
    getWord('#ptfgrzzl',totaldoccount);//渲染数字
    setInterval( res => {
      getWord('#ptfgrzzl',totaldoccount);
    },9000);
  }).catch( res => {
    getWord('#ptfgrzzl',12345000);//渲染数字
    setInterval( res => {
      getWord('#ptfgrzzl',12345000);
    },9000);
  });
  /*************模拟数据 start*******************/
  // html_b = transformWord (890, 'big');//数字转换图片
  // html_s = transformWord (890, 'small');//数字转换图片
  /*************模拟数据 end*******************/
}

//获取政策数量
function getPolicyZL () {
  let nums = 623916;
  getWord('#zcsl',nums);//渲染数字
  setInterval(res => {
    getWord('#zcsl',nums);
  },9000);
}

//获取平台访问数量
function getVisitsZL () {
  let totalNums,
      mpIds;
  mpIds = mapIdsArray.map( item => {
        return item.mpId;
      });
  mpIds = mpIds.join(',');
  var date = getNowFormatDate ();//获取当前日期
  Api.getMpAppSummary (date, mpIds).then (res => {
    let result = res.Records[0].webs;
    totalNums = result.PV30;
  }).then (re => {
    getWord('#ptfgzl',totalNums);//渲染数字
  }).catch( res => {
    totalNums = 149846251;
    getWord('#ptfgzl',totalNums);//渲染数字
  });
  setInterval( res => {
    getWord('#ptfgzl',totalNums);
  },9000);
}

//地图图表
function indexMap () {
  //获取城市数据并渲染到地图图表上
  const myChart_5 = echarts.init ($ ('#echart-m-b')[0]);
  let markPoint = [{
    "name": "北碚",
    "coord": [
      106.587868,
      29.92543
    ]
  }];
  //地图图表配置
  const option_5 = {
    //聚焦框
    tooltip: {
      trigger: 'item',
      formatter: function (params, ticket, callback) {
        var tip = params.name;
        if (!isNaN (params.value)) {
          tip = tip + '<br/>' + '总访问量:' + params.data.value + '<br/>' + '今日访问量:' + params.data.dayValue;
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
      max: 1500,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['rgb(12, 59, 175)']
      }
    },
    //阴影
    geo: {
      map: '重庆',
      zoom: 1.25,
      itemStyle: {
        normal: {
          shadowColor: '#000',
          shadowOffsetX: 25,
          shadowOffsetY: 25,
          shadowBlur: 15,
        }
      }
    },
    //数据
    series: [
      {
        name: '重庆市地图',
        type: 'map',
        zoom: 1.25,//缩放比例
        mapType: '重庆', // 自定义扩展图表类型
        selectedMode: 'single',
        data: cityArray,
        label: {
          show: true,
          position: 'bottom',
          color: '#fff',
          offset: [0, 50],
          fontSize: 15,
        },
        itemStyle: {
          normal: {
            areaStyle: {
              color: 'rgb(12, 59, 175)',
            },
            borderWidth: 1,
            borderColor: '#4574D6',
          },
        },
        //添加的标记
        markPoint: {//数据全是markPoint
          symbol: 'image://data/img/index-point.png',
          // symbol: 'circle',
          animation: true,
          animationEasing: 'backInOut',
          animationDuration: function (idx) {
            // 越往后的数据时长越大
            return idx * 500;
          },
          symbolSize: [19, 32],   // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
          data: markPointData
        }
      },
      {
        name: '重庆市地图-标记',
        type: 'map',
        coordinateSystem: 'geo',
        zoom: 1.25,//缩放比例
        mapType: '重庆', // 自定义扩展图表类型
        selectedMode: 'single',
        data: cityArray,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'top',
              color: '#fff',
              offset: [0, 40],
            },
            areaStyle: {
              color: 'rgb(12, 59, 175)',
            },
            borderWidth: 1,
            borderColor: '#4574D6',
          },
        },
        markPoint: {//数据全是markPoint
          symbol: 'image://data/img/index-point-now.png',
          // symbol: 'pin',
          animation: true,
          animationEasing: 'backInOut',
          animationDuration: function (idx) {
            // 越往后的数据时长越大
            return idx * 500;
          },
          symbolSize: [19, 32],   // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
          data: markPoint,
        }
      }
    ]
  };
  myChart_5.showLoading ();
  //获取城市数据并渲染
  let mapIds = cityArray.map (item => {
    return item.mpId;
  });
  var date = getNowFormatDate ();//获取当前日期
  Api.getCityMap ().then (geoJson => {
    myChart_5.hideLoading ();
    echarts.registerMap ('重庆', geoJson);
    myChart_5.setOption (option_5);
  }).then (re => {
    //获取区域访问量
    Api.getDayMpAppSummary (mapIds[0], true).then (res => {
      // console.log ('getMpAppSummary:', res.data);
      let result = res.result;
      cityArray[0].value = result.visitors;
      cityArray[0].dayValue = result.visits;
    }).then (re => {
      Api.getDayMpAppSummary (mapIds[1], true).then (resl => {
        // console.log ('getMpAppSummary:', resl.data);
        let result = resl.result;
        cityArray[1].value = result.visitors;
        cityArray[1].dayValue = result.visits;
      }).then (re => {
        Api.getDayMpAppSummary (mapIds[2]).then (reslu => {
          // console.log ('getMpAppSummary:', reslu.data);
          let result = reslu.result;
          cityArray[2].value = result.visitors;
          cityArray[2].dayValue = result.visits;
        }).then (re => {
          //储存数组下标定位当前加载的item数
          localStorage.setItem ('markIndex', 3);
          $ ('.aside-data .m-title').text (cityArray[0].name);
          $ ('.aside-data .m-all-views span').text (cityArray[0].value);
          $ ('.aside-data .m-days-views span').text (cityArray[0].dayValue);
          let markData_0 = markPointData.filter (item => {
            return item.name == cityArray[0].name;
          });
          option_5.series[1].markPoint.data = markData_0;
          myChart_5.setOption (option_5);
          //每隔两秒切换一次的地图标记
          let markIndex = 1;//标记序号
          let allPV, nowPV, nowName = '北碚';
          setInterval (function () {
            //若当前已经遍历完所有区县，则访问本地数组进行渲染
            if (markIndex < cityArray.length) {
              markIndex++;
              cityArray.forEach ((item, index) => {
                if (markIndex == index) {
                  nowName = item.name;
                  allPV = item.value;
                  nowPV = item.dayValue;
                }
              })
            } else {
              markIndex = 0;
              nowName = cityArray[1].name;
              allPV = cityArray[1].value;
              nowPV = cityArray[1].dayValue;
            }
            let markData = markPointData.filter (item => {
              return item.name == nowName;
            });
            option_5.series[1].markPoint.data = markData;
            myChart_5.setOption (option_5);
            //渲染区访问量
            $ ('.aside-data .m-title').text (nowName);
            $ ('.aside-data .m-all-views span').text (allPV);
            $ ('.aside-data .m-days-views span').text (nowPV);
            //当前加载的储存数组item数+1
            var nowIndex = localStorage.getItem ('markIndex');
            nowIndex++;
            localStorage.setItem ('markIndex', nowIndex);
            //若当前还没遍历完所有区县，则请求数据渲染
            if (nowIndex < cityArray.length) {
              Api.getDayMpAppSummary (mapIds[nowIndex], false).then (res => {
                // console.log ('getMpAppSummary:', res.data);
                let result = res.result;
                cityArray[nowIndex].value = result.visitors;
                cityArray[nowIndex].dayValue = result.visits;
              })
            }
          }, 6000);
        })
      })
    })
  });
}

//平台访问量图表
function indexSearHotChart () {
  //初始化图表
  const myChart_3 = echarts.init ($ ('#echart-r-t')[0]);
  //获取图表数据
  let xAxisData = [], //x轴数据
      yAxisData_UV = [], //y轴数据
      yAxisData_PV = [], //y轴数据
      mpIds;
  //组装mpIds参数
  mpIds = mapIdsArray.map( item => {
    return item.mpId;
  });
  mpIds = mpIds.join(',');
  // mpIds = 3486; //暂时取市政府网站的数据
  //组装x轴坐标数组
  for (var i = 0; i < 7 ;i ++) {
    var date = new Date();
    date = date.setDate(date.getDate() - i);
    var date_out = new Date(date);
    var date_m = date_out.getMonth() + 1;
    var date_d = date_out.getDate();
    xAxisData.push(date_m+ '.' +date_d);
  }
  xAxisData.reverse();
  console.log('xAxisData:', xAxisData);
  let date_now = getNowFormatDate ();//获取当前日期
  Api.getMpAppSummary (date_now, mpIds).then (res => {
    let result = res.Records[0].webs;
    yAxisData_UV.push(result.UV);
    yAxisData_UV.push(result.yesterdayUV);
    yAxisData_PV.push(result.PV);
    yAxisData_PV.push(result.yesterdayPV);
  }).then( res => {
    let date_2 = getNowFormatDate (2);//获取前2天日期
    Api.getMpAppSummary (date_2, mpIds).then (res => {
      let result = res.Records[0].webs;
      yAxisData_UV.push (result.UV);
      yAxisData_UV.push (result.yesterdayUV);
      yAxisData_PV.push (result.PV);
      yAxisData_PV.push (result.yesterdayPV);
    }).then (res => {
      let date_4 = getNowFormatDate (4);//获取前4天日期
      Api.getMpAppSummary (date_4, mpIds).then (res => {
        let result = res.Records[0].webs;
        yAxisData_UV.push (result.UV);
        yAxisData_UV.push (result.yesterdayUV);
        yAxisData_PV.push (result.PV);
        yAxisData_PV.push (result.yesterdayPV);
      }).then (res => {
        let date_6 = getNowFormatDate (6);//获取前6天日期
        Api.getMpAppSummary (date_6, mpIds).then (res => {
          let result = res.Records[0].webs;
          yAxisData_UV.push (result.UV);
          yAxisData_UV.push (result.yesterdayUV);
          yAxisData_PV.push (result.PV);
          yAxisData_PV.push (result.yesterdayPV);
        }).then(res => {
          yAxisData_UV.reverse();
          yAxisData_PV.reverse();
          //图表配置
          const option_3 = {
            color: ['#00C4F5'],
            tooltip: {
              trigger: 'item',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data: ['PV', 'UV'],
              textStyle: {
                color: '#fff'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
            xAxis: [
              {
                type: 'category',
                data: xAxisData,
                axisTick: {
                  alignWithLabel: true
                },
                axisLabel: {
                  textStyle: {
                    color: '#fff'
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: '#4574D6'
                  }
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                axisLabel: {
                  formatter: '{value}',
                  textStyle: {
                    color: '#fff'
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: '#4574D6'
                  },
                },
                splitLine: {
                  show: false
                }
              }
            ],
            series: [
              {
                name: 'PV',
                type: 'line',
                // yAxisIndex: 1,
                symbolSize: 10,//拐点大小
                symbol: 'circle',
                smooth: true,  //这句就是让曲线变平滑的
                itemStyle: {
                  normal: {
                    color: '#d41c2c',
                    lineStyle: {
                      color: '#d41c2c',
                      borderColor: '#fff',  //拐点边框颜色
                    }
                  }
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient (
                        0, 0, 0, 1,
                        [{
                          offset: 0, color: '#d41c2c' // 0% 处的颜色
                        }, {
                          offset: 0.5, color: 'rgba(212,28,44,0.5)' // 50% 处的颜色
                        }, {
                          offset: 1, color: 'rgba(212,28,44,0.1)' // 100% 处的颜色
                        }]
                    ) //区域渐变颜色
                  }
                },
                data: yAxisData_PV,
              },
              {
                name: 'UV',
                type: 'line',
                // yAxisIndex: 1,
                symbolSize: 10,//拐点大小
                symbol: 'circle',
                smooth: true,  //这句就是让曲线变平滑的
                itemStyle: {
                  normal: {
                    color: '#e37a0e',
                    lineStyle: {
                      color: '#e37a0e',
                      borderWidth: 5,
                      borderColor: '#fff',  //拐点边框颜色
                    }
                  }
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient (
                        0, 0, 0, 1,
                        [{
                          offset: 0, color: '#e37a0e' // 0% 处的颜色
                        }, {
                          offset: 0.5, color: 'rgba(227,122,14,0.71)' // 50% 处的颜色
                        }, {
                          offset: 1, color: 'rgba(227,122,14,0.4)' // 100% 处的颜色
                        }]
                    ) //区域渐变颜色
                  }
                },
                data: yAxisData_UV,
              }
            ]
          };
          //执行图表构建
          myChart_3.setOption (option_3);
        })
      })
    })
  }).catch( res => {
    let result = [
      {
        avgSessionDuration: 165590,
        avgSessionVisits: 3,
        avgVisits: 3,
        hour: "0",
        sessions: 7,
        visitors: 7,
        visits: 21
      },
      {
        avgSessionDuration: 135321,
        avgSessionVisits: 2.6,
        avgVisits: 2.6,
        hour: "1",
        sessions: 10,
        visitors: 10,
        visits: 26
      },
      {
        avgSessionDuration: 40642,
        avgSessionVisits: 1.66667,
        avgVisits: 1.66667,
        hour: "2",
        sessions: 6,
        visitors: 6,
        visits: 10
      },
      {
        avgSessionDuration: 0,
        avgSessionVisits: 1,
        avgVisits: 1,
        hour: "3",
        sessions: 3,
        visitors: 3,
        visits: 3
      },
      {
        avgSessionDuration: 1341724,
        avgSessionVisits: 2,
        avgVisits: 2,
        hour: "4",
        sessions: 10,
        visitors: 10,
        visits: 20
      },
      {
        avgSessionDuration: 510356,
        avgSessionVisits: 1.85714,
        avgVisits: 1.85714,
        hour: "5",
        sessions: 7,
        visitors: 7,
        visits: 13
      },
      {
        avgSessionDuration: 0,
        avgSessionVisits: 1,
        avgVisits: 1,
        hour: "6",
        sessions: 5,
        visitors: 5,
        visits: 5
      },
      {
        avgSessionDuration: 559501,
        avgSessionVisits: 1.58333,
        avgVisits: 1.58333,
        hour: "7",
        sessions: 12,
        visitors: 12,
        visits: 19
      },
      {
        avgSessionDuration: 163087,
        avgSessionVisits: 3.1,
        avgVisits: 3.17949,
        hour: "8",
        sessions: 40,
        visitors: 39,
        visits: 124
      },
      {
        avgSessionDuration: 327474,
        avgSessionVisits: 3.96552,
        avgVisits: 4.03509,
        hour: "9",
        sessions: 58,
        visitors: 57,
        visits: 230
      },
      {
        avgSessionDuration: 486420,
        avgSessionVisits: 3.53333,
        avgVisits: 3.53333,
        hour: "10",
        sessions: 60,
        visitors: 60,
        visits: 212
      },
      {
        avgSessionDuration: 260702,
        avgSessionVisits: 4.35484,
        avgVisits: 4.5,
        hour: "11",
        sessions: 62,
        visitors: 60,
        visits: 270
      },
      {
        avgSessionDuration: 195116,
        avgSessionVisits: 3.67742,
        avgVisits: 3.67742,
        hour: "12",
        sessions: 31,
        visitors: 31,
        visits: 114
      },
      {
        avgSessionDuration: 125148,
        avgSessionVisits: 2.43333,
        avgVisits: 2.43333,
        hour: "13",
        sessions: 30,
        visitors: 30,
        visits: 73
      },
      {
        avgSessionDuration: 363950,
        avgSessionVisits: 4.13333,
        avgVisits: 4.20339,
        hour: "14",
        sessions: 60,
        visitors: 59,
        visits: 248
      },
      {
        avgSessionDuration: 297485,
        avgSessionVisits: 4.04225,
        avgVisits: 4.1,
        hour: "15",
        sessions: 71,
        visitors: 70,
        visits: 287
      },
      {
        avgSessionDuration: 364426,
        avgSessionVisits: 5.06173,
        avgVisits: 5.125,
        hour: "16",
        sessions: 81,
        visitors: 80,
        visits: 410
      },
      {
        avgSessionDuration: 239534,
        avgSessionVisits: 3.25,
        avgVisits: 3.25,
        hour: "17",
        sessions: 44,
        visitors: 44,
        visits: 143
      },
      {
        avgSessionDuration: 290609,
        avgSessionVisits: 4.59259,
        avgVisits: 4.59259,
        hour: "18",
        sessions: 27,
        visitors: 27,
        visits: 124
      },
      {
        avgSessionDuration: 360114,
        avgSessionVisits: 4.33333,
        avgVisits: 4.33333,
        hour: "19",
        sessions: 21,
        visitors: 21,
        visits: 91
      },
      {
        avgSessionDuration: 217549,
        avgSessionVisits: 3.33333,
        avgVisits: 3.33333,
        hour: "20",
        sessions: 33,
        visitors: 33,
        visits: 110
      },
      {
        avgSessionDuration: 0,
        avgSessionVisits: 0,
        avgVisits: 0,
        hour: "21",
        sessions: 0,
        visitors: 0,
        visits: 0
      },
      {
        avgSessionDuration: 0,
        avgSessionVisits: 0,
        avgVisits: 0,
        hour: "22",
        sessions: 0,
        visitors: 0,
        visits: 0
      },
      {
        avgSessionDuration: 0,
        avgSessionVisits: 0,
        avgVisits: 0,
        hour: "23",
        sessions: 0,
        visitors: 0,
        visits: 0
      }
    ];
    var date = new Date();
    var now_hour = date.getHours();//当前时间
    var now_array;//最终的数组
    result.forEach( (item,index) => {
      if (now_hour <= 8) {
        now_array = result.slice(0, 8);
      } else {
        now_array = result.slice(0, now_hour)
      }
    });
    xAxisData = now_array.map (item => {
      return item.hour + 'h';
    });
    yAxisData_UV = now_array.map (item => {
      return item.visitors;
    })
    yAxisData_PV = now_array.map (item => {
      return item.visits;
    });
    //图表配置
    const option_3 = {
      color: ['#00C4F5'],
      tooltip: {
        trigger: 'item',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['PV', 'UV'],
        textStyle: {
          color: '#fff'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: xAxisData,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#4574D6'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#4574D6'
            },
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: 'PV',
          type: 'line',
          // yAxisIndex: 1,
          symbolSize: 10,//拐点大小
          symbol: "circle",
          smooth:true,  //这句就是让曲线变平滑的
          itemStyle: {
            normal: {
              color: '#d41c2c',
              lineStyle: {
                color:'#d41c2c',
                borderColor:'#fff',  //拐点边框颜色
              }
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient (
                  0, 0, 0, 1,
                  [{
                    offset: 0, color: '#d41c2c' // 0% 处的颜色
                  }, {
                    offset: 0.5, color: 'rgba(212,28,44,0.5)' // 50% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(212,28,44,0.1)' // 100% 处的颜色
                  }]
              ) //区域渐变颜色
            }
          },
          data: yAxisData_PV,
        },
        {
          name: 'UV',
          type: 'line',
          // yAxisIndex: 1,
          symbolSize: 10,//拐点大小
          symbol: "circle",
          smooth:true,  //这句就是让曲线变平滑的
          itemStyle: {
            normal: {
              color: '#e37a0e',
              lineStyle: {
                color: '#e37a0e',
                borderWidth: 5,
                borderColor:'#fff',  //拐点边框颜色
              }
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient (
                  0, 0, 0, 1,
                  [{
                    offset: 0, color: '#e37a0e' // 0% 处的颜色
                  }, {
                    offset: 0.5, color: 'rgba(227,122,14,0.71)' // 50% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(227,122,14,0.4)' // 100% 处的颜色
                  }]
              ) //区域渐变颜色
            }
          },
          data: yAxisData_UV,
        }
      ]
    };
    //执行图表构建
    myChart_3.setOption (option_3);
  });

  /*************模拟数据 start*******************/
  // indicatorData = [
  //   { name: '渝快办', max: 50000},
  //   { name: '社保', max: 50000},
  //   { name: '公积金', max: 50000},
  //   { name: '统一资源库', max: 50000},
  //   { name: '重庆领导', max: 50000},
  //   { name: '身份证办理', max: 50000},
  //   { name: '重庆火锅', max: 50000}
  // ];
  // seriesData = [43000, 30000, 28000, 35000, 50000, 29000, 25000];
  /*************模拟数据 end*******************/
}

//站点发稿量排行图表
let clickIndex = 1;
function indexSiteSort (type = 'day') {
  // localStorage.setItem('local_yAxisData_d',JSON.stringify([{"doccount":"97","sitename":"重庆市巴南区人民政府公众信息网","siteid":"252","sitedesc":"重庆市巴南区人民政府","docstatus":"10"},{"doccount":"62","sitename":"重庆市铜梁区公众信息网","siteid":"171","sitedesc":"重庆市铜梁区人民政府","docstatus":"10"},{"doccount":"33","sitename":"重庆市沙坪坝区人民政府公众信息网","siteid":"235","sitedesc":"重庆市沙坪坝区人民政府","docstatus":"10"},{"doccount":"10","sitename":"重庆市人民政府","siteid":"28","sitedesc":"重庆市人民政府网","docstatus":"10"},{"doccount":"10","sitename":"重庆市人民政府_36","siteid":"36","sitedesc":"重庆市人民政府","docstatus":"10"},{"doccount":"7","sitename":"重庆市涪陵区人民政府","siteid":"206","sitedesc":"重庆市涪陵区人民政府","docstatus":"10"},{"doccount":"7","sitename":"重庆市卫生健康委员会","siteid":"242","sitedesc":"重庆市卫生健康委员会","docstatus":"10"},{"doccount":"6","sitename":"渝北区人民政府网站","siteid":"263","sitedesc":"重庆市渝北区人民政府","docstatus":"10"},{"doccount":"6","sitename":"重庆市民政局","siteid":"218","sitedesc":"重庆市民政局","docstatus":"10"},{"doccount":"5","sitename":"重庆市大足区人民政府","siteid":"175","sitedesc":"重庆市大足区人民政府","docstatus":"10"},{"doccount":"4","sitename":"重庆市市场监督管理局","siteid":"225","sitedesc":"重庆市市场监督管理局","docstatus":"10"},{"doccount":"4","sitename":"垫江县人民政府门户网","siteid":"157","sitedesc":"重庆市垫江县人民政府","docstatus":"10"},{"doccount":"3","sitename":"重庆市农业农村委员会","siteid":"161","sitedesc":"重庆市农业农村委员会","docstatus":"10"},{"doccount":"3","sitename":"重庆市应急管理局网站","siteid":"230","sitedesc":"重庆市应急管理局","docstatus":"10"},{"doccount":"3","sitename":"重庆市黔江区人民政府公众信息网","siteid":"210","sitedesc":"重庆市黔江区人民政府","docstatus":"10"},{"doccount":"2","sitename":"奉节县人民政府网","siteid":"168","sitedesc":"重庆市奉节县人民政府","docstatus":"10"},{"doccount":"2","sitename":"合川区人民政府_531","siteid":"531","sitedesc":"重庆市合川区人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市荣昌区人民政府","siteid":"264","sitedesc":"重庆市荣昌区人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市巫溪县人民政府门户网","siteid":"224","sitedesc":"重庆市巫溪县人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市渝中区人民政府","siteid":"229","sitedesc":"重庆市渝中区人民政府","docstatus":"10"},{"doccount":"1","sitename":"两江新区公众信息网","siteid":"199","sitedesc":"两江新区信息公开网","docstatus":"10"},{"doccount":"1","sitename":"重庆市城市管理局","siteid":"173","sitedesc":"重庆市城市管理局","docstatus":"10"},{"doccount":"1","sitename":"丰都县人民政府网","siteid":"200","sitedesc":"重庆市丰都县人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆市规划和自然资源局公众信息网","siteid":"186","sitedesc":"重庆市规划和自然资源局","docstatus":"10"},{"doccount":"1","sitename":"重庆江北区政府网","siteid":"190","sitedesc":"重庆市江北区人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆高新技术产业开发区门户网站","siteid":"202","sitedesc":"重庆高新技术产业开发区门户网站","docstatus":"10"},{"doccount":"1","sitename":"重庆市开州区人民政府公众信息网","siteid":"238","sitedesc":"重庆市开州区人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆市生态环境局政府公众信息网","siteid":"249","sitedesc":"重庆市生态环境局","docstatus":"10"},{"doccount":"1","sitename":"重庆市退役军人事务局","siteid":"529","sitedesc":"重庆市退役军人事务局","docstatus":"10"}]))
  // localStorage.setItem('local_yAxisData_w',JSON.stringify([{"doccount":"97","sitename":"重庆市巴南区人民政府公众信息网","siteid":"252","sitedesc":"重庆市巴南区人民政府","docstatus":"10"},{"doccount":"62","sitename":"重庆市铜梁区公众信息网","siteid":"171","sitedesc":"重庆市铜梁区人民政府","docstatus":"10"},{"doccount":"33","sitename":"重庆市沙坪坝区人民政府公众信息网","siteid":"235","sitedesc":"重庆市沙坪坝区人民政府","docstatus":"10"},{"doccount":"10","sitename":"重庆市人民政府","siteid":"28","sitedesc":"重庆市人民政府网","docstatus":"10"},{"doccount":"10","sitename":"重庆市人民政府_36","siteid":"36","sitedesc":"重庆市人民政府","docstatus":"10"},{"doccount":"7","sitename":"重庆市涪陵区人民政府","siteid":"206","sitedesc":"重庆市涪陵区人民政府","docstatus":"10"},{"doccount":"7","sitename":"重庆市卫生健康委员会","siteid":"242","sitedesc":"重庆市卫生健康委员会","docstatus":"10"},{"doccount":"6","sitename":"渝北区人民政府网站","siteid":"263","sitedesc":"重庆市渝北区人民政府","docstatus":"10"},{"doccount":"6","sitename":"重庆市民政局","siteid":"218","sitedesc":"重庆市民政局","docstatus":"10"},{"doccount":"5","sitename":"重庆市大足区人民政府","siteid":"175","sitedesc":"重庆市大足区人民政府","docstatus":"10"},{"doccount":"4","sitename":"重庆市市场监督管理局","siteid":"225","sitedesc":"重庆市市场监督管理局","docstatus":"10"},{"doccount":"4","sitename":"垫江县人民政府门户网","siteid":"157","sitedesc":"重庆市垫江县人民政府","docstatus":"10"},{"doccount":"3","sitename":"重庆市农业农村委员会","siteid":"161","sitedesc":"重庆市农业农村委员会","docstatus":"10"},{"doccount":"3","sitename":"重庆市应急管理局网站","siteid":"230","sitedesc":"重庆市应急管理局","docstatus":"10"},{"doccount":"3","sitename":"重庆市黔江区人民政府公众信息网","siteid":"210","sitedesc":"重庆市黔江区人民政府","docstatus":"10"},{"doccount":"2","sitename":"奉节县人民政府网","siteid":"168","sitedesc":"重庆市奉节县人民政府","docstatus":"10"},{"doccount":"2","sitename":"合川区人民政府_531","siteid":"531","sitedesc":"重庆市合川区人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市荣昌区人民政府","siteid":"264","sitedesc":"重庆市荣昌区人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市巫溪县人民政府门户网","siteid":"224","sitedesc":"重庆市巫溪县人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市渝中区人民政府","siteid":"229","sitedesc":"重庆市渝中区人民政府","docstatus":"10"},{"doccount":"1","sitename":"两江新区公众信息网","siteid":"199","sitedesc":"两江新区信息公开网","docstatus":"10"},{"doccount":"1","sitename":"重庆市城市管理局","siteid":"173","sitedesc":"重庆市城市管理局","docstatus":"10"},{"doccount":"1","sitename":"丰都县人民政府网","siteid":"200","sitedesc":"重庆市丰都县人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆市规划和自然资源局公众信息网","siteid":"186","sitedesc":"重庆市规划和自然资源局","docstatus":"10"},{"doccount":"1","sitename":"重庆江北区政府网","siteid":"190","sitedesc":"重庆市江北区人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆高新技术产业开发区门户网站","siteid":"202","sitedesc":"重庆高新技术产业开发区门户网站","docstatus":"10"},{"doccount":"1","sitename":"重庆市开州区人民政府公众信息网","siteid":"238","sitedesc":"重庆市开州区人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆市生态环境局政府公众信息网","siteid":"249","sitedesc":"重庆市生态环境局","docstatus":"10"},{"doccount":"1","sitename":"重庆市退役军人事务局","siteid":"529","sitedesc":"重庆市退役军人事务局","docstatus":"10"}]))
  // localStorage.setItem('local_yAxisData_m',JSON.stringify([{"doccount":"97","sitename":"重庆市巴南区人民政府公众信息网","siteid":"252","sitedesc":"重庆市巴南区人民政府","docstatus":"10"},{"doccount":"62","sitename":"重庆市铜梁区公众信息网","siteid":"171","sitedesc":"重庆市铜梁区人民政府","docstatus":"10"},{"doccount":"33","sitename":"重庆市沙坪坝区人民政府公众信息网","siteid":"235","sitedesc":"重庆市沙坪坝区人民政府","docstatus":"10"},{"doccount":"10","sitename":"重庆市人民政府","siteid":"28","sitedesc":"重庆市人民政府网","docstatus":"10"},{"doccount":"10","sitename":"重庆市人民政府_36","siteid":"36","sitedesc":"重庆市人民政府","docstatus":"10"},{"doccount":"7","sitename":"重庆市涪陵区人民政府","siteid":"206","sitedesc":"重庆市涪陵区人民政府","docstatus":"10"},{"doccount":"7","sitename":"重庆市卫生健康委员会","siteid":"242","sitedesc":"重庆市卫生健康委员会","docstatus":"10"},{"doccount":"6","sitename":"渝北区人民政府网站","siteid":"263","sitedesc":"重庆市渝北区人民政府","docstatus":"10"},{"doccount":"6","sitename":"重庆市民政局","siteid":"218","sitedesc":"重庆市民政局","docstatus":"10"},{"doccount":"5","sitename":"重庆市大足区人民政府","siteid":"175","sitedesc":"重庆市大足区人民政府","docstatus":"10"},{"doccount":"4","sitename":"重庆市市场监督管理局","siteid":"225","sitedesc":"重庆市市场监督管理局","docstatus":"10"},{"doccount":"4","sitename":"垫江县人民政府门户网","siteid":"157","sitedesc":"重庆市垫江县人民政府","docstatus":"10"},{"doccount":"3","sitename":"重庆市农业农村委员会","siteid":"161","sitedesc":"重庆市农业农村委员会","docstatus":"10"},{"doccount":"3","sitename":"重庆市应急管理局网站","siteid":"230","sitedesc":"重庆市应急管理局","docstatus":"10"},{"doccount":"3","sitename":"重庆市黔江区人民政府公众信息网","siteid":"210","sitedesc":"重庆市黔江区人民政府","docstatus":"10"},{"doccount":"2","sitename":"奉节县人民政府网","siteid":"168","sitedesc":"重庆市奉节县人民政府","docstatus":"10"},{"doccount":"2","sitename":"合川区人民政府_531","siteid":"531","sitedesc":"重庆市合川区人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市荣昌区人民政府","siteid":"264","sitedesc":"重庆市荣昌区人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市巫溪县人民政府门户网","siteid":"224","sitedesc":"重庆市巫溪县人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市渝中区人民政府","siteid":"229","sitedesc":"重庆市渝中区人民政府","docstatus":"10"},{"doccount":"1","sitename":"两江新区公众信息网","siteid":"199","sitedesc":"两江新区信息公开网","docstatus":"10"},{"doccount":"1","sitename":"重庆市城市管理局","siteid":"173","sitedesc":"重庆市城市管理局","docstatus":"10"},{"doccount":"1","sitename":"丰都县人民政府网","siteid":"200","sitedesc":"重庆市丰都县人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆市规划和自然资源局公众信息网","siteid":"186","sitedesc":"重庆市规划和自然资源局","docstatus":"10"},{"doccount":"1","sitename":"重庆江北区政府网","siteid":"190","sitedesc":"重庆市江北区人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆高新技术产业开发区门户网站","siteid":"202","sitedesc":"重庆高新技术产业开发区门户网站","docstatus":"10"},{"doccount":"1","sitename":"重庆市开州区人民政府公众信息网","siteid":"238","sitedesc":"重庆市开州区人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆市生态环境局政府公众信息网","siteid":"249","sitedesc":"重庆市生态环境局","docstatus":"10"},{"doccount":"1","sitename":"重庆市退役军人事务局","siteid":"529","sitedesc":"重庆市退役军人事务局","docstatus":"10"}]))// localStorage.setItem('local_yAxisData_d',JSON.stringify([{"doccount":"97","sitename":"重庆市巴南区人民政府公众信息网","siteid":"252","sitedesc":"重庆市巴南区人民政府","docstatus":"10"},{"doccount":"62","sitename":"重庆市铜梁区公众信息网","siteid":"171","sitedesc":"重庆市铜梁区人民政府","docstatus":"10"},{"doccount":"33","sitename":"重庆市沙坪坝区人民政府公众信息网","siteid":"235","sitedesc":"重庆市沙坪坝区人民政府","docstatus":"10"},{"doccount":"10","sitename":"重庆市人民政府","siteid":"28","sitedesc":"重庆市人民政府网","docstatus":"10"},{"doccount":"10","sitename":"重庆市人民政府_36","siteid":"36","sitedesc":"重庆市人民政府","docstatus":"10"},{"doccount":"7","sitename":"重庆市涪陵区人民政府","siteid":"206","sitedesc":"重庆市涪陵区人民政府","docstatus":"10"},{"doccount":"7","sitename":"重庆市卫生健康委员会","siteid":"242","sitedesc":"重庆市卫生健康委员会","docstatus":"10"},{"doccount":"6","sitename":"渝北区人民政府网站","siteid":"263","sitedesc":"重庆市渝北区人民政府","docstatus":"10"},{"doccount":"6","sitename":"重庆市民政局","siteid":"218","sitedesc":"重庆市民政局","docstatus":"10"},{"doccount":"5","sitename":"重庆市大足区人民政府","siteid":"175","sitedesc":"重庆市大足区人民政府","docstatus":"10"},{"doccount":"4","sitename":"重庆市市场监督管理局","siteid":"225","sitedesc":"重庆市市场监督管理局","docstatus":"10"},{"doccount":"4","sitename":"垫江县人民政府门户网","siteid":"157","sitedesc":"重庆市垫江县人民政府","docstatus":"10"},{"doccount":"3","sitename":"重庆市农业农村委员会","siteid":"161","sitedesc":"重庆市农业农村委员会","docstatus":"10"},{"doccount":"3","sitename":"重庆市应急管理局网站","siteid":"230","sitedesc":"重庆市应急管理局","docstatus":"10"},{"doccount":"3","sitename":"重庆市黔江区人民政府公众信息网","siteid":"210","sitedesc":"重庆市黔江区人民政府","docstatus":"10"},{"doccount":"2","sitename":"奉节县人民政府网","siteid":"168","sitedesc":"重庆市奉节县人民政府","docstatus":"10"},{"doccount":"2","sitename":"合川区人民政府_531","siteid":"531","sitedesc":"重庆市合川区人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市荣昌区人民政府","siteid":"264","sitedesc":"重庆市荣昌区人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市巫溪县人民政府门户网","siteid":"224","sitedesc":"重庆市巫溪县人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市渝中区人民政府","siteid":"229","sitedesc":"重庆市渝中区人民政府","docstatus":"10"},{"doccount":"1","sitename":"两江新区公众信息网","siteid":"199","sitedesc":"两江新区信息公开网","docstatus":"10"},{"doccount":"1","sitename":"重庆市城市管理局","siteid":"173","sitedesc":"重庆市城市管理局","docstatus":"10"},{"doccount":"1","sitename":"丰都县人民政府网","siteid":"200","sitedesc":"重庆市丰都县人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆市规划和自然资源局公众信息网","siteid":"186","sitedesc":"重庆市规划和自然资源局","docstatus":"10"},{"doccount":"1","sitename":"重庆江北区政府网","siteid":"190","sitedesc":"重庆市江北区人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆高新技术产业开发区门户网站","siteid":"202","sitedesc":"重庆高新技术产业开发区门户网站","docstatus":"10"},{"doccount":"1","sitename":"重庆市开州区人民政府公众信息网","siteid":"238","sitedesc":"重庆市开州区人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆市生态环境局政府公众信息网","siteid":"249","sitedesc":"重庆市生态环境局","docstatus":"10"},{"doccount":"1","sitename":"重庆市退役军人事务局","siteid":"529","sitedesc":"重庆市退役军人事务局","docstatus":"10"}]))
  // localStorage.setItem('local_seriesData_d',JSON.stringify([{"doccount":"97","sitename":"重庆市巴南区人民政府公众信息网","siteid":"252","sitedesc":"重庆市巴南区人民政府","docstatus":"10"},{"doccount":"62","sitename":"重庆市铜梁区公众信息网","siteid":"171","sitedesc":"重庆市铜梁区人民政府","docstatus":"10"},{"doccount":"33","sitename":"重庆市沙坪坝区人民政府公众信息网","siteid":"235","sitedesc":"重庆市沙坪坝区人民政府","docstatus":"10"},{"doccount":"10","sitename":"重庆市人民政府","siteid":"28","sitedesc":"重庆市人民政府网","docstatus":"10"},{"doccount":"10","sitename":"重庆市人民政府_36","siteid":"36","sitedesc":"重庆市人民政府","docstatus":"10"},{"doccount":"7","sitename":"重庆市涪陵区人民政府","siteid":"206","sitedesc":"重庆市涪陵区人民政府","docstatus":"10"},{"doccount":"7","sitename":"重庆市卫生健康委员会","siteid":"242","sitedesc":"重庆市卫生健康委员会","docstatus":"10"},{"doccount":"6","sitename":"渝北区人民政府网站","siteid":"263","sitedesc":"重庆市渝北区人民政府","docstatus":"10"},{"doccount":"6","sitename":"重庆市民政局","siteid":"218","sitedesc":"重庆市民政局","docstatus":"10"},{"doccount":"5","sitename":"重庆市大足区人民政府","siteid":"175","sitedesc":"重庆市大足区人民政府","docstatus":"10"},{"doccount":"4","sitename":"重庆市市场监督管理局","siteid":"225","sitedesc":"重庆市市场监督管理局","docstatus":"10"},{"doccount":"4","sitename":"垫江县人民政府门户网","siteid":"157","sitedesc":"重庆市垫江县人民政府","docstatus":"10"},{"doccount":"3","sitename":"重庆市农业农村委员会","siteid":"161","sitedesc":"重庆市农业农村委员会","docstatus":"10"},{"doccount":"3","sitename":"重庆市应急管理局网站","siteid":"230","sitedesc":"重庆市应急管理局","docstatus":"10"},{"doccount":"3","sitename":"重庆市黔江区人民政府公众信息网","siteid":"210","sitedesc":"重庆市黔江区人民政府","docstatus":"10"},{"doccount":"2","sitename":"奉节县人民政府网","siteid":"168","sitedesc":"重庆市奉节县人民政府","docstatus":"10"},{"doccount":"2","sitename":"合川区人民政府_531","siteid":"531","sitedesc":"重庆市合川区人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市荣昌区人民政府","siteid":"264","sitedesc":"重庆市荣昌区人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市巫溪县人民政府门户网","siteid":"224","sitedesc":"重庆市巫溪县人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市渝中区人民政府","siteid":"229","sitedesc":"重庆市渝中区人民政府","docstatus":"10"},{"doccount":"1","sitename":"两江新区公众信息网","siteid":"199","sitedesc":"两江新区信息公开网","docstatus":"10"},{"doccount":"1","sitename":"重庆市城市管理局","siteid":"173","sitedesc":"重庆市城市管理局","docstatus":"10"},{"doccount":"1","sitename":"丰都县人民政府网","siteid":"200","sitedesc":"重庆市丰都县人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆市规划和自然资源局公众信息网","siteid":"186","sitedesc":"重庆市规划和自然资源局","docstatus":"10"},{"doccount":"1","sitename":"重庆江北区政府网","siteid":"190","sitedesc":"重庆市江北区人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆高新技术产业开发区门户网站","siteid":"202","sitedesc":"重庆高新技术产业开发区门户网站","docstatus":"10"},{"doccount":"1","sitename":"重庆市开州区人民政府公众信息网","siteid":"238","sitedesc":"重庆市开州区人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆市生态环境局政府公众信息网","siteid":"249","sitedesc":"重庆市生态环境局","docstatus":"10"},{"doccount":"1","sitename":"重庆市退役军人事务局","siteid":"529","sitedesc":"重庆市退役军人事务局","docstatus":"10"}]))
  // localStorage.setItem('local_seriesData_w',JSON.stringify([{"doccount":"97","sitename":"重庆市巴南区人民政府公众信息网","siteid":"252","sitedesc":"重庆市巴南区人民政府","docstatus":"10"},{"doccount":"62","sitename":"重庆市铜梁区公众信息网","siteid":"171","sitedesc":"重庆市铜梁区人民政府","docstatus":"10"},{"doccount":"33","sitename":"重庆市沙坪坝区人民政府公众信息网","siteid":"235","sitedesc":"重庆市沙坪坝区人民政府","docstatus":"10"},{"doccount":"10","sitename":"重庆市人民政府","siteid":"28","sitedesc":"重庆市人民政府网","docstatus":"10"},{"doccount":"10","sitename":"重庆市人民政府_36","siteid":"36","sitedesc":"重庆市人民政府","docstatus":"10"},{"doccount":"7","sitename":"重庆市涪陵区人民政府","siteid":"206","sitedesc":"重庆市涪陵区人民政府","docstatus":"10"},{"doccount":"7","sitename":"重庆市卫生健康委员会","siteid":"242","sitedesc":"重庆市卫生健康委员会","docstatus":"10"},{"doccount":"6","sitename":"渝北区人民政府网站","siteid":"263","sitedesc":"重庆市渝北区人民政府","docstatus":"10"},{"doccount":"6","sitename":"重庆市民政局","siteid":"218","sitedesc":"重庆市民政局","docstatus":"10"},{"doccount":"5","sitename":"重庆市大足区人民政府","siteid":"175","sitedesc":"重庆市大足区人民政府","docstatus":"10"},{"doccount":"4","sitename":"重庆市市场监督管理局","siteid":"225","sitedesc":"重庆市市场监督管理局","docstatus":"10"},{"doccount":"4","sitename":"垫江县人民政府门户网","siteid":"157","sitedesc":"重庆市垫江县人民政府","docstatus":"10"},{"doccount":"3","sitename":"重庆市农业农村委员会","siteid":"161","sitedesc":"重庆市农业农村委员会","docstatus":"10"},{"doccount":"3","sitename":"重庆市应急管理局网站","siteid":"230","sitedesc":"重庆市应急管理局","docstatus":"10"},{"doccount":"3","sitename":"重庆市黔江区人民政府公众信息网","siteid":"210","sitedesc":"重庆市黔江区人民政府","docstatus":"10"},{"doccount":"2","sitename":"奉节县人民政府网","siteid":"168","sitedesc":"重庆市奉节县人民政府","docstatus":"10"},{"doccount":"2","sitename":"合川区人民政府_531","siteid":"531","sitedesc":"重庆市合川区人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市荣昌区人民政府","siteid":"264","sitedesc":"重庆市荣昌区人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市巫溪县人民政府门户网","siteid":"224","sitedesc":"重庆市巫溪县人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市渝中区人民政府","siteid":"229","sitedesc":"重庆市渝中区人民政府","docstatus":"10"},{"doccount":"1","sitename":"两江新区公众信息网","siteid":"199","sitedesc":"两江新区信息公开网","docstatus":"10"},{"doccount":"1","sitename":"重庆市城市管理局","siteid":"173","sitedesc":"重庆市城市管理局","docstatus":"10"},{"doccount":"1","sitename":"丰都县人民政府网","siteid":"200","sitedesc":"重庆市丰都县人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆市规划和自然资源局公众信息网","siteid":"186","sitedesc":"重庆市规划和自然资源局","docstatus":"10"},{"doccount":"1","sitename":"重庆江北区政府网","siteid":"190","sitedesc":"重庆市江北区人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆高新技术产业开发区门户网站","siteid":"202","sitedesc":"重庆高新技术产业开发区门户网站","docstatus":"10"},{"doccount":"1","sitename":"重庆市开州区人民政府公众信息网","siteid":"238","sitedesc":"重庆市开州区人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆市生态环境局政府公众信息网","siteid":"249","sitedesc":"重庆市生态环境局","docstatus":"10"},{"doccount":"1","sitename":"重庆市退役军人事务局","siteid":"529","sitedesc":"重庆市退役军人事务局","docstatus":"10"}]))
  // localStorage.setItem('local_seriesData_m',JSON.stringify([{"doccount":"97","sitename":"重庆市巴南区人民政府公众信息网","siteid":"252","sitedesc":"重庆市巴南区人民政府","docstatus":"10"},{"doccount":"62","sitename":"重庆市铜梁区公众信息网","siteid":"171","sitedesc":"重庆市铜梁区人民政府","docstatus":"10"},{"doccount":"33","sitename":"重庆市沙坪坝区人民政府公众信息网","siteid":"235","sitedesc":"重庆市沙坪坝区人民政府","docstatus":"10"},{"doccount":"10","sitename":"重庆市人民政府","siteid":"28","sitedesc":"重庆市人民政府网","docstatus":"10"},{"doccount":"10","sitename":"重庆市人民政府_36","siteid":"36","sitedesc":"重庆市人民政府","docstatus":"10"},{"doccount":"7","sitename":"重庆市涪陵区人民政府","siteid":"206","sitedesc":"重庆市涪陵区人民政府","docstatus":"10"},{"doccount":"7","sitename":"重庆市卫生健康委员会","siteid":"242","sitedesc":"重庆市卫生健康委员会","docstatus":"10"},{"doccount":"6","sitename":"渝北区人民政府网站","siteid":"263","sitedesc":"重庆市渝北区人民政府","docstatus":"10"},{"doccount":"6","sitename":"重庆市民政局","siteid":"218","sitedesc":"重庆市民政局","docstatus":"10"},{"doccount":"5","sitename":"重庆市大足区人民政府","siteid":"175","sitedesc":"重庆市大足区人民政府","docstatus":"10"},{"doccount":"4","sitename":"重庆市市场监督管理局","siteid":"225","sitedesc":"重庆市市场监督管理局","docstatus":"10"},{"doccount":"4","sitename":"垫江县人民政府门户网","siteid":"157","sitedesc":"重庆市垫江县人民政府","docstatus":"10"},{"doccount":"3","sitename":"重庆市农业农村委员会","siteid":"161","sitedesc":"重庆市农业农村委员会","docstatus":"10"},{"doccount":"3","sitename":"重庆市应急管理局网站","siteid":"230","sitedesc":"重庆市应急管理局","docstatus":"10"},{"doccount":"3","sitename":"重庆市黔江区人民政府公众信息网","siteid":"210","sitedesc":"重庆市黔江区人民政府","docstatus":"10"},{"doccount":"2","sitename":"奉节县人民政府网","siteid":"168","sitedesc":"重庆市奉节县人民政府","docstatus":"10"},{"doccount":"2","sitename":"合川区人民政府_531","siteid":"531","sitedesc":"重庆市合川区人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市荣昌区人民政府","siteid":"264","sitedesc":"重庆市荣昌区人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市巫溪县人民政府门户网","siteid":"224","sitedesc":"重庆市巫溪县人民政府","docstatus":"10"},{"doccount":"2","sitename":"重庆市渝中区人民政府","siteid":"229","sitedesc":"重庆市渝中区人民政府","docstatus":"10"},{"doccount":"1","sitename":"两江新区公众信息网","siteid":"199","sitedesc":"两江新区信息公开网","docstatus":"10"},{"doccount":"1","sitename":"重庆市城市管理局","siteid":"173","sitedesc":"重庆市城市管理局","docstatus":"10"},{"doccount":"1","sitename":"丰都县人民政府网","siteid":"200","sitedesc":"重庆市丰都县人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆市规划和自然资源局公众信息网","siteid":"186","sitedesc":"重庆市规划和自然资源局","docstatus":"10"},{"doccount":"1","sitename":"重庆江北区政府网","siteid":"190","sitedesc":"重庆市江北区人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆高新技术产业开发区门户网站","siteid":"202","sitedesc":"重庆高新技术产业开发区门户网站","docstatus":"10"},{"doccount":"1","sitename":"重庆市开州区人民政府公众信息网","siteid":"238","sitedesc":"重庆市开州区人民政府","docstatus":"10"},{"doccount":"1","sitename":"重庆市生态环境局政府公众信息网","siteid":"249","sitedesc":"重庆市生态环境局","docstatus":"10"},{"doccount":"1","sitename":"重庆市退役军人事务局","siteid":"529","sitedesc":"重庆市退役军人事务局","docstatus":"10"}]))
  //实例化图表
  const myChart_4 = echarts.init ($ ('#echart-r-b')[0]);
  let yAxisData_d, seriesData_d,
      yAxisData_w, seriesData_w,
      yAxisData_m, seriesData_m,
      yAxisData, seriesData;
  let local_yAxisData_d = JSON.parse(localStorage.getItem('local_yAxisData_d')), local_seriesData_d = JSON.parse(localStorage.getItem('local_seriesData_d')),
      local_yAxisData_w = JSON.parse(localStorage.getItem('local_yAxisData_w')), local_seriesData_w = JSON.parse(localStorage.getItem('local_seriesData_w')),
      local_yAxisData_m = JSON.parse(localStorage.getItem('local_yAxisData_m')), local_seriesData_m = JSON.parse(localStorage.getItem('local_seriesData_m'));
  if (local_seriesData_m) {
    if (type == 'day') {
      yAxisData = local_yAxisData_d;
      seriesData = local_seriesData_d;
    } else if (type == 'week') {
      yAxisData = local_yAxisData_w;
      seriesData = local_seriesData_w;
    } else {
      yAxisData = local_yAxisData_m;
      seriesData = local_seriesData_m;
    }
    //图表信息配置
    const option_4 = {
      xAxis: {
        show: false,
      },
      grid: {
        left: 20,
        bottom: 0,
        containLabel: true
      },
      yAxis: {
        type: 'category',
        data: yAxisData,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff'
          }
        },
        axisLine: {
          show: true,
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
          name: '2011年',
          type: 'bar',
          barWidth: '22px',
          barCategoryGap: '24px',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(68,115,237,0.08)'
          },
          data: seriesData,
          label: {
            show: true, //开启显示
            position: 'right', //在上方显示
            color: '#00A3A1',
            fontSize: 14,
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient (
                  0, 0, 1, 0,
                  [
                    {offset: 0, color: '#e56639'},                   //柱图渐变色
                    {offset: 1, color: '#f1b018'},                   //柱图渐变色
                  ]
              )
            }
          }
        }
      ]
    };
    //创建图表
    myChart_4.setOption (option_4);
    return;
  }
  //获取图表数据-日
  Api.getSiteSortByDoc ('0d').then (res => {
    // console.log (res);
    let result = res.datas;
    yAxisData_d = result.map ((item, index) => {
      return item.sitedesc;
    });
    yAxisData_d = yAxisData_d.slice (0, 8).reverse();
    localStorage.setItem('local_yAxisData_d',JSON.stringify(yAxisData_d));
    seriesData_d = result.map ((item, index) => {
      return item.doccount;
    });
    seriesData_d = seriesData_d.slice (0, 8).reverse();
    localStorage.setItem('local_seriesData_d',JSON.stringify(seriesData_d));
  }).then (re => {
    //获取图表数据-周
    Api.getSiteSortByDoc ('0w').then (res => {
      // console.log (res);
      let result = res.datas;
      yAxisData_w = result.map ((item, index) => {
        return item.sitedesc;
      });
      yAxisData_w = yAxisData_w.slice (0, 8).reverse();
      localStorage.setItem('local_yAxisData_w',JSON.stringify(yAxisData_w));
      seriesData_w = result.map ((item, index) => {
        return item.doccount;
      });
      seriesData_w = seriesData_w.slice (0, 8).reverse();
      localStorage.setItem('local_seriesData_w',JSON.stringify(seriesData_w));
    }).then (r => {
      //获取图表数据-月
      Api.getSiteSortByDoc ('0m').then (res => {
        // console.log (res);
        let result = res.datas;
        yAxisData_m = result.map ((item, index) => {
          return item.sitedesc;
        });
        yAxisData_m = yAxisData_m.slice (0, 8).reverse();
        localStorage.setItem('local_yAxisData_m',JSON.stringify(yAxisData_m));
        seriesData_m = result.map ((item, index) => {
          return item.doccount;
        });
        seriesData_m = seriesData_m.slice (0, 8).reverse();
        localStorage.setItem('local_seriesData_m',JSON.stringify(seriesData_m));
      }).then (rel => {
        if (type == 'day') {
          yAxisData = yAxisData_d;
          seriesData = seriesData_d;
        } else if (type == 'week') {
          yAxisData = yAxisData_w;
          seriesData = seriesData_w;
        } else {
          yAxisData = yAxisData_m;
          seriesData = seriesData_m;
        }
        /*************模拟数据 start*******************/
        // yAxisData = ['江北', '武隆', '合川', '万州', '云阳', '潼南', '沙坪坝', '渝北'];
        // seriesData = [480000, 500000, 630230, 717440, 849700, 903400, 1348900, 1820300 ];
        /*************模拟数据 end*******************/
            //图表信息配置
        const option_4 = {
              xAxis: {
                show: false,
              },
              grid: {
                left: 20,
                bottom: 0,
                containLabel: true
              },
              yAxis: {
                type: 'category',
                data: yAxisData,
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                },
                axisLine: {
                  show: true,
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
                  name: '2011年',
                  type: 'bar',
                  barWidth: '22px',
                  barCategoryGap: '24px',
                  showBackground: true,
                  backgroundStyle: {
                    color: 'rgba(68,115,237,0.08)'
                  },
                  data: seriesData,
                  label: {
                    show: true, //开启显示
                    position: 'right', //在上方显示
                    color: '#00A3A1',
                    fontSize: 14,
                  },
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient (
                          0, 0, 1, 0,
                          [
                            {offset: 0, color: '#e56639'},                   //柱图渐变色
                            {offset: 1, color: '#f1b018'},                   //柱图渐变色
                          ]
                      )
                    }
                  }
                }
              ]
            };
        //创建图表
        myChart_4.setOption (option_4);
        setInterval( res => {
          clickIndex>2 ? clickIndex = 0 : '';
          changeSort($('.aside-check span').eq(clickIndex)[0]);
          clickIndex ++;
        }, 5000);
      }).catch (r => {
        $ ('#echart-r-b').html ('<div class="no-data" style="margin-top: 100px;">暂无数据</div>')
      });
    }).catch (r => {
      $ ('#echart-r-b').html ('<div class="no-data" style="margin-top: 100px;">暂无数据</div>')
    });
  }).catch (r => {
    $ ('#echart-r-b').html ('<div class="no-data" style="margin-top: 100px;">暂无数据</div>')
  });
}

//切换排行榜排序
function changeSort (_this) {
  let text = $ (_this).text ();
  $ (_this).siblings ().removeClass ('check-active');
  $ (_this).addClass ('check-active');
  if (text == '日') {
    indexSiteSort ('day');
  } else if (text == '周') {
    indexSiteSort ('week');
  } else {
    indexSiteSort ('month');
  }
}
