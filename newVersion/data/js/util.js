const httpRequest=function(url, param, type = 'get', load = true){
  return new Promise(function(resolve, reject){
    if (load) {
      var layer_load = layer.load(2, {
        shade: [0.1,'#fff'], //0.1透明度的白色背景
        time: 15 * 1000
      });
    }
    $.ajax({
      type: type,
      url: url,
      data: param,
      dataType: 'json',
      timeout: 30000,
      success(res) {
        resolve(res);
        if (load) {
          layer.close (layer_load);
        }
      },
      error(res) {
        if (load) {
          layer.close (layer_load);
        }
        // layer.msg(url+'接口请求错误！');
        reject('响应错误')
      }
    })
  })

};
//根据数字替换图片
function transformWord(num,type) {
  let string = num.toString();
  if (string.length >= 5) {
    const point = 1; //省略小数点后1位
    const number = 10000; //10000 转为1万
    let decimal = string.substring (string.length - 4, string.length - 4 + point);
    // console.log('decimal:',decimal);
    string = (parseInt (num / number)).toString();
    // console.log('string-wan',string)
    return toImg(string, type) + '.' + toImg(decimal, type) + 'W';
  } else {
    return toImg(string, type);
  }
}
//切换数字
function getWord (el, val, keep = true) {
  let num = val;
  val = val.toString();
  $(el).html('');
  if (val.length >= 5) {
    if (!keep) {
      for (var i = 0; i < val.length; i++) {
        $ (el).append ('<i style="background-position:0 0" data-id=' + i + '></i>');
        var n =parseInt (val[i]);
        var le = n * .4375;
        $ (el).find ('i').eq (i).animate ({backgroundPositionX: '0', backgroundPositionY: '-'+le+'rem'}, 2000, 'swing');
      }
      return;
    }
    const point = 1; //省略小数点后1位
    const number = 10000; //10000 转为1万
    let decimal = val.substring (val.length - 4, val.length);
    // console.log('decimal:', decimal)
    val = (parseInt (num / number)).toString ();
    // console.log('val:', val)
    for (var i = 0; i < val.length; i++) {
      $ (el).append ('<i style="background-position:0 0" data-id=' + i + ' data-val='+ val[i]+ '></i>')
      var n = parseInt (val[i]);
      var le = n * .4375;
      $ (el).find ('i').eq (i).animate ({
        backgroundPositionX: '0',
        backgroundPositionY: '-'+le+'rem'
      }, 2000, 'swing');
    }
    if (decimal.length > 0) {
      $ (el).append ('.');
      decimal = decimal.substring(0, 1);
      for (var i = 0; i < decimal.length; i++) {
        $ (el).append ('<i style="background-position:0 0" data-id=' + i + ' data-val='+ val[i]+ '></i>')
        var n =parseInt (decimal[i]);
        var le = n * .4375;
        $ (el).find ('i').eq (val.length + i).animate ({
          backgroundPositionX: '0',
          backgroundPositionY: '-'+le+'rem'
        }, 2000, 'swing');
      }
      $ (el).append ('万');
    }
  } else {
    for (var i = 0; i < val.length; i++) {
      $ (el).append ('<i style="background-position:0 0" data-id=' + i + ' data-val='+ val[i]+ '></i>')
      var n =parseInt (val[i]);
      var le = n * .4375;
      $ (el).find ('i').eq (i).animate ({backgroundPositionX: '0', backgroundPositionY: '-'+le+'rem'}, 2000, 'swing');
    }
  }
}
//给个位时间前面加上0
function addZero (time) {
  if (time < 10){
    return '0' + time;
  } else {
    return time;
  }
}
//获取当前日期
function getNowFormatDate(breforeDay = '') {
  var date = new Date();
  if (breforeDay) {
    date = date.setDate(date.getDate() - breforeDay);
    date = new Date(date);
  }
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + month + strDate;
  return currentdate;
}
//数组排序
function compare(order, sortBy){
  var ordAlpah = (order == 'asc') ? '>' : '<';
  var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
  return sortFun;
}
//滚动盒子-从顶至底部
function scrollToB(el,speed = 1){
  $ (el).animate({scrollTop: $ (el)[0].scrollHeight}, 300000 * speed, 'linear');
  //如果滚动到底部，再循环滚动
  $(el).scroll(function () {
    var div_height = ($(el).find('.list-box').height() - $(el).height() + 9).toFixed();
    var scrollTop = $(el).scrollTop().toFixed();
    if ( scrollTop == div_height) {
      $(el).animate({
        scrollTop:	'0'
      },1000);
      $ (el).animate({scrollTop: $ (el)[0].scrollHeight}, 300000 * speed, 'linear');
    }
  });
}
//滚动盒子-从左至右
$.fn.scrollToR = function() {
  // 滚动步长(步长越大速度越快)
  var step_len = 60;
  var this_obj = $(this);
  var child = this_obj.children();
  var this_width = this_obj.width();
  var child_width = child.width();
  var continue_speed = undefined;// 暂停后恢复动画速度
  // 初始文字位置
  child.css({
    left: 0
  });

  // 初始动画速度speed
  var init_speed = (child_width + this_width) / step_len * 1000;

  // 滚动动画
  function scroll_run(continue_speed) {
    var speed = (continue_speed == undefined ? init_speed : continue_speed);
    child.animate({
      left: -child_width
    }, speed, "linear", function() {
      $(this).css({
        left: this_width
      });
      scroll_run();
    });
  }
  // 鼠标动作
  child.on({
    mouseenter: function() {
      var current_left = $(this).position().left;
      $(this).stop();
      continue_speed = (-(-child_width - current_left) / step_len) * 1000;
    },
    mouseleave: function() {
      scroll_run(continue_speed);
      continue_speed = undefined;
    }
  });

  // 启动滚动
  scroll_run();
};
/**
 * 数字转整数 如 10000 转为1万
 * @param {需要转化的数} num
 * @param {需要保留的小数位数} point
 */
