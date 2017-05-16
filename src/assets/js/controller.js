/*For join page
 * Inclue two function, one is load new qr for each person, another is show rule popup
 * */
;
(function () {
    var controller = function () {
        this.hasShared = false;
        //if getPrize is 0, no lottery
        //if getPrize is 1, lottery and get prize
        //if getPrize is 2, lottery and no prize
        //this.getPrize = 0;
        this.name = '';
        this.constellation = '';
        this.gender = '女生';
        this.baseLink = 'http://lincoln.e0x233.com/2017motherday';
    };
    //init
    controller.prototype.init = function () {
        var self = this;

        //var timeStart = 0,
        //    step= 4,
        //    isTrueNext = false,
        //    isFalseNext = false;
        //var loadingAni = setInterval(function(){
        //    if(timeStart>100){
        //        isFalseNext = true;
        //        if(isTrueNext){
        //            self.startUp();
        //        }
        //        clearInterval(loadingAni);
        //        return;
        //    };
        //    $('.progress').html(timeStart+'%');
        //    timeStart += step;
        //},100);

        var baseurl = 'src/dist/images/';
        var imagesArray = [
            baseurl + 'logo.png',
        ];
        var i = 0, j = 0;
        new preLoader(imagesArray, {
            onProgress: function () {
                i++;
                //var progress = parseInt(i/imagesArray.length*100);
                //console.log(progress);
                //$('.preload .v-content').html(''+progress+'%');
                //console.log(i+'i');
            },
            onComplete: function () {
                //isTrueNext  = true;
                //if(isFalseNext){
                //    self.startUp();
                //}
                //self.playaudio();

                //test
                self.startUp();
            }
        });


    };

    controller.prototype.startUp = function () {
        var self = this;
        $('.preload').remove();

        //pc mobile wechat weibo
        //  if(navigator.appVersion)
        //mobile
        //$('.wrapper').addClass('fade');
        //Common.gotoPin(0);
        self.bindEvent();
        if(self.isLandScape()){
            self.doAnimation();
            //self.sequenceFrame();
        }

    };

    controller.prototype.isLandScape = function(){
        var self = this;
        if(window.innerWidth > window.innerHeight){
            return true;
        }else{
            return false;
        }
    };



    //bind Events
    controller.prototype.bindEvent = function () {
        var self = this;
        screen.orientation.addEventListener('change', function() {
            if(screen.orientation.type == 'landscape-primary'){
                //landscape
                self.doAnimation();
            }else{
            //    portrait

            }
        });
    };

    //do animation for page2
    controller.prototype.doAnimation = function () {
        var self = this;
    //    loading first, the show all elements
        console.log('doAnimation');
        $('.wrapper').addClass('fade');
    //    move the mask position
        var moveTime = 1;
        $('.mask').addClass('move');
        var showCircle = setTimeout(function(){
            $('.p1-2').addClass('fade');
            $('.ani-block').addClass('fade');
            $('.content').addClass('fade');
            clearTimeout(showCircle);
        },moveTime * 1000);

        var doSF = setTimeout(function(){
            $('.content .words').addClass('active');
            self.sequenceFrame();
            clearTimeout(doSF);
        },(moveTime+3) * 1000);

    };

    //Sequence Frame
    controller.prototype.sequenceFrame = function(){
        var self = this;
        var i = 0;
        var SF = new reqAnimate($('.ani-block'),{
            fps: 10,
            totalFrames: 20,
            time: Infinity,
            processAnimation:function(){
                var imgSrc = 'src/dist/images/p2-ani/P2-ANI_000'+(40+i)+'.png';
                $('.ani-block img').attr('src',imgSrc);
                //console.log(i);
                i++;
                if(i>19){
                    i=0;
                };
            }
        });
        SF.start();
    };

    controller.prototype.playaudio = function(){
        //    play audio
        var audioEle = document.getElementById('bgm');
        document.addEventListener("WeixinJSBridgeReady", function () {
            audioEle.play();
        }, false);
        audioEle.load();
        audioEle.play();

        $('#bgm').on('play',function(){
            ga('send', 'event', 'btn', 'click', 'PlayMusic');
            $('.icon-bgm').addClass('play');
        });
        $('#bgm').on('pause',function(){
            ga('send', 'event', 'btn', 'click', 'PauseMusic');
            $('.icon-bgm').removeClass('play');
        });
        $('.icon-bgm').on('touchstart',function(){
            if(audioEle.paused){
                audioEle.play();
            }else{
                audioEle.pause();
            }
        });
    }
    controller.prototype.getTextareaLine = function (c) {
        var self = this;
        var lines = c.split(/\r*\n/);
        return lines.length;
    };



    $(document).ready(function () {
//    show form

        var u = navigator.userAgent,
            app = navigator.appVersion;

        if (!!u.match(/AppleWebKit.*Mobile.*/)) {
            //mobile
            $('.pc-wrapper').remove();
            var newFollow = new controller();
            newFollow.init();
        } else {
            //pc
            $('.preload').remove();
            $('.pc-wrapper').addClass('fade');
            $('.wrapper').remove();
        }


    });

})();
