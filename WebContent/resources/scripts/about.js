var myAbout = angular.module('myAbout',[]);


myAbout.controller('about',['$rootScope','$scope','$http','$CommonTitleSrv','$CommonFootSrv','$context','getData',function($rootScope,$scope,$http,$CommonTitleSrv,$CommonFootSrv,$context,getData){
	$CommonTitleSrv.setTitle("关于我们",true,true);
	$CommonTitleSrv.setHTitle("关于我们-快递代领");
	$CommonFootSrv.setIsShowFooter(false);
	
}]);