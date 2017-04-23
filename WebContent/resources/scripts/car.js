var myCar = angular.module('myCar',['CommonHead']);


myCar.controller('car',['$rootScope','$scope','$http','$CommonTitleSrv','$CommonFootSrv','$context','getData','$timeout','$httpParamSerializerJQLike',function($rootScope,$scope,$http,$CommonTitleSrv,$CommonFootSrv,$context,getData,$timeout,$httpParamSerializerJQLike){
	$CommonTitleSrv.setTitle("购物车",true,true);
	$CommonTitleSrv.setHTitle("购物车-快递代领");
	$CommonFootSrv.setIsShowFooter(false);
	$scope.init = function(){
		  if(!getData.isExist("currentUser")){
			  $rootScope.$state.go('login',{from:'car',to:'car'}); 
		  }else{
			  $scope.currentUid = getData.getObject("currentUser").uid;
			  if(getData.isExist("carItems") && getData.isExist("carId")){
				  $scope.ctList = getData.getObject("carItems");
				  $scope.carId = getData.getObject("carId");
			  }else{
				  $rootScope.$state.go('good'); 
			  }
		  }

	}
	$scope.init();
	
	$scope.totalPrice = function(){
    	var total = 0;
    	angular.forEach($scope.ctList,function(item){
    		total += parseInt(item.count) * parseFloat(item.proPrice);
    	});
    	return total.toFixed(2);
	}
	
    //找到一个元素的索引过程
    var findIndex = function(obj,id){
    	var index = -1;
    	angular.forEach(obj,function(item,key){
        	if(item.proId === id){
        		index = key;
        		return;
        	}
    	});
    	return index;
    }
    //为某个产品添加一个数量
    $scope.add = function(id){
    	var all = $scope.ctList;
    	var index = findIndex(all,id);
    	if(index !== -1){
    		var item = all[index];
    		if(item.count == 0){
        		++item.count;
    		}else{
        		++item.count;
    		}

    	}  	
    }
    //为某个产品减少一个数量
    $scope.minus = function(id){
    	var all = $scope.ctList;
    	var index = findIndex(all,id);
    	if(index !== -1){
        	var item = all[index];
        	if(item.count > 0){
        		--item.count;
        		if(item.count == 0){
        			$scope.removeCarItem(id);
        			if($scope.ctList.length == 0){
        				getData.removeObject("carItems");
        				getData.removeObject("carId");
                        $scope.errorMsg = "你已经删除所有商品，订单将进行关闭并返回回选购页";
                        $scope.showError = "ui-hint-show";
                        $timeout(function(){
                            $scope.errorMsg = "";
                            $scope.showError = "";
                            $rootScope.$state.go("good");
                        },1000);
        			}		
        		}
        	}
 
    	}
    }
    
    
    
    //当数量减到0，把该购物项移除购物车
    $scope.removeCarItem = function(id){
    	var index = findIndex($scope.ctList,id);
    	if(index !== -1){
    		$scope.ctList.splice(index,1);
    	}

    };
	

	
	$scope.submitForm = function(isValid) {
		var carItems = [];
		//将商品转换成购物项
    	angular.forEach($scope.ctList,function(item){
    		var ci = {};
    		ci.car = {
    			carId:$scope.carId
    		};
    		ci.product = {
    			proId:item.proId,
    		};
    		ci.proName = item.proName;
    		ci.proPrice = item.proPrice;
    		ci.quantity = item.count;
    		carItems.push(ci);
    	}); 
    	var carItemJSON = JSON.stringify(carItems);
    	console.log(carItemJSON);
        if (isValid) {
        	$http({
                method:"POST",
                url:'/express/pages/car_submit.action',
                data:$httpParamSerializerJQLike({
                	'carId':$scope.carId,
                	'total':$scope.totalPrice(),
					'contacts':$scope.contacts,
					'phone':$scope.phone,
					'address':$scope.address,
					'expressFirm':$scope.expressFirm,
					'deliveryDate':$scope.deliveryDate,
					'proof':$scope.proof,
					'deliveryTime':$scope.deliveryTime,
					'carDesc':$scope.carDesc,
					'user.uid':$scope.currentUid,
					'cItems':carItemJSON
				}),
				headers: { 
					"Content-Type": "application/x-www-form-urlencoded"
				}
            }).success(function(data,status){
            	if(data["success"]){
    				getData.removeObject("carItems");
    				getData.removeObject("carId");
            		$rootScope.$state.go("user");
            	}else{
            		if(data["msg"]!=""){
            			
            		}else{
        				getData.removeObject("carItems");
        				getData.removeObject("carId");
                        $scope.errorMsg = "系统错误，下单失败，将返回产品列表页";
                        $scope.showError = "ui-hint-show";
                        $timeout(function(){
                            $scope.errorMsg = "";
                            $scope.showError = "";
                            $rootScope.$state.go("good");
                        },1000);
            		}
            	}       	
            })
        }
    };
	
}]);