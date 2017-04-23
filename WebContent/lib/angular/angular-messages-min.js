(function(E,D,H){var C=D.isArray;
var G=D.forEach;
var A=D.isString;
var B=D.element;
D.module("ngMessages",[]).directive("ngMessages",["$animate",function(M){var I="ng-active";
var L="ng-inactive";
return{require:"ngMessages",restrict:"AE",controller:["$element","$scope","$attrs",function(V,U,T){var N=this;
var W=0;
var Q=this.messages={};
var P,O;
this.render=function(a){a=a||{};
P=false;
O=a;
var g=J(U,T.ngMessagesMultiple)||J(U,T.multiple);
var Y=[];
var b={};
var c=N.head;
var Z=false;
var f=0;
while(c!=null){f++;
var e=c.message;
var d=false;
if(!Z){G(a,function(i,h){if(!d&&K(i)&&e.test(h)){if(b[h]){return 
}b[h]=true;
d=true;
e.attach()
}})
}if(d){Z=!g
}else{Y.push(e)
}c=c.next
}G(Y,function(h){h.detach()
});
Y.length!==f?M.setClass(V,I,L):M.setClass(V,L,I)
};
U.$watchCollection(T.ngMessages||T["for"],N.render);
this.reRender=function(){if(!P){P=true;
U.$evalAsync(function(){if(P){O&&N.render(O)
}})
}};
this.register=function(a,Z){var Y=W.toString();
Q[Y]={message:Z};
R(V[0],a,Y);
a.$$ngMessageNode=Y;
W++;
N.reRender()
};
this.deregister=function(Z){var Y=Z.$$ngMessageNode;
delete Z.$$ngMessageNode;
S(V[0],Z,Y);
delete Q[Y];
N.reRender()
};
function X(b,c){var Z=c;
var Y=[];
while(Z&&Z!==b){var a=Z.$$ngMessageNode;
if(a&&a.length){return Q[a]
}if(Z.childNodes.length&&Y.indexOf(Z)==-1){Y.push(Z);
Z=Z.childNodes[Z.childNodes.length-1]
}else{Z=Z.previousSibling||Z.parentNode
}}}function R(b,c,Z){var a=Q[Z];
if(!N.head){N.head=a
}else{var Y=X(b,c);
if(Y){a.next=Y.next;
Y.next=a
}else{a.next=N.head;
N.head=a
}}}function S(b,c,Z){var a=Q[Z];
var Y=X(b,c);
if(Y){Y.next=a.next
}else{N.head=a.next
}}}]};
function J(O,N){return(A(N)&&N.length===0)||K(O.$eval(N))
}function K(N){return A(N)?N.length:!!N
}}]).directive("ngMessagesInclude",["$templateRequest","$document","$compile",function(I,K,J){return{restrict:"AE",require:"^^ngMessages",link:function(L,N,M){var O=M.ngMessagesInclude||M.src;
I(O).then(function(P){J(P)(L,function(R){N.after(R);
var Q=B(K[0].createComment(" ngMessagesInclude: "+O+" "));
N.after(Q);
N.remove()
})
})
}}
}]).directive("ngMessage",F("AE")).directive("ngMessageExp",F("A"));
function F(I){return["$animate",function(K){return{restrict:"AE",transclude:"element",terminal:true,require:"^^ngMessages",link:function(W,P,V,Q,T){var M=P[0];
var N;
var S=V.ngMessage||V.when;
var L=V.ngMessageExp||V.whenExp;
var O=function(X){N=X?(C(X)?X:X.split(/[\s,]+/)):null;
Q.reRender()
};
if(L){O(W.$eval(L));
W.$watchCollection(L,O)
}else{O(S)
}var R,U;
Q.register(M,U={test:function(X){return J(N,X)
},attach:function(){if(!R){T(W,function(X){K.enter(X,null,P);
R=X;
R.on("$destroy",function(){if(R){Q.deregister(M);
U.detach()
}})
})
}},detach:function(){if(R){var X=R;
R=null;
K.leave(X)
}}})
}}
}];
function J(L,K){if(L){return C(L)?L.indexOf(K)>=0:L.hasOwnProperty(K)
}}}})(window,window.angular);