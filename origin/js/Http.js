var Http = {
    prefix: "http://goldlion.gz.bolaa.cc/api/data.php",
    request: function(url, data, success, error, method ){
        $.ajax({
            url: url ? url : Http.prefix,
            type: method ? method : "POST",
            data: data || {},
            success: function(_res){
                if(typeof _res == "string"){ _res = $.parseJSON(_res); }
                success && success(_res);
            },
            error: function(xhr, type){
                Core.removeload();
                console.log("来自"+url+"的error xhr: "+JSON.stringify(xhr));
                var err = {};
                try {
                    var d = $.parseJSON(xhr.responseText);
                    err = $.extend(err, d);
                } catch (e) {
                    err.Msg = xhr.responseText || "网络错误，请稍后重试._来自http.request.error";
                }
                var r = error && error(err);
                if (r !== false) {
                    log(err.Msg || err.Message);
                }
            }
        });
    },
    checkLogin: function(success, error){ //判断是否登陆
        var data = {
            "action": "checkLogin"
        }
        this.request("", data, success, error);
    },
    savePic: function(upload_file1, title, info, type, success, error){ //后台上传图片
        var data = {
            "action": "save_pic",
            "upload_file1": upload_file1,
            "title": title,
            "info": info,
            "type": type
        }
        this.request("", data, success, error);
    },
    getpiclistCount: function(key, success, error){ //排行榜总数量
        var data = {
            "action": "getpiclist_count",
            "key": key
        }
        this.request("", data, success, error);
    },
    getpiclist: function(key, order, pages, pagesize, success, error){ //排行榜列表
        var data = {
            "action": "getpiclist",
            "key": key,
            "order": order,
            "pages": pages,
            "pagesize": pagesize
        }
        this.request("", data, success, error);
        //this.request("json/getpiclist.json", data, success, error, "GET");
    },
    mygetpiclist: function(success, error){ //我的大片列表
        var data = {
            "action": "mygetpiclist"
        }
        this.request("", data, success, error);
    },
    getpicInfo: function(Id, success, error){ //根据id获取作品信息
        var data = {
            "action": "getpicInfo",
            "Id": Id
        }
        this.request("", data, success, error);
    },
    vote: function(Id, success, error){ //为他人增添阅历值
        var data = {
            "action": "vote",
            "Id": Id
        }
        this.request("", data, success, error);
    },
    actionTotal: function(code, success, error){ //会员统计数据
        var data = {
            "action": "total",
            "code": code
        }
        this.request("", data, function (_data) {
            if(_data==2){
                console.log("请输入正确的code");
            }
            success &&　success(_data);
        }, error);
    }
}