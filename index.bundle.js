!function(t){var o={};function n(e){if(o[e])return o[e].exports;var r=o[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=o,n.d=function(t,o,e){n.o(t,o)||Object.defineProperty(t,o,{enumerable:!0,get:e})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,o){if(1&o&&(t=n(t)),8&o)return t;if(4&o&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(n.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&o&&"string"!=typeof t)for(var r in t)n.d(e,r,function(o){return t[o]}.bind(null,r));return e},n.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(o,"a",o),o},n.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},n.p="",n(n.s=35)}([function(t,o){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,o){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,o){var n=t.exports={version:"2.6.11"};"number"==typeof __e&&(__e=n)},function(t,o,n){var e=n(13),r=n(18);t.exports=n(4)?function(t,o,n){return e.f(t,o,r(1,n))}:function(t,o,n){return t[o]=n,t}},function(t,o,n){t.exports=!n(5)((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},function(t,o){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,o){var n=0,e=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+e).toString(36))}},function(t,o,n){var e=n(2),r=n(0),i=r["__core-js_shared__"]||(r["__core-js_shared__"]={});(t.exports=function(t,o){return i[t]||(i[t]=void 0!==o?o:{})})("versions",[]).push({version:e.version,mode:n(22)?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,o,n){var e=n(23);t.exports=function(t,o,n){if(e(t),void 0===o)return t;switch(n){case 1:return function(n){return t.call(o,n)};case 2:return function(n,e){return t.call(o,n,e)};case 3:return function(n,e,r){return t.call(o,n,e,r)}}return function(){return t.apply(o,arguments)}}},function(t,o){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,o,n){var e=n(7)("wks"),r=n(6),i=n(0).Symbol,c="function"==typeof i;(t.exports=function(t){return e[t]||(e[t]=c&&i[t]||(c?i:r)("Symbol."+t))}).store=e},function(t,o,n){"use strict";var e=n(12),r=n(24)(5),i=!0;"find"in[]&&Array(1).find((function(){i=!1})),e(e.P+e.F*i,"Array",{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),n(33)("find")},function(t,o,n){var e=n(0),r=n(2),i=n(3),c=n(19),a=n(8),s=function(t,o,n){var u,l,f,p,d=t&s.F,v=t&s.G,h=t&s.S,y=t&s.P,m=t&s.B,x=v?e:h?e[o]||(e[o]={}):(e[o]||{}).prototype,b=v?r:r[o]||(r[o]={}),_=b.prototype||(b.prototype={});for(u in v&&(n=o),n)f=((l=!d&&x&&void 0!==x[u])?x:n)[u],p=m&&l?a(f,e):y&&"function"==typeof f?a(Function.call,f):f,x&&c(x,u,f,t&s.U),b[u]!=f&&i(b,u,p),y&&_[u]!=f&&(_[u]=f)};e.core=r,s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},function(t,o,n){var e=n(14),r=n(15),i=n(17),c=Object.defineProperty;o.f=n(4)?Object.defineProperty:function(t,o,n){if(e(t),o=i(o,!0),e(n),r)try{return c(t,o,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[o]=n.value),t}},function(t,o,n){var e=n(1);t.exports=function(t){if(!e(t))throw TypeError(t+" is not an object!");return t}},function(t,o,n){t.exports=!n(4)&&!n(5)((function(){return 7!=Object.defineProperty(n(16)("div"),"a",{get:function(){return 7}}).a}))},function(t,o,n){var e=n(1),r=n(0).document,i=e(r)&&e(r.createElement);t.exports=function(t){return i?r.createElement(t):{}}},function(t,o,n){var e=n(1);t.exports=function(t,o){if(!e(t))return t;var n,r;if(o&&"function"==typeof(n=t.toString)&&!e(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!e(r=n.call(t)))return r;if(!o&&"function"==typeof(n=t.toString)&&!e(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,o){t.exports=function(t,o){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:o}}},function(t,o,n){var e=n(0),r=n(3),i=n(20),c=n(6)("src"),a=n(21),s=(""+a).split("toString");n(2).inspectSource=function(t){return a.call(t)},(t.exports=function(t,o,n,a){var u="function"==typeof n;u&&(i(n,"name")||r(n,"name",o)),t[o]!==n&&(u&&(i(n,c)||r(n,c,t[o]?""+t[o]:s.join(String(o)))),t===e?t[o]=n:a?t[o]?t[o]=n:r(t,o,n):(delete t[o],r(t,o,n)))})(Function.prototype,"toString",(function(){return"function"==typeof this&&this[c]||a.call(this)}))},function(t,o){var n={}.hasOwnProperty;t.exports=function(t,o){return n.call(t,o)}},function(t,o,n){t.exports=n(7)("native-function-to-string",Function.toString)},function(t,o){t.exports=!1},function(t,o){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,o,n){var e=n(8),r=n(25),i=n(26),c=n(28),a=n(30);t.exports=function(t,o){var n=1==t,s=2==t,u=3==t,l=4==t,f=6==t,p=5==t||f,d=o||a;return function(o,a,v){for(var h,y,m=i(o),x=r(m),b=e(a,v,3),_=c(x.length),g=0,w=n?d(o,_):s?d(o,0):void 0;_>g;g++)if((p||g in x)&&(y=b(h=x[g],g,m),t))if(n)w[g]=y;else if(y)switch(t){case 3:return!0;case 5:return h;case 6:return g;case 2:w.push(h)}else if(l)return!1;return f?-1:u||l?l:w}}},function(t,o,n){var e=n(9);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==e(t)?t.split(""):Object(t)}},function(t,o,n){var e=n(27);t.exports=function(t){return Object(e(t))}},function(t,o){t.exports=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}},function(t,o,n){var e=n(29),r=Math.min;t.exports=function(t){return t>0?r(e(t),9007199254740991):0}},function(t,o){var n=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:n)(t)}},function(t,o,n){var e=n(31);t.exports=function(t,o){return new(e(t))(o)}},function(t,o,n){var e=n(1),r=n(32),i=n(10)("species");t.exports=function(t){var o;return r(t)&&("function"!=typeof(o=t.constructor)||o!==Array&&!r(o.prototype)||(o=void 0),e(o)&&null===(o=o[i])&&(o=void 0)),void 0===o?Array:o}},function(t,o,n){var e=n(9);t.exports=Array.isArray||function(t){return"Array"==e(t)}},function(t,o,n){var e=n(10)("unscopables"),r=Array.prototype;null==r[e]&&n(3)(r,e,{}),t.exports=function(t){r[e][t]=!0}},function(t,o,n){},function(t,o,n){"use strict";n.r(o);n(11),n(34);function e(t){var o=$(t);o.hasClass("full_open")||o.addClass("full_open")}function r(t){var o=t.data("key");$(".scene_type").removeClass("nav_act"),$("#".concat(o)).addClass("nav_act"),$(".scene_container").removeClass("show"),e("#sceneModel");var n=$("#".concat(o,"Container"));n&&(n.addClass("show"),n.data("loaded"))}var i={home:function(){e("#homeModel")},new:"",myScenes:r,scenes:r,save:"",saveAs:"",exit:"",plc:function(){e("#plcModel")},showToolBox:function(){var t=$("#toolbox"),o=$("#toolContainer"),n=$("#checkToolBox"),e=$(".tool_app");t.hasClass("tool_show")?(e.removeClass("tool_act"),t.removeClass("tool_show"),n.removeClass("tool_checked"),o.getNiceScroll().remove()):(e.addClass("tool_act"),t.addClass("tool_show"),n.addClass("tool_checked"),setTimeout((function(){o.niceScroll({cursorcolor:"#888",cursorborder:""})}),600))},showParam:function(){var t=$("#paramModel"),o=$("#checkParamModel"),n=$(".tool_param");t.fadeToggle(),t.hasClass("model_open")?(n.removeClass("tool_act"),t.removeClass("model_open"),o.removeClass("tool_checked")):(n.addClass("tool_act"),t.addClass("model_open"),o.addClass("tool_checked"))},showProp:"",simulate:WorkspaceSimulate,pausesim:pauseSimulate,reset:resumeSimulate,view:"",closeModel:function(t){var o=t.parents(".full_model");o.hasClass("full_open")&&o.removeClass("full_open")}};Physijs.scripts.worker="assets/js/physijs_worker.js",Physijs.scripts.ammo="ammo.js",window.container=document.getElementById("container"),initScene(),initCamera(),initRender(),initControl(),initdragControl(),function t(){for(var o=0,n=boxObjects.length;o<n;o++)isBoxMove&&boxObjects[o].setLinearVelocity(new THREE.Vector3(boxData[0],boxData[1],boxData[2]));window.controls.update(),render(),requestAnimationFrame(t)}(),window.renderer.domElement.addEventListener("click",(function(){var t=document.getElementById("rightbox");console.log(t.style.display),"none"!=t.style.display&&(t.style.display="none",remove_constrain())})),$((function(){$(".topbar, .full_model").on("click",(function(t){var o=t.target.getAttribute("data-key");if(o){var n=$(t.target);n.hasClass("tool_check")?n.hasClass("tool_checked")?n.removeClass("tool_checked"):n.addClass("tool_checked"):["showParam","showToolBox"].indexOf(o)>-1&&(n.hasClass("tool_act")?n.removeClass("tool_act"):n.addClass("tool_act")),"function"==typeof i[o]&&i[o](n)}})),$(".select_option").on("click","li",(function(){var t=$(this),o=t.parents(".select_box").find("input").eq(0);o.val()!==t.text()&&(o.val(t.text()),o.change())})),$("#toolSelect").on("change",(function(){console.log($(this).val())})),$("#boxX").on("change",(function(){boxData[0]=parseInt($(this).val()),console.log("bd:",boxData)})),$("#boxY").on("change",(function(){boxData[1]=parseInt($(this).val()),console.log("bd:",boxData)})),$("#boxZ").on("change",(function(){boxData[2]=parseInt($(this).val()),console.log("bd:",boxData)})),$("#isBoxMove").on("click",(function(){isBoxMove=!isBoxMove,console.log("bm:",boxData),isBoxMove?$(this).css("background-color",(function(){return"pink"})):$(this).css("background-color",(function(){return"grey"}))}))}))}]);