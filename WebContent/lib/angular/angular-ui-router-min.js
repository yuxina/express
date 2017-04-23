if(typeof module!=="undefined"&&typeof exports!=="undefined"&&module.exports===exports){module.exports="ui.router"
}(function(d,U,L){var S=U.isDefined,Q=U.isFunction,H=U.isString,b=U.isObject,T=U.isArray,A=U.forEach,K=U.extend,h=U.copy;
function O(m,l){return K(new (K(function(){},{prototype:m}))(),l)
}function c(l){A(arguments,function(m){if(m!==l){A(m,function(o,n){if(!l.hasOwnProperty(n)){l[n]=o
}})
}});
return l
}function E(o,l){var m=[];
for(var p in o.path){if(o.path[p]!==l.path[p]){break
}m.push(o.path[p])
}return m
}function Y(m){if(Object.keys){return Object.keys(m)
}var l=[];
U.forEach(m,function(o,n){l.push(n)
});
return l
}function g(o,m){if(Array.prototype.indexOf){return o.indexOf(m,Number(arguments[2])||0)
}var l=o.length>>>0,n=Number(arguments[2])||0;
n=(n<0)?Math.ceil(n):Math.floor(n);
if(n<0){n+=l
}for(;
n<l;
n++){if(n in o&&o[n]===m){return n
}}return -1
}function e(s,o,l,r){var t=E(l,r),u,p={},q=[];
for(var n in t){if(!t[n].params||!t[n].params.length){continue
}u=t[n].params;
for(var m in u){if(g(q,u[m])>=0){continue
}q.push(u[m]);
p[u[m]]=s[u[m]]
}}return K({},p,o)
}function f(m,l){var n={};
A(m,function(o){var p=l[o];
n[o]=(p!=null)?String(p):null
});
return n
}function W(m,l,q){if(!q){q=[];
for(var r in m){q.push(r)
}}for(var p=0;
p<q.length;
p++){var o=q[p];
if(m[o]!=l[o]){return false
}}return true
}function D(n,l){var m={};
A(n,function(o){m[o]=l[o]
});
return m
}U.module("ui.router.util",["ng"]);
U.module("ui.router.router",["ui.router.util"]);
U.module("ui.router.state",["ui.router.router","ui.router.util"]);
U.module("ui.router",["ui.router.state"]);
U.module("ui.router.compat",["ui.router"]);
C.$inject=["$q","$injector"];
function C(n,r){var m=1,s=2,o={},q=[],p=o,l=K(n.when(o),{$$promises:o,$$values:o});
this.study=function(v){if(!b(v)){throw new Error("'invocables' must be an object")
}var y=[],x=[],u={};
function w(AA,z){if(u[z]===s){return 
}x.push(z);
if(u[z]===m){x.splice(0,x.indexOf(z));
throw new Error("Cyclic dependency: "+x.join(" -> "))
}u[z]=m;
if(H(AA)){y.push(z,[function(){return r.get(AA)
}],q)
}else{var AB=r.annotate(AA);
A(AB,function(AC){if(AC!==z&&v.hasOwnProperty(AC)){w(v[AC],AC)
}});
y.push(z,AA,AB)
}x.pop();
u[z]=s
}A(v,w);
v=x=u=null;
function t(z){return b(z)&&z.then&&z.$$promises
}return function(z,AI,AL){if(t(z)&&AL===L){AL=AI;
AI=z;
z=null
}if(!z){z=p
}else{if(!b(z)){throw new Error("'locals' must be an object")
}}if(!AI){AI=l
}else{if(!t(AI)){throw new Error("'parent' must be a promise returned by $resolve.resolve()")
}}var AB=n.defer(),AM=AB.promise,AG=AM.$$promises={},AJ=K({},z),AF=1+y.length/3,AH=false;
function AD(){if(!--AF){if(!AH){c(AJ,AI.$$values)
}AM.$$values=AJ;
AM.$$promises=true;
AB.resolve(AJ)
}}function AA(AN){AM.$$failure=AN;
AB.reject(AN)
}if(S(AI.$$failure)){AA(AI.$$failure);
return AM
}if(AI.$$values){AH=c(AJ,AI.$$values);
AD()
}else{K(AG,AI.$$promises);
AI.then(AD,AA)
}for(var AE=0,AK=y.length;
AE<AK;
AE+=3){if(z.hasOwnProperty(y[AE])){AD()
}else{AC(y[AE],y[AE+1],y[AE+2])
}}function AC(AN,AO,AT){var AS=n.defer(),AR=0;
function AQ(AU){AS.reject(AU);
AA(AU)
}A(AT,function(AU){if(AG.hasOwnProperty(AU)&&!z.hasOwnProperty(AU)){AR++;
AG[AU].then(function(AV){AJ[AU]=AV;
if(!(--AR)){AP()
}},AQ)
}});
if(!AR){AP()
}function AP(){if(S(AM.$$failure)){return 
}try{AS.resolve(r.invoke(AO,AL,AJ));
AS.promise.then(function(AV){AJ[AN]=AV;
AD()
},AQ)
}catch(AU){AQ(AU)
}}AG[AN]=AS.promise
}return AM
}
};
this.resolve=function(u,w,v,t){return this.study(u)(w,v,t)
}
}U.module("ui.router.util").service("$resolve",C);
R.$inject=["$http","$templateCache","$injector"];
function R(n,l,m){this.fromConfig=function(o,q,p){return(S(o.template)?this.fromString(o.template,q):S(o.templateUrl)?this.fromUrl(o.templateUrl,q):S(o.templateProvider)?this.fromProvider(o.templateProvider,q,p):null)
};
this.fromString=function(o,p){return Q(o)?o(p):o
};
this.fromUrl=function(o,p){if(Q(o)){o=o(p)
}if(o==null){return null
}else{return n.get(o,{cache:l}).then(function(q){return q.data
})
}};
this.fromProvider=function(q,p,o){return m.invoke(q,null,o||{params:p})
}
}U.module("ui.router.util").service("$templateFactory",R);
function Z(u){var y=/([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,v={},w="^",z=0,n,r=this.segments=[],o=this.params=[];
function x(m){if(!/^\w+(-+\w+)*$/.test(m)){throw new Error("Invalid parameter name '"+m+"' in pattern '"+u+"'")
}if(v[m]){throw new Error("Duplicate parameter name '"+m+"' in pattern '"+u+"'")
}v[m]=true;
o.push(m)
}function p(m){return m.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&")
}this.source=u;
var l,t,s;
while((n=y.exec(u))){l=n[2]||n[3];
t=n[4]||(n[1]=="*"?".*":"[^/]*");
s=u.substring(z,n.index);
if(s.indexOf("?")>=0){break
}w+=p(s)+"("+t+")";
x(l);
r.push(s);
z=y.lastIndex
}s=u.substring(z);
var q=s.indexOf("?");
if(q>=0){var AA=this.sourceSearch=s.substring(q);
s=s.substring(0,q);
this.sourcePath=u.substring(0,z+q);
A(AA.substring(1).split(/[&?]/),x)
}else{this.sourcePath=u;
this.sourceSearch=""
}w+=p(s)+"$";
r.push(s);
this.regexp=new RegExp(w);
this.prefix=r[0]
}Z.prototype.concat=function(l){return new Z(this.sourcePath+l+this.sourceSearch)
};
Z.prototype.toString=function(){return this.source
};
Z.prototype.exec=function(r,t){var l=this.regexp.exec(r);
if(!l){return null
}var s=this.params,o=s.length,q=this.segments.length-1,n={},p;
if(q!==l.length-1){throw new Error("Unbalanced capture group in route '"+this.source+"'")
}for(p=0;
p<q;
p++){n[s[p]]=l[p+1]
}for(;
p<o;
p++){n[s[p]]=t[s[p]]
}return n
};
Z.prototype.parameters=function(){return this.params
};
Z.prototype.format=function(r){var o=this.segments,m=this.params;
if(!r){return o.join("")
}var p=o.length-1,l=m.length,t=o[0],n,s,q;
for(n=0;
n<p;
n++){q=r[m[n]];
if(q!=null){t+=encodeURIComponent(q)
}t+=o[n+1]
}for(;
n<l;
n++){q=r[m[n]];
if(q!=null){t+=(s?"&":"?")+m[n]+"="+encodeURIComponent(q);
s=true
}}return t
};
function G(){this.compile=function(l){return new Z(l)
};
this.isMatcher=function(l){return b(l)&&Q(l.exec)&&Q(l.format)&&Q(l.concat)
};
this.$get=function(){return this
}
}U.module("ui.router.util").provider("$urlMatcherFactory",G);
B.$inject=["$urlMatcherFactoryProvider"];
function B(o){var q=[],m=null;
function p(r){var s=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(r.source);
return(s!=null)?s[1].replace(/\\(.)/g,"$1"):""
}function n(s,r){return s.replace(/\$(\$|\d{1,2})/,function(t,u){return r[u==="$"?0:Number(u)]
})
}this.rule=function(r){if(!Q(r)){throw new Error("'rule' must be a function")
}q.push(r);
return this
};
this.otherwise=function(r){if(H(r)){var s=r;
r=function(){return s
}
}else{if(!Q(r)){throw new Error("'rule' must be a function")
}}m=r;
return this
};
function l(u,t,s){if(!s){return false
}var r=u.invoke(t,t,{$match:s});
return S(r)?r:true
}this.when=function(u,s){var x,v=H(s);
if(H(u)){u=o.compile(u)
}if(!v&&!Q(s)&&!T(s)){throw new Error("invalid 'handler' in when()")
}var t={matcher:function(z,y){if(v){x=o.compile(y);
y=["$match",function(AA){return x.format(AA)
}]
}return K(function(AA,AB){return l(AA,y,z.exec(AB.path(),AB.search()))
},{prefix:H(z.prefix)?z.prefix:""})
},regex:function(z,y){if(z.global||z.sticky){throw new Error("when() RegExp must not be global or sticky")
}if(v){x=y;
y=["$match",function(AA){return n(x,AA)
}]
}return K(function(AA,AB){return l(AA,y,z.exec(AB.path()))
},{prefix:p(z)})
}};
var r={matcher:o.isMatcher(u),regex:u instanceof RegExp};
for(var w in r){if(r[w]){return this.rule(t[w](u,s))
}}throw new Error("invalid 'what' in when()")
};
this.$get=["$location","$rootScope","$injector",function(u,r,s){function t(w){if(w&&w.defaultPrevented){return 
}function v(AA){var z=AA(s,u);
if(z){if(H(z)){u.replace().url(z)
}return true
}return false
}var y=q.length,x;
for(x=0;
x<y;
x++){if(v(q[x])){return 
}}if(m){v(m)
}}r.$on("$locationChangeSuccess",t);
return{sync:function(){t()
}}
}]
}U.module("ui.router.router").provider("$urlRouter",B);
M.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider","$locationProvider"];
function M(t,AD,AA){var x,s={},AC,y={},p="abstract";
var u={parent:function(AF){if(S(AF.parent)&&AF.parent){return o(AF.parent)
}var AE=/^(.+)\.[^.]+$/.exec(AF.name);
return AE?o(AE[1]):x
},data:function(AE){if(AE.parent&&AE.parent.data){AE.data=AE.self.data=K({},AE.parent.data,AE.data)
}return AE.data
},url:function(AF){var AE=AF.url;
if(H(AE)){if(AE.charAt(0)=="^"){return AD.compile(AE.substring(1))
}return(AF.parent.navigable||x).url.concat(AE)
}if(AD.isMatcher(AE)||AE==null){return AE
}throw new Error("Invalid url '"+AE+"' in state '"+AF+"'")
},navigable:function(AE){return AE.url?AE:(AE.parent?AE.parent.navigable:null)
},params:function(AE){if(!AE.params){return AE.url?AE.url.parameters():AE.parent.params
}if(!T(AE.params)){throw new Error("Invalid params in state '"+AE+"'")
}if(AE.url){throw new Error("Both params and url specicified in state '"+AE+"'")
}return AE.params
},views:function(AF){var AE={};
A(S(AF.views)?AF.views:{"":AF},function(AG,AH){if(AH.indexOf("@")<0){AH+="@"+AF.parent.name
}AE[AH]=AG
});
return AE
},ownParams:function(AE){if(!AE.parent){return AE.params
}var AG={};
A(AE.params,function(AH){AG[AH]=true
});
A(AE.parent.params,function(AH){if(!AG[AH]){throw new Error("Missing required parameter '"+AH+"' in state '"+AE.name+"'")
}AG[AH]=false
});
var AF=[];
A(AG,function(AH,AI){if(AH){AF.push(AI)
}});
return AF
},path:function(AE){return AE.parent?AE.parent.path.concat(AE):[]
},includes:function(AF){var AE=AF.parent?K({},AF.parent.includes):{};
AE[AF.name]=true;
return AE
},$delegates:{}};
function w(AE){return AE.indexOf(".")===0||AE.indexOf("^")===0
}function o(AH,AG){var AK=H(AH),AF=AK?AH:AH.name,AN=w(AF);
if(AN){if(!AG){throw new Error("No reference point given for path '"+AF+"'")
}var AM=AF.split("."),AI=0,AL=AM.length,AJ=AG;
for(;
AI<AL;
AI++){if(AM[AI]===""&&AI===0){AJ=AG;
continue
}if(AM[AI]==="^"){if(!AJ.parent){throw new Error("Path '"+AF+"' not valid for state '"+AG.name+"'")
}AJ=AJ.parent;
continue
}break
}AM=AM.slice(AI).join(".");
AF=AJ.name+(AJ.name&&AM?".":"")+AM
}var AE=s[AF];
if(AE&&(AK||(!AK&&(AE===AH||AE.self===AH)))){return AE
}return L
}function z(AF,AE){if(!y[AF]){y[AF]=[]
}y[AF].push(AE)
}function m(AH){AH=O(AH,{self:AH,resolve:AH.resolve||{},toString:function(){return this.name
}});
var AE=AH.name;
if(!H(AE)||AE.indexOf("@")>=0){throw new Error("State must have a valid name")
}if(s.hasOwnProperty(AE)){throw new Error("State '"+AE+"'' is already defined")
}var AI=(AE.indexOf(".")!==-1)?AE.substring(0,AE.lastIndexOf(".")):(H(AH.parent))?AH.parent:"";
if(AI&&!s[AI]){return z(AI,AH.self)
}for(var AG in u){if(Q(u[AG])){AH[AG]=u[AG](AH,u.$delegates[AG])
}}s[AE]=AH;
if(!AH[p]&&AH.url){t.when(AH.url,["$match","$stateParams",function(AJ,AK){if(AC.$current.navigable!=AH||!W(AJ,AK)){AC.transitionTo(AH,AJ,{location:false})
}}])
}if(y[AE]){for(var AF=0;
AF<y[AE].length;
AF++){m(y[AE][AF])
}}return AH
}function AB(AE){return AE.indexOf("*")>-1
}function n(AI){var AH=AI.split("."),AF=AC.$current.name.split(".");
if(AH[0]==="**"){AF=AF.slice(AF.indexOf(AH[1]));
AF.unshift("**")
}if(AH[AH.length-1]==="**"){AF.splice(AF.indexOf(AH[AH.length-2])+1,Number.MAX_VALUE);
AF.push("**")
}if(AH.length!=AF.length){return false
}for(var AG=0,AE=AH.length;
AG<AE;
AG++){if(AH[AG]==="*"){AF[AG]="*"
}}return AF.join("")===AH.join("")
}x=m({name:"",url:"^",views:null,"abstract":true});
x.navigable=null;
this.decorator=l;
function l(AE,AF){if(H(AE)&&!S(AF)){return u[AE]
}if(!Q(AF)||!H(AE)){return this
}if(u[AE]&&!u.$delegates[AE]){u.$delegates[AE]=u[AE]
}u[AE]=AF;
return this
}this.state=q;
function q(AE,AF){if(b(AE)){AF=AE
}else{AF.name=AE
}m(AF);
return this
}this.$get=r;
r.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$location","$urlRouter","$browser"];
function r(AK,AY,AV,AW,AG,AZ,AJ,Aa,AM){var AL=AY.reject(new Error("transition superseded"));
var AH=AY.reject(new Error("transition prevented"));
var AN=AY.reject(new Error("transition aborted"));
var AO=AY.reject(new Error("transition failed"));
var AQ=AJ.url();
var AF=AM.baseHref();
function AR(){if(AJ.url()!==AQ){AJ.url(AQ);
AJ.replace()
}}x.locals={resolve:null,globals:{$stateParams:{}}};
AC={params:{},current:x.self,$current:x,transition:null};
AC.reload=function AT(){AC.transitionTo(AC.current,AZ,{reload:true,inherit:false,notify:false})
};
AC.go=function AS(Ad,Ac,Ab){return this.transitionTo(Ad,Ac,K({inherit:true,relative:AC.$current},Ab))
};
AC.transitionTo=function AE(Ab,Ai,Ad){Ai=Ai||{};
Ad=K({location:true,inherit:false,relative:null,notify:true,reload:false,$retry:false},Ad||{});
var Ao=AC.$current,Ap=AC.params,Af=Ao.path;
var Aj,Al=o(Ab,Ad.relative);
if(!S(Al)){var Ah={to:Ab,toParams:Ai,options:Ad};
Aj=AK.$broadcast("$stateNotFound",Ah,Ao.self,Ap);
if(Aj.defaultPrevented){AR();
return AN
}if(Aj.retry){if(Ad.$retry){AR();
return AO
}var As=AC.transition=AY.when(Aj.retry);
As.then(function(){if(As!==AC.transition){return AL
}Ah.options.$retry=true;
return AC.transitionTo(Ah.to,Ah.toParams,Ah.options)
},function(){return AN
});
AR();
return As
}Ab=Ah.to;
Ai=Ah.toParams;
Ad=Ah.options;
Al=o(Ab,Ad.relative);
if(!S(Al)){if(Ad.relative){throw new Error("Could not resolve '"+Ab+"' from state '"+Ad.relative+"'")
}throw new Error("No such state '"+Ab+"'")
}}if(Al[p]){throw new Error("Cannot transition to abstract state '"+Ab+"'")
}if(Ad.inherit){Ai=e(AZ,Ai||{},AC.$current,Al)
}Ab=Al;
var Ak=Ab.path;
var Aq,Ae,Ag=x.locals,Ac=[];
for(Aq=0,Ae=Ak[Aq];
Ae&&Ae===Af[Aq]&&W(Ai,Ap,Ae.ownParams)&&!Ad.reload;
Aq++,Ae=Ak[Aq]){Ag=Ac[Aq]=Ae.locals
}if(v(Ab,Ao,Ag,Ad)){if(Ab.self.reloadOnSearch!==false){AR()
}AC.transition=null;
return AY.when(AC.current)
}Ai=f(Ab.params,Ai||{});
if(Ad.notify){Aj=AK.$broadcast("$stateChangeStart",Ab.self,Ai,Ao.self,Ap);
if(Aj.defaultPrevented){AR();
return AH
}}var Am=AY.when(Ag);
for(var An=Aq;
An<Ak.length;
An++,Ae=Ak[An]){Ag=Ac[An]=O(Ag);
Am=AP(Ae,Ai,Ae===Ab,Am,Ag)
}var Ar=AC.transition=Am.then(function(){var At,Aw,Au;
if(AC.transition!==Ar){return AL
}for(At=Af.length-1;
At>=Aq;
At--){Au=Af[At];
if(Au.self.onExit){AW.invoke(Au.self.onExit,Au.self,Au.locals.globals)
}Au.locals=null
}for(At=Aq;
At<Ak.length;
At++){Aw=Ak[At];
Aw.locals=Ac[At];
if(Aw.self.onEnter){AW.invoke(Aw.self.onEnter,Aw.self,Aw.locals.globals)
}}if(AC.transition!==Ar){return AL
}AC.$current=Ab;
AC.current=Ab.self;
AC.params=Ai;
h(AC.params,AZ);
AC.transition=null;
var Av=Ab.navigable;
if(Ad.location&&Av){AJ.url(Av.url.format(Av.locals.globals.$stateParams));
if(Ad.location==="replace"){AJ.replace()
}}if(Ad.notify){AK.$broadcast("$stateChangeSuccess",Ab.self,Ai,Ao.self,Ap)
}AQ=AJ.url();
return AC.current
},function(At){if(AC.transition!==Ar){return AL
}AC.transition=null;
AK.$broadcast("$stateChangeError",Ab.self,Ai,Ao.self,Ap,At);
AR();
return AY.reject(At)
});
return Ar
};
AC.is=function AI(Ab,Ad){var Ac=o(Ab);
if(!S(Ac)){return L
}if(AC.$current!==Ac){return false
}return S(Ad)&&Ad!==null?U.equals(AZ,Ad):true
};
AC.includes=function AU(Ac,Ae){if(H(Ac)&&AB(Ac)){if(n(Ac)){Ac=AC.$current.name
}else{return false
}}var Ad=o(Ac);
if(!S(Ad)){return L
}if(!S(AC.$current.includes[Ad.name])){return false
}var Ab=true;
U.forEach(Ae,function(Ag,Af){if(!S(AZ[Af])||AZ[Af]!==Ag){Ab=false
}});
return Ab
};
AC.href=function AX(Ad,Ag,Ac){Ac=K({lossy:true,inherit:false,absolute:false,relative:AC.$current},Ac||{});
var Ae=o(Ad,Ac.relative);
if(!S(Ae)){return null
}Ag=e(AZ,Ag||{},AC.$current,Ae);
var Af=(Ae&&Ac.lossy)?Ae.navigable:Ae;
var Ab=(Af&&Af.url)?Af.url.format(f(Ae.params,Ag||{})):null;
if(!AA.html5Mode()&&Ab){Ab="#"+AA.hashPrefix()+Ab
}if(AF!=="/"){if(AA.html5Mode()){Ab=AF.slice(0,-1)+Ab
}else{if(Ac.absolute){Ab=AF.slice(1)+Ab
}}}if(Ac.absolute&&Ab){Ab=AJ.protocol()+"://"+AJ.host()+(AJ.port()==80||AJ.port()==443?"":":"+AJ.port())+(!AA.html5Mode()&&Ab?"/":"")+Ab
}return Ab
};
AC.get=function(Ac,Ab){if(!S(Ac)){var Ae=[];
A(s,function(Af){Ae.push(Af.self)
});
return Ae
}var Ad=o(Ac,Ab);
return(Ad&&Ad.self)?Ad.self:null
};
function AP(Ae,Ah,Ag,Ab,Ai){var Ad=(Ag)?Ah:D(Ae.params,Ah);
var Af={$stateParams:Ad};
Ai.resolve=AG.resolve(Ae.resolve,Af,Ai.resolve,Ae);
var Ac=[Ai.resolve.then(function(Aj){Ai.globals=Aj
})];
if(Ab){Ac.push(Ab)
}A(Ae.views,function(Aj,Ak){var Al=(Aj.resolve&&Aj.resolve!==Ae.resolve?Aj.resolve:{});
Al.$template=[function(){return AV.load(Ak,{view:Aj,locals:Af,params:Ad,notify:false})||""
}];
Ac.push(AG.resolve(Al,Af,Ai.resolve,Ae).then(function(Am){if(Q(Aj.controllerProvider)||T(Aj.controllerProvider)){var An=U.extend({},Al,Af);
Am.$$controller=AW.invoke(Aj.controllerProvider,null,An)
}else{Am.$$controller=Aj.controller
}Am.$$state=Ae;
Am.$$controllerAs=Aj.controllerAs;
Ai[Ak]=Am
}))
});
return AY.all(Ac).then(function(Aj){return Ai
})
}return AC
}function v(AH,AG,AF,AE){if(AH===AG&&((AF===AG.locals&&!AE.reload)||(AH.self.reloadOnSearch===false))){return true
}}}U.module("ui.router.state").value("$stateParams",{}).provider("$state",M);
j.$inject=[];
function j(){this.$get=l;
l.$inject=["$rootScope","$templateFactory"];
function l(m,o){return{load:function n(r,q){var p,s={template:null,controller:null,view:null,locals:null,notify:true,async:true,params:{}};
q=K(s,q);
if(q.view){p=o.fromConfig(q.view,q.params,q.locals)
}if(p&&q.notify){m.$broadcast("$viewContentLoading",q)
}return p
}}
}}U.module("ui.router.state").provider("$view",j);
function F(){var l=false;
this.useAnchorScroll=function(){l=true
};
this.$get=["$anchorScroll","$timeout",function(n,m){if(l){return n
}return function(o){m(function(){o[0].scrollIntoView()
},0,false)
}
}]
}U.module("ui.router.state").provider("$uiViewScroll",F);
P.$inject=["$state","$injector","$uiViewScroll"];
function P(l,s,n){function o(){return(s.has)?function(u){return s.has(u)?s.get(u):null
}:function(u){try{return s.get(u)
}catch(v){return null
}}
}var p=o(),t=p("$animator"),q=p("$animate");
function m(v,w){var x=function(){return{enter:function(z,AA,y){AA.after(z);
y()
},leave:function(z,y){z.remove();
y()
}}
};
if(q){return{enter:function(z,AA,y){q.enter(z,null,AA,y)
},leave:function(z,y){q.leave(z,y)
}}
}if(t){var u=t&&t(w,v);
return{enter:function(z,AA,y){u.enter(z,null,AA);
y()
},leave:function(z,y){u.leave(z);
y()
}}
}return x()
}var r={restrict:"ECA",terminal:true,priority:400,transclude:"element",compile:function(v,w,u){return function(AG,AF,AD){var y,AB,AI,x,AE=AD.onload||"",z=AD.autoscroll,AA=m(AD,AG);
AG.$on("$stateChangeSuccess",function(){AH(false)
});
AG.$on("$viewContentLoading",function(){AH(false)
});
AH(true);
function AC(){if(y){y.remove();
y=null
}if(AI){AI.$destroy();
AI=null
}if(AB){AA.leave(AB,function(){y=null
});
y=AB;
AB=null
}}function AH(AN){var AL=AG.$new(),AJ=AB&&AB.data("$uiViewName"),AK=AJ&&l.$current&&l.$current.locals[AJ];
if(!AN&&AK===x){return 
}var AM=u(AL,function(AP){AA.enter(AP,AF,function AO(){if(U.isDefined(z)&&!z||AG.$eval(z)){n(AP)
}});
AC()
});
x=l.$current.locals[AM.data("$uiViewName")];
AB=AM;
AI=AL;
AI.$emit("$viewContentLoaded");
AI.$eval(AE)
}}
}};
return r
}k.$inject=["$compile","$controller","$state"];
function k(n,l,m){return{restrict:"ECA",priority:-400,compile:function(o){var p=o.html();
return function(y,x,w){var q=w.uiView||w.name||"",t=x.inheritedData("$uiView");
if(q.indexOf("@")<0){q=q+"@"+(t?t.state.name:"")
}x.data("$uiViewName",q);
var u=m.$current,r=u&&u.locals[q];
if(!r){return 
}x.data("$uiView",{name:q,state:r.$$state});
x.html(r.$template?r.$template:p);
var v=n(x.contents());
if(r.$$controller){r.$scope=y;
var s=l(r.$$controller,r);
if(r.$$controllerAs){y[r.$$controllerAs]=s
}x.data("$ngControllerController",s);
x.children().data("$ngControllerController",s)
}v(y)
}
}}
}U.module("ui.router.state").directive("uiView",P);
U.module("ui.router.state").directive("uiView",k);
function X(m){var l=m.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/);
if(!l||l.length!==4){throw new Error("Invalid state ref '"+m+"'")
}return{state:l[1],paramExpr:l[3]||null}
}function i(m){var l=m.parent().inheritedData("$uiView");
if(l&&l.state&&l.state.name){return l.state
}}J.$inject=["$state","$timeout"];
function J(n,m){var l=["location","inherit","reload"];
return{restrict:"A",require:"?^uiSrefActive",link:function(AA,w,z,p){var s=X(z.uiSref);
var t=null,q=null,r=i(w)||n.$current;
var y=w[0].nodeName==="FORM";
var x=y?"action":"href",o=true;
var AB={relative:r};
var v=AA.$eval(z.uiSrefOpts)||{};
U.forEach(l,function(AC){if(AC in v){AB[AC]=v[AC]
}});
var u=function(AD){if(AD){t=AD
}if(!o){return 
}var AC=n.href(s.state,t,AB);
if(p){p.$$setStateInfo(s.state,t)
}if(!AC){o=false;
return false
}w[0][x]=AC
};
if(s.paramExpr){AA.$watch(s.paramExpr,function(AD,AC){if(AD!==t){u(AD)
}},true);
t=AA.$eval(s.paramExpr)
}u();
if(y){return 
}w.bind("click",function(AD){var AC=AD.which||AD.button;
if(!(AC>1||AD.ctrlKey||AD.metaKey||AD.shiftKey||w.attr("target"))){m(function(){n.go(s.state,t,AB)
});
AD.preventDefault()
}})
}}
}I.$inject=["$state","$stateParams","$interpolate"];
function I(l,m,n){return{restrict:"A",controller:["$scope","$element","$attrs",function(q,p,o){var t,u,r;
r=n(o.uiSrefActive||"",false)(q);
this.$$setStateInfo=function(w,x){t=l.get(w,i(p));
u=x;
v()
};
q.$on("$stateChangeSuccess",v);
function v(){if(l.$current.self===t&&s()){p.addClass(r)
}else{p.removeClass(r)
}}function s(){return !u||W(u,m)
}}]}
}U.module("ui.router.state").directive("uiSref",J).directive("uiSrefActive",I);
V.$inject=["$state"];
function V(l){return function(m){return l.is(m)
}
}N.$inject=["$state"];
function N(l){return function(m){return l.includes(m)
}
}U.module("ui.router.state").filter("isState",V).filter("includedByState",N);
a.$inject=["$stateProvider","$urlRouterProvider"];
function a(r,m){var n=[];
q.$inject=["$$state"];
function q(s){this.locals=s.locals.globals;
this.params=this.locals.$stateParams
}function p(){this.locals=null;
this.params=null
}this.when=l;
function l(t,s){if(s.redirectTo!=null){var v=s.redirectTo,u;
if(H(v)){u=v
}else{if(Q(v)){u=function(w,x){return v(w,x.path(),x.search())
}
}else{throw new Error("Invalid 'redirectTo' in when()")
}}m.when(t,u)
}else{r.state(O(s,{parent:null,name:"route:"+encodeURIComponent(t),url:t,onEnter:q,onExit:p}))
}n.push(s);
return this
}this.$get=o;
o.$inject=["$state","$rootScope","$routeParams"];
function o(t,s,u){var w={routes:n,params:u,current:L};
function v(x){return(x.name!=="")?x:L
}s.$on("$stateChangeStart",function(z,AB,y,AA,x){s.$broadcast("$routeChangeStart",v(AB),v(AA))
});
s.$on("$stateChangeSuccess",function(z,AB,y,AA,x){w.current=v(AB);
s.$broadcast("$routeChangeSuccess",v(AB),v(AA));
h(y,w.params)
});
s.$on("$stateChangeError",function(AA,AC,z,AB,y,x){s.$broadcast("$routeChangeError",v(AC),v(AB),x)
});
return w
}}U.module("ui.router.compat").provider("$route",a).directive("ngView",P)
})(window,window.angular);