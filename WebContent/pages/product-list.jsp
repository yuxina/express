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
	href="static/h-ui.admin/skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css"
	href="static/h-ui.admin/css/style.css" />
<link rel="stylesheet" href="lib/zTree/v3/css/zTreeStyle/zTreeStyle.css"
	type="text/css">
<!--[if IE 6]>
<script type="text/javascript" src="http://lib.h-ui.net/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>产品列表</title>
</head>
<body>
	<nav class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		产品管理 <span class="c-gray en">&gt;</span> 产品列表 <a
			class="btn btn-success radius r"
			style="line-height: 1.6em; margin-top: 3px"
			href="javascript:location.replace(location.href);" title="刷新"><i
			class="Hui-iconfont">&#xe68f;</i></a>
	</nav>
	<div class="page-container">
		<div class="text-c">
			<input type="text" name="" id="" placeholder=" 产品名称"
				style="width: 250px" class="input-text">
			<button name="" id="" class="btn btn-success" type="submit">
				<i class="Hui-iconfont">&#xe665;</i> 搜产品
			</button>
		</div>
		<div class="cl pd-5 bg-1 bk-gray mt-20">
			<span class="l"><a href="javascript:;" onclick="datadel()"
				class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i>
					批量删除</a> <a class="btn btn-primary radius"
				onclick="product_add('添加产品','${pageContext.request.contextPath}/pages/product_addUI.action')"
				href="javascript:;"><i class="Hui-iconfont">&#xe600;</i> 添加产品</a></span> 
			</span>
		</div>
		<div class="mt-20">
			<table
				class="table table-border table-bordered table-bg table-hover table-sort">
				<thead>
					<tr class="text-c">
						<th width="40"><input name="" type="checkbox" value=""></th>
						<th width="50">ID</th>
						<th width="60">产品图片</th>
						<th width="100">产品名称</th>
						<th>描述</th>
						<th width="100">单价</th>
						<th width="100">库存量</th>
						<th width="100">所属类别</th>
						<th width="60">发布状态</th>
						<th width="100">操作</th>
					</tr>
				</thead>
				<tbody>
					<s:iterator value="#productList" var="product" status="index">
						<tr class="text-c va-m">
							<td><input name="" type="checkbox" value=""></td>
							<td><s:property value="#index.index+1" /></td>
							<td><a
								onClick="product_show('${product.proName }','product-show.html','10001')"
								href="javascript:;"><img width="60" height="60"
									class="product-thumb"
									src="${pageContext.request.contextPath }/${product.proImgPath}"></a></td>
							<td class="text-l"><a style="text-decoration: none"
								onClick="product_show('哥本哈根橡木地板','product-show.html','10001')"
								href="javascript:;">${product.proName }</a></td>
							<td class="text-l">${product.proDesc }</td>
							<td><span class="price">${product.proPrice }</span> 元/次</td>
							<td>${product.proAmount }</td>
							<td>${product.proType.proTypeName}</td>
							<td class="td-status"><s:if test="#product.proState == -1">
									<span class="label label-danger radius">未通过</span>
								</s:if> <s:if test="#product.proState == 0">
									<span class="label label-success radius">待审核</span>
								</s:if> <s:if test="#product.proState == 1">
									<span class="label label-success radius">已审核</span>
								</s:if> <s:if test="#product.proState == 2">
									<span class="label label-success radius">已发布</span>
								</s:if> <s:if test="#product.proState == 3">
									<span class="label label-defaunt radius">已下架</span>
								</s:if></td>
							<td class="td-manage"><s:if test="#product.proState == -1">
									<a style="text-decoration: none" class="c-primary"
										onClick="product_shenhe(this,'${product.proId }')"
										href="javascript:;" title="审核">再审核</a>
								</s:if> <s:if test="#product.proState == 0">
									<a style="text-decoration: none"
										onClick="product_shenhe(this,'${product.proId }')"
										href="javascript:;" title="审核">审核</a>
								</s:if> <s:if test="#product.proState == 1">
									<a style="text-decoration: none"
										onClick="product_start(this,'${product.proId }')"
										href="javascript:;" title="发布">发布</a>
								</s:if> <s:if test="#product.proState == 2">
									<a style="text-decoration: none"
										onClick="product_stop(this,'${product.proId }')"
										href="javascript:;" title="已发布"><i class="Hui-iconfont">&#xe6de;</i></a>
								</s:if> <s:if test="#product.proState == 3">
									<a style="text-decoration: none"
										onClick="product_start(this,'${product.proId }')"
										href="javascript:;" title="下架"><i class="Hui-iconfont">&#xe603;</i></a>
								</s:if> <a style="text-decoration: none" class="ml-5"
								onClick="product_edit('产品编辑','${pageContext.request.contextPath }/pages/product_editUI.action?proId=${product.proId }')"
								href="javascript:;" title="编辑"><i class="Hui-iconfont">&#xe6df;</i></a>
								<a style="text-decoration: none" class="ml-5"
								onClick="product_del(this,'${product.proId }')"
								href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>
							</td>
						</tr>
					</s:iterator>
				</tbody>
			</table>
		</div>
	</div>
	<script type="text/javascript" src="lib/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="lib/layer/2.1/layer.js"></script>
	<script type="text/javascript" src="lib/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript"
		src="lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="static/h-ui/js/H-ui.js"></script>
	<script type="text/javascript" src="static/h-ui.admin/js/H-ui.admin.js"></script>
	<script type="text/javascript">
