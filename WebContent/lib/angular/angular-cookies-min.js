(function(D,A,F){A.module("ngCookies",["ng"]).provider("$cookies",[function C(){var H=this.defaults={};
function G(I){return I?A.extend({},H,I):H
}this.$get=["$$cookieReader","$$cookieWriter",function(J,I){return{get:function(K){return J()[K]
},getObject:function(K){var L=this.get(K);
return L?A.fromJson(L):L
},getAll:function(){return J()
},put:function(L,M,K){I(L,M,G(K))
},putObject:function(L,M,K){this.put(L,A.toJson(M),K)
},remove:function(L,K){I(L,F,G(K))
}}
}]
}]);
A.module("ngCookies").factory("$cookieStore",["$cookies",function(G){return{get:function(H){return G.getObject(H)
},put:function(H,I){G.putObject(H,I)
},remove:function(H){G.remove(H)
}}
}]);
function B(L,J,G){var H=G.baseHref();
var I=L[0];
function K(O,P,N){var Q,M;
N=N||{};
M=N.expires;
Q=A.isDefined(N.path)?N.path:H;
if(A.isUndefined(P)){M="Thu, 01 Jan 1970 00:00:00 GMT";
P=""
}if(A.isString(M)){M=new Date(M)
}var R=encodeURIComponent(O)+"="+encodeURIComponent(P);
R+=Q?";path="+Q:"";
R+=N.domain?";domain="+N.domain:"";
R+=M?";expires="+M.toUTCString():"";
R+=N.secure?";secure":"";
var S=R.length+1;
if(S>4096){J.warn("Cookie '"+O+"' possibly not set or overflowed because it was too large ("+S+" > 4096 bytes)!")
}return R
}return function(N,O,M){I.cookie=K(N,O,M)
}
}B.$inject=["$document","$log","$browser"];
A.module("ngCookies").provider("$$cookieWriter",function E(){this.$get=B
})
})(window,window.angular);