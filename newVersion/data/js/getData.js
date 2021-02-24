const httpUrl = {}, Api = {};
// const baseUrl = 'http://192.168.6.142:8120/';
const baseUrl = 'http://10.110.76.23:9100/';
httpUrl.getCityMap = './data/js/chongqing.json';//获取城市地图
httpUrl.getZWInfo = baseUrl + 'screen/iip/administrativeFileMouth.html';//获取政务公开数据
httpUrl.getGJNums = baseUrl + 'screen/iip/docCountByAreaCQ.html';//获取稿件总数
httpUrl.getGovOpenDataCount = baseUrl + 'screen/iip/govOpenDataBySiteDatabasesPart.html';//获取政务公开发稿总数
httpUrl.getAllUirbData = baseUrl + 'screen/uirb/uirbDataAll.html';//获取资源库数据总数
httpUrl.getWeather = baseUrl + 'screen/iip/trs_weather.html';//获取天气信息
httpUrl.getMpAppSummary = baseUrl + 'screen/iip/mpAppSummaryqx.html';//区域访问量
httpUrl.mpAppSummaryMonth = baseUrl + 'screen/iip/mpAppSummaryMonth.html';//获取平台访问月总量
httpUrl.getMpAppSummaryTrend = baseUrl + 'screen/iip/mpAppSummaryTrendNew.html';//平台访问走势(天)
httpUrl.getMpAppSummaryTrendHours = baseUrl + 'screen/iip/mpAppSummaryTrendHours.html';//平台访问走势(小时)
httpUrl.getPublishTrend = baseUrl + 'screen/iip/publishTrend.html';//站点发稿量排行榜
httpUrl.getServerStatus = baseUrl + 'screen/firewall/getServerStatus.html';//获取防火墙数据
httpUrl.getAdministrativeFile = baseUrl + 'screen/iip/administrativeFile.html';//获取行政性规范文件
httpUrl.getAdministrativeFileDays = baseUrl + 'screen/iip/administrativeFileDays.html';//获取行政性规范发文走势——天
httpUrl.getAdministrativeFileMonth = baseUrl + 'screen/iip/administrativeFileMouth.html';//获取行政性规范发文走势——年
httpUrl.getGovOpenData = baseUrl + 'screen/iip/govOpenDataBySiteDatabases.html';//获取政务公开数据
httpUrl.getPolicyAnalyzingCount = baseUrl + 'screen/iip/policyAnalyzingCount.html';//获取政策解读数据
httpUrl.getThemeDataStat = baseUrl + 'screen/uirb/themeDataStat.html';//获取主题分类数据
httpUrl.getSafeRun = baseUrl + 'screen/firewall/safeRun.html';//获取安全运行天数
// httpUrl.getCityData = '';//获取城市数据
// httpUrl.getUirb = baseUrl + 'gsp/uirb.do';//获取资源库数据 || 数据入库走势数据
// httpUrl.getGovsite = baseUrl + 'gsp/govsite.do';//站点入驻统计
// httpUrl.getDocCountByArea = baseUrl + 'midware/hydata/getDocCountByArea';//区域稿件统计
// httpUrl.getSearchHotWord = baseUrl + 'igs/front/statistics/find_search_hot_word.jhtml';//搜索热词
// httpUrl.getArea = baseUrl + 'gsp/hycloud/getArea';//区域查询
// httpUrl.getPolicyData = 'http://222.178.212.166:28110/tors/getPolicyStatistics.html';//政策直通车数据统计


/**
 * 获取城市地图
 */
Api.getCityMap = function () {
   return httpRequest(httpUrl.getCityMap, '', 'get');
};
/**
 * 获取稿件总数
 */
Api.getGJNums = function () {
   return httpRequest(httpUrl.getGJNums, '', 'get');
};
/**
 * 获取政务公开信息
 */
Api.ZWInfo = function (method) {
   return httpRequest(httpUrl.getZWInfo, {method: method}, 'get');
};
/**
 * 获取天气数据
 */
Api.getWeather = function () {
   return httpRequest(httpUrl.getWeather, '', 'get');
};
/**
 * 获取安全运行天数
 */
Api.getSafeRun = function () {
   return httpRequest(httpUrl.getSafeRun, '', 'get');
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
 */
Api.getMpAppSummary = function () {
   return httpRequest(httpUrl.getMpAppSummary, '', 'get');
};
/**
 * 获取平台访问月总量
 */
Api.getmpAppSummaryMonth = function () {
   return httpRequest(httpUrl.mpAppSummaryMonth,'','get');
};
/**
 * 获取平政务公开发稿量
 */
Api.getGovOpenDataCount = function () {
   return httpRequest(httpUrl.getGovOpenDataCount,'','get');
};
/**
 * 获取资源库数据总量
 */
Api.getAllUirbData = function () {
   return httpRequest(httpUrl.getAllUirbData,'','get');
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
 * 获取平台访问走势天
 */
Api.getMpAppSummaryTrend = function () {
   return httpRequest(httpUrl.getMpAppSummaryTrend,'','get');
};
/**
 * 获取平台访问走势小時
 */
Api.getMpAppSummaryTrendHours = function () {
   return httpRequest(httpUrl.getMpAppSummaryTrendHours,'','get');
};
/**
 * 获取站点发稿量走势
 */
Api.getPublishTrend = function () {
   return httpRequest(httpUrl.getPublishTrend,'','get');
};
/**
 * 获取防火墙数据
 */
Api.getServerStatus = function () {
   return httpRequest(httpUrl.getServerStatus,'','get');
};
/**
 * 获取行政性规范文件
 */
Api.getAdministrativeFile = function () {
   return httpRequest(httpUrl.getAdministrativeFile,'','get');
};
/**
 * 获取行政性规范发文走势——天
 */
Api.getAdministrativeFileDays = function () {
   return httpRequest(httpUrl.getAdministrativeFileDays,'','get');
};
/**
 * 获取行政性规范发文走势——年
 */
Api.getAdministrativeFileMonth = function () {
   return httpRequest(httpUrl.getAdministrativeFileMonth,'','get');
};
/**
 * 获取政务公开数据
 */
Api.getGovOpenData = function () {
   return httpRequest(httpUrl.getGovOpenData,'','get');
};
/**
 * 获取政策解读数据
 */
Api.getPolicyAnalyzingCount = function () {
   return httpRequest(httpUrl.getPolicyAnalyzingCount,'','get');
};
/**
 * 获取主题分类数据
 */
Api.getThemeDataStat = function () {
   return httpRequest(httpUrl.getThemeDataStat,'','get');
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
