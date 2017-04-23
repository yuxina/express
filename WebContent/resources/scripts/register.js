var myRegister = angular.module('myRegister',[]);

myRegister.controller('register',['$rootScope','$scope','$http','$CommonTitleSrv','$CommonFootSrv','$context','getData','$timeout',function($rootScope,$scope,$http,$CommonTitleSrv,$CommonFootSrv,$context,getData,$timeout){
	$CommonTitleSrv.setTitle("注册",true,true);
	$CommonTitleSrv.setHTitle("注册-快递代领");
	$CommonFootSrv.setIsShowFooter(false);
	//存放用户名是否已存在的值
	$scope.nameFirstCh = true;
	$scope.nameIsExist = false;
	$scope.uname = "";
	$scope.upwd = "";
	$scope.upwdA = "";
	$scope.uphone = "";
	$scope.usex = "";
	

	var timeout;
	$scope.$watch('uname', function(newValue,oldValue){
		if(newValue){
			if(timeout){
				$timeout.cancel(timeout);
			}
		 	timeout = $timeout(function() {
           		$http({
                    method:"POST",
                    url:'/express/pages/user_existUserWithUserName.action',
                    params:{
    					'uname':newValue,
    				}
                }).success(function(data,status){
                	if(data["exist"]){
                		$scope.nameIsExist = true;
                	}else{
                		$scope.nameIsExist = false;
                	}       	
                })
            }, 1000);			
		}
	});


	$scope.submitForm = function(isValid) {
        if (isValid) {
        	$http({
                method:"POST",
                url:'/express/pages/user_register.action',
                params:{
					'uname':$scope.uname,
					'upwd':$scope.upwd,
					'uname':$scope.uname,
					'uphone':$scope.uphone,
					'usex':$scope.usex				
				}
            }).success(function(data,status){
            	if(data["success"]){
            		getData.setObject("currentUser",data["user"]);
                    $scope.errorMsg = "恭喜您注册成功,跳转到用户页！";
                    $scope.showError = "ui-hint-show";
                    $timeout(function(){
                        $scope.errorMsg = "";
                        $scope.showError = "";
                        $rootScope.$state.go("user");
                    },1000);
            		
            	}else{
            		
            	}       	
            })
        }
    };
    
    
	
}]);