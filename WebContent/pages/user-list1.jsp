<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>用户列表</title>
</head>
<script type="text/javascript" src="../js/jquery-1.8.0.min.js"></script>

<body>
	<div align="center" style="font-size: 30px;">用户列表</div>
	<div style="float: left;">
		<a href="${pageContext.request.contextPath }/pages/user-add.jsp">添加用户</a>
	</div>
	<div align="right">
		用户名:<input type="text" name="uname">
		<button onclick="queryUser();">搜索</button>
	</div>
	<div style="margin-top: 10px">
		<table border="1px" cellpadding="0px" cellspacing="0px"
			bordercolor="blue" width="100%">
			<tr>
				<th>用户名</th>
			</tr>
			<s:iterator value="#userList" var="user">
				<tr>
					<td>${user.uname }</td>
					<td><a
						href="${pageContext.request.contextPath }/pages/user_editUI.action?uid=${user.uid}">修改</a>
						<a onclick="deleteUser(this,'${user.uid}')"
						href="javascript:void(0);">删除</a></td>
				</tr>
			</s:iterator>
		</table>
	</div>
	<script type="text/javascript">
    function deleteUser(obj,id){
    	confirm("确定要删除！");
    	$.ajax({
    		type:"post",
    		url:"${pageContext.request.contextPath }/pages/user_delete.action?uid="+id,
    		async:false,
    		error:function(obj,msg){
    			
    		},
    		success:function(data){
    			if(data == "success"){
    				$(obj).parents("tr").remove();
    			}
    		}
    	});    	
    }
    function queryUser(obj,id){
    	$.ajax({
    		type:"post",
    		url:"${pageContext.request.contextPath }/pages/user_delete.action?uid="+id,
    		async:false,
    		error:function(obj,msg){
    			
    		},
    		success:function(data){
    			if(data == "success"){
    				$(obj).parents("tr").remove();
    			}
    		}
    	});    	
    }
    </script>
</body>
</html>
