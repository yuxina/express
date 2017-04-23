(function(){function C(D){return typeof D==="function"
}function B(D,E){E=E||Error;
return function(){var L=2;
var F=arguments,K=F[0],J="["+(D?D+":":"")+K+"] ",I=F[1],G,H;
J+=I.replace(/\{\d+\}/g,function(N){var M=+N.slice(1,-1),O=M+L;
if(O<F.length){return toDebugString(F[O])
}return N
});
J+="\nhttp://errors.angularjs.org/1.5.3-local+sha.fatal: Not a git repository (or any of the parent directories): .git/"+(D?D+"/":"")+K;
for(H=L,G="?";
H<F.length;
H++,G="&"){J+=G+"p"+(H-L)+"="+encodeURIComponent(toDebugString(F[H]))
}return new E(J)
}
}function A(H){var F=B("$injector");
var D=B("ng");
function G(K,J,I){return K[J]||(K[J]=I())
}var E=G(H,"angular",Object);
E.$$minErr=E.$$minErr||B;
return G(E,"module",function(){var I={};
return function J(K,M,L){var N=function(O,P){if(O==="hasOwnProperty"){throw D("badname","hasOwnProperty is not a valid {0} name",P)
}};
N(K,"module");
if(M&&I.hasOwnProperty(K)){I[K]=null
}return G(I,K,function(){if(!M){throw F("nomod","Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.",K)
}var T=[];
var U=[];
var S=[];
var P=O("$injector","invoke","push",U);
var R={_invokeQueue:T,_configBlocks:U,_runBlocks:S,requires:M,name:K,provider:Q("$provide","provider"),factory:Q("$provide","factory"),service:Q("$provide","service"),value:O("$provide","value"),constant:O("$provide","constant","unshift"),decorator:Q("$provide","decorator"),animation:Q("$animateProvider","register"),filter:Q("$filterProvider","register"),controller:Q("$controllerProvider","register"),directive:Q("$compileProvider","directive"),config:P,run:function(V){S.push(V);
return this
}};
if(L){P(L)
}return R;
function O(X,Y,W,V){if(!V){V=T
}return function(){V[W||"push"]([X,Y,arguments]);
return R
}
}function Q(V,W){return function(Y,X){if(X&&C(X)){X.$$moduleName=K
}T.push([V,W,arguments]);
return R
}
}})
}
})
}A(window)
})(window);
angular.Module;