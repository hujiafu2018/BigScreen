const httpUrl = {}, Api = {};
// const baseUrl = 'http://23.99.193.13/';
const baseUrl = 'http://10.110.76.23:9100/';
httpUrl.getCityMap = './data/js/chongqing.json';//获取城市地图
httpUrl.getUserInfo = baseUrl + 'gsp/login';//获取用户信息
httpUrl.getWeather = baseUrl + 'api/?appid=31115159&appsecret=aN7ajCfY&version=v6';//获取天气信息
httpUrl.getCityData = '';//获取城市数据
httpUrl.getUirb = baseUrl + 'gsp/uirb.do';//获取资源库数据 || 数据入库走势数据
httpUrl.getGovsite = baseUrl + 'gsp/govsite.do';//站点入驻统计
httpUrl.getDocCountByArea = baseUrl + 'midware/hydata/getDocCountByArea';//区域稿件统计
httpUrl.getMpAppSummary = baseUrl + 'bas/api/getMpAppSummary';//区域访问量
httpUrl.getDayMpAppSummary = baseUrl + 'bas/api/getHourlyPV';//获取区域日访问量
httpUrl.getSearchHotWord = baseUrl + 'igs/front/statistics/find_search_hot_word.jhtml';//搜索热词
httpUrl.getSiteSortByDoc = baseUrl + 'midware/hydata/siteSortByDoc';//站点发稿量排行榜
httpUrl.getArea = baseUrl + 'gsp/hycloud/getArea';//区域查询
httpUrl.getPolicyData = 'http://222.178.212.166:28110/tors/getPolicyStatistics.html';//政策直通车数据统计


/**
 * 获取城市地图
 */
Api.getCityMap = function () {
   return httpRequest(httpUrl.getCityMap, '', 'get');
};
/**
 * 获取用户信息
 * @param {string} method 固定值：checkLogin
 */
Api.getUserInfo = function (method) {
   return httpRequest(httpUrl.getUserInfo, {method: method}, 'get');
};
/**
 * 获取天气数据
 * @param {string} city 城市名
 */
Api.getWeather = function (city) {
   return httpRequest(httpUrl.getWeather, {city: city}, 'get');
};
/**
 * 获取资源库数据总览
 * @param {string} method 固定值：forwordUirb
 * @param {string} typeId 固定值：uirb
 * @param {string} serviceId 固定值：api/standards/uirb_standardId
 * @param {string} modelId 固定值：modelId
 */
Api.getZYKUirb = function () {
   return httpRequest(httpUrl.getUirb,
       {
          method: 'forwordUirb',
          typeId: 'uirb',
          serviceId: encodeURI('api/standards/uirb_standardId'),
          modelId: encodeURI('data/distribution'),
       },
       'get');
};
/**
 * 获取数据入库走势数据
 * @param {string} method 固定值：forwordUirb
 * @param {string} typeId 固定值：uirb
 * @param {string} serviceId 固定值：api/standards/uirb_standardId
 * @param {string} modelId 固定值：近一周走势：data/week/trend  近一月走势：data/month/trend  近一年走势：data/year/trend
 * @param {number} type 固定值：1：入库 2：被调用
 */
Api.getRKUirb = function (modelId) {
   return httpRequest(httpUrl.getUirb,
       {
          method: 'forwordUirb',
          typeId: 'uirb',
          serviceId: encodeURI('api/standards/uirb_standardId'),
          modelId: modelId,
          type: 1,
       },
       'get');
};
/**
 * 站点入驻统计
 * @param {string} method 固定值:countSiteNum
 * @param {string} mediaType 站点类型：1-网站、2-APP、3-微信、4-微博
 * @param {string} areaCode 地区编码
 */
Api.getGovsite = function (mediaType,areaCode) {
   return httpRequest(httpUrl.getGovsite,
       {
          method: 'countSiteNum',
          mediaType: mediaType,
          areaCode: areaCode
       },
       'get');
};
/**
 * 区域稿件统计
 * @param {string} areaCode 地区代码 eg：500000
 */
Api.getDocCountByArea = function (areaCode, load) {
   return httpRequest(httpUrl.getDocCountByArea,
       {
          areaCode: areaCode
       },
       'get',
       load);
};
/**
 * 获取区域访问量
 * @param {string} day 日期
 * @param {string} mpIds 网脉网站的ID串
 * @param {string} uaIds 网脉联合APP的ID串
 */
