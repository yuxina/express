'use strict';

var mCommonFoot = angular.module('CommonFoot', []);
mCommonFoot.factory('$CommonFootSrv', ['$rootScope',function () {
    var commonFootSrv = {

    };
    var footer;
    commonFootSrv.setIsShowFooter = function(isShow){
    	footer = {}
    	footer.isShow = isShow;
    }
    commonFootSrv.getIsShowFooter = function(){
    	return footer;
    }

    return commonFootSrv;
}]);
mCommonFoot.controller('CommonBottom', ['$scope','$context','$CommonFootSrv',function ($scope,$context,$CommonFootSrv) {
	 $scope.isShowFooter = true;

	 $scope.toIndex = function(){
		 window.location.href = $context.path+'/view/index.html';
	 }
	 $scope.toExpress = function(){
		 window.location.href = $context.path+'/view/good';
	 }
	 $scope.toAccount = function(){
		 window.location.href = $context.path+'/view/myAcc.html';
	 }
	 
    $scope.$watch($CommonFootSrv.getIsShowFooter, function(newVal, oldVal,scope){
    	if(!!newVal){
    		$scope.isShowFooter = newVal.isShow;
    	}
    });
	 
}]);

