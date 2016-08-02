<?php
session_start();
error_reporting(E_ERROR | E_PARSE);


$wx_login = "http://wx.e2capp.com/auth.ashx?serv_name=goldlion2016";

//$_SESSION['goldenlion20160714'] =53;
if ($_SESSION['goldenlion20160714'] == null)
{
    $wx_login .= '&backurl=' . urlencode($_SERVER["REQUEST_URI"]);

    header("Location:$wx_login");
    exit;
}
else
{
    // $MemberId = $_SESSION['goldenlion20160714'];
    // include 'lib/db/Init.php'; //包含数据库操作类
    //  $dto = $db->table('member')->where('memberid='.$MemberId )->find();//获取会员管理信息
    //  if($dto==null)
    //  {
    //  	$_SESSION['goldenlion20160714'] = null;
    //  	header("Location:$wx_login");
    //  }
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>金利来</title>
    <meta name="description" content="金利来 goldlion男人的世界" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
    <meta name="format-detection" content="telephone=no"/>
    <meta name="author" content="Reiki" />
    <link rel="stylesheet" href="css/all-cee31c7365.min.css">
</head>
<body class="in_body">
<img class="in_logo" src="./imgs/in_logo.png" alt="金利来">
<img class="in_gif" src="./imgs/in_gif.gif" alt="金利来">
<div class="in_box1">
    <button class="g_btn1 in_btn1"><a href="choose.html">开启我的篇章</a></button>
    <button class="g_btn1 in_btn1 in_rulebtn">活动说明</button>
    <a class="in_link1" href="toplist.html">大片榜单</a>
</div>
<!--活动说明-->
<div class="g_tipwrap save hide">
    <section class="g_tipbox in_tipbox">
        <h3 class="in_tit1">活动说明</h3>
        <img class="in_pattern" src="./imgs/g_pattern1.png" alt="金利来">
        <div class="rel">
            <div class="g_track"></div>
            <div class="g_tipcon g_scroll1">
                <h4 class="in_tit2">活动规则：</h4>
                1.进入活动，选择符合自己的人生阶段<br>
                2.上传贴合阶段的图片<br>
                3.为图片配上合适的歌词 ,写下自己在此阶段的人生故事<br>
                4.可以通过摇一摇调换色调，最后生成属于自己的故事大片<br>
                5.分享给好友，为你的大片进行投票<br>
                6.活动结束后，排名前十的参与者可活动金利来大奖一份。最佳故事即排名第一的参与者，其作品将有机会成为下一季金利来大片灵感<br>
                <h4 class="in_tit2">奖项设置：</h4>
                1.  最佳故事大片：活动结束，投票排名前十的参与者可获得金利来大奖一份<br>
                特别大奖：投票排名第一位的参与者，其作品有机会成为金利来下一季大片的灵感来源<br>
                <strong>奖品：金利来男士正装一套，共十份</strong><br><br>
                2.  每周人气大片：每周统计排行榜排名，周前五名的参与者可活动精美礼品一份<br>
                <strong>奖品：金利来定制产品一份，每周共五份</strong><br><br>
                3.  最有号召力的故事大片：挑选有趣或有意义的故事，通过金利来官方微信账号发布，并发起投票，票数排名前十可获得精美礼品一份<br>
                <strong>奖品：金利来定制旅行收纳袋一个，共十份</strong><br><br>
                *以上奖品将在活动结束后统一发送，届时会有专人和得奖者联系，请注意接听联系电话
            </div>
        </div>
        <button class="g_tipbtn">了解</button>
    </section>
</div>
<!--活动说明-->
<script src="js/all-cde3879d85.min.js"></script>
</body>
</html>
