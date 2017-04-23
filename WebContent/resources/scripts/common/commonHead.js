var commontHead = angular.module('CommonHead',[]);

//工厂方法-初始化标题，header内容
commontHead.factory('$CommonTitleSrv', ['$rootScope', function ($rootScope) {
    var commonTitleSrv = {};
    var head;
    commonTitleSrv.setHTitle = function(hTitle){
    	commonTitleSrv.hTitle = hTitle;
    }
    commonTitleSrv.setTitle = function (title,isShow,showBack) {
    	head = {};
		// 初始化标题名称
		head.title = title;
		head.isShow = isShow;
		head.showBack = showBack;
    };
    commonTitleSrv.getHTitle = function(){
    	return commonTitleSrv.hTitle;
    }
    commonTitleSrv.getTitle = function () {
        return head;
    };

    return commonTitleSrv;
}]);

//登录页的数据服务
commontHead.service('getData',['$http','$q','$window',function($http,$q,$window){
	var getData = {};
	return {
	    login:function(mobile,pwd){
	    	// 如果已存在则直接返回
		      if(getData.user){
		        return $q.when(getData);
		      }
		      //如果不存在数据则加载
		      return $http({
		  		method:'post',
				url:'/express/pages/user_login.action',
				params:{
					'uname':mobile,
					'upwd':pwd
				}
		      })
		      .success(function(data){
					// 把数据存到server中并返回
					getData=data;
					return data;
		      });
	    },
	    //存储单个属性
        set :function(key,value){
          $window.sessionStorage[key]=value;
        },        //读取单个属性
        get:function(key,defaultValue){
          return  $window.sessionStorage[key] || defaultValue;
        },        //存储对象，以JSON格式存储
        setObject:function(key,value){
          $window.sessionStorage[key]=JSON.stringify(value);
        },        //读取对象
        getObject: function (key) {
          return JSON.parse($window.sessionStorage[key] || '{}');
        },
        removeObject: function (key){
        	$window.sessionStorage.removeItem(key);
        },
        isExist: function (key){
          if($window.sessionStorage[key]){
        	  return true;
          }else{
        	  return false;
          }
        }
	  }
}]);
//控制器-
commontHead.controller("commonHeadCtrl",['$scope','$http','$rootScope', '$CommonTitleSrv', function($scope,$http,$rootScope,$CommonTitleSrv){
    $scope.title = '快递';
    $scope.isShow = true;
    $scope.showBack = true;
    $scope.hTitle = '快递代领';//默认值
    $scope.currentUser = null;
    //点击‘返回三角’，实现后退的方法
    $scope.goBack = function(){
        if(!!$rootScope.goBack){
            $rootScope.goBack();
        }else{
        	if($rootScope.$stateParams.from && $rootScope.$stateParams.to == null){
        		$rootScope.$state.go('index');
        	}else if($rootScope.$stateParams.from =='evaluate' && $rootScope.$stateParams.to == 'user'){
        		$rootScope.$state.go('user');
        	}
        	else{
        		window.history.go(-1);
        	}

        }
    };   
    
    $scope.$watch($CommonTitleSrv.getTitle, function (newVal, oldVal, scope) {
        if(!!newVal){
        	$scope.title = newVal.title;
        	$scope.isShow = newVal.isShow;
        	$scope.showBack = newVal.showBack;
        }
    });
    $scope.$watch($CommonTitleSrv.getHTitle, function(newVal, oldVal){
    	if(!!newVal){
    		$scope.hTitle = newVal;
    	}
    });

}]);
