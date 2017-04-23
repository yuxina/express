
var myAccount = angular.module('myAccount',['CommonHead']);

myAccount.controller('account',['$rootScope','$scope','$http','$context','$CommonTitleSrv','$CommonFootSrv','getData',function($rootScope,$scope,$http,$context,$CommonTitleSrv,$CommonFootSrv,getData){
	  $CommonTitleSrv.setTitle("",false,false);
	  $CommonTitleSrv.setHTitle("用户中心");
	  $CommonFootSrv.setIsShowFooter(true);
	  $scope.currentUser==null;
	  $scope.isLogin = 0;//登录状态判定。0：未登录；1：登录
      //加载用户信息
      $scope.init = function(){
    	  $scope.isLogin = 0;   	  
    	  if(getData.isExist("currentUser")){
    		  $scope.isLogin = 1;
    		  $scope.currentUser = getData.getObject("currentUser");
    	  }else{
    		  $scope.isLogin = 0;
    	  }
      };
      /**
       * 待接单
       */
      $scope.waitTakeOrder = function(){
    	  if(!getData.isExist("currentUser")){
    		  $rootScope.$state.go('login');
    	  }else{
    		  $rootScope.$state.go('order');
    	  }
      }
      /**
       * 待评价
       */
      $scope.waitEvalOrder = function(){
    	  if(!getData.isExist("currentUser")){
    		  $rootScope.$state.go('login');
    	  }else{
    		  $rootScope.$state.go('order');
    	  }
      }
      
      /**
       * 服务中
       */
      $scope.inServiceOrder = function(){
    	  if(!getData.isExist("currentUser")){
    		  $rootScope.$state.go('login');
    	  }else{
    		  $rootScope.$state.go('order');
    	  }
      }

      /**
       * 我的订单
       */
      $scope.goOrder = function(){
    	  if(!getData.isExist("currentUser")){
    		  $rootScope.$state.go('login');
    	  }else{
    		  $rootScope.$state.go('order');
    	  }
      }     
      
  	  $scope.goAbout = function(){	 
		  $rootScope.$state.go('about');
	  }
  	  
  	  $scope.showRecruit = function(){	 
  		$(".black-overlay").show();
	  }
      
      /**
       * 设置
       */
      $scope.goSetting = function(){
		  $rootScope.$state.go('setting');     
      }

      /**
       * 前往登录页
       */
      $scope.toLogin = function(){
    	  $rootScope.$state.go('login');     
      }
      
      $rootScope.goBack = function(){
    	  window.history.go(-1);
      };
      $scope.init();
      
      $("#closeBox").click(function(){
    	  $(".black-overlay").hide();
      });
}]);

