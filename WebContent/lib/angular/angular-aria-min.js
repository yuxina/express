(function(D,A,G){var C=A.module("ngAria",["ng"]).provider("$aria",B);
var F=["BUTTON","A","INPUT","TEXTAREA","SELECT","DETAILS","SUMMARY"];
var E=function(I,H){if(H.indexOf(I[0].nodeName)!==-1){return true
}};
function B(){var H={ariaHidden:true,ariaChecked:true,ariaDisabled:true,ariaRequired:true,ariaInvalid:true,ariaMultiline:true,ariaValue:true,tabindex:true,bindKeypress:true,bindRoleForClick:true};
this.config=function(J){H=A.extend(H,J)
};
function I(K,J,L,M){return function(P,Q,N){var O=N.$normalize(J);
if(H[O]&&!E(Q,L)&&!N[O]){P.$watch(N[K],function(R){R=M?!R:!!R;
Q.attr(J,R)
})
}}
}this.$get=function(){return{config:function(J){return H[J]
},$$watchExpr:I}
}
}C.directive("ngShow",["$aria",function(H){return H.$$watchExpr("ngShow","aria-hidden",[],true)
}]).directive("ngHide",["$aria",function(H){return H.$$watchExpr("ngHide","aria-hidden",[],false)
}]).directive("ngModel",["$aria",function(K){function I(L,M,N){return K.config(M)&&!N.attr(L)
}function H(M,L){return !L.attr("role")&&(L.attr("type")===M)&&(L[0].nodeName!=="INPUT")
}function J(L,N){var M=L.type,O=L.role;
return((M||O)==="checkbox"||O==="menuitemcheckbox")?"checkbox":((M||O)==="radio"||O==="menuitemradio")?"radio":(M==="range"||O==="progressbar"||O==="slider")?"range":(M||O)==="textbox"||N[0].nodeName==="TEXTAREA"?"multiline":""
}return{restrict:"A",require:"?ngModel",priority:200,compile:function(N,L){var M=J(L,N);
return{pre:function(P,Q,O,R){if(M==="checkbox"&&O.type!=="checkbox"){R.$isEmpty=function(S){return S===false
}
}},post:function(d,Q,b,U){var X=I("tabindex","tabindex",Q);
function a(){return U.$modelValue
}function R(){if(X){X=false;
return function f(g){var h=(b.value==U.$viewValue);
Q.attr("aria-checked",h);
Q.attr("tabindex",0-!h)
}
}else{return function f(g){Q.attr("aria-checked",(b.value==U.$viewValue))
}
}}function O(){Q.attr("aria-checked",!U.$isEmpty(U.$viewValue))
}switch(M){case"radio":case"checkbox":if(H(M,Q)){Q.attr("role",M)
}if(I("aria-checked","ariaChecked",Q)){d.$watch(a,M==="radio"?R():O)
}if(X){Q.attr("tabindex",0)
}break;
case"range":if(H(M,Q)){Q.attr("role","slider")
}if(K.config("ariaValue")){var P=!Q.attr("aria-valuemin")&&(b.hasOwnProperty("min")||b.hasOwnProperty("ngMin"));
var Z=!Q.attr("aria-valuemax")&&(b.hasOwnProperty("max")||b.hasOwnProperty("ngMax"));
var e=!Q.attr("aria-valuenow");
if(P){b.$observe("min",function V(f){Q.attr("aria-valuemin",f)
})
}if(Z){b.$observe("max",function V(f){Q.attr("aria-valuemax",f)
})
}if(e){d.$watch(a,function Y(f){Q.attr("aria-valuenow",f)
})
}}if(X){Q.attr("tabindex",0)
}break;
case"multiline":if(I("aria-multiline","ariaMultiline",Q)){Q.attr("aria-multiline",true)
}break
}if(U.$validators.required&&I("aria-required","ariaRequired",Q)){d.$watch(function S(){return U.$error.required
},function c(f){Q.attr("aria-required",!!f)
})
}if(I("aria-invalid","ariaInvalid",Q)){d.$watch(function T(){return U.$invalid
},function W(f){Q.attr("aria-invalid",!!f)
})
}}}
}}
}]).directive("ngDisabled",["$aria",function(H){return H.$$watchExpr("ngDisabled","aria-disabled",[])
}]).directive("ngMessages",function(){return{restrict:"A",require:"?ngMessages",link:function(I,K,H,J){if(!K.attr("aria-live")){K.attr("aria-live","assertive")
}}}
}).directive("ngClick",["$aria","$parse",function(I,H){return{restrict:"A",compile:function(L,J){var K=H(J.ngClick,null,true);
return function(N,O,M){if(!E(O,F)){if(I.config("bindRoleForClick")&&!O.attr("role")){O.attr("role","button")
}if(I.config("tabindex")&&!O.attr("tabindex")){O.attr("tabindex",0)
}if(I.config("bindKeypress")&&!M.ngKeypress){O.on("keypress",function(P){var Q=P.which||P.keyCode;
if(Q===32||Q===13){N.$apply(R)
}function R(){K(N,{$event:P})
}})
}}}
}}
}]).directive("ngDblclick",["$aria",function(H){return function(J,K,I){if(H.config("tabindex")&&!K.attr("tabindex")&&!E(K,F)){K.attr("tabindex",0)
}}
}])
})(window,window.angular);