//获取用户信息
// getUserInfo();
//获取时间
getTime();
//获取天气数据
getWeather();
//获取天气数据
function getWeather () {
  Api.getWeather().then( res => {
    let res_data = JSON.parse(res.data);
    $('#date').text(res_data.date);
    $('#week').text(res_data.week);
    $('#wea').text(res_data.wea);
    $('#tem').text(res_data.tem2 + '~' + res_data.tem1 + '°C');
  }).catch(() =>{
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let weekday = date.getDay();
    let weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    weekday = weeks[weekday];
    $('#date').text(`${year}-${month}-${day}`);
    $('#week').text(weekday);
    $('#wea').text('晴');
    $('#tem').text('20 ~30°C');
  });
}
function getTime () {
  setInterval(()=>{
    let date = new Date();
    let month = date.getMonth() + 1;
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    $('#time').text(addZero(hour) + ':' + addZero(min) + ':' + addZero(sec));
    $('#cur_month').text(month)
  },1000)
}
//获取用户信息
function getUserInfo () {
  Api.getUserInfo('checkLogin').then( res => {
    console.log(res);
    // $('#user').text(res.userName);
  }).catch( re => {
    // window.open('http://23.99.193.13/gsp/login');
  });
}
// 中间背景雨
function rainBg() {
  var c = document.querySelector(".rain");
  var ctx = c.getContext("2d");//获取canvas上下文
  var w = c.width = document.querySelector('.cont-middle').clientWidth;
  var h = c.height = document.querySelector('.cont-middle').clientHeight;
  //设置canvas宽、高

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function RainDrop() { }
  //雨滴对象 这是绘制雨滴动画的关键
  RainDrop.prototype = {
    init: function () {
      this.x = random(0, w);//雨滴的位置x
      this.y = h;//雨滴的位置y
      this.color = 'hsl(180, 100%, 50%)';//雨滴颜色 长方形的填充色
      this.vy = random(4, 5);//雨滴下落速度
      this.hit = 0;//下落的最大值
      this.size = 2;//长方形宽度
    },
    draw: function () {
      if (this.y > this.hit) {
        var linearGradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.size * 30)
        // 设置起始颜色
        linearGradient.addColorStop(0, '#14789c')
        // 设置终止颜色
        linearGradient.addColorStop(1, '#090723')
        // 设置填充样式
        ctx.fillStyle = linearGradient
        ctx.fillRect(this.x, this.y, this.size, this.size * 50);//绘制长方形，通过多次叠加长方形，形成雨滴下落效果
      }
      this.update();//更新位置
    },
    update: function () {
      if (this.y > this.hit) {
        this.y -= this.vy;//未达到底部，增加雨滴y坐标
      } else {
        this.init();
      }
    }
  };

  function resize() {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
  }

  //初始化一个雨滴

  var rs = []
  for (var i = 0; i < 10; i++) {
    setTimeout(function () {
      var r = new RainDrop();
      r.init();
      rs.push(r);
    }, i * 300)
  }

  function anim() {
    ctx.clearRect(0, 0, w, h);//填充背景色，注意不要用clearRect，否则会清空前面的雨滴，导致不能产生叠加的效果
    for (var i = 0; i < rs.length; i++) {
      rs[i].draw();//绘制雨滴
    }
    requestAnimationFrame(anim);//控制动画帧
  }

  window.addEventListener("resize", resize);
  //启动动画
  anim()

}
//设置网页自适应
$(document).ready(function(){
  var whei=$(window).width()
  $("html").css({fontSize:whei/20})
  $(window).resize(function(){
    var whei=$(window).width()
    $("html").css({fontSize:whei/20})
  });
});


// 设置第三阶段的step

/**
 * ele   jq节点对象  整个步骤条的父级容器
 * val   百分比值 0-100的整数  num
*/
function setThreeStep(ele, val) {
  var _bColor = '#01efff', // 设置i标签内部的背景色
      _attrBg = 'background'
  var _bNum = parseInt(val/10), //需要填充的个数
      _bWidth = val%10; // 需要填充的width
      ele.find('b').css('background','none') // 清除b标签背景
      if (val < 10) {
        var _baseW = 0,timer = null
        var _Fun = function() {
           if(_baseW === _bWidth) return clearInterval()
           $(ele.find('i')[_bNum]).find('b').css({
               width: _baseW*10+'%',
               background: _bColor
           })
           _baseW++
         }
         setTimeout(function() {
           timer = setInterval(() => {
             _Fun()
           }, 300);
         }, 1500)
        return
      }
    ele.find('i').each(function(i, el) {
      if(i >= _bNum) return

      (function(i) {
        setTimeout(function() {
          $(el).find('b').css(_attrBg, _bColor)
        }, i*1000 + 500)
      })(i)

      if( i === (_bNum - 1)) {
        (function(i) {
          var _baseW = 0,timer = null

         var _Fun = function() {
            if(_baseW === _bWidth) return clearInterval()
            $(ele.find('i')[_bNum]).find('b').css({
                width: _baseW*10+'%',
                background: _bColor
            })
            _baseW++
          }
          setTimeout(function() {
            timer = setInterval(() => {
              _Fun()
            }, 300);
          }, (i+1)*1000 + 500)
        })(i)
      }
  })

}
