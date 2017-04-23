<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html lang="en" ng-app="expressApp">
<head>
	<meta charset="UTF-8">
	<!--禁止浏览器缩放-->
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta content="application/xhtml+xml;charset=UTF-8" http-equiv="Content-Type" />
	<!--清除浏览器缓存-->
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate">
	<meta http-equiv="expires" content="Wed, 26 Feb 1997 08:21:57 GMT">
	<!--iPhone 手机上设置手机号码不被显示为拨号链接）-->
	<meta content="telephone=no, address=no" name="format-detection" />
	<!--IOS私有属性，可以添加到主屏幕-->
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<!-- QQ浏览器私有 -->
	<!-- 全屏模式 -->
	<meta name="x5-fullscreen" content="true">
	<!-- 应用模式 -->
	<meta name="x5-page-mode" content="app">
	<!-- UC浏览器私有 -->
	<!-- 全屏模式 -->
	<meta name="full-screen" content="yes">
	<!-- 应用模式 -->
	<meta name="browsermode" content="application">
	<link rel="stylesheet" type="text/css" href="/express/resources/css/base1.css" />
	<link rel="stylesheet" type="text/css" href="/express/resources/css/index.css" />
	<script type="text/javascript" src="/express/resources/scripts/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="/express/resources/scripts/iscroll.js"></script>
	<script type="text/javascript" src="/express/resources/scripts/iscrollUtil.js"></script>
	<script type="text/javascript">
		var dWidth = document.documentElement.clientWidth;
		if(dWidth > 640) dWidth = 640;
		var a = document.documentElement.style.fontSize = dWidth / 640 * 100 + 'px';		
	</script>
	<script src="/express/lib/angular/angular-1.4.6.js"></script>
	<script src="/express/lib/angular/angular-ui-router.js"></script>
	<script src="/express/lib/angular/angular-sanitize.js"></script>
	<script src="/express/lib/angular/angular-cookies.js"></script>
	<script type="text/javascript">
		var contextPath = '<%=request.getContextPath()%>';
		var scheme = '<%=request.getScheme()%>'; 
		var host = '<%=request.getServerName()%>';
		var port = '<%=request.getServerPort()%>'; 
		var rootUrl = scheme + '://' + host + ':' + port + contextPath; 
		angular.module('$context', [])
		    .constant('$context', {
		        'path': contextPath,
		        'scheme': scheme,
		        'host': host,
		        'port': port,
		        'rootUrl': rootUrl,
		});
	</script>
	<script src="/express/resources/scripts/app.js" charset="utf-8"></script>
	<script src="/express/resources/scripts/common/commonHead.js" charset="utf-8"></script>
	<script src="/express/resources/scripts/common/commonFoot.js" charset="utf-8"></script>
	<script src="/express/resources/scripts/home.js" charset="utf-8"></script>		
	<script src="/express/resources/scripts/good.js" charset="utf-8"></script>	
	<script src="/express/resources/scripts/myAccount.js" charset="utf-8"></script>
	<script src="/express/resources/scripts/login.js" charset="utf-8"></script>
	<script src="/express/resources/scripts/setting.js" charset="utf-8"></script>
	<script src="/express/resources/scripts/about.js" charset="utf-8"></script>
	<script src="/express/resources/scripts/info.js" charset="utf-8"></script>
	<script src="/express/resources/scripts/register.js" charset="utf-8"></script>
	<script src="/express/resources/scripts/car.js" charset="utf-8"></script>
	<script src="/express/resources/scripts/order.js" charset="utf-8"></script>
	<script src="/express/resources/scripts/evaluate.js" charset="utf-8"></script>
	
	
</head>
<body>
	<div ui-view="commonHead"></div>
	<div ui-view="content"></div>
	<div ui-view="commonFoot"></div>
</body>
</html>