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
	href="static/h-ui.admin/css/style.css" />
<!--[if IE 6]>
<script type="text/javascript" src="http://lib.h-ui.net/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>编辑产品分类</title>
</head>
<body>
	<div class="page-container">
		<form action="" method="post" class="form form-horizontal"
			id="form-product-category-add">
			<div class="row cl">
				<input type="hidden" id="proTypeId" name="proTypeId"
					value="${proTypeId }"> <label
					class="form-label col-xs-4 col-sm-2"><span class="c-red">*</span>分类名称：</label>
				<div class="formControls col-xs-8 col-sm-9">
					<input type="text" class="input-text" value="${proTypeName}"
						placeholder="" id="proTypeName" name="proTypeName">
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-2">备注：</label>
				<div class="formControls col-xs-8 col-sm-9">
					<textarea cols="" rows="" class="textarea" placeholder="说点什么..."
						onKeyUp="textarealength(this,100)" id="proTypeDesc"
						name="proTypeDesc">${proTypeDesc}</textarea>
					<p class="textarea-numberbar">
						<em class="textarea-length">0</em>/100
					</p>
				</div>
			</div>
			<div class="row cl">
				<div class="col-9 col-offset-2">
					<input class="btn btn-primary radius" type="submit"
						value="&nbsp;&nbsp;提交&nbsp;&nbsp;">
				</div>
			</div>
		</form>
	</div>
	</div>
	<script type="text/javascript" src="lib/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="lib/icheck/jquery.icheck.min.js"></script>
	<script type="text/javascript"
		src="lib/jquery.validation/1.14.0/jquery.validate.min.js"></script>
	<script type="text/javascript"
		src="lib/jquery.validation/1.14.0/validate-methods.js"></script>
	<script type="text/javascript"
		src="lib/jquery.validation/1.14.0/messages_zh.min.js"></script>
	<script type="text/javascript" src="lib/layer/2.1/layer.js"></script>
	<script type="text/javascript" src="static/h-ui/js/H-ui.js"></script>
	<script type="text/javascript" src="static/h-ui.admin/js/H-ui.admin.js"></script>
	<script type="text/javascript">
$(function(){
	$('.skin-minimal input').iCheck({
		checkboxClass: 'icheckbox-blue',
		radioClass: 'iradio-blue',
		increaseArea: '20%'
	});
	
	$("#form-product-category-add").validate({
		rules:{
			proTypeName:{
				required:true,
				maxlength:16
			},
			proTypeDesc:{
				required:true,
				maxlength:100
			}
		},
		messages:{
			proTypeName:{
				required:"类型名称不能为空",
				maxlength:"最多可以输入 16 个字符"
			}
		},
		onkeyup:false,
		focusCleanup:true,
		success:"valid",
		submitHandler:function(form){
			$.ajax({
				type : "post",
				url : "${pageContext.request.contextPath }/pages/proType_edit.action",
				data : $(form)
						.serialize(),
				cache : false,
				success : function(data) {
					if(data=="success"){
						var index = parent.layer.getFrameIndex(window.name);
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
</body>
</html>