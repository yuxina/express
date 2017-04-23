var expressApp = angular.module('expressApp', ['ui.router','$context','CommonHead','CommonFoot','mHome','myGood','myAccount','login','mySetting','myAbout','myInfo','myRegister','myCar','myOrder','myEvaluate']);
/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */
expressApp.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    
    $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
    	/*    	 	if (toState.name == "good") {
    	 		//路由状态的监听
    	 	}
    	 	
    	 	 if (fromState.name == "good") { 
    	 	 }
		        console.log(toState); 
		        console.log(toParams); 
		        console.log(fromState); 
		        console.log(fromParams); */
        })
});



/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */
expressApp.config(function($httpProvider,$stateProvider, $urlRouterProvider) {
	//$httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
    $urlRouterProvider.otherwise('/index');//设置默认跳转路径
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                'commonHead': {
                    templateUrl: '/express/view/commonHead.html'
                },
                'content': {
                    templateUrl: '/express/view/home.html'
                },
                'commonFoot': {
                    templateUrl: '/express/view/commonFoot.html'
                }                
            }
        })
        .state('good', {
            url: '/good',
            views: {
                'commonHead': {
                    templateUrl: '/express/view/commonHead.html'
                },
                'content': {
                    templateUrl: '/express/view/goodCont.html'
                },
                'goodType@good': {
                    templateUrl: '/express/view/goodType.html'
                },  
                'goodList@good': {
                    templateUrl: '/express/view/goodList.html'
                },
                'goodCar@good': {
                    templateUrl: '/express/view/goodCar.html'
                },                
                'commonFoot': {
                    templateUrl: '/express/view/commonFoot.html'
                } 
            }

        })
        .state('user', {
            url: '/user',
            views: {
                'commonHead': {
                    templateUrl: '/express/view/commonHead.html'
                },
                'content': {
                    templateUrl: '/express/view/myAccContent.html'                   
                },
                'commonFoot': {
                    templateUrl: '/express/view/commonFoot.html'
                } 
            }
        })
        .state('login', {
            url: '/login/:from/:to',
            views: {
                'commonHead': {
                    templateUrl: '/express/view/commonHead.html'
                },
                'content': {
                    templateUrl: '/express/view/loginContent.html'                   
                },
                'commonFoot': {
                    templateUrl: '/express/view/commonFoot.html'
                } 
            }
        })
        .state('setting', {
            url: '/setting',
            views: {
                'commonHead': {
                    templateUrl: '/express/view/commonHead.html'
                },
                'content': {
                    templateUrl: '/express/view/settingCont.html'                   
                },
                'commonFoot': {
                    templateUrl: '/express/view/commonFoot.html'
                } 
            }
        })
        .state('about', {
            url: '/about',
            views: {
                'commonHead': {
                    templateUrl: '/express/view/commonHead.html'
                },
                'content': {
                    templateUrl: '/express/view/aboutCont.html'                   
                },
                'commonFoot': {
                    templateUrl: '/express/view/commonFoot.html'
                } 
            }
        })
        .state('info', {
            url: '/info',
            views: {
                'commonHead': {
                    templateUrl: '/express/view/commonHead.html'
                },
                'content': {
                    templateUrl: '/express/view/myInfo.html'                   
                },
                'commonFoot': {
                    templateUrl: '/express/view/commonFoot.html'
                } 
            }
        })
        .state('recruit', {
            url: '/recruit',
            views: {
                'commonHead': {
                    templateUrl: '/express/view/commonHead.html'
                },
                'content': {
                    templateUrl: '/express/view/recruitCont.html'                   
                },
                'commonFoot': {
                    templateUrl: '/express/view/commonFoot.html'
                } 
            }
        })
        .state('register', {
            url: '/register',
            views: {
                'commonHead': {
                    templateUrl: '/express/view/commonHead.html'
                },
                'content': {
                    templateUrl: '/express/view/register.html'                   
                },
                'commonFoot': {
                    templateUrl: '/express/view/commonFoot.html'
                } 
            }
        })
        .state('car', {
            url: '/car',
            views: {
                'commonHead': {
                    templateUrl: '/express/view/commonHead.html'
                },
                'content': {
                    templateUrl: '/express/view/car.html'                   
                },
                'commonFoot': {
                    templateUrl: '/express/view/commonFoot.html'
                } 
            }
        })
        .state('order', {
            url: '/order/:from/:to',
            views: {
                'commonHead': {
                    templateUrl: '/express/view/commonHead.html'
                },
                'content': {
                    templateUrl: '/express/view/order.html'                   
                },
                'commonFoot': {
                    templateUrl: '/express/view/commonFoot.html'
                } 
            }
        })
        .state('evaluate', {
            url: '/evaluate/:carId',
            views: {
                'commonHead': {
                    templateUrl: '/express/view/commonHead.html'
                },
                'content': {
                    templateUrl: '/express/view/evaluate.html'                   
                },
                'commonFoot': {
                    templateUrl: '/express/view/commonFoot.html'
                } 
            }
        })
/*        .state('booklist', {
            url: '/{bookType:[0-9]{1,4}}',
            views: { //注意这里的写法，当一个页面上带有多个ui-view的时候如何进行命名和视图模板的加载动作
                '': {
                    templateUrl: 'tpls/bookList.html'
                },
                'booktype@booklist': {
                    templateUrl: 'tpls/bookType.html'
                },
                'bookgrid@booklist': {
                    templateUrl: 'tpls/bookGrid.html'
                }
            }
        })
        .state('addbook', {
            url: '/addbook',
            templateUrl: 'tpls/addBookForm.html'
        })
        .state('bookdetail', {
            url: '/bookdetail/:bookId', //注意这里在路由中传参数的方式
            templateUrl: 'tpls/bookDetail.html'
        })*/
        
        
        
});