function tranNumber(num, point) {
  let numStr = num.toString ()
  // 1万以内直接返回
  if (numStr.length < 5) {
    return numStr;
  }
  //大于6位数是十万 (以10W分割 10W以下全部显示)
  else {
    let decimal = numStr.substring (numStr.length - 3, numStr.length - 3 + point);
    return parseFloat (parseInt (num / 1000) + '.' + decimal) + '万';
  }
}
/**
 * 数字转图片
 * @param {string} string 数字字符串
 * @param {number} type 转换的文字图片大小
 */
function toImg (string, type) {
  let html = '';
  for (var i=0;i<string.length;i++){
    if (type == 'big') {
      if (string[i] == 0) {
        html=html+ '<img src="data/img/big-0.png"/>';
      } else if (string[i] == 1) {
        html=html+ '<img src="data/img/big-1.png"/>';
      } else if (string[i] == 2) {
        html=html+ '<img src="data/img/big-2.png"/>';
      } else if (string[i] == 3) {
        html=html+ '<img src="data/img/big-3.png"/>';
      } else if (string[i] == 4) {
        html=html+ '<img src="data/img/big-4.png"/>';
      } else if (string[i] == 5) {
        html=html+ '<img src="data/img/big-5.png"/>';
      } else if (string[i] == 6) {
        html=html+ '<img src="data/img/big-6.png"/>';
      } else if (string[i] == 7) {
        html=html+ '<img src="data/img/big-7.png"/>';
      } else if (string[i] == 8) {
        html=html+ '<img src="data/img/big-8.png"/>';
      } else if (string[i] == 9) {
        html=html+ '<img src="data/img/big-9.png"/>';
      }
    } else {
      if (string[i] == 0) {
        html=html+ '<img src="data/img/small-0.png"/>';
      } else if (string[i] == 1) {
        html=html+ '<img src="data/img/small-1.png"/>';
      } else if (string[i] == 2) {
        html=html+ '<img src="data/img/small-2.png"/>';
      } else if (string[i] == 3) {
        html=html+ '<img src="data/img/small-3.png"/>';
      } else if (string[i] == 4) {
        html=html+ '<img src="data/img/small-4.png"/>';
      } else if (string[i] == 5) {
        html=html+ '<img src="data/img/small-5.png"/>';
      } else if (string[i] == 6) {
        html=html+ '<img src="data/img/small-6.png"/>';
      } else if (string[i] == 7) {
        html=html+ '<img src="data/img/small-7.png"/>';
      } else if (string[i] == 8) {
        html=html+ '<img src="data/img/small-8.png"/>';
      } else if (string[i] == 9) {
        html=html+ '<img src="data/img/small-9.png"/>';
      }
    }
  }
  return html;
}

/***
 * 获取当前日期的上一周日期
 */
function _getDay(day){
  var today = new Date();
  var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
  today.setTime(targetday_milliseconds); //注意，这行是关键代码
  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear.toString()+tMonth.toString()+tDate.toString();
}

/**
 * 获取当前日期的上一周星期数
 */
function _xingqi(i){
  var aa;
  if(i>new Date().getDay()){
    aa = "星期" + "日一二三四五六".charAt(new Date().getDay()- i + 7);
  } else {
    aa = "星期" + "日一二三四五六".charAt(new Date().getDay()-i);
  }
  return aa
}
/***
 * 给日期加0
 */
function doHandleMonth(month){
  var m = month;
  if(month.toString().length == 1){
    m = "0" + month;
  }
  return m;
}