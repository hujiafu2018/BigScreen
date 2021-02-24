//获取用户信息
getUserInfo();
//获取天气数据
getWeather();
//获取天气数据
function getWeather () {
  Api.getWeather('重庆').then( res => {
    console.log(res);
    $('#date').text(res.date);
    $('#week').text(res.week);
    $('#wea').text(res.wea);
    $('#tem').text(res.tem2 + '~' + res.tem1 + '°C');
  });
  setInterval(()=>{
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    $('#time').text(addZero(hour) + ':' + addZero(min) + ':' + addZero(sec));
  },1000)
}
//获取用户信息
function getUserInfo () {
  Api.getUserInfo('checkLogin').then( res => {
    console.log(res);
    // $('#user').text(res.userName);
  }).catch( re => {
    window.open('http://23.99.193.13/gsp/login');
  });
}
