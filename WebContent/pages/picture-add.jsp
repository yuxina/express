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

<title>新增图片</title>
<link href="lib/webuploader/0.1.5/webuploader.css" rel="stylesheet"
	type="text/css" />
</head>
<body>
	<div class="page-container">
		<form class="form form-horizontal" id="form-article-add">
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-2"><span
					class="c-red">*</span>图片标题：</label>
				<div class="formControls col-xs-8 col-sm-9">
					<input type="text" class="input-text" value="" placeholder="" id=""
						name="">
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-2"><span
					class="c-red">*</span>分类栏目：</label>
				<div class="formControls col-xs-8 col-sm-9">
					<span class="select-box"> <select name="" class="select">
							<option value="0">全部栏目</option>
							<option value="1">新闻资讯</option>
							<option value="11">├行业动态</option>
							<option value="12">├行业资讯</option>
							<option value="13">├行业新闻</option>
					</select>
					</span>
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-2"><span
					class="c-red">*</span>发布日期：</label>
				<div class="formControls col-xs-8 col-sm-9">
					<input type="text"
						onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'#F{$dp.$D(\'datemax\')||\'%y-%M-%d\'}'})"
						id="datemin" class="input-text Wdate">
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-2"><span
					class="c-red">*</span>结束日期：</label>
				<div class="formControls col-xs-8 col-sm-9">
					<input type="text"
						onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'#F{$dp.$D(\'datemin\')}'})"
						id="datemax" class="input-text Wdate">
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-2">图片摘要：</label>
				<div class="formControls col-xs-8 col-sm-9">
					<textarea name="" cols="" rows="" class="textarea"
						placeholder="说点什么...最少输入10个字符" datatype="*10-100" dragonfly="true"
						nullmsg="备注不能为空！" onKeyUp="textarealength(this,200)"></textarea>
					<p class="textarea-numberbar">
						<em class="textarea-length">0</em>/200
					</p>
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-2">缩略图：</label>
				<div class="formControls col-xs-8 col-sm-9">
					<div class="uploader-thum-container">
						<div id="fileList" class="uploader-list"></div>
						<div id="filePicker">选择图片</div>
						<button id="btn-star"
							class="btn btn-default btn-uploadstar radius ml-10">开始上传</button>
					</div>
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-4 col-sm-2">图片上传：</label>
				<div class="formControls col-xs-8 col-sm-9">
					<div class="uploader-list-container">
						<div class="queueList">
							<div id="dndArea" class="placeholder">
								<div id="filePicker-2"></div>
								<p>或将照片拖到这里，单次最多可选300张</p>
							</div>
						</div>
						<div class="statusBar" style="display: none;">
							<div class="progress">
								<span class="text">0%</span> <span class="percentage"></span>
							</div>
							<div class="info"></div>
							<div class="btns">
								<div id="filePicker2"></div>
								<div class="uploadBtn">开始上传</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row cl">
				<div class="col-xs-8 col-sm-9 col-xs-offset-4 col-sm-offset-2">
					<button onClick="article_save_submit();"
						class="btn btn-primary radius" type="button">
						<i class="Hui-iconfont">&#xe632;</i> 保存并提交审核
					</button>
					<button onClick="article_save();" class="btn btn-secondary radius"
						type="button">
						<i class="Hui-iconfont">&#xe632;</i> 保存草稿
					</button>
					<button onClick="layer_close();" class="btn btn-default radius"
						type="button">&nbsp;&nbsp;取消&nbsp;&nbsp;</button>
				</div>
			</div>
		</form>
	</div>
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
	<script type="text/javascript"
		src="lib/webuploader/0.1.5/webuploader.min.js"></script>
	<script type="text/javascript">
function article_save(){
	alert("刷新父级的时候会自动关闭弹层。")
	window.parent.location.reload();
}
$(function(){
	$('.skin-minimal input').iCheck({
		checkboxClass: 'icheckbox-blue',
		radioClass: 'iradio-blue',
		increaseArea: '20%'
	});
	
	$list = $("#fileList"),
	$btn = $("#btn-star");
	var state = "pending", uploader;
    uploader = WebUploader.create({
    	pick:'#picker', 
    	resize:false, 
    	swf:'/pages/lib/webuploader/0.1.5/Uploader.swf', 
    	server:'ajaxupload.action', 
    	disableGlobalDnd:true, 
    	auto:false, 
    	fileNumLimit:10, 
    	fileSizeLimit:20*1024*1024,//验证文件总大小是否超出限制, 超出则不允许加入队列。 
    	fileSingleSizeLimit:200*1024*1024//验证单个文件大小是否超出限制, 超出则不允许加入队列
    	});
    uploader.on('fileQueued', function(file) {
        $('#thelist').append('<div id="' + file.id + '" class="fl b14b"><div class="fn">' + file.name + '<span class="state" id="st' + file.id + '"></span></div><div class="fd"><input type="button" name="fdb" id="fdb'+ file.id +'" class="bs1" value="删 除" onclick="delf(this)" /></div><div class="clr"></div></div>');
    });
    uploader.on('uploadProgress', function(file, percentage) {
        $('#st' + file.id).text('上传中');
    });
    uploader.on('uploadSuccess', function(file, data) {
        $('#st' + file.id).text('已上传');
        $("#fdb"+ file.id).remove();
        if(data.code == 1001) {
            $("#ae").text("恭喜您，文件上传成功！")
        } else {
            $("#ae").text(data.msg);
        }
    });
    uploader.on('uploadError', function(file) {
        $('#st' + file.id).text('上传出错');
    });
    uploader.on('all', function(type) {
        if(type === 'startUpload') {
            state = 'uploading';
            $('#upbtn').text('暂停上传');
        } else if(type === 'stopUpload') {
            state = 'paused';
            $('#upbtn').text('开始上传');
        } else if(type === 'uploadFinished') {
            state = 'done';
            $('#upbtn').text('开始上传');
        }
    });
    $('#upbtn').on('click', function() {
        if(state === 'uploading') {
            uploader.stop();
        } else {
            uploader.upload();
        }
    });


})( jQuery );
</script>
</body>
</html>