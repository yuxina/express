<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!--_meta 作为公共模版分离出去-->
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport"
	content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<LINK rel="Bookmark" href="/favicon.ico">
<LINK rel="Shortcut Icon" href="/favicon.ico" />
<!--[if lt IE 9]>
<script type="text/javascript" src="lib/html5.js"></script>
<script type="text/javascript" src="lib/respond.min.js"></script>
<script type="text/javascript" src="lib/PIE_IE678.js"></script>
<![endif]-->
<link rel="stylesheet" type="text/css"
	href="static/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css"
	href="static/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css"
	href="lib/Hui-iconfont/1.0.7/iconfont.css" />
<link rel="stylesheet" type="text/css" href="lib/icheck/icheck.css" />
<link rel="stylesheet" type="text/css"
	href="static/h-ui.admin/skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css"
	href="static/h-ui.admin/css/style.css" />
<!--[if IE 6]>
<script type="text/javascript" src="http://lib.h-ui.net/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<!--/meta 作为公共模版分离出去-->

<title>添加管理员 - H-ui.admin v2.3</title>
<meta name="keywords"
	content="H-ui.admin v2.3,H-ui网站后台模版,后台模版下载,后台管理系统模版,HTML后台模版下载">
<meta name="description"
	content="H-ui.admin v2.3，是一款由国人开发的轻量级扁平化网站后台模板，完全免费开源的网站后台管理系统模版，适合中小型CMS后台系统。">
</head>
<body>
	<article class="page-container">
		<form action="" method="post" class="form form-horizontal"
			id="form-user-add">
			<div class="row cl">
			<input type="hidden" class="input-text" value="1" placeholder="" name="ut.utId">
				<label class="form-label col-xs-4 col-sm-3"><span
					class="c-red">*</span>用户名：</label>
				<div class="formControls col-xs-8 col-sm-8">
					<input type="text" class="input-text" value="" placeholder=""
						id="uname" name="uname" onblur="checkNickName(this.value)">
				</div>
				<font id="userErrorInfo" color="red" style="margin-left: 27%;position:relative;top:7px;display:none;">用户名已存在，请重新输入！</font>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-3"><span
					class="c-red">*</span>初始密码：</label>
				<div class="formControls col-xs-8 col-sm-8">
					<input type="password" class="input-text" autocomplete="off"
						value="" placeholder="密码" id="upwd" name="upwd">
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-3"><span
					class="c-red">*</span>确认密码：</label>
				<div class="formControls col-xs-8 col-sm-8">
					<input type="password" class="input-text" autocomplete="off"
						placeholder="确认新密码" id="upwd2" name="upwd2">
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-3"><span
					class="c-red">*</span>性别：</label>
				<div class="formControls col-xs-8 col-sm-8 skin-minimal">
					<div class="radio-box">
						<input name="usex" type="radio" id="sex-1" value="0" checked>
						<label for="sex-1">男</label>
					</div>
					<div class="radio-box">
						<input type="radio" id="sex-2" name="usex" value="1"> <label
							for="sex-2">女</label>
					</div>
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-3"><span
					class="c-red">*</span>手机：</label>
				<div class="formControls col-xs-8 col-sm-8">
					<input type="text" class="input-text" value="" placeholder=""
						id="uphone" name="uphone">
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-3"><span
					class="c-red">*</span>邮箱：</label>
				<div class="formControls col-xs-8 col-sm-8">
					<input type="text" class="input-text" placeholder="@" name="uemail"
						id="uemail">
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-3">联系地址：</label>
				<div class="formControls col-xs-8 col-sm-8">
					<input type="text" class="input-text" placeholder=""
						name="uaddress" id="uaddress">
				</div>
			</div>
			<div class="row cl">
				<div class="col-xs-8 col-sm-8 col-xs-offset-4 col-sm-offset-3">
					<input class="btn btn-primary radius" type="submit"
						value="&nbsp;&nbsp;提交&nbsp;&nbsp;">
				</div>
			</div>
		</form>
	</article>

<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="lib/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="lib/layer/2.1/layer.js"></script>
<script type="text/javascript" src="lib/icheck/jquery.icheck.min.js"></script>
<script type="text/javascript"
	src="lib/jquery.validation/1.14.0/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="lib/jquery.validation/1.14.0/validate-methods.js"></script>
<script type="text/javascript"
	src="lib/jquery.validation/1.14.0/messages_zh.min.js"></script>
<script type="text/javascript" src="static/h-ui/js/H-ui.js"></script>
<script type="text/javascript" src="static/h-ui.admin/js/H-ui.admin.js"></script>
<!--/_footer /作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript">
function checkNickName(name){
	$.post("${pageContext.request.contextPath }/pages/user_existUserWithUserName.action",{uname:name},
			function(result){
				if(result["exist"]){
					$("#userErrorInfo").show();
					$("#uname").focus();
				}else{
					$("#userErrorInfo").hide();
				}
			}
	);
}
$(function(){
	$('.skin-minimal input').iCheck({
		checkboxClass: 'icheckbox-blue',
		radioClass: 'iradio-blue',
		increaseArea: '20%'
	});
	
	$("#form-user-add").validate({
		rules:{
			uname:{
				required:true,
				checkUname:true
			},
			upwd : {
				required : true,
				isPwd : true
			},
			upwd2 : {
				required : true,
				equalTo : "#upwd"
			},
			usex:{
				required:true,
			},
			uphone:{
				required:true,
				isMobile:true,
			},
			uemail:{
				required:true,
				email:true,
			}
			
		},
		onkeyup:false,
		focusCleanup:true,
		success:"valid",
		submitHandler:function(form){
			$.ajax({
				type : "post",
				url : "${pageContext.request.contextPath }/pages/user_add.action",
				data : $("#form-user-add")
						.serialize(),
				cache : false,
				success : function(data) {
					if(data=="success"){
						var index = parent.layer.getFrameIndex(window.name);
						parent.$('.btn-refresh').click();
						parent.location.reload(); 
						parent.layer.close(index);
					}					
				},
				error:function(XMLResponse){alert(XMLResponse.responseText)}
			});
		}
	});
});
</script>
	<!--/请在上方写此页面业务相关的脚本-->
</body>
</html>