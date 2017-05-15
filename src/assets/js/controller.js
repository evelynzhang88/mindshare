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

        var timeStart = 0,
            step= 4,
            isTrueNext = false,
            isFalseNext = false;
        var loadingAni = setInterval(function(){
            if(timeStart>100){
                isFalseNext = true;
                if(isTrueNext){
                    self.startUp();
                }
                clearInterval(loadingAni);
                return;
            };
            $('.progress').html(timeStart+'%');
            timeStart += step;
        },100);

        var baseurl = '' + 'dist/images/';
        var imagesArray = [
            baseurl + 'logo.png',
            baseurl + 'icon-volume.png',
            baseurl + 'icon_music.png',
            baseurl + 'spritesheet.png',
            baseurl + 'bg-1.jpg',
            baseurl + 'bg-2.jpg',
            baseurl + 'icon-gender.png',
            baseurl + 'slogan.png',
            baseurl + 'icon.png',
            baseurl + 'p2-t1.png',
        ];
        imagesArray = imagesArray.concat('dist/audio/inspiring-piano-cut.mp3');
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
                isTrueNext  = true;
                if(isFalseNext){
                    self.startUp();
                }
                self.playaudio();

                //test
                //self.startUp();
            }
        });


    };

    controller.prototype.startUp = function () {
        var self = this;
        $('.preload').remove();

        //pc mobile wechat weibo
        //  if(navigator.appVersion)
        //mobile
        $('.wrapper').addClass('fade');
        Common.gotoPin(0);
        self.bindEvent();

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
    //bind Events
    controller.prototype.bindEvent = function () {
        var self = this;

        //go custom page
        $('.btn-saytomom .text').on('click', function () {
            ga('send', 'event', 'btn', 'click', 'SayToMom');
            Common.gotoPin(1);
        });


        //    submit the form and call api
        $('.btn-submit').on('touchstart', function () {
            ga('send', 'event', 'btn', 'click', 'SetPoster');
            if (self.validateForm()) {
                //name mobile province city area address
                var inputNameVal = document.getElementById('input-name').value,
                    inputConstellationVal = document.getElementById('select-constellation').value,
                    inputGenderVal = $('input[name="gender"]:checked').val();
                Api.getPoster({
                    horoscope: inputConstellationVal,
                    gender: inputGenderVal
                }, function (data) {
                    console.log(data);
                    //set the value for selected
                    self.constellation = inputConstellationVal;
                    self.name = inputNameVal;
                    self.gender = inputGenderVal;
                    if(data.car_pic){
                        var car_pic = self.baseLink + data.car_pic,
                            post_pic = self.baseLink + data.post_pic;
                        var postImg = new Image();
                        postImg.onload = function(){
                            Common.msgBox.remove();
                            self.updateGenerateImg({
                                name:self.name,
                                horoscope:self.constellation,
                                car_pic:car_pic,
                                post_pic:post_pic
                            });
                            Common.gotoPin(2);
                        }
                        postImg.src = post_pic;

                    }

                });
            }

        });

        //    select the constellation
        $('#select-constellation').on('change', function () {
            ga('send', 'event', 'btn', 'click', 'SelectHoroscope');
            $('#input-text-constellation').val($('#select-constellation').val());
        });

        //  for generate
        //  custom text
        $('#pin-generate .btn-custom').on('touchstart', function () {
            ga('send', 'event', 'btn', 'click', 'ShowCustomPop');
            $('.customtext-pop').removeClass('hide');
            $('.icon-bgm').addClass('down');
        });
        $('#pin-generate .btn-back').on('touchstart', function () {
            ga('send', 'event', 'btn', 'click', 'HideCustomPop');
            $('.customtext-pop').addClass('hide');
            $('.icon-bgm').removeClass('down');
        });

        $('#pin-generate .btn-yes').on('touchstart', function () {
            //  call api
            //console.log('call api to get new img');
            ga('send', 'event', 'btn', 'click', 'GeneratePosterCustom');
            var inputContent = $('#custom-words').val();
            Api.generatePosterCustom({
                name:self.name,
                horoscope: self.constellation,
                gender: self.gender,
                content:inputContent,
            }, function (data) {
                //set the value for selected
                if(data.pic){
                    var pic = self.baseLink + data.pic;
                    var newimg = new Image();
                    console.log('loading...');
                    newimg.onload = function(){
                        console.log('endloading');
                        Common.msgBox.remove();
                        $('#pin-share img').attr('src',pic);
                        $('.icon-bgm').addClass('hide');
                        if(Common.isWeibo()){
                            document.title=data.copy;
                            $('#pin-share .tips').html('点击右上角，邀请朋友参与告白<br>通过浏览器打开网页，长按可保存海报');
                        }
                        Common.gotoPin(3);
                    }
                    newimg.src = pic;
                }

            });
            $('.icon-bgm').removeClass('down');

        });
        //  switch text
        $('#pin-generate .btn-switch').on('touchstart', function () {
            ga('send', 'event', 'btn', 'click', 'ChangPoster');
            Common.gotoPin(1);
        });

        //  make sure and sent to call api
        $('#pin-generate .btn-sent').on('touchstart', function () {
            ga('send', 'event', 'btn', 'click', 'GeneratePoster');
            Api.generatePoster({
                name:self.name,
                horoscope: self.constellation,
                gender: self.gender
            }, function (data) {
                console.log(data);
                //set the value for selected
                if(data.pic){
                    var pic = self.baseLink + data.pic;
                    var newimg = new Image();
                    console.log('loading...');
                    newimg.onload = function(){
                        console.log('endloading');
                        Common.msgBox.remove();
                        $('#pin-share img').attr('src',pic);
                        $('.icon-bgm').addClass('hide');
                        if(Common.isWeibo()){
                            document.title=data.copy;
                            $('#pin-share .tips').html('点击右上角，邀请朋友参与告白<br>通过浏览器打开网页，长按可保存海报');
                        }
                        Common.gotoPin(3);
                    }
                    newimg.src = pic;
                }

            });
        });

        //make the textarea focus
        //$('.cw-wrap').on('touchstart', function () {
        //    $('.cw-wrap .tips').addClass('hide');
        //});
        var customEle = $('#custom-words');
        customEle.on('focusout',function(e) {
            $('.customtext-pop .tips').addClass('hide');
        });
        //  limit the input text number
        customEle.on('input', function(e) {
            //alert('any key was pressed');
            //console.log(e);
            var totalNum = 30,
                curNum = customEle.val().length;
            if (curNum >= 30 || self.getTextareaLine(customEle.val()) > 5) {
                if(curNum >= 30){
                    $('.customtext-pop .tips').removeClass('hide');
                    customEle.val(customEle.val().substring(0, 30));
                    curNum = 30;
                }else{
                    $('.customtext-pop .tips').removeClass('hide');
                    var splitLine = customEle.val().split(/\r*\n/);
                    var newContent = '';
                    splitLine.forEach(function (item, index) {
                        if (index < 5) {
                            newContent = newContent + item + ((index == 4) ? '' : '\n');
                        }
                    });
                    //console.log(newContent);
                    customEle.val(newContent);
                }
            }else{
                $('.customtext-pop .tips').addClass('hide');
            }

            $('.text-num').html(curNum + '/' + totalNum);
        });

        //    imitate share function on pc
        //  $('.share-popup .guide-share').on('touchstart',function(){
        //      self.shareSuccess();
        //  });

    //    back to custom page
        $('#pin-share .btn-prev').on('touchstart', function(){
            ga('send', 'event', 'btn', 'click', 'BackCustomPage');
            self.backCustomPage();
        }, false);


    };

    controller.prototype.getTextareaLine = function (c) {
        var self = this;
        var lines = c.split(/\r*\n/);
        return lines.length;
    };


    //update the generate image
    controller.prototype.updateGenerateImg = function (obj) {
        $('.custom-text').html(obj.name+' | '+obj.horoscope+'<br>Ta对妈妈说:');
        $('.recommend-slogan img').attr('src', obj.car_pic);
        $('.blessing-words img').attr('src', obj.post_pic);
    };

    controller.prototype.backCustomPage = function(){
        var self = this;
        Common.gotoPin(2);
    };


    //validation the form
    controller.prototype.validateForm = function () {
        var self = this;
        var validate = true,
            inputName = document.getElementById('input-name'),
            inputConstellation = document.getElementById('select-constellation'),
            inputGender = $('input[type="gender"]:checked').val();

        if (!inputName.value) {
            Common.errorMsgBox.add('请填写姓名');
            validate = false;
        }
        ;

        if (validate) {
            return true;
        }
        return false;
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
