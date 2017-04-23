(function(J,N,B){N.mock={};
N.mock.$BrowserProvider=function(){this.$get=function(){return new N.mock.$Browser()
}
};
N.mock.$Browser=function(){var Q=this;
this.isMock=true;
Q.$$url="http://server/";
Q.$$lastUrl=Q.$$url;
Q.pollFns=[];
Q.$$completeOutstandingRequest=N.noop;
Q.$$incOutstandingRequestCount=N.noop;
Q.onUrlChange=function(R){Q.pollFns.push(function(){if(Q.$$lastUrl!==Q.$$url||Q.$$state!==Q.$$lastState){Q.$$lastUrl=Q.$$url;
Q.$$lastState=Q.$$state;
R(Q.$$url,Q.$$state)
}});
return R
};
Q.$$applicationDestroyed=N.noop;
Q.$$checkUrlChange=N.noop;
Q.deferredFns=[];
Q.deferredNextId=0;
Q.defer=function(S,R){R=R||0;
Q.deferredFns.push({time:(Q.defer.now+R),fn:S,id:Q.deferredNextId});
Q.deferredFns.sort(function(U,T){return U.time-T.time
});
return Q.deferredNextId++
};
Q.defer.now=0;
Q.defer.cancel=function(S){var R;
N.forEach(Q.deferredFns,function(U,T){if(U.id===S){R=T
}});
if(N.isDefined(R)){Q.deferredFns.splice(R,1);
return true
}return false
};
Q.defer.flush=function(R){if(N.isDefined(R)){Q.defer.now+=R
}else{if(Q.deferredFns.length){Q.defer.now=Q.deferredFns[Q.deferredFns.length-1].time
}else{throw new Error("No deferred tasks to be flushed")
}}while(Q.deferredFns.length&&Q.deferredFns[0].time<=Q.defer.now){Q.deferredFns.shift().fn()
}};
Q.$$baseHref="/";
Q.baseHref=function(){return this.$$baseHref
}
};
N.mock.$Browser.prototype={poll:function M(){N.forEach(this.pollFns,function(Q){Q()
})
},url:function(Q,R,S){if(N.isUndefined(S)){S=null
}if(Q){this.$$url=Q;
this.$$state=N.copy(S);
return this
}return this.$$url
},state:function(){return this.$$state
},notifyWhenNoOutstandingRequests:function(Q){Q()
}};
N.mock.$ExceptionHandlerProvider=function(){var Q;
this.mode=function(R){switch(R){case"log":case"rethrow":var S=[];
Q=function(T){if(arguments.length==1){S.push(T)
}else{S.push([].slice.call(arguments,0))
}if(R==="rethrow"){throw T
}};
Q.errors=S;
break;
default:throw new Error("Unknown mode '"+R+"', only 'log'/'rethrow' modes are allowed!")
}};
this.$get=function(){return Q
};
this.mode("rethrow")
};
N.mock.$LogProvider=function(){var Q=true;
function R(U,T,S){return U.concat(Array.prototype.slice.call(T,S))
}this.debugEnabled=function(S){if(N.isDefined(S)){Q=S;
return this
}else{return Q
}};
this.$get=function(){var S={log:function(){S.log.logs.push(R([],arguments,0))
},warn:function(){S.warn.logs.push(R([],arguments,0))
},info:function(){S.info.logs.push(R([],arguments,0))
},error:function(){S.error.logs.push(R([],arguments,0))
},debug:function(){if(Q){S.debug.logs.push(R([],arguments,0))
}}};
S.reset=function(){S.log.logs=[];
S.info.logs=[];
S.warn.logs=[];
S.error.logs=[];
S.debug.logs=[]
};
S.assertEmpty=function(){var T=[];
N.forEach(["error","warn","info","log","debug"],function(U){N.forEach(S[U].logs,function(V){N.forEach(V,function(W){T.push("MOCK $log ("+U+"): "+String(W)+"\n"+(W.stack||""))
})
})
});
if(T.length){T.unshift("Expected $log to be empty! Either a message was logged unexpectedly, or an expected log message was not checked and removed:");
T.push("");
throw new Error(T.join("\n---------\n"))
}};
S.reset();
return S
}
};
N.mock.$IntervalProvider=function(){this.$get=["$browser","$rootScope","$q","$$q",function(R,Q,U,S){var W=[],T=0,V=0;
var X=function(g,b,e,d){var a=arguments.length>4,f=a?Array.prototype.slice.call(arguments,4):[],Y=0,Z=(N.isDefined(d)&&!d),h=(Z?S:U).defer(),i=h.promise;
e=(N.isDefined(e))?e:0;
i.then(null,null,(!a)?g:function(){g.apply(null,f)
});
i.$$intervalId=T;
function c(){h.notify(Y++);
if(e>0&&Y>=e){var j;
h.resolve(Y);
N.forEach(W,function(l,k){if(l.id===i.$$intervalId){j=k
}});
if(N.isDefined(j)){W.splice(j,1)
}}if(Z){R.defer.flush()
}else{Q.$apply()
}}W.push({nextTime:(V+b),delay:b,fn:c,id:T,deferred:h});
W.sort(function(k,j){return k.nextTime-j.nextTime
});
T++;
return i
};
X.cancel=function(Z){if(!Z){return false
}var Y;
N.forEach(W,function(b,a){if(b.id===Z.$$intervalId){Y=a
}});
if(N.isDefined(Y)){W[Y].deferred.reject("canceled");
W.splice(Y,1);
return true
}return false
};
X.flush=function(Z){V+=Z;
while(W.length&&W[0].nextTime<=V){var Y=W[0];
Y.fn();
Y.nextTime+=Y.delay;
W.sort(function(d,c){return d.nextTime-c.nextTime
})
}return Z
};
return X
}]
};
var E=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?:\:?(\d\d)(?:\:?(\d\d)(?:\.(\d{3}))?)?)?(Z|([+-])(\d\d):?(\d\d)))?$/;
function C(U){var T;
if(T=U.match(E)){var S=new Date(0),R=0,Q=0;
if(T[9]){R=I(T[9]+T[10]);
Q=I(T[9]+T[11])
}S.setUTCFullYear(I(T[1]),I(T[2])-1,I(T[3]));
S.setUTCHours(I(T[4]||0)-R,I(T[5]||0)-Q,I(T[6]||0),I(T[7]||0));
return S
}return U
}function I(Q){return parseInt(Q,10)
}function O(R,S,Q){var T="";
if(R<0){T="-";
R=-R
}R=""+R;
while(R.length<S){R="0"+R
}if(Q){R=R.substr(R.length-S)
}return T+R
}N.mock.TzDate=function(V,T){var Q=new Date(0);
if(N.isString(T)){var R=T;
Q.origDate=C(T);
T=Q.origDate.getTime();
if(isNaN(T)){throw {name:"Illegal Argument",message:"Arg '"+R+"' passed into TzDate constructor is not a valid date string"}
}}else{Q.origDate=new Date(T)
}var U=new Date(T).getTimezoneOffset();
Q.offsetDiff=U*60*1000-V*1000*60*60;
Q.date=new Date(T+Q.offsetDiff);
Q.getTime=function(){return Q.date.getTime()-Q.offsetDiff
};
Q.toLocaleDateString=function(){return Q.date.toLocaleDateString()
};
Q.getFullYear=function(){return Q.date.getFullYear()
};
Q.getMonth=function(){return Q.date.getMonth()
};
Q.getDate=function(){return Q.date.getDate()
};
Q.getHours=function(){return Q.date.getHours()
};
Q.getMinutes=function(){return Q.date.getMinutes()
};
Q.getSeconds=function(){return Q.date.getSeconds()
};
Q.getMilliseconds=function(){return Q.date.getMilliseconds()
};
Q.getTimezoneOffset=function(){return V*60
};
Q.getUTCFullYear=function(){return Q.origDate.getUTCFullYear()
};
Q.getUTCMonth=function(){return Q.origDate.getUTCMonth()
};
Q.getUTCDate=function(){return Q.origDate.getUTCDate()
};
Q.getUTCHours=function(){return Q.origDate.getUTCHours()
};
Q.getUTCMinutes=function(){return Q.origDate.getUTCMinutes()
};
Q.getUTCSeconds=function(){return Q.origDate.getUTCSeconds()
};
Q.getUTCMilliseconds=function(){return Q.origDate.getUTCMilliseconds()
};
Q.getDay=function(){return Q.date.getDay()
};
if(Q.toISOString){Q.toISOString=function(){return O(Q.origDate.getUTCFullYear(),4)+"-"+O(Q.origDate.getUTCMonth()+1,2)+"-"+O(Q.origDate.getUTCDate(),2)+"T"+O(Q.origDate.getUTCHours(),2)+":"+O(Q.origDate.getUTCMinutes(),2)+":"+O(Q.origDate.getUTCSeconds(),2)+"."+O(Q.origDate.getUTCMilliseconds(),3)+"Z"
}
}var S=["getUTCDay","getYear","setDate","setFullYear","setHours","setMilliseconds","setMinutes","setMonth","setSeconds","setTime","setUTCDate","setUTCFullYear","setUTCHours","setUTCMilliseconds","setUTCMinutes","setUTCMonth","setUTCSeconds","setYear","toDateString","toGMTString","toJSON","toLocaleFormat","toLocaleString","toLocaleTimeString","toSource","toString","toTimeString","toUTCString","valueOf"];
N.forEach(S,function(W){Q[W]=function(){throw new Error("Method '"+W+"' is not implemented in the TzDate mock")
}
});
return Q
};
N.mock.TzDate.prototype=Date.prototype;
N.mock.animate=N.module("ngAnimateMock",["ng"]).config(["$provide",function(Q){Q.factory("$$forceReflow",function(){function R(){R.totalReflows++
}R.totalReflows=0;
return R
});
Q.factory("$$animateAsyncRun",function(){var R=[];
var S=function(){return function(T){R.push(T)
}
};
S.flush=function(){if(R.length===0){return false
}for(var T=0;
T<R.length;
T++){R[T]()
}R=[];
return true
};
return S
});
Q.decorator("$animate",["$delegate","$timeout","$browser","$$rAF","$$forceReflow","$$animateAsyncRun","$rootScope",function(V,W,S,Y,T,X,R){var U={queue:[],cancel:V.cancel,on:V.on,off:V.off,pin:V.pin,get reflowsfunction(){return T.totalReflows
},enabled:V.enabled,flush:function(){R.$digest();
var Z,a=false;
do{Z=false;
if(Y.queue.length){Y.flush();
Z=a=true
}if(X.flush()){Z=a=true
}}while(Z);
if(!a){throw new Error("No pending animations ready to be closed or flushed")
}R.$digest()
}};
N.forEach(["animate","enter","leave","move","addClass","removeClass","setClass"],function(Z){U[Z]=function(){U.queue.push({event:Z,element:arguments[0],options:arguments[arguments.length-1],args:arguments});
return V[Z].apply(V,arguments)
}
});
return U
}])
}]);
N.mock.dump=function(Q){return R(Q);
function R(U){var T;
if(N.isElement(U)){U=N.element(U);
T=N.element("<div></div>");
N.forEach(U,function(V){T.append(N.element(V).clone())
});
T=T.html()
}else{if(N.isArray(U)){T=[];
N.forEach(U,function(V){T.push(R(V))
});
T="[ "+T.join(", ")+" ]"
}else{if(N.isObject(U)){if(N.isFunction(U.$eval)&&N.isFunction(U.$apply)){T=S(U)
}else{if(U instanceof Error){T=U.stack||(""+U.name+": "+U.message)
}else{T=N.toJson(U,true)
}}}else{T=String(U)
}}}return T
}function S(V,W){W=W||"  ";
var U=[W+"Scope("+V.$id+"): {"];
for(var T in V){if(Object.prototype.hasOwnProperty.call(V,T)&&!T.match(/^(\$|this)/)){U.push("  "+T+": "+N.toJson(V[T]))
}}var X=V.$$childHead;
while(X){U.push(S(X,W+"  "));
X=X.$$nextSibling
}U.push("}");
return U.join("\n"+W)
}};
N.mock.$HttpBackendProvider=function(){this.$get=["$rootScope","$timeout",H]
};
function H(Z,T,U,b){var a=[],S=[],X=[],V=N.bind(X,X.push),Q=N.copy;
function W(c,d,f,e){if(N.isFunction(c)){return c
}return function(){return N.isNumber(c)?[c,d,f,e]:[200,c,d,f]
}
}function Y(c,d,l,o,g,n,j){var p=new F(),e=S[0],m=false;
function h(i){return(N.isString(i)||N.isFunction(i)||i instanceof RegExp)?i:N.toJson(i)
}function q(i){if(!b&&n){n.then?n.then(s):T(s,n)
}return r;
function r(){var t=i.response(c,d,l,g);
p.$$respHeaders=t[2];
o(Q(t[0]),Q(t[1]),p.getAllResponseHeaders(),Q(t[3]||""))
}function s(){for(var t=0,u=X.length;
t<u;
t++){if(X[t]===r){X.splice(t,1);
o(-1,B,"");
break
}}}}if(e&&e.match(c,d)){if(!e.matchData(l)){throw new Error("Expected "+e+" with different data\nEXPECTED: "+h(e.data)+"\nGOT:      "+l)
}if(!e.matchHeaders(g)){throw new Error("Expected "+e+" with different headers\nEXPECTED: "+h(e.headers)+"\nGOT:      "+h(g))
}S.shift();
if(e.response){X.push(q(e));
return 
}m=true
}var k=-1,f;
while((f=a[++k])){if(f.match(c,d,l,g||{})){if(f.response){(b?b.defer:V)(q(f))
}else{if(f.passThrough){U(c,d,l,o,g,n,j)
}else{throw new Error("No response defined !")
}}return 
}}throw m?new Error("No response defined !"):new Error("Unexpected request: "+c+" "+d+"\n"+(e?"Expected "+e:"No more request expected"))
}Y.when=function(h,c,f,g){var e=new D(h,c,f,g),d={respond:function(i,j,l,k){e.passThrough=B;
e.response=W(i,j,l,k);
return d
}};
if(b){d.passThrough=function(){e.response=B;
e.passThrough=true;
return d
}
}a.push(e);
return d
};
R("when");
Y.expect=function(h,d,f,g){var c=new D(h,d,f,g),e={respond:function(i,j,l,k){c.response=W(i,j,l,k);
return e
}};
S.push(c);
return e
};
R("expect");
Y.flush=function(c,d){if(d!==false){Z.$digest()
}if(!X.length){throw new Error("No pending request to flush !")
}if(N.isDefined(c)&&c!==null){while(c--){if(!X.length){throw new Error("No more pending request to flush !")
}X.shift()()
}}else{while(X.length){X.shift()()
}}Y.verifyNoOutstandingExpectation(d)
};
Y.verifyNoOutstandingExpectation=function(c){if(c!==false){Z.$digest()
}if(S.length){throw new Error("Unsatisfied requests: "+S.join(", "))
}};
Y.verifyNoOutstandingRequest=function(){if(X.length){throw new Error("Unflushed requests: "+X.length)
}};
Y.resetExpectations=function(){S.length=0;
X.length=0
};
return Y;
function R(c){N.forEach(["GET","DELETE","JSONP","HEAD"],function(d){Y[c+d]=function(e,f){return Y[c](d,e,B,f)
}
});
N.forEach(["PUT","POST","PATCH"],function(d){Y[c+d]=function(e,f,g){return Y[c](d,e,f,g)
}
})
}}function D(T,Q,R,S){this.data=R;
this.headers=S;
this.match=function(U,V,X,W){if(T!=U){return false
}if(!this.matchUrl(V)){return false
}if(N.isDefined(X)&&!this.matchData(X)){return false
}if(N.isDefined(W)&&!this.matchHeaders(W)){return false
}return true
};
this.matchUrl=function(U){if(!Q){return true
}if(N.isFunction(Q.test)){return Q.test(U)
}if(N.isFunction(Q)){return Q(U)
}return Q==U
};
this.matchHeaders=function(U){if(N.isUndefined(S)){return true
}if(N.isFunction(S)){return S(U)
}return N.equals(S,U)
};
this.matchData=function(U){if(N.isUndefined(R)){return true
}if(R&&N.isFunction(R.test)){return R.test(U)
}if(R&&N.isFunction(R)){return R(U)
}if(R&&!N.isString(R)){return N.equals(N.fromJson(N.toJson(R)),N.fromJson(U))
}return R==U
};
this.toString=function(){return T+" "+Q
}
}function G(){return new F()
}function F(){F.$$lastInstance=this;
this.open=function(S,Q,R){this.$$method=S;
this.$$url=Q;
this.$$async=R;
this.$$reqHeaders={};
this.$$respHeaders={}
};
this.send=function(Q){this.$$data=Q
};
this.setRequestHeader=function(Q,R){this.$$reqHeaders[Q]=R
};
this.getResponseHeader=function(Q){var R=this.$$respHeaders[Q];
if(R){return R
}Q=N.lowercase(Q);
R=this.$$respHeaders[Q];
if(R){return R
}R=B;
N.forEach(this.$$respHeaders,function(S,T){if(!R&&N.lowercase(T)==Q){R=S
}});
return R
};
this.getAllResponseHeaders=function(){var Q=[];
N.forEach(this.$$respHeaders,function(S,R){Q.push(R+": "+S)
});
return Q.join("\n")
};
this.abort=N.noop
}N.mock.$TimeoutDecorator=["$delegate","$browser",function(S,Q){S.flush=function(T){Q.defer.flush(T)
};
S.verifyNoPendingTasks=function(){if(Q.deferredFns.length){throw new Error("Deferred tasks to flush ("+Q.deferredFns.length+"): "+R(Q.deferredFns))
}};
function R(U){var T=[];
N.forEach(U,function(V){T.push("{id: "+V.id+", time: "+V.time+"}")
});
return T.join(", ")
}return S
}];
N.mock.$RAFDecorator=["$delegate",function(R){var Q=function(T){var S=Q.queue.length;
Q.queue.push(T);
return function(){Q.queue.splice(S,1)
}
};
Q.queue=[];
Q.supported=R.supported;
Q.flush=function(){if(Q.queue.length===0){throw new Error("No rAF callbacks present")
}var T=Q.queue.length;
for(var S=0;
S<T;
S++){Q.queue[S]()
}Q.queue=Q.queue.slice(S)
};
return Q
}];
N.mock.$RootElementProvider=function(){this.$get=function(){return N.element("<div ng-app></div>")
}
};
N.mock.$ControllerDecorator=["$delegate",function(Q){return function(V,U,R,T){if(R&&typeof R==="object"){var S=Q(V,U,true,T);
N.extend(S.instance,R);
return S()
}return Q(V,U,R,T)
}
}];
N.module("ngMock",["ng"]).provider({$browser:N.mock.$BrowserProvider,$exceptionHandler:N.mock.$ExceptionHandlerProvider,$log:N.mock.$LogProvider,$interval:N.mock.$IntervalProvider,$httpBackend:N.mock.$HttpBackendProvider,$rootElement:N.mock.$RootElementProvider}).config(["$provide",function(Q){Q.decorator("$timeout",N.mock.$TimeoutDecorator);
Q.decorator("$$rAF",N.mock.$RAFDecorator);
Q.decorator("$rootScope",N.mock.$RootScopeDecorator);
Q.decorator("$controller",N.mock.$ControllerDecorator)
}]);
N.module("ngMockE2E",["ng"]).config(["$provide",function(Q){Q.decorator("$httpBackend",N.mock.e2e.$httpBackendDecorator)
}]);
N.mock.e2e={};
N.mock.e2e.$httpBackendDecorator=["$rootScope","$timeout","$delegate","$browser",H];
N.mock.$RootScopeDecorator=["$delegate",function(R){var S=Object.getPrototypeOf(R);
S.$countChildScopes=T;
S.$countWatchers=Q;
return R;
function T(){var V=0;
var W=[this.$$childHead];
var U;
while(W.length){U=W.shift();
while(U){V+=1;
W.push(U.$$childHead);
U=U.$$nextSibling
}}return V
}function Q(){var V=this.$$watchers?this.$$watchers.length:0;
var W=[this.$$childHead];
var U;
while(W.length){U=W.shift();
while(U){V+=U.$$watchers?U.$$watchers.length:0;
W.push(U.$$childHead);
U=U.$$nextSibling
}}return V
}}];
if(J.jasmine||J.mocha){var P=null,L=[],K=function(){return !!P
};
N.mock.$$annotate=N.injector.$$annotate;
N.injector.$$annotate=function(Q){if(typeof Q==="function"&&!Q.$inject){L.push(Q)
}return N.mock.$$annotate.apply(this,arguments)
};
(J.beforeEach||J.setup)(function(){L=[];
P=this
});
(J.afterEach||J.teardown)(function(){var Q=P.$injector;
L.forEach(function(R){delete R.$inject
});
N.forEach(P.$modules,function(R){if(R&&R.$$hashKey){R.$$hashKey=B
}});
P.$injector=null;
P.$modules=null;
P=null;
if(Q){Q.get("$rootElement").off()
}N.forEach(N.element.fragments,function(S,R){delete N.element.fragments[R]
});
F.$$lastInstance=null;
N.forEach(N.callbacks,function(S,R){delete N.callbacks[R]
});
N.callbacks.counter=0
});
J.module=N.mock.module=function(){var Q=Array.prototype.slice.call(arguments,0);
return K()?R():R;
function R(){if(P.$injector){throw new Error("Injector already created, can not register a module!")
}else{var S=P.$modules||(P.$modules=[]);
N.forEach(Q,function(T){if(N.isObject(T)&&!N.isArray(T)){S.push(function(U){N.forEach(T,function(W,V){U.value(V,W)
})
})
}else{S.push(T)
}})
}}};
var A=function(R,Q){this.message=R.message;
this.name=R.name;
if(R.line){this.line=R.line
}if(R.sourceId){this.sourceId=R.sourceId
}if(R.stack&&Q){this.stack=R.stack+"\n"+Q.stack
}if(R.stackArray){this.stackArray=R.stackArray
}};
A.prototype.toString=Error.prototype.toString;
J.inject=N.mock.inject=function(){var Q=Array.prototype.slice.call(arguments,0);
var S=new Error("Declaration Location");
return K()?R.call(P):R;
function R(){var T=P.$modules||[];
var W=!!P.$injectorStrict;
T.unshift("ngMock");
T.unshift("ng");
var Y=P.$injector;
if(!Y){if(W){N.forEach(T,function(Z){if(typeof Z==="function"){N.injector.$$annotate(Z)
}})
}Y=P.$injector=N.injector(T,W);
P.$injectorStrict=W
}for(var U=0,V=Q.length;
U<V;
U++){if(P.$injectorStrict){Y.annotate(Q[U])
}try{Y.invoke(Q[U]||N.noop,this)
}catch(X){if(X.stack&&S){throw new A(X,S)
}throw X
}finally{S=null
}}}};
N.mock.inject.strictDi=function(R){R=arguments.length?!!R:true;
return K()?Q():Q;
function Q(){if(R!==P.$injectorStrict){if(P.$injector){throw new Error("Injector already created, can not modify strict annotations")
}else{P.$injectorStrict=R
}}}}
}})(window,window.angular);