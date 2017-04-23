(function(P,U,J){var S=U.$$minErr("$sanitize");
function K(){this.$get=["$$sanitizeUri",function(j){return function(l){var k=[];
N(l,Z(k,function(m,n){return !/^unsafe/.test(j(m,n))
}));
return k.join("")
}
}]
}function F(k){var j=[];
var l=Z(j,U.noop);
l.chars(k);
return j.join("")
}var H=/^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,D=/^<\/\s*([\w:-]+)[^>]*>/,i=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,T=/^</,Q=/^<\//,Y=/<!--(.*?)-->/g,g=/<!DOCTYPE([^>]*?)>/i,h=/<!\[CDATA\[(.*?)]]>/g,c=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,M=/([^\#-~| |!])/g;
var W=X("area,br,col,hr,img,wbr");
var O=X("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),C=X("rp,rt"),G=U.extend({},C,O);
var E=U.extend({},O,X("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul"));
var V=U.extend({},C,X("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var"));
var f=X("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan,use");
var I=X("script,style");
var R=U.extend({},W,E,V,G,f);
var L=X("background,cite,href,longdesc,src,usemap,xlink:href");
var A=X("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width");
var e=X("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan",true);
var b=U.extend({},L,e,A);
function X(n,m){var l={},j=n.split(","),k;
for(k=0;
k<j.length;
k++){l[m?U.lowercase(j[k]):j[k]]=true
}return l
}function N(k,s){if(typeof k!=="string"){if(k===null||typeof k==="undefined"){k=""
}else{k=""+k
}}var n,o,l,p=[],q=k,r;
p.last=function(){return p[p.length-1]
};
while(k){r="";
o=true;
if(!p.last()||!I[p.last()]){if(k.indexOf("<!--")===0){n=k.indexOf("--",4);
if(n>=0&&k.lastIndexOf("-->",n)===n){if(s.comment){s.comment(k.substring(4,n))
}k=k.substring(n+3);
o=false
}}else{if(g.test(k)){l=k.match(g);
if(l){k=k.replace(l[0],"");
o=false
}}else{if(Q.test(k)){l=k.match(D);
if(l){k=k.substring(l[0].length);
l[0].replace(D,m);
o=false
}}else{if(T.test(k)){l=k.match(H);
if(l){if(l[4]){k=k.substring(l[0].length);
l[0].replace(H,j)
}o=false
}else{r+="<";
k=k.substring(1)
}}}}}if(o){n=k.indexOf("<");
r+=n<0?k:k.substring(0,n);
k=n<0?"":k.substring(n);
if(s.chars){s.chars(B(r))
}}}else{k=k.replace(new RegExp("([\\W\\w]*)<\\s*\\/\\s*"+p.last()+"[^>]*>","i"),function(t,u){u=u.replace(Y,"$1").replace(h,"$1");
if(s.chars){s.chars(B(u))
}return""
});
m("",p.last())
}if(k==q){throw S("badparse","The sanitizer was unable to parse the following block of html: {0}",k)
}q=k
}m();
function j(t,w,x,u){w=U.lowercase(w);
if(E[w]){while(p.last()&&V[p.last()]){m("",p.last())
}}if(G[w]&&p.last()==w){m("",w)
}u=W[w]||!!u;
if(!u){p.push(w)
}var v={};
x.replace(i,function(AB,AA,z,AD,y){var AC=z||AD||y||"";
v[AA]=B(AC)
});
if(s.start){s.start(w,v,u)
}}function m(t,v){var w=0,u;
v=U.lowercase(v);
if(v){for(w=p.length-1;
w>=0;
w--){if(p[w]==v){break
}}}if(w>=0){for(u=p.length-1;
u>=w;
u--){if(s.end){s.end(p[u])
}}p.length=w
}}}var d=document.createElement("pre");
function B(j){if(!j){return""
}d.innerHTML=j.replace(/</g,"&lt;");
return d.textContent
}function a(j){return j.replace(/&/g,"&amp;").replace(c,function(m){var l=m.charCodeAt(0);
var k=m.charCodeAt(1);
return"&#"+(((l-55296)*1024)+(k-56320)+65536)+";"
}).replace(M,function(k){return"&#"+k.charCodeAt(0)+";"
}).replace(/</g,"&lt;").replace(/>/g,"&gt;")
}function Z(k,l){var m=false;
var j=U.bind(k,k.push);
return{start:function(n,p,o){n=U.lowercase(n);
if(!m&&I[n]){m=n
}if(!m&&R[n]===true){j("<");
j(n);
U.forEach(p,function(r,q){var t=U.lowercase(q);
var s=(n==="img"&&t==="src")||(t==="background");
if(b[t]===true&&(L[t]!==true||l(r,s))){j(" ");
j(q);
j('="');
j(a(r));
j('"')
}});
j(o?"/>":">")
}},end:function(n){n=U.lowercase(n);
if(!m&&R[n]===true){j("</");
j(n);
j(">")
}if(n==m){m=false
}},chars:function(n){if(!m){j(a(n))
}}}
}U.module("ngSanitize",[]).provider("$sanitize",K);
U.module("ngSanitize").filter("linky",["$sanitize",function(l){var j=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,k=/^mailto:/i;
return function(u,q){if(!u){return u
}var p;
var s=u;
var o=[];
var m;
var n;
while((p=s.match(j))){m=p[0];
if(!p[2]&&!p[4]){m=(p[3]?"http://":"mailto:")+m
}n=p.index;
t(s.substr(0,n));
r(m,p[0].replace(k,""));
s=s.substring(n+p[0].length)
}t(s);
return l(o.join(""));
function t(v){if(!v){return 
}o.push(F(v))
}function r(v,w){o.push("<a ");
if(U.isDefined(q)){o.push('target="',q,'" ')
}o.push('href="',v.replace(/"/g,"&quot;"),'">');
t(w);
o.push("</a>")
}}
}])
})(window,window.angular);