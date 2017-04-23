var myEvaluate = angular.module('myEvaluate',['CommonHead']);


myEvaluate.controller('evaluate',['$rootScope','$scope','$http','$CommonTitleSrv','$CommonFootSrv','$context','getData','$timeout',function($rootScope,$scope,$http,$CommonTitleSrv,$CommonFootSrv,$context,getData,$timeout){
	$CommonTitleSrv.setTitle("评价",true,true);
	$CommonTitleSrv.setHTitle("评价-快递代领");
	$CommonFootSrv.setIsShowFooter(false);
	$scope.carId = '';
	$scope.content = '';

    //初始化信息
    $scope.init = function(){
		  if(!getData.isExist("currentUser")){
			  $rootScope.$state.go('login',{from:'order'}); 
		  }else{
			  if($rootScope.$stateParams.carId == ""){
				  $rootScope.$state.go('order');
			  }else{
				  $scope.carId = $rootScope.$stateParams.carId;
			  }
		  }
    }
    $scope.commitEval = function(){
    	if($scope.content == ""){
    		$scope.content = "暂无评价";
    	}
    	$http({
            method:"POST",
            url:'/express/pages/eval_add.action',
            params:{
            	'content':$scope.content,
				'car.carId':$scope.carId
			}
        }).success(function(data,header,config,status){
        	if(data["success"]){
        		$scope.errorMsg = "订单评价成功！";
                $scope.showError = "ui-hint-show"
                $timeout(function(){
                	$scope.errorMsg = "";
                	$scope.showError = ""; 
                	$rootScope.$state.go('order',{from:'evaluate',to:'user'});
                },2000);
                
        	}else{
        		$scope.errorMsg = "评价失败！";
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

    $scope.init();
	
}]);