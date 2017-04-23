(function(Ac,AH,N){var AJ=AH.noop;
var u=AH.extend;
var q=AH.element;
var AL=AH.forEach;
var C=AH.isArray;
var Ai=AH.isString;
var T=AH.isObject;
var e=AH.isUndefined;
var z=AH.isDefined;
var AR=AH.isFunction;
var y=AH.isElement;
var AI=1;
var AA=8;
var o="-add";
var h="-remove";
var R="ng-";
var m="-active";
var K="ng-animate";
var Aa="$$ngAnimateChildren";
var g="",M,Q,AZ,k;
if(e(Ac.ontransitionend)&&z(Ac.onwebkittransitionend)){g="-webkit-";
M="WebkitTransition";
Q="webkitTransitionEnd transitionend"
}else{M="transition";
Q="transitionend"
}if(e(Ac.onanimationend)&&z(Ac.onwebkitanimationend)){g="-webkit-";
AZ="WebkitAnimation";
k="webkitAnimationEnd animationend"
}else{AZ="animation";
k="animationend"
}var Ad="Duration";
var L="Property";
var U="Delay";
var AP="TimingFunction";
var x="IterationCount";
var A="PlayState";
var c=9999;
var AQ=AZ+U;
var D=AZ+Ad;
var AK=M+U;
var AB=M+Ad;
var w=function(Al){return Al&&Al.then?true:false
};
function AU(Al,Am,An){if(!Al){throw ngMinErr("areq","Argument '{0}' is {1}",(Am||"?"),(An||"required"))
}return Al
}function r(Am,Al){if(!Am&&!Al){return""
}if(!Am){return Al
}if(!Al){return Am
}if(C(Am)){Am=Am.join(" ")
}if(C(Al)){Al=Al.join(" ")
}return Am+" "+Al
}function t(Al){var Am={};
if(Al&&(Al.to||Al.from)){Am.to=Al.to;
Am.from=Al.from
}return Am
}function Ag(An,Al,Am){var Ao="";
An=C(An)?An:An&&Ai(An)&&An.length?An.split(/\s+/):[];
AL(An,function(Ap,Aq){if(Ap&&Ap.length>0){Ao+=(Aq>0)?" ":"";
Ao+=Am?Al+Ap:Ap+Al
}});
return Ao
}function Ah(Al,An){var Am=Al.indexOf(An);
if(An>=0){Al.splice(Am,1)
}}function j(Al){if(Al instanceof q){switch(Al.length){case 0:return[];
break;
case 1:if(Al[0].nodeType===AI){return Al
}break;
default:return q(AO(Al));
break
}}if(Al.nodeType===AI){return q(Al)
}}function AO(Am){if(!Am[0]){return Am
}for(var Al=0;
Al<Am.length;
Al++){var An=Am[Al];
if(An.nodeType==AI){return An
}}}function AY(Al,Am,An){AL(Am,function(Ao){Al.addClass(Ao,An)
})
}function W(Al,Am,An){AL(Am,function(Ao){Al.removeClass(Ao,An)
})
}function AF(Al){return function(An,Am){if(Am.addClass){AY(Al,An,Am.addClass);
Am.addClass=null
}if(Am.removeClass){W(Al,An,Am.removeClass);
Am.removeClass=null
}}
}function n(Am){Am=Am||{};
if(!Am.$$prepared){var Al=Am.domOperation||AJ;
Am.domOperation=function(){Am.$$domOperationFired=true;
Al();
Al=AJ
};
Am.$$prepared=true
}return Am
}function X(Am,Al){l(Am,Al);
F(Am,Al)
}function l(Am,Al){if(Al.from){Am.css(Al.from);
Al.from=null
}}function F(Am,Al){if(Al.to){Am.css(Al.to);
Al.to=null
}}function s(Ao,Aq,Ar){var An=(Aq.addClass||"")+" "+(Ar.addClass||"");
var Ap=(Aq.removeClass||"")+" "+(Ar.removeClass||"");
var Am=v(Ao.attr("class"),An,Ap);
if(Ar.preparationClasses){Aq.preparationClasses=AE(Ar.preparationClasses,Aq.preparationClasses);
delete Ar.preparationClasses
}var Al=Aq.domOperation!==AJ?Aq.domOperation:null;
u(Aq,Ar);
if(Al){Aq.domOperation=Al
}if(Am.addClass){Aq.addClass=Am.addClass
}else{Aq.addClass=null
}if(Am.removeClass){Aq.removeClass=Am.removeClass
}else{Aq.removeClass=null
}return Aq
}function v(Ar,Ap,Aq){var Am=1;
var Ao=-1;
var Al={};
Ar=As(Ar);
Ap=As(Ap);
AL(Ap,function(Au,At){Al[At]=Am
});
Aq=As(Aq);
AL(Aq,function(Au,At){Al[At]=Al[At]===Am?null:Ao
});
var An={addClass:"",removeClass:""};
AL(Al,function(Av,At){var Aw,Au;
if(Av===Am){Aw="addClass";
Au=!Ar[At]
}else{if(Av===Ao){Aw="removeClass";
Au=Ar[At]
}}if(Au){if(An[Aw].length){An[Aw]+=" "
}An[Aw]+=At
}});
function As(At){if(Ai(At)){At=At.split(" ")
}var Au={};
AL(At,function(Av){if(Av.length){Au[Av]=true
}});
return Au
}return An
}function Y(Al){return(Al instanceof AH.element)?Al[0]:Al
}function P(An,Ao,Al){var Am="";
if(Ao){Am=Ag(Ao,R,true)
}if(Al.addClass){Am=AE(Am,Ag(Al.addClass,o))
}if(Al.removeClass){Am=AE(Am,Ag(Al.removeClass,h))
}if(Am.length){Al.preparationClasses=Am;
An.addClass(Am)
}}function AS(Am,Al){if(Al.preparationClasses){Am.removeClass(Al.preparationClasses);
Al.preparationClasses=null
}if(Al.activeClasses){Am.removeClass(Al.activeClasses);
Al.activeClasses=null
}}function AG(Al,An){var Am=An?"-"+An+"s":"";
I(Al,[AK,Am]);
return[AK,Am]
}function p(Am,Ao){var An=Ao?"paused":"";
var Al=AZ+A;
I(Am,[Al,An]);
return[Al,An]
}function I(Am,Al){var Ao=Al[0];
var An=Al[1];
Am.style[Ao]=An
}function AE(Am,Al){if(!Am){return Al
}if(!Al){return Am
}return Am+" "+Al
}function a(){this.$get=["$document",function(Al){return q(Al[0].body)
}]
}var Ab=["$$rAF",function(Ao){var Al,An;
function Am(Aq){Al=Al.concat(Aq);
Ap()
}Al=Am.queue=[];
Am.waitUntilQuiet=function(Aq){if(An){An()
}An=Ao(function(){An=null;
Aq();
Ap()
})
};
return Am;
function Ap(){if(!Al.length){return 
}var Aq=Al.shift();
for(var Ar=0;
Ar<Aq.length;
Ar++){Aq[Ar]()
}if(!An){Ao(function(){if(!An){Ap()
}})
}}}];
var AV=[function(){return function(An,Am,Al){var Ao=Al.ngAnimateChildren;
if(AH.isString(Ao)&&Ao.length===0){Am.data(Aa,true)
}else{Al.$observe("ngAnimateChildren",function(Ap){Ap=Ap==="on"||Ap==="true";
Am.data(Aa,Ap)
})
}}
}];
var f="$$animateCss";
var AM=1000;
var b=10;
var G=3;
var H=1.5;
var E={transitionDuration:AB,transitionDelay:AK,transitionProperty:M+L,animationDuration:D,animationDelay:AQ,animationIterationCount:AZ+x};
var AT={transitionDuration:AB,transitionDelay:AK,animationDuration:D,animationDelay:AQ};
function AN(Al){return[D,Al+"s"]
}function Z(Am,Al){var An=Al?AQ:AK;
return[An,Am+"s"]
}function Af(Ap,An,Am){var Ao=Object.create(null);
var Al=Ap.getComputedStyle(An)||{};
AL(Am,function(Aq,Ar){var As=Al[Aq];
if(As){var At=As.charAt(0);
if(At==="-"||At==="+"||At>=0){As=AX(As)
}if(As===0){As=null
}Ao[Ar]=As
}});
return Ao
}function AX(An){var Am=0;
var Al=An.split(/\s*,\s*/);
AL(Al,function(Ao){if(Ao.charAt(Ao.length-1)=="s"){Ao=Ao.substring(0,Ao.length-1)
}Ao=parseFloat(Ao)||0;
Am=Am?Math.max(Ao,Am):Ao
});
return Am
}function AC(Al){return Al===0||Al!=null
}function S(Ao,Am){var Al=M;
var An=Ao+"s";
if(Am){Al+=Ad
}else{An+=" linear all"
}return[Al,An]
}function Ak(){var Al=Object.create(null);
return{flush:function(){Al=Object.create(null)
},count:function(Am){var An=Al[Am];
return An?An.total:0
},get:function(Am){var An=Al[Am];
return An&&An.value
},put:function(Am,An){if(!Al[Am]){Al[Am]={total:1,value:An}
}else{Al[Am].total++
}}}
}var d=["$animateProvider",function(An){var Am=Ak();
var Al=Ak();
this.$get=["$window","$$jqLite","$$AnimateRunner","$timeout","$$forceReflow","$sniffer","$$rAFScheduler","$animate",function(Au,Ao,Az,A4,Ap,A3,Ar,A0){var Aw=AF(Ao);
var Av=0;
function Ay(A9,A8){var A7="$$ngAnimateParentKey";
var A6=A9.parentNode;
var BA=A6[A7]||(A6[A7]=++Av);
return BA+"-"+A9.getAttribute("class")+"-"+A8
}function At(A9,A8,BA,A6){var A7=Am.get(BA);
if(!A7){A7=Af(Au,A9,A6);
if(A7.animationIterationCount==="infinite"){A7.animationIterationCount=1
}}Am.put(BA,A7);
return A7
}function A2(A9,A7,BB,A6){var A8;
if(Am.count(BB)>0){A8=Al.get(BB);
if(!A8){var BA=Ag(A7,"-stagger");
Ao.addClass(A9,BA);
A8=Af(Au,A9,A6);
A8.animationDuration=Math.max(A8.animationDuration,0);
A8.transitionDuration=Math.max(A8.transitionDuration,0);
Ao.removeClass(A9,BA);
Al.put(BB,A8)
}}return A8||{}
}var As;
var Aq=[];
function Ax(A6){Aq.push(A6);
Ar.waitUntilQuiet(function(){Am.flush();
Al.flush();
var A7=Ap();
for(var A8=0;
A8<Aq.length;
A8++){Aq[A8](A7)
}Aq.length=0
})
}function A5(A9,A8,BB){var A7=At(A9,A8,BB,E);
var A6=A7.animationDelay;
var BA=A7.transitionDelay;
A7.maxDelay=A6&&BA?Math.max(A6,BA):(A6||BA);
A7.maxDuration=Math.max(A7.animationDuration*A7.animationIterationCount,A7.transitionDuration);
return A7
}return function A1(BJ,BS){var Ba=Y(BJ);
if(!Ba||!Ba.parentNode||!A0.enabled()){return BN()
}BS=n(BS);
var BD=[];
var BE=BJ.attr("class");
var BY=t(BS);
var BH;
var BP;
var BQ;
var A8;
var BI;
var BB;
var Bh;
var Bk;
var BR;
if(BS.duration===0||(!A3.animations&&!A3.transitions)){return BN()
}var Bl=BS.event&&C(BS.event)?BS.event.join(" "):BS.event;
var A7=Bl&&BS.structural;
var BA="";
var BG="";
if(A7){BA=Ag(Bl,R,true)
}else{if(Bl){BA=Bl
}}if(BS.addClass){BG+=Ag(BS.addClass,o)
}if(BS.removeClass){if(BG.length){BG+=" "
}BG+=Ag(BS.removeClass,h)
}if(BS.applyClassesEarly&&BG.length){Aw(BJ,BS)
}var Bj=[BA,BG].join(" ").trim();
var BO=BE+" "+Bj;
var A6=Ag(Bj,m);
var BU=BY.to&&Object.keys(BY.to).length>0;
var BL=(BS.keyframeStyle||"").length>0;
if(!BL&&!BU&&!Bj){return BN()
}var BC,Bi;
if(BS.stagger>0){var Be=parseFloat(BS.stagger);
Bi={transitionDelay:Be,animationDelay:Be,transitionDuration:0,animationDuration:0}
}else{BC=Ay(Ba,BO);
Bi=A2(Ba,Bj,BC,AT)
}if(!BS.$$skipPreparationClasses){Ao.addClass(BJ,Bj)
}var Bf;
if(BS.transitionStyle){var Bc=[M,BS.transitionStyle];
I(Ba,Bc);
BD.push(Bc)
}if(BS.duration>=0){Bf=Ba.style[M].length>0;
var BK=S(BS.duration,Bf);
I(Ba,BK);
BD.push(BK)
}if(BS.keyframeStyle){var BW=[AZ,BS.keyframeStyle];
I(Ba,BW);
BD.push(BW)
}var Bd=Bi?BS.staggerIndex>=0?BS.staggerIndex:Am.count(BC):0;
var BX=Bd===0;
if(BX&&!BS.skipBlocking){AG(Ba,c)
}var BF=A5(Ba,BO,BC);
var A9=BF.maxDelay;
BB=Math.max(A9,0);
Bk=BF.maxDuration;
var BM={};
BM.hasTransitions=BF.transitionDuration>0;
BM.hasAnimations=BF.animationDuration>0;
BM.hasTransitionAll=BM.hasTransitions&&BF.transitionProperty=="all";
BM.applyTransitionDuration=BU&&((BM.hasTransitions&&!BM.hasTransitionAll)||(BM.hasAnimations&&!BM.hasTransitions));
BM.applyAnimationDuration=BS.duration&&BM.hasAnimations;
BM.applyTransitionDelay=AC(BS.delay)&&(BM.applyTransitionDuration||BM.hasTransitions);
BM.applyAnimationDelay=AC(BS.delay)&&BM.hasAnimations;
BM.recalculateTimingStyles=BG.length>0;
if(BM.applyTransitionDuration||BM.applyAnimationDuration){Bk=BS.duration?parseFloat(BS.duration):Bk;
if(BM.applyTransitionDuration){BM.hasTransitions=true;
BF.transitionDuration=Bk;
Bf=Ba.style[M+L].length>0;
BD.push(S(Bk,Bf))
}if(BM.applyAnimationDuration){BM.hasAnimations=true;
BF.animationDuration=Bk;
BD.push(AN(Bk))
}}if(Bk===0&&!BM.recalculateTimingStyles){return BN()
}if(BS.delay!=null){var BV=parseFloat(BS.delay);
if(BM.applyTransitionDelay){BD.push(Z(BV))
}if(BM.applyAnimationDelay){BD.push(Z(BV,true))
}}if(BS.duration==null&&BF.transitionDuration>0){BM.recalculateTimingStyles=BM.recalculateTimingStyles||BX
}Bh=BB*AM;
BR=Bk*AM;
if(!BS.skipBlocking){BM.blockTransition=BF.transitionDuration>0;
BM.blockKeyframeAnimation=BF.animationDuration>0&&Bi.animationDelay>0&&Bi.animationDuration===0
}l(BJ,BS);
if(BM.blockTransition||BM.blockKeyframeAnimation){Bb(Bk)
}else{if(!BS.skipBlocking){AG(Ba,false)
}}return{$$willAnimate:true,end:Bm,start:function(){if(BH){return 
}BI={end:Bm,cancel:BZ,resume:null,pause:null};
A8=new Az(BI);
Ax(BT);
return A8
}};
function Bm(){Bg()
}function BZ(){Bg(true)
}function Bg(Bn){if(BH||(BQ&&BP)){return 
}BH=true;
BP=false;
if(!BS.$$skipPreparationClasses){Ao.removeClass(BJ,Bj)
}Ao.removeClass(BJ,A6);
p(Ba,false);
AG(Ba,false);
AL(BD,function(Bo){Ba.style[Bo[0]]=""
});
Aw(BJ,BS);
X(BJ,BS);
if(BS.onDone){BS.onDone()
}if(A8){A8.complete(!Bn)
}}function Bb(Bn){if(BM.blockTransition){AG(Ba,Bn)
}if(BM.blockKeyframeAnimation){p(Ba,!!Bn)
}}function BN(){A8=new Az({end:Bm,cancel:BZ});
Ax(AJ);
Bg();
return{$$willAnimate:false,start:function(){return A8
},end:Bm}
}function BT(){if(BH){return 
}if(!Ba.parentNode){Bg();
return 
}var Bq,Bp=[];
var Bt=function(Bv){if(!BQ){BP=!Bv;
if(BF.animationDuration){var Bu=p(Ba,BP);
BP?BD.push(Bu):Ah(BD,Bu)
}}else{if(BP&&Bv){BP=false;
Bg()
}}};
var Bo=Bd>0&&((BF.transitionDuration&&Bi.transitionDuration===0)||(BF.animationDuration&&Bi.animationDuration===0))&&Math.max(Bi.animationDelay,Bi.transitionDelay);
if(Bo){A4(Bs,Math.floor(Bo*Bd*AM),false)
}else{Bs()
}BI.resume=function(){Bt(true)
};
BI.pause=function(){Bt(false)
};
function Bs(){if(BH){return 
}Bb(false);
AL(BD,function(B3){var B2=B3[0];
var B4=B3[1];
Ba.style[B2]=B4
});
Aw(BJ,BS);
Ao.addClass(BJ,A6);
if(BM.recalculateTimingStyles){BO=Ba.className+" "+Bj;
BC=Ay(Ba,BO);
BF=A5(Ba,BO,BC);
A9=BF.maxDelay;
BB=Math.max(A9,0);
Bk=BF.maxDuration;
if(Bk===0){Bg();
return 
}BM.hasTransitions=BF.transitionDuration>0;
BM.hasAnimations=BF.animationDuration>0
}if(BM.applyAnimationDelay){A9=typeof BS.delay!=="boolean"&&AC(BS.delay)?parseFloat(BS.delay):A9;
BB=Math.max(A9,0);
BF.animationDelay=A9;
BV=Z(A9,true);
BD.push(BV);
Ba.style[BV[0]]=BV[1]
}Bh=BB*AM;
BR=Bk*AM;
if(BS.easing){var B1,Bu=BS.easing;
if(BM.hasTransitions){B1=M+AP;
BD.push([B1,Bu]);
Ba.style[B1]=Bu
}if(BM.hasAnimations){B1=AZ+AP;
BD.push([B1,Bu]);
Ba.style[B1]=Bu
}}if(BF.transitionDuration){Bp.push(Q)
}if(BF.animationDuration){Bp.push(k)
}Bq=Date.now();
var B0=Bh+H*BR;
var Bv=Bq+B0;
var Bx=BJ.data(f)||[];
var Bw=true;
if(Bx.length){var By=Bx[0];
Bw=Bv>By.expectedEndTime;
if(Bw){A4.cancel(By.timer)
}else{Bx.push(Bg)
}}if(Bw){var Bz=A4(Br,B0,false);
Bx[0]={timer:Bz,expectedEndTime:Bv};
Bx.push(Bg);
BJ.data(f,Bx)
}BJ.on(Bp.join(" "),Bn);
F(BJ,BS)
}function Br(){var Bv=BJ.data(f);
if(Bv){for(var Bu=1;
Bu<Bv.length;
Bu++){Bv[Bu]()
}BJ.removeData(f)
}}function Bn(Bx){Bx.stopPropagation();
var Bw=Bx.originalEvent||Bx;
var Bv=Bw.$manualTimeStamp||Bw.timeStamp||Date.now();
var Bu=parseFloat(Bw.elapsedTime.toFixed(G));
if(Math.max(Bv-Bq,0)>=Bh&&Bu>=Bk){BQ=true;
Bg()
}}}}
}]
}];
var O=["$$animationProvider",function(Ap){Ap.drivers.push("$$animateCssDriver");
var An="ng-animate-shim";
var Ao="ng-anchor";
var Am="ng-anchor-out";
var Al="ng-anchor-in";
this.$get=["$animateCss","$rootScope","$$AnimateRunner","$rootElement","$$body","$sniffer","$$jqLite",function(Av,A2,Ay,A4,Ax,Aq,A6){if(!Aq.animations&&!Aq.transitions){return AJ
}var Aw=Y(Ax);
var As=Y(A4);
var Az=q(Aw.parentNode===As?Aw:As);
var A5=AF(A6);
return function Au(A7){return A7.from&&A7.to?A1(A7.from,A7.to,A7.classes,A7.anchors):A0(A7)
};
function A3(A7){return A7.replace(/\bng-\S+\b/g,"")
}function Ar(A8,A7){if(Ai(A8)){A8=A8.split(" ")
}if(Ai(A7)){A7=A7.split(" ")
}return A8.filter(function(A9){return A7.indexOf(A9)===-1
}).join(" ")
}function At(A9,BE,BC){var BF=q(Y(BE).cloneNode(true));
var BD=A3(BB(BF));
BE.addClass(An);
BC.addClass(An);
BF.addClass(Ao);
Az.append(BF);
var A7,BI=BH();
if(!BI){A7=BJ();
if(!A7){return BA()
}}var BG=BI||A7;
return{start:function(){var BL;
var BM=BG.start();
BM.done(function(){BM=null;
if(!A7){A7=BJ();
if(A7){BM=A7.start();
BM.done(function(){BM=null;
BA();
BL.complete()
});
return BM
}}BA();
BL.complete()
});
BL=new Ay({end:BK,cancel:BK});
return BL;
function BK(){if(BM){BM.end()
}}}};
function A8(BK){var BL={};
var BM=Y(BK).getBoundingClientRect();
AL(["width","height","top","left"],function(BN){var BO=BM[BN];
switch(BN){case"top":BO+=Aw.scrollTop;
break;
case"left":BO+=Aw.scrollLeft;
break
}BL[BN]=Math.floor(BO)+"px"
});
return BL
}function BH(){var BK=Av(BF,{addClass:Am,delay:true,from:A8(BE)});
return BK.$$willAnimate?BK:null
}function BB(BK){return BK.attr("class")||""
}function BJ(){var BN=A3(BB(BC));
var BL=Ar(BN,BD);
var BM=Ar(BD,BN);
var BK=Av(BF,{to:A8(BC),addClass:Al+" "+BL,removeClass:Am+" "+BM,delay:true});
return BK.$$willAnimate?BK:null
}function BA(){BF.remove();
BE.removeClass(An);
BC.removeClass(An)
}}function A1(BD,BC,A9,BA){var A8=A0(BD,AJ);
var A7=A0(BC,AJ);
var BB=[];
AL(BA,function(BG){var BF=BG.out;
var BH=BG["in"];
var BE=At(A9,BF,BH);
if(BE){BB.push(BE)
}});
if(!A8&&!A7&&BB.length===0){return 
}return{start:function(){var BG=[];
if(A8){BG.push(A8.start())
}if(A7){BG.push(A7.start())
}AL(BB,function(BH){BG.push(BH.start())
});
var BF=new Ay({end:BE,cancel:BE});
Ay.all(BG,function(BH){BF.complete(BH)
});
return BF;
function BE(){AL(BG,function(BH){BH.end()
})
}}}
}function A0(A7){var BA=A7.element;
var A9=A7.options||{};
if(A7.structural){A9.event=A7.event;
A9.structural=true;
A9.applyClassesEarly=true;
if(A7.event==="leave"){A9.onDone=A9.domOperation
}}if(A9.preparationClasses){A9.event=AE(A9.event,A9.preparationClasses)
}var A8=Av(BA,A9);
return A8.$$willAnimate?A8:null
}}]
}];
var i=["$animateProvider",function(Al){this.$get=["$injector","$$AnimateRunner","$$jqLite",function(Ap,Aq,An){var Ao=AF(An);
return function(Az,As,Ax,A5){if(arguments.length===3&&T(Ax)){A5=Ax;
Ax=null
}A5=n(A5);
if(!Ax){Ax=Az.attr("class")||"";
if(A5.addClass){Ax+=" "+A5.addClass
}if(A5.removeClass){Ax+=" "+A5.removeClass
}}var Av=A5.addClass;
var A2=A5.removeClass;
var A4=Am(Ax);
var A1,Ar;
if(A4.length){var Au,A3;
if(As=="leave"){A3="leave";
Au="afterLeave"
}else{A3="before"+As.charAt(0).toUpperCase()+As.substr(1);
Au=As
}if(As!=="enter"&&As!=="move"){A1=At(Az,As,A5,A4,A3)
}Ar=At(Az,As,A5,A4,Au)
}if(!A1&&!Ar){return 
}function Aw(){A5.domOperation();
Ao(Az,A5)
}return{start:function(){var A8;
var A6=[];
if(A1){A6.push(function(BC){A8=A1(BC)
})
}if(A6.length){A6.push(function(BC){Aw();
BC(true)
})
}else{Aw()
}if(Ar){A6.push(function(BC){A8=Ar(BC)
})
}var A7=false;
var A9=new Aq({end:function(){BA()
},cancel:function(){BA(true)
}});
Aq.chain(A6,BB);
return A9;
function BB(BC){A7=true;
Aw();
X(Az,A5);
A9.complete(BC)
}function BA(BC){if(!A7){(A8||AJ)(BC);
BB(BC)
}}}};
function A0(A9,A8,BA,A7,BC){var A6;
switch(BA){case"animate":A6=[A8,A7.from,A7.to,BC];
break;
case"setClass":A6=[A8,Av,A2,BC];
break;
case"addClass":A6=[A8,Av,BC];
break;
case"removeClass":A6=[A8,A2,BC];
break;
default:A6=[A8,BC];
break
}A6.push(A7);
var BB=A9.apply(A9,A6);
if(BB){if(AR(BB.start)){BB=BB.start()
}if(BB instanceof Aq){BB.done(BC)
}else{if(AR(BB)){return BB
}}}return AJ
}function Ay(A8,A9,A7,BB,BA){var A6=[];
AL(BB,function(BC){var BD=BC[BA];
if(!BD){return 
}A6.push(function(){var BG;
var BH;
var BF=false;
var BE=function(BI){if(!BF){BF=true;
(BH||AJ)(BI);
BG.complete(!BI)
}};
BG=new Aq({end:function(){BE()
},cancel:function(){BE(true)
}});
BH=A0(BD,A8,A9,A7,function(BI){var BJ=BI===false;
BE(BJ)
});
return BG
})
});
return A6
}function At(A9,A7,BE,BD,A8){var A6=Ay(A9,A7,BE,BD,A8);
if(A6.length===0){var BC,BB;
if(A8==="beforeSetClass"){BC=Ay(A9,"removeClass",BE,BD,"beforeRemoveClass");
BB=Ay(A9,"addClass",BE,BD,"beforeAddClass")
}else{if(A8==="setClass"){BC=Ay(A9,"removeClass",BE,BD,"removeClass");
BB=Ay(A9,"addClass",BE,BD,"addClass")
}}if(BC){A6=A6.concat(BC)
}if(BB){A6=A6.concat(BB)
}}if(A6.length===0){return 
}return function BA(BH){var BF=[];
if(A6.length){AL(A6,function(BI){BF.push(BI())
})
}BF.length?Aq.all(BF,BH):BH();
return function BG(BI){AL(BF,function(BJ){BI?BJ.cancel():BJ.end()
})
}
}
}};
function Am(At){At=C(At)?At:At.split(" ");
var Av=[],Aw={};
for(var As=0;
As<At.length;
As++){var Ar=At[As],Au=Al.$$registeredAnimations[Ar];
if(Au&&!Aw[Ar]){Av.push(Ap.get(Au));
Aw[Ar]=true
}}return Av
}}]
}];
var Ae=["$$animationProvider",function(Al){Al.drivers.push("$$animateJsDriver");
this.$get=["$$animateJs","$$AnimateRunner",function(Am,Ap){return function Ao(Ar){if(Ar.from&&Ar.to){var As=An(Ar.from);
var Aq=An(Ar.to);
if(!As&&!Aq){return 
}return{start:function(){var Aw=[];
if(As){Aw.push(As.start())
}if(Aq){Aw.push(Aq.start())
}Ap.all(Aw,At);
var Av=new Ap({end:Au(),cancel:Au()});
return Av;
function Au(){return function(){AL(Aw,function(Ax){Ax.end()
})
}
}function At(Ax){Av.complete(Ax)
}}}
}else{return An(Ar)
}};
function An(Aq){var At=Aq.element;
var Au=Aq.event;
var Ar=Aq.options;
var As=Aq.classes;
return Am(At,Au,As,Ar)
}}]
}];
var J="data-ng-animate";
var AW="$ngAnimatePin";
var AD=["$animateProvider",function(Ao){var Al=1;
var Ap=2;
var Aq=this.rules={skip:[],cancel:[],join:[]};
function Am(Au,As,At,Ar){return Aq[Au].some(function(Av){return Av(As,At,Ar)
})
}function An(At,Au){At=At||{};
var As=(At.addClass||"").length>0;
var Ar=(At.removeClass||"").length>0;
return Au?As&&Ar:As||Ar
}Aq.join.push(function(As,Ar,At){return !Ar.structural&&An(Ar.options)
});
Aq.skip.push(function(As,Ar,At){return !Ar.structural&&!An(Ar.options)
});
Aq.skip.push(function(As,Ar,At){return At.event=="leave"&&Ar.structural
});
Aq.skip.push(function(As,Ar,At){return At.structural&&At.state===Ap&&!Ar.structural
});
Aq.cancel.push(function(As,Ar,At){return At.structural&&Ar.structural
});
Aq.cancel.push(function(As,Ar,At){return At.state===Ap&&Ar.structural
});
Aq.cancel.push(function(As,Ar,Av){var Au=Ar.options;
var At=Av.options;
return(Au.addClass&&Au.addClass===At.removeClass)||(Au.removeClass&&Au.removeClass===At.addClass)
});
this.$get=["$$rAF","$rootScope","$rootElement","$document","$$body","$$HashMap","$$animation","$$AnimateRunner","$templateRequest","$$jqLite","$$forceReflow",function(Az,A2,Ay,BI,A0,BA,A9,BC,A7,Ar,At){var As=new BA();
var BG=new BA();
var Aw=null;
var BH=A2.$watch(function(){return A7.totalPendingRequests===0
},function(BJ){if(!BJ){return 
}BH();
A2.$$postDigest(function(){A2.$$postDigest(function(){if(Aw===null){Aw=true
}})
})
});
var BB={};
var A1=Ao.classNameFilter();
var A6=!A1?function(){return true
}:function(BJ){return A1.test(BJ)
};
var A8=AF(Ar);
function BF(BK,BJ){return s(BK,BJ,{})
}function Ax(BK,BL){var BN=Y(BK);
var BM=[];
var BJ=BB[BL];
if(BJ){AL(BJ,function(BO){if(BO.node.contains(BN)){BM.push(BO.callback)
}})
}return BM
}function A5(BL,BK,BJ,BM){Az(function(){AL(Ax(BK,BL),function(BN){BN(BK,BJ,BM)
})
})
}return{on:function(BL,BJ,BM){var BK=AO(BJ);
BB[BL]=BB[BL]||[];
BB[BL].push({node:BK,callback:BM})
},off:function(BL,BK,BN){var BJ=BB[BL];
if(!BJ){return 
}BB[BL]=arguments.length===1?null:BM(BJ,BK,BN);
function BM(BQ,BR,BP){var BO=AO(BR);
return BQ.filter(function(BT){var BS=BT.node===BO&&(!BP||BT.callback===BP);
return !BS
})
}},pin:function(BK,BJ){AU(y(BK),"element","not an element");
AU(y(BJ),"parentElement","not an element");
BK.data(AW,BJ)
},push:function(BL,BM,BK,BJ){BK=BK||{};
BK.domOperation=BJ;
return A4(BL,BM,BK)
},enabled:function(BK,BJ){var BO=arguments.length;
if(BO===0){BJ=!!Aw
}else{var BN=y(BK);
if(!BN){BJ=Aw=!!BK
}else{var BL=Y(BK);
var BM=BG.get(BL);
if(BO===1){BJ=!BM
}else{BJ=!!BJ;
if(!BJ){BG.put(BL,true)
}else{if(BM){BG.remove(BL)
}}}}}return BJ
}};
function A4(BL,Ba,BO){var BZ,BS;
BL=j(BL);
if(BL){BZ=Y(BL);
BS=BL.parent()
}BO=n(BO);
var BQ=new BC();
if(C(BO.addClass)){BO.addClass=BO.addClass.join(" ")
}if(BO.addClass&&!Ai(BO.addClass)){BO.addClass=null
}if(C(BO.removeClass)){BO.removeClass=BO.removeClass.join(" ")
}if(BO.removeClass&&!Ai(BO.removeClass)){BO.removeClass=null
}if(BO.from&&!T(BO.from)){BO.from=null
}if(BO.to&&!T(BO.to)){BO.to=null
}if(!BZ){BV();
return BQ
}var BN=[BZ.className,BO.addClass,BO.removeClass].join(" ");
if(!A6(BN)){BV();
return BQ
}var BJ=["enter","move","leave"].indexOf(Ba)>=0;
var BW=!Aw||BG.get(BZ);
var BX=(!BW&&As.get(BZ))||{};
var BM=!!BX.state;
if(!BW&&(!BM||BX.state!=Al)){BW=!Au(BL,BS,Ba)
}if(BW){BV();
return BQ
}if(BJ){BE(BL)
}var BU={structural:BJ,element:BL,event:Ba,close:BV,options:BO,runner:BQ};
if(BM){var BK=Am("skip",BL,BU,BX);
if(BK){if(BX.state===Ap){BV();
return BQ
}else{s(BL,BX.options,BO);
return BX.runner
}}var BR=Am("cancel",BL,BU,BX);
if(BR){if(BX.state===Ap){BX.runner.end()
}else{if(BX.structural){BX.close()
}else{s(BL,BX.options,BU.options);
return BX.runner
}}}else{var BY=Am("join",BL,BU,BX);
if(BY){if(BX.state===Ap){BF(BL,BO)
}else{P(BL,BJ?Ba:null,BO);
Ba=BU.event=BX.event;
BO=s(BL,BX.options,BU.options);
return BX.runner
}}}}else{BF(BL,BO)
}var Bb=BU.structural;
if(!Bb){Bb=(BU.event==="animate"&&Object.keys(BU.options.to||{}).length>0)||An(BU.options)
}if(!Bb){BV();
Av(BL);
return BQ
}var BT=(BX.counter||0)+1;
BU.counter=BT;
A3(BL,Al,BU);
A2.$$postDigest(function(){var Bc=As.get(BZ);
var Bg=!Bc;
Bc=Bc||{};
var Be=BL.parent()||[];
var Bf=Be.length>0&&(Bc.event==="animate"||Bc.structural||An(Bc.options));
if(Bg||Bc.counter!==BT||!Bf){if(Bg){A8(BL,BO);
X(BL,BO)
}if(Bg||(BJ&&Bc.event!==Ba)){BO.domOperation();
BQ.end()
}if(!Bf){Av(BL)
}return 
}Ba=!Bc.structural&&An(Bc.options,true)?"setClass":Bc.event;
A3(BL,Ap);
var Bd=A9(BL,Ba,Bc.options);
Bd.done(function(Bi){BV(!Bi);
var Bh=As.get(BZ);
if(Bh&&Bh.counter===BT){Av(Y(BL))
}BP(BQ,Ba,"close",{})
});
BQ.setHost(Bd);
BP(BQ,Ba,"start",{})
});
return BQ;
function BP(Be,Bd,Bc,Bf){A5(Bd,BL,Bc,Bf);
Be.progress(Bd,Bc,Bf)
}function BV(Bc){AS(BL,BO);
A8(BL,BO);
X(BL,BO);
BO.domOperation();
BQ.complete(!Bc)
}}function BE(BK){var BL=Y(BK);
var BJ=BL.querySelectorAll("["+J+"]");
AL(BJ,function(BO){var BN=parseInt(BO.getAttribute(J));
var BM=As.get(BO);
switch(BN){case Ap:BM.runner.end();
case Al:if(BM){As.remove(BO)
}break
}})
}function Av(BJ){var BK=Y(BJ);
BK.removeAttribute(J);
As.remove(BK)
}function BD(BK,BJ){return Y(BK)===Y(BJ)
}function Au(BO,BT,BK){var BM=BD(BO,A0)||BO[0].nodeName==="HTML";
var BQ=BD(BO,Ay);
var BN=false;
var BU;
var BL=BO.data(AW);
if(BL){BT=BL
}while(BT&&BT.length){if(!BQ){BQ=BD(BT,Ay)
}var BP=BT[0];
if(BP.nodeType!==AI){break
}var BJ=As.get(BP)||{};
if(!BN){BN=BJ.structural||BG.get(BP)
}if(e(BU)||BU===true){var BS=BT.data(Aa);
if(z(BS)){BU=BS
}}if(BN&&BU===false){break
}if(!BQ){BQ=BD(BT,Ay);
if(!BQ){BL=BT.data(AW);
if(BL){BT=BL
}}}if(!BM){BM=BD(BT,A0)
}BT=BT.parent()
}var BR=!BN||BU;
return BR&&BQ&&BM
}function A3(BL,BN,BK){BK=BK||{};
BK.state=BN;
var BM=Y(BL);
BM.setAttribute(J,BN);
var BJ=As.get(BM);
var BO=BJ?u(BJ,BK):BK;
As.put(BM,BO)
}}]
}];
var B=["$$rAF",function(An){var Am=[];
function Al(Ao){Am.push(Ao);
if(Am.length>1){return 
}An(function(){for(var Ap=0;
Ap<Am.length;
Ap++){Am[Ap]()
}Am=[]
})
}return function(){var Ao=false;
Al(function(){Ao=true
});
return function(Ap){Ao?Ap():Al(Ap)
}
}
}];
var Aj=["$q","$sniffer","$$animateAsyncRun",function(An,Ar,Aq){var Al=0;
var Ap=1;
var Ao=2;
Am.chain=function(At,Av){var As=0;
Au();
function Au(){if(As===At.length){Av(true);
return 
}At[As](function(Aw){if(Aw===false){Av(false);
return 
}As++;
Au()
})
}};
Am.all=function(At,Aw){var Au=0;
var As=true;
AL(At,function(Ax){Ax.done(Av)
});
function Av(Ax){As=As&&Ax;
if(++Au===At.length){Aw(As)
}}};
function Am(As){this.setHost(As);
this._doneCallbacks=[];
this._runInAnimationFrame=Aq();
this._state=0
}Am.prototype={setHost:function(As){this.host=As||{}
},done:function(As){if(this._state===Ao){As()
}else{this._doneCallbacks.push(As)
}},progress:AJ,getPromise:function(){if(!this.promise){var As=this;
this.promise=An(function(Au,At){As.done(function(Av){Av===false?At():Au()
})
})
}return this.promise
},then:function(As,At){return this.getPromise().then(As,At)
},"catch":function(As){return this.getPromise()["catch"](As)
},"finally":function(As){return this.getPromise()["finally"](As)
},pause:function(){if(this.host.pause){this.host.pause()
}},resume:function(){if(this.host.resume){this.host.resume()
}},end:function(){if(this.host.end){this.host.end()
}this._resolve(true)
},cancel:function(){if(this.host.cancel){this.host.cancel()
}this._resolve(false)
},complete:function(At){var As=this;
if(As._state===Al){As._state=Ap;
As._runInAnimationFrame(function(){As._resolve(At)
})
}},_resolve:function(As){if(this._state!==Ao){AL(this._doneCallbacks,function(At){At(As)
});
this._doneCallbacks.length=0;
this._state=Ao
}}};
return Am
}];
var V=["$animateProvider",function(Ap){var An="ng-animate-ref";
var Al=this.drivers=[];
var Am="$$animationRunner";
function Aq(As,At){As.data(Am,At)
}function Ar(As){As.removeData(Am)
}function Ao(As){return As.data(Am)
}this.$get=["$$jqLite","$rootScope","$injector","$$AnimateRunner","$$HashMap","$$rAFScheduler",function(A0,Ax,Ay,Av,As,At){var Aw=[];
var Az=AF(A0);
function Au(A7){var A1={children:[]};
var A2,A4=new As();
for(A2=0;
A2<A7.length;
A2++){var A3=A7[A2];
A4.put(A3.domNode,A7[A2]={domNode:A3.domNode,fn:A3.fn,children:[]})
}for(A2=0;
A2<A7.length;
A2++){A5(A7[A2])
}return A6(A1);
function A5(BB){if(BB.processed){return BB
}BB.processed=true;
var A9=BB.domNode;
var A8=A9.parentNode;
A4.put(A9,BB);
var BA;
while(A8){BA=A4.get(A8);
if(BA){if(!BA.processed){BA=A5(BA)
}break
}A8=A8.parentNode
}(BA||A1).children.push(BB);
return BB
}function A6(BB){var BA=[];
var A9=[];
var BC;
for(BC=0;
BC<BB.children.length;
BC++){A9.push(BB.children[BC])
}var A8=A9.length;
var BE=0;
var BF=[];
for(BC=0;
BC<A9.length;
BC++){var BD=A9[BC];
if(A8<=0){A8=BE;
BE=0;
BA.push(BF);
BF=[]
}BF.push(BD.fn);
BD.children.forEach(function(BG){BE++;
A9.push(BG)
});
A8--
}if(BF.length){BA.push(BF)
}return BA
}}return function(A7,A2,BF){BF=n(BF);
var A6=["enter","move","leave"].indexOf(A2)>=0;
var BC=new Av({end:function(){BD()
},cancel:function(){BD(true)
}});
if(!Al.length){BD();
return BC
}Aq(A7,BC);
var A5=r(A7.attr("class"),r(BF.addClass,BF.removeClass));
var A4=BF.tempClasses;
if(A4){A5+=" "+A4;
BF.tempClasses=null
}Aw.push({element:A7,classes:A5,event:A2,structural:A6,options:BF,beforeStart:BB,close:BD});
A7.on("$destroy",A9);
if(Aw.length>1){return BC
}Ax.$$postDigest(function(){var BI=[];
AL(Aw,function(BJ){if(Ao(BJ.element)){BI.push(BJ)
}else{BJ.close()
}});
Aw.length=0;
var BG=A1(BI);
var BH=[];
AL(BG,function(BJ){BH.push({domNode:Y(BJ.from?BJ.from.element:BJ.element),fn:function BK(){BJ.beforeStart();
var BN,BP=BJ.close;
var BM=BJ.anchors?(BJ.from.element||BJ.to.element):BJ.element;
if(Ao(BM)){var BL=BA(BJ);
if(BL){BN=BL.start
}}if(!BN){BP()
}else{var BO=BN();
BO.done(function(BQ){BP(!BQ)
});
A8(BJ,BO)
}}})
});
At(Au(BH))
});
return BC;
function BE(BI){var BJ="["+An+"]";
var BG=BI.hasAttribute(An)?[BI]:BI.querySelectorAll(BJ);
var BH=[];
AL(BG,function(BL){var BK=BL.getAttribute(An);
if(BK&&BK.length){BH.push(BL)
}});
return BH
}function A1(BK){var BJ=[];
var BH={};
AL(BK,function(BQ,BM){var BN=BQ.element;
var BP=Y(BN);
var BO=BQ.event;
var BL=["enter","move"].indexOf(BO)>=0;
var BS=BQ.structural?BE(BP):[];
if(BS.length){var BR=BL?"to":"from";
AL(BS,function(BT){var BU=BT.getAttribute(An);
BH[BU]=BH[BU]||{};
BH[BU][BR]={animationID:BM,element:q(BT)}
})
}else{BJ.push(BQ)
}});
var BG={};
var BI={};
AL(BH,function(BL,BU){var BQ=BL.from;
var BR=BL.to;
if(!BQ||!BR){var BP=BQ?BQ.animationID:BR.animationID;
var BO=BP.toString();
if(!BG[BO]){BG[BO]=true;
BJ.push(BK[BP])
}return 
}var BM=BK[BQ.animationID];
var BS=BK[BR.animationID];
var BN=BQ.animationID.toString();
if(!BI[BN]){var BT=BI[BN]={structural:true,beforeStart:function(){BM.beforeStart();
BS.beforeStart()
},close:function(){BM.close();
BS.close()
},classes:A3(BM.classes,BS.classes),from:BM,to:BS,anchors:[]};
if(BT.classes.length){BJ.push(BT)
}else{BJ.push(BM);
BJ.push(BS)
}}BI[BN].anchors.push({out:BQ.element,"in":BR.element})
});
return BJ
}function A3(BH,BG){BH=BH.split(" ");
BG=BG.split(" ");
var BK=[];
for(var BJ=0;
BJ<BH.length;
BJ++){var BL=BH[BJ];
if(BL.substring(0,3)==="ng-"){continue
}for(var BI=0;
BI<BG.length;
BI++){if(BL===BG[BI]){BK.push(BL);
break
}}}return BK.join(" ")
}function BA(BG){for(var BJ=Al.length-1;
BJ>=0;
BJ--){var BI=Al[BJ];
if(!Ay.has(BI)){continue
}var BH=Ay.get(BI);
var BK=BH(BG);
if(BK){return BK
}}}function BB(){A7.addClass(K);
if(A4){A0.addClass(A7,A4)
}}function A8(BH,BG){if(BH.from&&BH.to){BI(BH.from.element);
BI(BH.to.element)
}else{BI(BH.element)
}function BI(BJ){Ao(BJ).setHost(BG)
}}function A9(){var BG=Ao(A7);
if(BG&&(A2!=="leave"||!BF.$$domOperationFired)){BG.end()
}}function BD(BG){A7.off("$destroy",A9);
Ar(A7);
Az(A7,BF);
X(A7,BF);
BF.domOperation();
if(A4){A0.removeClass(A7,A4)
}A7.removeClass(K);
BC.complete(!BG)
}}
}]
}];
AH.module("ngAnimate",[]).provider("$$body",a).directive("ngAnimateChildren",AV).factory("$$rAFScheduler",Ab).factory("$$AnimateRunner",Aj).factory("$$animateAsyncRun",B).provider("$$animateQueue",AD).provider("$$animation",V).provider("$animateCss",d).provider("$$animateCssDriver",O).provider("$$animateJs",i).provider("$$animateJsDriver",Ae)
})(window,window.angular);