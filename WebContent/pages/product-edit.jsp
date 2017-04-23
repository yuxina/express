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

<link href="lib/webuploader/0.1.5/webuploader.css" rel="stylesheet"
	type="text/css" />
</head>
<body>
	<div class="page-container">
		<form action="" method="post" class="form form-horizontal"
			id="form-product-add" enctype="multipart/form-data">
			<div class="row cl">
				<input type="hidden" value="${proId }" id="proId" name="proId">
				<label class="form-label col-xs-4 col-sm-2"><span
					class="c-red">*</span>产品名称：</label>
				<div class="formControls col-xs-8 col-sm-9">
					<input type="text" class="input-text" value="${proName }"
						placeholder="" id="proName" name="proName">
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-2"><span
					class="c-red">*</span>分类栏目：</label>
				<div class="formControls col-xs-8 col-sm-9">
					<span class="select-box"> <s:select cssClass="select"
							list="#request.proTypeList" listValue="proTypeName"
							listKey="proTypeId" name="proType.proTypeId"
							id="proType.proTypeId">
						</s:select>
					</span>
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-2">产品价格：</label>
				<div class="formControls col-xs-8 col-sm-9">
					<input type="text" name="proPrice" id="proPrice" placeholder=""
						value="${proPrice }" class="input-text">
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-2">产品数量：</label>
				<div class="formControls col-xs-8 col-sm-9">
					<input type="text" name="proAmount" id="proAmount" placeholder=""
						value="${proAmount }" class="input-text" style="width: 50%">
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-2">产品摘要：</label>
				<div class="formControls col-xs-8 col-sm-9">
					<textarea name="proDesc" cols="" rows="" class="textarea"
						placeholder="说点什么..." onKeyUp="textarealength(this,200)">${proDesc }</textarea>
					<p class="textarea-numberbar">
						<em class="textarea-length">0</em>/200
					</p>
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-2">产品图片：</label>
				<div class="formControls col-xs-8 col-sm-9">
					<div class="uploader-thum-container">
						<img id="ImgPr" style="width: 100px; height: 100px;"
							src="${pageContext.request.contextPath }/${proImgPath}" alt="" />
						<input type="file" id="proImg" name="proImg"> <span>上传要求：1M以内，图片格式为gif,jpeg,jpg,bmp,png</span>
					</div>
				</div>
			</div>
			<div class="row cl">
				<div class="col-xs-8 col-sm-9 col-xs-offset-4 col-sm-offset-2">
					<input class="btn btn-primary radius" type="submit"
						value="&nbsp;&nbsp;保存并提交审核&nbsp;&nbsp;">
					<button onClick="layer_close();" class="btn btn-default radius"
						type="button">&nbsp;&nbsp;取消&nbsp;&nbsp;</button>
				</div>
			</div>
		</form>
	</div>

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
	<script type="text/javascript" src="lib/uploadPreview.min.js"></script>
	<script type="text/javascript">
$(function(){
	$("#proImg").uploadPreview({ Img: "ImgPr", Width: 200, Height: 200 });
	$('.skin-minimal input').iCheck({
		checkboxClass: 'icheckbox-blue',
		radioClass: 'iradio-blue',
		increaseArea: '20%'
	});
	
	$("#form-product-add").validate({
		rules:{
			proName:{
				required:true,
				minlength:2,
				maxlength:16
			},
			proPrice:{
				required:true,
				isPrice:true
			},
			proAmount:{
				required:true,
				isAmount:true
			}
			
		},
		messages: {
			proImg: { 
				checkFileSize:"请上传大小在1M以内的图片"
			},
			proAmount: { 
				isAmount:"数量为大于等于0的整数"
			}
        },
		onkeyup:false,
		focusCleanup:true,
		success:"valid",
		submitHandler:function(form){
			var formData = new FormData($('#form-product-add')[0]);//表单id
			$.ajax({
				type : "post",
				url : "${pageContext.request.contextPath }/pages/product_edit.action",
				data : formData,
				cache: false,
				contentType: false,
				processData: false,
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
/* 	$list = $("#fileList"),
	$btn = $("#btn-star"),
	state = "pending",
	uploader;

	var uploader = WebUploader.create({
		auto: false,//禁止自动上传
		swf: 'lib/webuploader/0.1.5/Uploader.swf',
	
		// 文件接收服务端。
		server: '${pageContext.request.contextPath}/pages/ajaxupload.action',
	
		// 选择文件的按钮。可选。
		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
		pick: '#filePicker',
	
		// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
		resize: false,
		// 只允许选择图片文件。
		accept: {
			title: 'Images',
			extensions: 'gif,jpg,jpeg,bmp,png',
			mimeTypes: 'image/*'
		}
	});
	uploader.on( 'fileQueued', function( file ) {
		var $li = $(
			'<div id="' + file.id + '" class="item">' +
				'<div class="pic-box"><img></div>'+
				'<div class="info">' + file.name + '</div>' +
				'<p class="state">等待上传...</p>'+
			'</div>'
		),
		$img = $li.find('img');
		$list.append( $li );
	
		// 创建缩略图
		// 如果为非图片文件，可以不用调用此方法。
		// thumbnailWidth x thumbnailHeight 为 100 x 100
 		uploader.makeThumb( file, function( error, src ) {
			if ( error ) {
				$img.replaceWith('<span>不能预览</span>');
				return;
			}
	
			$img.attr( 'src', src );
		}, 100, 100 );
	});
	// 文件上传过程中创建进度条实时显示。
	uploader.on( 'uploadProgress', function( file, percentage ) {
		var $li = $( '#'+file.id ),
			$percent = $li.find('.progress-box .sr-only');
	
		// 避免重复创建
		if ( !$percent.length ) {
			$percent = $('<div class="progress-box"><span class="progress-bar radius"><span class="sr-only" style="width:0%"></span></span></div>').appendTo( $li ).find('.sr-only');
		}
		$li.find(".state").text("上传中");
		$percent.css( 'width', percentage * 100 + '%' );
	});
	
	// 文件上传成功，给item添加成功class, 用样式标记上传成功。
	uploader.on( 'uploadSuccess', function( file ) {
		$( '#'+file.id ).addClass('upload-state-success').find(".state").text("已上传");
	});
	
	// 文件上传失败，显示上传出错。
	uploader.on( 'uploadError', function( file ) {
		$( '#'+file.id ).addClass('upload-state-error').find(".state").text("上传出错");
	});
	
	// 完成上传完了，成功或者失败，先删除进度条。
	uploader.on( 'uploadComplete', function( file ) {
		$( '#'+file.id ).find('.progress-box').fadeOut();
	});
	uploader.on('all', function (type) {
        if (type === 'startUpload') {
            state = 'uploading';
            $btn.text('暂停上传');
        } else if (type === 'stopUpload') {
            state = 'paused';
            $btn.text('开始上传');
        } else if (type === 'uploadFinished') {
            state = 'done';
            $btn.text('开始上传');
        }
    });

    $btn.on('click', function () {
        if (state === 'uploading') {
            uploader.stop();
        } else {
            uploader.upload();
        }
    });
 */
});


</script>
</body>
</html>