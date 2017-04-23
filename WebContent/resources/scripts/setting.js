var mySetting = angular.module('mySetting',['CommonHead']);


mySetting.controller('setting',['$rootScope','$scope','$http','$CommonTitleSrv','$CommonFootSrv','$context','getData',function($rootScope,$scope,$http,$CommonTitleSrv,$CommonFootSrv,$context,getData){
	$CommonTitleSrv.setTitle("设置",true,true);
	$CommonTitleSrv.setHTitle("设置-快递代领");
	$CommonFootSrv.setIsShowFooter(false);
	$scope.isShowGoOut = false;
	$scope.init = function(){
		  if(getData.isExist("currentUser")){
			  $scope.isShowGoOut = true;   
		  };
	}

	 /**
	 * 退出登录，返回index页
	 */
	$scope.goOut = function () {
		getData.removeObject("currentUser");
		getData.removeObject("carId");
		getData.removeObject("carItems");
		$rootScope.$state.go('index');
		
	}
	
	 /**
	 * 跳到个人资料页
	 */
	$scope.goInfo = function () {
		$rootScope.$state.go('info');
		
	}
	$scope.init();
}]);