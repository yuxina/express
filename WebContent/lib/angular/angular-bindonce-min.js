(function(){var A=angular.module("pasvaz.bindonce",[]);
A.directive("bindonce",function(){var B=function(F){if(F&&F.length!==0){var E=angular.lowercase(""+F);
F=!(E==="f"||E==="0"||E==="false"||E==="no"||E==="n"||E==="[]")
}else{F=false
}return F
};
var C=parseInt((/msie (\d+)/.exec(angular.lowercase(navigator.userAgent))||[])[1],10);
if(isNaN(C)){C=parseInt((/trident\/.*; rv:(\d+)/.exec(angular.lowercase(navigator.userAgent))||[])[1],10)
}var D={restrict:"AM",controller:["$scope","$element","$attrs","$interpolate",function(H,F,E,L){var J=function(Q,M,P){var N=(M==="show")?"":"none";
var O=(M==="hide")?"":"none";
Q.css("display",B(P)?N:O)
};
var I=function(O,N){if(angular.isObject(N)&&!angular.isArray(N)){var M=[];
angular.forEach(N,function(Q,P){if(Q){M.push(P)
}});
N=M
}if(N){O.addClass(angular.isArray(N)?N.join(" "):N)
}};
var G=function(M,N){M.transclude(N,function(S){var Q=M.element.parent();
var R=M.element&&M.element[M.element.length-1];
var O=Q&&Q[0]||R&&R.parentNode;
var P=(R&&R.nextSibling)||null;
angular.forEach(S,function(T){O.insertBefore(T,P)
})
})
};
var K={watcherRemover:undefined,binders:[],group:E.boName,element:F,ran:false,addBinder:function(M){this.binders.push(M);
if(this.ran){this.runBinders()
}},setupWatcher:function(N){var M=this;
this.watcherRemover=H.$watch(N,function(O){if(O===undefined){return 
}M.removeWatcher();
M.checkBindonce(O)
},true)
},checkBindonce:function(N){var M=this,O=(N.$promise)?N.$promise.then:N.then;
if(typeof O==="function"){O(function(){M.runBinders()
})
}else{M.runBinders()
}},removeWatcher:function(){if(this.watcherRemover!==undefined){this.watcherRemover();
this.watcherRemover=undefined
}},runBinders:function(){while(this.binders.length>0){var M=this.binders.shift();
if(this.group&&this.group!=M.group){continue
}var Q=M.scope.$eval((M.interpolate)?L(M.value):M.value);
switch(M.attr){case"boIf":if(B(Q)){G(M,M.scope.$new())
}break;
case"boSwitch":var P,N=M.controller[0];
if((P=N.cases["!"+Q]||N.cases["?"])){M.scope.$eval(M.attrs.change);
angular.forEach(P,function(R){G(R,M.scope.$new())
})
}break;
case"boSwitchWhen":var O=M.controller[0];
O.cases["!"+M.attrs.boSwitchWhen]=(O.cases["!"+M.attrs.boSwitchWhen]||[]);
O.cases["!"+M.attrs.boSwitchWhen].push({transclude:M.transclude,element:M.element});
break;
case"boSwitchDefault":var O=M.controller[0];
O.cases["?"]=(O.cases["?"]||[]);
O.cases["?"].push({transclude:M.transclude,element:M.element});
break;
case"hide":case"show":J(M.element,M.attr,Q);
break;
case"class":I(M.element,Q);
break;
case"text":M.element.text(Q);
break;
case"html":M.element.html(Q);
break;
case"style":M.element.css(Q);
break;
case"disabled":M.element.prop("disabled",Q);
break;
case"src":M.element.attr(M.attr,Q);
if(C){M.element.prop("src",Q)
}break;
case"attr":angular.forEach(M.attrs,function(T,S){var U,R;
if(S.match(/^boAttr./)&&M.attrs[S]){U=S.replace(/^boAttr/,"").replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();
R=M.scope.$eval(M.attrs[S]);
M.element.attr(U,R)
}});
break;
case"href":case"alt":case"title":case"id":case"value":M.element.attr(M.attr,Q);
break
}}this.ran=true
}};
angular.extend(this,K)
}],link:function(G,I,E,F){var H=E.bindonce&&G.$eval(E.bindonce);
if(H!==undefined){F.checkBindonce(H)
}else{F.setupWatcher(E.bindonce);
I.bind("$destroy",F.removeWatcher)
}}};
return D
});
angular.forEach([{directiveName:"boShow",attribute:"show"},{directiveName:"boHide",attribute:"hide"},{directiveName:"boClass",attribute:"class"},{directiveName:"boText",attribute:"text"},{directiveName:"boBind",attribute:"text"},{directiveName:"boHtml",attribute:"html"},{directiveName:"boSrcI",attribute:"src",interpolate:true},{directiveName:"boSrc",attribute:"src"},{directiveName:"boHrefI",attribute:"href",interpolate:true},{directiveName:"boHref",attribute:"href"},{directiveName:"boAlt",attribute:"alt"},{directiveName:"boTitle",attribute:"title"},{directiveName:"boId",attribute:"id"},{directiveName:"boStyle",attribute:"style"},{directiveName:"boDisabled",attribute:"disabled"},{directiveName:"boValue",attribute:"value"},{directiveName:"boAttr",attribute:"attr"},{directiveName:"boIf",transclude:"element",terminal:true,priority:1000},{directiveName:"boSwitch",require:"boSwitch",controller:function(){this.cases={}
}},{directiveName:"boSwitchWhen",transclude:"element",priority:800,require:"^boSwitch"},{directiveName:"boSwitchDefault",transclude:"element",priority:800,require:"^boSwitch"}],function(C){var B=200;
return A.directive(C.directiveName,function(){var D={priority:C.priority||B,transclude:C.transclude||false,terminal:C.terminal||false,require:["^bindonce"].concat(C.require||[]),controller:C.controller,compile:function(F,G,E){return function(L,O,I,N){var K=N[0];
var H=I.boParent;
if(H&&K.group!==H){var J=K.element.parent();
K=undefined;
var M;
while(J[0].nodeType!==9&&J.length){if((M=J.data("$bindonceController"))&&M.group===H){K=M;
break
}J=J.parent()
}if(!K){throw new Error("No bindonce controller: "+H)
}}K.addBinder({element:O,attr:C.attribute||C.directiveName,attrs:I,value:I[C.directiveName],interpolate:C.interpolate,group:H,transclude:E,controller:N.slice(1),scope:L})
}
}};
return D
})
})
})();