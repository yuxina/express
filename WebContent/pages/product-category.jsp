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
<!--[if IE 6]>
<script type="text/javascript" src="http://lib.h-ui.net/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>类型管理</title>
</head>
<body>
	<nav class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		产品管理 <span class="c-gray en">&gt;</span> 类型管理 <a
			class="btn btn-success radius r"
			style="line-height: 1.6em; margin-top: 3px"
			href="javascript:location.replace(location.href);" title="刷新"><i
			class="Hui-iconfont">&#xe68f;</i></a>
	</nav>
	<div class="page-container">
		<div class="cl pd-5 bg-1 bk-gray">
			<span class="l"> <a href="javascript:;" onclick="datadel()"
				class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i>
					批量删除</a> <a class="btn btn-primary radius" href="javascript:;"
				onclick="product_category_add('添加类型','product-category-add.jsp','800','510')"><i
					class="Hui-iconfont">&#xe600;</i> 添加类型</a>
			</span> 
		</div>
		<div class="mt-20">
			<table
				class="table table-border table-bordered table-hover table-bg table-sort">
				<thead>
					<tr class="text-c">
						<th width="25"><input type="checkbox" value="" name=""></th>
						<th width="50">ID</th>
						<th width="250">类型名</th>
						<th>概述</th>
						<th width="70">操作</th>
					</tr>
				</thead>
				<tbody>
					<s:iterator value="#proTypeList" var="proType" status="index">
						<tr class="text-c">
							<td><input type="checkbox" value="" name=""></td>
							<td><s:property value="#index.index+1" /></td>
							<td>${proType.proTypeName }</td>
							<td>${proType.proTypeDesc }</td>
							<td class="f-14"><a title="编辑" href="javascript:;"
								onclick="product_category_edit('分类编辑','${pageContext.request.contextPath }/pages/proType_editUI.action?proTypeId=${proType.proTypeId }','800','510')"
								style="text-decoration: none"><i class="Hui-iconfont">&#xe6df;</i></a>
								<a title="删除" href="javascript:;"
								onclick="product_category_del(this,'${proType.proTypeId }')"
								class="ml-5" style="text-decoration: none"><i
									class="Hui-iconfont">&#xe6e2;</i></a></td>
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
	  {"orderable":false,"aTargets":[0,4]}// 制定列不参与排序
	]
});
/*产品-类型-添加*/
function product_category_add(title,url,w,h){
	layer_show(title,url,w,h);
}
/*产品-类型-编辑*/
function product_category_edit(title,url,w,h){
	layer_show(title,url,w,h);
}
/*产品-类型-删除*/
function product_category_del(obj,id){
	layer.confirm('产品类型删除须谨慎，确认要删除吗？',function(index){
		//此处请求后台程序，下方是成功后的前台处理……
		$.ajax({
            type: "post",
            url:"${pageContext.request.contextPath}/pages/proType_check.action?proTypeId="+id,
            async:false,
            dataType:"json",
            success: function(data) {
            	if(parseInt(data.count) > 0){
                    layer.msg('此分类下还有商品，您不能删除！', {
                        icon: 5,
                        time: 3000
                    });
            	}else{
            		$.ajax({
                        type: "post",
                        url:"${pageContext.request.contextPath}/pages/proType_delete.action?proTypeId="+id,
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
            	}

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