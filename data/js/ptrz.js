//获取网站入驻总量
getRZZL('1');
// //获取手机入驻总量
getRZZL('2');
// //获取微信入驻总量
getRZZL('3');
// //获取微博入驻总量
getRZZL('4');
// //获取网站入驻列表
getSiteList(1);
// //获取手机入驻列表
getSiteList(2);
// //获取微信入驻列表
getWXList();
// //获取微博入驻列表
getWBList();
//获取站点入驻总量
function getRZZL (type) {
  let html_n, html_p;
  Api.getGovsite(type,'500000').then( res => {
    if (!res.DATA) {
      return;
    }
    console.log(type+'站点入驻总量:'+res);
    let TOTALNUM = res.DATA.TOTALNUM;
    let MONTHNUM = res.DATA.MONTHNUM;
    html_n = transformWord (TOTALNUM, 'small');//数字转换图片
    html_p = transformWord (MONTHNUM, 'small');//数字转换图片
  });
  /*************模拟数据 start*******************/
  // html_n = transformWord (199, 'small');//数字转换图片
  // html_p = transformWord (99, 'small');//数字转换图片
  /*************模拟数据 end*******************/
  if (type == 1) {
    $ ('#pc-rzzl span').html (html_n);
    $ ('#pc-syrz span').html (html_p);
  } else if (type == 2) {
    $ ('#h5-rzzl span').html (html_n);
    $ ('#h5-syrz span').html (html_p);
  } else if (type == 3) {
    $ ('#wx-all-rzzl').html (html_n);
    $ ('#wx-prev-rzzl').html (html_p);
  } else {
    $ ('#wb-all-rzzl').html (html_n);
    $ ('#wb-prev-rzzl').html (html_p);
  }
}

//获取站点入驻数据
function getSiteList (mediaType) {
  let html = '';
  Api.getSiteList(mediaType).then( res => {
    let result = res.DATA.DATA;
    result.forEach( item => {
      html += `<li class="l-bottom-item">
          <div>${item.SITEDESC}</div>
          <span>${item.CRTIME}</span>
        </li>`;
    });
  }).then( res => {
    if (mediaType == 1) {
      $('#web-list .roll__list').html(html);
      //滚动盒子至底部
      $('#web-list').rollNoInterval().top();
    } else {
      $('#app-list .roll__list').html(html);
      //滚动盒子至底部
      $('#app-list').rollNoInterval().top();
    }
  });

}
//获取微信站点入驻数据
function getWXList () {
  let html = '', html_no = '<div class="no-data">暂无数据</div>';
  Api.getWXList().then( res => {
    if (!res.DATA){
      $('#WX-list').html(html_no);
      return;
    }
    let result = res.DATA.DATA;
    if (result.length < 1){
      $('#WX-list').html(html_no);
      return;
    }
    result.forEach( item => {
      html += `<li>
            <img src="${item.PROFILEIMAGEURL}">
            <span>${item.WXACCOUNTNAME}</span>
          </li>`;
    });
  }).then( re => {
    $('#WX-list .roll__list').html(html);
    //盒子从左往右滚动
    $('#WX-list').rollNoInterval().left();
  }).catch( r =>{
    $('#WX-list').html(html_no);
  });
}
//获取微博站点入驻数据
function getWBList () {
  let html = '', html_no = '<div class="no-data">暂无数据</div>';
  Api.getWBList().then( res => {
    if (!res.DATA){
      $('#WB-list').html(html_no);
      return;
    }
    let result = res.DATA.DATA;
    if (result.length < 1){
      $('#WB-list').html(html_no);
      return;
    }
    result.forEach( item => {
      html += `<div>
            <img src="${item.PROFILEIMAGEURL}">
            <span>${item.WXACCOUNTNAME}</span>
          </div>`;
    });
  }).then( re => {
    $('#WB-list .roll__list').html(html);
    //盒子从左往右滚动
    $('#WB-list').rollNoInterval().left();
  }).catch( r => {
    $('#WB-list').html(html_no);
  });
}
