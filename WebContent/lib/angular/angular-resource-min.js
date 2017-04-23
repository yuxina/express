(function(F,B,H){var E=B.$$minErr("$resource");
var A=/^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;
function C(I){return(I!=null&&I!==""&&I!=="hasOwnProperty"&&A.test("."+I))
}function D(N,M){if(!C(M)){throw E("badmember",'Dotted member path "@{0}" is invalid.',M)
}var L=M.split(".");
for(var J=0,K=L.length;
J<K&&B.isDefined(N);
J++){var I=L[J];
N=(N!==null)?N[I]:H
}return N
}function G(J,K){K=K||{};
B.forEach(K,function(M,L){delete K[L]
});
for(var I in J){if(J.hasOwnProperty(I)&&!(I.charAt(0)==="$"&&I.charAt(1)==="$")){K[I]=J[I]
}}return K
}B.module("ngResource",["ng"]).provider("$resource",function(){var I=/^https?:\/\/[^\/]*/;
var J=this;
this.defaults={stripTrailingSlashes:true,actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:true},remove:{method:"DELETE"},"delete":{method:"DELETE"}}};
this.$get=["$http","$q",function(T,P){var U=B.noop,O=B.forEach,S=B.extend,K=B.copy,M=B.isFunction;
function N(V){return L(V,true).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")
}function L(W,V){return encodeURIComponent(W).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,(V?"%20":"+"))
}function R(V,W){this.template=V;
this.defaults=S({},J.defaults,W);
this.urlParams={}
}R.prototype={setUrlParams:function(Z,a,Y){var d=this,V=Y||d.template,X,b,c="";
var W=d.urlParams={};
O(V.split(/\W/),function(e){if(e==="hasOwnProperty"){throw E("badname","hasOwnProperty is not a valid parameter name.")
}if(!(new RegExp("^\\d+$").test(e))&&e&&(new RegExp("(^|[^\\\\]):"+e+"(\\W|$)").test(V))){W[e]=true
}});
V=V.replace(/\\:/g,":");
V=V.replace(I,function(e){c=e;
return""
});
a=a||{};
O(d.urlParams,function(f,e){X=a.hasOwnProperty(e)?a[e]:d.defaults[e];
if(B.isDefined(X)&&X!==null){b=N(X);
V=V.replace(new RegExp(":"+e+"(\\W|$)","g"),function(g,h){return b+h
})
}else{V=V.replace(new RegExp("(/?):"+e+"(\\W|$)","g"),function(h,i,g){if(g.charAt(0)=="/"){return g
}else{return i+g
}})
}});
if(d.defaults.stripTrailingSlashes){V=V.replace(/\/+$/,"")||"/"
}V=V.replace(/\/\.(?=\w+($|\?))/,".");
Z.url=c+V.replace(/\/\\\./,"/.");
O(a,function(f,e){if(!d.urlParams[e]){Z.params=Z.params||{};
Z.params[e]=f
}})
}};
function Q(Y,a,c,X){var V=new R(Y,X);
c=S({},J.defaults.actions,c);
function W(f,e){var d={};
e=S({},a,e);
O(e,function(h,g){if(M(h)){h=h()
}d[g]=h&&h.charAt&&h.charAt(0)=="@"?D(f,h.substr(1)):h
});
return d
}function Z(d){return d.resource
}function b(d){G(d||{},this)
}b.prototype.toJSON=function(){var d=S({},this);
delete d.$promise;
delete d.$resolved;
return d
};
O(c,function(f,d){var e=/^(POST|PUT|PATCH)$/i.test(f.method);
b[d]=function(j,h,g,t){var l={},m,q,o;
switch(arguments.length){case 4:o=t;
q=g;
case 3:case 2:if(M(h)){if(M(j)){q=j;
o=h;
break
}q=h;
o=g
}else{l=j;
m=h;
q=g;
break
}case 1:if(M(j)){q=j
}else{if(e){m=j
}else{l=j
}}break;
case 0:break;
default:throw E("badargs","Expected up to 4 arguments [params, data, success, error], got {0} arguments",arguments.length)
}var i=this instanceof b;
var p=i?m:(f.isArray?[]:new b(m));
var k={};
var n=f.interceptor&&f.interceptor.response||Z;
var r=f.interceptor&&f.interceptor.responseError||H;
O(f,function(v,u){if(u!="params"&&u!="isArray"&&u!="interceptor"){k[u]=K(v)
}});
if(e){k.data=m
}V.setUrlParams(k,S({},W(m,f.params||{}),l),f.url);
var s=T(k).then(function(u){var v=u.data,w=p.$promise;
if(v){if(B.isArray(v)!==(!!f.isArray)){throw E("badcfg","Error in resource configuration for action `{0}`. Expected response to contain an {1} but got an {2} (Request: {3} {4})",d,f.isArray?"array":"object",B.isArray(v)?"array":"object",k.method,k.url)
}if(f.isArray){p.length=0;
O(v,function(x){if(typeof x==="object"){p.push(new b(x))
}else{p.push(x)
}})
}else{G(v,p);
p.$promise=w
}}p.$resolved=true;
u.resource=p;
return u
},function(u){p.$resolved=true;
(o||U)(u);
return P.reject(u)
});
s=s.then(function(u){var v=n(u);
(q||U)(v,u.headers);
return v
},r);
if(!i){p.$promise=s;
p.$resolved=false;
return p
}return s
};
b.prototype["$"+d]=function(j,i,h){if(M(j)){h=i;
i=j;
j={}
}var g=b[d].call(this,j,this,i,h);
return g.$promise||g
}
});
b.bind=function(d){return Q(Y,S({},a,d),c)
};
return b
}return Q
}]
})
})(window,window.angular);