<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>修改用户</title>
</head>
<body>
	<div align="center" style="font-size: 30px;">修改用户</div>
	<s:debug></s:debug>
	<s:form action="user_edit.action" namespace="/pages" method="post">
		<s:hidden name="uid"></s:hidden>
	 	用户名：<s:textfield name="uname"></s:textfield>
		<br />
		密码： <s:textfield name="upwd"></s:textfield>
		<br />
		<s:submit value="修改"></s:submit>
	</s:form>
</body>
</html>
