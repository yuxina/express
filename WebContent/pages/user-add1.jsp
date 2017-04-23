<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>修改用户</title>
</head>

<body>
	<div align="center" style="font-size: 30px;">添加用户</div>
	<form
		action="${pageContext.request.contextPath }/pages/user_add.action"
		method="post">
		用户名:<input type="text" name="uname"><br /> 密码：<input
			type="text" name="upwd"><br /> <input type="submit"
			value="添加">
	</form>

</body>
</html>
