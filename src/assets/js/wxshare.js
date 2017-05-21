//;(function(){
//
//    this.weixinshare = weixinshare;
//}).call(this);
function weixinshare(obj){

    wx.ready(function(){

        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.onMenuShareAppMessage({
            title: obj.title1,
            desc: obj.des,
            link: obj.link,
            imgUrl: obj.img,
            type: '',
            dataUrl: '',
            success: function () {
                ga('send', 'event', 'wxmenu', 'share', 'ShareAppMessage');

            },
            cancel: function () {

            }
        });
        wx.onMenuShareTimeline({
            title: obj.title1,
            link: obj.link,
            imgUrl: obj.img,
            success: function () {
                ga('send', 'event', 'wxmenu', 'share', 'ShareTimeline');
            },
            cancel: function () {

            }
        });
    });

};

$(document).ready(function(){

    weixinshare({
        title1: 'Mindshare Content+团队案例',
        des: 'Mindshare Content+团队案例',
        link: 'window.location.href',
        img: window.location.origin+'/src/dist/images/logo-2.png'
    });

});
