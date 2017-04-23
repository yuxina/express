var myOrder = angular.module('myOrder',['CommonHead']);


myOrder.controller('order',['$rootScope','$scope','$http','$CommonTitleSrv','$CommonFootSrv','$context','getData','$timeout',function($rootScope,$scope,$http,$CommonTitleSrv,$CommonFootSrv,$context,getData,$timeout){
	$CommonTitleSrv.setTitle("我的订单",true,true);
	$CommonTitleSrv.setHTitle("我的订单-快递代领");
	$CommonFootSrv.setIsShowFooter(false);
	//订单列表是否为空 0:加载  1：空 2：不为空 3：隐藏
	$scope.isListEmpty = 0;
	//所有订单信息
	$scope.allOrderList = '';
	$scope.showList = '';
	//当前tab选项卡状态 0:全部  1：待接单  2：服务中 3：待评价
	$scope.tabState = 0;
	//保存当前用户编号
	$scope.currentUid = '';
    //初始化订单信息
    $scope.init = function(){
		  if(!getData.isExist("currentUser")){
			  $rootScope.$state.go('login',{from:'order'}); 
		  }else{
			  $scope.currentUid = getData.getObject("currentUser").uid;
			  $scope.getAll();
		  }
    }
    $scope.getAll = function(){
    	$scope.isListEmpty = 0;
    	$http({
            method:"POST",
            url:'/express/pages/car_getOrderByUid.action',
            params:{
				'user.uid':$scope.currentUid		
			}
        }).success(function(data,header,config,status){
        	if(data["success"]){
        		$scope.allOrderList = data["cList"];
        		$scope.showList = $scope.allOrderList;
        		$scope.isListEmpty = 2;
        	}else{
        		$scope.isListEmpty = 1;
        	}       	
        }).error(function(data,header,config,status){
        	$scope.isListEmpty = 1;
        	$scope.errorMsg = "系统繁忙";
        	$scope.showError = "ui-hint-show";
            $timeout(function(){
            	$scope.errorMsg = "";
            	$scope.showError = "";                 	
            },2000);
        })
    }
    //待接单
    $scope.getUncommit = function(){
    	$scope.isListEmpty = 3;
    	var list = [];
    	angular.forEach($scope.allOrderList,function(item){
    		if(item.carState.carSid == 2){
    			list.push(item);
    		}
    	});
    	if(list.length > 0){
    		$scope.showList = list;
    	}else{
    		$scope.showList = '';
    		$scope.isListEmpty = 1;
    	}
    }
    //配送中
    $scope.getInService = function(){
    	$scope.isListEmpty = 3;
    	var list = [];
    	angular.forEach($scope.allOrderList,function(item){
    		if(item.carState.carSid == 4){
    			list.push(item);
    		}
    	});
    	if(list.length > 0){
    		$scope.showList = list;
    	}else{
    		$scope.showList = '';
    		$scope.isListEmpty = 1;
    	}
    }
    //待评价
    $scope.getUnAssgin = function(){
    	$scope.isListEmpty = 3;
    	var list = [];
    	angular.forEach($scope.allOrderList,function(item){
    		if(item.carState.carSid == 6){
    			list.push(item);
    		}
    	});
    	if(list.length > 0){
    		$scope.showList = list;
    	}else{
    		$scope.showList = '';
    		$scope.isListEmpty = 1;
    	}
    }
    $scope.updataState = function(id,state,stateInfo){
    	angular.forEach($scope.allOrderList,function(item){
    		if(id == item.carId){
    			item.carState.carSid = state;
    			item.carState.carStateInfo = stateInfo;
    		}
    	});
    }
    
    $scope.changeState = function(id,state,susscess,fail,stateInfo){
    	$http({
            method:"POST",
            url:'/express/pages/car_changeS.action',
            params:{
				'carId':id,
				'state':state
			}
        }).success(function(data,header,config,status){
        	if(data["success"]){
        		$scope.errorMsg = susscess;
                $scope.showError = "ui-hint-show"
                $timeout(function(){
                	$scope.errorMsg = "";
                	$scope.showError = "";                 	
                },2000);
                $scope.updataState(id,state,stateInfo);
        	}else{
        		$scope.errorMsg = fail;
                $scope.showError = "ui-hint-show"
                $timeout(function(){
                	$scope.errorMsg = "";
                	$scope.showError = "";                 	
                },2000);
        	}       	
        }).error(function(data,header,config,status){
        	$scope.errorMsg = 系统繁忙;
        	$scope.showError = "ui-hint-show";
            $timeout(function(){
            	$scope.errorMsg = "";
            	$scope.showError = "";                 	
            },2000);
        })
    }
    
    $scope.cancel = function(id,state){
    	$scope.changeState(id,state,"取消订单成功","取消订单失败","已取消");
    }
    
    $scope.receive = function(id,state){
    	$scope.changeState(id,state,"确认订单成功","确认订单失败","待评价");
    }
    //去往订单评价页
    $scope.goEval = function(id){
    	$rootScope.$state.go("evaluate",{carId:id});
    }
    
    $scope.init();
	
}]);