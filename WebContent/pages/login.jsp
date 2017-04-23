<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport"
	content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<!--[if lt IE 9]>
<script type="text/javascript" src="/pages/lib/html5.js"></script>
<script type="text/javascript" src="/pages/lib/respond.min.js"></script>
<script type="text/javascript" src="/pages/lib/PIE_IE678.js"></script>
<![endif]-->
<link
	href="${pageContext.request.contextPath }/pages/static/h-ui/css/H-ui.min.css"
	rel="stylesheet" type="text/css" />
<link
	href="${pageContext.request.contextPath }/pages/static/h-ui.admin/css/H-ui.login.css"
	rel="stylesheet" type="text/css" />
<link
	href="${pageContext.request.contextPath }/pages/static/h-ui.admin/css/style.css"
	rel="stylesheet" type="text/css" />
<link
	href="${pageContext.request.contextPath }/pages/lib/Hui-iconfont/1.0.7/iconfont.css"
	rel="stylesheet" type="text/css" />
<!--[if IE 6]>
<script type="text/javascript" src="http://lib.h-ui.net/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>后台登录 - H-ui.admin v2.3</title>
<meta name="keywords"
	content="H-ui.admin v2.3,H-ui网站后台模版,后台模版下载,后台管理系统模版,HTML后台模版下载">
<meta name="description"
	content="H-ui.admin v2.3，是一款由国人开发的轻量级扁平化网站后台模板，完全免费开源的网站后台管理系统模版，适合中小型CMS后台系统。">
</head>
<body>
	<input type="hidden" id="TenantId" name="TenantId" value="" />
	<div class="header"></div>
	<div class="loginWraper">
		<div id="loginform" class="loginBox">
			<form class="form form-horizontal"
				action="${pageContext.request.contextPath }/pages/user_adminLogin.action"
				method="post" onsubmit="return checkForm();">
				<div style="text-align: center;">
					<label for="online"><font id="msg" color="red">${msg }</font></label>
				</div>
				<div class="row cl">
					<label class="form-label col-xs-3"><i class="Hui-iconfont">&#xe60d;</i></label>
					<div class="formControls col-xs-8">
						<input id="uname" name="uname" type="text" placeholder="用户名"
							value="${uname }" class="input-text size-L">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-xs-3"><i class="Hui-iconfont">&#xe60e;</i></label>
					<div class="formControls col-xs-8">
						<input id="upwd" name="upwd" type="password" placeholder="密码"
							class="input-text size-L">
					</div>
				</div>
				<div class="row cl">
					<div class="formControls col-xs-8 col-xs-offset-3">
						<input class="input-text size-L" type="text" placeholder="验证码"
							value="${imageCode }" name="imageCode" id="imageCode"
							style="width: 150px;"> <img id="randImage"
							src="${pageContext.request.contextPath }/pages/image.jsp"
							name="randImage"> <a id="kanbuq"
							onclick="javascript:loadimage();" href="javascript:;">看不清，换一张</a>
					</div>
				</div>
				<div class="row cl">
					<div class="formControls col-xs-8 col-xs-offset-3">
						<input id="imageCode" name="" type="submit"
							class="btn btn-success radius size-L"
							value="&nbsp;登&nbsp;&nbsp;&nbsp;&nbsp;录&nbsp;"> <input
							name="" type="reset" class="btn btn-default radius size-L"
							value="&nbsp;取&nbsp;&nbsp;&nbsp;&nbsp;消&nbsp;">
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="footer">Copyright 你的公司名称 by H-ui.admin.v2.3</div>
	<script type="text/javascript"
		src="${pageContext.request.contextPath }/pages/lib/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath }/pages/static/h-ui/js/H-ui.js"></script>
	<script type="text/javascript">
function loadimage(){
	document.getElementById("randImage").src = "/pages/image.jsp?"+Math.random();
}
function checkForm(){
	 var uname=$("#uname").val();
	 var upwd=$("#upwd").val();
	 var imageCode=$("#imageCode").val();
	 if(uname==""){
		 $("#msg").html("账户不能为空！");
		 return false;
	 }
	 if(upwd==""){
		 $("#msg").html("密码不能为空！");
		 return false;
	 }
	 if(imageCode==""){
		 $("#msg").html("验证码不能为空！");
		 return false;
	 }
	 return true;
}
</script>
	<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?080836300300be57b7f34f4b3e97d911";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F080836300300be57b7f34f4b3e97d911' type='text/javascript'%3E%3C/script%3E"));
</script>
</body>
</html>