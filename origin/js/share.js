//封装ajax
function ajaxPackage2(url,jsonData,callback){
    url = url||"wxtemp.php";
    $.ajax({
        url:url,
        type:"post",
        data:jsonData,
        success:callback
    });
}
var wxurl = window.location.href;
//判断登陆
ajaxPackage2("",{wxurl:wxurl},function(data){
    data = eval("("+data+")");
    var appId=data.appId;
    var timestamp=data.timestamp;
    var nonceStr=data.nonceStr;
    var signature=data.signature;
    wx.config({
        //debug: true,
        appId: appId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature:signature,
        jsApiList: [
            // 所有要调用的 API 都要加到这个列表中
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem'
        ]
    });
});
//微信分享
function weixin(){
    wx.ready(function () {
        // 在这里调用 API
        var sharetitle = "男人，坚忍的外表下蕴藏的是丰富的情感，选择一个话题，讲述你的故事，让我们走入专属于你的男人的世界。";
        var shareDesc = "分享你的故事，让我们走入专属于你的“男人的世界”";
        var shareImg =  "http://goldlion.gz.bolaa.cc/imgs/wx_share.jpg";
        var share_avatar = $(".share_avatar");
        if(share_avatar && share_avatar.length){
            shareDesc = "这是我的故事大片，分享你的故事，让我们走入专属于你的“男人的世界”";
            shareImg =  "http://goldlion.gz.bolaa.cc/"+ share_avatar.attr("src");
        }
        var sharelink = "http://goldlion.gz.bolaa.cc/story.html?uid=1&&type="+Core.getParam("type")+"&&storyId="+Core.getParam("storyId");
        var wx_successFun = function () { // 用户确认分享后执行的回调函数
            Http.actionTotal("indexshare");
            //_hmt.push(['_trackEvent', '分享', 'share', '分享']);
        }
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: shareDesc, // 分享标题
            link: sharelink, // 分享链接
            imgUrl: shareImg, // 分享图标
            success: wx_successFun,
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //分享给好友
        wx.onMenuShareAppMessage({
            title: sharetitle, // 分享标题
            desc: shareDesc, // 分享描述
            link: sharelink, // 分享链接
            imgUrl: shareImg, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: wx_successFun,
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //分享到QQ
        wx.onMenuShareQQ({
            title: sharetitle, // 分享标题
            desc: shareDesc, // 分享描述
            link: sharelink, // 分享链接
            imgUrl: shareImg, // 分享图标
            success: wx_successFun,
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //分享到微博
        wx.onMenuShareWeibo({
            title: sharetitle, // 分享标题
            desc: shareDesc, // 分享描述
            link: sharelink, // 分享链接
            imgUrl: shareImg, // 分享图标
            success: wx_successFun,
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
    wx.error(function(res){
        //alert("接口处理失败");
    });
};
weixin();