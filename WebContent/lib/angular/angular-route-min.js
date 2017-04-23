(function(E,F,B){var G=F.module("ngRoute",["ng"]).provider("$route",H),D=F.$$minErr("ngRoute");
function H(){function L(N,M){return F.extend(Object.create(N),M)
}var J={};
this.when=function(P,N){var O=F.copy(N);
if(F.isUndefined(O.reloadOnSearch)){O.reloadOnSearch=true
}if(F.isUndefined(O.caseInsensitiveMatch)){O.caseInsensitiveMatch=this.caseInsensitiveMatch
}J[P]=F.extend(O,P&&K(P,O));
if(P){var M=(P[P.length-1]=="/")?P.substr(0,P.length-1):P+"/";
J[M]=F.extend({redirectTo:P},K(M,O))
}return this
};
this.caseInsensitiveMatch=false;
function K(Q,P){var M=P.caseInsensitiveMatch,N={originalPath:Q,regexp:Q},O=N.keys=[];
Q=Q.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(S,U,T,V){var R=V==="?"?V:null;
var W=V==="*"?V:null;
O.push({name:T,optional:!!R});
U=U||"";
return""+(R?"":U)+"(?:"+(R?U:"")+(W&&"(.+?)"||"([^/]+)")+(R||"")+")"+(R||"")
}).replace(/([\/$\*])/g,"\\$1");
N.regexp=new RegExp("^"+Q+"$",M?"i":"");
return N
}this.otherwise=function(M){if(typeof M==="string"){M={redirectTo:M}
}this.when(null,M);
return this
};
this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(Y,S,Z,U,b,a,X){var Q=false,T,P,W={routes:J,reload:function(){Q=true;
Y.$evalAsync(function(){O();
N()
})
},updateParams:function(c){if(this.current&&this.current.$$route){c=F.extend({},this.current.params,c);
S.path(V(this.current.$$route.originalPath,c));
S.search(c)
}else{throw D("norout","Tried updating route when with no current route")
}}};
Y.$on("$locationChangeStart",O);
Y.$on("$locationChangeSuccess",N);
return W;
function M(h,j){var l=j.keys,e={};
if(!j.regexp){return null
}var d=j.regexp.exec(h);
if(!d){return null
}for(var f=1,g=d.length;
f<g;
++f){var k=l[f-1];
var c=d[f];
if(k&&c){e[k.name]=c
}}return e
}function O(c){var d=W.current;
T=R();
P=T&&d&&T.$$route===d.$$route&&F.equals(T.pathParams,d.pathParams)&&!T.reloadOnSearch&&!Q;
if(!P&&(d||T)){if(Y.$broadcast("$routeChangeStart",T,d).defaultPrevented){if(c){c.preventDefault()
}}}}function N(){var c=W.current;
var d=T;
if(P){c.params=d.params;
F.copy(c.params,Z);
Y.$broadcast("$routeUpdate",c)
}else{if(d||c){Q=false;
W.current=d;
if(d){if(d.redirectTo){if(F.isString(d.redirectTo)){S.path(V(d.redirectTo,d.params)).search(d.params).replace()
}else{S.url(d.redirectTo(d.pathParams,S.path(),S.search())).replace()
}}}U.when(d).then(function(){if(d){var g=F.extend({},d.resolve),e,f;
F.forEach(g,function(i,h){g[h]=F.isString(i)?b.get(i):b.invoke(i,null,null,h)
});
if(F.isDefined(e=d.template)){if(F.isFunction(e)){e=e(d.params)
}}else{if(F.isDefined(f=d.templateUrl)){if(F.isFunction(f)){f=f(d.params)
}if(F.isDefined(f)){d.loadedTemplateUrl=X.valueOf(f);
e=a(f)
}}}if(F.isDefined(e)){g["$template"]=e
}return U.all(g)
}}).then(function(e){if(d==W.current){if(d){d.locals=e;
F.copy(d.params,Z)
}Y.$broadcast("$routeChangeSuccess",d,c)
}},function(e){if(d==W.current){Y.$broadcast("$routeChangeError",d,c,e)
}})
}}}function R(){var d,c;
F.forEach(J,function(e,f){if(!c&&(d=M(S.path(),e))){c=L(e,{params:F.extend({},S.search(),d),pathParams:d});
c.$$route=e
}});
return c||J[null]&&L(J[null],{params:{},pathParams:{}})
}function V(d,e){var c=[];
F.forEach((d||"").split(":"),function(h,g){if(g===0){c.push(h)
}else{var j=h.match(/(\w+)(?:[?*])?(.*)/);
var f=j[1];
c.push(e[f]);
c.push(j[2]||"");
delete e[f]
}});
return c.join("")
}}]
}G.provider("$routeParams",A);
function A(){this.$get=function(){return{}
}
}G.directive("ngView",I);
G.directive("ngView",C);
I.$inject=["$route","$anchorScroll","$animate"];
function I(L,J,K){return{restrict:"ECA",terminal:true,priority:400,transclude:"element",link:function(W,V,R,M,S){var X,O,Q,P=R.autoscroll,U=R.onload||"";
W.$on("$routeChangeSuccess",N);
N();
function T(){if(Q){K.cancel(Q);
Q=null
}if(X){X.$destroy();
X=null
}if(O){Q=K.leave(O);
Q.then(function(){Q=null
});
O=null
}}function N(){var b=L.current&&L.current.locals,Y=b&&b.$template;
if(F.isDefined(Y)){var Z=W.$new();
var a=L.current;
var c=S(Z,function(e){K.enter(e,null,O||V).then(function d(){if(F.isDefined(P)&&(!P||W.$eval(P))){J()
}});
T()
});
O=c;
X=a.scope=Z;
X.$emit("$viewContentLoaded");
X.$eval(U)
}else{T()
}}}}
}C.$inject=["$compile","$controller","$route"];
function C(K,J,L){return{restrict:"ECA",priority:-400,link:function(O,N){var R=L.current,Q=R.locals;
N.html(Q.$template);
var P=K(N.contents());
if(R.controller){Q.$scope=O;
var M=J(R.controller,Q);
if(R.controllerAs){O[R.controllerAs]=M
}N.data("$ngControllerController",M);
N.children().data("$ngControllerController",M)
}P(O)
}}
}})(window,window.angular);