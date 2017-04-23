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
<title>订单列表</title>
</head>
<body>
	<nav class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		订单管理 <span class="c-gray en">&gt;</span> 订单列表 <a
			class="btn btn-success radius r"
			style="line-height: 1.6em; margin-top: 3px"
			href="javascript:location.replace(location.href);" title="刷新"><i
			class="Hui-iconfont">&#xe68f;</i></a>
	</nav>
	<div class="page-container">
		<div class="text-c">
			<span class="select-box inline"> <select name=""
				class="select">
					<option value="0">全部订单</option>
					<option value="1">待支付</option>
					<option value="2">配送中</option>
					<option value="2">待评价</option>
			</select>
			</span> 日期范围： <input type="text"
				onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'logmax\')||\'%y-%M-%d\'}'})"
				id="logmin" class="input-text Wdate" style="width: 120px;">
			- <input type="text"
				onfocus="WdatePicker({minDate:'#F{$dp.$D(\'logmin\')}',maxDate:'%y-%M-%d'})"
				id="logmax" class="input-text Wdate" style="width: 120px;">
			<input type="text" name="" id="" placeholder=" 订单用户名"
				style="width: 250px" class="input-text">
			<button name="" id="" class="btn btn-success" type="submit">
				<i class="Hui-iconfont">&#xe665;</i> 搜订单
			</button>
		</div>
		<div class="cl pd-5 bg-1 bk-gray mt-20">
			<span class="l"><a href="javascript:;" onclick="datadel()"
				class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i>
					批量删除</a> </span><span style="display:inline-block;margin-left:10px;"><a href="javascript:;" onclick="datadel()"
				class="btn btn-primary radius"><i class="Hui-iconfont">&#xe644;</i>
					导出</a></span> 
		</div>
		<div class="mt-20">
			<table
				class="table table-border table-bordered table-bg table-hover table-sort">
				<thead>
					<tr class="text-c">
						<th width="25"><input type="checkbox" name="" value=""></th>
						<th width="120">订单编号</th>
						<th width="140">用户名</th>						
						<th width="140">提交时间</th>
						<th width="75">总价</th>
						<th width="60">快递公司</th>
						<th width="60">配送日期</th>
						<th width="60">配送时间</th>
						<th width="70">订单状态</th>
						<th>订单详情</th>
						<th width="80">操作</th>
					</tr>
				</thead>
				<tbody>
					<s:iterator value="#carList" var="car">
						<tr class="text-c">
							<td><input type="checkbox" value="" name=""></td>
							<td>${car.carId }</td>
							<td>${car.user.uname }</td>
							<td>${car.submitTime }</td>
							<td>${car.total }</td>
							<td>${car.expressFirm }</td>
							<td>${car.deliveryDate }</td>
							<td>${car.deliveryTime }</td>
							<td class="td-status">${car.carState.carStateInfo }</td>
							<td><u style="cursor: pointer"
								class="text-primary"
								onClick="order_show('查看','${pageContext.request.contextPath }/pages/car_showDetail.action?carId=${car.carId }','800','510')" title="查看">查看订单项</u></td>
							
							<td class="td-manage"><s:if test="#car.carState.carSid == 2">
									<a style="text-decoration: none" class="c-primary"
										onClick="order_commit(this,'${car.carId }')"
										href="javascript:;">确认接单</a>
								</s:if> <s:elseif test="#car.carState.carSid == 3">
									<a style="text-decoration: none" class="c-primary" 
										onClick="order_go(this,'${car.carId }')"
										href="javascript:;">确认配送</a>
								</s:elseif> <s:elseif test="#car.carState.carSid == 4">
									<a style="text-decoration: none" class="c-primary"
										onClick="order_reach(this,'${car.carId }')"
										href="javascript:;">确认送达</a>
								</s:elseif> <s:else>
									<span>交易完成</span>
								</s:else> 
								<a style="text-decoration: none" class="ml-5"
								onClick="order_del(this,'${car.carId }')" href="javascript:;"
								title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a></td>
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
	"aaSorting": [[ 1, "desc" ]],//默认第几个排序
	"bStateSave": true,//状态保存
	"aoColumnDefs": [
	  //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
	  {"orderable":false,"aTargets":[0,7]}// 不参与排序的列
	]
});

/*显示-订单项*/
function order_show(title,url,w,h){
	layer_show(title,url,w,h);
}
/*订单-删除*/
function order_del(obj,id){
	layer.confirm('确认要删除吗？',function(index){
		$.ajax({
            type: "post",
            url:"${pageContext.request.contextPath }/pages/car_delete.action?carId="+id,
            async:false,
            dataType:"json",
            success: function(data) {
            	if(data.success){
                    $(obj).parents("tr").remove();
    				layer.msg('已删除!', {
    					icon : 1,
    					time : 10000
    				});
            	}else{
      				layer.msg('交易未完成，不能删除订单!', {
    					icon : 5,
    					time : 1000
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

/*确认接单*/
function order_commit(obj,id){
	layer.confirm('确认要接单吗？',function(index){
		$.ajax({
			type : "post",
			url : "${pageContext.request.contextPath }/pages/car_changeState.action?state=3&carId="+id					,
			cache : false,
			dataType : "text",
			success : function() {
				$(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" class="c-primary" onClick="order_go(this,\''+id+'\')" href="javascript:;">确认配送</a>');
				$(obj).parents("tr").find(".td-status").html('已接单');
				$(obj).remove();
				layer.msg('已确认接单',{icon: 6,time:1000});
			},
			error : function() {
				layer.msg('确认接单失败', {
					icon : 5,
					time : 3000
				});
			}
		});	
	});
}

/*确认配送*/
function order_go(obj,id){
	layer.confirm('确认让骑手取件配送吗？',function(index){
		$.ajax({
			type : "post",
			url : "${pageContext.request.contextPath }/pages/car_changeState.action?state=4&carId="+id					,
			cache : false,
			dataType : "text",
			success : function() {
				$(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" class="c-primary" onClick="order_reach(this,\''+id+'\')" href="javascript:;">确认送达</a>');
				$(obj).parents("tr").find(".td-status").html('配送中');
				$(obj).remove();
				layer.msg('已确认配送!',{icon: 6,time:1000});
			},
			error : function() {
				layer.msg('确认取件配送失败', {
					icon : 5,
					time : 3000
				});
			}
		});	
	});
}
/*确认送达*/
function order_reach(obj,id){
	layer.confirm('确认已送达吗？',function(index){
		$.ajax({
			type : "post",
			url : "${pageContext.request.contextPath }/pages/car_changeState.action?state=5&carId="+id					,
			cache : false,
			dataType : "text",
			success : function() {
				$(obj).parents("tr").find(".td-manage").prepend('<span>交易完成</span>');
				$(obj).parents("tr").find(".td-status").html('已送达');
				$(obj).remove();
				layer.msg('已确认送达!',{icon: 6,time:1000});
			},
			error : function() {
				layer.msg('确认已送达失败', {
					icon : 5,
					time : 3000
				});
			}
		});	
	});

}

</script>
</body>
</html>