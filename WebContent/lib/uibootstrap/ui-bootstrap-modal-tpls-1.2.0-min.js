angular.module("ui.bootstrap",["ui.bootstrap.tpls","ui.bootstrap.modal","ui.bootstrap.stackedMap"]);
angular.module("ui.bootstrap.tpls",["uib/template/modal/backdrop.html","uib/template/modal/window.html"]);
angular.module("ui.bootstrap.modal",["ui.bootstrap.stackedMap"]).factory("$$multiMap",function(){return{createNew:function(){var A={};
return{entries:function(){return Object.keys(A).map(function(B){return{key:B,value:A[B]}
})
},get:function(B){return A[B]
},hasKey:function(B){return !!A[B]
},keys:function(){return Object.keys(A)
},put:function(B,C){if(!A[B]){A[B]=[]
}A[B].push(C)
},remove:function(D,E){var C=A[D];
if(!C){return 
}var B=C.indexOf(E);
if(B!==-1){C.splice(B,1)
}if(!C.length){delete A[D]
}}}
}}
}).provider("$uibResolve",function(){var A=this;
this.resolver=null;
this.setResolver=function(B){this.resolver=B
};
this.$get=["$injector","$q",function(C,B){var D=A.resolver?C.get(A.resolver):null;
return{resolve:function(F,I,H,E){if(D){return D.resolve(F,I,H,E)
}var G=[];
angular.forEach(F,function(J){if(angular.isFunction(J)||angular.isArray(J)){G.push(B.resolve(C.invoke(J)))
}else{if(angular.isString(J)){G.push(B.resolve(C.get(J)))
}else{G.push(B.resolve(J))
}}});
return B.all(G).then(function(L){var K={};
var J=0;
angular.forEach(F,function(N,M){K[M]=L[J++]
});
return K
})
}}
}]
}).directive("uibModalBackdrop",["$animateCss","$injector","$uibModalStack",function(D,C,B){return{replace:true,templateUrl:"uib/template/modal/backdrop.html",compile:function(E,F){E.addClass(F.backdropClass);
return A
}};
function A(G,F,E){if(E.modalInClass){D(F,{addClass:E.modalInClass}).start();
G.$on(B.NOW_CLOSING_EVENT,function(I,J){var H=J();
if(G.modalOptions.animation){D(F,{removeClass:E.modalInClass}).start().then(H)
}else{H()
}})
}}}]).directive("uibModalWindow",["$uibModalStack","$q","$animate","$animateCss","$document",function(B,A,E,D,C){return{scope:{index:"@"},replace:true,transclude:true,templateUrl:function(F,G){return G.templateUrl||"uib/template/modal/window.html"
},link:function(H,G,F){G.addClass(F.windowClass||"");
G.addClass(F.windowTopClass||"");
H.size=F.size;
H.close=function(J){var K=B.getTop();
if(K&&K.value.backdrop&&K.value.backdrop!=="static"&&J.target===J.currentTarget){J.preventDefault();
J.stopPropagation();
B.dismiss(K.key,"backdrop click")
}};
G.on("click",H.close);
H.$isRendered=true;
var I=A.defer();
F.$observe("modalRender",function(J){if(J==="true"){I.resolve()
}});
I.promise.then(function(){var J=null;
if(F.modalInClass){J=D(G,{addClass:F.modalInClass}).start();
H.$on(B.NOW_CLOSING_EVENT,function(L,M){var K=M();
if(D){D(G,{removeClass:F.modalInClass}).start().then(K)
}else{E.removeClass(G,F.modalInClass).then(K)
}})
}A.when(J).then(function(){var K=B.getTop();
if(K){B.modalRendered(K.key)
}if(!(C[0].activeElement&&G[0].contains(C[0].activeElement))){var L=G[0].querySelector("[autofocus]");
if(L){L.focus()
}else{G[0].focus()
}}})
})
}}
}]).directive("uibModalAnimationClass",function(){return{compile:function(A,B){if(B.modalAnimation){A.addClass(B.uibModalAnimationClass)
}}}
}).directive("uibModalTransclude",function(){return{link:function(E,D,C,A,B){B(E.$parent,function(F){D.empty();
D.append(F)
})
}}
}).factory("$uibModalStack",["$animate","$animateCss","$document","$compile","$rootScope","$q","$$multiMap","$$stackedMap",function(R,S,X,U,G,T,M,A){var O="modal-open";
var L,W;
var F=A.createNew();
var E=M.createNew();
var K={NOW_CLOSING_EVENT:"modal.stack.now-closing"};
var C;
var P=0;
var H="a[href], area[href], input:not([disabled]), button:not([disabled]),select:not([disabled]), textarea:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable=true]";
function D(){var Y=-1;
var a=F.keys();
for(var Z=0;
Z<a.length;
Z++){if(F.get(a[Z]).value.backdrop){Y=Z
}}return Y
}G.$watch(D,function(Y){if(W){W.index=Y
}});
function J(Y,b){var a=F.get(Y).value;
var Z=a.appendTo;
F.remove(Y);
I(a.modalDomEl,a.modalScope,function(){var c=a.openedClass||O;
E.remove(c,Y);
Z.toggleClass(c,E.hasKey(c));
Q(true)
},a.closedDeferred);
V();
if(b&&b.focus){b.focus()
}else{if(Z.focus){Z.focus()
}}}function Q(Y){var Z;
if(F.length()>0){Z=F.top().value;
Z.modalDomEl.toggleClass(Z.windowTopClass||"",Y)
}}function V(){if(L&&D()===-1){var Y=W;
I(L,W,function(){Y=null
});
L=undefined;
W=undefined
}}function I(a,c,Y,e){var Z;
var b=null;
var f=function(){if(!Z){Z=T.defer();
b=Z.promise
}return function g(){Z.resolve()
}
};
c.$broadcast(K.NOW_CLOSING_EVENT,f);
return T.when(b).then(d);
function d(){if(d.done){return 
}d.done=true;
S(a,{event:"leave"}).start().then(function(){a.remove();
if(e){e.resolve()
}});
c.$destroy();
if(Y){Y()
}}}X.on("keydown",N);
G.$on("$destroy",function(){X.off("keydown",N)
});
function N(Y){if(Y.isDefaultPrevented()){return Y
}var a=F.top();
if(a){switch(Y.which){case 27:if(a.value.keyboard){Y.preventDefault();
G.$apply(function(){K.dismiss(a.key,"escape key press")
})
}break;
case 9:K.loadFocusElementList(a);
var Z=false;
if(Y.shiftKey){if(K.isFocusInFirstItem(Y)||K.isModalFocused(Y,a)){Z=K.focusLastFocusableElement()
}}else{if(K.isFocusInLastItem(Y)){Z=K.focusFirstFocusableElement()
}}if(Z){Y.preventDefault();
Y.stopPropagation()
}break
}}}K.open=function(Y,c){var d=X[0].activeElement,Z=c.openedClass||O;
Q(false);
F.add(Y,{deferred:c.deferred,renderDeferred:c.renderDeferred,closedDeferred:c.closedDeferred,modalScope:c.scope,backdrop:c.backdrop,keyboard:c.keyboard,openedClass:c.openedClass,windowTopClass:c.windowTopClass,animation:c.animation,appendTo:c.appendTo});
E.put(Z,Y);
var b=c.appendTo,a=D();
if(!b.length){throw new Error("appendTo element not found. Make sure that the element passed is in DOM.")
}if(a>=0&&!L){W=G.$new(true);
W.modalOptions=c;
W.index=a;
L=angular.element('<div uib-modal-backdrop="modal-backdrop"></div>');
L.attr("backdrop-class",c.backdropClass);
if(c.animation){L.attr("modal-animation","true")
}U(L)(W);
R.enter(L,b)
}var e=angular.element('<div uib-modal-window="modal-window"></div>');
e.attr({"template-url":c.windowTemplateUrl,"window-class":c.windowClass,"window-top-class":c.windowTopClass,size:c.size,index:F.length()-1,animate:"animate"}).html(c.content);
c.scope.index=F.length()-1;
$(window).resize(function(){var h=e.children().children();
var f=h.width()/2;
var g=h.height()/2;
h.css({"margin-left":-f,"margin-top":-g}).fadeIn()
});
if(c.animation){e.attr("modal-animation","true")
}R.enter(U(e)(c.scope),b).then(function(){if(!c.scope.$$uibDestructionScheduled){R.addClass(b,Z)
}var h=e.children().children();
var f=h.width()/2;
var g=h.height()/2;
h.css({"margin-left":-f,"margin-top":-g}).fadeIn()
});
F.top().value.modalDomEl=e;
F.top().value.modalOpener=d;
K.clearFocusListCache()
};
function B(a,Z,Y){return !a.value.modalScope.$broadcast("modal.closing",Z,Y).defaultPrevented
}K.close=function(Z,Y){var a=F.get(Z);
if(a&&B(a,Y,true)){a.value.modalScope.$$uibDestructionScheduled=true;
a.value.deferred.resolve(Y);
J(Z,a.value.modalOpener);
return true
}return !a
};
K.dismiss=function(Y,Z){var a=F.get(Y);
if(a&&B(a,Z,false)){a.value.modalScope.$$uibDestructionScheduled=true;
a.value.deferred.reject(Z);
J(Y,a.value.modalOpener);
return true
}return !a
};
K.dismissAll=function(Z){var Y=this.getTop();
while(Y&&this.dismiss(Y.key,Z)){Y=this.getTop()
}};
K.getTop=function(){return F.top()
};
K.modalRendered=function(Y){var Z=F.get(Y);
if(Z){Z.value.renderDeferred.resolve()
}};
K.focusFirstFocusableElement=function(){if(C.length>0){C[0].focus();
return true
}return false
};
K.focusLastFocusableElement=function(){if(C.length>0){C[C.length-1].focus();
return true
}return false
};
K.isModalFocused=function(Y,a){if(Y&&a){var Z=a.value.modalDomEl;
if(Z&&Z.length){return(Y.target||Y.srcElement)===Z[0]
}}return false
};
K.isFocusInFirstItem=function(Y){if(C.length>0){return(Y.target||Y.srcElement)===C[0]
}return false
};
K.isFocusInLastItem=function(Y){if(C.length>0){return(Y.target||Y.srcElement)===C[C.length-1]
}return false
};
K.clearFocusListCache=function(){C=[];
P=0
};
K.loadFocusElementList=function(Z){if(C===undefined||!C.length){if(Z){var Y=Z.value.modalDomEl;
if(Y&&Y.length){C=Y[0].querySelectorAll(H)
}}}};
return K
}]).provider("$uibModal",function(){var A={options:{animation:true,backdrop:true,keyboard:true},$get:["$rootScope","$q","$document","$templateRequest","$controller","$uibResolve","$uibModalStack",function(H,E,C,J,B,K,G){var I={};
function F(L){return L.template?E.when(L.template):J(angular.isFunction(L.templateUrl)?L.templateUrl():L.templateUrl)
}var D=null;
I.getPromiseChain=function(){return D
};
I.open=function(R){var S=E.defer();
var V=E.defer();
var L=E.defer();
var U=E.defer();
var P={result:S.promise,opened:V.promise,closed:L.promise,rendered:U.promise,close:function(W){return G.close(P,W)
},dismiss:function(W){return G.dismiss(P,W)
}};
R=angular.extend({},A.options,R);
R.resolve=R.resolve||{};
R.appendTo=R.appendTo||C.find("body").eq(0);
if(!R.template&&!R.templateUrl){throw new Error("One of template or templateUrl options is required.")
}var M=E.all([F(R),K.resolve(R.resolve,{},null,null)]);
function N(){return M
}var O;
O=D=E.all([D]).then(N,N).then(function Q(a){var Y=R.scope||H;
var W=Y.$new();
W.$close=P.close;
W.$dismiss=P.dismiss;
W.$on("$destroy",function(){if(!W.$$uibDestructionScheduled){W.$dismiss("$uibUnscheduledDestruction")
}});
var Z,X={};
if(R.controller){X.$scope=W;
X.$uibModalInstance=P;
angular.forEach(a[1],function(c,b){X[b]=c
});
Z=B(R.controller,X);
if(R.controllerAs){if(R.bindToController){Z.$close=W.$close;
Z.$dismiss=W.$dismiss;
angular.extend(Z,Y);
if(angular.isFunction(Z.$onInit)){Z.$onInit()
}}W[R.controllerAs]=Z
}}G.open(P,{scope:W,deferred:S,renderDeferred:U,closedDeferred:L,content:a[0],animation:R.animation,backdrop:R.backdrop,keyboard:R.keyboard,backdropClass:R.backdropClass,windowTopClass:R.windowTopClass,windowClass:R.windowClass,windowTemplateUrl:R.windowTemplateUrl,size:R.size,openedClass:R.openedClass,appendTo:R.appendTo});
V.resolve(true)
},function T(W){V.reject(W);
S.reject(W)
})["finally"](function(){if(D===O){D=null
}});
return P
};
return I
}]};
return A
});
angular.module("ui.bootstrap.stackedMap",[]).factory("$$stackedMap",function(){return{createNew:function(){var A=[];
return{add:function(B,C){A.push({key:B,value:C})
},get:function(C){for(var B=0;
B<A.length;
B++){if(C===A[B].key){return A[B]
}}},keys:function(){var C=[];
for(var B=0;
B<A.length;
B++){C.push(A[B].key)
}return C
},top:function(){return A[A.length-1]
},remove:function(D){var B=-1;
for(var C=0;
C<A.length;
C++){if(D===A[C].key){B=C;
break
}}return A.splice(B,1)[0]
},removeTop:function(){return A.splice(A.length-1,1)[0]
},length:function(){return A.length
}}
}}
});
angular.module("uib/template/modal/backdrop.html",[]).run(["$templateCache",function(A){A.put("uib/template/modal/backdrop.html",'<div class="maskl"\n     uib-modal-animation-class="fade"\n     modal-in-class="in"\n     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"\n></div>\n')
}]);
angular.module("uib/template/modal/window.html",[]).run(["$templateCache",function(A){A.put("uib/template/modal/window.html",'<div modal-render="{{$isRendered}}" tabindex="-1" role="dialog" class="modal"\n    uib-modal-animation-class="fade"\n    modal-in-class="in"\n    ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}">\n    <div  uib-modal-transclude></div>\n</div>\n')
}]);