(function(A){if(typeof define==="function"&&define.amd){define(["jquery"],A)
}else{A(jQuery)
}}(function($){$.ui=$.ui||{};
var version=$.ui.version="1.12.0";
var widgetUuid=0;
var widgetSlice=Array.prototype.slice;
$.cleanData=(function(orig){return function(elems){var events,elem,i;
for(i=0;
(elem=elems[i])!=null;
i++){try{events=$._data(elem,"events");
if(events&&events.remove){$(elem).triggerHandler("remove")
}}catch(e){}}orig(elems)
}
})($.cleanData);
$.widget=function(name,base,prototype){var existingConstructor,constructor,basePrototype;
var proxiedPrototype={};
var namespace=name.split(".")[0];
name=name.split(".")[1];
var fullName=namespace+"-"+name;
if(!prototype){prototype=base;
base=$.Widget
}if($.isArray(prototype)){prototype=$.extend.apply(null,[{}].concat(prototype))
}$.expr[":"][fullName.toLowerCase()]=function(elem){return !!$.data(elem,fullName)
};
$[namespace]=$[namespace]||{};
existingConstructor=$[namespace][name];
constructor=$[namespace][name]=function(options,element){if(!this._createWidget){return new constructor(options,element)
}if(arguments.length){this._createWidget(options,element)
}};
$.extend(constructor,existingConstructor,{version:prototype.version,_proto:$.extend({},prototype),_childConstructors:[]});
basePrototype=new base();
basePrototype.options=$.widget.extend({},basePrototype.options);
$.each(prototype,function(prop,value){if(!$.isFunction(value)){proxiedPrototype[prop]=value;
return 
}proxiedPrototype[prop]=(function(){function _super(){return base.prototype[prop].apply(this,arguments)
}function _superApply(args){return base.prototype[prop].apply(this,args)
}return function(){var __super=this._super;
var __superApply=this._superApply;
var returnValue;
this._super=_super;
this._superApply=_superApply;
returnValue=value.apply(this,arguments);
this._super=__super;
this._superApply=__superApply;
return returnValue
}
})()
});
constructor.prototype=$.widget.extend(basePrototype,{widgetEventPrefix:existingConstructor?(basePrototype.widgetEventPrefix||name):name},proxiedPrototype,{constructor:constructor,namespace:namespace,widgetName:name,widgetFullName:fullName});
if(existingConstructor){$.each(existingConstructor._childConstructors,function(i,child){var childPrototype=child.prototype;
$.widget(childPrototype.namespace+"."+childPrototype.widgetName,constructor,child._proto)
});
delete existingConstructor._childConstructors
}else{base._childConstructors.push(constructor)
}$.widget.bridge(name,constructor);
return constructor
};
$.widget.extend=function(target){var input=widgetSlice.call(arguments,1);
var inputIndex=0;
var inputLength=input.length;
var key;
var value;
for(;
inputIndex<inputLength;
inputIndex++){for(key in input[inputIndex]){value=input[inputIndex][key];
if(input[inputIndex].hasOwnProperty(key)&&value!==undefined){if($.isPlainObject(value)){target[key]=$.isPlainObject(target[key])?$.widget.extend({},target[key],value):$.widget.extend({},value)
}else{target[key]=value
}}}}return target
};
$.widget.bridge=function(name,object){var fullName=object.prototype.widgetFullName||name;
$.fn[name]=function(options){var isMethodCall=typeof options==="string";
var args=widgetSlice.call(arguments,1);
var returnValue=this;
if(isMethodCall){this.each(function(){var methodValue;
var instance=$.data(this,fullName);
if(options==="instance"){returnValue=instance;
return false
}if(!instance){return $.error("cannot call methods on "+name+" prior to initialization; attempted to call method '"+options+"'")
}if(!$.isFunction(instance[options])||options.charAt(0)==="_"){return $.error("no such method '"+options+"' for "+name+" widget instance")
}methodValue=instance[options].apply(instance,args);
if(methodValue!==instance&&methodValue!==undefined){returnValue=methodValue&&methodValue.jquery?returnValue.pushStack(methodValue.get()):methodValue;
return false
}})
}else{if(args.length){options=$.widget.extend.apply(null,[options].concat(args))
}this.each(function(){var instance=$.data(this,fullName);
if(instance){instance.option(options||{});
if(instance._init){instance._init()
}}else{$.data(this,fullName,new object(options,this))
}})
}return returnValue
}
};
$.Widget=function(){};
$.Widget._childConstructors=[];
$.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:false,create:null},_createWidget:function(options,element){element=$(element||this.defaultElement||this)[0];
this.element=$(element);
this.uuid=widgetUuid++;
this.eventNamespace="."+this.widgetName+this.uuid;
this.bindings=$();
this.hoverable=$();
this.focusable=$();
this.classesElementLookup={};
if(element!==this){$.data(element,this.widgetFullName,this);
this._on(true,this.element,{remove:function(event){if(event.target===element){this.destroy()
}}});
this.document=$(element.style?element.ownerDocument:element.document||element);
this.window=$(this.document[0].defaultView||this.document[0].parentWindow)
}this.options=$.widget.extend({},this.options,this._getCreateOptions(),options);
this._create();
if(this.options.disabled){this._setOptionDisabled(this.options.disabled)
}this._trigger("create",null,this._getCreateEventData());
this._init()
},_getCreateOptions:function(){return{}
},_getCreateEventData:$.noop,_create:$.noop,_init:$.noop,destroy:function(){var that=this;
this._destroy();
$.each(this.classesElementLookup,function(key,value){that._removeClass(value,key)
});
this.element.off(this.eventNamespace).removeData(this.widgetFullName);
this.widget().off(this.eventNamespace).removeAttr("aria-disabled");
this.bindings.off(this.eventNamespace)
},_destroy:$.noop,widget:function(){return this.element
},option:function(key,value){var options=key;
var parts;
var curOption;
var i;
if(arguments.length===0){return $.widget.extend({},this.options)
}if(typeof key==="string"){options={};
parts=key.split(".");
key=parts.shift();
if(parts.length){curOption=options[key]=$.widget.extend({},this.options[key]);
for(i=0;
i<parts.length-1;
i++){curOption[parts[i]]=curOption[parts[i]]||{};
curOption=curOption[parts[i]]
}key=parts.pop();
if(arguments.length===1){return curOption[key]===undefined?null:curOption[key]
}curOption[key]=value
}else{if(arguments.length===1){return this.options[key]===undefined?null:this.options[key]
}options[key]=value
}}this._setOptions(options);
return this
},_setOptions:function(options){var key;
for(key in options){this._setOption(key,options[key])
}return this
},_setOption:function(key,value){if(key==="classes"){this._setOptionClasses(value)
}this.options[key]=value;
if(key==="disabled"){this._setOptionDisabled(value)
}return this
},_setOptionClasses:function(value){var classKey,elements,currentElements;
for(classKey in value){currentElements=this.classesElementLookup[classKey];
if(value[classKey]===this.options.classes[classKey]||!currentElements||!currentElements.length){continue
}elements=$(currentElements.get());
this._removeClass(currentElements,classKey);
elements.addClass(this._classes({element:elements,keys:classKey,classes:value,add:true}))
}},_setOptionDisabled:function(value){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!value);
if(value){this._removeClass(this.hoverable,null,"ui-state-hover");
this._removeClass(this.focusable,null,"ui-state-focus")
}},enable:function(){return this._setOptions({disabled:false})
},disable:function(){return this._setOptions({disabled:true})
},_classes:function(options){var full=[];
var that=this;
options=$.extend({element:this.element,classes:this.options.classes||{}},options);
function processClassString(classes,checkOption){var current,i;
for(i=0;
i<classes.length;
i++){current=that.classesElementLookup[classes[i]]||$();
if(options.add){current=$($.unique(current.get().concat(options.element.get())))
}else{current=$(current.not(options.element).get())
}that.classesElementLookup[classes[i]]=current;
full.push(classes[i]);
if(checkOption&&options.classes[classes[i]]){full.push(options.classes[classes[i]])
}}}if(options.keys){processClassString(options.keys.match(/\S+/g)||[],true)
}if(options.extra){processClassString(options.extra.match(/\S+/g)||[])
}return full.join(" ")
},_removeClass:function(element,keys,extra){return this._toggleClass(element,keys,extra,false)
},_addClass:function(element,keys,extra){return this._toggleClass(element,keys,extra,true)
},_toggleClass:function(element,keys,extra,add){add=(typeof add==="boolean")?add:extra;
var shift=(typeof element==="string"||element===null),options={extra:shift?keys:extra,keys:shift?element:keys,element:shift?this.element:element,add:add};
options.element.toggleClass(this._classes(options),add);
return this
},_on:function(suppressDisabledCheck,element,handlers){var delegateElement;
var instance=this;
if(typeof suppressDisabledCheck!=="boolean"){handlers=element;
element=suppressDisabledCheck;
suppressDisabledCheck=false
}if(!handlers){handlers=element;
element=this.element;
delegateElement=this.widget()
}else{element=delegateElement=$(element);
this.bindings=this.bindings.add(element)
}$.each(handlers,function(event,handler){function handlerProxy(){if(!suppressDisabledCheck&&(instance.options.disabled===true||$(this).hasClass("ui-state-disabled"))){return 
}return(typeof handler==="string"?instance[handler]:handler).apply(instance,arguments)
}if(typeof handler!=="string"){handlerProxy.guid=handler.guid=handler.guid||handlerProxy.guid||$.guid++
}var match=event.match(/^([\w:-]*)\s*(.*)$/);
var eventName=match[1]+instance.eventNamespace;
var selector=match[2];
if(selector){delegateElement.on(eventName,selector,handlerProxy)
}else{element.on(eventName,handlerProxy)
}})
},_off:function(element,eventName){eventName=(eventName||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace;
element.off(eventName).off(eventName);
this.bindings=$(this.bindings.not(element).get());
this.focusable=$(this.focusable.not(element).get());
this.hoverable=$(this.hoverable.not(element).get())
},_delay:function(handler,delay){function handlerProxy(){return(typeof handler==="string"?instance[handler]:handler).apply(instance,arguments)
}var instance=this;
return setTimeout(handlerProxy,delay||0)
},_hoverable:function(element){this.hoverable=this.hoverable.add(element);
this._on(element,{mouseenter:function(event){this._addClass($(event.currentTarget),null,"ui-state-hover")
},mouseleave:function(event){this._removeClass($(event.currentTarget),null,"ui-state-hover")
}})
},_focusable:function(element){this.focusable=this.focusable.add(element);
this._on(element,{focusin:function(event){this._addClass($(event.currentTarget),null,"ui-state-focus")
},focusout:function(event){this._removeClass($(event.currentTarget),null,"ui-state-focus")
}})
},_trigger:function(type,event,data){var prop,orig;
var callback=this.options[type];
data=data||{};
event=$.Event(event);
event.type=(type===this.widgetEventPrefix?type:this.widgetEventPrefix+type).toLowerCase();
event.target=this.element[0];
orig=event.originalEvent;
if(orig){for(prop in orig){if(!(prop in event)){event[prop]=orig[prop]
}}}this.element.trigger(event,data);
return !($.isFunction(callback)&&callback.apply(this.element[0],[event].concat(data))===false||event.isDefaultPrevented())
}};
$.each({show:"fadeIn",hide:"fadeOut"},function(method,defaultEffect){$.Widget.prototype["_"+method]=function(element,options,callback){if(typeof options==="string"){options={effect:options}
}var hasOptions;
var effectName=!options?method:options===true||typeof options==="number"?defaultEffect:options.effect||defaultEffect;
options=options||{};
if(typeof options==="number"){options={duration:options}
}hasOptions=!$.isEmptyObject(options);
options.complete=callback;
if(options.delay){element.delay(options.delay)
}if(hasOptions&&$.effects&&$.effects.effect[effectName]){element[method](options)
}else{if(effectName!==method&&element[effectName]){element[effectName](options.duration,options.easing,callback)
}else{element.queue(function(next){$(this)[method]();
if(callback){callback.call(element[0])
}next()
})
}}}
});
var widget=$.widget;
/*
 * jQuery UI Position 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
(function(){var cachedScrollbarWidth,supportsOffsetFractions,max=Math.max,abs=Math.abs,round=Math.round,rhorizontal=/left|center|right/,rvertical=/top|center|bottom/,roffset=/[\+\-]\d+(\.[\d]+)?%?/,rposition=/^\w+/,rpercent=/%$/,_position=$.fn.position;
supportsOffsetFractions=function(){var element=$("<div>").css("position","absolute").appendTo("body").offset({top:1.5,left:1.5}),support=element.offset().top===1.5;
element.remove();
supportsOffsetFractions=function(){return support
};
return support
};
function getOffsets(offsets,width,height){return[parseFloat(offsets[0])*(rpercent.test(offsets[0])?width/100:1),parseFloat(offsets[1])*(rpercent.test(offsets[1])?height/100:1)]
}function parseCss(element,property){return parseInt($.css(element,property),10)||0
}function getDimensions(elem){var raw=elem[0];
if(raw.nodeType===9){return{width:elem.width(),height:elem.height(),offset:{top:0,left:0}}
}if($.isWindow(raw)){return{width:elem.width(),height:elem.height(),offset:{top:elem.scrollTop(),left:elem.scrollLeft()}}
}if(raw.preventDefault){return{width:0,height:0,offset:{top:raw.pageY,left:raw.pageX}}
}return{width:elem.outerWidth(),height:elem.outerHeight(),offset:elem.offset()}
}$.position={scrollbarWidth:function(){if(cachedScrollbarWidth!==undefined){return cachedScrollbarWidth
}var w1,w2,div=$("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),innerDiv=div.children()[0];
$("body").append(div);
w1=innerDiv.offsetWidth;
div.css("overflow","scroll");
w2=innerDiv.offsetWidth;
if(w1===w2){w2=div[0].clientWidth
}div.remove();
return(cachedScrollbarWidth=w1-w2)
},getScrollInfo:function(within){var overflowX=within.isWindow||within.isDocument?"":within.element.css("overflow-x"),overflowY=within.isWindow||within.isDocument?"":within.element.css("overflow-y"),hasOverflowX=overflowX==="scroll"||(overflowX==="auto"&&within.width<within.element[0].scrollWidth),hasOverflowY=overflowY==="scroll"||(overflowY==="auto"&&within.height<within.element[0].scrollHeight);
return{width:hasOverflowY?$.position.scrollbarWidth():0,height:hasOverflowX?$.position.scrollbarWidth():0}
},getWithinInfo:function(element){var withinElement=$(element||window),isWindow=$.isWindow(withinElement[0]),isDocument=!!withinElement[0]&&withinElement[0].nodeType===9,hasOffset=!isWindow&&!isDocument;
return{element:withinElement,isWindow:isWindow,isDocument:isDocument,offset:hasOffset?$(element).offset():{left:0,top:0},scrollLeft:withinElement.scrollLeft(),scrollTop:withinElement.scrollTop(),width:withinElement.outerWidth(),height:withinElement.outerHeight()}
}};
$.fn.position=function(options){if(!options||!options.of){return _position.apply(this,arguments)
}options=$.extend({},options);
var atOffset,targetWidth,targetHeight,targetOffset,basePosition,dimensions,target=$(options.of),within=$.position.getWithinInfo(options.within),scrollInfo=$.position.getScrollInfo(within),collision=(options.collision||"flip").split(" "),offsets={};
dimensions=getDimensions(target);
if(target[0].preventDefault){options.at="left top"
}targetWidth=dimensions.width;
targetHeight=dimensions.height;
targetOffset=dimensions.offset;
basePosition=$.extend({},targetOffset);
$.each(["my","at"],function(){var pos=(options[this]||"").split(" "),horizontalOffset,verticalOffset;
if(pos.length===1){pos=rhorizontal.test(pos[0])?pos.concat(["center"]):rvertical.test(pos[0])?["center"].concat(pos):["center","center"]
}pos[0]=rhorizontal.test(pos[0])?pos[0]:"center";
pos[1]=rvertical.test(pos[1])?pos[1]:"center";
horizontalOffset=roffset.exec(pos[0]);
verticalOffset=roffset.exec(pos[1]);
offsets[this]=[horizontalOffset?horizontalOffset[0]:0,verticalOffset?verticalOffset[0]:0];
options[this]=[rposition.exec(pos[0])[0],rposition.exec(pos[1])[0]]
});
if(collision.length===1){collision[1]=collision[0]
}if(options.at[0]==="right"){basePosition.left+=targetWidth
}else{if(options.at[0]==="center"){basePosition.left+=targetWidth/2
}}if(options.at[1]==="bottom"){basePosition.top+=targetHeight
}else{if(options.at[1]==="center"){basePosition.top+=targetHeight/2
}}atOffset=getOffsets(offsets.at,targetWidth,targetHeight);
basePosition.left+=atOffset[0];
basePosition.top+=atOffset[1];
return this.each(function(){var collisionPosition,using,elem=$(this),elemWidth=elem.outerWidth(),elemHeight=elem.outerHeight(),marginLeft=parseCss(this,"marginLeft"),marginTop=parseCss(this,"marginTop"),collisionWidth=elemWidth+marginLeft+parseCss(this,"marginRight")+scrollInfo.width,collisionHeight=elemHeight+marginTop+parseCss(this,"marginBottom")+scrollInfo.height,position=$.extend({},basePosition),myOffset=getOffsets(offsets.my,elem.outerWidth(),elem.outerHeight());
if(options.my[0]==="right"){position.left-=elemWidth
}else{if(options.my[0]==="center"){position.left-=elemWidth/2
}}if(options.my[1]==="bottom"){position.top-=elemHeight
}else{if(options.my[1]==="center"){position.top-=elemHeight/2
}}position.left+=myOffset[0];
position.top+=myOffset[1];
if(!supportsOffsetFractions()){position.left=round(position.left);
position.top=round(position.top)
}collisionPosition={marginLeft:marginLeft,marginTop:marginTop};
$.each(["left","top"],function(i,dir){if($.ui.position[collision[i]]){$.ui.position[collision[i]][dir](position,{targetWidth:targetWidth,targetHeight:targetHeight,elemWidth:elemWidth,elemHeight:elemHeight,collisionPosition:collisionPosition,collisionWidth:collisionWidth,collisionHeight:collisionHeight,offset:[atOffset[0]+myOffset[0],atOffset[1]+myOffset[1]],my:options.my,at:options.at,within:within,elem:elem})
}});
if(options.using){using=function(props){var left=targetOffset.left-position.left,right=left+targetWidth-elemWidth,top=targetOffset.top-position.top,bottom=top+targetHeight-elemHeight,feedback={target:{element:target,left:targetOffset.left,top:targetOffset.top,width:targetWidth,height:targetHeight},element:{element:elem,left:position.left,top:position.top,width:elemWidth,height:elemHeight},horizontal:right<0?"left":left>0?"right":"center",vertical:bottom<0?"top":top>0?"bottom":"middle"};
if(targetWidth<elemWidth&&abs(left+right)<targetWidth){feedback.horizontal="center"
}if(targetHeight<elemHeight&&abs(top+bottom)<targetHeight){feedback.vertical="middle"
}if(max(abs(left),abs(right))>max(abs(top),abs(bottom))){feedback.important="horizontal"
}else{feedback.important="vertical"
}options.using.call(this,props,feedback)
}
}elem.offset($.extend(position,{using:using}))
})
};
$.ui.position={fit:{left:function(position,data){var within=data.within,withinOffset=within.isWindow?within.scrollLeft:within.offset.left,outerWidth=within.width,collisionPosLeft=position.left-data.collisionPosition.marginLeft,overLeft=withinOffset-collisionPosLeft,overRight=collisionPosLeft+data.collisionWidth-outerWidth-withinOffset,newOverRight;
if(data.collisionWidth>outerWidth){if(overLeft>0&&overRight<=0){newOverRight=position.left+overLeft+data.collisionWidth-outerWidth-withinOffset;
position.left+=overLeft-newOverRight
}else{if(overRight>0&&overLeft<=0){position.left=withinOffset
}else{if(overLeft>overRight){position.left=withinOffset+outerWidth-data.collisionWidth
}else{position.left=withinOffset
}}}}else{if(overLeft>0){position.left+=overLeft
}else{if(overRight>0){position.left-=overRight
}else{position.left=max(position.left-collisionPosLeft,position.left)
}}}},top:function(position,data){var within=data.within,withinOffset=within.isWindow?within.scrollTop:within.offset.top,outerHeight=data.within.height,collisionPosTop=position.top-data.collisionPosition.marginTop,overTop=withinOffset-collisionPosTop,overBottom=collisionPosTop+data.collisionHeight-outerHeight-withinOffset,newOverBottom;
if(data.collisionHeight>outerHeight){if(overTop>0&&overBottom<=0){newOverBottom=position.top+overTop+data.collisionHeight-outerHeight-withinOffset;
position.top+=overTop-newOverBottom
}else{if(overBottom>0&&overTop<=0){position.top=withinOffset
}else{if(overTop>overBottom){position.top=withinOffset+outerHeight-data.collisionHeight
}else{position.top=withinOffset
}}}}else{if(overTop>0){position.top+=overTop
}else{if(overBottom>0){position.top-=overBottom
}else{position.top=max(position.top-collisionPosTop,position.top)
}}}}},flip:{left:function(position,data){var within=data.within,withinOffset=within.offset.left+within.scrollLeft,outerWidth=within.width,offsetLeft=within.isWindow?within.scrollLeft:within.offset.left,collisionPosLeft=position.left-data.collisionPosition.marginLeft,overLeft=collisionPosLeft-offsetLeft,overRight=collisionPosLeft+data.collisionWidth-outerWidth-offsetLeft,myOffset=data.my[0]==="left"?-data.elemWidth:data.my[0]==="right"?data.elemWidth:0,atOffset=data.at[0]==="left"?data.targetWidth:data.at[0]==="right"?-data.targetWidth:0,offset=-2*data.offset[0],newOverRight,newOverLeft;
if(overLeft<0){newOverRight=position.left+myOffset+atOffset+offset+data.collisionWidth-outerWidth-withinOffset;
if(newOverRight<0||newOverRight<abs(overLeft)){position.left+=myOffset+atOffset+offset
}}else{if(overRight>0){newOverLeft=position.left-data.collisionPosition.marginLeft+myOffset+atOffset+offset-offsetLeft;
if(newOverLeft>0||abs(newOverLeft)<overRight){position.left+=myOffset+atOffset+offset
}}}},top:function(position,data){var within=data.within,withinOffset=within.offset.top+within.scrollTop,outerHeight=within.height,offsetTop=within.isWindow?within.scrollTop:within.offset.top,collisionPosTop=position.top-data.collisionPosition.marginTop,overTop=collisionPosTop-offsetTop,overBottom=collisionPosTop+data.collisionHeight-outerHeight-offsetTop,top=data.my[1]==="top",myOffset=top?-data.elemHeight:data.my[1]==="bottom"?data.elemHeight:0,atOffset=data.at[1]==="top"?data.targetHeight:data.at[1]==="bottom"?-data.targetHeight:0,offset=-2*data.offset[1],newOverTop,newOverBottom;
if(overTop<0){newOverBottom=position.top+myOffset+atOffset+offset+data.collisionHeight-outerHeight-withinOffset;
if(newOverBottom<0||newOverBottom<abs(overTop)){position.top+=myOffset+atOffset+offset
}}else{if(overBottom>0){newOverTop=position.top-data.collisionPosition.marginTop+myOffset+atOffset+offset-offsetTop;
if(newOverTop>0||abs(newOverTop)<overBottom){position.top+=myOffset+atOffset+offset
}}}}},flipfit:{left:function(){$.ui.position.flip.left.apply(this,arguments);
$.ui.position.fit.left.apply(this,arguments)
},top:function(){$.ui.position.flip.top.apply(this,arguments);
$.ui.position.fit.top.apply(this,arguments)
}}}
})();
var position=$.ui.position;
/*
 * jQuery UI Keycode 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var keycode=$.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38};
/*
 * jQuery UI Unique ID 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var uniqueId=$.fn.extend({uniqueId:(function(){var uuid=0;
return function(){return this.each(function(){if(!this.id){this.id="ui-id-"+(++uuid)
}})
}
})(),removeUniqueId:function(){return this.each(function(){if(/^ui-id-\d+$/.test(this.id)){$(this).removeAttr("id")
}})
}});
var safeActiveElement=$.ui.safeActiveElement=function(document){var activeElement;
try{activeElement=document.activeElement
}catch(error){activeElement=document.body
}if(!activeElement){activeElement=document.body
}if(!activeElement.nodeName){activeElement=document.body
}return activeElement
};
/*
 * jQuery UI Menu 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var widgetsMenu=$.widget("ui.menu",{version:"1.12.0",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-caret-1-e"},items:"> *",menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element;
this.mouseHandled=false;
this.element.uniqueId().attr({role:this.options.role,tabIndex:0});
this._addClass("ui-menu","ui-widget ui-widget-content");
this._on({"mousedown .ui-menu-item":function(event){event.preventDefault()
},"click .ui-menu-item":function(event){var target=$(event.target);
var active=$($.ui.safeActiveElement(this.document[0]));
if(!this.mouseHandled&&target.not(".ui-state-disabled").length){this.select(event);
if(!event.isPropagationStopped()){this.mouseHandled=true
}if(target.has(".ui-menu").length){this.expand(event)
}else{if(!this.element.is(":focus")&&active.closest(".ui-menu").length){this.element.trigger("focus",[true]);
if(this.active&&this.active.parents(".ui-menu").length===1){clearTimeout(this.timer)
}}}}},"mouseenter .ui-menu-item":function(event){if(this.previousFilter){return 
}var actualTarget=$(event.target).closest(".ui-menu-item"),target=$(event.currentTarget);
if(actualTarget[0]!==target[0]){return 
}this._removeClass(target.siblings().children(".ui-state-active"),null,"ui-state-active");
this.focus(event,target)
},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(event,keepActiveItem){var item=this.active||this.element.find(this.options.items).eq(0);
if(!keepActiveItem){this.focus(event,item)
}},blur:function(event){this._delay(function(){var notContained=!$.contains(this.element[0],$.ui.safeActiveElement(this.document[0]));
if(notContained){this.collapseAll(event)
}})
},keydown:"_keydown"});
this.refresh();
this._on(this.document,{click:function(event){if(this._closeOnDocumentClick(event)){this.collapseAll(event)
}this.mouseHandled=false
}})
},_destroy:function(){var items=this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),submenus=items.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");
this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show();
submenus.children().each(function(){var elem=$(this);
if(elem.data("ui-menu-submenu-caret")){elem.remove()
}})
},_keydown:function(event){var match,prev,character,skip,preventDefault=true;
switch(event.keyCode){case $.ui.keyCode.PAGE_UP:this.previousPage(event);
break;
case $.ui.keyCode.PAGE_DOWN:this.nextPage(event);
break;
case $.ui.keyCode.HOME:this._move("first","first",event);
break;
case $.ui.keyCode.END:this._move("last","last",event);
break;
case $.ui.keyCode.UP:this.previous(event);
break;
case $.ui.keyCode.DOWN:this.next(event);
break;
case $.ui.keyCode.LEFT:this.collapse(event);
break;
case $.ui.keyCode.RIGHT:if(this.active&&!this.active.is(".ui-state-disabled")){this.expand(event)
}break;
case $.ui.keyCode.ENTER:case $.ui.keyCode.SPACE:this._activate(event);
break;
case $.ui.keyCode.ESCAPE:this.collapse(event);
break;
default:preventDefault=false;
prev=this.previousFilter||"";
character=String.fromCharCode(event.keyCode);
skip=false;
clearTimeout(this.filterTimer);
if(character===prev){skip=true
}else{character=prev+character
}match=this._filterMenuItems(character);
match=skip&&match.index(this.active.next())!==-1?this.active.nextAll(".ui-menu-item"):match;
if(!match.length){character=String.fromCharCode(event.keyCode);
match=this._filterMenuItems(character)
}if(match.length){this.focus(event,match);
this.previousFilter=character;
this.filterTimer=this._delay(function(){delete this.previousFilter
},1000)
}else{delete this.previousFilter
}}if(preventDefault){event.preventDefault()
}},_activate:function(event){if(this.active&&!this.active.is(".ui-state-disabled")){if(this.active.children("[aria-haspopup='true']").length){this.expand(event)
}else{this.select(event)
}}},refresh:function(){var menus,items,newSubmenus,newItems,newWrappers,that=this,icon=this.options.icons.submenu,submenus=this.element.find(this.options.menus);
this._toggleClass("ui-menu-icons",null,!!this.element.find(".ui-icon").length);
newSubmenus=submenus.filter(":not(.ui-menu)").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var menu=$(this),item=menu.prev(),submenuCaret=$("<span>").data("ui-menu-submenu-caret",true);
that._addClass(submenuCaret,"ui-menu-icon","ui-icon "+icon);
item.attr("aria-haspopup","true").prepend(submenuCaret);
menu.attr("aria-labelledby",item.attr("id"))
});
this._addClass(newSubmenus,"ui-menu","ui-widget ui-widget-content ui-front");
menus=submenus.add(this.element);
items=menus.find(this.options.items);
items.not(".ui-menu-item").each(function(){var item=$(this);
if(that._isDivider(item)){that._addClass(item,"ui-menu-divider","ui-widget-content")
}});
newItems=items.not(".ui-menu-item, .ui-menu-divider");
newWrappers=newItems.children().not(".ui-menu").uniqueId().attr({tabIndex:-1,role:this._itemRole()});
this._addClass(newItems,"ui-menu-item")._addClass(newWrappers,"ui-menu-item-wrapper");
items.filter(".ui-state-disabled").attr("aria-disabled","true");
if(this.active&&!$.contains(this.element[0],this.active[0])){this.blur()
}},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]
},_setOption:function(key,value){if(key==="icons"){var icons=this.element.find(".ui-menu-icon");
this._removeClass(icons,null,this.options.icons.submenu)._addClass(icons,null,value.submenu)
}this._super(key,value)
},_setOptionDisabled:function(value){this._super(value);
this.element.attr("aria-disabled",String(value));
this._toggleClass(null,"ui-state-disabled",!!value)
},focus:function(event,item){var nested,focused,activeParent;
this.blur(event,event&&event.type==="focus");
this._scrollIntoView(item);
this.active=item.first();
focused=this.active.children(".ui-menu-item-wrapper");
this._addClass(focused,null,"ui-state-active");
if(this.options.role){this.element.attr("aria-activedescendant",focused.attr("id"))
}activeParent=this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper");
this._addClass(activeParent,null,"ui-state-active");
if(event&&event.type==="keydown"){this._close()
}else{this.timer=this._delay(function(){this._close()
},this.delay)
}nested=item.children(".ui-menu");
if(nested.length&&event&&(/^mouse/.test(event.type))){this._startOpening(nested)
}this.activeMenu=item.parent();
this._trigger("focus",event,{item:item})
},_scrollIntoView:function(item){var borderTop,paddingTop,offset,scroll,elementHeight,itemHeight;
if(this._hasScroll()){borderTop=parseFloat($.css(this.activeMenu[0],"borderTopWidth"))||0;
paddingTop=parseFloat($.css(this.activeMenu[0],"paddingTop"))||0;
offset=item.offset().top-this.activeMenu.offset().top-borderTop-paddingTop;
scroll=this.activeMenu.scrollTop();
elementHeight=this.activeMenu.height();
itemHeight=item.outerHeight();
if(offset<0){this.activeMenu.scrollTop(scroll+offset)
}else{if(offset+itemHeight>elementHeight){this.activeMenu.scrollTop(scroll+offset-elementHeight+itemHeight)
}}}},blur:function(event,fromFocus){if(!fromFocus){clearTimeout(this.timer)
}if(!this.active){return 
}this._removeClass(this.active.children(".ui-menu-item-wrapper"),null,"ui-state-active");
this._trigger("blur",event,{item:this.active});
this.active=null
},_startOpening:function(submenu){clearTimeout(this.timer);
if(submenu.attr("aria-hidden")!=="true"){return 
}this.timer=this._delay(function(){this._close();
this._open(submenu)
},this.delay)
},_open:function(submenu){var position=$.extend({of:this.active},this.options.position);
clearTimeout(this.timer);
this.element.find(".ui-menu").not(submenu.parents(".ui-menu")).hide().attr("aria-hidden","true");
submenu.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(position)
},collapseAll:function(event,all){clearTimeout(this.timer);
this.timer=this._delay(function(){var currentMenu=all?this.element:$(event&&event.target).closest(this.element.find(".ui-menu"));
if(!currentMenu.length){currentMenu=this.element
}this._close(currentMenu);
this.blur(event);
this._removeClass(currentMenu.find(".ui-state-active"),null,"ui-state-active");
this.activeMenu=currentMenu
},this.delay)
},_close:function(startMenu){if(!startMenu){startMenu=this.active?this.active.parent():this.element
}startMenu.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false")
},_closeOnDocumentClick:function(event){return !$(event.target).closest(".ui-menu").length
},_isDivider:function(item){return !/[^\-\u2014\u2013\s]/.test(item.text())
},collapse:function(event){var newItem=this.active&&this.active.parent().closest(".ui-menu-item",this.element);
if(newItem&&newItem.length){this._close();
this.focus(event,newItem)
}},expand:function(event){var newItem=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();
if(newItem&&newItem.length){this._open(newItem.parent());
this._delay(function(){this.focus(event,newItem)
})
}},next:function(event){this._move("next","first",event)
},previous:function(event){this._move("prev","last",event)
},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length
},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length
},_move:function(direction,filter,event){var next;
if(this.active){if(direction==="first"||direction==="last"){next=this.active[direction==="first"?"prevAll":"nextAll"](".ui-menu-item").eq(-1)
}else{next=this.active[direction+"All"](".ui-menu-item").eq(0)
}}if(!next||!next.length||!this.active){next=this.activeMenu.find(this.options.items)[filter]()
}this.focus(event,next)
},nextPage:function(event){var item,base,height;
if(!this.active){this.next(event);
return 
}if(this.isLastItem()){return 
}if(this._hasScroll()){base=this.active.offset().top;
height=this.element.height();
this.active.nextAll(".ui-menu-item").each(function(){item=$(this);
return item.offset().top-base-height<0
});
this.focus(event,item)
}else{this.focus(event,this.activeMenu.find(this.options.items)[!this.active?"first":"last"]())
}},previousPage:function(event){var item,base,height;
if(!this.active){this.next(event);
return 
}if(this.isFirstItem()){return 
}if(this._hasScroll()){base=this.active.offset().top;
height=this.element.height();
this.active.prevAll(".ui-menu-item").each(function(){item=$(this);
return item.offset().top-base+height>0
});
this.focus(event,item)
}else{this.focus(event,this.activeMenu.find(this.options.items).first())
}},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")
},select:function(event){this.active=this.active||$(event.target).closest(".ui-menu-item");
var ui={item:this.active};
if(!this.active.has(".ui-menu").length){this.collapseAll(event,true)
}this._trigger("select",event,ui)
},_filterMenuItems:function(character){var escapedCharacter=character.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),regex=new RegExp("^"+escapedCharacter,"i");
return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return regex.test($.trim($(this).children(".ui-menu-item-wrapper").text()))
})
}});
/*
 * jQuery UI Autocomplete 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
$.widget("ui.autocomplete",{version:"1.12.0",defaultElement:"<input>",options:{appendTo:null,autoFocus:false,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var suppressKeyPress,suppressKeyPressRepeat,suppressInput,nodeName=this.element[0].nodeName.toLowerCase(),isTextarea=nodeName==="textarea",isInput=nodeName==="input";
this.isMultiLine=isTextarea||!isInput&&this._isContentEditable(this.element);
this.valueMethod=this.element[isTextarea||isInput?"val":"text"];
this.isNewMenu=true;
this._addClass("ui-autocomplete-input");
this.element.attr("autocomplete","off");
this._on(this.element,{keydown:function(event){if(this.element.prop("readOnly")){suppressKeyPress=true;
suppressInput=true;
suppressKeyPressRepeat=true;
return 
}suppressKeyPress=false;
suppressInput=false;
suppressKeyPressRepeat=false;
var keyCode=$.ui.keyCode;
switch(event.keyCode){case keyCode.PAGE_UP:suppressKeyPress=true;
this._move("previousPage",event);
break;
case keyCode.PAGE_DOWN:suppressKeyPress=true;
this._move("nextPage",event);
break;
case keyCode.UP:suppressKeyPress=true;
this._keyEvent("previous",event);
break;
case keyCode.DOWN:suppressKeyPress=true;
this._keyEvent("next",event);
break;
case keyCode.ENTER:if(this.menu.active){suppressKeyPress=true;
event.preventDefault();
this.menu.select(event)
}break;
case keyCode.TAB:if(this.menu.active){this.menu.select(event)
}break;
case keyCode.ESCAPE:if(this.menu.element.is(":visible")){if(!this.isMultiLine){this._value(this.term)
}this.close(event);
event.preventDefault()
}break;
default:suppressKeyPressRepeat=true;
this._searchTimeout(event);
break
}},keypress:function(event){if(suppressKeyPress){suppressKeyPress=false;
if(!this.isMultiLine||this.menu.element.is(":visible")){event.preventDefault()
}return 
}if(suppressKeyPressRepeat){return 
}var keyCode=$.ui.keyCode;
switch(event.keyCode){case keyCode.PAGE_UP:this._move("previousPage",event);
break;
case keyCode.PAGE_DOWN:this._move("nextPage",event);
break;
case keyCode.UP:this._keyEvent("previous",event);
break;
case keyCode.DOWN:this._keyEvent("next",event);
break
}},input:function(event){if(suppressInput){suppressInput=false;
event.preventDefault();
return 
}this._searchTimeout(event)
},focus:function(){this.selectedItem=null;
this.previous=this._value()
},blur:function(event){if(this.cancelBlur){delete this.cancelBlur;
return 
}clearTimeout(this.searching);
this.close(event);
this._change(event)
}});
this._initSource();
this.menu=$("<ul>").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance");
this._addClass(this.menu.element,"ui-autocomplete","ui-front");
this._on(this.menu.element,{mousedown:function(event){event.preventDefault();
this.cancelBlur=true;
this._delay(function(){delete this.cancelBlur;
if(this.element[0]!==$.ui.safeActiveElement(this.document[0])){this.element.trigger("focus")
}})
},menufocus:function(event,ui){var label,item;
if(this.isNewMenu){this.isNewMenu=false;
if(event.originalEvent&&/^mouse/.test(event.originalEvent.type)){this.menu.blur();
this.document.one("mousemove",function(){$(event.target).trigger(event.originalEvent)
});
return 
}}item=ui.item.data("ui-autocomplete-item");
if(false!==this._trigger("focus",event,{item:item})){if(event.originalEvent&&/^key/.test(event.originalEvent.type)){this._value(item.value)
}}label=ui.item.attr("aria-label")||item.value;
if(label&&$.trim(label).length){this.liveRegion.children().hide();
$("<div>").text(label).appendTo(this.liveRegion)
}},menuselect:function(event,ui){var item=ui.item.data("ui-autocomplete-item"),previous=this.previous;
if(this.element[0]!==$.ui.safeActiveElement(this.document[0])){this.element.trigger("focus");
this.previous=previous;
this._delay(function(){this.previous=previous;
this.selectedItem=item
})
}if(false!==this._trigger("select",event,{item:item})){this._value(item.value)
}this.term=this._value();
this.close(event);
this.selectedItem=item
}});
this.liveRegion=$("<div>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body);
this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible");
this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")
}})
},_destroy:function(){clearTimeout(this.searching);
this.element.removeAttr("autocomplete");
this.menu.element.remove();
this.liveRegion.remove()
},_setOption:function(key,value){this._super(key,value);
if(key==="source"){this._initSource()
}if(key==="appendTo"){this.menu.element.appendTo(this._appendTo())
}if(key==="disabled"&&value&&this.xhr){this.xhr.abort()
}},_isEventTargetInWidget:function(event){var menuElement=this.menu.element[0];
return event.target===this.element[0]||event.target===menuElement||$.contains(menuElement,event.target)
},_closeOnClickOutside:function(event){if(!this._isEventTargetInWidget(event)){this.close()
}},_appendTo:function(){var element=this.options.appendTo;
if(element){element=element.jquery||element.nodeType?$(element):this.document.find(element).eq(0)
}if(!element||!element[0]){element=this.element.closest(".ui-front, dialog")
}if(!element.length){element=this.document[0].body
}return element
},_initSource:function(){var array,url,that=this;
if($.isArray(this.options.source)){array=this.options.source;
this.source=function(request,response){response($.ui.autocomplete.filter(array,request.term))
}
}else{if(typeof this.options.source==="string"){url=this.options.source;
this.source=function(request,response){if(that.xhr){that.xhr.abort()
}that.xhr=$.ajax({url:url,data:request,dataType:"json",success:function(data){response(data)
},error:function(){response([])
}})
}
}else{this.source=this.options.source
}}},_searchTimeout:function(event){clearTimeout(this.searching);
this.searching=this._delay(function(){var equalValues=this.term===this._value(),menuVisible=this.menu.element.is(":visible"),modifierKey=event.altKey||event.ctrlKey||event.metaKey||event.shiftKey;
if(!equalValues||(equalValues&&!menuVisible&&!modifierKey)){this.selectedItem=null;
this.search(null,event)
}},this.options.delay)
},search:function(value,event){value=value!=null?value:this._value();
this.term=this._value();
if(value.length<this.options.minLength){return this.close(event)
}if(this._trigger("search",event)===false){return 
}return this._search(value)
},_search:function(value){this.pending++;
this._addClass("ui-autocomplete-loading");
this.cancelSearch=false;
this.source({term:value},this._response())
},_response:function(){var index=++this.requestIndex;
return $.proxy(function(content){if(index===this.requestIndex){this.__response(content)
}this.pending--;
if(!this.pending){this._removeClass("ui-autocomplete-loading")
}},this)
},__response:function(content){if(content){content=this._normalize(content)
}this._trigger("response",null,{content:content});
if(!this.options.disabled&&content&&content.length&&!this.cancelSearch){this._suggest(content);
this._trigger("open")
}else{this._close()
}},close:function(event){this.cancelSearch=true;
this._close(event)
},_close:function(event){this._off(this.document,"mousedown");
if(this.menu.element.is(":visible")){this.menu.element.hide();
this.menu.blur();
this.isNewMenu=true;
this._trigger("close",event)
}},_change:function(event){if(this.previous!==this._value()){this._trigger("change",event,{item:this.selectedItem})
}},_normalize:function(items){if(items.length&&items[0].label&&items[0].value){return items
}return $.map(items,function(item){if(typeof item==="string"){return{label:item,value:item}
}return $.extend({},item,{label:item.label||item.value,value:item.value||item.label})
})
},_suggest:function(items){var ul=this.menu.element.empty();
this._renderMenu(ul,items);
this.isNewMenu=true;
this.menu.refresh();
ul.show();
this._resizeMenu();
ul.position($.extend({of:this.element},this.options.position));
if(this.options.autoFocus){this.menu.next()
}this._on(this.document,{mousedown:"_closeOnClickOutside"})
},_resizeMenu:function(){var ul=this.menu.element;
ul.outerWidth(Math.max(ul.width("").outerWidth()+1,this.element.outerWidth()))
},_renderMenu:function(ul,items){var that=this;
$.each(items,function(index,item){that._renderItemData(ul,item)
})
},_renderItemData:function(ul,item){return this._renderItem(ul,item).data("ui-autocomplete-item",item)
},_renderItem:function(ul,item){return $("<li>").append($("<div>").text(item.label)).appendTo(ul)
},_move:function(direction,event){if(!this.menu.element.is(":visible")){this.search(null,event);
return 
}if(this.menu.isFirstItem()&&/^previous/.test(direction)||this.menu.isLastItem()&&/^next/.test(direction)){if(!this.isMultiLine){this._value(this.term)
}this.menu.blur();
return 
}this.menu[direction](event)
},widget:function(){return this.menu.element
},_value:function(){return this.valueMethod.apply(this.element,arguments)
},_keyEvent:function(keyEvent,event){if(!this.isMultiLine||this.menu.element.is(":visible")){this._move(keyEvent,event);
event.preventDefault()
}},_isContentEditable:function(element){if(!element.length){return false
}var editable=element.prop("contentEditable");
if(editable==="inherit"){return this._isContentEditable(element.parent())
}return editable==="true"
}});
$.extend($.ui.autocomplete,{escapeRegex:function(value){return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")
},filter:function(array,term){var matcher=new RegExp($.ui.autocomplete.escapeRegex(term),"i");
return $.grep(array,function(value){return matcher.test(value.label||value.value||value)
})
}});
$.widget("ui.autocomplete",$.ui.autocomplete,{options:{messages:{}},__response:function(content){var message;
this._superApply(arguments);
if(this.options.disabled||this.cancelSearch){return 
}this.liveRegion.children().show()
}});
var widgetsAutocomplete=$.ui.autocomplete;
/*
 * jQuery UI Effects 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var dataSpace="ui-effects-",dataSpaceStyle="ui-effects-style",dataSpaceAnimated="ui-effects-animated",jQuery=$;
$.effects={effect:{}};
/*
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
(function(jQuery,undefined){var stepHooks="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",rplusequals=/^([\-+])=\s*(\d+\.?\d*)/,stringParsers=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(execResult){return[execResult[1],execResult[2],execResult[3],execResult[4]]
}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(execResult){return[execResult[1]*2.55,execResult[2]*2.55,execResult[3]*2.55,execResult[4]]
}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(execResult){return[parseInt(execResult[1],16),parseInt(execResult[2],16),parseInt(execResult[3],16)]
}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(execResult){return[parseInt(execResult[1]+execResult[1],16),parseInt(execResult[2]+execResult[2],16),parseInt(execResult[3]+execResult[3],16)]
}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(execResult){return[execResult[1],execResult[2]/100,execResult[3]/100,execResult[4]]
}}],color=jQuery.Color=function(color,green,blue,alpha){return new jQuery.Color.fn.parse(color,green,blue,alpha)
},spaces={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},propTypes={"byte":{floor:true,max:255},percent:{max:1},degrees:{mod:360,floor:true}},support=color.support={},supportElem=jQuery("<p>")[0],colors,each=jQuery.each;
supportElem.style.cssText="background-color:rgba(1,1,1,.5)";
support.rgba=supportElem.style.backgroundColor.indexOf("rgba")>-1;
each(spaces,function(spaceName,space){space.cache="_"+spaceName;
space.props.alpha={idx:3,type:"percent",def:1}
});
function clamp(value,prop,allowEmpty){var type=propTypes[prop.type]||{};
if(value==null){return(allowEmpty||!prop.def)?null:prop.def
}value=type.floor?~~value:parseFloat(value);
if(isNaN(value)){return prop.def
}if(type.mod){return(value+type.mod)%type.mod
}return 0>value?0:type.max<value?type.max:value
}function stringParse(string){var inst=color(),rgba=inst._rgba=[];
string=string.toLowerCase();
each(stringParsers,function(i,parser){var parsed,match=parser.re.exec(string),values=match&&parser.parse(match),spaceName=parser.space||"rgba";
if(values){parsed=inst[spaceName](values);
inst[spaces[spaceName].cache]=parsed[spaces[spaceName].cache];
rgba=inst._rgba=parsed._rgba;
return false
}});
if(rgba.length){if(rgba.join()==="0,0,0,0"){jQuery.extend(rgba,colors.transparent)
}return inst
}return colors[string]
}color.fn=jQuery.extend(color.prototype,{parse:function(red,green,blue,alpha){if(red===undefined){this._rgba=[null,null,null,null];
return this
}if(red.jquery||red.nodeType){red=jQuery(red).css(green);
green=undefined
}var inst=this,type=jQuery.type(red),rgba=this._rgba=[];
if(green!==undefined){red=[red,green,blue,alpha];
type="array"
}if(type==="string"){return this.parse(stringParse(red)||colors._default)
}if(type==="array"){each(spaces.rgba.props,function(key,prop){rgba[prop.idx]=clamp(red[prop.idx],prop)
});
return this
}if(type==="object"){if(red instanceof color){each(spaces,function(spaceName,space){if(red[space.cache]){inst[space.cache]=red[space.cache].slice()
}})
}else{each(spaces,function(spaceName,space){var cache=space.cache;
each(space.props,function(key,prop){if(!inst[cache]&&space.to){if(key==="alpha"||red[key]==null){return 
}inst[cache]=space.to(inst._rgba)
}inst[cache][prop.idx]=clamp(red[key],prop,true)
});
if(inst[cache]&&jQuery.inArray(null,inst[cache].slice(0,3))<0){inst[cache][3]=1;
if(space.from){inst._rgba=space.from(inst[cache])
}}})
}return this
}},is:function(compare){var is=color(compare),same=true,inst=this;
each(spaces,function(_,space){var localCache,isCache=is[space.cache];
if(isCache){localCache=inst[space.cache]||space.to&&space.to(inst._rgba)||[];
each(space.props,function(_,prop){if(isCache[prop.idx]!=null){same=(isCache[prop.idx]===localCache[prop.idx]);
return same
}})
}return same
});
return same
},_space:function(){var used=[],inst=this;
each(spaces,function(spaceName,space){if(inst[space.cache]){used.push(spaceName)
}});
return used.pop()
},transition:function(other,distance){var end=color(other),spaceName=end._space(),space=spaces[spaceName],startColor=this.alpha()===0?color("transparent"):this,start=startColor[space.cache]||space.to(startColor._rgba),result=start.slice();
end=end[space.cache];
each(space.props,function(key,prop){var index=prop.idx,startValue=start[index],endValue=end[index],type=propTypes[prop.type]||{};
if(endValue===null){return 
}if(startValue===null){result[index]=endValue
}else{if(type.mod){if(endValue-startValue>type.mod/2){startValue+=type.mod
}else{if(startValue-endValue>type.mod/2){startValue-=type.mod
}}}result[index]=clamp((endValue-startValue)*distance+startValue,prop)
}});
return this[spaceName](result)
},blend:function(opaque){if(this._rgba[3]===1){return this
}var rgb=this._rgba.slice(),a=rgb.pop(),blend=color(opaque)._rgba;
return color(jQuery.map(rgb,function(v,i){return(1-a)*blend[i]+a*v
}))
},toRgbaString:function(){var prefix="rgba(",rgba=jQuery.map(this._rgba,function(v,i){return v==null?(i>2?1:0):v
});
if(rgba[3]===1){rgba.pop();
prefix="rgb("
}return prefix+rgba.join()+")"
},toHslaString:function(){var prefix="hsla(",hsla=jQuery.map(this.hsla(),function(v,i){if(v==null){v=i>2?1:0
}if(i&&i<3){v=Math.round(v*100)+"%"
}return v
});
if(hsla[3]===1){hsla.pop();
prefix="hsl("
}return prefix+hsla.join()+")"
},toHexString:function(includeAlpha){var rgba=this._rgba.slice(),alpha=rgba.pop();
if(includeAlpha){rgba.push(~~(alpha*255))
}return"#"+jQuery.map(rgba,function(v){v=(v||0).toString(16);
return v.length===1?"0"+v:v
}).join("")
},toString:function(){return this._rgba[3]===0?"transparent":this.toRgbaString()
}});
color.fn.parse.prototype=color.fn;
function hue2rgb(p,q,h){h=(h+1)%1;
if(h*6<1){return p+(q-p)*h*6
}if(h*2<1){return q
}if(h*3<2){return p+(q-p)*((2/3)-h)*6
}return p
}spaces.hsla.to=function(rgba){if(rgba[0]==null||rgba[1]==null||rgba[2]==null){return[null,null,null,rgba[3]]
}var r=rgba[0]/255,g=rgba[1]/255,b=rgba[2]/255,a=rgba[3],max=Math.max(r,g,b),min=Math.min(r,g,b),diff=max-min,add=max+min,l=add*0.5,h,s;
if(min===max){h=0
}else{if(r===max){h=(60*(g-b)/diff)+360
}else{if(g===max){h=(60*(b-r)/diff)+120
}else{h=(60*(r-g)/diff)+240
}}}if(diff===0){s=0
}else{if(l<=0.5){s=diff/add
}else{s=diff/(2-add)
}}return[Math.round(h)%360,s,l,a==null?1:a]
};
spaces.hsla.from=function(hsla){if(hsla[0]==null||hsla[1]==null||hsla[2]==null){return[null,null,null,hsla[3]]
}var h=hsla[0]/360,s=hsla[1],l=hsla[2],a=hsla[3],q=l<=0.5?l*(1+s):l+s-l*s,p=2*l-q;
return[Math.round(hue2rgb(p,q,h+(1/3))*255),Math.round(hue2rgb(p,q,h)*255),Math.round(hue2rgb(p,q,h-(1/3))*255),a]
};
each(spaces,function(spaceName,space){var props=space.props,cache=space.cache,to=space.to,from=space.from;
color.fn[spaceName]=function(value){if(to&&!this[cache]){this[cache]=to(this._rgba)
}if(value===undefined){return this[cache].slice()
}var ret,type=jQuery.type(value),arr=(type==="array"||type==="object")?value:arguments,local=this[cache].slice();
each(props,function(key,prop){var val=arr[type==="object"?key:prop.idx];
if(val==null){val=local[prop.idx]
}local[prop.idx]=clamp(val,prop)
});
if(from){ret=color(from(local));
ret[cache]=local;
return ret
}else{return color(local)
}};
each(props,function(key,prop){if(color.fn[key]){return 
}color.fn[key]=function(value){var vtype=jQuery.type(value),fn=(key==="alpha"?(this._hsla?"hsla":"rgba"):spaceName),local=this[fn](),cur=local[prop.idx],match;
if(vtype==="undefined"){return cur
}if(vtype==="function"){value=value.call(this,cur);
vtype=jQuery.type(value)
}if(value==null&&prop.empty){return this
}if(vtype==="string"){match=rplusequals.exec(value);
if(match){value=cur+parseFloat(match[2])*(match[1]==="+"?1:-1)
}}local[prop.idx]=value;
return this[fn](local)
}
})
});
color.hook=function(hook){var hooks=hook.split(" ");
each(hooks,function(i,hook){jQuery.cssHooks[hook]={set:function(elem,value){var parsed,curElem,backgroundColor="";
if(value!=="transparent"&&(jQuery.type(value)!=="string"||(parsed=stringParse(value)))){value=color(parsed||value);
if(!support.rgba&&value._rgba[3]!==1){curElem=hook==="backgroundColor"?elem.parentNode:elem;
while((backgroundColor===""||backgroundColor==="transparent")&&curElem&&curElem.style){try{backgroundColor=jQuery.css(curElem,"backgroundColor");
curElem=curElem.parentNode
}catch(e){}}value=value.blend(backgroundColor&&backgroundColor!=="transparent"?backgroundColor:"_default")
}value=value.toRgbaString()
}try{elem.style[hook]=value
}catch(e){}}};
jQuery.fx.step[hook]=function(fx){if(!fx.colorInit){fx.start=color(fx.elem,hook);
fx.end=color(fx.end);
fx.colorInit=true
}jQuery.cssHooks[hook].set(fx.elem,fx.start.transition(fx.end,fx.pos))
}
})
};
color.hook(stepHooks);
jQuery.cssHooks.borderColor={expand:function(value){var expanded={};
each(["Top","Right","Bottom","Left"],function(i,part){expanded["border"+part+"Color"]=value
});
return expanded
}};
colors=jQuery.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}
})(jQuery);
(function(){var classAnimationActions=["add","remove","toggle"],shorthandStyles={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};
$.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(_,prop){$.fx.step[prop]=function(fx){if(fx.end!=="none"&&!fx.setAttr||fx.pos===1&&!fx.setAttr){jQuery.style(fx.elem,prop,fx.end);
fx.setAttr=true
}}
});
function getElementStyles(elem){var key,len,style=elem.ownerDocument.defaultView?elem.ownerDocument.defaultView.getComputedStyle(elem,null):elem.currentStyle,styles={};
if(style&&style.length&&style[0]&&style[style[0]]){len=style.length;
while(len--){key=style[len];
if(typeof style[key]==="string"){styles[$.camelCase(key)]=style[key]
}}}else{for(key in style){if(typeof style[key]==="string"){styles[key]=style[key]
}}}return styles
}function styleDifference(oldStyle,newStyle){var diff={},name,value;
for(name in newStyle){value=newStyle[name];
if(oldStyle[name]!==value){if(!shorthandStyles[name]){if($.fx.step[name]||!isNaN(parseFloat(value))){diff[name]=value
}}}}return diff
}if(!$.fn.addBack){$.fn.addBack=function(selector){return this.add(selector==null?this.prevObject:this.prevObject.filter(selector))
}
}$.effects.animateClass=function(value,duration,easing,callback){var o=$.speed(duration,easing,callback);
return this.queue(function(){var animated=$(this),baseClass=animated.attr("class")||"",applyClassChange,allAnimations=o.children?animated.find("*").addBack():animated;
allAnimations=allAnimations.map(function(){var el=$(this);
return{el:el,start:getElementStyles(this)}
});
applyClassChange=function(){$.each(classAnimationActions,function(i,action){if(value[action]){animated[action+"Class"](value[action])
}})
};
applyClassChange();
allAnimations=allAnimations.map(function(){this.end=getElementStyles(this.el[0]);
this.diff=styleDifference(this.start,this.end);
return this
});
animated.attr("class",baseClass);
allAnimations=allAnimations.map(function(){var styleInfo=this,dfd=$.Deferred(),opts=$.extend({},o,{queue:false,complete:function(){dfd.resolve(styleInfo)
}});
this.el.animate(this.diff,opts);
return dfd.promise()
});
$.when.apply($,allAnimations.get()).done(function(){applyClassChange();
$.each(arguments,function(){var el=this.el;
$.each(this.diff,function(key){el.css(key,"")
})
});
o.complete.call(animated[0])
})
})
};
$.fn.extend({addClass:(function(orig){return function(classNames,speed,easing,callback){return speed?$.effects.animateClass.call(this,{add:classNames},speed,easing,callback):orig.apply(this,arguments)
}
})($.fn.addClass),removeClass:(function(orig){return function(classNames,speed,easing,callback){return arguments.length>1?$.effects.animateClass.call(this,{remove:classNames},speed,easing,callback):orig.apply(this,arguments)
}
})($.fn.removeClass),toggleClass:(function(orig){return function(classNames,force,speed,easing,callback){if(typeof force==="boolean"||force===undefined){if(!speed){return orig.apply(this,arguments)
}else{return $.effects.animateClass.call(this,(force?{add:classNames}:{remove:classNames}),speed,easing,callback)
}}else{return $.effects.animateClass.call(this,{toggle:classNames},force,speed,easing)
}}
})($.fn.toggleClass),switchClass:function(remove,add,speed,easing,callback){return $.effects.animateClass.call(this,{add:add,remove:remove},speed,easing,callback)
}})
})();
(function(){if($.expr&&$.expr.filters&&$.expr.filters.animated){$.expr.filters.animated=(function(orig){return function(elem){return !!$(elem).data(dataSpaceAnimated)||orig(elem)
}
})($.expr.filters.animated)
}if($.uiBackCompat!==false){$.extend($.effects,{save:function(element,set){var i=0,length=set.length;
for(;
i<length;
i++){if(set[i]!==null){element.data(dataSpace+set[i],element[0].style[set[i]])
}}},restore:function(element,set){var val,i=0,length=set.length;
for(;
i<length;
i++){if(set[i]!==null){val=element.data(dataSpace+set[i]);
element.css(set[i],val)
}}},setMode:function(el,mode){if(mode==="toggle"){mode=el.is(":hidden")?"show":"hide"
}return mode
},createWrapper:function(element){if(element.parent().is(".ui-effects-wrapper")){return element.parent()
}var props={width:element.outerWidth(true),height:element.outerHeight(true),"float":element.css("float")},wrapper=$("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),size={width:element.width(),height:element.height()},active=document.activeElement;
try{active.id
}catch(e){active=document.body
}element.wrap(wrapper);
if(element[0]===active||$.contains(element[0],active)){$(active).trigger("focus")
}wrapper=element.parent();
if(element.css("position")==="static"){wrapper.css({position:"relative"});
element.css({position:"relative"})
}else{$.extend(props,{position:element.css("position"),zIndex:element.css("z-index")});
$.each(["top","left","bottom","right"],function(i,pos){props[pos]=element.css(pos);
if(isNaN(parseInt(props[pos],10))){props[pos]="auto"
}});
element.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})
}element.css(size);
return wrapper.css(props).show()
},removeWrapper:function(element){var active=document.activeElement;
if(element.parent().is(".ui-effects-wrapper")){element.parent().replaceWith(element);
if(element[0]===active||$.contains(element[0],active)){$(active).trigger("focus")
}}return element
}})
}$.extend($.effects,{version:"1.12.0",define:function(name,mode,effect){if(!effect){effect=mode;
mode="effect"
}$.effects.effect[name]=effect;
$.effects.effect[name].mode=mode;
return effect
},scaledDimensions:function(element,percent,direction){if(percent===0){return{height:0,width:0,outerHeight:0,outerWidth:0}
}var x=direction!=="horizontal"?((percent||100)/100):1,y=direction!=="vertical"?((percent||100)/100):1;
return{height:element.height()*y,width:element.width()*x,outerHeight:element.outerHeight()*y,outerWidth:element.outerWidth()*x}
},clipToBox:function(animation){return{width:animation.clip.right-animation.clip.left,height:animation.clip.bottom-animation.clip.top,left:animation.clip.left,top:animation.clip.top}
},unshift:function(element,queueLength,count){var queue=element.queue();
if(queueLength>1){queue.splice.apply(queue,[1,0].concat(queue.splice(queueLength,count)))
}element.dequeue()
},saveStyle:function(element){element.data(dataSpaceStyle,element[0].style.cssText)
},restoreStyle:function(element){element[0].style.cssText=element.data(dataSpaceStyle)||"";
element.removeData(dataSpaceStyle)
},mode:function(element,mode){var hidden=element.is(":hidden");
if(mode==="toggle"){mode=hidden?"show":"hide"
}if(hidden?mode==="hide":mode==="show"){mode="none"
}return mode
},getBaseline:function(origin,original){var y,x;
switch(origin[0]){case"top":y=0;
break;
case"middle":y=0.5;
break;
case"bottom":y=1;
break;
default:y=origin[0]/original.height
}switch(origin[1]){case"left":x=0;
break;
case"center":x=0.5;
break;
case"right":x=1;
break;
default:x=origin[1]/original.width
}return{x:x,y:y}
},createPlaceholder:function(element){var placeholder,cssPosition=element.css("position"),position=element.position();
element.css({marginTop:element.css("marginTop"),marginBottom:element.css("marginBottom"),marginLeft:element.css("marginLeft"),marginRight:element.css("marginRight")}).outerWidth(element.outerWidth()).outerHeight(element.outerHeight());
if(/^(static|relative)/.test(cssPosition)){cssPosition="absolute";
placeholder=$("<"+element[0].nodeName+">").insertAfter(element).css({display:/^(inline|ruby)/.test(element.css("display"))?"inline-block":"block",visibility:"hidden",marginTop:element.css("marginTop"),marginBottom:element.css("marginBottom"),marginLeft:element.css("marginLeft"),marginRight:element.css("marginRight"),"float":element.css("float")}).outerWidth(element.outerWidth()).outerHeight(element.outerHeight()).addClass("ui-effects-placeholder");
element.data(dataSpace+"placeholder",placeholder)
}element.css({position:cssPosition,left:position.left,top:position.top});
return placeholder
},removePlaceholder:function(element){var dataKey=dataSpace+"placeholder",placeholder=element.data(dataKey);
if(placeholder){placeholder.remove();
element.removeData(dataKey)
}},cleanUp:function(element){$.effects.restoreStyle(element);
$.effects.removePlaceholder(element)
},setTransition:function(element,list,factor,value){value=value||{};
$.each(list,function(i,x){var unit=element.cssUnit(x);
if(unit[0]>0){value[x]=unit[0]*factor+unit[1]
}});
return value
}});
function _normalizeArguments(effect,options,speed,callback){if($.isPlainObject(effect)){options=effect;
effect=effect.effect
}effect={effect:effect};
if(options==null){options={}
}if($.isFunction(options)){callback=options;
speed=null;
options={}
}if(typeof options==="number"||$.fx.speeds[options]){callback=speed;
speed=options;
options={}
}if($.isFunction(speed)){callback=speed;
speed=null
}if(options){$.extend(effect,options)
}speed=speed||options.duration;
effect.duration=$.fx.off?0:typeof speed==="number"?speed:speed in $.fx.speeds?$.fx.speeds[speed]:$.fx.speeds._default;
effect.complete=callback||options.complete;
return effect
}function standardAnimationOption(option){if(!option||typeof option==="number"||$.fx.speeds[option]){return true
}if(typeof option==="string"&&!$.effects.effect[option]){return true
}if($.isFunction(option)){return true
}if(typeof option==="object"&&!option.effect){return true
}return false
}$.fn.extend({effect:function(){var args=_normalizeArguments.apply(this,arguments),effectMethod=$.effects.effect[args.effect],defaultMode=effectMethod.mode,queue=args.queue,queueName=queue||"fx",complete=args.complete,mode=args.mode,modes=[],prefilter=function(next){var el=$(this),normalizedMode=$.effects.mode(el,mode)||defaultMode;
el.data(dataSpaceAnimated,true);
modes.push(normalizedMode);
if(defaultMode&&(normalizedMode==="show"||(normalizedMode===defaultMode&&normalizedMode==="hide"))){el.show()
}if(!defaultMode||normalizedMode!=="none"){$.effects.saveStyle(el)
}if($.isFunction(next)){next()
}};
if($.fx.off||!effectMethod){if(mode){return this[mode](args.duration,complete)
}else{return this.each(function(){if(complete){complete.call(this)
}})
}}function run(next){var elem=$(this);
function cleanup(){elem.removeData(dataSpaceAnimated);
$.effects.cleanUp(elem);
if(args.mode==="hide"){elem.hide()
}done()
}function done(){if($.isFunction(complete)){complete.call(elem[0])
}if($.isFunction(next)){next()
}}args.mode=modes.shift();
if($.uiBackCompat!==false&&!defaultMode){if(elem.is(":hidden")?mode==="hide":mode==="show"){elem[mode]();
done()
}else{effectMethod.call(elem[0],args,done)
}}else{if(args.mode==="none"){elem[mode]();
done()
}else{effectMethod.call(elem[0],args,cleanup)
}}}return queue===false?this.each(prefilter).each(run):this.queue(queueName,prefilter).queue(queueName,run)
},show:(function(orig){return function(option){if(standardAnimationOption(option)){return orig.apply(this,arguments)
}else{var args=_normalizeArguments.apply(this,arguments);
args.mode="show";
return this.effect.call(this,args)
}}
})($.fn.show),hide:(function(orig){return function(option){if(standardAnimationOption(option)){return orig.apply(this,arguments)
}else{var args=_normalizeArguments.apply(this,arguments);
args.mode="hide";
return this.effect.call(this,args)
}}
})($.fn.hide),toggle:(function(orig){return function(option){if(standardAnimationOption(option)||typeof option==="boolean"){return orig.apply(this,arguments)
}else{var args=_normalizeArguments.apply(this,arguments);
args.mode="toggle";
return this.effect.call(this,args)
}}
})($.fn.toggle),cssUnit:function(key){var style=this.css(key),val=[];
$.each(["em","px","%","pt"],function(i,unit){if(style.indexOf(unit)>0){val=[parseFloat(style),unit]
}});
return val
},cssClip:function(clipObj){if(clipObj){return this.css("clip","rect("+clipObj.top+"px "+clipObj.right+"px "+clipObj.bottom+"px "+clipObj.left+"px)")
}return parseClip(this.css("clip"),this)
},transfer:function(options,done){var element=$(this),target=$(options.to),targetFixed=target.css("position")==="fixed",body=$("body"),fixTop=targetFixed?body.scrollTop():0,fixLeft=targetFixed?body.scrollLeft():0,endPosition=target.offset(),animation={top:endPosition.top-fixTop,left:endPosition.left-fixLeft,height:target.innerHeight(),width:target.innerWidth()},startPosition=element.offset(),transfer=$("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(options.className).css({top:startPosition.top-fixTop,left:startPosition.left-fixLeft,height:element.innerHeight(),width:element.innerWidth(),position:targetFixed?"fixed":"absolute"}).animate(animation,options.duration,options.easing,function(){transfer.remove();
if($.isFunction(done)){done()
}})
}});
function parseClip(str,element){var outerWidth=element.outerWidth(),outerHeight=element.outerHeight(),clipRegex=/^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,values=clipRegex.exec(str)||["",0,outerWidth,outerHeight,0];
return{top:parseFloat(values[1])||0,right:values[2]==="auto"?outerWidth:parseFloat(values[2]),bottom:values[3]==="auto"?outerHeight:parseFloat(values[3]),left:parseFloat(values[4])||0}
}$.fx.step.clip=function(fx){if(!fx.clipInit){fx.start=$(fx.elem).cssClip();
if(typeof fx.end==="string"){fx.end=parseClip(fx.end,fx.elem)
}fx.clipInit=true
}$(fx.elem).cssClip({top:fx.pos*(fx.end.top-fx.start.top)+fx.start.top,right:fx.pos*(fx.end.right-fx.start.right)+fx.start.right,bottom:fx.pos*(fx.end.bottom-fx.start.bottom)+fx.start.bottom,left:fx.pos*(fx.end.left-fx.start.left)+fx.start.left})
}
})();
(function(){var baseEasings={};
$.each(["Quad","Cubic","Quart","Quint","Expo"],function(i,name){baseEasings[name]=function(p){return Math.pow(p,i+2)
}
});
$.extend(baseEasings,{Sine:function(p){return 1-Math.cos(p*Math.PI/2)
},Circ:function(p){return 1-Math.sqrt(1-p*p)
},Elastic:function(p){return p===0||p===1?p:-Math.pow(2,8*(p-1))*Math.sin(((p-1)*80-7.5)*Math.PI/15)
},Back:function(p){return p*p*(3*p-2)
},Bounce:function(p){var pow2,bounce=4;
while(p<((pow2=Math.pow(2,--bounce))-1)/11){}return 1/Math.pow(4,3-bounce)-7.5625*Math.pow((pow2*3-2)/22-p,2)
}});
$.each(baseEasings,function(name,easeIn){$.easing["easeIn"+name]=easeIn;
$.easing["easeOut"+name]=function(p){return 1-easeIn(1-p)
};
$.easing["easeInOut"+name]=function(p){return p<0.5?easeIn(p*2)/2:1-easeIn(p*-2+2)/2
}
})
})();
var effect=$.effects;
/*
 * jQuery UI Effects Blind 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var effectsEffectBlind=$.effects.define("blind","hide",function(options,done){var map={up:["bottom","top"],vertical:["bottom","top"],down:["top","bottom"],left:["right","left"],horizontal:["right","left"],right:["left","right"]},element=$(this),direction=options.direction||"up",start=element.cssClip(),animate={clip:$.extend({},start)},placeholder=$.effects.createPlaceholder(element);
animate.clip[map[direction][0]]=animate.clip[map[direction][1]];
if(options.mode==="show"){element.cssClip(animate.clip);
if(placeholder){placeholder.css($.effects.clipToBox(animate))
}animate.clip=start
}if(placeholder){placeholder.animate($.effects.clipToBox(animate),options.duration,options.easing)
}element.animate(animate,{queue:false,duration:options.duration,easing:options.easing,complete:done})
});
/*
 * jQuery UI Effects Bounce 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var effectsEffectBounce=$.effects.define("bounce",function(options,done){var upAnim,downAnim,refValue,element=$(this),mode=options.mode,hide=mode==="hide",show=mode==="show",direction=options.direction||"up",distance=options.distance,times=options.times||5,anims=times*2+(show||hide?1:0),speed=options.duration/anims,easing=options.easing,ref=(direction==="up"||direction==="down")?"top":"left",motion=(direction==="up"||direction==="left"),i=0,queuelen=element.queue().length;
$.effects.createPlaceholder(element);
refValue=element.css(ref);
if(!distance){distance=element[ref==="top"?"outerHeight":"outerWidth"]()/3
}if(show){downAnim={opacity:1};
downAnim[ref]=refValue;
element.css("opacity",0).css(ref,motion?-distance*2:distance*2).animate(downAnim,speed,easing)
}if(hide){distance=distance/Math.pow(2,times-1)
}downAnim={};
downAnim[ref]=refValue;
for(;
i<times;
i++){upAnim={};
upAnim[ref]=(motion?"-=":"+=")+distance;
element.animate(upAnim,speed,easing).animate(downAnim,speed,easing);
distance=hide?distance*2:distance/2
}if(hide){upAnim={opacity:0};
upAnim[ref]=(motion?"-=":"+=")+distance;
element.animate(upAnim,speed,easing)
}element.queue(done);
$.effects.unshift(element,queuelen,anims+1)
});
/*
 * jQuery UI Effects Clip 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var effectsEffectClip=$.effects.define("clip","hide",function(options,done){var start,animate={},element=$(this),direction=options.direction||"vertical",both=direction==="both",horizontal=both||direction==="horizontal",vertical=both||direction==="vertical";
start=element.cssClip();
animate.clip={top:vertical?(start.bottom-start.top)/2:start.top,right:horizontal?(start.right-start.left)/2:start.right,bottom:vertical?(start.bottom-start.top)/2:start.bottom,left:horizontal?(start.right-start.left)/2:start.left};
$.effects.createPlaceholder(element);
if(options.mode==="show"){element.cssClip(animate.clip);
animate.clip=start
}element.animate(animate,{queue:false,duration:options.duration,easing:options.easing,complete:done})
});
/*
 * jQuery UI Effects Drop 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var effectsEffectDrop=$.effects.define("drop","hide",function(options,done){var distance,element=$(this),mode=options.mode,show=mode==="show",direction=options.direction||"left",ref=(direction==="up"||direction==="down")?"top":"left",motion=(direction==="up"||direction==="left")?"-=":"+=",oppositeMotion=(motion==="+=")?"-=":"+=",animation={opacity:0};
$.effects.createPlaceholder(element);
distance=options.distance||element[ref==="top"?"outerHeight":"outerWidth"](true)/2;
animation[ref]=motion+distance;
if(show){element.css(animation);
animation[ref]=oppositeMotion+distance;
animation.opacity=1
}element.animate(animation,{queue:false,duration:options.duration,easing:options.easing,complete:done})
});
/*
 * jQuery UI Effects Explode 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var effectsEffectExplode=$.effects.define("explode","hide",function(options,done){var i,j,left,top,mx,my,rows=options.pieces?Math.round(Math.sqrt(options.pieces)):3,cells=rows,element=$(this),mode=options.mode,show=mode==="show",offset=element.show().css("visibility","hidden").offset(),width=Math.ceil(element.outerWidth()/cells),height=Math.ceil(element.outerHeight()/rows),pieces=[];
function childComplete(){pieces.push(this);
if(pieces.length===rows*cells){animComplete()
}}for(i=0;
i<rows;
i++){top=offset.top+i*height;
my=i-(rows-1)/2;
for(j=0;
j<cells;
j++){left=offset.left+j*width;
mx=j-(cells-1)/2;
element.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-j*width,top:-i*height}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:width,height:height,left:left+(show?mx*width:0),top:top+(show?my*height:0),opacity:show?0:1}).animate({left:left+(show?0:mx*width),top:top+(show?0:my*height),opacity:show?1:0},options.duration||500,options.easing,childComplete)
}}function animComplete(){element.css({visibility:"visible"});
$(pieces).remove();
done()
}});
/*
 * jQuery UI Effects Fade 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var effectsEffectFade=$.effects.define("fade","toggle",function(options,done){var show=options.mode==="show";
$(this).css("opacity",show?0:1).animate({opacity:show?1:0},{queue:false,duration:options.duration,easing:options.easing,complete:done})
});
/*
 * jQuery UI Effects Fold 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var effectsEffectFold=$.effects.define("fold","hide",function(options,done){var element=$(this),mode=options.mode,show=mode==="show",hide=mode==="hide",size=options.size||15,percent=/([0-9]+)%/.exec(size),horizFirst=!!options.horizFirst,ref=horizFirst?["right","bottom"]:["bottom","right"],duration=options.duration/2,placeholder=$.effects.createPlaceholder(element),start=element.cssClip(),animation1={clip:$.extend({},start)},animation2={clip:$.extend({},start)},distance=[start[ref[0]],start[ref[1]]],queuelen=element.queue().length;
if(percent){size=parseInt(percent[1],10)/100*distance[hide?0:1]
}animation1.clip[ref[0]]=size;
animation2.clip[ref[0]]=size;
animation2.clip[ref[1]]=0;
if(show){element.cssClip(animation2.clip);
if(placeholder){placeholder.css($.effects.clipToBox(animation2))
}animation2.clip=start
}element.queue(function(next){if(placeholder){placeholder.animate($.effects.clipToBox(animation1),duration,options.easing).animate($.effects.clipToBox(animation2),duration,options.easing)
}next()
}).animate(animation1,duration,options.easing).animate(animation2,duration,options.easing).queue(done);
$.effects.unshift(element,queuelen,4)
});
/*
 * jQuery UI Effects Highlight 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var effectsEffectHighlight=$.effects.define("highlight","show",function(options,done){var element=$(this),animation={backgroundColor:element.css("backgroundColor")};
if(options.mode==="hide"){animation.opacity=0
}$.effects.saveStyle(element);
element.css({backgroundImage:"none",backgroundColor:options.color||"#ffff99"}).animate(animation,{queue:false,duration:options.duration,easing:options.easing,complete:done})
});
/*
 * jQuery UI Effects Size 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var effectsEffectSize=$.effects.define("size",function(options,done){var baseline,factor,temp,element=$(this),cProps=["fontSize"],vProps=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],hProps=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],mode=options.mode,restore=mode!=="effect",scale=options.scale||"both",origin=options.origin||["middle","center"],position=element.css("position"),pos=element.position(),original=$.effects.scaledDimensions(element),from=options.from||original,to=options.to||$.effects.scaledDimensions(element,0);
$.effects.createPlaceholder(element);
if(mode==="show"){temp=from;
from=to;
to=temp
}factor={from:{y:from.height/original.height,x:from.width/original.width},to:{y:to.height/original.height,x:to.width/original.width}};
if(scale==="box"||scale==="both"){if(factor.from.y!==factor.to.y){from=$.effects.setTransition(element,vProps,factor.from.y,from);
to=$.effects.setTransition(element,vProps,factor.to.y,to)
}if(factor.from.x!==factor.to.x){from=$.effects.setTransition(element,hProps,factor.from.x,from);
to=$.effects.setTransition(element,hProps,factor.to.x,to)
}}if(scale==="content"||scale==="both"){if(factor.from.y!==factor.to.y){from=$.effects.setTransition(element,cProps,factor.from.y,from);
to=$.effects.setTransition(element,cProps,factor.to.y,to)
}}if(origin){baseline=$.effects.getBaseline(origin,original);
from.top=(original.outerHeight-from.outerHeight)*baseline.y+pos.top;
from.left=(original.outerWidth-from.outerWidth)*baseline.x+pos.left;
to.top=(original.outerHeight-to.outerHeight)*baseline.y+pos.top;
to.left=(original.outerWidth-to.outerWidth)*baseline.x+pos.left
}element.css(from);
if(scale==="content"||scale==="both"){vProps=vProps.concat(["marginTop","marginBottom"]).concat(cProps);
hProps=hProps.concat(["marginLeft","marginRight"]);
element.find("*[width]").each(function(){var child=$(this),childOriginal=$.effects.scaledDimensions(child),childFrom={height:childOriginal.height*factor.from.y,width:childOriginal.width*factor.from.x,outerHeight:childOriginal.outerHeight*factor.from.y,outerWidth:childOriginal.outerWidth*factor.from.x},childTo={height:childOriginal.height*factor.to.y,width:childOriginal.width*factor.to.x,outerHeight:childOriginal.height*factor.to.y,outerWidth:childOriginal.width*factor.to.x};
if(factor.from.y!==factor.to.y){childFrom=$.effects.setTransition(child,vProps,factor.from.y,childFrom);
childTo=$.effects.setTransition(child,vProps,factor.to.y,childTo)
}if(factor.from.x!==factor.to.x){childFrom=$.effects.setTransition(child,hProps,factor.from.x,childFrom);
childTo=$.effects.setTransition(child,hProps,factor.to.x,childTo)
}if(restore){$.effects.saveStyle(child)
}child.css(childFrom);
child.animate(childTo,options.duration,options.easing,function(){if(restore){$.effects.restoreStyle(child)
}})
})
}element.animate(to,{queue:false,duration:options.duration,easing:options.easing,complete:function(){var offset=element.offset();
if(to.opacity===0){element.css("opacity",from.opacity)
}if(!restore){element.css("position",position==="static"?"relative":position).offset(offset);
$.effects.saveStyle(element)
}done()
}})
});
/*
 * jQuery UI Effects Scale 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var effectsEffectScale=$.effects.define("scale",function(options,done){var el=$(this),mode=options.mode,percent=parseInt(options.percent,10)||(parseInt(options.percent,10)===0?0:(mode!=="effect"?0:100)),newOptions=$.extend(true,{from:$.effects.scaledDimensions(el),to:$.effects.scaledDimensions(el,percent,options.direction||"both"),origin:options.origin||["middle","center"]},options);
if(options.fade){newOptions.from.opacity=1;
newOptions.to.opacity=0
}$.effects.effect.size.call(this,newOptions,done)
});
/*
 * jQuery UI Effects Puff 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var effectsEffectPuff=$.effects.define("puff","hide",function(options,done){var newOptions=$.extend(true,{},options,{fade:true,percent:parseInt(options.percent,10)||150});
$.effects.effect.scale.call(this,newOptions,done)
});
/*
 * jQuery UI Effects Pulsate 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var effectsEffectPulsate=$.effects.define("pulsate","show",function(options,done){var element=$(this),mode=options.mode,show=mode==="show",hide=mode==="hide",showhide=show||hide,anims=((options.times||5)*2)+(showhide?1:0),duration=options.duration/anims,animateTo=0,i=1,queuelen=element.queue().length;
if(show||!element.is(":visible")){element.css("opacity",0).show();
animateTo=1
}for(;
i<anims;
i++){element.animate({opacity:animateTo},duration,options.easing);
animateTo=1-animateTo
}element.animate({opacity:animateTo},duration,options.easing);
element.queue(done);
$.effects.unshift(element,queuelen,anims+1)
});
/*
 * jQuery UI Effects Shake 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var effectsEffectShake=$.effects.define("shake",function(options,done){var i=1,element=$(this),direction=options.direction||"left",distance=options.distance||20,times=options.times||3,anims=times*2+1,speed=Math.round(options.duration/anims),ref=(direction==="up"||direction==="down")?"top":"left",positiveMotion=(direction==="up"||direction==="left"),animation={},animation1={},animation2={},queuelen=element.queue().length;
$.effects.createPlaceholder(element);
animation[ref]=(positiveMotion?"-=":"+=")+distance;
animation1[ref]=(positiveMotion?"+=":"-=")+distance*2;
animation2[ref]=(positiveMotion?"-=":"+=")+distance*2;
element.animate(animation,speed,options.easing);
for(;
i<times;
i++){element.animate(animation1,speed,options.easing).animate(animation2,speed,options.easing)
}element.animate(animation1,speed,options.easing).animate(animation,speed/2,options.easing).queue(done);
$.effects.unshift(element,queuelen,anims+1)
});
/*
 * jQuery UI Effects Slide 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var effectsEffectSlide=$.effects.define("slide","show",function(options,done){var startClip,startRef,element=$(this),map={up:["bottom","top"],down:["top","bottom"],left:["right","left"],right:["left","right"]},mode=options.mode,direction=options.direction||"left",ref=(direction==="up"||direction==="down")?"top":"left",positiveMotion=(direction==="up"||direction==="left"),distance=options.distance||element[ref==="top"?"outerHeight":"outerWidth"](true),animation={};
$.effects.createPlaceholder(element);
startClip=element.cssClip();
startRef=element.position()[ref];
animation[ref]=(positiveMotion?-1:1)*distance+startRef;
animation.clip=element.cssClip();
animation.clip[map[direction][1]]=animation.clip[map[direction][0]];
if(mode==="show"){element.cssClip(animation.clip);
element.css(ref,animation[ref]);
animation.clip=startClip;
animation[ref]=startRef
}element.animate(animation,{queue:false,duration:options.duration,easing:options.easing,complete:done})
});
/*
 * jQuery UI Effects Transfer 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var effect;
if($.uiBackCompat!==false){effect=$.effects.define("transfer",function(options,done){$(this).transfer(options,done)
})
}var effectsEffectTransfer=effect
}));