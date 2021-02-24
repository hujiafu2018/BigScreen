//数据源列表查询
function getUirbList () {
  let sourceNum = 0,
      dayNum = 0,
      totalNum = 0,
      html = '';
  Api.getUirbList().then( res => {
    let result = res.data;
    result.forEach( item => {
      // sourceNum++;
      dayNum += item.dayNum;
      totalNum += item.totalNum;
      html += `<li class="l-bottom-item">
            <div class="l-b-c-l">${item.sourceName}</div>
            <div class="l-b-c-2">${item.dayNum}</div>
            <div class="l-b-c-3">${item.totalNum}</div>
          </li>`;
    });
    // $('#sourceNum').html(transformWord(sourceNum,'big'));
    $('#dayNum').html(transformWord(dayNum,'big'));
    $('#totalNum').html(transformWord(totalNum,'big'));
    //滚动盒子至底部
  }).then( res => {
    $('#sjly .roll__list').html(html);
    //滚动盒子至底部
    $('#sjly').rollNoInterval().top();
  }).catch( res => {
    $('#dayNum').html(transformWord(23367,'big'));
    $('#totalNum').html(transformWord(1967000,'big'));
  });
  /*sourceNum = 123;
  dayNum = 456;
  totalNum = 78899;
  console.log('sourceNum', sourceNum);
  console.log('dayNum', dayNum);
  console.log('totalNum', totalNum);
  $('#sourceNum').html(transformWord(sourceNum,'big'));
  $('#dayNum').html(transformWord(dayNum,'big'));
  $('#totalNum').html(transformWord(totalNum,'big'));
  scrollToB('#sjly');*/
}
//区县接入排行榜
function getUirbRank () {
  //初始化图表实例
  const myChart_1 = echarts.init ($('#echart-m-t')[0]);
  Api.getUirbRank().then( res => {
    let result = res.data,
        res_array,
        xAxisData,
        yAxisData;
    //将数组排序至降序
    //将数组排序至降序
    result.sort(compare('desc', 'dataNum'));
    res_array = result.slice(0,8);
  xAxisData = res_array.map( item => {
    return item.category_name;
  });
  yAxisData = res_array.map( item => {
    return item.dataNum;
  });
  const option_1 = {
    color: new echarts.graphic.LinearGradient (
        0, 0, 0, 1,
        [{
          offset: 0, color: '#1cd3d9' // 0% 处的颜色
        }, {
          offset: 0.5, color: 'rgba(28,211,217,0.5)' // 50% 处的颜色
        }, {
          offset: 1, color: 'rgba(28,211,217,0.11)' // 100% 处的颜色
        }]
    ), //区域渐变颜色
    // tooltip: {
    //   trigger: 'axis',
    //   // axisPointer: {            // 坐标轴指示器，坐标轴触发有效
    //   //   type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    //   // }
    // },
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
          alignWithLabel: true//刻度对齐
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#02c8d7'//x轴标签
          }
        },
        axisLine: {
          lineStyle: {
            color: '#1e364c'//x轴刻度
          }
        },
        //网格样式
        splitLine: {
          show: false,
          /*lineStyle:{
            color: 'rgba(28,211,217,0.1)',
            width: 1,
            type: 'solid'
          }*/
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: 'rgba(2,200,215,0.71)'
          }
        },
        axisLine: {
          show: false,
        },
        //网格样式
        splitLine: {
          show: false,
          /*lineStyle:{
            color: 'rgba(28,211,217,0.1)',
            width: 1,
            type: 'solid'
          }*/
        }
      }
    ],
    series: [
      {
        name: '',
        type: 'bar',
        barWidth: 15,
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
      }
    ]
  };
  //执行图表构建
  myChart_1.setOption (option_1);
  }).catch( res => {
    $('#jrph').html('<div class="no-data" style="margin-top: 100px;">暂无数据</div>')
    let result = [{"path":"{668,735,737}",category_name:"万州区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:16186,"hasRight":1,"serial_number":362,"id":737},{"path":"{668,735,736}",category_name:"黔江区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:44803,"hasRight":1,"serial_number":361,"id":736},{"path":"{668,735,738}",category_name:"涪陵区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:42793,"hasRight":1,"serial_number":363,"id":738},{"path":"{668,735,739}",category_name:"渝中区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:54524,"hasRight":1,"serial_number":364,"id":739},{"path":"{668,735,740}",category_name:"大渡口区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:7739,"hasRight":1,"serial_number":365,"id":740},{"path":"{668,735,741}",category_name:"江北区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:12364,"hasRight":1,"serial_number":366,"id":741},{"path":"{668,735,742}",category_name:"沙坪坝区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:210990,"hasRight":1,"serial_number":367,"id":742},{"path":"{668,735,743}",category_name:"九龙坡区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:143678,"hasRight":1,"serial_number":368,"id":743},{"path":"{668,735,744}",category_name:"南岸区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:23033,"hasRight":1,"serial_number":369,"id":744},{"path":"{668,735,745}",category_name:"北碚区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:47406,"hasRight":1,"serial_number":370,"id":745},{"path":"{668,735,746}",category_name:"渝北区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:14781,"hasRight":1,"serial_number":371,"id":746},{"path":"{668,735,747}",category_name:"巴南区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:37150,"hasRight":1,"serial_number":372,"id":747},{"path":"{668,735,748}",category_name:"长寿区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:46619,"hasRight":1,"serial_number":373,"id":748},{"path":"{668,735,749}",category_name:"江津区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:16385,"hasRight":1,"serial_number":374,"id":749},{"path":"{668,735,750}",category_name:"合川区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:39264,"hasRight":1,"serial_number":375,"id":750},{"path":"{668,735,751}",category_name:"永川区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:30100,"hasRight":1,"serial_number":376,"id":751},{"path":"{668,735,752}",category_name:"南川区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:2991,"hasRight":1,"serial_number":377,"id":752},{"path":"{668,735,753}",category_name:"綦江区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:16784,"hasRight":1,"serial_number":378,"id":753},{"path":"{668,735,754}",category_name:"大足区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:23650,"hasRight":1,"serial_number":379,"id":754},{"path":"{668,735,755}",category_name:"铜梁区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:110320,"hasRight":1,"serial_number":380,"id":755},{"path":"{668,735,756}",category_name:"璧山区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:24615,"hasRight":1,"serial_number":381,"id":756},{"path":"{668,735,757}",category_name:"潼南区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:14548,"hasRight":1,"serial_number":382,"id":757},{"path":"{668,735,758}",category_name:"荣昌区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:29795,"hasRight":1,"serial_number":383,"id":758},{"path":"{668,735,759}",category_name:"开州区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:40267,"hasRight":1,"serial_number":384,"id":759},{"path":"{668,735,760}",category_name:"梁平区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:78155,"hasRight":1,"serial_number":385,"id":760},{"path":"{668,735,761}",category_name:"武隆区","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:62008,"hasRight":1,"serial_number":386,"id":761},{"path":"{668,735,762}",category_name:"城口县","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:7685,"hasRight":1,"serial_number":387,"id":782},{"path":"{668,735,783}",category_name:"丰都县","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:21861,"hasRight":1,"serial_number":388,"id":783},{"path":"{668,735,784}",category_name:"忠县","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:20702,"hasRight":1,"serial_number":389,"id":784},{"path":"{668,735,785}",category_name:"垫江县","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:17814,"hasRight":1,"serial_number":390,"id":785},{"path":"{668,735,786}",category_name:"云阳县","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:20414,"hasRight":1,"serial_number":391,"id":786},{"path":"{668,735,787}",category_name:"奉节县","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:74225,"hasRight":1,"serial_number":392,"id":787},{"path":"{668,735,788}",category_name:"巫山县","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:10631,"hasRight":1,"serial_number":393,"id":788},{"path":"{668,735,789}",category_name:"巫溪县","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:14792,"hasRight":1,"serial_number":394,"id":789},{"path":"{668,735,790}",category_name:"石柱县","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:25013,"hasRight":1,"serial_number":395,"id":790},{"path":"{668,735,791}",category_name:"秀山县","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:12690,"hasRight":1,"serial_number":396,"id":791},{"path":"{668,735,792}",category_name:"酉阳县","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:10653,"hasRight":1,"serial_number":397,"id":792},{"path":"{668,735,793}",category_name:"彭水县","depth":3,"children":[],"hasChildren":0,"parent_id":735,dataNum:10191,"hasRight":1,"serial_number":398,"id":793}],
        res_array,
        xAxisData,
        yAxisData;
    //将数组排序至降序
    result.sort(compare('desc', 'dataNum'));
    res_array = result.slice(0,8);
    xAxisData = res_array.map( item => {
      return item.category_name;
    });
    yAxisData = res_array.map( item => {
      return item.dataNum;
    });
    const option_1 = {
      color: new echarts.graphic.LinearGradient (
          0, 0, 0, 1,
          [{
            offset: 0, color: '#1cd3d9' // 0% 处的颜色
          }, {
            offset: 0.5, color: 'rgba(28,211,217,0.5)' // 50% 处的颜色
          }, {
            offset: 1, color: 'rgba(28,211,217,0.11)' // 100% 处的颜色
          }]
      ), //区域渐变颜色
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
          axisTick: {
            alignWithLabel: true//刻度对齐
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#02c8d7'//x轴标签
            }
          },
          axisLine: {
            lineStyle: {
              color: '#1e364c'//x轴刻度
            }
          },
          //网格样式
          splitLine: {
            show: false,
            /*lineStyle:{
              color: 'rgba(28,211,217,0.1)',
              width: 1,
              type: 'solid'
            }*/
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: 'rgba(2,200,215,0.71)'
            }
          },
          axisLine: {
            show: false,
          },
          //网格样式
          splitLine: {
            show: false,
            /*lineStyle:{
              color: 'rgba(28,211,217,0.1)',
              width: 1,
              type: 'solid'
            }*/
          }
        }
      ],
      series: [
        {
          name: '',
          type: 'bar',
          barWidth: 15,
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
        }
      ]
    };
    //执行图表构建
    myChart_1.setOption (option_1);
  })
}
//主题库列表
var dis_Index = -1;
function getThemeList () {
  let res_array;
  /*Api.getThemeList().then( res => {
    let result = res.data.data;
    res_array = result.map( item => {
      return item.resource_name;
    });
    playAnimate(res_array);
    setInterval((res) => {
      $('#text-1, #text-2, #text-3').css('minWidth','0');
      $('#text-1 span, #text-2 span, #text-3 span').removeClass('display');
      setTimeout( res => {
        playAnimate(res_array, dis_Index);
      },10);
    },6000);
  }).catch( res => {
    let result = [{"update_time":1574061843825,"db_table_name":"govdocnews","update_user":"dev","create_time":1574061843825,"resource_group_id":24,"resource_table_name":"uirb_1_resdata_govdocnews","resource_id":36,"serial_number":1,"id":36,"create_user":"dev","resource_name":"新闻资讯","data_count":2496003},{"update_time":1574061844617,"db_table_name":"jyta","update_user":"dev","create_time":1574061844617,"resource_group_id":25,"resource_table_name":"uirb_1_resdata_jyta","resource_id":39,"serial_number":4,"id":39,"create_user":"dev","resource_name":"建议提案","data_count":1566},{"update_time":1574061845153,"db_table_name":"xxgk","update_user":"dev","create_time":1574061845153,"resource_group_id":25,"resource_table_name":"uirb_1_resdata_xxgk","resource_id":41,"serial_number":6,"id":41,"create_user":"dev","resource_name":"信息公开","data_count":550534},{"update_time":1574061845898,"db_table_name":"bssx","update_user":"dev","create_time":1574061845898,"resource_group_id":27,"resource_table_name":"uirb_1_resdata_bssx","resource_id":44,"serial_number":8,"id":44,"create_user":"dev","resource_name":"办事事项","data_count":43068},{"update_time":1574061846322,"db_table_name":"govmsgbox","update_user":"dev","create_time":1574061846322,"resource_group_id":28,"resource_table_name":"uirb_1_resdata_govmsgbox","resource_id":45,"serial_number":9,"id":45,"create_user":"dev","resource_name":"政务信箱","data_count":97686},{"update_time":1575822218188,"db_table_name":"gov_years","update_user":"dev","create_time":1575822218188,"resource_group_id":25,"resource_table_name":"uirb_1_resdata_gov_years","resource_id":62,"serial_number":26,"id":62,"create_user":"dev","resource_name":"公开年报","data_count":869},{"update_time":1574061844201,"db_table_name":"gwydt","update_user":"dev","create_time":1574061844201,"resource_group_id":24,"resource_table_name":"uirb_1_resdata_gwydt","resource_id":37,"serial_number":2,"id":37,"create_user":"dev","resource_name":"国务院动态","data_count":4863},{"update_time":1576551041897,"db_table_name":"opinion","update_user":"dev","create_time":1576551041897,"resource_group_id":28,"resource_table_name":"uirb_1_resdata_opinion","resource_id":64,"serial_number":28,"id":64,"create_user":"dev","resource_name":"意见征集","data_count":701},{"update_time":1576565483717,"db_table_name":"pub_apply","update_user":"dev","create_time":1576565483717,"resource_group_id":28,"resource_table_name":"uirb_1_resdata_pub_apply","resource_id":65,"serial_number":29,"id":65,"create_user":"dev","resource_name":"依申请公开","data_count":466},{"update_time":1579335659449,"db_table_name":"gbzcfg","update_user":"杨贝","create_time":1574061845491,"resource_group_id":26,"resource_table_name":"uirb_1_resdata_gbzcfg","resource_id":42,"serial_number":36,"id":42,"create_user":"dev","resource_name":"国办政策法规","data_count":90}];
    res_array = result.map( item => {
      return item.resource_name;
    });
    playAnimate(res_array);
    setInterval((res) => {
      $('#text-1, #text-2, #text-3').css('minWidth','0');
      $('#text-1 span, #text-2 span, #text-3 span').removeClass('display');
      setTimeout( res => {
        playAnimate(res_array);
      },10);
    },8000);
  });*/
  let result = [
    {
      resource_name: '新闻资讯',
      resource_value: '1562006条',
    },
    {
      resource_name: '信息公开',
      resource_value: '850252条',
    },
    {
      resource_name: '建议提案',
      resource_value: '4709条',
    },
    {
      resource_name: '政策文件',
      resource_value: '3613份',
    },
    {
      resource_name: '公开年报',
      resource_value: '1622份',
    },
    {
      resource_name: '办事事项',
      resource_value: '27443项',
    }
  ];
  playAnimate(result);
  setInterval((res) => {
    $('#text-1, #text-2, #text-3, #text-4, #text-5, #text-6').css('minWidth','0');
    $('#text-1 div, #text-2 div, #text-3 div, #text-4 div, #text-5 div, #text-6 div').hide();
    setTimeout( res => {
      playAnimate(result);
    },10);
  },12000);
}
//循环播放动画
function playAnimate (res_array) {
  res_array.forEach( (item, index) => {
    $(`#text-${index+1} div span:first`).text(res_array[index].resource_name);
    $(`#text-${index+1} div span:last`).text(res_array[index].resource_value);
  });
  res_array.forEach( (item, index) => {
    var timeout = (index+1) * 1.5 * 1000;
    setTimeout (res => {
      if (index == 0) {
        timeout = 1000;
      }
      $ (`#text-${index + 1}`).animate ({minWidth: '194px'}, 500, 'linear', function () {
        // $(`#text-${index+1} div`).addClass('display').addClass('animated flash');
        $ (`#text-${index + 1} div`).fadeIn ().css ('display', 'inline-flex');
      });
    }, timeout)
  });
  // $('#text-2 div span:first').text(res_array[dis_Index].resource_name);
  // $('#text-2 div span:last').text(res_array[dis_Index].resource_value);
  if ($('.cont-middle-bottom .img-1').hasClass('rotate-1')) {
    $ ('.cont-middle-bottom .img-1').removeClass ('rotate-1').addClass ('rotate-1-1');
    $ ('.cont-middle-bottom .img-3').removeClass ('rotate-2').addClass ('rotate-2-1');
    $ ('.cont-middle-bottom .img-4').removeClass ('rotate-3').addClass ('rotate-3-1');
    $ ('.cont-middle-bottom .img-5').removeClass ('rotate-4').addClass ('rotate-4-1');
  } else {
    $('.cont-middle-bottom .img-1').addClass('rotate-1').removeClass('rotate-1-1');
    $('.cont-middle-bottom .img-3').addClass('rotate-2').removeClass('rotate-2-1');
    $('.cont-middle-bottom .img-4').addClass('rotate-3').removeClass('rotate-3-1');
    $('.cont-middle-bottom .img-5').addClass('rotate-4').removeClass('rotate-4-1');
  }
}
//政策直通车数据统计
function getPolicyData () {
  Api.getPolicyData().then( res => {
    console.log(res)
    let result = res.data;
    $('#dwzc').text(result.dwzc);
    $('#dwtk').text(result.dwhxtk);
    $('#dwtj').text(result.dwtj);

    $('#hyzc').text(result.hyzc);
    $('#hytk').text(result.hyhxtk);
    $('#hytj').text(result.hytj);

    $('#lhzc').text(result.lhzc);
    $('#lhtk').text(result.lhhxtk);
    $('#lhtj').text(result.lhtj);
  })
}
