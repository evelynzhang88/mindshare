/*All the api collection*/
Api = {
    //submit form
    // name  info
   //horoscope: 狮子座
   // gender: 男
    getPoster:function(obj,callback){
        Common.msgBox.add('loading...');
        $.ajax({
            url:'http://lincoln.e0x233.com/get_poster',
            type:'POST',
            dataType:'json',
            data:obj,
            success:function(data){
                return callback(data);
            }
        });

        //return callback({
        //    status:1,
        //    msg:'提交成功'
        //});


    },

//    Parameters
//        horoscope: 狮子座
//gender: 男
//name: xxx
    generatePoster:function(obj,callback){
        Common.msgBox.add('loading...');
        $.ajax({
            url:'http://lincoln.e0x233.com/generate_poster',
            type:'POST',
            dataType:'json',
            data:obj,
            success:function(data){
                return callback(data);
            }
        });
    },

//    Parameters
//        horoscope: 狮子座
//gender: 男
//name: xxx
//content: 你好你好你好
    generatePosterCustom:function(obj,callback){
        Common.msgBox.add('loading...');
        $.ajax({
            url:'http://lincoln.e0x233.com/generate_poster_custom',
            type:'POST',
            dataType:'json',
            data:obj,
            success:function(data){
                return callback(data);
            }
        });
    }



};
