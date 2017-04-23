
var login = angular.module('login',['CommonHead']);

//getData: 登录页的数据服务
login.controller('loginCtrl',['$rootScope','$scope','$window','$location','getData','$CommonTitleSrv','$CommonFootSrv','$timeout','$context',function($rootScope,$scope,$window,$location,getData,$CommonTitleSrv,$CommonFootSrv,$timeout,$context){
	
	$CommonTitleSrv.setTitle("登  录",true,true);
	$CommonTitleSrv.setHTitle("登录-快递代领");
	$CommonFootSrv.setIsShowFooter(false);
    $scope.init = function(){
        //提交登录信息
        $scope.submit = function(){
            var mobile = $scope.phone;
            var pwd = $scope.pwd;
            //调用登录页的数据服务，提交用户名和密码信息，验证是否正确
            //成功时，后退一页
            //失败时，显示提示错误信息
            getData.login(mobile,pwd)
            .success(function(response){
                if(response["success"]){
                	getData.setObject("currentUser",response["user"]);
                	if($rootScope.$stateParams.to != ""){
                		var toPath = $rootScope.$stateParams.to;
                		$rootScope.$state.go(toPath);    
                	} else{
                		$rootScope.$state.go('user');    
                	}              	               	              	          	
                }else{
                    $scope.pwd = '';
                    $scope.errorMsg = response["msg"];
                    $scope.showError = "ui-hint-show"
                    $timeout(function(){
                    	$scope.errorMsg = "";
                    	$scope.showError = "";                 	
                    },2000);
                }
            })
        }
    };
    $scope.init();
    
    $scope.clearPhone= function(){
    	$scope.phone = '';
    };
    $scope.clearPwd= function(){
    	$scope.pwd = '';
    };
    
}]);