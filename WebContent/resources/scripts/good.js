var myGood = angular.module('myGood',[]);

myGood.controller('goodCtrl',['$rootScope','$scope','$http','$CommonTitleSrv','$CommonFootSrv','$context','$timeout','$interval','getData',function($rootScope,$scope,$http,$CommonTitleSrv,$CommonFootSrv,$context,$timeout,$interval,getData){
	$CommonTitleSrv.setTitle("快递服务",true,false);
	$CommonFootSrv.setIsShowFooter(true);
	$CommonTitleSrv.setHTitle("快递服务-快递代领");
	
	$scope.fontSize = (document.documentElement.style.fontSize).replace("px","");
	
	$scope.iscrollR = new IScroll('#wrapperR', { mouseWheel: true, click: true });
	
	$scope.iscrollL = new IScroll('#wrapperL', { mouseWheel: true, click: true });
	
    $scope.initIscroll = function(){
    	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
    		capture: false,
    		passive: false
    	} : false);
    }

	//初始化购物车
	$scope.carItemList = [];
	$scope.allProList = [];
	
	//存放已加载过产品数据的类型
	$scope.ptMap = {};

	//初始化类型ID
	//根据ID动态切换分类页
	$scope.proTypeId = "";

	//暂存产品类型信息
	var proTypeInfo = new Array();
	$scope.proTypeList= "";
	
	//初始化右边区域列表视图不显示，到请求到数据，再显示
	$scope.isShowList = 2;	
    
    //加载产品类型信息
    $scope.getGoodTypeInfo = function(){
		$http({
            method:"POST",
            url:'/express/pages/proType_typeList.action'
        }).success(function(data,header,config,status){
        	if(data["success"]){
        		//初始化类型数据
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
    
    $scope.dealProListDate = function(data){
	   	//获取第一个大类ID进行判断
    	var isFirstType = true;
    	//遍历结果集将名称长度大于统一修改为小于4位
        jQuery.each(data, function(i,item){
        	if(isFirstType){
        		$scope.proTypeId = item.proTypeId;
        		isFirstType = false;
        	}
        	proTypeInfo.push(item);
            if(item.proTypeName.length > 4){
            	item.proTypeName = item.proTypeName.substring(0,5);
            }
        });
        $scope.proTypeList = proTypeInfo; 
        //根据类型获取产品数据
        $scope.getGoodListByType($scope.proTypeId);
    }
    
	//根据产品类型id获取该类型下的产品列表
	$scope.getGoodListByType = function(proTypeId){
		$http({
            method:"POST",
            url:'/express/pages/product_proList.action',
            params: {'ptId':proTypeId}
        }).success(function(data,header,config,status){
            if(data["success"]){
            	$scope.ptMap[proTypeId] = true;
            	$scope.isShowList = 1;
            	for(var i=0;i<data["pList"].length;i++){
            		data["pList"][i].count = 0;
            		$scope.allProList.push(data["pList"][i]);            		
            	}
            	$scope.iscrollL.refresh();
            	$timeout(function(){
            		$scope.iscrollR.refresh();
            	},100);        	
            }else{
            	$scope.ptMap[proTypeId] = false;
            	$scope.isShowList = 0;
            	$scope.iscrollR.refresh();
            }
        }).error(function(data,header,config,status){
        	console.log("系统繁忙");
        })
	}
	    	
	//根据产品数据条数，初始化列表页高度
    $scope.initRightHeight = function(length){
    	var h = $scope.fontSize * (1.4 * length + 0.4);
    	$("#scrollerR").css("height",h);   	
    	$scope.iscrollR.refresh();
    	
    }
       
	//点击分类，获取数据
    $scope.changeType = function(proTypeId){
    	$scope.proTypeId = proTypeId;
    	//如果map中没有该分类的数据，就去请求
    	var obj = $scope.ptMap[proTypeId];
    	if( obj == null){
    		$scope.getGoodListByType(proTypeId); 		
    	}else if(obj == false){
    		$scope.isShowList = 0;
    	}else{
    		$scope.isShowList = 1;
        	$timeout(function(){
        		$scope.iscrollR.refresh();
        	},100);
    	}
    }
    
    //调用
    $scope.getGoodTypeInfo();
    //$scope.initIscroll();
    
    //计算总价
    $scope.totalPrice = function(){
    	var total = 0;
    	angular.forEach($scope.allProList,function(item){
    		total += parseInt(item.count) * parseFloat(item.proPrice);
    	});
    	return total.toFixed(2);
    	
    }
    //计算总购买数
    $scope.totalQuality = function(){
    	var total = 0;
    	angular.forEach($scope.allProList,function(item){
    		total += parseInt(item.count);
    	});
    	return total;
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
    	var all = $scope.allProList;
    	var index = findIndex(all,id);
    	if(index !== -1){
    		var item = all[index];
    		if(item.count == 0){
        		++item.count;
        		$scope.carItemList.push(item);
    		}else{
        		++item.count;
    		}
    	}  	
    }
    //为某个产品减少一个数量
    $scope.minus = function(id,inCar){
    	var all = $scope.allProList;
    	var index = findIndex(all,id);
    	if(index !== -1){
        	var item = all[index];
        	if(inCar){
            	if(item.count > 0){
            		--item.count;
            		if(item.count == 0){
            			$scope.removeCarItem(id);
            			if($scope.carItemList.length == 0){
            				$scope.showBL = false; 	
            			}           			
            		}
            	} 
        	}else{
            	if(item.count > 0){
            		--item.count;
            	} 
        	}  		
    	}  
    }
        
    //当数量减到0，把该购物项移除购物车
    $scope.removeCarItem = function(id){
    	var index = findIndex($scope.carItemList,id);
    	if(index !== -1){
    		$scope.carItemList.splice(index,1);
    	}

    };
    
    //显示购物车弹出页
    $scope.showBL = false;
    $scope.showCarList = function(){
    	if($scope.carItemList.length == 0){
            $scope.errorMsg = "购物车为空";
            $scope.showError = "ui-hint-show";
            $timeout(function(){
                $scope.errorMsg = "";
                $scope.showError = "";
            },1000);
    		
    	}else{
        	$scope.showBL = true; 
    	}		
    }
    $scope.closeCarList = function(){
    	$scope.showBL = false; 	
    }

    $scope.goCar = function(){
    	if($scope.carItemList.length == 0){
            $scope.errorMsg = "您还未选择商品";
            $scope.showError = "ui-hint-show";
            $timeout(function(){
                $scope.errorMsg = "";
                $scope.showError = "";
            },1000);
    	}else{
        	if(getData.isExist("currentUser")){
        		var uid  = getData.getObject("currentUser").uid;
            	$http({
                    method:"POST",
                    url:'/express/pages/car_checkCarByUser.action',
                    params:{
    					'user.uid':uid,			
    				}
                }).success(function(data,status){
                	if(data["carInfo"]){
                		getData.setObject("carId",data["carInfo"].carId);
                		getData.setObject("carItems",$scope.carItemList);
                		$rootScope.$state.go("car");
                	}else{
                        $scope.errorMsg = "系统繁忙";
                        $scope.showError = "ui-hint-show";
                        $timeout(function(){
                            $scope.errorMsg = "";
                            $scope.showError = "";
                        },1000);
                	}       	
                })
        	}else{
        		$rootScope.$state.go("login",{from:'good',to:'good'});
        	}
    	}    	
    }	    
}]);