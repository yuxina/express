var myOrder = angular.module('myOrder',['CommonHead']);


myOrder.controller('order',['$rootScope','$scope','$http','$CommonTitleSrv','$CommonFootSrv','$context','getData',function($rootScope,$scope,$http,$CommonTitleSrv,$CommonFootSrv,$context,getData){
	$CommonTitleSrv.setTitle("我的订单",true,true);
	$CommonTitleSrv.setHTitle("我的订单-快递代领");
	$CommonFootSrv.setIsShowFooter(false);
	//所有订单信息
	$scope.allOrderList = '';
	//
    //初始化订单信息
    $scope.init = function(){
		$http({
            method:"POST",
            url:'/express/pages/car_getOrderByUid.action'
        }).success(function(data,header,config,status){
        	if(data["success"]){
        		$scope.dealProListDate(data["ptList"]);
        	}else{
        		$scope.isShowList = 2;
                $scope.errorMsg = data["msg"];
                $scope.showError = "ui-hint-show"
                $timeout(function(){
                	$scope.errorMsg = "";
                	$scope.showError = "";                 	
                },2000);
        	}       	
        }).error(function(data,header,config,status){
        	$scope.errorMsg = "系统繁忙";
        	$scope.showError = "ui-hint-show";
            $timeout(function(){
            	$scope.errorMsg = "";
            	$scope.showError = "";                 	
            },2000);
        })
    }
	
}]);