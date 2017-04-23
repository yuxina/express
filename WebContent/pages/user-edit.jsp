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

<title>添加用户</title>
<meta name="keywords"
	content="H-ui.admin v2.3,H-ui网站后台模版,后台模版下载,后台管理系统模版,HTML后台模版下载">
<meta name="description"
	content="H-ui.admin v2.3，是一款由国人开发的轻量级扁平化网站后台模板，完全免费开源的网站后台管理系统模版，适合中小型CMS后台系统。">
</head>
<body>
	<article class="page-container">
		<form method="post" class="form form-horizontal" id="form-user-edit">
			<div class="row cl">
				<input type="hidden" id="uid" name="uid" value="${uid }"> <label
					class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>用户名：</label>
				<div class="formControls col-xs-8 col-sm-9">
					<input type="text" class="input-text" value="${uname }"
						placeholder="" id="uname" name="uname">
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-3"><span
					class="c-red">*</span>性别：</label>
				<div class="formControls col-xs-8 col-sm-9 skin-minimal">
					<div class="radio-box">
						<input name="usex" type="radio" id="sex-1" value="0"
							<s:if test="usex == 0">checked</s:if>> <label for="sex-1">男</label>
					</div>
					<div class="radio-box">
						<input type="radio" id="sex-2" name="usex" value="1"
							<s:if test="usex == 1">checked</s:if>> <label for="sex-2">女</label>
					</div>
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-3"><span
					class="c-red">*</span>手机：</label>
				<div class="formControls col-xs-8 col-sm-9">
					<input type="text" class="input-text" value="${uphone }"
						placeholder="" id="" name="uphone">
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-3"><span
					class="c-red">*</span>邮箱：</label>
				<div class="formControls col-xs-8 col-sm-9">
					<input type="text" class="input-text" value="${uemail }"
						name="uemail" id="uemail">
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-3">联系地址：</label>
				<div class="formControls col-xs-8 col-sm-9">
					<input type="text" class="input-text" value="${uaddress }"
						placeholder="" id="uaddress" name="uaddress">
				</div>
			</div>
			<div class="row cl">
				<div class="col-xs-8 col-sm-9 col-xs-offset-4 col-sm-offset-3">
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
$(function(){
	$('.skin-minimal input').iCheck({
		checkboxClass: 'icheckbox-blue',
		radioClass: 'iradio-blue',
		increaseArea: '20%'
	});
	
	$("#form-user-edit").validate({
		rules:{
			uname:{
				required:true,
				minlength:2,
				maxlength:16
			},
			usex:{
				required:true,
			},
			uphone:{
				required:true,
				isMobile:true,
			},
			uaddress:{
				required:true,
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
				url : "${pageContext.request.contextPath }/pages/user_edit.action",
				data : $("#form-user-edit")
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
				error:function(){
					layer.msg('编辑失败', {
						icon : 5,
						time : 3000
					});
				}
			});
		}
	});
});
</script>
	<!--/请在上方写此页面业务相关的脚本-->
</body>
</html>
