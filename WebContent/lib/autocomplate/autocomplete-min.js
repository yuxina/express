"use strict";
angular.module("ui.autocomplete",[]).directive("uiAutocomplete",["$timeout","$exceptionHandler",function(B,A){var D=$.ui.autocomplete.prototype;
var E=D._initSource;
var F=Array.prototype.slice;
function C(I,G){var H=new RegExp($.ui.autocomplete.escapeRegex(G),"i");
return $.grep(I,function(J){return H.test($("<div>").html(J.label||J.value||J).text())
})
}$.extend(D,{_initSource:function(){if(this.options.html&&$.isArray(this.options.source)){this.source=function(H,G){G(C(this.options.source,H.term))
}
}else{E.call(this)
}},_normalize:function(G){return $.map(G,function(H){if(H&&typeof H==="object"){return $.extend({label:H.label||H.value,value:H.value||H.label},H)
}else{return{label:H+"",value:H}
}})
},_renderItemData:function(H,I){var G=I.groupLabel||I.label;
if(I.groupLabel){G=$("<div>").append(G).addClass("ui-menu-group")
}else{if(this.options.html){if(typeof G==="object"){G=$(G)
}if(typeof G!=="object"||G.length>1||!G.is("a")){G=$("<a>").append(G)
}}else{G=$("<a>").text(G)
}}return $("<li>").append(G).appendTo(H).data("ui-autocomplete-item",I)
},_resizeMenu:function(){var G=this;
setTimeout(function(){var J=G.menu.element;
var L=J.css("max-height")||0,K=Math.max(J.width("").outerWidth()+1,G.element.outerWidth()),I=G.element.height(),H=$(window).height()-G.options.outHeight-J.offset().top;
H=L&&H>L?L:H;
J.css({width:K,maxHeight:H})
},10)
}});
return{require:"ngModel",link:function(H,I,U,O){var W=false,N=null,G={},Q=null,L=angular.forEach,P=angular.isObject,Z=angular.extend,b=H.$eval(U.uiAutocomplete),T=angular.bind(I,I.val),X=["close","destroy","disable","enable","instance","option","search","widget"],a=["change","close","create","focus","open","response","search","select"];
var Y=H.$watch(U.ngModel,function(c){Q=c;
if(P(Q)){O.$formatters.push(function(d){return d.value
});
O.$parsers.push(function(d){Q.value=d;
return Q
});
H.$watch(U.ngModel,function(d){if(T()!==d.value){O.$viewValue=d.value;
O.$render()
}},true);
O.$pristine=false;
O.$setViewValue(Q.value);
O.$pristine=true
}if(c){Y()
}});
var K={open:function(c,d){W=true;
N=null
},close:function(c,d){W=false
},select:function(c,d){N=d;
B(function(){I.blur()
},0)
},change:function(d,f){var e=T(),c=false;
if(N&&N.item&&(e.indexOf(N.item.value)!==-1)){e=N.item.value;
c=true
}H.$apply(function(){if(b.options.onlySelectValid){O.$setValidity("onlyselect",c)
}if(e===null){O.$render()
}else{if(e===""){S()
}else{if(O.$viewValue!==e){O.$setViewValue(e);
O.$render();
S(N)
}}}})
}};
function S(c){if(P(Q)){if(!O.$viewValue&&O.$viewValue!==0){R(Q)
}else{if(c&&c.item){c.item.label=P(c.item.label)?$("<div>").append(c.item.label).html():c.item.label;
Z(Q,c.item)
}}L(O.$viewChangeListeners,function(d){try{d()
}catch(f){A(f)
}})
}}function V(){O.$setViewValue("");
O.$render();
S()
}function M(){if(b.options.focusOpen&&!W){I.autocomplete("search","")
}}function J(c){c=P(c)?c:{};
c.disabled=c.source?c.disabled:true;
c.appendTo=c.appendTo||I.parents(".ng-view")[0]||I.parents("[ng-view]")[0]||null;
c.minLength=c.focusOpen?0:c.minLength;
c.outHeight=c.outHeight||0;
c.position=c.position||{my:"left top",at:"left bottom",collision:"flipfit"};
return c
}function R(c){if(P(c)){var d=/^\$/;
L(c,function(g,e){var f=typeof g;
if(d.test(e)){return 
}else{if(f==="number"){c[e]=0
}else{if(f==="string"){c[e]=""
}else{if(f==="boolean"){c[e]=false
}else{if(P(g)){R(g)
}}}}}})
}}if(!P(b)){return 
}b.methods={};
b.options=J(b.options);
L(a,function(d){var c=b.options[d];
c=typeof c==="function"?c:angular.noop;
G[d]=function(e,f){if(K[d]){K[d](e,f)
}c(e,f);
if(b.events&&typeof b.events[d]==="function"){b.events[d](e,f)
}}
});
L(X,function(c){b.methods[c]=function(){var d=F.call(arguments);
d.unshift(c);
return I.autocomplete.apply(I,d)
}
});
b.methods.filter=C;
b.methods.clean=V;
I.on("focus",M);
I.autocomplete(Z({},b.options,G));
b.widget=I.autocomplete("widget")
}}
}]);