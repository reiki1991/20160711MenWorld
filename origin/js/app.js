var App = {
    loginUrl: "http://goldlion.gz.bolaa.cc/wxapi.php",
    init: function () { //初始化
        var _curUrl = window.location.href, _curUrl = _curUrl.substring(0,_curUrl.indexOf('.html') || _curUrl.indexOf('.php')),
            _curhtmlname = _curUrl ? _curUrl.substring(_curUrl.lastIndexOf('/')+1, _curUrl.length) : "index";
        App[_curhtmlname]();
        //是否分享回流
        (Core.getParam("uid")) && (Http.actionTotal("shareback"));
    },
    index: function () {
        $(".in_tipbox").find(" .g_tipcon").css("height",document.documentElement.clientHeight*0.5+"px");
        $("body").on(_triggerEvent,".in_rulebtn",function (e) {
            e.preventDefault();
            $(".g_tipwrap").show();
        });
    },
    choose: function () {
        Core.tip2("男人，坚忍的外表下<br>蕴藏的是丰富的情感<br>选择一个话题，讲述你的故事<br>让我们走入专属于你的“男人的世界”","进入","choose_tipbox");
    },
    toplist: function () {
        //禁止iphone上下回弹
        $(".toplist_box")[0].addEventListener("touchmove", function(e){
            e.stopPropagation();
        }, true);
        var totalPage; //排行榜总数量
        var curpage = 1, pageSize = 10, listwrap = $(".toplist_box");
        Http.getpiclistCount("", function (_data) {
            totalPage = Math.ceil(_data/pageSize);
            if(totalPage){
                var getList = function() { //获取时光轴照片列表
                    Http.getpiclist("", "", curpage, pageSize, function (_data) {
                        Core.Scroll.datahandle(curpage,totalPage, listwrap, function(){
                            var html = template("templ_data1",{"list":_data,"curpage":curpage});
                            listwrap.append(html);
                            curpage++;
                        },listwrap);
                    });
                }
                Core.Scroll.init(getList,listwrap);
            }else{
                listwrap.append('<li class="g_scrollinfo">暂无数据</li>')
            }
        });
        //跳转我的大片列表页
        $("body").on(_triggerEvent,".go_mylist",function () {
            Http.mygetpiclist(function (_data) {
                if(_data && _data.length){
                    window.location.href = "mylist.html";
                }else{
                    Core.tip2("您的大片还没有生成<br>马上开始制作吧",'<a href="choose.html">开启我的篇章</a>');
                }
            });
        });
    },
    mylist: function () {
        //禁止iphone上下回弹
        $(".mylist_box")[0].addEventListener("touchmove", function(e){
            e.stopPropagation();
        }, true);
        //获取我的大片列表
        Http.mygetpiclist(function (_data) {
            var html = template("templ_data1",{"list":_data});
            $('#templ_wrap1').append(html);
        });
    },
    info: function () {
        var _storyId = Core.getParam("storyId");
        var _menType = Core.getParam("type");
        $("body").addClass("body_men"+_menType);
        //用户信息提交
        var _pattern = /^1[34578]\d{9}$/;
        $('body').on(_triggerEvent, ".info_sub", function(e){
            var name = $(".info_name").val();
            var phone = $(".info_phone").val();
            if(name && phone){
                if (_pattern.test(phone)) {
                    Http.updateUserinfo(name, phone, function (_data) {
                        //TODO 信息提交成功后跳转
                        (_data==0) && (window.location.href = App.loginUrl+"?"+window.location.href.split(".html?")[1]);
                        (_data==2) && (Core.tip2("请将信息填写完整"));
                        (_data==1) && (window.location.href = "share.html?type="+_menType+"&&storyId="+_storyId);
                    });
                }else{
                    Core.tip2("请填写正确的手机号码");
                }
            }else{
                Core.tip2("请将信息填写完整。");
            }
        });
    },
    share: function () {
        var _storyId = Core.getParam("storyId");
        var _menType = Core.getParam("type");
        $("body").addClass("body_men"+_menType);
        (_menType==4) && ($(".share_story,.share_gap").insertBefore($(".share_avatar")));
        //点击分享按钮
        $("body").on(_triggerEvent,".share_btn",function () {
            $(".share_tip").fadeIn();
        });
        //点击分享提示层
        $("body").on(_triggerEvent,".share_tip",function () {
            $(".share_tip").fadeOut();
        });
        //获取故事详情
        Http.getpicInfo(_storyId,function (_data) {
            var _infoWrap = "<h3>"+_data.Info+"</h3>"
            _data.Info = $(_infoWrap).text().replace(/\n/g,'<br/>').replace(/\s/g, '&nbsp;');
            //_data.Info = _data.Info.replace(/\n/g,'<br/>').replace(/\s/g, '&nbsp;');//textArea的换行&空格处理
            var html = template("templ_data1",_data);
            $('#templ_wrap1').append(html);
        });
    },
    story: function () {
        var _storyId = Core.getParam("storyId");
        var _menType = Core.getParam("type");
        $("body").addClass("body_men"+_menType);
        //men的类型为4的时候图片和文字进行换位处理
        (_menType==4) && ($(".share_story,.share_gap").insertBefore($(".share_avatar")));
        //对应显示按钮
        (!!Core.getParam("my")) ? ($("body").addClass("body_story1")) : ($("body").addClass("body_story2"));
        //获取故事详情
        Http.getpicInfo(_storyId,function (_data) {
            var _infoWrap = "<h3>"+_data.Info+"</h3>"
            _data.Info = $(_infoWrap).text().replace(/\n/g,'<br/>').replace(/\s/g, '&nbsp;');
            (_data.max_num < 100) && (_data.max_num = 100);
            _data.votePer = Math.ceil(100*(_data.VoteNo/_data.max_num));
            (_data.votePer < 10) && (_data.votePer = 10);
            var html = template("templ_data1",_data);
            $('#templ_wrap1').append(html);
        });
        //点击分享按钮
        $("body").on(_triggerEvent,".story_share",function () {
            $(".share_tip").fadeIn();
        });
        //点击分享提示层
        $("body").on(_triggerEvent,".share_tip",function () {
            $(".share_tip").fadeOut();
        });
        //为TA增添阅历值
        $("body").on(_triggerEvent,".story_btn2",function () {
            Http.vote(_storyId, function (_data) {
                (_data==-1) && (window.location.href = App.loginUrl+"?"+window.location.href.split(".html?")[1]);
                (_data==-2) && (Core.tip2("您今天的投票已用完"));
                (_data==-3) && (Core.tip2('您已投过票','<a href="choose.html">制作我的专属大片</a>'));
                (_data==1) && (function () { //投票成功
                    $("#story_voteNo").html(parseInt($("#story_voteNo").html())-0+1+"&nbsp;");
                    Core.tip2("您已成功为TA增添阅历！<br>赶快生成专属大片<br>将您的人生故事分享给大家吧！",'<a href="choose.html">制作我的专属大片</a>');
                    /*Http.mygetpiclist(function (_data) { //检测我是否分享过人生故事
                        if(_data && _data.length){
                            Core.tip2("您已成功为TA增添阅历值");
                        }else{
                            Core.tip2("您已成功为TA增添阅历！<br>赶快生成专属大片<br>将您的人生故事分享给大家吧！",'<a href="choose.html">制作我的专属大片</a>');
                        }
                    });*/
                })();
            });
        });
    },
    storycreate: function () {
        $("body").addClass("body_men"+Core.getParam("type"));
    },
    filehandle: function () {
        var menType = Core.getParam("type");
        $("body").addClass("body_men"+menType);
        //生成我的专属大片
        $("body").on(_triggerEvent,".sc_btn1",function () {
            var _story = $(".sc_story").html();
            //if(!_story){ Core.tip2("请填写你的大片故事！"); return; }
            Core.load("正在生成您的大片....");
            var base64 = cvs.toDataURL("image/png");
            //后台提交个人大片
            Http.savePic(base64, _lyrics, _story, menType, function (_data) {
                Core.removeload();
                (_data==-1) && (window.location.href = App.loginUrl+"?"+window.location.href.split(".html?")[1]);
                (_data==-2 || _data==0) && (Core.tip("上传失败"));
                if(_data>0){ //上传成功
                    var _storyId = _data;
                    Http.getuserinfo(function(_data){
                        //TODO share或info页面跳转
                        window.location.href = ((_data && _data.Tel) ? "share": "info") + ".html?type="+menType+"&&storyId="+_storyId;
                    });
                }
            });
        });
        //点击【我的故事】按钮,base64图片上传提交
        $("body").on(_triggerEvent,".fh_sub",function(){
            $("body").removeClass("fh_state3").addClass("fh_state4");
        });
        var _triggerbtn;
        //选择照片按钮
        $("body").on("click",".fh_getfile",function(){
            $("#fh_file").click();
            ($(this).hasClass("fh_file1")) && (_triggerbtn="btn1");
        });
        $("#fh_file").change(function(){
            if(_triggerbtn=="btn1"){
                _triggerbtn = "";
                $("body").removeClass("fh_state1").addClass("fh_state2");
            }
            //添加手势编辑图片
            selectFileImage(this,initImg);
        });
        //画布
        var cvsRadio = 2; //解决canvas画图模糊问题
        var cvsId = 'fh_cvs'; //canvas所在标签ID
        var cvs = document.getElementById(cvsId), //canvas对象
            ctx = cvs.getContext('2d'), //canvas 2d对象
            cvsW = cvs.width, //canvas宽度
            cvsH = cvs.height; //canvas高度
        //画布字体设置
        ctx.font="normal 30px Arial";
        ctx.fillStyle='#FFF';
        ctx.textAlign="center";
        //被编辑的背景图片对象
        var bgImg;
        var bgImg_x, bgImg_y; //图片在canvas上的x值，y值
        var bgImg_scale; //图片的缩放比例
        var bgImg_curW, bgImg_curH; //图片在canvas上显示的宽度，高度
        var bgImg_limit = 200; //图片限制在相框内的系数
        //遮罩层
        var bgMask = new Image();
        //歌词
        var _lyrics, _lyricsL;
        $(".fh_lyrics").change(function(){
            _lyrics = $(".fh_lyrics").val();
            addText(_lyrics);
            $("#fh_restNum").html(_lyrics.length);
        });
        //摇一摇换色处理
        var colorCount = 1, colorCountName = ["default","yellow","blue","gray"];
        var colorLen = cvsW * cvsH * 4;
        var colorOriginData, colorCurData;
        var colorFun = {
            "default": function (binaryData) {
                //默认原图不做处理
            },
            "yellow": function(binaryData) {
                for (var i = 0; i < colorLen; i += 4) {
                    var r = binaryData[i];
                    var g = binaryData[i + 1];
                    var b = binaryData[i + 2];
                    binaryData[i] = (r*0.393)+(g*0.769)+(b*0.189);
                    binaryData[i+1] = (r*0.349)+(g*0.686)+(b*0.168);
                    binaryData[i+2] = (r*0.272)+(g*0.534)+(b*0.131);
                }
            },
            "gray": function(binaryData) {
                for (var i = 0; i < colorLen; i += 4) {
                    //var average = (binaryData[i] + binaryData[i+1] + binaryData[i+2]) / 3;
                    var average = 0.2126*binaryData[i] + 0.7152*binaryData[i+1] + 0.0722*binaryData[i+2];
                    binaryData[i] = binaryData[i+1] = binaryData[i+2] = average;
                }
            },
            "blue": function(binaryData) {
                for (var i = 0; i < colorLen; i += 4) {
                    var r = binaryData[i];
                    var g = binaryData[i + 1];
                    var b = binaryData[i + 2];
                    binaryData[i] = (r * 0.272) + (g * 0.534) + (b * 0.131);
                    binaryData[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
                    binaryData[i + 2] = (r * 0.393) + (g * 0.769) + (b * 0.189);
                }
            }
        }
        var colorchange = function () {
            (!colorOriginData) && (colorOriginData = ctx.getImageData(0, 0, cvsW, cvsW));
            colorCurData = ctx.createImageData(colorOriginData);
            colorCurData.data.set(colorOriginData.data);
            colorFun[colorCountName[colorCount-1]](colorCurData.data); //data处理
            ctx.putImageData(colorCurData, 0, 0);
        };
        $(".fhandle_box").on(_triggerEvent,".g_arrowL",function () {
            (colorCount==1) ? (colorCount=4) : (colorCount--);
            colorchange();
        });
        $(".fhandle_box").on(_triggerEvent,".g_arrowR",function () {
            (colorCount<colorCountName.length) ? (++colorCount) : (colorCount=1);
            colorchange();
        });
        //禁止iphone上下回弹
        cvs.addEventListener("touchmove", function(e){
            e.preventDefault();
        }, true);
        //点击【确认】按钮
        $("body").on(_triggerEvent,".fh_sure",function () {
            _lyrics = $(".fh_lyrics").val();
            !_lyrics && (Core.tip2("无歌词不人生<br>请补充填写心情歌词"));
            if(_lyrics){
                addText(_lyrics);
                $("body").removeClass("fh_state2").addClass("fh_state3");
            }
        });
        function addText(_txt,_ismove) {
            var fillText = function () {
                (_txt.length) < 11 ? (ctx.fillText(_txt,230,420)) : (function () {
                    ctx.fillText(_txt.substring(0,10), 230,385);
                    ctx.save();
                    ctx.textAlign="left";
                    !_ismove && (_lyricsL = 230-(ctx.measureText(_txt.substring(0,10)).width)/2+2);
                    ctx.fillText(_txt.substring(10,_txt.length) ,_lyricsL,425)
                    ctx.restore();
                })();
            }
            if(_ismove){
                fillText();
                return;
            }else{
                ctx.clearRect(0, 0, cvsW, cvsH);
                bgImg && ctx.drawImage(bgImg, bgImg_x, bgImg_y, bgImg_curW, bgImg_curH);
                bgMask && ctx.drawImage(bgMask,0,0,cvsW,cvsH);
                fillText();
                var txtW = ctx.measureText(_txt).width;
            }
        }
        function initImg(_base64) { //_base64 是正确旋转后的base64格式图片
            bgImg = new Image();
            bgImg.src = _base64;
            bgImg.onload = function(){
                //移除loading底图
                $(cvs).css("backgroundImage","none");
                //初始化参数
                bgImg_x = 0;
                bgImg_y = 0;
                bgImg_scale = cvsW/bgImg.width; //背景图和画布的比例
                bgImg_curW = bgImg.width * bgImg_scale;
                bgImg_curH = bgImg.height * bgImg_scale;
                //初始化绘制
                ctx.clearRect(0, 0, cvsW, cvsH);
                ctx.drawImage(bgImg, bgImg_x, bgImg_y, bgImg_curW, bgImg_curH);
                //加载遮罩图
                if(bgMask.src){
                    ctx.drawImage(bgMask,0,0,cvsW,cvsH);
                    _lyrics && (addText(_lyrics,true));
                }else{
                    bgMask.src = "./imgs/cvsmask.png";
                    bgMask.onload = function () {
                        ctx.drawImage(bgMask,0,0,cvsW,cvsH);
                        _lyrics && (addText(_lyrics,true));
                    }
                }
                //添加手势编辑事件
                eventRegisterFirst && addEventHandlers();
            };
        }
        var eventRegisterFirst = true; //是否第一次注册该事件
        function addEventHandlers(){
            eventRegisterFirst = false;
            var bgImg_limitFun = function () {
                (_curX < bgImg_limit-bgImg_curW) && (_curX = bgImg_limit-bgImg_curW);
                (_curX > cvsW-bgImg_limit) && (_curX = cvsW-bgImg_limit);
                (_curY < bgImg_limit-bgImg_curH) && (_curY = bgImg_limit-bgImg_curH);
                (_curY > cvsH-bgImg_limit) && (_curY = cvsH-bgImg_limit);
            }
            var hammerCvs = new Hammer(cvs), _curX, _curY;
            hammerCvs.get('pan').set({ direction: Hammer.DIRECTION_ALL });//允许识别器识别全部方位的pan,默认只能识别水平方向
            hammerCvs.on("pan", function(e){
                ctx.clearRect(0, 0, cvsW, cvsH);
                _curX = bgImg_x + e.deltaX;
                _curY = bgImg_y + e.deltaY;
                bgImg_limitFun && bgImg_limitFun();
                ctx.drawImage(bgImg, _curX, _curY, bgImg_curW, bgImg_curH);
                ctx.drawImage(bgMask,0,0,cvsW,cvsH);
                _lyrics && (addText(_lyrics,true));
                if(e.eventType == "4"){ //手指离开屏幕
                    bgImg_x = _curX;
                    bgImg_y = _curY;
                }
            });
            hammerCvs.get('pinch').set({ enable: true });//允许pinch事件，默认禁止
            hammerCvs.on("pinch", function(e){
                ctx.clearRect(0, 0, cvsW, cvsH);
                _curX = bgImg_x + (bgImg_curW-bgImg_curW * e.scale)/2;
                _curY = bgImg_y + (bgImg_curH-bgImg_curH * e.scale)/2;
                bgImg_limitFun && bgImg_limitFun();
                ctx.drawImage(bgImg, _curX, _curY, bgImg_curW * e.scale, bgImg_curH * e.scale);
                ctx.drawImage(bgMask,0,0,cvsW,cvsH);
                _lyrics && (addText(_lyrics,true));
                if(e.eventType == "4"){ //手指离开屏幕
                    bgImg_scale = e.scale;
                    bgImg_x = _curX;
                    bgImg_y = _curY;
                    bgImg_curW *= bgImg_scale;
                    bgImg_curH *= bgImg_scale;
                }
            });
        }
    }
}
$(document).ready(function () {
    window.isDebugger = false;
    isDebugger && (window.onerror = function (e) { alert(e); } );//页面error提示
    window.log = function (m) { (document.ontouchstart!==null) ?  (isDebugger && (alert(m))) : (console.log(m)); }
    window._triggerEvent = (document.ontouchstart!==null) ?  'click' : 'touchstart';
    App.init();
    //给安卓添加特有的样式
    (Core.parseUA().android) && ($("body").addClass("body_android"));
    //提示层点击
    $("body").on(_triggerEvent, ".g_tipbtn", function (e) {
        if(!$(this).children("a").length){
            e.preventDefault();
            var _targetwrap = $(this).parents(".g_tipwrap");
            (_targetwrap.hasClass("save")) ? (_targetwrap.hide()) : (_targetwrap.remove());
        }
    });
});
