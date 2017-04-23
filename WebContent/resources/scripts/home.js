var mHome = angular.module('mHome',[]);
mHome.controller('home',['$rootScope','$scope','$http','$CommonTitleSrv','$CommonFootSrv','$context',function($rootScope,$scope,$http,$CommonTitleSrv,$CommonFootSrv,$context){
	$CommonTitleSrv.setTitle("首页",true,false);
	$CommonFootSrv.setIsShowFooter(true);
	$CommonTitleSrv.setHTitle("首页-快递代领");
}]);