const resData = {
  clickIndex_zw: 0,//记录政务公开切换日月年的下标
  clickIndex_pt: 0,//记录平台访问切换的下标
  clickIndex_zd: 0,//记录站点发稿切换的下标
  /****************政务公开数据 start*****************************/
  XZGFZL_Data: '7164',//行政规范总量 '---'
  XZGF_SZF_Data: '358',//市政府行政规范文件数量
  XZGF_SZFB_Data: '510',//市政府办公厅行政规范文件数量
  XZGF_SZFBM_Data: '1745',//市政府部门行政规范文件数量
  XZGF_QXZF_Data: '4551',//区县政府行政规范文件数量
  ZTFL_Data: '---',//主题分类数据
  //政策解读数据
  ZCJD_All: '10964', //'---'
  ZCJD_Data: {
    yAxisData: ["市生态环境局", "永川区", "璧山区", "九龙坡区", "石柱县", "市财政局", "大足区", "铜梁区"],
    seriesData: [267, 302, 314, 561, 562, 674, 1148, 3297]
  },
  // [{sitedesc:'渝中区',doccount: '51240000'},{sitedesc:'江北区',doccount: '50080000'},{sitedesc:'渝北区',doccount: '47528000'},{sitedesc:'南岸区',doccount: '40120000'},{sitedesc:'巴南区',doccount: '35210000'},{sitedesc:'涪陵区',doccount: '32140000'},{sitedesc:'万州区',doccount: '30210000'},{sitedesc:'万盛区',doccount: '21470000'}]
  // ZCZL_Data: 2563425, //政策总量数据
  ZC_SZF_Data: '393088', //市政府政策量数据
  ZC_WBJ_Data: '207513', //委办局政策量数据
  ZC_QXZF_Data: '842680', //区县政府政策量数据
  ZWGKZL_Data: '---', //政务公开总量政策量数据
  SZFZWGKZL_Data: '---', //委办局政策量数据
  ZWFW: {
    //x轴周数据
    weekData_x: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
    //y轴周数据
    weekData_y: [10000, 12000, 15000, 18000, 13000, 19000, 17000],
    //x轴月数据
    monthData_x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
    //y轴月数据
    monthData_y: [10000, 12000, 15000, 18000, 13000, 19000, 17000, 30000, 25000, 36000, 24000, 38000,42000, 25000, 28000, 15000, 26000,12000,25000, 36000, 24000, 38000,42000, 25000, 28000, 11000, 8000, 3000, 2000, 1000, 0],
    //x轴年数据
    yearData_x: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    //y轴年数据
    yearData_y: [10000, 12000, 15000, 18000, 13000, 19000, 17000, 30000, 25000, 36000, 24000, 38000]
  },
  //政务公开委办局数据
  ZWFG_Data_WBJ: [
    {name: '重庆市政府',value: '122455'},
    {name: '市政府办公厅',value: '15422'},
    {name: '市生态环境局',value: '12230'},
    {name: '市水利局',value: '145266'},
    {name: '市民政局',value: '17524'},
    {name: '市人才资源局',value: '14252'},
    {name: '市监狱局',value: '18985'},
    {name: '市大数据局',value: '14652'},
  ],
  //政务公开区县数据
  ZWFG_Data_QX: [
    {name: '大足区',value: '122455'},
    {name: '铜梁区',value: '15422'},
    {name: '渝中区',value: '12230'},
    {name: '渝北区',value: '145266'},
    {name: '巴南区',value: '17524'},
    {name: '南岸区',value: '14252'},
    {name: '大渡口区',value: '18985'},
    {name: '江北区',value: '14652'},
  ],
  //主题库列表数据
  ZWGK_ZTK_All: '---',
  ZWGK_ZTK_List:'',
  /****************政务公开数据 end*****************************/

  /****************首页数据数据 end*****************************/
  ZDZS: 86,//站点总数
  PTFGZL: '---',//平台发稿总量
  ZWGKFGZL: '---',//政务公开发稿总量
  ZYKZL: '---',//资源库总量
  PTFWZL: '---',//平台访问总量
  AQYX: '---',//安全运行天数
  LJCS: '184256',//拦截次数
  CPU: '---', //CPU占用率
  NC: '---', //内存占用率
  CP: '---', //磁盘占用率
  LRLC: '---', //流入流出占用率
  //平台访问总量
  QXFWZL: cityArray,
  //平台访问走势数据
  PTFW: {
    //x轴小时数据
    hourData_x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
    //y轴小时pv数据
    hourData_y_pv: [10000, 12000, 15000, 18000, 13000, 19000, 17000, 30000, 25000, 36000, 24000, 38000,42000, 36000, 24000, 38000,42000, 25000, 28000, 11000, 8000, 3000, 2000, 1000, 0],
    //y轴小时uv数据
    hourData_y_uv: [1000,2000,3000,8000,11000, 15000, 25000, 28000, 15000, 19000, 17000, 30000, 25000, 36000, 24000, 26000,38000,42000,12000, 10000, 12000, 15000, 18000, 13000,],
    //x轴天数据
    dayData_x: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
    //y轴天pv数据
    dayData_y_pv: [10000, 12000, 15000, 18000, 13000, 19000, 17000],
    //y轴天uv数据
    dayData_y_uv: [10000, 11000, 13000, 18000, 10000, 12000, 15000]
  },
  //站点发稿走势数据
  ZDFG: {
    //x轴周数据
    weekData_x: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
    //y轴周数据
    weekData_y: [10000, 12000, 15000, 18000, 13000, 19000, 17000],
    //x轴月数据
    monthData_x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
    //y轴月数据
    monthData_y: [10000, 12000, 15000, 18000, 13000, 19000, 17000, 30000, 25000, 36000, 24000, 38000,42000, 25000, 28000, 15000, 26000,12000,25000, 36000, 24000, 38000,42000, 25000, 28000, 11000, 8000, 3000, 2000, 1000, 0],
    //x轴年数据
    yearData_x: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    //y轴年数据
    yearData_y: [10000, 12000, 15000, 18000, 13000, 19000, 17000, 30000, 25000, 36000, 24000, 38000]
  }
  /****************首页数据数据 end*****************************/
}
