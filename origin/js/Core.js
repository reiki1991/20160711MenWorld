var Core = {
    tip: function(_info,_style,_hideTime){ //_style的值有'tip_red'、'tip_green',默认值为'tip_default'
        var randomClass = "tip"+Math.round(Math.random()*1000000000);
        var sty = _style?_style:"tip_default";
        var tiphtml = '<div class="tip_box '+sty+' '+randomClass+'">'+_info+'</div>';
        $("body").append(tiphtml);
        setTimeout(function(){ $("."+randomClass).fadeOut(); setTimeout(function(){ $("."+randomClass).remove(); },1000) },_hideTime?_hideTime:2000)
    },
    tip2: function (_info, _btntxt, _style) { //style是额外样式，方便拓展
        var randomClass = "tip"+Math.round(Math.random()*1000000000);
        var sty = _style?_style:"";
        var tip2_templ = '<div class="g_tipwrap '+sty+' '+randomClass+'">' +
                                '<div class="g_tipbox">' +
                                    '<p class="g_tipcon">'+_info+'</p>' +
                                    '<button class="g_tipbtn">'+(_btntxt ? _btntxt : "了解")+'</button>' +
                                '</div>' +
                            '</div>';
        $("body").append(tip2_templ);
    },
    load: function(_info){ //eg: Popup.load("正在上传,请稍等...");
        var loadhtml = _info ? '<div class="g_waitingbox mask_bg" style="height:'+$(window).height()+'px;"><div class="g_loading"><div class="g_loadgif"><span></span><span></span><span></span><span></span><span></span></div><br> '+_info+'</div></div>' : '<div class="waiting_box mask_bg" style="height:'+$(window).height()+'px;"><div class="g_loading"><div class="g_loadgif"><span></span><span></span><span></span><span></span><span></span></div><br>正在努力加载中....</div></div>';
        $("body").append(loadhtml);
    },
    removeload: function(){ //eg: Popup.removeload();
        if($(".g_waitingbox")){
            $(".g_waitingbox").fadeOut();
            setTimeout(function(){ $(".g_waitingbox").remove(); },1000);
        }
    },
    Scroll: {
        isloading: false,
        init: function(_closedfun, _scrollObj){
            var $scrollObj = _scrollObj ? _scrollObj : $(window);
            var onScroll = function() { //滚动加载函数
                var objHeight = _scrollObj ? $scrollObj.height() : window.innerHeight, // iphone fix
                    scrollHeight = _scrollObj ? $scrollObj[0].scrollHeight : $(document).height(),
                    closeToBottom = ($scrollObj.scrollTop() + objHeight > scrollHeight - 30);
                if (closeToBottom && !Core.Scroll.isloading) {
                    Core.Scroll.isloading = true;
                    _closedfun && _closedfun();
                }
            };
            $scrollObj.bind('scroll', onScroll); // Capture scroll event.
            //第一次初始化
            _closedfun && _closedfun();
        },
        datahandle: function(_curpage,_totalpage, listwrap, _addFun,_scrollObj){
            Core.Scroll.isloading = false;
            var removeScrollFun = function () {
                _scrollObj ? _scrollObj.unbind('scroll') : $(window).unbind('scroll');
                $(".g_scrollloading").not(".save").remove();
            }
            if(!_totalpage){
                listwrap.append('<li class="g_scrollinfo">暂无数据</li>');
                removeScrollFun();
            }else if(_curpage==_totalpage){
                _addFun && _addFun();
                listwrap.append('<li class="g_scrollinfo">已全部加载完毕</li>');
                removeScrollFun();
            }else{
                _addFun && _addFun();
            }
        }
    },
    parseUA: function () {
        var u = navigator.userAgent;
        var u2 = navigator.userAgent.toLowerCase();
        return { //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
            weixin: u2.match(/MicroMessenger/i) == "micromessenger",
            taobao: u.indexOf('AliApp(TB') > -1
        };
    },
    getParam: function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
}