$('.table-sort').dataTable({
	"aaSorting": [[ 1, "asc" ]],//默认第几个排序
	"bStateSave": true,//状态保存
	"aoColumnDefs": [
	  {"orderable":false,"aTargets":[0,8]}// 制定列不参与排序
	]
});
/*图片-添加*/
function product_add(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
/*图片-查看*/
function product_show(title,url,id){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
/*图片-审核*/
function product_shenhe(obj,id){
	layer.confirm('审核产品？', {
		btn: ['通过','不通过'], 
		shade: false
	},
	function(){
		$.ajax({
			type : "post",
			url : "${pageContext.request.contextPath }/pages/product_changeState.action?state=1&proId="+id					,
			cache : false,
			dataType : "text",
			success : function() {
				$(obj).parents("tr").find(".td-manage").prepend('<a class="c-primary" onClick="product_start(this,\''+id+'\')" href="javascript:;" title="发布">发布</a>');
				$(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已审核</span>');
				$(obj).remove();
				layer.msg('审核成功', {icon:6,time:1000});
			},
			error : function() {
				layer.msg('审核失败', {
					icon : 5,
					time : 3000
				});
			}
		});	
		
	},
	function(){
		$.ajax({
			type : "post",
			url : "${pageContext.request.contextPath }/pages/product_changeState.action?state=-1&proId="+id,
			cache : false,
			dataType : "text",
			success : function() {
				$(obj).parents("tr").find(".td-manage").prepend('<a class="c-primary" onClick="product_shenhe(this,\''+id+'\')" href="javascript:;" title="审核">再审核</a>');
				$(obj).parents("tr").find(".td-status").html('<span class="label label-danger radius">未通过</span>');
				$(obj).remove();
				layer.msg('未通过', {icon:5,time:1000});
			},
			error : function() {
				layer.msg('审核失败', {
					icon : 5,
					time : 3000
				});
			}
		});
	});	
}
/*图片-下架*/
function product_stop(obj,id){
	layer.confirm('确认要下架吗？',function(index){
		$.ajax({
			type : "post",
			url : "${pageContext.request.contextPath }/pages/product_changeState.action?state=3&proId="+id					,
			cache : false,
			dataType : "text",
			success : function() {
				$(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="product_start(this,\''+id+'\')" href="javascript:;" title="发布"><i class="Hui-iconfont">&#xe603;</i></a>');
				$(obj).parents("tr").find(".td-status").html('<span class="label label-defaunt radius">已下架</span>');
				$(obj).remove();
				layer.msg('已下架!',{icon: 5,time:1000});
			},
			error : function() {
				layer.msg('下架失败', {
					icon : 5,
					time : 3000
				});
			}
		});	

		
	});
}

/*图片-发布*/
function product_start(obj,id){
	layer.confirm('确认要发布吗？',function(index){
		$.ajax({
			type : "post",
			url : "${pageContext.request.contextPath }/pages/product_changeState.action?state=2&proId="+id					,
			cache : false,
			dataType : "text",
			success : function() {
				$(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="product_stop(this,\''+id+'\')" href="javascript:;" title="下架"><i class="Hui-iconfont">&#xe6de;</i></a>');
				$(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已发布</span>');
				$(obj).remove();
				layer.msg('已发布!',{icon: 6,time:1000});
			},
			error : function() {
				layer.msg('发布失败', {
					icon : 5,
					time : 3000
				});
			}
		});	
	});
}

/*产品-编辑*/
function product_edit(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
/*产品-删除*/
function product_del(obj,id){
	layer.confirm('确认要删除吗？',function(index){
		$.ajax({
            type: "post",
            url:"${pageContext.request.contextPath }/pages/product_delete.action?proId="+id,
            async:false,
            success: function() {
                $(obj).parents("tr").remove();
				layer.msg('已删除!', {
					icon : 1,
					time : 1000
				});
            },
            error: function() {           
                layer.msg('删除失败', {
                    icon: 5,
                    time: 3000
                });
            }
        });
	});
}
</script>
</body>
</html>