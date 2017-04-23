(function(D,B,F){var C=B.module("ngTouch",[]);
function A(G){return B.lowercase(G.nodeName||(G[0]&&G[0].nodeName))
}C.factory("$swipe",[function(){var J=10;
var I={mouse:{start:"mousedown",move:"mousemove",end:"mouseup"},touch:{start:"touchstart",move:"touchmove",end:"touchend",cancel:"touchcancel"}};
function G(L){var K=L.originalEvent||L;
var N=K.touches&&K.touches.length?K.touches:[K];
var M=(K.changedTouches&&K.changedTouches[0])||N[0];
return{x:M.clientX,y:M.clientY}
}function H(K,M){var L=[];
B.forEach(K,function(N){var O=I[N][M];
if(O){L.push(O)
}});
return L.join(" ")
}return{bind:function(P,K,L){var O,M;
var R;
var Q;
var N=false;
L=L||["mouse","touch"];
P.on(H(L,"start"),function(T){R=G(T);
N=true;
O=0;
M=0;
Q=R;
K.start&&K.start(R,T)
});
var S=H(L,"cancel");
if(S){P.on(S,function(T){N=false;
K.cancel&&K.cancel(T)
})
}P.on(H(L,"move"),function(T){if(!N){return 
}if(!R){return 
}var U=G(T);
O+=Math.abs(U.x-Q.x);
M+=Math.abs(U.y-Q.y);
Q=U;
if(O<J&&M<J){return 
}if(M>O){N=false;
K.cancel&&K.cancel(T);
return 
}else{T.preventDefault();
K.move&&K.move(U,T)
}});
P.on(H(L,"end"),function(T){if(!N){return 
}N=false;
K.end&&K.end(G(T),T)
})
}}
}]);
C.config(["$provide",function(G){G.decorator("ngClickDirective",["$delegate",function(H){H.shift();
return H
}])
}]);
C.directive("ngClick",["$parse","$timeout","$rootElement",function(N,L,V){var T=750;
var S=12;
var O=2500;
var R=25;
var K="ng-click-active";
var Q;
var J;
var H;
function G(X,Z,W,Y){return Math.abs(X-W)<R&&Math.abs(Z-Y)<R
}function M(Z,W,Y){for(var X=0;
X<Z.length;
X+=2){if(G(Z[X],Z[X+1],W,Y)){Z.splice(X,X+2);
return true
}}return false
}function U(X){if(Date.now()-Q>O){return 
}var Y=X.touches&&X.touches.length?X.touches:[X];
var W=Y[0].clientX;
var Z=Y[0].clientY;
if(W<1&&Z<1){return 
}if(H&&H[0]===W&&H[1]===Z){return 
}if(H){H=null
}if(A(X.target)==="label"){H=[W,Z]
}if(M(J,W,Z)){return 
}X.stopPropagation();
X.preventDefault();
X.target&&X.target.blur&&X.target.blur()
}function P(X){var Y=X.touches&&X.touches.length?X.touches:[X];
var W=Y[0].clientX;
var Z=Y[0].clientY;
J.push(W,Z);
L(function(){for(var a=0;
a<J.length;
a+=2){if(J[a]==W&&J[a+1]==Z){J.splice(a,a+2);
return 
}}},O,false)
}function I(W,X){if(!J){V[0].addEventListener("click",U,true);
V[0].addEventListener("touchstart",P,true);
J=[]
}Q=Date.now();
M(J,W,X)
}return function(f,a,c){var d=N(c.ngClick),e=false,b,Y,X,W;
function Z(){e=false;
a.removeClass(K)
}a.on("touchstart",function(h){e=true;
b=h.target?h.target:h.srcElement;
if(b.nodeType==3){b=b.parentNode
}a.addClass(K);
Y=Date.now();
var g=h.originalEvent||h;
var j=g.touches&&g.touches.length?g.touches:[g];
var i=j[0];
X=i.clientX;
W=i.clientY
});
a.on("touchcancel",function(g){Z()
});
a.on("touchend",function(i){var l=Date.now()-Y;
var h=i.originalEvent||i;
var k=(h.changedTouches&&h.changedTouches.length)?h.changedTouches:((h.touches&&h.touches.length)?h.touches:[h]);
var j=k[0];
var g=j.clientX;
var n=j.clientY;
var m=Math.sqrt(Math.pow(g-X,2)+Math.pow(n-W,2));
if(e&&l<T&&m<S){I(g,n);
if(b){b.blur()
}if(!B.isDefined(c.disabled)||c.disabled===false){a.triggerHandler("click",[i])
}}Z()
});
a.onclick=function(g){};
a.on("click",function(g,h){f.$apply(function(){d(f,{$event:(h||g)})
})
});
a.on("mousedown",function(g){a.addClass(K)
});
a.on("mousemove mouseup",function(g){a.removeClass(K)
})
}
}]);
function E(I,H,G){C.directive(I,["$parse","$swipe",function(L,N){var M=75;
var K=0.3;
var J=30;
return function(R,Q,O){var U=L(O[I]);
var T,S;
function V(Y){if(!T){return false
}var W=Math.abs(Y.y-T.y);
var X=(Y.x-T.x)*H;
return S&&W<M&&X>0&&X>J&&W/X<K
}var P=["touch"];
if(!B.isDefined(O.ngSwipeDisableMouse)){P.push("mouse")
}N.bind(Q,{start:function(X,W){T=X;
S=true
},cancel:function(W){S=false
},end:function(X,W){if(V(X)){R.$apply(function(){Q.triggerHandler(G);
U(R,{$event:W})
})
}}},P)
}
}])
}E("ngSwipeLeft",-1,"swipeleft");
E("ngSwipeRight",1,"swiperight")
})(window,window.angular);