Api.getMpAppSummary = function (day ,mpIds) {
   return httpRequest(httpUrl.getMpAppSummary,
       {
          day: encodeURI(day),
          mpIds: mpIds
       },
       'get');
};
/**
 * 获取所有区域日访问量
 * @param {string} day 日期
 * @param {string} mpIds 网脉网站的ID串
 * @param {string} uaIds 网脉联合APP的ID串
 */
Api.getDayMpAppSummary = function (mpIds, load = false) {
   return httpRequest(httpUrl.getDayMpAppSummary,
       {
         type: 'web',
         wmId: mpIds
       },
       'post',
       load);
};
/**
 * 获取搜索热词
 * @param {string} siteId 检索站点id
 */
Api.getSearchHotWord = function (siteId) {
   return httpRequest(httpUrl.getSearchHotWord,
       {
          siteId: siteId
       },
       'get');
};
/**
 * 获取站点发稿量排行榜
 * @param {string} operTime 时间筛选
                            eg：当天 0d 、昨天 -1m
                            本周 0w 、上周 -1w
                            本月 0m 、上月 -1m
                            a 全部
                            默认为本月，自定义时间时失效
 * @param {string} operTimeStart 自定义时间开始
 * @param {string} operTimeEnd 自定义时间结束
 */
Api.getSiteSortByDoc = function (operTime) {
   return httpRequest(httpUrl.getSiteSortByDoc,
       {
          operTime: operTime
       },
       'get',
       false);
};
/**
 * 区域查询
 */
Api.getArea = function () {
   return httpRequest(httpUrl.getArea,'', 'get');
};
/**
 * 站点入驻列表查询 网站&手机
 * @param {string} method 固定值:siteList
 * @param {number} pageIndex 当前页
 * @param {number} pageSize 分页大小
 * @param {string} areaCode 地区编码
 * @param {number} mediaType 站点类型，整型数： 1 -网站；2- APP；
 * @param {number} isAll 是否获取全部：1 全部；0 非全部
 */
Api.getSiteList = function (mediaType) {
   return httpRequest(httpUrl.getGovsite,
       {
         method: 'siteList',
         pageIndex: 1,
         pageSize: 100,
         areaCode: '50000',
         mediaType: mediaType,
         isAll: 1,
       },
       'get');
};
/**
 * 微信站点列表查询
 * @param {string} method 固定值:weixinList
 * @param {number} pageIndex 当前页
 * @param {number} pageSize 分页大小
 * @param {string} areaCode 地区编码
 */
Api.getWXList = function () {
   return httpRequest(httpUrl.getGovsite,
       {
         method: 'weixinList',
         pageIndex: 1,
         pageSize: 100,
         areaCode: '50000'
       },
       'get');
};
/**
 * 微博站点列表查询
 * @param {string} method 固定值:weiboList
 * @param {number} pageIndex 当前页
 * @param {number} pageSize 分页大小
 * @param {string} areaCode 地区编码
 */
Api.getWBList = function () {
   return httpRequest(httpUrl.getGovsite,
       {
         method: 'weiboList',
         pageIndex: 1,
         pageSize: 100,
         areaCode: '50000'
       },
       'get');
};
/**
 * 数据源列表查询
 * @param {string} method 固定值:dataSourceStat
 */
Api.getUirbList = function () {
   return httpRequest(httpUrl.getUirb,
       {
         method: 'dataSourceStat'
       },
       'get');
};
/**
 * 区县接入排行榜
 * @param {string} method 固定值:areaDataStat
 */
Api.getUirbRank = function () {
   return httpRequest(httpUrl.getUirb,
       {
         method: 'areaDataStat'
       },
       'get');
};
/**
 * 主题库列表查询
 * @param {string} method 固定值:themeDataStat
 */
Api.getThemeList = function () {
   return httpRequest(httpUrl.getUirb,
       {
         method: 'themeDataStat'
       },
       'get');
};
/**
 * 政策直通车数据统计
 */
Api.getPolicyData = function () {
   return httpRequest(httpUrl.getPolicyData,'','post');
};
