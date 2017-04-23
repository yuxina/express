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
<title>订单详情页</title>
</head>
<body>
	<div class="page-container">
		<form action="" method="post" class="form form-horizontal"
			id="form-product-category-add">
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-2">顾客信息</label>
				<div class="formControls col-xs-3 col-sm-4w" style="width:220px !important">
					<p>联系姓名：${contacts}</p>
					<p>联系电话：${phone}</p>
					<p>联系地址：${address }</p>
				</div>
				<label class="form-label col-xs-2 col-sm-2">订单信息</label>
				<div class="formControls col-xs-3 col-sm-4">
					<p>快递公司：${expressFirm }</p>
					<p>取件凭证：${proof }</p>
					<p>配件日期：${deliveryDate }</p>
					<p>配件时间：${deliveryTime }</p>
					<p>订单备注：${carDesc }</p>
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-2">选购清单</label>
				<div class="formControls col-xs-5 col-sm-6">
					<table class="table table-border">
						<s:iterator value="#request.ciList" var="ci">
							<tr>
								<td style="font-size:14px!important;">${ci.proName}</td>
								<td class="text-r" style="font-size:14px!important;">x ${ci.quantity }</td>
								<td class="text-r" style="font-size:14px!important;">￥${ci.proPrice}</td>
							</tr>
						</s:iterator>
					</table>
				</div>
			</div>
			<div class="row cl">
				<div class="col-9 col-offset-2" style="text-align:right;">
					<button onClick="layer_close();" class="btn btn-primary radius">&nbsp;&nbsp;关闭&nbsp;&nbsp;</button>
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
				url : "${pageContext.request.contextPath }/pages/proType_add.action",
				data : $(form)
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
</body>
</html>