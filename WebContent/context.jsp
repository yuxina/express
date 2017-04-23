<%@ page contentType="text/html;charset=UTF-8" language="java"%>
//request.getSchema()可以返回当前页面使用的协议，http 或是 https;
//request.getServerPort()可以返回当前页面所在的服务器使用的端口,就是80;
//request.getContextPath()可以返回当前页面所在的应用的名字; 
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
