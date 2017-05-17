/*For join page
 * Inclue two function, one is load new qr for each person, another is show rule popup
 * */
;
(function () {
    var controller = function () {
        this.hasShared = false;
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
            baseurl + 'logo-2.png',
            baseurl + 'mask.png',
            baseurl + 'P2-BG_00040.jpg',
            baseurl + 'portrait-tips.jpg',
            baseurl + 'progress-bar.png',
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

                self.startUp();

            }
        });
        //alert('test');



    };

    controller.prototype.startUp = function () {
        var self = this;
        $('.preload').remove();
        Common.gotoPin(0);

        if(window.innerWidth > window.innerHeight){
            self.doAnimation();
        }
        self.bindEvent();

    };

    //bind Events
    controller.prototype.bindEvent = function () {
        var self = this;

        //if the window is orientation
        window.addEventListener("orientationchange", function() {
            if(Math.abs(window.orientation) == 90){
            //    landscape
                console.log('landscape');
                self.doAnimation();
            }else{
            //    portrait
                console.log('portrait');
            }
        });


        // touch left action
        var touchEle = $('#pin-animate');
        var startX = 0;
        var videoEle = document.getElementById('flash-video');
        touchEle.on('touchstart', function(e){
            //console.log(e);
            //e.preventDefault();
            startX = e.changedTouches[0].clientX;
        });
        touchEle.on('touchstart', function(e){
            e.preventDefault();
        });
        touchEle.on('touchend', function(e){
            var deltaX = e.changedTouches[0].clientX - startX;
            if(deltaX<-100){
            //    go right
                console.log(deltaX);
                self.goVideoPage();
                videoEle.load();
                videoEle.play();
            }else{
                //because only touchstart can play the video, so if is not slide to left, pause the video
                //videoEle.load();
                //videoEle.pause();
            }
            e.preventDefault();
            //console.log(deltaX);
        });

    //    video play ended
        videoEle.addEventListener('ended',function(){
            //alert('video end');
            $('.video-wrap').removeClass('show');
            Common.gotoPin(2);
        });


    };

    //do animation for page2
    controller.prototype.doAnimation = function () {
        var self = this;
    //    loading first, the show all elements
    //    console.log('doAnimation');
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
            //self.sequenceFrame();
            clearTimeout(doSF);
        },(moveTime+3) * 1000);

        //self.goVideoPage();
        //Common.gotoPin(2);

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

    //go video page
    controller.prototype.goVideoPage = function(){
        Common.gotoPin(1);
        //videoEle.addEventListener('paused',function(){
        //    videoEle.play();
        //});
    }

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
    }



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
