var myInfo = angular.module('myInfo',['CommonHead']);


myInfo.controller('info',['$rootScope','$scope','$http','$CommonTitleSrv','$CommonFootSrv','$context','getData',function($rootScope,$scope,$http,$CommonTitleSrv,$CommonFootSrv,$context,getData){
	$CommonTitleSrv.setTitle("个人资料",true,true);
	$CommonTitleSrv.setHTitle("个人资料-快递代领");
	$CommonFootSrv.setIsShowFooter(false);
	
}]);