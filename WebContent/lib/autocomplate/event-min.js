angular.module("ui.event",[]).directive("uiEvent",["$parse",function(A){return function(B,E,C){var D=B.$eval(C.uiEvent);
angular.forEach(D,function(H,F){var G=A(H);
E.bind(F,function(I){var J=Array.prototype.slice.call(arguments);
J=J.splice(1);
G(B,{$event:I,$params:J});
if(!B.$$phase){B.$apply()
}})
})
}
}]);