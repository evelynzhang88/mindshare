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
        //push img frame to array
        for(var k=0;k<20;k++){
            var imgSrc = 'src/dist/images/p2-ani/P2-ANI_000'+(40+k)+'.png';
            imagesArray.push(imgSrc);
        }
        var i = 0, j = 0;
        new preLoader(imagesArray, {
            onProgress: function () {
                i++;
                var progress = parseInt(i/imagesArray.length*100);
                $('.preload .progress').html(''+progress+'%');
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
        $('.wrapper').addClass('fade');
        if(window.innerWidth > window.innerHeight){
            self.doAnimation();
        }
        self.bindEvent();

    };

    //bind Events
    controller.prototype.bindEvent = function(){
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
        videoEle.load();
        //var hammertime = new Hammer(touchEle[0], {});
        //hammertime.on('swipe', function(ev) {
        //    console.log(ev);
        //    self.goVideoPage();
        //    //videoEle.load();
        //    videoEle.play();
        //    //if(ev.deltaX<-100){
        //    ////    go right
        //    ////    console.log(deltaX);
        //    //
        //    //}
        //});

        touchEle.on('touchstart', function(e){
            //console.log(e);
            //e.preventDefault();
            startX = e.changedTouches[0].clientX;
            if(Common.isWechat()){
                videoEle.play();
            }
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
                videoEle.play();
            }else{
                //because only touchstart can play the video, so if is not slide to left, pause the video
                if(Common.isWechat()){
                    videoEle.pause();
                }
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
