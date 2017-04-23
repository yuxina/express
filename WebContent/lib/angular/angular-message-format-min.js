(function(Ac,AM,S){var l=Ac.angular["$interpolateMinErr"];
var AO=Ac.angular["noop"],AV=Ac.angular["isFunction"],Ag=Ac.angular["toJson"];
function v(Am){if(Am==null){return""
}switch(typeof Am){case"string":return Am;
case"number":return""+Am;
default:return Ag(Am)
}}function O(Aq,Ao){var An=Aq.split(/\n/g);
for(var Ap=0;
Ap<An.length;
Ap++){var Am=An[Ap];
if(Ao>=Am.length){Ao-=Am.length
}else{return{line:Ap+1,column:Ao+1}
}}}var AD=Object.create(null);
function J(Ap){var Am=AD[Ap];
if(Am!=null){return Am
}function An(Aq){return Ap
}An["$$watchDelegate"]=function Ao(As,At,Ar){var Au=As["$watch"](AO,function Aq(){if(AV(At)){At.call(null,Ap,Ap,As)
}Au()
},Ar);
return Au
};
AD[Ap]=An;
An.exp=Ap;
An.expressions=[];
return An
}function AA(Aq,Ap){if(Ap===0){return Aq
}function Am(As){return(As==void 0)?As:As-Ap
}function An(As){return Am(Aq(As))
}var Ar;
An["$$watchDelegate"]=function Ao(Au,Av,As){Ar=Au["$watch"](Aq,function At(Ax,Aw){if(AV(Av)){Av.call(null,Am(Ax),Am(Aw),Au)
}},As);
return Ar
};
return An
}function p(Ao,Ap){var Am=this;
this.expressionFn=Ao;
this.choices=Ap;
if(Ap.other===void 0){throw l("reqother","“other” is a required option.")
}this.parsedFn=function(Aq){return Am.getResult(Aq)
};
this.parsedFn["$$watchDelegate"]=function An(Ar,As,Aq){return Am.watchDelegate(Ar,As,Aq)
};
this.parsedFn.exp=Ao.exp;
this.parsedFn.expressions=Ao.expressions
}p.prototype.getMessageFn=function AN(Am){return this.choices[this.categorizeValue(Am)]
};
p.prototype.getResult=function AB(Am){return this.getMessageFn(this.expressionFn(Am))(Am)
};
p.prototype.watchDelegate=function L(An,Ap,Am){var Ao=new F(this,An,Ap,Am);
return function(){Ao.cancelWatch()
}
};
function F(Ap,Aq,Ar,Am){var Ao=this;
this.scope=Aq;
this.msgSelector=Ap;
this.listener=Ar;
this.objectEquality=Am;
this.lastMessage=void 0;
this.messageFnWatcher=AO;
var An=function(At,As){return Ao.expressionFnListener(At,As)
};
this.expressionFnWatcher=Aq["$watch"](Ap.expressionFn,An,Am)
}F.prototype.expressionFnListener=function AW(Ap,Ao){var Am=this;
this.messageFnWatcher();
var An=function(Ar,As){return Am.messageFnListener(Ar,As)
};
var Aq=this.msgSelector.getMessageFn(Ap);
this.messageFnWatcher=this.scope["$watch"](Aq,An,this.objectEquality)
};
F.prototype.messageFnListener=function AI(Am,An){if(AV(this.listener)){this.listener.call(null,Am,Am===An?Am:this.lastMessage,this.scope)
}this.lastMessage=Am
};
F.prototype.cancelWatch=function AT(){this.expressionFnWatcher();
this.messageFnWatcher()
};
function G(Am,An){p.call(this,Am,An)
}function AC(){}AC.prototype=p.prototype;
G.prototype=new AC();
G.prototype.categorizeValue=function Ai(Am){return(this.choices[Am]!==void 0)?Am:"other"
};
function X(Ao,Ap,An,Am){p.call(this,Ao,Ap);
this.offset=An;
this.pluralCat=Am
}function P(){}P.prototype=p.prototype;
X.prototype=new P();
X.prototype.categorizeValue=function AY(An){if(isNaN(An)){return"other"
}else{if(this.choices[An]!==void 0){return An
}else{var Am=this.pluralCat(An-this.offset);
return(this.choices[Am]!==void 0)?Am:"other"
}}};
function K(Am,An){this.trustedContext=Am;
this.allOrNothing=An;
this.textParts=[];
this.expressionFns=[];
this.expressionIndices=[];
this.partialText="";
this.concatParts=null
}K.prototype.flushPartialText=function b(){if(this.partialText){if(this.concatParts==null){this.textParts.push(this.partialText)
}else{this.textParts.push(this.concatParts.join(""));
this.concatParts=null
}this.partialText=""
}};
K.prototype.addText=function c(Am){if(Am.length){if(!this.partialText){this.partialText=Am
}else{if(this.concatParts){this.concatParts.push(Am)
}else{this.concatParts=[this.partialText,Am]
}}}};
K.prototype.addExpressionFn=function A(Am){this.flushPartialText();
this.expressionIndices.push(this.textParts.length);
this.expressionFns.push(Am);
this.textParts.push("")
};
K.prototype.getExpressionValues=function Aa(Ao){var Am=new Array(this.expressionFns.length);
for(var An=0;
An<this.expressionFns.length;
An++){Am[An]=this.expressionFns[An](Ao)
}return Am
};
K.prototype.getResult=function AB(An){for(var Ao=0;
Ao<this.expressionIndices.length;
Ao++){var Am=An[Ao];
if(this.allOrNothing&&Am===void 0){return 
}this.textParts[this.expressionIndices[Ao]]=Am
}return this.textParts.join("")
};
K.prototype.toParsedFn=function D(Am,Ar){var An=this;
this.flushPartialText();
if(Am&&this.expressionFns.length===0){return void 0
}if(this.textParts.length===0){return J("")
}if(this.trustedContext&&this.textParts.length>1){l.throwNoconcat(Ar)
}if(this.expressionFns.length===0){if(this.textParts.length!=1){this.errorInParseLogic()
}return J(this.textParts[0])
}var Aq=function(As){return An.getResult(An.getExpressionValues(As))
};
Aq["$$watchDelegate"]=function Ap(At,Au,As){return An.watchDelegate(At,Au,As)
};
Aq.exp=Ar;
Aq.expressions=new Array(this.expressionFns.length);
for(var Ao=0;
Ao<this.expressionFns.length;
Ao++){Aq.expressions[Ao]=this.expressionFns[Ao]["exp"]
}return Aq
};
K.prototype.watchDelegate=function L(Ao,Ap,Am){var An=new Ad(this,Ao,Ap,Am);
return function(){An.cancelWatch()
}
};
function Ad(Ap,Ao,Aq,Am){this.interpolationParts=Ap;
this.scope=Ao;
this.previousResult=(void 0);
this.listener=Aq;
var An=this;
this.expressionFnsWatcher=Ao["$watchGroup"](Ap.expressionFns,function(As,Ar){An.watchListener(As,Ar)
})
}Ad.prototype.watchListener=function Y(Ao,An){var Am=this.interpolationParts.getResult(Ao);
if(AV(this.listener)){this.listener.call(null,Am,Ao===An?Am:this.previousResult,this.scope)
}this.previousResult=Am
};
Ad.prototype.cancelWatch=function AT(){this.expressionFnsWatcher()
};
function Ak(Am,An){An.expressionFn=Am.expressionFn;
An.expressionMinusOffsetFn=Am.expressionMinusOffsetFn;
An.pluralOffset=Am.pluralOffset;
An.choices=Am.choices;
An.choiceKey=Am.choiceKey;
An.interpolationParts=Am.interpolationParts;
An.ruleChoiceKeyword=Am.ruleChoiceKeyword;
An.msgStartIndex=Am.msgStartIndex;
An.expressionStartIndex=Am.expressionStartIndex
}function z(Am){Ak(Am,this)
}function AE(At,As,Aq,Ap,Am,An,Ao,Ar){this.text=At;
this.index=As||0;
this.$parse=Aq;
this.pluralCat=Ap;
this.stringifier=Am;
this.mustHaveExpression=!!An;
this.trustedContext=Ao;
this.allOrNothing=!!Ar;
this.expressionFn=null;
this.expressionMinusOffsetFn=null;
this.pluralOffset=null;
this.choices=null;
this.choiceKey=null;
this.interpolationParts=null;
this.msgStartIndex=null;
this.nestedStateStack=[];
this.parsedFn=null;
this.rule=null;
this.ruleStack=null;
this.ruleChoiceKeyword=null;
this.interpNestLevel=null;
this.expressionStartIndex=null;
this.stringStartIndex=null;
this.stringQuote=null;
this.stringInterestsRe=null;
this.angularOperatorStack=null;
this.textPart=null
}var E=new z(new AE("",0,null,null,null,false,null,false));
AE.prototype.pushState=function AQ(){this.nestedStateStack.push(new z(this));
Ak(E,this)
};
AE.prototype.popState=function Ae(){if(this.nestedStateStack.length===0){this.errorInParseLogic()
}var Am=this.nestedStateStack.pop();
Ak(Am,this)
};
AE.prototype.matchRe=function W(Ao,An){Ao.lastIndex=this.index;
var Am=Ao.exec(this.text);
if(Am!=null&&(An===true||(Am.index==this.index))){this.index=Ao.lastIndex;
return Am
}return null
};
AE.prototype.searchRe=function AL(Am){return this.matchRe(Am,true)
};
AE.prototype.consumeRe=function Z(Am){return !!this.matchRe(Am)
};
AE.prototype.run=function AX(Am){this.ruleStack=[Am];
do{this.rule=this.ruleStack.pop();
while(this.rule){this.rule()
}this.assertRuleOrNull(this.rule)
}while(this.ruleStack.length>0)
};
AE.prototype.errorInParseLogic=function Ab(){throw l("logicbug","The messageformat parser has encountered an internal error.  Please file a github issue against the AngularJS project and provide this message text that triggers the bug.  Text: “{0}”",this.text)
};
AE.prototype.assertRuleOrNull=function AJ(Am){if(Am===void 0){this.errorInParseLogic()
}};
var w=/\s*(\w+)\s*/g;
AE.prototype.errorExpecting=function f(){var An=this.matchRe(w),Am;
if(An==null){Am=O(this.text,this.index);
throw l("reqarg","Expected one of “plural” or “select” at line {0}, column {1} of text “{2}”",Am.line,Am.column,this.text)
}var Ao=An[1];
if(Ao=="select"||Ao=="plural"){Am=O(this.text,this.index);
throw l("reqcomma","Expected a comma after the keyword “{0}” at line {1}, column {2} of text “{3}”",Ao,Am.line,Am.column,this.text)
}else{Am=O(this.text,this.index);
throw l("unknarg","Unsupported keyword “{0}” at line {0}, column {1}. Only “plural” and “select” are currently supported.  Text: “{3}”",Ao,Am.line,Am.column,this.text)
}};
var AR=/['"]/g;
AE.prototype.ruleString=function Af(){var An=this.matchRe(AR);
if(An==null){var Am=O(this.text,this.index);
throw l("wantstring","Expected the beginning of a string at line {0}, column {1} in text “{2}”",Am.line,Am.column,this.text)
}this.startStringAtMatch(An)
};
AE.prototype.startStringAtMatch=function o(Am){this.stringStartIndex=Am.index;
this.stringQuote=Am[0];
this.stringInterestsRe=this.stringQuote=="'"?AP:V;
this.rule=this.ruleInsideString
};
var AP=/\\(?:\\|'|u[0-9A-Fa-f]{4}|x[0-9A-Fa-f]{2}|[0-7]{3}|\r\n|\n|[\s\S])|'/g;
var V=/\\(?:\\|"|u[0-9A-Fa-f]{4}|x[0-9A-Fa-f]{2}|[0-7]{3}|\r\n|\n|[\s\S])|"/g;
AE.prototype.ruleInsideString=function d(){var An=this.searchRe(this.stringInterestsRe);
if(An==null){var Am=O(this.text,this.stringStartIndex);
throw l("untermstr","The string beginning at line {0}, column {1} is unterminated in text “{2}”",Am.line,Am.column,this.text)
}var Ao=An[0];
if(An==this.stringQuote){this.rule=null
}};
var n=/\s*(plural|select)\s*,\s*/g;
AE.prototype.rulePluralOrSelect=function x(){var An=this.searchRe(n);
if(An==null){this.errorExpecting()
}var Am=An[1];
switch(Am){case"plural":this.rule=this.rulePluralStyle;
break;
case"select":this.rule=this.ruleSelectStyle;
break;
default:this.errorInParseLogic()
}};
AE.prototype.rulePluralStyle=function N(){this.choices=Object.create(null);
this.ruleChoiceKeyword=this.rulePluralValueOrKeyword;
this.rule=this.rulePluralOffset
};
AE.prototype.ruleSelectStyle=function U(){this.choices=Object.create(null);
this.ruleChoiceKeyword=this.ruleSelectKeyword;
this.rule=this.ruleSelectKeyword
};
var R=/[0]|(?:[1-9][0-9]*)/g;
var AU=new RegExp("\\s*offset\\s*:\\s*("+R.source+")","g");
AE.prototype.rulePluralOffset=function y(){var Am=this.matchRe(AU);
this.pluralOffset=(Am==null)?0:parseInt(Am[1],10);
this.expressionMinusOffsetFn=AA(this.expressionFn,this.pluralOffset);
this.rule=this.rulePluralValueOrKeyword
};
AE.prototype.assertChoiceKeyIsNew=function Al(Ao,An){if(this.choices[Ao]!==void 0){var Am=O(this.text,An);
throw l("dupvalue","The choice “{0}” is specified more than once. Duplicate key is at line {1}, column {2} in text “{3}”",Ao,Am.line,Am.column,this.text)
}};
var I=/\s*(\w+)/g;
AE.prototype.ruleSelectKeyword=function Q(){var Am=this.matchRe(I);
if(Am==null){this.parsedFn=new G(this.expressionFn,this.choices).parsedFn;
this.rule=null;
return 
}this.choiceKey=Am[1];
this.assertChoiceKeyIsNew(this.choiceKey,Am.index);
this.rule=this.ruleMessageText
};
var u=new RegExp("\\s*(?:(?:=("+R.source+"))|(\\w+))","g");
AE.prototype.rulePluralValueOrKeyword=function AF(){var Am=this.matchRe(u);
if(Am==null){this.parsedFn=new X(this.expressionFn,this.choices,this.pluralOffset,this.pluralCat).parsedFn;
this.rule=null;
return 
}if(Am[1]!=null){this.choiceKey=parseInt(Am[1],10)
}else{this.choiceKey=Am[2]
}this.assertChoiceKeyIsNew(this.choiceKey,Am.index);
this.rule=this.ruleMessageText
};
var g=/\s*{/g;
var AS=/}/g;
AE.prototype.ruleMessageText=function a(){if(!this.consumeRe(g)){var Am=O(this.text,this.index);
throw l("reqopenbrace","The plural choice “{0}” must be followed by a message in braces at line {1}, column {2} in text “{3}”",this.choiceKey,Am.line,Am.column,this.text)
}this.msgStartIndex=this.index;
this.interpolationParts=new K(this.trustedContext,this.allOrNothing);
this.rule=this.ruleInInterpolationOrMessageText
};
var h=/\\.|{{|}/g;
var j=/\\.|{{|#|}/g;
var t=/\\.|{{/g;
AE.prototype.advanceInInterpolationOrMessageText=function e(){var An=this.index,Ao,Aq;
if(this.ruleChoiceKeyword==null){Ao=this.searchRe(t);
if(Ao==null){this.textPart=this.text.substring(An);
this.index=this.text.length;
return null
}}else{Ao=this.searchRe(this.ruleChoiceKeyword==this.rulePluralValueOrKeyword?j:h);
if(Ao==null){var Am=O(this.text,this.msgStartIndex);
throw l("reqendbrace","The plural/select choice “{0}” message starting at line {1}, column {2} does not have an ending closing brace. Text “{3}”",this.choiceKey,Am.line,Am.column,this.text)
}}var Ap=Ao[0];
this.textPart=this.text.substring(An,Ao.index);
return Ap
};
AE.prototype.ruleInInterpolationOrMessageText=function H(){var Am=this.index;
var An=this.advanceInInterpolationOrMessageText();
if(An==null){this.index=this.text.length;
this.interpolationParts.addText(this.text.substring(Am));
this.rule=null;
return 
}if(An[0]=="\\"){this.interpolationParts.addText(this.textPart+An[1]);
return 
}this.interpolationParts.addText(this.textPart);
if(An=="{{"){this.pushState();
this.ruleStack.push(this.ruleEndMustacheInInterpolationOrMessage);
this.rule=this.ruleEnteredMustache
}else{if(An=="}"){this.choices[this.choiceKey]=this.interpolationParts.toParsedFn(false,this.text);
this.rule=this.ruleChoiceKeyword
}else{if(An=="#"){this.interpolationParts.addExpressionFn(this.expressionMinusOffsetFn)
}else{this.errorInParseLogic()
}}}};
AE.prototype.ruleInterpolate=function k(){this.interpolationParts=new K(this.trustedContext,this.allOrNothing);
this.rule=this.ruleInInterpolation
};
AE.prototype.ruleInInterpolation=function Ah(){var Am=this.index;
var An=this.searchRe(t);
if(An==null){this.index=this.text.length;
this.interpolationParts.addText(this.text.substring(Am));
this.parsedFn=this.interpolationParts.toParsedFn(this.mustHaveExpression,this.text);
this.rule=null;
return 
}var Ao=An[0];
if(Ao[0]=="\\"){this.interpolationParts.addText(this.text.substring(Am,An.index)+Ao[1]);
return 
}this.interpolationParts.addText(this.text.substring(Am,An.index));
this.pushState();
this.ruleStack.push(this.ruleInterpolationEndMustache);
this.rule=this.ruleEnteredMustache
};
AE.prototype.ruleInterpolationEndMustache=function AH(){var Am=this.parsedFn;
this.popState();
this.interpolationParts.addExpressionFn(Am);
this.rule=this.ruleInInterpolation
};
AE.prototype.ruleEnteredMustache=function C(){this.parsedFn=null;
this.ruleStack.push(this.ruleEndMustache);
this.rule=this.ruleAngularExpression
};
AE.prototype.ruleEndMustacheInInterpolationOrMessage=function i(){var Am=this.parsedFn;
this.popState();
this.interpolationParts.addExpressionFn(Am);
this.rule=this.ruleInInterpolationOrMessageText
};
var m=/\s*}}/g;
AE.prototype.ruleEndMustache=function AK(){var An=this.matchRe(m);
if(An==null){var Am=O(this.text,this.index);
throw l("reqendinterp","Expecting end of interpolation symbol, “{0}”, at line {1}, column {2} in text “{3}”","}}",Am.line,Am.column,this.text)
}if(this.parsedFn==null){this.parsedFn=this.$parse(this.expressionFn,this.stringifier);
this.parsedFn.exp=this.expressionFn.exp;
this.parsedFn.expressions=this.expressionFn.expressions
}this.rule=null
};
AE.prototype.ruleAngularExpression=function M(){this.angularOperatorStack=[];
this.expressionStartIndex=this.index;
this.rule=this.ruleInAngularExpression
};
function B(Am){switch(Am){case"{":return"}";
case"[":return"]";
case"(":return")";
default:return null
}}function s(Am){switch(Am){case"}":return"{";
case"]":return"[";
case")":return"(";
default:return null
}}var r=/[[\]{}()'",]/g;
AE.prototype.ruleInAngularExpression=function q(){var Ar=this.index;
var Aq=this.searchRe(r);
var Am;
if(Aq==null){if(this.angularOperatorStack.length===0){this.index=this.text.length;
this.expressionFn=this.$parse(this.text.substring(this.expressionStartIndex,this.index));
this.expressionFn.exp=this.text.substring(this.expressionStartIndex,this.index);
this.expressionFn.expressions=this.expressionFn.expressions;
this.rule=null;
return 
}var Ao=this.angularOperatorStack[0];
throw l("badexpr","Unexpected end of Angular expression.  Expecting operator “{0}” at the end of the text “{1}”",this.getEndOperator(Ao),this.text)
}var An=Aq[0];
if(An=="'"||An=='"'){this.ruleStack.push(this.ruleInAngularExpression);
this.startStringAtMatch(Aq);
return 
}if(An==","){if(this.trustedContext){Am=O(this.text,this.index);
throw l("unsafe","Use of select/plural MessageFormat syntax is currently disallowed in a secure context ({0}).  At line {1}, column {2} of text “{3}”",this.trustedContext,Am.line,Am.column,this.text)
}if(this.angularOperatorStack.length===0){this.expressionFn=this.$parse(this.text.substring(this.expressionStartIndex,Aq.index));
this.expressionFn.exp=this.text.substring(this.expressionStartIndex,Aq.index);
this.expressionFn.expressions=this.expressionFn.expressions;
this.rule=null;
this.rule=this.rulePluralOrSelect
}return 
}if(B(An)!=null){this.angularOperatorStack.unshift(An);
return 
}var Ap=s(An);
if(Ap==null){this.errorInParseLogic()
}if(this.angularOperatorStack.length>0){if(Ap==this.angularOperatorStack[0]){this.angularOperatorStack.shift();
return 
}Am=O(this.text,this.index);
throw l("badexpr","Unexpected operator “{0}” at line {1}, column {2} in text. Was expecting “{3}”. Text: “{4}”",An,Am.line,Am.column,B(this.angularOperatorStack[0]),this.text)
}this.index=Aq.index;
this.expressionFn=this.$parse(this.text.substring(this.expressionStartIndex,this.index));
this.expressionFn.exp=this.text.substring(this.expressionStartIndex,this.index);
this.expressionFn.expressions=this.expressionFn.expressions;
this.rule=null
};
var AG=["$parse","$locale","$sce","$exceptionHandler",function T(Ar,Ap,Am,Aq){function An(At,Au,Av){return function As(Ax){try{Ax=At?Am.getTrusted(At,Ax):Am.valueOf(Ax);
return Au&&(Ax===void 0)?Ax:v(Ax)
}catch(Aw){Aq(l.interr(Av,Aw))
}}
}function Ao(Aw,At,Au,Av){var As=An(Au,Av,Aw);
var Ax=new AE(Aw,0,Ar,Ap.pluralCat,As,At,Au,Av);
Ax.run(Ax.ruleInterpolate);
return Ax.parsedFn
}return{interpolate:Ao}
}];
var AZ=["$$messageFormat","$delegate",function AZ(An,Ao){if(Ao.startSymbol()!="{{"||Ao.endSymbol()!="}}"){throw l("nochgmustache","angular-message-format.js currently does not allow you to use custom start and end symbols for interpolation.")
}var Am=An.interpolate;
Am.startSymbol=Ao.startSymbol;
Am.endSymbol=Ao.endSymbol;
return Am
}];
var Aj=Ac.angular["module"]("ngMessageFormat",["ng"]);
Aj.factory("$$messageFormat",AG);
Aj.config(["$provide",function(Am){Am.decorator("$interpolate",AZ)
}])
})(window,window.angular);