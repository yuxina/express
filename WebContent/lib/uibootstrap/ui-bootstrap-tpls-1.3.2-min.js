angular.module("ui.bootstrap",["ui.bootstrap.tpls","ui.bootstrap.collapse","ui.bootstrap.accordion","ui.bootstrap.alert","ui.bootstrap.buttons","ui.bootstrap.carousel","ui.bootstrap.dateparser","ui.bootstrap.isClass","ui.bootstrap.datepicker","ui.bootstrap.position","ui.bootstrap.datepickerPopup","ui.bootstrap.debounce","ui.bootstrap.dropdown","ui.bootstrap.stackedMap","ui.bootstrap.modal","ui.bootstrap.paging","ui.bootstrap.pager","ui.bootstrap.pagination","ui.bootstrap.tooltip","ui.bootstrap.popover","ui.bootstrap.progressbar","ui.bootstrap.rating","ui.bootstrap.tabs","ui.bootstrap.timepicker","ui.bootstrap.typeahead"]);
angular.module("ui.bootstrap.tpls",["uib/template/accordion/accordion-group.html","uib/template/accordion/accordion.html","uib/template/alert/alert.html","uib/template/carousel/carousel.html","uib/template/carousel/slide.html","uib/template/datepicker/datepicker.html","uib/template/datepicker/day.html","uib/template/datepicker/month.html","uib/template/datepicker/year.html","uib/template/datepickerPopup/popup.html","uib/template/modal/backdrop.html","uib/template/modal/window.html","uib/template/pager/pager.html","uib/template/pagination/pagination.html","uib/template/tooltip/tooltip-html-popup.html","uib/template/tooltip/tooltip-popup.html","uib/template/tooltip/tooltip-template-popup.html","uib/template/popover/popover-html.html","uib/template/popover/popover-template.html","uib/template/popover/popover.html","uib/template/progressbar/bar.html","uib/template/progressbar/progress.html","uib/template/progressbar/progressbar.html","uib/template/rating/rating.html","uib/template/tabs/tab.html","uib/template/tabs/tabset.html","uib/template/timepicker/timepicker.html","uib/template/typeahead/typeahead-match.html","uib/template/typeahead/typeahead-popup.html"]);
angular.module("ui.bootstrap.collapse",[]).directive("uibCollapse",["$animate","$q","$parse","$injector",function(E,A,C,B){var D=B.has("$animateCss")?B.get("$animateCss"):null;
return{link:function(O,I,M){var F=C(M.expanding),N=C(M.expanded),H=C(M.collapsing),P=C(M.collapsed);
if(!O.$eval(M.uibCollapse)){I.addClass("in").addClass("collapse").attr("aria-expanded",true).attr("aria-hidden",false).css({height:"auto"})
}function L(){if(I.hasClass("collapse")&&I.hasClass("in")){return 
}A.resolve(F(O)).then(function(){I.removeClass("collapse").addClass("collapsing").attr("aria-expanded",true).attr("aria-hidden",false);
if(D){D(I,{addClass:"in",easing:"ease",to:{height:I[0].scrollHeight+"px"}}).start()["finally"](K)
}else{E.addClass(I,"in",{to:{height:I[0].scrollHeight+"px"}}).then(K)
}})
}function K(){I.removeClass("collapsing").addClass("collapse").css({height:"auto"});
N(O)
}function J(){if(!I.hasClass("collapse")&&!I.hasClass("in")){return G()
}A.resolve(H(O)).then(function(){I.css({height:I[0].scrollHeight+"px"}).removeClass("collapse").addClass("collapsing").attr("aria-expanded",false).attr("aria-hidden",true);
if(D){D(I,{removeClass:"in",to:{height:"0"}}).start()["finally"](G)
}else{E.removeClass(I,"in",{to:{height:"0"}}).then(G)
}})
}function G(){I.css({height:"0"});
I.removeClass("collapsing").addClass("collapse");
P(O)
}O.$watch(M.uibCollapse,function(Q){if(Q){J()
}else{L()
}})
}}
}]);
angular.module("ui.bootstrap.accordion",["ui.bootstrap.collapse"]).constant("uibAccordionConfig",{closeOthers:true}).controller("UibAccordionController",["$scope","$attrs","uibAccordionConfig",function(C,A,B){this.groups=[];
this.closeOthers=function(E){var D=angular.isDefined(A.closeOthers)?C.$eval(A.closeOthers):B.closeOthers;
if(D){angular.forEach(this.groups,function(F){if(F!==E){F.isOpen=false
}})
}};
this.addGroup=function(E){var D=this;
this.groups.push(E);
E.$on("$destroy",function(F){D.removeGroup(E)
})
};
this.removeGroup=function(E){var D=this.groups.indexOf(E);
if(D!==-1){this.groups.splice(D,1)
}}
}]).directive("uibAccordion",function(){return{controller:"UibAccordionController",controllerAs:"accordion",transclude:true,templateUrl:function(B,A){return A.templateUrl||"uib/template/accordion/accordion.html"
}}
}).directive("uibAccordionGroup",function(){return{require:"^uibAccordion",transclude:true,replace:true,templateUrl:function(B,A){return A.templateUrl||"uib/template/accordion/accordion-group.html"
},scope:{heading:"@",panelClass:"@?",isOpen:"=?",isDisabled:"=?"},controller:function(){this.setHeading=function(A){this.heading=A
}
},link:function(D,B,A,C){C.addGroup(D);
D.openClass=A.openClass||"panel-open";
D.panelClass=A.panelClass||"panel-default";
D.$watch("isOpen",function(F){B.toggleClass(D.openClass,!!F);
if(F){C.closeOthers(D)
}});
D.toggleOpen=function(F){if(!D.isDisabled){if(!F||F.which===32){D.isOpen=!D.isOpen
}}};
var E="accordiongroup-"+D.$id+"-"+Math.floor(Math.random()*10000);
D.headingId=E+"-tab";
D.panelId=E+"-panel"
}}
}).directive("uibAccordionHeading",function(){return{transclude:true,template:"",replace:true,require:"^uibAccordionGroup",link:function(D,C,B,E,A){E.setHeading(A(D,angular.noop))
}}
}).directive("uibAccordionTransclude",function(){return{require:"^uibAccordionGroup",link:function(D,C,B,A){D.$watch(function(){return A[B.uibAccordionTransclude]
},function(F){if(F){var E=angular.element(C[0].querySelector("[uib-accordion-header]"));
E.html("");
E.append(F)
}})
}}
});
angular.module("ui.bootstrap.alert",[]).controller("UibAlertController",["$scope","$attrs","$interpolate","$timeout",function(B,A,E,D){B.closeable=!!A.close;
var C=angular.isDefined(A.dismissOnTimeout)?E(A.dismissOnTimeout)(B.$parent):null;
if(C){D(function(){B.close()
},parseInt(C,10))
}}]).directive("uibAlert",function(){return{controller:"UibAlertController",controllerAs:"alert",templateUrl:function(B,A){return A.templateUrl||"uib/template/alert/alert.html"
},transclude:true,replace:true,scope:{type:"@",close:"&"}}
});
angular.module("ui.bootstrap.buttons",[]).constant("uibButtonConfig",{activeClass:"active",toggleEvent:"click"}).controller("UibButtonsController",["uibButtonConfig",function(A){this.activeClass=A.activeClass||"active";
this.toggleEvent=A.toggleEvent||"click"
}]).directive("uibBtnRadio",["$parse",function(A){return{require:["uibBtnRadio","ngModel"],controller:"UibButtonsController",controllerAs:"buttons",link:function(G,F,E,C){var B=C[0],D=C[1];
var H=A(E.uibUncheckable);
F.find("input").css({display:"none"});
D.$render=function(){F.toggleClass(B.activeClass,angular.equals(D.$modelValue,G.$eval(E.uibBtnRadio)))
};
F.on(B.toggleEvent,function(){if(E.disabled){return 
}var I=F.hasClass(B.activeClass);
if(!I||angular.isDefined(E.uncheckable)){G.$apply(function(){D.$setViewValue(I?null:G.$eval(E.uibBtnRadio));
D.$render()
})
}});
if(E.uibUncheckable){G.$watch(H,function(I){E.$set("uncheckable",I?"":undefined)
})
}}}
}]).directive("uibBtnCheckbox",function(){return{require:["uibBtnCheckbox","ngModel"],controller:"UibButtonsController",controllerAs:"button",link:function(H,F,G,E){var C=E[0],B=E[1];
F.find("input").css({display:"none"});
function D(){return A(G.btnCheckboxTrue,true)
}function I(){return A(G.btnCheckboxFalse,false)
}function A(K,J){return angular.isDefined(K)?H.$eval(K):J
}B.$render=function(){F.toggleClass(C.activeClass,angular.equals(B.$modelValue,D()))
};
F.on(C.toggleEvent,function(){if(G.disabled){return 
}H.$apply(function(){B.$setViewValue(F.hasClass(C.activeClass)?I():D());
B.$render()
})
})
}}
});
angular.module("ui.bootstrap.carousel",[]).controller("UibCarouselController",["$scope","$element","$interval","$timeout","$animate",function(P,N,Q,T,R){var M=this,O=M.slides=P.slides=[],I="uib-slideDirection",A=P.active,J,F,D=[];
var K=false;
M.addSlide=function(W,X){O.push({slide:W,element:X});
O.sort(function(Z,Y){return +Z.slide.index-+Y.slide.index
});
if(W.index===P.active||O.length===1&&!angular.isNumber(P.active)){if(P.$currentTransition){P.$currentTransition=null
}A=W.index;
P.active=W.index;
V(A);
M.select(O[G(W)]);
if(O.length===1){P.play()
}}};
M.getCurrentIndex=function(){for(var W=0;
W<O.length;
W++){if(O[W].slide.index===A){return W
}}};
M.next=P.next=function(){var W=(M.getCurrentIndex()+1)%O.length;
if(W===0&&P.noWrap()){P.pause();
return 
}return M.select(O[W],"next")
};
M.prev=P.prev=function(){var W=M.getCurrentIndex()-1<0?O.length-1:M.getCurrentIndex()-1;
if(P.noWrap()&&W===O.length-1){P.pause();
return 
}return M.select(O[W],"prev")
};
M.removeSlide=function(W){var X=G(W);
var Y=D.indexOf(O[X]);
if(Y!==-1){D.splice(Y,1)
}O.splice(X,1);
if(O.length>0&&A===X){if(X>=O.length){A=O.length-1;
P.active=A;
V(A);
M.select(O[O.length-1])
}else{A=X;
P.active=A;
V(A);
M.select(O[X])
}}else{if(A>X){A--;
P.active=A
}}if(O.length===0){A=null;
P.active=null;
S()
}};
M.select=P.select=function(Y,X){var W=G(Y.slide);
if(X===undefined){X=W>M.getCurrentIndex()?"next":"prev"
}if(Y.slide.index!==A&&!P.$currentTransition){U(Y.slide,W,X)
}else{if(Y&&Y.slide.index!==A&&P.$currentTransition){D.push(O[W])
}}};
P.indexOfSlide=function(W){return +W.slide.index
};
P.isActive=function(W){return P.active===W.slide.index
};
P.isPrevDisabled=function(){return P.active===0&&P.noWrap()
};
P.isNextDisabled=function(){return P.active===O.length-1&&P.noWrap()
};
P.pause=function(){if(!P.noPause){F=false;
B()
}};
P.play=function(){if(!F){F=true;
H()
}};
P.$on("$destroy",function(){K=true;
B()
});
P.$watch("noTransition",function(W){R.enabled(N,!W)
});
P.$watch("interval",H);
P.$watchCollection("slides",L);
P.$watch("active",function(X){if(angular.isNumber(X)&&A!==X){for(var Y=0;
Y<O.length;
Y++){if(O[Y].slide.index===X){X=Y;
break
}}var W=O[X];
if(W){V(X);
M.select(O[X]);
A=X
}}});
function S(){while(D.length){D.shift()
}}function C(X){for(var Y=0,W=O.length;
Y<W;
++Y){if(O[Y].index===X){return O[Y]
}}}function V(W){for(var X=0;
X<O.length;
X++){O[X].slide.active=X===W
}}function U(W,X,Z){if(K){return 
}angular.extend(W,{direction:Z});
angular.extend(O[A].slide||{},{direction:Z});
if(R.enabled(N)&&!P.$currentTransition&&O[X].element&&M.slides.length>1){O[X].element.data(I,W.direction);
var Y=M.getCurrentIndex();
if(angular.isNumber(Y)&&O[Y].element){O[Y].element.data(I,W.direction)
}P.$currentTransition=true;
R.on("addClass",O[X].element,function(c,b){if(b==="close"){P.$currentTransition=null;
R.off("addClass",c);
if(D.length){var e=D.pop().slide;
var a=e.index;
var d=a>M.getCurrentIndex()?"next":"prev";
S();
U(e,a,d)
}}})
}P.active=W.index;
A=W.index;
V(X);
H()
}function G(W){for(var X=0;
X<O.length;
X++){if(O[X].slide===W){return X
}}}function B(){if(J){Q.cancel(J);
J=null
}}function L(W){if(!W.length){P.$currentTransition=null;
S()
}}function H(){B();
var W=+P.interval;
if(!isNaN(W)&&W>0){J=Q(E,W)
}}function E(){var W=+P.interval;
if(F&&!isNaN(W)&&W>0&&O.length){P.next()
}else{P.pause()
}}}]).directive("uibCarousel",function(){return{transclude:true,replace:true,controller:"UibCarouselController",controllerAs:"carousel",templateUrl:function(B,A){return A.templateUrl||"uib/template/carousel/carousel.html"
},scope:{active:"=",interval:"=",noTransition:"=",noPause:"=",noWrap:"&"}}
}).directive("uibSlide",function(){return{require:"^uibCarousel",transclude:true,replace:true,templateUrl:function(B,A){return A.templateUrl||"uib/template/carousel/slide.html"
},scope:{actual:"=?",index:"=?"},link:function(C,B,A,D){D.addSlide(C,B);
C.$on("$destroy",function(){D.removeSlide(C)
})
}}
}).animation(".item",["$animateCss",function(C){var A="uib-slideDirection";
function B(D,E,F){D.removeClass(E);
if(F){F()
}}return{beforeAddClass:function(E,F,D){if(F==="active"){var I=false;
var H=E.data(A);
var G=H==="next"?"left":"right";
var J=B.bind(this,E,G+" "+H,D);
E.addClass(H);
C(E,{addClass:G}).start().done(J);
return function(){I=true
}
}D()
},beforeRemoveClass:function(E,F,D){if(F==="active"){var I=false;
var H=E.data(A);
var G=H==="next"?"left":"right";
var J=B.bind(this,E,G,D);
C(E,{addClass:G}).start().done(J);
return function(){I=true
}
}D()
}}
}]);
angular.module("ui.bootstrap.dateparser",[]).service("uibDateParser",["$log","$locale","dateFilter","orderByFilter",function(O,D,E,J){var K=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
var I;
var A;
this.init=function(){I=D.id;
this.parsers={};
this.formatters={};
A=[{key:"yyyy",regex:"\\d{4}",apply:function(P){this.year=+P
},formatter:function(Q){var P=new Date();
P.setFullYear(Math.abs(Q.getFullYear()));
return E(P,"yyyy")
}},{key:"yy",regex:"\\d{2}",apply:function(P){P=+P;
this.year=P<69?P+2000:P+1900
},formatter:function(Q){var P=new Date();
P.setFullYear(Math.abs(Q.getFullYear()));
return E(P,"yy")
}},{key:"y",regex:"\\d{1,4}",apply:function(P){this.year=+P
},formatter:function(Q){var P=new Date();
P.setFullYear(Math.abs(Q.getFullYear()));
return E(P,"y")
}},{key:"M!",regex:"0?[1-9]|1[0-2]",apply:function(P){this.month=P-1
},formatter:function(P){var Q=P.getMonth();
if(/^[0-9]$/.test(Q)){return E(P,"MM")
}return E(P,"M")
}},{key:"MMMM",regex:D.DATETIME_FORMATS.MONTH.join("|"),apply:function(P){this.month=D.DATETIME_FORMATS.MONTH.indexOf(P)
},formatter:function(P){return E(P,"MMMM")
}},{key:"MMM",regex:D.DATETIME_FORMATS.SHORTMONTH.join("|"),apply:function(P){this.month=D.DATETIME_FORMATS.SHORTMONTH.indexOf(P)
},formatter:function(P){return E(P,"MMM")
}},{key:"MM",regex:"0[1-9]|1[0-2]",apply:function(P){this.month=P-1
},formatter:function(P){return E(P,"MM")
}},{key:"M",regex:"[1-9]|1[0-2]",apply:function(P){this.month=P-1
},formatter:function(P){return E(P,"M")
}},{key:"d!",regex:"[0-2]?[0-9]{1}|3[0-1]{1}",apply:function(P){this.date=+P
},formatter:function(P){var Q=P.getDate();
if(/^[1-9]$/.test(Q)){return E(P,"dd")
}return E(P,"d")
}},{key:"dd",regex:"[0-2][0-9]{1}|3[0-1]{1}",apply:function(P){this.date=+P
},formatter:function(P){return E(P,"dd")
}},{key:"d",regex:"[1-2]?[0-9]{1}|3[0-1]{1}",apply:function(P){this.date=+P
},formatter:function(P){return E(P,"d")
}},{key:"EEEE",regex:D.DATETIME_FORMATS.DAY.join("|"),formatter:function(P){return E(P,"EEEE")
}},{key:"EEE",regex:D.DATETIME_FORMATS.SHORTDAY.join("|"),formatter:function(P){return E(P,"EEE")
}},{key:"HH",regex:"(?:0|1)[0-9]|2[0-3]",apply:function(P){this.hours=+P
},formatter:function(P){return E(P,"HH")
}},{key:"hh",regex:"0[0-9]|1[0-2]",apply:function(P){this.hours=+P
},formatter:function(P){return E(P,"hh")
}},{key:"H",regex:"1?[0-9]|2[0-3]",apply:function(P){this.hours=+P
},formatter:function(P){return E(P,"H")
}},{key:"h",regex:"[0-9]|1[0-2]",apply:function(P){this.hours=+P
},formatter:function(P){return E(P,"h")
}},{key:"mm",regex:"[0-5][0-9]",apply:function(P){this.minutes=+P
},formatter:function(P){return E(P,"mm")
}},{key:"m",regex:"[0-9]|[1-5][0-9]",apply:function(P){this.minutes=+P
},formatter:function(P){return E(P,"m")
}},{key:"sss",regex:"[0-9][0-9][0-9]",apply:function(P){this.milliseconds=+P
},formatter:function(P){return E(P,"sss")
}},{key:"ss",regex:"[0-5][0-9]",apply:function(P){this.seconds=+P
},formatter:function(P){return E(P,"ss")
}},{key:"s",regex:"[0-9]|[1-5][0-9]",apply:function(P){this.seconds=+P
},formatter:function(P){return E(P,"s")
}},{key:"a",regex:D.DATETIME_FORMATS.AMPMS.join("|"),apply:function(P){if(this.hours===12){this.hours=0
}if(P==="PM"){this.hours+=12
}},formatter:function(P){return E(P,"a")
}},{key:"Z",regex:"[+-]\\d{4}",apply:function(T){var S=T.match(/([+-])(\d{2})(\d{2})/),Q=S[1],P=S[2],R=S[3];
this.hours+=G(Q+P);
this.minutes+=G(Q+R)
},formatter:function(P){return E(P,"Z")
}},{key:"ww",regex:"[0-4][0-9]|5[0-3]",formatter:function(P){return E(P,"ww")
}},{key:"w",regex:"[0-9]|[1-4][0-9]|5[0-3]",formatter:function(P){return E(P,"w")
}},{key:"GGGG",regex:D.DATETIME_FORMATS.ERANAMES.join("|").replace(/\s/g,"\\s"),formatter:function(P){return E(P,"GGGG")
}},{key:"GGG",regex:D.DATETIME_FORMATS.ERAS.join("|"),formatter:function(P){return E(P,"GGG")
}},{key:"GG",regex:D.DATETIME_FORMATS.ERAS.join("|"),formatter:function(P){return E(P,"GG")
}},{key:"G",regex:D.DATETIME_FORMATS.ERAS.join("|"),formatter:function(P){return E(P,"G")
}}]
};
this.init();
function F(T,R){var S=[],Q=T.split("");
var V=T.indexOf("'");
if(V>-1){var U=false;
T=T.split("");
for(var P=V;
P<T.length;
P++){if(U){if(T[P]==="'"){if(P+1<T.length&&T[P+1]==="'"){T[P+1]="$";
Q[P+1]=""
}else{Q[P]="";
U=false
}}T[P]="$"
}else{if(T[P]==="'"){T[P]="$";
Q[P]="";
U=true
}}}T=T.join("")
}angular.forEach(A,function(Y){var W=T.indexOf(Y.key);
if(W>-1){T=T.split("");
Q[W]="("+Y.regex+")";
T[W]="$";
for(var X=W+1,Z=W+Y.key.length;
X<Z;
X++){Q[X]="";
T[X]="$"
}T=T.join("");
S.push({index:W,key:Y.key,apply:Y[R],matcher:Y.regex})
}});
return{regex:new RegExp("^"+Q.join("")+"$"),map:J(S,"index")}
}this.filter=function(Q,S){if(!angular.isDate(Q)||isNaN(Q)||!S){return""
}S=D.DATETIME_FORMATS[S]||S;
if(D.id!==I){this.init()
}if(!this.formatters[S]){this.formatters[S]=F(S,"formatter")
}var T=this.formatters[S],R=T.map;
var P=S;
return R.reduce(function(Y,X,W){var V=P.match(new RegExp("(.*)"+X.key));
if(V&&angular.isString(V[1])){Y+=V[1];
P=P.replace(V[1]+X.key,"")
}var U=W===R.length-1?P:"";
if(X.apply){return Y+X.apply.call(null,Q)+U
}return Y+U
},"")
};
this.parse=function(b,c,U){if(!angular.isString(b)||!c){return b
}c=D.DATETIME_FORMATS[c]||c;
c=c.replace(K,"\\$&");
if(D.id!==I){this.init()
}if(!this.parsers[c]){this.parsers[c]=F(c,"apply")
}var Q=this.parsers[c],a=Q.regex,R=Q.map,X=b.match(a),d=false;
if(X&&X.length){var Y,S;
if(angular.isDate(U)&&!isNaN(U.getTime())){Y={year:U.getFullYear(),month:U.getMonth(),date:U.getDate(),hours:U.getHours(),minutes:U.getMinutes(),seconds:U.getSeconds(),milliseconds:U.getMilliseconds()}
}else{if(U){O.warn("dateparser:","baseDate is not a valid date")
}Y={year:1900,month:0,date:1,hours:0,minutes:0,seconds:0,milliseconds:0}
}for(var W=1,T=X.length;
W<T;
W++){var P=R[W-1];
if(P.matcher==="Z"){d=true
}if(P.apply){P.apply.call(Y,X[W])
}}var V=d?Date.prototype.setUTCFullYear:Date.prototype.setFullYear;
var Z=d?Date.prototype.setUTCHours:Date.prototype.setHours;
if(M(Y.year,Y.month,Y.date)){if(angular.isDate(U)&&!isNaN(U.getTime())&&!d){S=new Date(U);
V.call(S,Y.year,Y.month,Y.date);
Z.call(S,Y.hours,Y.minutes,Y.seconds,Y.milliseconds)
}else{S=new Date(0);
V.call(S,Y.year,Y.month,Y.date);
Z.call(S,Y.hours||0,Y.minutes||0,Y.seconds||0,Y.milliseconds||0)
}}return S
}};
function M(Q,R,P){if(P<1){return false
}if(R===1&&P>28){return P===29&&(Q%4===0&&Q%100!==0||Q%400===0)
}if(R===3||R===5||R===8||R===10){return P<31
}return true
}function G(P){return parseInt(P,10)
}this.toTimezone=N;
this.fromTimezone=B;
this.timezoneToOffset=C;
this.addDateMinutes=L;
this.convertTimezoneToLocal=H;
function N(P,Q){return P&&Q?H(P,Q):P
}function B(P,Q){return P&&Q?H(P,Q,true):P
}function C(P,R){var Q=Date.parse("Jan 01, 1970 00:00:00 "+P)/60000;
return isNaN(Q)?R:Q
}function L(P,Q){P=new Date(P.getTime());
P.setMinutes(P.getMinutes()+Q);
return P
}function H(Q,S,P){P=P?-1:1;
var R=C(S,Q.getTimezoneOffset());
return L(Q,P*(R-Q.getTimezoneOffset()))
}}]);
angular.module("ui.bootstrap.isClass",[]).directive("uibIsClass",["$animate",function(D){var B=/^\s*([\s\S]+?)\s+on\s+([\s\S]+?)\s*$/;
var C=/^\s*([\s\S]+?)\s+for\s+([\s\S]+?)\s*$/;
var A={};
return{restrict:"A",compile:function(H,G){var N=[];
var E=[];
var M={};
var Q=null;
var O=G.uibIsClass.match(B);
var F=O[2];
var L=O[1];
var P=L.split(",");
return I;
function I(T,S,R){N.push(T);
E.push({scope:T,element:S});
P.forEach(function(V,U){K(V,T)
});
T.$on("$destroy",J)
}function K(X,U){var W=X.match(C);
var T=U.$eval(W[1]);
var S=W[2];
var V=M[X];
if(!V){var R=function(Y){var Z=null;
E.some(function(a){var b=a.scope.$eval(F);
if(b===Y){Z=a;
return true
}});
if(V.lastActivated!==Z){if(V.lastActivated){D.removeClass(V.lastActivated.element,T)
}if(Z){D.addClass(Z.element,T)
}V.lastActivated=Z
}};
M[X]=V={lastActivated:null,scope:U,watchFn:R,compareWithExp:S,watcher:U.$watch(S,R)}
}V.watchFn(U.$eval(S))
}function J(U){var S=U.targetScope;
var R=N.indexOf(S);
N.splice(R,1);
E.splice(R,1);
if(N.length){var T=N[0];
angular.forEach(M,function(V){if(V.scope===S){V.watcher=T.$watch(V.compareWithExp,V.watchFn);
V.scope=T
}})
}else{M={}
}}}}
}]);
angular.module("ui.bootstrap.datepicker",["ui.bootstrap.dateparser","ui.bootstrap.isClass"]).value("$datepickerSuppressError",false).value("$datepickerLiteralWarning",true).constant("uibDatepickerConfig",{datepickerMode:"day",formatDay:"dd",formatMonth:"MMMM",formatYear:"yyyy",formatDayHeader:"EEE",formatDayTitle:"MMMM yyyy",formatMonthTitle:"yyyy",maxDate:null,maxMode:"year",minDate:null,minMode:"day",ngModelOptions:{},shortcutPropagation:false,showWeeks:true,yearColumns:5,yearRows:4}).controller("UibDatepickerController",["$scope","$attrs","$parse","$interpolate","$locale","$log","dateFilter","uibDatepickerConfig","$datepickerLiteralWarning","$datepickerSuppressError","uibDateParser",function(M,F,E,I,Q,N,H,D,R,J,A){var L=this,K={$setViewValue:angular.noop},G={},O=[],B=!!F.datepickerOptions;
if(!M.datepickerOptions){M.datepickerOptions={}
}this.modes=["day","month","year"];
["customClass","dateDisabled","datepickerMode","formatDay","formatDayHeader","formatDayTitle","formatMonth","formatMonthTitle","formatYear","maxDate","maxMode","minDate","minMode","showWeeks","shortcutPropagation","startingDay","yearColumns","yearRows"].forEach(function(S){switch(S){case"customClass":case"dateDisabled":M[S]=M.datepickerOptions[S]||angular.noop;
break;
case"datepickerMode":M.datepickerMode=angular.isDefined(M.datepickerOptions.datepickerMode)?M.datepickerOptions.datepickerMode:D.datepickerMode;
break;
case"formatDay":case"formatDayHeader":case"formatDayTitle":case"formatMonth":case"formatMonthTitle":case"formatYear":L[S]=angular.isDefined(M.datepickerOptions[S])?I(M.datepickerOptions[S])(M.$parent):D[S];
break;
case"showWeeks":case"shortcutPropagation":case"yearColumns":case"yearRows":L[S]=angular.isDefined(M.datepickerOptions[S])?M.datepickerOptions[S]:D[S];
break;
case"startingDay":if(angular.isDefined(M.datepickerOptions.startingDay)){L.startingDay=M.datepickerOptions.startingDay
}else{if(angular.isNumber(D.startingDay)){L.startingDay=D.startingDay
}else{L.startingDay=(Q.DATETIME_FORMATS.FIRSTDAYOFWEEK+8)%7
}}break;
case"maxDate":case"minDate":M.$watch("datepickerOptions."+S,function(T){if(T){if(angular.isDate(T)){L[S]=A.fromTimezone(new Date(T),G.timezone)
}else{if(R){N.warn("Literal date support has been deprecated, please switch to date object usage")
}L[S]=new Date(H(T,"medium"))
}}else{L[S]=D[S]?A.fromTimezone(new Date(D[S]),G.timezone):null
}L.refreshView()
});
break;
case"maxMode":case"minMode":if(M.datepickerOptions[S]){M.$watch(function(){return M.datepickerOptions[S]
},function(T){L[S]=M[S]=angular.isDefined(T)?T:datepickerOptions[S];
if(S==="minMode"&&L.modes.indexOf(M.datepickerOptions.datepickerMode)<L.modes.indexOf(L[S])||S==="maxMode"&&L.modes.indexOf(M.datepickerOptions.datepickerMode)>L.modes.indexOf(L[S])){M.datepickerMode=L[S];
M.datepickerOptions.datepickerMode=L[S]
}})
}else{L[S]=M[S]=D[S]||null
}break
}});
M.uniqueId="datepicker-"+M.$id+"-"+Math.floor(Math.random()*10000);
M.disabled=angular.isDefined(F.disabled)||false;
if(angular.isDefined(F.ngDisabled)){O.push(M.$parent.$watch(F.ngDisabled,function(S){M.disabled=S;
L.refreshView()
}))
}M.isActive=function(S){if(L.compare(S.date,L.activeDate)===0){M.activeDateId=S.uid;
return true
}return false
};
this.init=function(S){K=S;
G=S.$options||D.ngModelOptions;
if(M.datepickerOptions.initDate){L.activeDate=A.fromTimezone(M.datepickerOptions.initDate,G.timezone)||new Date();
M.$watch("datepickerOptions.initDate",function(T){if(T&&(K.$isEmpty(K.$modelValue)||K.$invalid)){L.activeDate=A.fromTimezone(T,G.timezone);
L.refreshView()
}})
}else{L.activeDate=new Date()
}this.activeDate=K.$modelValue?A.fromTimezone(new Date(K.$modelValue),G.timezone):A.fromTimezone(new Date(),G.timezone);
K.$render=function(){L.render()
}
};
this.render=function(){if(K.$viewValue){var S=new Date(K.$viewValue),T=!isNaN(S);
if(T){this.activeDate=A.fromTimezone(S,G.timezone)
}else{if(!J){N.error('Datepicker directive: "ng-model" value must be a Date object')
}}}this.refreshView()
};
this.refreshView=function(){if(this.element){M.selectedDt=null;
this._refreshView();
if(M.activeDt){M.activeDateId=M.activeDt.uid
}var S=K.$viewValue?new Date(K.$viewValue):null;
S=A.fromTimezone(S,G.timezone);
K.$setValidity("dateDisabled",!S||this.element&&!this.isDisabled(S))
}};
this.createDateObject=function(U,X){var T=K.$viewValue?new Date(K.$viewValue):null;
T=A.fromTimezone(T,G.timezone);
var S=new Date();
S=A.fromTimezone(S,G.timezone);
var W=this.compare(U,S);
var V={date:U,label:A.filter(U,X),selected:T&&this.compare(U,T)===0,disabled:this.isDisabled(U),past:W<0,current:W===0,future:W>0,customClass:this.customClass(U)||null};
if(T&&this.compare(U,T)===0){M.selectedDt=V
}if(L.activeDate&&this.compare(V.date,L.activeDate)===0){M.activeDt=V
}return V
};
this.isDisabled=function(S){return M.disabled||this.minDate&&this.compare(S,this.minDate)<0||this.maxDate&&this.compare(S,this.maxDate)>0||M.dateDisabled&&M.dateDisabled({date:S,mode:M.datepickerMode})
};
this.customClass=function(S){return M.customClass({date:S,mode:M.datepickerMode})
};
this.split=function(S,T){var U=[];
while(S.length>0){U.push(S.splice(0,T))
}return U
};
M.select=function(S){if(M.datepickerMode===L.minMode){var T=K.$viewValue?A.fromTimezone(new Date(K.$viewValue),G.timezone):new Date(0,0,0,0,0,0,0);
T.setFullYear(S.getFullYear(),S.getMonth(),S.getDate());
T=A.toTimezone(T,G.timezone);
K.$setViewValue(T);
K.$render()
}else{L.activeDate=S;
P(L.modes[L.modes.indexOf(M.datepickerMode)-1]);
M.$emit("uib:datepicker.mode")
}M.$broadcast("uib:datepicker.focus")
};
M.move=function(U){var S=L.activeDate.getFullYear()+U*(L.step.years||0),T=L.activeDate.getMonth()+U*(L.step.months||0);
L.activeDate.setFullYear(S,T,1);
L.refreshView()
};
M.toggleMode=function(S){S=S||1;
if(M.datepickerMode===L.maxMode&&S===1||M.datepickerMode===L.minMode&&S===-1){return 
}P(L.modes[L.modes.indexOf(M.datepickerMode)+S]);
M.$emit("uib:datepicker.mode")
};
M.keys={13:"enter",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down"};
var C=function(){L.element[0].focus()
};
M.$on("uib:datepicker.focus",C);
M.keydown=function(S){var T=M.keys[S.which];
if(!T||S.shiftKey||S.altKey||M.disabled){return 
}S.preventDefault();
if(!L.shortcutPropagation){S.stopPropagation()
}if(T==="enter"||T==="space"){if(L.isDisabled(L.activeDate)){return 
}M.select(L.activeDate)
}else{if(S.ctrlKey&&(T==="up"||T==="down")){M.toggleMode(T==="up"?1:-1)
}else{L.handleKeyDown(T,S);
L.refreshView()
}}};
M.$on("$destroy",function(){while(O.length){O.shift()()
}});
function P(S){M.datepickerMode=S;
M.datepickerOptions.datepickerMode=S
}}]).controller("UibDaypickerController",["$scope","$element","dateFilter",function(C,A,D){var F=[31,28,31,30,31,30,31,31,30,31,30,31];
this.step={months:1};
this.element=A;
function B(G,H){return H===1&&G%4===0&&(G%100!==0||G%400===0)?29:F[H]
}this.init=function(G){angular.extend(G,this);
C.showWeeks=G.showWeeks;
G.refreshView()
};
this.getDates=function(G,L){var K=new Array(L),J=new Date(G),I=0,H;
while(I<L){H=new Date(J);
K[I++]=H;
J.setDate(J.getDate()+1)
}return K
};
this._refreshView=function(){var O=this.activeDate.getFullYear(),N=this.activeDate.getMonth(),P=new Date(this.activeDate);
P.setFullYear(O,N,1);
var J=this.startingDay-P.getDay(),R=J>0?7-J:-J,G=new Date(P);
if(R>0){G.setDate(-R+1)
}var Q=this.getDates(G,42);
for(var L=0;
L<42;
L++){Q[L]=angular.extend(this.createDateObject(Q[L],this.formatDay),{secondary:Q[L].getMonth()!==N,uid:C.uniqueId+"-"+L})
}C.labels=new Array(7);
for(var K=0;
K<7;
K++){C.labels[K]={abbr:D(Q[K].date,this.formatDayHeader),full:D(Q[K].date,"EEEE")}
}C.title=D(this.activeDate,this.formatDayTitle);
C.rows=this.split(Q,7);
if(C.showWeeks){C.weekNumbers=[];
var M=(4+7-this.startingDay)%7,H=C.rows.length;
for(var I=0;
I<H;
I++){C.weekNumbers.push(E(C.rows[I][M].date))
}}};
this.compare=function(J,I){var H=new Date(J.getFullYear(),J.getMonth(),J.getDate());
var G=new Date(I.getFullYear(),I.getMonth(),I.getDate());
H.setFullYear(J.getFullYear());
G.setFullYear(I.getFullYear());
return H-G
};
function E(G){var I=new Date(G);
I.setDate(I.getDate()+4-(I.getDay()||7));
var H=I.getTime();
I.setMonth(0);
I.setDate(1);
return Math.floor(Math.round((H-I)/86400000)/7)+1
}this.handleKeyDown=function(I,G){var H=this.activeDate.getDate();
if(I==="left"){H=H-1
}else{if(I==="up"){H=H-7
}else{if(I==="right"){H=H+1
}else{if(I==="down"){H=H+7
}else{if(I==="pageup"||I==="pagedown"){var J=this.activeDate.getMonth()+(I==="pageup"?-1:1);
this.activeDate.setMonth(J,1);
H=Math.min(B(this.activeDate.getFullYear(),this.activeDate.getMonth()),H)
}else{if(I==="home"){H=1
}else{if(I==="end"){H=B(this.activeDate.getFullYear(),this.activeDate.getMonth())
}}}}}}}this.activeDate.setDate(H)
}
}]).controller("UibMonthpickerController",["$scope","$element","dateFilter",function(B,A,C){this.step={years:1};
this.element=A;
this.init=function(D){angular.extend(D,this);
D.refreshView()
};
this._refreshView=function(){var D=new Array(12),G=this.activeDate.getFullYear(),E;
for(var F=0;
F<12;
F++){E=new Date(this.activeDate);
E.setFullYear(G,F,1);
D[F]=angular.extend(this.createDateObject(E,this.formatMonth),{uid:B.uniqueId+"-"+F})
}B.title=C(this.activeDate,this.formatMonthTitle);
B.rows=this.split(D,3)
};
this.compare=function(G,F){var E=new Date(G.getFullYear(),G.getMonth());
var D=new Date(F.getFullYear(),F.getMonth());
E.setFullYear(G.getFullYear());
D.setFullYear(F.getFullYear());
return E-D
};
this.handleKeyDown=function(F,D){var E=this.activeDate.getMonth();
if(F==="left"){E=E-1
}else{if(F==="up"){E=E-3
}else{if(F==="right"){E=E+1
}else{if(F==="down"){E=E+3
}else{if(F==="pageup"||F==="pagedown"){var G=this.activeDate.getFullYear()+(F==="pageup"?-1:1);
this.activeDate.setFullYear(G)
}else{if(F==="home"){E=0
}else{if(F==="end"){E=11
}}}}}}}this.activeDate.setMonth(E)
}
}]).controller("UibYearpickerController",["$scope","$element","dateFilter",function(D,A,F){var C,B;
this.element=A;
function E(G){return parseInt((G-1)/B,10)*B+1
}this.yearpickerInit=function(){C=this.yearColumns;
B=this.yearRows*C;
this.step={years:B}
};
this._refreshView=function(){var I=new Array(B),G;
for(var H=0,J=E(this.activeDate.getFullYear());
H<B;
H++){G=new Date(this.activeDate);
G.setFullYear(J+H,0,1);
I[H]=angular.extend(this.createDateObject(G,this.formatYear),{uid:D.uniqueId+"-"+H})
}D.title=[I[0].label,I[B-1].label].join(" - ");
D.rows=this.split(I,C);
D.columns=C
};
this.compare=function(H,G){return H.getFullYear()-G.getFullYear()
};
this.handleKeyDown=function(I,G){var H=this.activeDate.getFullYear();
if(I==="left"){H=H-1
}else{if(I==="up"){H=H-C
}else{if(I==="right"){H=H+1
}else{if(I==="down"){H=H+C
}else{if(I==="pageup"||I==="pagedown"){H+=(I==="pageup"?-1:1)*B
}else{if(I==="home"){H=E(this.activeDate.getFullYear())
}else{if(I==="end"){H=E(this.activeDate.getFullYear())+B-1
}}}}}}}this.activeDate.setFullYear(H)
}
}]).directive("uibDatepicker",function(){return{replace:true,templateUrl:function(B,A){return A.templateUrl||"uib/template/datepicker/datepicker.html"
},scope:{datepickerOptions:"=?"},require:["uibDatepicker","^ngModel"],controller:"UibDatepickerController",controllerAs:"datepicker",link:function(E,D,C,A){var F=A[0],B=A[1];
F.init(B)
}}
}).directive("uibDaypicker",function(){return{replace:true,templateUrl:function(B,A){return A.templateUrl||"uib/template/datepicker/day.html"
},require:["^uibDatepicker","uibDaypicker"],controller:"UibDaypickerController",link:function(D,C,B,A){var F=A[0],E=A[1];
E.init(F)
}}
}).directive("uibMonthpicker",function(){return{replace:true,templateUrl:function(B,A){return A.templateUrl||"uib/template/datepicker/month.html"
},require:["^uibDatepicker","uibMonthpicker"],controller:"UibMonthpickerController",link:function(E,D,C,A){var F=A[0],B=A[1];
B.init(F)
}}
}).directive("uibYearpicker",function(){return{replace:true,templateUrl:function(B,A){return A.templateUrl||"uib/template/datepicker/year.html"
},require:["^uibDatepicker","uibYearpicker"],controller:"UibYearpickerController",link:function(D,C,B,A){var E=A[0];
angular.extend(E,A[1]);
E.yearpickerInit();
E.refreshView()
}}
});
angular.module("ui.bootstrap.position",[]).factory("$uibPosition",["$document","$window",function(G,F){var A;
var C;
var B={normal:/(auto|scroll)/,hidden:/(auto|scroll|hidden)/};
var E={auto:/\s?auto?\s?/i,primary:/^(top|bottom|left|right)$/,secondary:/^(top|bottom|left|right|center)$/,vertical:/^(top|bottom)$/};
var D=/(HTML|BODY)/;
return{getRawNode:function(H){return H.nodeName?H:H[0]||H
},parseStyle:function(H){H=parseFloat(H);
return isFinite(H)?H:0
},offsetParent:function(I){I=this.getRawNode(I);
var H=I.offsetParent||G[0].documentElement;
function J(K){return(F.getComputedStyle(K).position||"static")==="static"
}while(H&&H!==G[0].documentElement&&J(H)){H=H.offsetParent
}return H||G[0].documentElement
},scrollbarWidth:function(H){if(H){if(angular.isUndefined(C)){var I=G.find("body");
I.addClass("uib-position-body-scrollbar-measure");
C=F.innerWidth-I[0].clientWidth;
C=isFinite(C)?C:0;
I.removeClass("uib-position-body-scrollbar-measure")
}return C
}if(angular.isUndefined(A)){var J=angular.element('<div class="uib-position-scrollbar-measure"></div>');
G.find("body").append(J);
A=J[0].offsetWidth-J[0].clientWidth;
A=isFinite(A)?A:0;
J.remove()
}return A
},scrollbarPadding:function(J){J=this.getRawNode(J);
var H=F.getComputedStyle(J);
var M=this.parseStyle(H.paddingRight);
var K=this.parseStyle(H.paddingBottom);
var L=this.scrollParent(J,false,true);
var I=this.scrollbarWidth(L,D.test(L.tagName));
return{scrollbarWidth:I,widthOverflow:L.scrollWidth>L.clientWidth,right:M+I,originalRight:M,heightOverflow:L.scrollHeight>L.clientHeight,bottom:K+I,originalBottom:K}
},isScrollable:function(K,H){K=this.getRawNode(K);
var I=H?B.hidden:B.normal;
var J=F.getComputedStyle(K);
return I.test(J.overflow+J.overflowY+J.overflowX)
},scrollParent:function(I,L,P){I=this.getRawNode(I);
var H=L?B.hidden:B.normal;
var J=G[0].documentElement;
var K=F.getComputedStyle(I);
if(P&&H.test(K.overflow+K.overflowY+K.overflowX)){return I
}var M=K.position==="absolute";
var O=I.parentElement||J;
if(O===J||K.position==="fixed"){return J
}while(O.parentElement&&O!==J){var N=F.getComputedStyle(O);
if(M&&N.position!=="static"){M=false
}if(!M&&H.test(N.overflow+N.overflowY+N.overflowX)){break
}O=O.parentElement
}return O
},position:function(K,M){K=this.getRawNode(K);
var L=this.offset(K);
if(M){var I=F.getComputedStyle(K);
L.top-=this.parseStyle(I.marginTop);
L.left-=this.parseStyle(I.marginLeft)
}var J=this.offsetParent(K);
var H={top:0,left:0};
if(J!==G[0].documentElement){H=this.offset(J);
H.top+=J.clientTop-J.scrollTop;
H.left+=J.clientLeft-J.scrollLeft
}return{width:Math.round(angular.isNumber(L.width)?L.width:K.offsetWidth),height:Math.round(angular.isNumber(L.height)?L.height:K.offsetHeight),top:Math.round(L.top-H.top),left:Math.round(L.left-H.left)}
},offset:function(I){I=this.getRawNode(I);
var H=I.getBoundingClientRect();
return{width:Math.round(angular.isNumber(H.width)?H.width:I.offsetWidth),height:Math.round(angular.isNumber(H.height)?H.height:I.offsetHeight),top:Math.round(H.top+(F.pageYOffset||G[0].documentElement.scrollTop)),left:Math.round(H.left+(F.pageXOffset||G[0].documentElement.scrollLeft))}
},viewportOffset:function(L,M,H){L=this.getRawNode(L);
H=H!==false?true:false;
var I=L.getBoundingClientRect();
var N={top:0,left:0,bottom:0,right:0};
var K=M?G[0].documentElement:this.scrollParent(L);
var O=K.getBoundingClientRect();
N.top=O.top+K.clientTop;
N.left=O.left+K.clientLeft;
if(K===G[0].documentElement){N.top+=F.pageYOffset;
N.left+=F.pageXOffset
}N.bottom=N.top+K.clientHeight;
N.right=N.left+K.clientWidth;
if(H){var J=F.getComputedStyle(K);
N.top+=this.parseStyle(J.paddingTop);
N.bottom-=this.parseStyle(J.paddingBottom);
N.left+=this.parseStyle(J.paddingLeft);
N.right-=this.parseStyle(J.paddingRight)
}return{top:Math.round(I.top-N.top),bottom:Math.round(N.bottom-I.bottom),left:Math.round(I.left-N.left),right:Math.round(N.right-I.right)}
},parsePlacement:function(H){var I=E.auto.test(H);
if(I){H=H.replace(E.auto,"")
}H=H.split("-");
H[0]=H[0]||"top";
if(!E.primary.test(H[0])){H[0]="top"
}H[1]=H[1]||"center";
if(!E.secondary.test(H[1])){H[1]="center"
}if(I){H[2]=true
}else{H[2]=false
}return H
},positionElements:function(H,M,J,O){H=this.getRawNode(H);
M=this.getRawNode(M);
var Q=angular.isDefined(M.offsetWidth)?M.offsetWidth:M.prop("offsetWidth");
var L=angular.isDefined(M.offsetHeight)?M.offsetHeight:M.prop("offsetHeight");
J=this.parsePlacement(J);
var K=O?this.offset(H):this.position(H);
var R={top:0,left:0,placement:""};
if(J[2]){var T=this.viewportOffset(H,O);
var N=F.getComputedStyle(M);
var P={width:Q+Math.round(Math.abs(this.parseStyle(N.marginLeft)+this.parseStyle(N.marginRight))),height:L+Math.round(Math.abs(this.parseStyle(N.marginTop)+this.parseStyle(N.marginBottom)))};
J[0]=J[0]==="top"&&P.height>T.top&&P.height<=T.bottom?"bottom":J[0]==="bottom"&&P.height>T.bottom&&P.height<=T.top?"top":J[0]==="left"&&P.width>T.left&&P.width<=T.right?"right":J[0]==="right"&&P.width>T.right&&P.width<=T.left?"left":J[0];
J[1]=J[1]==="top"&&P.height-K.height>T.bottom&&P.height-K.height<=T.top?"bottom":J[1]==="bottom"&&P.height-K.height>T.top&&P.height-K.height<=T.bottom?"top":J[1]==="left"&&P.width-K.width>T.right&&P.width-K.width<=T.left?"right":J[1]==="right"&&P.width-K.width>T.left&&P.width-K.width<=T.right?"left":J[1];
if(J[1]==="center"){if(E.vertical.test(J[0])){var S=K.width/2-Q/2;
if(T.left+S<0&&P.width-K.width<=T.right){J[1]="left"
}else{if(T.right+S<0&&P.width-K.width<=T.left){J[1]="right"
}}}else{var I=K.height/2-P.height/2;
if(T.top+I<0&&P.height-K.height<=T.bottom){J[1]="top"
}else{if(T.bottom+I<0&&P.height-K.height<=T.top){J[1]="bottom"
}}}}}switch(J[0]){case"top":R.top=K.top-L;
break;
case"bottom":R.top=K.top+K.height;
break;
case"left":R.left=K.left-Q;
break;
case"right":R.left=K.left+K.width;
break
}switch(J[1]){case"top":R.top=K.top;
break;
case"bottom":R.top=K.top+K.height-L;
break;
case"left":R.left=K.left;
break;
case"right":R.left=K.left+K.width-Q;
break;
case"center":if(E.vertical.test(J[0])){R.left=K.left+K.width/2-Q/2
}else{R.top=K.top+K.height/2-L/2
}break
}R.top=Math.round(R.top);
R.left=Math.round(R.left);
R.placement=J[1]==="center"?J[0]:J[0]+"-"+J[1];
return R
},positionArrow:function(J,M){J=this.getRawNode(J);
var Q=J.querySelector(".tooltip-inner, .popover-inner");
if(!Q){return 
}var O=angular.element(Q).hasClass("tooltip-inner");
var P=O?J.querySelector(".tooltip-arrow"):J.querySelector(".arrow");
if(!P){return 
}var L={top:"",bottom:"",left:"",right:""};
M=this.parsePlacement(M);
if(M[1]==="center"){angular.element(P).css(L);
return 
}var N="border-"+M[0]+"-width";
var H=F.getComputedStyle(P)[N];
var K="border-";
if(E.vertical.test(M[0])){K+=M[0]+"-"+M[1]
}else{K+=M[1]+"-"+M[0]
}K+="-radius";
var I=F.getComputedStyle(O?Q:J)[K];
switch(M[0]){case"top":L.bottom=O?"0":"-"+H;
break;
case"bottom":L.top=O?"0":"-"+H;
break;
case"left":L.right=O?"0":"-"+H;
break;
case"right":L.left=O?"0":"-"+H;
break
}L[M[1]]=I;
angular.element(P).css(L)
}}
}]);
angular.module("ui.bootstrap.datepickerPopup",["ui.bootstrap.datepicker","ui.bootstrap.position"]).value("$datepickerPopupLiteralWarning",true).constant("uibDatepickerPopupConfig",{altInputFormats:[],appendToBody:false,clearText:"Clear",closeOnDateSelection:true,closeText:"Done",currentText:"Today",datepickerPopup:"yyyy-MM-dd",datepickerPopupTemplateUrl:"uib/template/datepickerPopup/popup.html",datepickerTemplateUrl:"uib/template/datepicker/datepicker.html",html5Types:{date:"yyyy-MM-dd","datetime-local":"yyyy-MM-ddTHH:mm:ss.sss",month:"yyyy-MM"},onOpenFocus:true,showButtonBar:true,placement:"auto bottom-left"}).controller("UibDatepickerPopupController",["$scope","$element","$attrs","$compile","$log","$parse","$window","$document","$rootScope","$uibPosition","dateFilter","uibDateParser","uibDatepickerPopupConfig","$timeout","uibDatepickerConfig","$datepickerPopupLiteralWarning",function(M,F,i,A,n,m,k,V,Q,E,a,X,f,c,Y,N){var K={},g=false;
var W,T,b,O,j,H,P,h,S,J,B,G,d,L=[],I;
this.init=function(o){J=o;
B=o.$options;
T=angular.isDefined(i.closeOnDateSelection)?M.$parent.$eval(i.closeOnDateSelection):f.closeOnDateSelection;
b=angular.isDefined(i.datepickerAppendToBody)?M.$parent.$eval(i.datepickerAppendToBody):f.appendToBody;
O=angular.isDefined(i.onOpenFocus)?M.$parent.$eval(i.onOpenFocus):f.onOpenFocus;
j=angular.isDefined(i.datepickerPopupTemplateUrl)?i.datepickerPopupTemplateUrl:f.datepickerPopupTemplateUrl;
H=angular.isDefined(i.datepickerTemplateUrl)?i.datepickerTemplateUrl:f.datepickerTemplateUrl;
d=angular.isDefined(i.altInputFormats)?M.$parent.$eval(i.altInputFormats):f.altInputFormats;
M.showButtonBar=angular.isDefined(i.showButtonBar)?M.$parent.$eval(i.showButtonBar):f.showButtonBar;
if(f.html5Types[i.type]){W=f.html5Types[i.type];
g=true
}else{W=i.uibDatepickerPopup||f.datepickerPopup;
i.$observe("uibDatepickerPopup",function(r,p){var q=r||f.datepickerPopup;
if(q!==W){W=q;
J.$modelValue=null;
if(!W){throw new Error("uibDatepickerPopup must have a date format specified.")
}}})
}if(!W){throw new Error("uibDatepickerPopup must have a date format specified.")
}if(g&&i.uibDatepickerPopup){throw new Error("HTML5 date input types do not support custom formats.")
}P=angular.element("<div uib-datepicker-popup-wrap><div uib-datepicker></div></div>");
if(B){I=B.timezone;
M.ngModelOptions=angular.copy(B);
M.ngModelOptions.timezone=null;
if(M.ngModelOptions.updateOnDefault===true){M.ngModelOptions.updateOn=M.ngModelOptions.updateOn?M.ngModelOptions.updateOn+" default":"default"
}P.attr("ng-model-options","ngModelOptions")
}else{I=null
}P.attr({"ng-model":"date","ng-change":"dateSelection(date)","template-url":j});
h=angular.element(P.children()[0]);
h.attr("template-url",H);
if(!M.datepickerOptions){M.datepickerOptions={}
}if(g){if(i.type==="month"){M.datepickerOptions.datepickerMode="month";
M.datepickerOptions.minMode="month"
}}h.attr("datepicker-options","datepickerOptions");
if(!g){J.$$parserName="date";
J.$validators.date=l;
J.$parsers.unshift(D);
J.$formatters.push(function(p){if(J.$isEmpty(p)){M.date=p;
return p
}M.date=X.fromTimezone(p,I);
if(angular.isNumber(M.date)){M.date=new Date(M.date)
}return X.filter(M.date,W)
})
}else{J.$formatters.push(function(p){M.date=X.fromTimezone(p,I);
return p
})
}J.$viewChangeListeners.push(function(){M.date=e(J.$viewValue)
});
F.on("keydown",C);
G=A(P)(M);
P.remove();
if(b){V.find("body").append(G)
}else{F.after(G)
}M.$on("$destroy",function(){if(M.isOpen===true){if(!Q.$$phase){M.$apply(function(){M.isOpen=false
})
}}G.remove();
F.off("keydown",C);
V.off("click",U);
if(S){S.off("scroll",R)
}angular.element(k).off("resize",R);
while(L.length){L.shift()()
}})
};
M.getText=function(o){return M[o+"Text"]||f[o+"Text"]
};
M.isDisabled=function(o){if(o==="today"){o=X.fromTimezone(new Date(),I)
}var p={};
angular.forEach(["minDate","maxDate"],function(q){if(!M.datepickerOptions[q]){p[q]=null
}else{if(angular.isDate(M.datepickerOptions[q])){p[q]=X.fromTimezone(new Date(M.datepickerOptions[q]),I)
}else{if(N){n.warn("Literal date support has been deprecated, please switch to date object usage")
}p[q]=new Date(a(M.datepickerOptions[q],"medium"))
}}});
return M.datepickerOptions&&p.minDate&&M.compare(o,p.minDate)<0||p.maxDate&&M.compare(o,p.maxDate)>0
};
M.compare=function(p,o){return new Date(p.getFullYear(),p.getMonth(),p.getDate())-new Date(o.getFullYear(),o.getMonth(),o.getDate())
};
M.dateSelection=function(p){if(angular.isDefined(p)){M.date=p
}var o=M.date?X.filter(M.date,W):null;
F.val(o);
J.$setViewValue(o);
if(T){M.isOpen=false;
F[0].focus()
}};
M.keydown=function(o){if(o.which===27){o.stopPropagation();
M.isOpen=false;
F[0].focus()
}};
M.select=function(q,o){o.stopPropagation();
if(q==="today"){var p=new Date();
if(angular.isDate(M.date)){q=new Date(M.date);
q.setFullYear(p.getFullYear(),p.getMonth(),p.getDate())
}else{q=new Date(p.setHours(0,0,0,0))
}}M.dateSelection(q)
};
M.close=function(o){o.stopPropagation();
M.isOpen=false;
F[0].focus()
};
M.disabled=angular.isDefined(i.disabled)||false;
if(i.ngDisabled){L.push(M.$parent.$watch(m(i.ngDisabled),function(o){M.disabled=o
}))
}M.$watch("isOpen",function(o){if(o){if(!M.disabled){c(function(){R();
if(O){M.$broadcast("uib:datepicker.focus")
}V.on("click",U);
var p=i.popupPlacement?i.popupPlacement:f.placement;
if(b||E.parsePlacement(p)[2]){S=S||angular.element(E.scrollParent(F));
if(S){S.on("scroll",R)
}}else{S=null
}angular.element(k).on("resize",R)
},0,false)
}else{M.isOpen=false
}}else{V.off("click",U);
if(S){S.off("scroll",R)
}angular.element(k).off("resize",R)
}});
function Z(o){return o.replace(/([A-Z])/g,function(p){return"-"+p.toLowerCase()
})
}function e(q){var o=X.parse(q,W,M.date);
if(isNaN(o)){for(var p=0;
p<d.length;
p++){o=X.parse(q,d[p],M.date);
if(!isNaN(o)){return o
}}}return o
}function D(p){if(angular.isNumber(p)){p=new Date(p)
}if(!p){return null
}if(angular.isDate(p)&&!isNaN(p)){return p
}if(angular.isString(p)){var o=e(p);
if(!isNaN(o)){return X.toTimezone(o,I)
}}return J.$options&&J.$options.allowInvalid?p:undefined
}function l(o,q){var p=o||q;
if(!i.ngRequired&&!p){return true
}if(angular.isNumber(p)){p=new Date(p)
}if(!p){return true
}if(angular.isDate(p)&&!isNaN(p)){return true
}if(angular.isString(p)){return !isNaN(e(q))
}return false
}function U(r){if(!M.isOpen&&M.disabled){return 
}var o=G[0];
var q=F[0].contains(r.target);
var p=o.contains!==undefined&&o.contains(r.target);
if(M.isOpen&&!(q||p)){M.$apply(function(){M.isOpen=false
})
}}function C(o){if(o.which===27&&M.isOpen){o.preventDefault();
o.stopPropagation();
M.$apply(function(){M.isOpen=false
});
F[0].focus()
}else{if(o.which===40&&!M.isOpen){o.preventDefault();
o.stopPropagation();
M.$apply(function(){M.isOpen=true
})
}}}function R(){if(M.isOpen){var p=angular.element(G[0].querySelector(".uib-datepicker-popup"));
var q=i.popupPlacement?i.popupPlacement:f.placement;
var o=E.positionElements(F,p,q,b);
p.css({top:o.top+"px",left:o.left+"px"});
if(p.hasClass("uib-position-measure")){p.removeClass("uib-position-measure")
}}}M.$on("uib:datepicker.mode",function(){c(R,0,false)
})
}]).directive("uibDatepickerPopup",function(){return{require:["ngModel","uibDatepickerPopup"],controller:"UibDatepickerPopupController",scope:{datepickerOptions:"=?",isOpen:"=?",currentText:"@",clearText:"@",closeText:"@"},link:function(D,C,B,A){var F=A[0],E=A[1];
E.init(F)
}}
}).directive("uibDatepickerPopupWrap",function(){return{replace:true,transclude:true,templateUrl:function(B,A){return A.templateUrl||"uib/template/datepickerPopup/popup.html"
}}
});
angular.module("ui.bootstrap.debounce",[]).factory("$$debounce",["$timeout",function(A){return function(D,C){var B;
return function(){var E=this;
var F=Array.prototype.slice.call(arguments);
if(B){A.cancel(B)
}B=A(function(){D.apply(E,F)
},C)
}
}
}]);
angular.module("ui.bootstrap.dropdown",["ui.bootstrap.position"]).constant("uibDropdownConfig",{appendToOpenClass:"uib-dropdown-open",openClass:"open"}).service("uibDropdownService",["$document","$rootScope",function(D,A){var B=null;
this.open=function(G,F){if(!B){D.on("click",E);
F.on("keydown",C)
}if(B&&B!==G){B.isOpen=false
}B=G
};
this.close=function(G,F){if(B===G){B=null;
D.off("click",E);
F.off("keydown",C)
}};
var E=function(F){if(!B){return 
}if(F&&B.getAutoClose()==="disabled"){return 
}if(F&&F.which===3){return 
}var G=B.getToggleElement();
if(F&&G&&G[0].contains(F.target)){return 
}var H=B.getDropdownElement();
if(F&&B.getAutoClose()==="outsideClick"&&H&&H[0].contains(F.target)){return 
}B.isOpen=false;
if(!A.$$phase){B.$apply()
}};
var C=function(F){if(F.which===27){F.stopPropagation();
B.focusToggleElement();
E()
}else{if(B.isKeynavEnabled()&&[38,40].indexOf(F.which)!==-1&&B.isOpen){F.preventDefault();
F.stopPropagation();
B.focusDropdownEntry(F.which)
}}}
}]).controller("UibDropdownController",["$scope","$element","$attrs","$parse","uibDropdownConfig","uibDropdownService","$animate","$uibPosition","$document","$compile","$templateRequest",function(Q,O,F,D,J,H,R,G,X,U,P){var N=this,A=Q.$new(),T,V=J.appendToOpenClass,B=J.openClass,L,E=angular.noop,S=F.onToggle?D(F.onToggle):angular.noop,W=false,C=null,M=false,I=null,K=X.find("body");
O.addClass("dropdown");
this.init=function(){if(F.isOpen){L=D(F.isOpen);
E=L.assign;
Q.$watch(L,function(a){A.isOpen=!!a
})
}if(angular.isDefined(F.dropdownAppendTo)){var Y=D(F.dropdownAppendTo)(A);
if(Y){C=angular.element(Y)
}}W=angular.isDefined(F.dropdownAppendToBody);
M=angular.isDefined(F.keyboardNav);
if(W&&!C){C=K
}if(C&&N.dropdownMenu){C.append(N.dropdownMenu);
O.on("$destroy",function Z(){N.dropdownMenu.remove()
})
}};
this.toggle=function(Y){A.isOpen=arguments.length?!!Y:!A.isOpen;
if(angular.isFunction(E)){E(A,A.isOpen)
}return A.isOpen
};
this.isOpen=function(){return A.isOpen
};
A.getToggleElement=function(){return N.toggleElement
};
A.getAutoClose=function(){return F.autoClose||"always"
};
A.getElement=function(){return O
};
A.isKeynavEnabled=function(){return M
};
A.focusDropdownEntry=function(Z){var Y=N.dropdownMenu?angular.element(N.dropdownMenu).find("a"):O.find("ul").eq(0).find("a");
switch(Z){case 40:if(!angular.isNumber(N.selectedOption)){N.selectedOption=0
}else{N.selectedOption=N.selectedOption===Y.length-1?N.selectedOption:N.selectedOption+1
}break;
case 38:if(!angular.isNumber(N.selectedOption)){N.selectedOption=Y.length-1
}else{N.selectedOption=N.selectedOption===0?0:N.selectedOption-1
}break
}Y[N.selectedOption].focus()
};
A.getDropdownElement=function(){return N.dropdownMenu
};
A.focusToggleElement=function(){if(N.toggleElement){N.toggleElement[0].focus()
}};
A.$watch("isOpen",function(Y,Z){if(C&&N.dropdownMenu){var g=G.positionElements(O,N.dropdownMenu,"bottom-left",true),e,d;
e={top:g.top+"px",display:Y?"block":"none"};
d=N.dropdownMenu.hasClass("dropdown-menu-right");
if(!d){e.left=g.left+"px";
e.right="auto"
}else{e.left="auto";
e.right=window.innerWidth-(g.left+O.prop("offsetWidth"))+"px"
}if(!W){var b=G.offset(C);
e.top=g.top-b.top+"px";
if(!d){e.left=g.left-b.left+"px"
}else{e.right=window.innerWidth-(g.left-b.left+O.prop("offsetWidth"))+"px"
}}N.dropdownMenu.css(e)
}var c=C?C:O;
var f=c.hasClass(C?V:B);
if(f===!Y){R[Y?"addClass":"removeClass"](c,C?V:B).then(function(){if(angular.isDefined(Y)&&Y!==Z){S(Q,{open:!!Y})
}})
}if(Y){if(N.dropdownMenuTemplateUrl){P(N.dropdownMenuTemplateUrl).then(function(h){T=A.$new();
U(h.trim())(T,function(i){var j=i;
N.dropdownMenu.replaceWith(j);
N.dropdownMenu=j
})
})
}A.focusToggleElement();
H.open(A,O)
}else{if(N.dropdownMenuTemplateUrl){if(T){T.$destroy()
}var a=angular.element('<ul class="dropdown-menu"></ul>');
N.dropdownMenu.replaceWith(a);
N.dropdownMenu=a
}H.close(A,O);
N.selectedOption=null
}if(angular.isFunction(E)){E(Q,Y)
}})
}]).directive("uibDropdown",function(){return{controller:"UibDropdownController",link:function(D,C,B,A){A.init()
}}
}).directive("uibDropdownMenu",function(){return{restrict:"A",require:"?^uibDropdown",link:function(E,D,C,A){if(!A||angular.isDefined(C.dropdownNested)){return 
}D.addClass("dropdown-menu");
var B=C.templateUrl;
if(B){A.dropdownMenuTemplateUrl=B
}if(!A.dropdownMenu){A.dropdownMenu=D
}}}
}).directive("uibDropdownToggle",function(){return{require:"?^uibDropdown",link:function(E,C,B,A){if(!A){return 
}C.addClass("dropdown-toggle");
A.toggleElement=C;
var D=function(F){F.preventDefault();
if(!C.hasClass("disabled")&&!B.disabled){E.$apply(function(){A.toggle()
})
}};
C.bind("click",D);
C.attr({"aria-haspopup":true,"aria-expanded":false});
E.$watch(A.isOpen,function(F){C.attr("aria-expanded",!!F)
});
E.$on("$destroy",function(){C.unbind("click",D)
})
}}
});
angular.module("ui.bootstrap.stackedMap",[]).factory("$$stackedMap",function(){return{createNew:function(){var A=[];
return{add:function(B,C){A.push({key:B,value:C})
},get:function(C){for(var B=0;
B<A.length;
B++){if(C===A[B].key){return A[B]
}}},keys:function(){var C=[];
for(var B=0;
B<A.length;
B++){C.push(A[B].key)
}return C
},top:function(){return A[A.length-1]
},remove:function(D){var B=-1;
for(var C=0;
C<A.length;
C++){if(D===A[C].key){B=C;
break
}}return A.splice(B,1)[0]
},removeTop:function(){return A.splice(A.length-1,1)[0]
},length:function(){return A.length
}}
}}
});
angular.module("ui.bootstrap.modal",["ui.bootstrap.stackedMap","ui.bootstrap.position"]).factory("$$multiMap",function(){return{createNew:function(){var A={};
return{entries:function(){return Object.keys(A).map(function(B){return{key:B,value:A[B]}
})
},get:function(B){return A[B]
},hasKey:function(B){return !!A[B]
},keys:function(){return Object.keys(A)
},put:function(B,C){if(!A[B]){A[B]=[]
}A[B].push(C)
},remove:function(D,E){var C=A[D];
if(!C){return 
}var B=C.indexOf(E);
if(B!==-1){C.splice(B,1)
}if(!C.length){delete A[D]
}}}
}}
}).provider("$uibResolve",function(){var A=this;
this.resolver=null;
this.setResolver=function(B){this.resolver=B
};
this.$get=["$injector","$q",function(C,B){var D=A.resolver?C.get(A.resolver):null;
return{resolve:function(F,I,H,E){if(D){return D.resolve(F,I,H,E)
}var G=[];
angular.forEach(F,function(J){if(angular.isFunction(J)||angular.isArray(J)){G.push(B.resolve(C.invoke(J)))
}else{if(angular.isString(J)){G.push(B.resolve(C.get(J)))
}else{G.push(B.resolve(J))
}}});
return B.all(G).then(function(L){var K={};
var J=0;
angular.forEach(F,function(N,M){K[M]=L[J++]
});
return K
})
}}
}]
}).directive("uibModalBackdrop",["$animate","$injector","$uibModalStack",function(D,C,B){return{replace:true,templateUrl:"uib/template/modal/backdrop.html",compile:function(E,F){E.addClass(F.backdropClass);
return A
}};
function A(G,F,E){if(E.modalInClass){D.addClass(F,E.modalInClass);
G.$on(B.NOW_CLOSING_EVENT,function(I,J){var H=J();
if(G.modalOptions.animation){D.removeClass(F,E.modalInClass).then(H)
}else{H()
}})
}}}]).directive("uibModalWindow",["$uibModalStack","$q","$animateCss","$document",function(B,A,D,C){return{scope:{index:"@"},replace:true,transclude:true,templateUrl:function(E,F){return F.templateUrl||"uib/template/modal/window.html"
},link:function(G,F,E){F.addClass(E.windowClass||"");
F.addClass(E.windowTopClass||"");
G.size=E.size;
G.close=function(I){var J=B.getTop();
if(J&&J.value.backdrop&&J.value.backdrop!=="static"&&I.target===I.currentTarget){I.preventDefault();
I.stopPropagation();
B.dismiss(J.key,"backdrop click")
}};
F.on("click",G.close);
G.$isRendered=true;
var H=A.defer();
E.$observe("modalRender",function(I){if(I==="true"){H.resolve()
}});
H.promise.then(function(){var I=null;
if(E.modalInClass){I=D(F,{addClass:E.modalInClass}).start();
G.$on(B.NOW_CLOSING_EVENT,function(K,L){var J=L();
D(F,{removeClass:E.modalInClass}).start().then(J)
})
}A.when(I).then(function(){var J=B.getTop();
if(J){B.modalRendered(J.key)
}if(!(C[0].activeElement&&F[0].contains(C[0].activeElement))){var K=F[0].querySelector("[autofocus]");
if(K){K.focus()
}else{F[0].focus()
}}})
})
}}
}]).directive("uibModalAnimationClass",function(){return{compile:function(A,B){if(B.modalAnimation){A.addClass(B.uibModalAnimationClass)
}}}
}).directive("uibModalTransclude",function(){return{link:function(E,D,C,A,B){B(E.$parent,function(F){D.empty();
D.append(F)
})
}}
}).factory("$uibModalStack",["$animate","$animateCss","$document","$compile","$rootScope","$q","$$multiMap","$$stackedMap","$uibPosition",function(R,S,X,U,G,T,M,A,a){var P="modal-open";
var L,W;
var F=A.createNew();
var E=M.createNew();
var K={NOW_CLOSING_EVENT:"modal.stack.now-closing"};
var H=0;
var D=null;
var Z="a[href], area[href], input:not([disabled]), button:not([disabled]),select:not([disabled]), textarea:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable=true]";
var Y;
function N(b){return !!(b.offsetWidth||b.offsetHeight||b.getClientRects().length)
}function C(){var b=-1;
var d=F.keys();
for(var c=0;
c<d.length;
c++){if(F.get(d[c]).value.backdrop){b=c
}}if(b>-1&&b<H){b=H
}return b
}G.$watch(C,function(b){if(W){W.index=b
}});
function J(b,e){var d=F.get(b).value;
var c=d.appendTo;
F.remove(b);
D=F.top();
if(D){H=parseInt(D.value.modalDomEl.attr("index"),10)
}I(d.modalDomEl,d.modalScope,function(){var f=d.openedClass||P;
E.remove(f,b);
var g=E.hasKey(f);
c.toggleClass(f,g);
if(!g&&Y&&Y.heightOverflow&&Y.scrollbarWidth){if(Y.originalRight){c.css({paddingRight:Y.originalRight+"px"})
}else{c.css({paddingRight:""})
}Y=null
}Q(true)
},d.closedDeferred);
V();
if(e&&e.focus){e.focus()
}else{if(c.focus){c.focus()
}}}function Q(b){var c;
if(F.length()>0){c=F.top().value;
c.modalDomEl.toggleClass(c.windowTopClass||"",b)
}}function V(){if(L&&C()===-1){var b=W;
I(L,W,function(){b=null
});
L=undefined;
W=undefined
}}function I(d,f,b,h){var c;
var e=null;
var i=function(){if(!c){c=T.defer();
e=c.promise
}return function j(){c.resolve()
}
};
f.$broadcast(K.NOW_CLOSING_EVENT,i);
return T.when(e).then(g);
function g(){if(g.done){return 
}g.done=true;
R.leave(d).then(function(){d.remove();
if(h){h.resolve()
}});
f.$destroy();
if(b){b()
}}}X.on("keydown",O);
G.$on("$destroy",function(){X.off("keydown",O)
});
function O(b){if(b.isDefaultPrevented()){return b
}var d=F.top();
if(d){switch(b.which){case 27:if(d.value.keyboard){b.preventDefault();
G.$apply(function(){K.dismiss(d.key,"escape key press")
})
}break;
case 9:var e=K.loadFocusElementList(d);
var c=false;
if(b.shiftKey){if(K.isFocusInFirstItem(b,e)||K.isModalFocused(b,d)){c=K.focusLastFocusableElement(e)
}}else{if(K.isFocusInLastItem(b,e)){c=K.focusFirstFocusableElement(e)
}}if(c){b.preventDefault();
b.stopPropagation()
}break
}}}K.open=function(b,f){var g=X[0].activeElement,c=f.openedClass||P;
Q(false);
D=F.top();
F.add(b,{deferred:f.deferred,renderDeferred:f.renderDeferred,closedDeferred:f.closedDeferred,modalScope:f.scope,backdrop:f.backdrop,keyboard:f.keyboard,openedClass:f.openedClass,windowTopClass:f.windowTopClass,animation:f.animation,appendTo:f.appendTo});
E.put(c,b);
var e=f.appendTo,d=C();
if(!e.length){throw new Error("appendTo element not found. Make sure that the element passed is in DOM.")
}if(d>=0&&!L){W=G.$new(true);
W.modalOptions=f;
W.index=d;
L=angular.element('<div uib-modal-backdrop="modal-backdrop"></div>');
L.attr("backdrop-class",f.backdropClass);
if(f.animation){L.attr("modal-animation","true")
}U(L)(W);
R.enter(L,e);
Y=a.scrollbarPadding(e);
if(Y.heightOverflow&&Y.scrollbarWidth){e.css({paddingRight:Y.right+"px"})
}}H=D?parseInt(D.value.modalDomEl.attr("index"),10)+1:0;
var h=angular.element('<div uib-modal-window="modal-window"></div>');
h.attr({"template-url":f.windowTemplateUrl,"window-class":f.windowClass,"window-top-class":f.windowTopClass,size:f.size,index:H,animate:"animate"}).html(f.content);
if(f.animation){h.attr("modal-animation","true")
}e.addClass(c);
R.enter(U(h)(f.scope),e);
F.top().value.modalDomEl=h;
F.top().value.modalOpener=g
};
function B(d,c,b){return !d.value.modalScope.$broadcast("modal.closing",c,b).defaultPrevented
}K.close=function(c,b){var d=F.get(c);
if(d&&B(d,b,true)){d.value.modalScope.$$uibDestructionScheduled=true;
d.value.deferred.resolve(b);
J(c,d.value.modalOpener);
return true
}return !d
};
K.dismiss=function(b,c){var d=F.get(b);
if(d&&B(d,c,false)){d.value.modalScope.$$uibDestructionScheduled=true;
d.value.deferred.reject(c);
J(b,d.value.modalOpener);
return true
}return !d
};
K.dismissAll=function(c){var b=this.getTop();
while(b&&this.dismiss(b.key,c)){b=this.getTop()
}};
K.getTop=function(){return F.top()
};
K.modalRendered=function(b){var c=F.get(b);
if(c){c.value.renderDeferred.resolve()
}};
K.focusFirstFocusableElement=function(b){if(b.length>0){b[0].focus();
return true
}return false
};
K.focusLastFocusableElement=function(b){if(b.length>0){b[b.length-1].focus();
return true
}return false
};
K.isModalFocused=function(b,d){if(b&&d){var c=d.value.modalDomEl;
if(c&&c.length){return(b.target||b.srcElement)===c[0]
}}return false
};
K.isFocusInFirstItem=function(b,c){if(c.length>0){return(b.target||b.srcElement)===c[0]
}return false
};
K.isFocusInLastItem=function(b,c){if(c.length>0){return(b.target||b.srcElement)===c[c.length-1]
}return false
};
K.loadFocusElementList=function(d){if(d){var b=d.value.modalDomEl;
if(b&&b.length){var c=b[0].querySelectorAll(Z);
return c?Array.prototype.filter.call(c,function(e){return N(e)
}):c
}}};
return K
}]).provider("$uibModal",function(){var A={options:{animation:true,backdrop:true,keyboard:true},$get:["$rootScope","$q","$document","$templateRequest","$controller","$uibResolve","$uibModalStack",function(H,E,C,J,B,K,G){var I={};
function F(L){return L.template?E.when(L.template):J(angular.isFunction(L.templateUrl)?L.templateUrl():L.templateUrl)
}var D=null;
I.getPromiseChain=function(){return D
};
I.open=function(R){var S=E.defer();
var V=E.defer();
var L=E.defer();
var U=E.defer();
var P={result:S.promise,opened:V.promise,closed:L.promise,rendered:U.promise,close:function(W){return G.close(P,W)
},dismiss:function(W){return G.dismiss(P,W)
}};
R=angular.extend({},A.options,R);
R.resolve=R.resolve||{};
R.appendTo=R.appendTo||C.find("body").eq(0);
if(!R.template&&!R.templateUrl){throw new Error("One of template or templateUrl options is required.")
}var M=E.all([F(R),K.resolve(R.resolve,{},null,null)]);
function N(){return M
}var O;
O=D=E.all([D]).then(N,N).then(function Q(b){var Z=R.scope||H;
var W=Z.$new();
W.$close=P.close;
W.$dismiss=P.dismiss;
W.$on("$destroy",function(){if(!W.$$uibDestructionScheduled){W.$dismiss("$uibUnscheduledDestruction")
}});
var a,X,Y={};
if(R.controller){Y.$scope=W;
Y.$uibModalInstance=P;
angular.forEach(b[1],function(d,c){Y[c]=d
});
X=B(R.controller,Y,true);
if(R.controllerAs){a=X.instance;
if(R.bindToController){a.$close=W.$close;
a.$dismiss=W.$dismiss;
angular.extend(a,Z)
}a=X();
W[R.controllerAs]=a
}else{a=X()
}if(angular.isFunction(a.$onInit)){a.$onInit()
}}G.open(P,{scope:W,deferred:S,renderDeferred:U,closedDeferred:L,content:b[0],animation:R.animation,backdrop:R.backdrop,keyboard:R.keyboard,backdropClass:R.backdropClass,windowTopClass:R.windowTopClass,windowClass:R.windowClass,windowTemplateUrl:R.windowTemplateUrl,size:R.size,openedClass:R.openedClass,appendTo:R.appendTo});
V.resolve(true)
},function T(W){V.reject(W);
S.reject(W)
})["finally"](function(){if(D===O){D=null
}});
return P
};
return I
}]};
return A
});
angular.module("ui.bootstrap.paging",[]).factory("uibPaging",["$parse",function(A){return{create:function(D,C,B){D.setNumPages=B.numPages?A(B.numPages).assign:angular.noop;
D.ngModelCtrl={$setViewValue:angular.noop};
D._watchers=[];
D.init=function(F,E){D.ngModelCtrl=F;
D.config=E;
F.$render=function(){D.render()
};
if(B.itemsPerPage){D._watchers.push(C.$parent.$watch(B.itemsPerPage,function(G){D.itemsPerPage=parseInt(G,10);
C.totalPages=D.calculateTotalPages();
D.updatePage()
}))
}else{D.itemsPerPage=E.itemsPerPage
}C.$watch("totalItems",function(H,G){if(angular.isDefined(H)||H!==G){C.totalPages=D.calculateTotalPages();
D.updatePage()
}})
};
D.calculateTotalPages=function(){var E=D.itemsPerPage<1?1:Math.ceil(C.totalItems/D.itemsPerPage);
return Math.max(E||0,1)
};
D.render=function(){C.page=parseInt(D.ngModelCtrl.$viewValue,10)||1
};
C.selectPage=function(G,E){if(E){E.preventDefault()
}var F=!C.ngDisabled||!E;
if(F&&C.page!==G&&G>0&&G<=C.totalPages){if(E&&E.target){E.target.blur()
}D.ngModelCtrl.$setViewValue(G);
D.ngModelCtrl.$render()
}};
C.getText=function(E){return C[E+"Text"]||D.config[E+"Text"]
};
C.noPrevious=function(){return C.page===1
};
C.noNext=function(){return C.page===C.totalPages
};
D.updatePage=function(){D.setNumPages(C.$parent,C.totalPages);
if(C.page>C.totalPages){C.selectPage(C.totalPages)
}else{D.ngModelCtrl.$render()
}};
C.$on("$destroy",function(){while(D._watchers.length){D._watchers.shift()()
}})
}}
}]);
angular.module("ui.bootstrap.pager",["ui.bootstrap.paging"]).controller("UibPagerController",["$scope","$attrs","uibPaging","uibPagerConfig",function(B,A,C,D){B.align=angular.isDefined(A.align)?B.$parent.$eval(A.align):D.align;
C.create(this,B,A)
}]).constant("uibPagerConfig",{itemsPerPage:10,previousText:"« Previous",nextText:"Next »",align:true}).directive("uibPager",["uibPagerConfig",function(A){return{scope:{totalItems:"=",previousText:"@",nextText:"@",ngDisabled:"="},require:["uibPager","?ngModel"],controller:"UibPagerController",controllerAs:"pager",templateUrl:function(C,B){return B.templateUrl||"uib/template/pager/pager.html"
},replace:true,link:function(F,E,D,B){var G=B[0],C=B[1];
if(!C){return 
}G.init(C,A)
}}
}]);
angular.module("ui.bootstrap.pagination",["ui.bootstrap.paging"]).controller("UibPaginationController",["$scope","$attrs","$parse","uibPaging","uibPaginationConfig",function(N,L,E,D,B){var A=this;
var K=angular.isDefined(L.maxSize)?N.$parent.$eval(L.maxSize):B.maxSize,F=angular.isDefined(L.rotate)?N.$parent.$eval(L.rotate):B.rotate,J=angular.isDefined(L.forceEllipses)?N.$parent.$eval(L.forceEllipses):B.forceEllipses,M=angular.isDefined(L.boundaryLinkNumbers)?N.$parent.$eval(L.boundaryLinkNumbers):B.boundaryLinkNumbers,G=angular.isDefined(L.pageLabel)?function(O){return N.$parent.$eval(L.pageLabel,{$page:O})
}:angular.identity;
N.boundaryLinks=angular.isDefined(L.boundaryLinks)?N.$parent.$eval(L.boundaryLinks):B.boundaryLinks;
N.directionLinks=angular.isDefined(L.directionLinks)?N.$parent.$eval(L.directionLinks):B.directionLinks;
D.create(this,N,L);
if(L.maxSize){A._watchers.push(N.$parent.$watch(E(L.maxSize),function(O){K=parseInt(O,10);
A.render()
}))
}function C(P,Q,O){return{number:P,text:Q,active:O}
}function I(R,T){var P=[];
var U=1,b=T;
var Z=angular.isDefined(K)&&K<T;
if(Z){if(F){U=Math.max(R-Math.floor(K/2),1);
b=U+K-1;
if(b>T){b=T;
U=b-K+1
}}else{U=(Math.ceil(R/K)-1)*K+1;
b=Math.min(U+K-1,T)
}}for(var Q=U;
Q<=b;
Q++){var V=C(Q,G(Q),Q===R);
P.push(V)
}if(Z&&K>0&&(!F||J||M)){if(U>1){if(!M||U>3){var O=C(U-1,"...",false);
P.unshift(O)
}if(M){if(U===3){var Y=C(2,"2",false);
P.unshift(Y)
}var a=C(1,"1",false);
P.unshift(a)
}}if(b<T){if(!M||b<T-2){var S=C(b+1,"...",false);
P.push(S)
}if(M){if(b===T-2){var W=C(T-1,T-1,false);
P.push(W)
}var X=C(T,T,false);
P.push(X)
}}}return P
}var H=this.render;
this.render=function(){H();
if(N.page>0&&N.page<=N.totalPages){N.pages=I(N.page,N.totalPages)
}}
}]).constant("uibPaginationConfig",{itemsPerPage:10,boundaryLinks:false,boundaryLinkNumbers:false,directionLinks:true,firstText:"First",previousText:"Previous",nextText:"Next",lastText:"Last",rotate:true,forceEllipses:false}).directive("uibPagination",["$parse","uibPaginationConfig",function(B,A){return{scope:{totalItems:"=",firstText:"@",previousText:"@",nextText:"@",lastText:"@",ngDisabled:"="},require:["uibPagination","?ngModel"],controller:"UibPaginationController",controllerAs:"pagination",templateUrl:function(D,C){return C.templateUrl||"uib/template/pagination/pagination.html"
},replace:true,link:function(G,F,E,C){var H=C[0],D=C[1];
if(!D){return 
}H.init(D,A)
}}
}]);
angular.module("ui.bootstrap.tooltip",["ui.bootstrap.position","ui.bootstrap.stackedMap"]).provider("$uibTooltip",function(){var B={placement:"top",placementClassPrefix:"",animation:true,popupDelay:0,popupCloseDelay:0,useContentExp:false};
var D={mouseenter:"mouseleave",click:"click",outsideClick:"outsideClick",focus:"blur",none:""};
var C={};
this.options=function(F){angular.extend(C,F)
};
this.setTriggers=function E(F){angular.extend(D,F)
};
function A(F){var G=/[A-Z]/g;
var H="-";
return F.replace(G,function(I,J){return(J?H:"")+I.toLowerCase()
})
}this.$get=["$window","$compile","$timeout","$document","$uibPosition","$interpolate","$rootScope","$parse","$$stackedMap",function(H,N,I,L,G,M,Q,J,F){var K=F.createNew();
L.on("keypress",P);
Q.$on("$destroy",function(){L.off("keypress",P)
});
function P(S){if(S.which===27){var R=K.top();
if(R){R.value.close();
K.removeTop();
R=null
}}}return function O(V,T,U,Z){Z=angular.extend({},B,C,Z);
function S(b){var a=(b||Z.trigger||U).split(" ");
var c=a.map(function(d){return D[d]||d
});
return{show:a,hide:c}
}var X=A(V);
var R=M.startSymbol();
var W=M.endSymbol();
var Y="<div "+X+'-popup uib-title="'+R+"title"+W+'" '+(Z.useContentExp?'content-exp="contentExp()" ':'content="'+R+"content"+W+'" ')+'placement="'+R+"placement"+W+'" popup-class="'+R+"popupClass"+W+'" animation="animation" is-open="isOpen" origin-scope="origScope" class="uib-position-measure"></div>';
return{compile:function(d,b){var a=N(Y);
return function c(AD,n,l,e){var z;
var g;
var AK;
var j;
var s;
var AG;
var w=angular.isDefined(Z.appendToBody)?Z.appendToBody:false;
var u=S(undefined);
var AA=angular.isDefined(l[T+"Enable"]);
var x=AD.$new(true);
var AE=false;
var o=angular.isDefined(l[T+"IsOpen"])?J(l[T+"IsOpen"]):false;
var m=Z.useContentExp?J(l[V]):false;
var t=[];
var q;
var v=function(){if(!z||!z.html()){return 
}if(!AG){AG=I(function(){var AS=G.positionElements(n,z,x.placement,w);
z.css({top:AS.top+"px",left:AS.left+"px"});
if(!z.hasClass(AS.placement.split("-")[0])){z.removeClass(q.split("-")[0]);
z.addClass(AS.placement.split("-")[0])
}if(!z.hasClass(Z.placementClassPrefix+AS.placement)){z.removeClass(Z.placementClassPrefix+q);
z.addClass(Z.placementClassPrefix+AS.placement)
}if(z.hasClass("uib-position-measure")){G.positionArrow(z,AS.placement);
z.removeClass("uib-position-measure")
}else{if(q!==AS.placement){G.positionArrow(z,AS.placement)
}}q=AS.placement;
AG=null
},0,false)
}};
x.origScope=AD;
x.isOpen=false;
K.add(x,{close:AH});
function y(){if(!x.isOpen){p()
}else{AQ()
}}function p(){if(AA&&!AD.$eval(l[T+"Enable"])){return 
}AR();
f();
if(x.popupDelay){if(!j){j=I(AB,x.popupDelay,false)
}}else{AB()
}}function AQ(){AJ();
if(x.popupCloseDelay){if(!s){s=I(AH,x.popupCloseDelay,false)
}}else{AH()
}}function AB(){AJ();
AR();
if(!x.content){return angular.noop
}AN();
x.$evalAsync(function(){x.isOpen=true;
AO(true);
v()
})
}function AJ(){if(j){I.cancel(j);
j=null
}if(AG){I.cancel(AG);
AG=null
}}function AH(){if(!x){return 
}x.$evalAsync(function(){if(x){x.isOpen=false;
AO(false);
if(x.animation){if(!AK){AK=I(AF,150,false)
}}else{AF()
}}})
}function AR(){if(s){I.cancel(s);
s=null
}if(AK){I.cancel(AK);
AK=null
}}function AN(){if(z){return 
}g=x.$new();
z=a(g,function(AS){if(w){L.find("body").append(AS)
}else{n.after(AS)
}});
h()
}function AF(){AJ();
AR();
AL();
if(z){z.remove();
z=null
}if(g){g.$destroy();
g=null
}}function f(){x.title=l[T+"Title"];
if(m){x.content=m(AD)
}else{x.content=l[V]
}x.popupClass=l[T+"Class"];
x.placement=angular.isDefined(l[T+"Placement"])?l[T+"Placement"]:Z.placement;
var AU=G.parsePlacement(x.placement);
q=AU[1]?AU[0]+"-"+AU[1]:AU[0];
var AT=parseInt(l[T+"PopupDelay"],10);
var AS=parseInt(l[T+"PopupCloseDelay"],10);
x.popupDelay=!isNaN(AT)?AT:Z.popupDelay;
x.popupCloseDelay=!isNaN(AS)?AS:Z.popupCloseDelay
}function AO(AS){if(o&&angular.isFunction(o.assign)){o.assign(AD,AS)
}}x.contentExp=function(){return x.content
};
l.$observe("disabled",function(AS){if(AS){AJ()
}if(AS&&x.isOpen){AH()
}});
if(o){AD.$watch(o,function(AS){if(x&&!AS===x.isOpen){y()
}})
}function h(){t.length=0;
if(m){t.push(AD.$watch(m,function(AS){x.content=AS;
if(!AS&&x.isOpen){AH()
}}));
t.push(g.$watch(function(){if(!AE){AE=true;
g.$$postDigest(function(){AE=false;
if(x&&x.isOpen){v()
}})
}}))
}else{t.push(l.$observe(V,function(AS){x.content=AS;
if(!AS&&x.isOpen){AH()
}else{v()
}}))
}t.push(l.$observe(T+"Title",function(AS){x.title=AS;
if(x.isOpen){v()
}}));
t.push(l.$observe(T+"Placement",function(AS){x.placement=AS?AS:Z.placement;
if(x.isOpen){v()
}}))
}function AL(){if(t.length){angular.forEach(t,function(AS){AS()
});
t.length=0
}}function AC(AS){if(!x||!x.isOpen||!z){return 
}if(!n[0].contains(AS.target)&&!z[0].contains(AS.target)){AQ()
}}var i=function(){u.show.forEach(function(AS){if(AS==="outsideClick"){n.off("click",y)
}else{n.off(AS,p);
n.off(AS,y)
}});
u.hide.forEach(function(AS){if(AS==="outsideClick"){L.off("click",AC)
}else{n.off(AS,AQ)
}})
};
function AI(){var AS=l[T+"Trigger"];
i();
u=S(AS);
if(u.show!=="none"){u.show.forEach(function(AU,AT){if(AU==="outsideClick"){n.on("click",y);
L.on("click",AC)
}else{if(AU===u.hide[AT]){n.on(AU,y)
}else{if(AU){n.on(AU,p);
n.on(u.hide[AT],AQ)
}}}n.on("keypress",function(AV){if(AV.which===27){AQ()
}})
})
}}AI();
var AP=AD.$eval(l[T+"Animation"]);
x.animation=angular.isDefined(AP)?!!AP:Z.animation;
var k;
var r=T+"AppendToBody";
if(r in l&&l[r]===undefined){k=true
}else{k=AD.$eval(l[r])
}w=angular.isDefined(k)?k:w;
AD.$on("$destroy",function AM(){i();
AF();
K.remove(x);
x=null
})
}
}}
}
}]
}).directive("uibTooltipTemplateTransclude",["$animate","$sce","$compile","$templateRequest",function(D,B,C,A){return{link:function(L,F,K){var J=L.$eval(K.tooltipTemplateTranscludeScope);
var I=0,M,G,H;
var E=function(){if(G){G.remove();
G=null
}if(M){M.$destroy();
M=null
}if(H){D.leave(H).then(function(){G=null
});
G=H;
H=null
}};
L.$watch(B.parseAsResourceUrl(K.uibTooltipTemplateTransclude),function(O){var N=++I;
if(O){A(O,true).then(function(P){if(N!==I){return 
}var R=J.$new();
var Q=P;
var S=C(Q)(R,function(T){E();
D.enter(T,F)
});
M=R;
H=S;
M.$emit("$includeContentLoaded",O)
},function(){if(N===I){E();
L.$emit("$includeContentError",O)
}});
L.$emit("$includeContentRequested",O)
}else{E()
}});
L.$on("$destroy",E)
}}
}]).directive("uibTooltipClasses",["$uibPosition",function(A){return{restrict:"A",link:function(E,D,C){if(E.placement){var B=A.parsePlacement(E.placement);
D.addClass(B[0])
}if(E.popupClass){D.addClass(E.popupClass)
}if(E.animation()){D.addClass(C.tooltipAnimationClass)
}}}
}]).directive("uibTooltipPopup",function(){return{replace:true,scope:{content:"@",placement:"@",popupClass:"@",animation:"&",isOpen:"&"},templateUrl:"uib/template/tooltip/tooltip-popup.html"}
}).directive("uibTooltip",["$uibTooltip",function(A){return A("uibTooltip","tooltip","mouseenter")
}]).directive("uibTooltipTemplatePopup",function(){return{replace:true,scope:{contentExp:"&",placement:"@",popupClass:"@",animation:"&",isOpen:"&",originScope:"&"},templateUrl:"uib/template/tooltip/tooltip-template-popup.html"}
}).directive("uibTooltipTemplate",["$uibTooltip",function(A){return A("uibTooltipTemplate","tooltip","mouseenter",{useContentExp:true})
}]).directive("uibTooltipHtmlPopup",function(){return{replace:true,scope:{contentExp:"&",placement:"@",popupClass:"@",animation:"&",isOpen:"&"},templateUrl:"uib/template/tooltip/tooltip-html-popup.html"}
}).directive("uibTooltipHtml",["$uibTooltip",function(A){return A("uibTooltipHtml","tooltip","mouseenter",{useContentExp:true})
}]);
angular.module("ui.bootstrap.popover",["ui.bootstrap.tooltip"]).directive("uibPopoverTemplatePopup",function(){return{replace:true,scope:{uibTitle:"@",contentExp:"&",placement:"@",popupClass:"@",animation:"&",isOpen:"&",originScope:"&"},templateUrl:"uib/template/popover/popover-template.html"}
}).directive("uibPopoverTemplate",["$uibTooltip",function(A){return A("uibPopoverTemplate","popover","click",{useContentExp:true})
}]).directive("uibPopoverHtmlPopup",function(){return{replace:true,scope:{contentExp:"&",uibTitle:"@",placement:"@",popupClass:"@",animation:"&",isOpen:"&"},templateUrl:"uib/template/popover/popover-html.html"}
}).directive("uibPopoverHtml",["$uibTooltip",function(A){return A("uibPopoverHtml","popover","click",{useContentExp:true})
}]).directive("uibPopoverPopup",function(){return{replace:true,scope:{uibTitle:"@",content:"@",placement:"@",popupClass:"@",animation:"&",isOpen:"&"},templateUrl:"uib/template/popover/popover.html"}
}).directive("uibPopover",["$uibTooltip",function(A){return A("uibPopover","popover","click")
}]);
angular.module("ui.bootstrap.progressbar",[]).constant("uibProgressConfig",{animate:true,max:100}).controller("UibProgressController",["$scope","$attrs","uibProgressConfig",function(D,A,F){var C=this,B=angular.isDefined(A.animate)?D.$parent.$eval(A.animate):F.animate;
this.bars=[];
D.max=E();
this.addBar=function(I,H,G){if(!B){H.css({transition:"none"})
}this.bars.push(I);
I.max=E();
I.title=G&&angular.isDefined(G.title)?G.title:"progressbar";
I.$watch("value",function(J){I.recalculatePercentage()
});
I.recalculatePercentage=function(){var J=C.bars.reduce(function(L,K){K.percent=+(100*K.value/K.max).toFixed(2);
return L+K.percent
},0);
if(J>100){I.percent-=J-100
}};
I.$on("$destroy",function(){H=null;
C.removeBar(I)
})
};
this.removeBar=function(G){this.bars.splice(this.bars.indexOf(G),1);
this.bars.forEach(function(H){H.recalculatePercentage()
})
};
D.$watch("maxParam",function(G){C.bars.forEach(function(H){H.max=E();
H.recalculatePercentage()
})
});
function E(){return angular.isDefined(D.maxParam)?D.maxParam:F.max
}}]).directive("uibProgress",function(){return{replace:true,transclude:true,controller:"UibProgressController",require:"uibProgress",scope:{maxParam:"=?max"},templateUrl:"uib/template/progressbar/progress.html"}
}).directive("uibBar",function(){return{replace:true,transclude:true,require:"^uibProgress",scope:{value:"=",type:"@"},templateUrl:"uib/template/progressbar/bar.html",link:function(D,C,B,A){A.addBar(D,C,B)
}}
}).directive("uibProgressbar",function(){return{replace:true,transclude:true,controller:"UibProgressController",scope:{value:"=",maxParam:"=?max",type:"@"},templateUrl:"uib/template/progressbar/progressbar.html",link:function(D,C,B,A){A.addBar(D,angular.element(C.children()[0]),{title:B.title})
}}
});
angular.module("ui.bootstrap.rating",[]).constant("uibRatingConfig",{max:5,stateOn:null,stateOff:null,enableReset:true,titles:["one","two","three","four","five"]}).controller("UibRatingController",["$scope","$attrs","uibRatingConfig",function(C,A,E){var D={$setViewValue:angular.noop},B=this;
this.init=function(F){D=F;
D.$render=this.render;
D.$formatters.push(function(I){if(angular.isNumber(I)&&I<<0!==I){I=Math.round(I)
}return I
});
this.stateOn=angular.isDefined(A.stateOn)?C.$parent.$eval(A.stateOn):E.stateOn;
this.stateOff=angular.isDefined(A.stateOff)?C.$parent.$eval(A.stateOff):E.stateOff;
this.enableReset=angular.isDefined(A.enableReset)?C.$parent.$eval(A.enableReset):E.enableReset;
var G=angular.isDefined(A.titles)?C.$parent.$eval(A.titles):E.titles;
this.titles=angular.isArray(G)&&G.length>0?G:E.titles;
var H=angular.isDefined(A.ratingStates)?C.$parent.$eval(A.ratingStates):new Array(angular.isDefined(A.max)?C.$parent.$eval(A.max):E.max);
C.range=this.buildTemplateObjects(H)
};
this.buildTemplateObjects=function(F){for(var G=0,H=F.length;
G<H;
G++){F[G]=angular.extend({index:G},{stateOn:this.stateOn,stateOff:this.stateOff,title:this.getTitle(G)},F[G])
}return F
};
this.getTitle=function(F){if(F>=this.titles.length){return F+1
}return this.titles[F]
};
C.rate=function(G){if(!C.readonly&&G>=0&&G<=C.range.length){var F=B.enableReset&&D.$viewValue===G?0:G;
D.$setViewValue(F);
D.$render()
}};
C.enter=function(F){if(!C.readonly){C.value=F
}C.onHover({value:F})
};
C.reset=function(){C.value=D.$viewValue;
C.onLeave()
};
C.onKeydown=function(F){if(/(37|38|39|40)/.test(F.which)){F.preventDefault();
F.stopPropagation();
C.rate(C.value+(F.which===38||F.which===39?1:-1))
}};
this.render=function(){C.value=D.$viewValue;
C.title=B.getTitle(C.value-1)
}
}]).directive("uibRating",function(){return{require:["uibRating","ngModel"],scope:{readonly:"=?readOnly",onHover:"&",onLeave:"&"},controller:"UibRatingController",templateUrl:"uib/template/rating/rating.html",replace:true,link:function(F,E,D,A){var B=A[0],C=A[1];
B.init(C)
}}
});
angular.module("ui.bootstrap.tabs",[]).controller("UibTabsetController",["$scope",function(B){var E=this,G;
E.tabs=[];
E.select=function(I,H){if(!D){var L=A(G);
var K=E.tabs[L];
if(K){K.tab.onDeselect({$event:H});
if(H&&H.isDefaultPrevented()){return 
}K.tab.active=false
}var J=E.tabs[I];
if(J){J.tab.onSelect({$event:H});
J.tab.active=true;
E.active=J.index;
G=J.index
}else{if(!J&&angular.isNumber(G)){E.active=null;
G=null
}}}};
E.addTab=function F(H){E.tabs.push({tab:H,index:H.index});
E.tabs.sort(function(K,J){if(K.index>J.index){return 1
}if(K.index<J.index){return -1
}return 0
});
if(H.index===E.active||!angular.isNumber(E.active)&&E.tabs.length===1){var I=A(H.index);
E.select(I)
}};
E.removeTab=function C(J){var H;
for(var I=0;
I<E.tabs.length;
I++){if(E.tabs[I].tab===J){H=I;
break
}}if(E.tabs[H].index===E.active){var K=H===E.tabs.length-1?H-1:H+1%E.tabs.length;
E.select(K)
}E.tabs.splice(H,1)
};
B.$watch("tabset.active",function(H){if(angular.isNumber(H)&&H!==G){E.select(A(H))
}});
var D;
B.$on("$destroy",function(){D=true
});
function A(H){for(var I=0;
I<E.tabs.length;
I++){if(E.tabs[I].index===H){return I
}}}}]).directive("uibTabset",function(){return{transclude:true,replace:true,scope:{},bindToController:{active:"=?",type:"@"},controller:"UibTabsetController",controllerAs:"tabset",templateUrl:function(B,A){return A.templateUrl||"uib/template/tabs/tabset.html"
},link:function(C,B,A){C.vertical=angular.isDefined(A.vertical)?C.$parent.$eval(A.vertical):false;
C.justified=angular.isDefined(A.justified)?C.$parent.$eval(A.justified):false;
if(angular.isUndefined(A.active)){C.active=0
}}}
}).directive("uibTab",["$parse",function(A){return{require:"^uibTabset",replace:true,templateUrl:function(C,B){return B.templateUrl||"uib/template/tabs/tab.html"
},transclude:true,scope:{heading:"@",index:"=?",classes:"@?",onSelect:"&select",onDeselect:"&deselect"},controller:function(){},controllerAs:"tab",link:function(E,F,C,D,B){E.disabled=false;
if(C.disable){E.$parent.$watch(A(C.disable),function(G){E.disabled=!!G
})
}if(angular.isUndefined(C.index)){if(D.tabs&&D.tabs.length){E.index=Math.max.apply(null,D.tabs.map(function(G){return G.index
}))+1
}else{E.index=0
}}if(angular.isUndefined(C.classes)){E.classes=""
}E.select=function(G){if(!E.disabled){var H;
for(var I=0;
I<D.tabs.length;
I++){if(D.tabs[I].tab===E){H=I;
break
}}D.select(H,G)
}};
D.addTab(E);
E.$on("$destroy",function(){D.removeTab(E)
});
E.$transcludeFn=B
}}
}]).directive("uibTabHeadingTransclude",function(){return{restrict:"A",require:"^uibTab",link:function(B,C){B.$watch("headingElement",function A(D){if(D){C.html("");
C.append(D)
}})
}}
}).directive("uibTabContentTransclude",function(){return{restrict:"A",require:"^uibTabset",link:function(D,E,B){var C=D.$eval(B.uibTabContentTransclude).tab;
C.$transcludeFn(C.$parent,function(F){angular.forEach(F,function(G){if(A(G)){C.headingElement=G
}else{E.append(G)
}})
})
}};
function A(B){return B.tagName&&(B.hasAttribute("uib-tab-heading")||B.hasAttribute("data-uib-tab-heading")||B.hasAttribute("x-uib-tab-heading")||B.tagName.toLowerCase()==="uib-tab-heading"||B.tagName.toLowerCase()==="data-uib-tab-heading"||B.tagName.toLowerCase()==="x-uib-tab-heading"||B.tagName.toLowerCase()==="uib:tab-heading")
}});
angular.module("ui.bootstrap.timepicker",[]).constant("uibTimepickerConfig",{hourStep:1,minuteStep:1,secondStep:1,showMeridian:true,showSeconds:false,meridians:null,readonlyInput:false,mousewheel:true,arrowkeys:true,showSpinners:true,templateUrl:"uib/template/timepicker/timepicker.html"}).controller("UibTimepickerController",["$scope","$element","$attrs","$parse","$log","$locale","uibTimepickerConfig",function(T,P,J,I,U,a,E){var R=new Date(),G=[],M={$setViewValue:angular.noop},Z=angular.isDefined(J.meridians)?T.$parent.$eval(J.meridians):E.meridians||a.DATETIME_FORMATS.AMPMS,N=angular.isDefined(J.padHours)?T.$parent.$eval(J.padHours):true;
T.tabindex=angular.isDefined(J.tabindex)?J.tabindex:0;
P.removeAttr("tabindex");
this.init=function(h,f){M=h;
M.$render=this.render;
M.$formatters.unshift(function(k){return k?new Date(k):null
});
var i=f.eq(0),g=f.eq(1),e=f.eq(2);
var d=angular.isDefined(J.mousewheel)?T.$parent.$eval(J.mousewheel):E.mousewheel;
if(d){this.setupMousewheelEvents(i,g,e)
}var j=angular.isDefined(J.arrowkeys)?T.$parent.$eval(J.arrowkeys):E.arrowkeys;
if(j){this.setupArrowkeyEvents(i,g,e)
}T.readonlyInput=angular.isDefined(J.readonlyInput)?T.$parent.$eval(J.readonlyInput):E.readonlyInput;
this.setupInputEvents(i,g,e)
};
var B=E.hourStep;
if(J.hourStep){G.push(T.$parent.$watch(I(J.hourStep),function(d){B=+d
}))
}var Q=E.minuteStep;
if(J.minuteStep){G.push(T.$parent.$watch(I(J.minuteStep),function(d){Q=+d
}))
}var V;
G.push(T.$parent.$watch(I(J.min),function(e){var d=new Date(e);
V=isNaN(d)?undefined:d
}));
var W;
G.push(T.$parent.$watch(I(J.max),function(e){var d=new Date(e);
W=isNaN(d)?undefined:d
}));
var H=false;
if(J.ngDisabled){G.push(T.$parent.$watch(I(J.ngDisabled),function(d){H=d
}))
}T.noIncrementHours=function(){var d=b(R,B*60);
return H||d>W||d<R&&d<V
};
T.noDecrementHours=function(){var d=b(R,-B*60);
return H||d<V||d>R&&d>W
};
T.noIncrementMinutes=function(){var d=b(R,Q);
return H||d>W||d<R&&d<V
};
T.noDecrementMinutes=function(){var d=b(R,-Q);
return H||d<V||d>R&&d>W
};
T.noIncrementSeconds=function(){var d=X(R,D);
return H||d>W||d<R&&d<V
};
T.noDecrementSeconds=function(){var d=X(R,-D);
return H||d<V||d>R&&d>W
};
T.noToggleMeridian=function(){if(R.getHours()<12){return H||b(R,12*60)>W
}return H||b(R,-12*60)<V
};
var D=E.secondStep;
if(J.secondStep){G.push(T.$parent.$watch(I(J.secondStep),function(d){D=+d
}))
}T.showSeconds=E.showSeconds;
if(J.showSeconds){G.push(T.$parent.$watch(I(J.showSeconds),function(d){T.showSeconds=!!d
}))
}T.showMeridian=E.showMeridian;
if(J.showMeridian){G.push(T.$parent.$watch(I(J.showMeridian),function(f){T.showMeridian=!!f;
if(M.$error.time){var d=A(),e=L();
if(angular.isDefined(d)&&angular.isDefined(e)){R.setHours(d);
F()
}}else{C()
}}))
}function A(){var d=+T.hours;
var e=T.showMeridian?d>0&&d<13:d>=0&&d<24;
if(!e||T.hours===""){return undefined
}if(T.showMeridian){if(d===12){d=0
}if(T.meridian===Z[1]){d=d+12
}}return d
}function L(){var d=+T.minutes;
var e=d>=0&&d<60;
if(!e||T.minutes===""){return undefined
}return d
}function c(){var d=+T.seconds;
return d>=0&&d<60?d:undefined
}function Y(e,d){if(e===null){return""
}return angular.isDefined(e)&&e.toString().length<2&&!d?"0"+e:e.toString()
}this.setupMousewheelEvents=function(g,f,e){var d=function(h){if(h.originalEvent){h=h.originalEvent
}var i=h.wheelDelta?h.wheelDelta:-h.deltaY;
return h.detail||i>0
};
g.bind("mousewheel wheel",function(h){if(!H){T.$apply(d(h)?T.incrementHours():T.decrementHours())
}h.preventDefault()
});
f.bind("mousewheel wheel",function(h){if(!H){T.$apply(d(h)?T.incrementMinutes():T.decrementMinutes())
}h.preventDefault()
});
e.bind("mousewheel wheel",function(h){if(!H){T.$apply(d(h)?T.incrementSeconds():T.decrementSeconds())
}h.preventDefault()
})
};
this.setupArrowkeyEvents=function(f,e,d){f.bind("keydown",function(g){if(!H){if(g.which===38){g.preventDefault();
T.incrementHours();
T.$apply()
}else{if(g.which===40){g.preventDefault();
T.decrementHours();
T.$apply()
}}}});
e.bind("keydown",function(g){if(!H){if(g.which===38){g.preventDefault();
T.incrementMinutes();
T.$apply()
}else{if(g.which===40){g.preventDefault();
T.decrementMinutes();
T.$apply()
}}}});
d.bind("keydown",function(g){if(!H){if(g.which===38){g.preventDefault();
T.incrementSeconds();
T.$apply()
}else{if(g.which===40){g.preventDefault();
T.decrementSeconds();
T.$apply()
}}}})
};
this.setupInputEvents=function(f,e,d){if(T.readonlyInput){T.updateHours=angular.noop;
T.updateMinutes=angular.noop;
T.updateSeconds=angular.noop;
return 
}var g=function(i,j,h){M.$setViewValue(null);
M.$setValidity("time",false);
if(angular.isDefined(i)){T.invalidHours=i
}if(angular.isDefined(j)){T.invalidMinutes=j
}if(angular.isDefined(h)){T.invalidSeconds=h
}};
T.updateHours=function(){var h=A(),i=L();
M.$setDirty();
if(angular.isDefined(h)&&angular.isDefined(i)){R.setHours(h);
R.setMinutes(i);
if(R<V||R>W){g(true)
}else{F("h")
}}else{g(true)
}};
f.bind("blur",function(h){M.$setTouched();
if(O()){S()
}else{if(T.hours===null||T.hours===""){g(true)
}else{if(!T.invalidHours&&T.hours<10){T.$apply(function(){T.hours=Y(T.hours,!N)
})
}}}});
T.updateMinutes=function(){var i=L(),h=A();
M.$setDirty();
if(angular.isDefined(i)&&angular.isDefined(h)){R.setHours(h);
R.setMinutes(i);
if(R<V||R>W){g(undefined,true)
}else{F("m")
}}else{g(undefined,true)
}};
e.bind("blur",function(h){M.$setTouched();
if(O()){S()
}else{if(T.minutes===null){g(undefined,true)
}else{if(!T.invalidMinutes&&T.minutes<10){T.$apply(function(){T.minutes=Y(T.minutes)
})
}}}});
T.updateSeconds=function(){var h=c();
M.$setDirty();
if(angular.isDefined(h)){R.setSeconds(h);
F("s")
}else{g(undefined,undefined,true)
}};
d.bind("blur",function(h){if(O()){S()
}else{if(!T.invalidSeconds&&T.seconds<10){T.$apply(function(){T.seconds=Y(T.seconds)
})
}}})
};
this.render=function(){var d=M.$viewValue;
if(isNaN(d)){M.$setValidity("time",false);
U.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')
}else{if(d){R=d
}if(R<V||R>W){M.$setValidity("time",false);
T.invalidHours=true;
T.invalidMinutes=true
}else{S()
}C()
}};
function F(d){S();
M.$setViewValue(new Date(R));
C(d)
}function S(){M.$setValidity("time",true);
T.invalidHours=false;
T.invalidMinutes=false;
T.invalidSeconds=false
}function C(g){if(!M.$modelValue){T.hours=null;
T.minutes=null;
T.seconds=null;
T.meridian=Z[0]
}else{var d=R.getHours(),e=R.getMinutes(),f=R.getSeconds();
if(T.showMeridian){d=d===0||d===12?12:d%12
}T.hours=g==="h"?d:Y(d,!N);
if(g!=="m"){T.minutes=Y(e)
}T.meridian=R.getHours()<12?Z[0]:Z[1];
if(g!=="s"){T.seconds=Y(f)
}T.meridian=R.getHours()<12?Z[0]:Z[1]
}}function K(d){R=X(R,d);
F()
}function b(e,d){return X(e,d*60)
}function X(e,g){var f=new Date(e.getTime()+g*1000);
var d=new Date(e);
d.setHours(f.getHours(),f.getMinutes(),f.getSeconds());
return d
}function O(){return(T.hours===null||T.hours==="")&&(T.minutes===null||T.minutes==="")&&(!T.showSeconds||T.showSeconds&&(T.seconds===null||T.seconds===""))
}T.showSpinners=angular.isDefined(J.showSpinners)?T.$parent.$eval(J.showSpinners):E.showSpinners;
T.incrementHours=function(){if(!T.noIncrementHours()){K(B*60*60)
}};
T.decrementHours=function(){if(!T.noDecrementHours()){K(-B*60*60)
}};
T.incrementMinutes=function(){if(!T.noIncrementMinutes()){K(Q*60)
}};
T.decrementMinutes=function(){if(!T.noDecrementMinutes()){K(-Q*60)
}};
T.incrementSeconds=function(){if(!T.noIncrementSeconds()){K(D)
}};
T.decrementSeconds=function(){if(!T.noDecrementSeconds()){K(-D)
}};
T.toggleMeridian=function(){var e=L(),d=A();
if(!T.noToggleMeridian()){if(angular.isDefined(e)&&angular.isDefined(d)){K(12*60*(R.getHours()<12?60:-60))
}else{T.meridian=T.meridian===Z[0]?Z[1]:Z[0]
}}};
T.blur=function(){M.$setTouched()
};
T.$on("$destroy",function(){while(G.length){G.shift()()
}})
}]).directive("uibTimepicker",["uibTimepickerConfig",function(A){return{require:["uibTimepicker","?^ngModel"],controller:"UibTimepickerController",controllerAs:"timepicker",replace:true,scope:{},templateUrl:function(C,B){return B.templateUrl||A.templateUrl
},link:function(G,F,E,C){var B=C[0],D=C[1];
if(D){B.init(D,F.find("input"))
}}}
}]);
angular.module("ui.bootstrap.typeahead",["ui.bootstrap.debounce","ui.bootstrap.position"]).factory("uibTypeaheadParser",["$parse",function(B){var A=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
return{parse:function(C){var D=C.match(A);
if(!D){throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "'+C+'".')
}return{itemName:D[3],source:B(D[4]),viewMapper:B(D[2]||D[1]),modelMapper:B(D[1])}
}}
}]).controller("UibTypeaheadController",["$scope","$element","$attrs","$compile","$parse","$q","$timeout","$document","$window","$rootScope","$$debounce","$uibPosition","uibTypeaheadParser",function(P,V,N,B,AA,F,l,f,w,Z,A,J,C){var H=[9,13,27,38,40];
var T=200;
var m,E;
var t=P.$eval(N.typeaheadMinLength);
if(!t&&t!==0){t=1
}P.$watch(N.typeaheadMinLength,function(AE){t=!AE&&AE!==0?1:AE
});
var o=P.$eval(N.typeaheadWaitMs)||0;
var G=P.$eval(N.typeaheadEditable)!==false;
P.$watch(N.typeaheadEditable,function(AE){G=AE!==false
});
var K=AA(N.typeaheadLoading).assign||angular.noop;
var u=AA(N.typeaheadOnSelect);
var a=angular.isDefined(N.typeaheadSelectOnBlur)?P.$eval(N.typeaheadSelectOnBlur):false;
var AC=AA(N.typeaheadNoResults).assign||angular.noop;
var s=N.typeaheadInputFormatter?AA(N.typeaheadInputFormatter):undefined;
var j=N.typeaheadAppendToBody?P.$eval(N.typeaheadAppendToBody):false;
var D=N.typeaheadAppendTo?P.$eval(N.typeaheadAppendTo):null;
var v=P.$eval(N.typeaheadFocusFirst)!==false;
var AD=N.typeaheadSelectOnExact?P.$eval(N.typeaheadSelectOnExact):false;
var Y=AA(N.typeaheadIsOpen).assign||angular.noop;
var R=P.$eval(N.typeaheadShowHint)||false;
var W=AA(N.ngModel);
var r=AA(N.ngModel+"($$$p)");
var i=function(AE,AF){if(angular.isFunction(W(P))&&E&&E.$options&&E.$options.getterSetter){return r(AE,{$$$p:AF})
}return W.assign(AE,AF)
};
var c=C.parse(N.uibTypeahead);
var X;
var g;
var n=P.$new();
var O=P.$on("$destroy",function(){n.$destroy()
});
n.$on("$destroy",O);
var I="typeahead-"+n.$id+"-"+Math.floor(Math.random()*10000);
V.attr({"aria-autocomplete":"list","aria-expanded":false,"aria-owns":I});
var h,z;
if(R){h=angular.element("<div></div>");
h.css("position","relative");
V.after(h);
z=V.clone();
z.attr("placeholder","");
z.attr("tabindex","-1");
z.val("");
z.css({position:"absolute",top:"0px",left:"0px","border-color":"transparent","box-shadow":"none",opacity:1,background:"none 0% 0% / auto repeat scroll padding-box border-box rgb(255, 255, 255)",color:"#999"});
V.css({position:"relative","vertical-align":"top","background-color":"transparent"});
h.append(z);
z.after(V)
}var M=angular.element("<div uib-typeahead-popup></div>");
M.attr({id:I,matches:"matches",active:"activeIdx",select:"select(activeIdx, evt)","move-in-progress":"moveInProgress",query:"query",position:"position","assign-is-open":"assignIsOpen(isOpen)",debounce:"debounceUpdate"});
if(angular.isDefined(N.typeaheadTemplateUrl)){M.attr("template-url",N.typeaheadTemplateUrl)
}if(angular.isDefined(N.typeaheadPopupTemplateUrl)){M.attr("popup-template-url",N.typeaheadPopupTemplateUrl)
}var b=function(){if(R){z.val("")
}};
var e=function(){n.matches=[];
n.activeIdx=-1;
V.attr("aria-expanded",false);
b()
};
var q=function(AE){return I+"-option-"+AE
};
n.$watch("activeIdx",function(AE){if(AE<0){V.removeAttr("aria-activedescendant")
}else{V.attr("aria-activedescendant",q(AE))
}});
var S=function(AE,AF){if(n.matches.length>AF&&AE){return AE.toUpperCase()===n.matches[AF].label.toUpperCase()
}return false
};
var U=function(AE,AF){var AG={$viewValue:AE};
K(P,true);
AC(P,false);
F.when(c.source(P,AG)).then(function(AK){var AI=AE===m.$viewValue;
if(AI&&X){if(AK&&AK.length>0){n.activeIdx=v?0:-1;
AC(P,false);
n.matches.length=0;
for(var AJ=0;
AJ<AK.length;
AJ++){AG[c.itemName]=AK[AJ];
n.matches.push({id:q(AJ),label:c.viewMapper(n,AG),model:AK[AJ]})
}n.query=AE;
d();
V.attr("aria-expanded",true);
if(AD&&n.matches.length===1&&S(AE,0)){if(angular.isNumber(n.debounceUpdate)||angular.isObject(n.debounceUpdate)){A(function(){n.select(0,AF)
},angular.isNumber(n.debounceUpdate)?n.debounceUpdate:n.debounceUpdate["default"])
}else{n.select(0,AF)
}}if(R){var AH=n.matches[0].label;
if(angular.isString(AE)&&AE.length>0&&AH.slice(0,AE.length).toUpperCase()===AE.toUpperCase()){z.val(AE+AH.slice(AE.length))
}else{z.val("")
}}}else{e();
AC(P,true)
}}if(AI){K(P,false)
}},function(){e();
K(P,false);
AC(P,true)
})
};
if(j){angular.element(w).on("resize",p);
f.find("body").on("scroll",p)
}var Q=A(function(){if(n.matches.length){d()
}n.moveInProgress=false
},T);
n.moveInProgress=false;
function p(){if(!n.moveInProgress){n.moveInProgress=true;
n.$digest()
}Q()
}function d(){n.position=j?J.offset(V):J.position(V);
n.position.top+=V.prop("offsetHeight")
}n.query=undefined;
var k;
var y=function(AE){k=l(function(){U(AE)
},o)
};
var x=function(){if(k){l.cancel(k)
}};
e();
n.assignIsOpen=function(AE){Y(P,AE)
};
n.select=function(AH,AE){var AI={};
var AF,AG;
g=true;
AI[c.itemName]=AG=n.matches[AH].model;
AF=c.modelMapper(P,AI);
i(P,AF);
m.$setValidity("editable",true);
m.$setValidity("parse",true);
u(P,{$item:AG,$model:AF,$label:c.viewMapper(P,AI),$event:AE});
e();
if(n.$eval(N.typeaheadFocusOnSelect)!==false){l(function(){V[0].focus()
},0,false)
}};
V.on("keydown",function(AE){if(n.matches.length===0||H.indexOf(AE.which)===-1){return 
}if(n.activeIdx===-1&&(AE.which===9||AE.which===13)||AE.which===9&&!!AE.shiftKey){e();
n.$digest();
return 
}AE.preventDefault();
var AF;
switch(AE.which){case 9:case 13:n.$apply(function(){if(angular.isNumber(n.debounceUpdate)||angular.isObject(n.debounceUpdate)){A(function(){n.select(n.activeIdx,AE)
},angular.isNumber(n.debounceUpdate)?n.debounceUpdate:n.debounceUpdate["default"])
}else{n.select(n.activeIdx,AE)
}});
break;
case 27:AE.stopPropagation();
e();
P.$digest();
break;
case 38:n.activeIdx=(n.activeIdx>0?n.activeIdx:n.matches.length)-1;
n.$digest();
AF=M.find("li")[n.activeIdx];
AF.parentNode.scrollTop=AF.offsetTop;
break;
case 40:n.activeIdx=(n.activeIdx+1)%n.matches.length;
n.$digest();
AF=M.find("li")[n.activeIdx];
AF.parentNode.scrollTop=AF.offsetTop;
break
}});
V.bind("focus",function(AE){X=true;
if(t===0&&!m.$viewValue){l(function(){U(m.$viewValue,AE)
},0)
}});
V.bind("blur",function(AE){if(a&&n.matches.length&&n.activeIdx!==-1&&!g){g=true;
n.$apply(function(){if(angular.isObject(n.debounceUpdate)&&angular.isNumber(n.debounceUpdate.blur)){A(function(){n.select(n.activeIdx,AE)
},n.debounceUpdate.blur)
}else{n.select(n.activeIdx,AE)
}})
}if(!G&&m.$error.editable){m.$setViewValue();
m.$setValidity("editable",true);
m.$setValidity("parse",true);
V.val("")
}X=false;
g=false
});
var AB=function(AE){if(V[0]!==AE.target&&AE.which!==3&&n.matches.length!==0){e();
if(!Z.$$phase){P.$digest()
}}};
f.on("click",AB);
P.$on("$destroy",function(){f.off("click",AB);
if(j||D){L.remove()
}if(j){angular.element(w).off("resize",p);
f.find("body").off("scroll",p)
}M.remove();
if(R){h.remove()
}});
var L=B(M)(n);
if(j){f.find("body").append(L)
}else{if(D){angular.element(D).eq(0).append(L)
}else{V.after(L)
}}this.init=function(AF,AE){m=AF;
E=AE;
n.debounceUpdate=m.$options&&AA(m.$options.debounce)(P);
m.$parsers.unshift(function(AG){X=true;
if(t===0||AG&&AG.length>=t){if(o>0){x();
y(AG)
}else{U(AG)
}}else{K(P,false);
x();
e()
}if(G){return AG
}if(!AG){m.$setValidity("editable",true);
return null
}m.$setValidity("editable",false);
return undefined
});
m.$formatters.push(function(AI){var AH,AG;
var AJ={};
if(!G){m.$setValidity("editable",true)
}if(s){AJ.$model=AI;
return s(P,AJ)
}AJ[c.itemName]=AI;
AH=c.viewMapper(P,AJ);
AJ[c.itemName]=undefined;
AG=c.viewMapper(P,AJ);
return AH!==AG?AH:AI
})
}
}]).directive("uibTypeahead",function(){return{controller:"UibTypeaheadController",require:["ngModel","^?ngModelOptions","uibTypeahead"],link:function(D,C,B,A){A[2].init(A[0],A[1])
}}
}).directive("uibTypeaheadPopup",["$$debounce",function(A){return{scope:{matches:"=",query:"=",active:"=",position:"&",moveInProgress:"=",select:"&",assignIsOpen:"&",debounce:"&"},replace:true,templateUrl:function(C,B){return B.popupTemplateUrl||"uib/template/typeahead/typeahead-popup.html"
},link:function(D,C,B){D.templateUrl=B.templateUrl;
D.isOpen=function(){var E=D.matches.length>0;
D.assignIsOpen({isOpen:E});
return E
};
D.isActive=function(E){return D.active===E
};
D.selectActive=function(E){D.active=E
};
D.selectMatch=function(G,E){var F=D.debounce();
if(angular.isNumber(F)||angular.isObject(F)){A(function(){D.select({activeIdx:G,evt:E})
},angular.isNumber(F)?F:F["default"])
}else{D.select({activeIdx:G,evt:E})
}}
}}
}]).directive("uibTypeaheadMatch",["$templateRequest","$compile","$parse",function(A,B,C){return{scope:{index:"=",match:"=",query:"="},link:function(G,F,E){var D=C(E.templateUrl)(G.$parent)||"uib/template/typeahead/typeahead-match.html";
A(D).then(function(I){var H=angular.element(I.trim());
F.replaceWith(H);
B(H)(G)
})
}}
}]).filter("uibTypeaheadHighlight",["$sce","$injector","$log",function(A,D,E){var F;
F=D.has("$sanitize");
function C(G){return G.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")
}function B(G){return/<.*>/g.test(G)
}return function(H,G){if(!F&&B(H)){E.warn("Unsafe use of typeahead please use ngSanitize")
}H=G?(""+H).replace(new RegExp(C(G),"gi"),"<strong>$&</strong>"):H;
if(!F){H=A.trustAsHtml(H)
}return H
}
}]);
angular.module("uib/template/accordion/accordion-group.html",[]).run(["$templateCache",function(A){A.put("uib/template/accordion/accordion-group.html",'<div class="panel" ng-class="panelClass || \'panel-default\'">\n  <div role="tab" id="{{::headingId}}" aria-selected="{{isOpen}}" class="panel-heading" ng-keypress="toggleOpen($event)">\n    <h4 class="panel-title">\n      <a role="button" data-toggle="collapse" href aria-expanded="{{isOpen}}" aria-controls="{{::panelId}}" tabindex="0" class="accordion-toggle" ng-click="toggleOpen()" uib-accordion-transclude="heading"><span uib-accordion-header ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n    </h4>\n  </div>\n  <div id="{{::panelId}}" aria-labelledby="{{::headingId}}" aria-hidden="{{!isOpen}}" role="tabpanel" class="panel-collapse collapse" uib-collapse="!isOpen">\n    <div class="panel-body" ng-transclude></div>\n  </div>\n</div>\n')
}]);
angular.module("uib/template/accordion/accordion.html",[]).run(["$templateCache",function(A){A.put("uib/template/accordion/accordion.html",'<div role="tablist" class="panel-group" ng-transclude></div>')
}]);
angular.module("uib/template/alert/alert.html",[]).run(["$templateCache",function(A){A.put("uib/template/alert/alert.html",'<div class="alert" ng-class="[\'alert-\' + (type || \'warning\'), closeable ? \'alert-dismissible\' : null]" role="alert">\n    <button ng-show="closeable" type="button" class="close" ng-click="close({$event: $event})">\n        <span aria-hidden="true">&times;</span>\n        <span class="sr-only">Close</span>\n    </button>\n    <div ng-transclude></div>\n</div>\n')
}]);
angular.module("uib/template/carousel/carousel.html",[]).run(["$templateCache",function(A){A.put("uib/template/carousel/carousel.html",'<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n  <div class="carousel-inner" ng-transclude></div>\n  <a role="button" href class="left carousel-control" ng-click="prev()" ng-class="{ disabled: isPrevDisabled() }" ng-show="slides.length > 1">\n    <span aria-hidden="true" class="glyphicon glyphicon-chevron-left"></span>\n    <span class="sr-only">previous</span>\n  </a>\n  <a role="button" href class="right carousel-control" ng-click="next()" ng-class="{ disabled: isNextDisabled() }" ng-show="slides.length > 1">\n    <span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>\n    <span class="sr-only">next</span>\n  </a>\n  <ol class="carousel-indicators" ng-show="slides.length > 1">\n    <li ng-repeat="slide in slides | orderBy:indexOfSlide track by $index" ng-class="{ active: isActive(slide) }" ng-click="select(slide)">\n      <span class="sr-only">slide {{ $index + 1 }} of {{ slides.length }}<span ng-if="isActive(slide)">, currently active</span></span>\n    </li>\n  </ol>\n</div>\n')
}]);
angular.module("uib/template/carousel/slide.html",[]).run(["$templateCache",function(A){A.put("uib/template/carousel/slide.html",'<div ng-class="{\n    \'active\': active\n  }" class="item text-center" ng-transclude></div>\n')
}]);
angular.module("uib/template/datepicker/datepicker.html",[]).run(["$templateCache",function(A){A.put("uib/template/datepicker/datepicker.html",'<div class="uib-datepicker" ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)">\n  <uib-daypicker ng-switch-when="day" tabindex="0"></uib-daypicker>\n  <uib-monthpicker ng-switch-when="month" tabindex="0"></uib-monthpicker>\n  <uib-yearpicker ng-switch-when="year" tabindex="0"></uib-yearpicker>\n</div>\n')
}]);
angular.module("uib/template/datepicker/day.html",[]).run(["$templateCache",function(A){A.put("uib/template/datepicker/day.html",'<table class="uib-daypicker" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left uib-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{::5 + showWeeks}}"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr>\n      <th ng-if="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in ::labels track by $index" class="text-center"><small aria-label="{{::label.full}}">{{::label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class="uib-weeks" ng-repeat="row in rows track by $index">\n      <td ng-if="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row" class="uib-day text-center" role="gridcell"\n        id="{{::dt.uid}}"\n        ng-class="::dt.customClass">\n        <button type="button" class="btn btn-default btn-sm"\n          uib-is-class="\n            \'btn-info\' for selectedDt,\n            \'active\' for activeDt\n            on dt"\n          ng-click="select(dt.date)"\n          ng-disabled="::dt.disabled"\n          tabindex="-1"><span ng-class="::{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]);
angular.module("uib/template/datepicker/month.html",[]).run(["$templateCache",function(A){A.put("uib/template/datepicker/month.html",'<table class="uib-monthpicker" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left uib-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class="uib-months" ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row" class="uib-month text-center" role="gridcell"\n        id="{{::dt.uid}}"\n        ng-class="::dt.customClass">\n        <button type="button" class="btn btn-default"\n          uib-is-class="\n            \'btn-info\' for selectedDt,\n            \'active\' for activeDt\n            on dt"\n          ng-click="select(dt.date)"\n          ng-disabled="::dt.disabled"\n          tabindex="-1"><span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]);
angular.module("uib/template/datepicker/year.html",[]).run(["$templateCache",function(A){A.put("uib/template/datepicker/year.html",'<table class="uib-yearpicker" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left uib-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{::columns - 2}}"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class="uib-years" ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row" class="uib-year text-center" role="gridcell"\n        id="{{::dt.uid}}"\n        ng-class="::dt.customClass">\n        <button type="button" class="btn btn-default"\n          uib-is-class="\n            \'btn-info\' for selectedDt,\n            \'active\' for activeDt\n            on dt"\n          ng-click="select(dt.date)"\n          ng-disabled="::dt.disabled"\n          tabindex="-1"><span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]);
angular.module("uib/template/datepickerPopup/popup.html",[]).run(["$templateCache",function(A){A.put("uib/template/datepickerPopup/popup.html",'<div>\n  <ul class="uib-datepicker-popup dropdown-menu uib-position-measure" dropdown-nested ng-if="isOpen" ng-keydown="keydown($event)" ng-click="$event.stopPropagation()">\n    <li ng-transclude></li>\n    <li ng-if="showButtonBar" class="uib-button-bar">\n      <span class="btn-group pull-left">\n        <button type="button" class="btn btn-sm btn-info uib-datepicker-current" ng-click="select(\'today\', $event)" ng-disabled="isDisabled(\'today\')">{{ getText(\'current\') }}</button>\n        <button type="button" class="btn btn-sm btn-danger uib-clear" ng-click="select(null, $event)">{{ getText(\'clear\') }}</button>\n      </span>\n      <button type="button" class="btn btn-sm btn-success pull-right uib-close" ng-click="close($event)">{{ getText(\'close\') }}</button>\n    </li>\n  </ul>\n</div>\n')
}]);
angular.module("uib/template/modal/backdrop.html",[]).run(["$templateCache",function(A){A.put("uib/template/modal/backdrop.html",'<div class="modal-backdrop"\n     uib-modal-animation-class="fade"\n     modal-in-class="in"\n     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"\n></div>\n')
}]);
angular.module("uib/template/modal/window.html",[]).run(["$templateCache",function(A){A.put("uib/template/modal/window.html",'<div modal-render="{{$isRendered}}" tabindex="-1" role="dialog" class="modal"\n    uib-modal-animation-class="fade"\n    modal-in-class="in"\n    ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}">\n    <div class="modal-dialog {{size ? \'modal-\' + size : \'\'}}"><div class="modal-content" uib-modal-transclude></div></div>\n</div>\n')
}]);
angular.module("uib/template/pager/pager.html",[]).run(["$templateCache",function(A){A.put("uib/template/pager/pager.html",'<ul class="pager">\n  <li ng-class="{disabled: noPrevious()||ngDisabled, previous: align}"><a href ng-click="selectPage(page - 1, $event)">{{::getText(\'previous\')}}</a></li>\n  <li ng-class="{disabled: noNext()||ngDisabled, next: align}"><a href ng-click="selectPage(page + 1, $event)">{{::getText(\'next\')}}</a></li>\n</ul>\n')
}]);
angular.module("uib/template/pagination/pagination.html",[]).run(["$templateCache",function(A){A.put("uib/template/pagination/pagination.html",'<ul class="pagination">\n  <li ng-if="::boundaryLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-first"><a href ng-click="selectPage(1, $event)">{{::getText(\'first\')}}</a></li>\n  <li ng-if="::directionLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-prev"><a href ng-click="selectPage(page - 1, $event)">{{::getText(\'previous\')}}</a></li>\n  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active,disabled: ngDisabled&&!page.active}" class="pagination-page"><a href ng-click="selectPage(page.number, $event)">{{page.text}}</a></li>\n  <li ng-if="::directionLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-next"><a href ng-click="selectPage(page + 1, $event)">{{::getText(\'next\')}}</a></li>\n  <li ng-if="::boundaryLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-last"><a href ng-click="selectPage(totalPages, $event)">{{::getText(\'last\')}}</a></li>\n</ul>\n')
}]);
angular.module("uib/template/tooltip/tooltip-html-popup.html",[]).run(["$templateCache",function(A){A.put("uib/template/tooltip/tooltip-html-popup.html",'<div class="tooltip"\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind-html="contentExp()"></div>\n</div>\n')
}]);
angular.module("uib/template/tooltip/tooltip-popup.html",[]).run(["$templateCache",function(A){A.put("uib/template/tooltip/tooltip-popup.html",'<div class="tooltip"\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n')
}]);
angular.module("uib/template/tooltip/tooltip-template-popup.html",[]).run(["$templateCache",function(A){A.put("uib/template/tooltip/tooltip-template-popup.html",'<div class="tooltip"\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner"\n    uib-tooltip-template-transclude="contentExp()"\n    tooltip-template-transclude-scope="originScope()"></div>\n</div>\n')
}]);
angular.module("uib/template/popover/popover-html.html",[]).run(["$templateCache",function(A){A.put("uib/template/popover/popover-html.html",'<div class="popover"\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="uibTitle" ng-if="uibTitle"></h3>\n      <div class="popover-content" ng-bind-html="contentExp()"></div>\n  </div>\n</div>\n')
}]);
angular.module("uib/template/popover/popover-template.html",[]).run(["$templateCache",function(A){A.put("uib/template/popover/popover-template.html",'<div class="popover"\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="uibTitle" ng-if="uibTitle"></h3>\n      <div class="popover-content"\n        uib-tooltip-template-transclude="contentExp()"\n        tooltip-template-transclude-scope="originScope()"></div>\n  </div>\n</div>\n')
}]);
angular.module("uib/template/popover/popover.html",[]).run(["$templateCache",function(A){A.put("uib/template/popover/popover.html",'<div class="popover"\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="uibTitle" ng-if="uibTitle"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n')
}]);
angular.module("uib/template/progressbar/bar.html",[]).run(["$templateCache",function(A){A.put("uib/template/progressbar/bar.html",'<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" ng-transclude></div>\n')
}]);
angular.module("uib/template/progressbar/progress.html",[]).run(["$templateCache",function(A){A.put("uib/template/progressbar/progress.html",'<div class="progress" ng-transclude aria-labelledby="{{::title}}"></div>')
}]);
angular.module("uib/template/progressbar/progressbar.html",[]).run(["$templateCache",function(A){A.put("uib/template/progressbar/progressbar.html",'<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" ng-transclude></div>\n</div>\n')
}]);
angular.module("uib/template/rating/rating.html",[]).run(["$templateCache",function(A){A.put("uib/template/rating/rating.html",'<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}" aria-valuetext="{{title}}">\n    <span ng-repeat-start="r in range track by $index" class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    <i ng-repeat-end ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')" ng-attr-title="{{r.title}}"></i>\n</span>\n')
}]);
angular.module("uib/template/tabs/tab.html",[]).run(["$templateCache",function(A){A.put("uib/template/tabs/tab.html",'<li ng-class="[{active: active, disabled: disabled}, classes]" class="uib-tab nav-item">\n  <a href ng-click="select($event)" class="nav-link" uib-tab-heading-transclude>{{heading}}</a>\n</li>\n')
}]);
angular.module("uib/template/tabs/tabset.html",[]).run(["$templateCache",function(A){A.put("uib/template/tabs/tabset.html",'<div>\n  <ul class="nav nav-{{tabset.type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane"\n         ng-repeat="tab in tabset.tabs"\n         ng-class="{active: tabset.active === tab.index}"\n         uib-tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n')
}]);
angular.module("uib/template/timepicker/timepicker.html",[]).run(["$templateCache",function(A){A.put("uib/template/timepicker/timepicker.html",'<table class="uib-timepicker">\n  <tbody>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td class="uib-increment hours"><a ng-click="incrementHours()" ng-class="{disabled: noIncrementHours()}" class="btn btn-link" ng-disabled="noIncrementHours()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td>&nbsp;</td>\n      <td class="uib-increment minutes"><a ng-click="incrementMinutes()" ng-class="{disabled: noIncrementMinutes()}" class="btn btn-link" ng-disabled="noIncrementMinutes()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td ng-show="showSeconds">&nbsp;</td>\n      <td ng-show="showSeconds" class="uib-increment seconds"><a ng-click="incrementSeconds()" ng-class="{disabled: noIncrementSeconds()}" class="btn btn-link" ng-disabled="noIncrementSeconds()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n    <tr>\n      <td class="form-group uib-time hours" ng-class="{\'has-error\': invalidHours}">\n        <input type="text" placeholder="HH" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2" tabindex="{{::tabindex}}" ng-disabled="noIncrementHours()" ng-blur="blur()">\n      </td>\n      <td class="uib-separator">:</td>\n      <td class="form-group uib-time minutes" ng-class="{\'has-error\': invalidMinutes}">\n        <input type="text" placeholder="MM" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2" tabindex="{{::tabindex}}" ng-disabled="noIncrementMinutes()" ng-blur="blur()">\n      </td>\n      <td ng-show="showSeconds" class="uib-separator">:</td>\n      <td class="form-group uib-time seconds" ng-class="{\'has-error\': invalidSeconds}" ng-show="showSeconds">\n        <input type="text" placeholder="SS" ng-model="seconds" ng-change="updateSeconds()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2" tabindex="{{::tabindex}}" ng-disabled="noIncrementSeconds()" ng-blur="blur()">\n      </td>\n      <td ng-show="showMeridian" class="uib-time am-pm"><button type="button" ng-class="{disabled: noToggleMeridian()}" class="btn btn-default text-center" ng-click="toggleMeridian()" ng-disabled="noToggleMeridian()" tabindex="{{::tabindex}}">{{meridian}}</button></td>\n    </tr>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td class="uib-decrement hours"><a ng-click="decrementHours()" ng-class="{disabled: noDecrementHours()}" class="btn btn-link" ng-disabled="noDecrementHours()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td>&nbsp;</td>\n      <td class="uib-decrement minutes"><a ng-click="decrementMinutes()" ng-class="{disabled: noDecrementMinutes()}" class="btn btn-link" ng-disabled="noDecrementMinutes()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td ng-show="showSeconds">&nbsp;</td>\n      <td ng-show="showSeconds" class="uib-decrement seconds"><a ng-click="decrementSeconds()" ng-class="{disabled: noDecrementSeconds()}" class="btn btn-link" ng-disabled="noDecrementSeconds()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n  </tbody>\n</table>\n')
}]);
angular.module("uib/template/typeahead/typeahead-match.html",[]).run(["$templateCache",function(A){A.put("uib/template/typeahead/typeahead-match.html",'<a href\n   tabindex="-1"\n   ng-bind-html="match.label | uibTypeaheadHighlight:query"\n   ng-attr-title="{{match.label}}"></a>\n')
}]);
angular.module("uib/template/typeahead/typeahead-popup.html",[]).run(["$templateCache",function(A){A.put("uib/template/typeahead/typeahead-popup.html",'<ul class="dropdown-menu" ng-show="isOpen() && !moveInProgress" ng-style="{top: position().top+\'px\', left: position().left+\'px\'}" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index, $event)" role="option" id="{{::match.id}}">\n        <div uib-typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n')
}]);
angular.module("ui.bootstrap.carousel").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibCarouselCss&&angular.element(document).find("head").prepend('<style type="text/css">.ng-animate.item:not(.left):not(.right){-webkit-transition:0s ease-in-out left;transition:0s ease-in-out left}</style>');
angular.$$uibCarouselCss=true
});
angular.module("ui.bootstrap.datepicker").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibDatepickerCss&&angular.element(document).find("head").prepend('<style type="text/css">.uib-datepicker .uib-title{width:100%;}.uib-day button,.uib-month button,.uib-year button{min-width:100%;}.uib-left,.uib-right{width:100%}</style>');
angular.$$uibDatepickerCss=true
});
angular.module("ui.bootstrap.position").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibPositionCss&&angular.element(document).find("head").prepend('<style type="text/css">.uib-position-measure{display:block !important;visibility:hidden !important;position:absolute !important;top:-9999px !important;left:-9999px !important;}.uib-position-scrollbar-measure{position:absolute !important;top:-9999px !important;width:50px !important;height:50px !important;overflow:scroll !important;}.uib-position-body-scrollbar-measure{overflow:scroll !important;}</style>');
angular.$$uibPositionCss=true
});
angular.module("ui.bootstrap.datepickerPopup").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibDatepickerpopupCss&&angular.element(document).find("head").prepend('<style type="text/css">.uib-datepicker-popup.dropdown-menu{display:block;float:none;margin:0;}.uib-button-bar{padding:10px 9px 2px;}</style>');
angular.$$uibDatepickerpopupCss=true
});
angular.module("ui.bootstrap.tooltip").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibTooltipCss&&angular.element(document).find("head").prepend('<style type="text/css">[uib-tooltip-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-bottom > .tooltip-arrow,[uib-popover-popup].popover.top-left > .arrow,[uib-popover-popup].popover.top-right > .arrow,[uib-popover-popup].popover.bottom-left > .arrow,[uib-popover-popup].popover.bottom-right > .arrow,[uib-popover-popup].popover.left-top > .arrow,[uib-popover-popup].popover.left-bottom > .arrow,[uib-popover-popup].popover.right-top > .arrow,[uib-popover-popup].popover.right-bottom > .arrow,[uib-popover-html-popup].popover.top-left > .arrow,[uib-popover-html-popup].popover.top-right > .arrow,[uib-popover-html-popup].popover.bottom-left > .arrow,[uib-popover-html-popup].popover.bottom-right > .arrow,[uib-popover-html-popup].popover.left-top > .arrow,[uib-popover-html-popup].popover.left-bottom > .arrow,[uib-popover-html-popup].popover.right-top > .arrow,[uib-popover-html-popup].popover.right-bottom > .arrow,[uib-popover-template-popup].popover.top-left > .arrow,[uib-popover-template-popup].popover.top-right > .arrow,[uib-popover-template-popup].popover.bottom-left > .arrow,[uib-popover-template-popup].popover.bottom-right > .arrow,[uib-popover-template-popup].popover.left-top > .arrow,[uib-popover-template-popup].popover.left-bottom > .arrow,[uib-popover-template-popup].popover.right-top > .arrow,[uib-popover-template-popup].popover.right-bottom > .arrow{top:auto;bottom:auto;left:auto;right:auto;margin:0;}[uib-popover-popup].popover,[uib-popover-html-popup].popover,[uib-popover-template-popup].popover{display:block !important;}</style>');
angular.$$uibTooltipCss=true
});
angular.module("ui.bootstrap.timepicker").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibTimepickerCss&&angular.element(document).find("head").prepend('<style type="text/css">.uib-time input{width:50px;}</style>');
angular.$$uibTimepickerCss=true
});
angular.module("ui.bootstrap.typeahead").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibTypeaheadCss&&angular.element(document).find("head").prepend('<style type="text/css">[uib-typeahead-popup].dropdown-menu{display:block;}</style>');
angular.$$uibTypeaheadCss=true
});