(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/s-popup/index"],{"4ecc":function(e,t,n){"use strict";var i=n("f58f"),o=n.n(i);o.a},5186:function(e,t,n){"use strict";n.r(t);var i=n("f491"),o=n("a6de");for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);n("4ecc");var r,a=n("f0c5"),s=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);t["default"]=s.exports},"5a26":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(n("4795"));function o(e){return e&&e.__esModule?e:{default:e}}function u(e,t,n,i,o,u,r){try{var a=e[u](r),s=a.value}catch(f){return void n(f)}a.done?t(s):Promise.resolve(s).then(i,o)}function r(e){return function(){var t=this,n=arguments;return new Promise((function(i,o){var r=e.apply(t,n);function a(e){u(r,i,o,a,s,"next",e)}function s(e){u(r,i,o,a,s,"throw",e)}a(void 0)}))}}function a(e){return l(e)||c(e)||f(e)||s()}function s(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function f(e,t){if(e){if("string"===typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}function c(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function l(e){if(Array.isArray(e))return p(e)}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}var d=new Map,v=function(){return Math.max.apply(Math,[200].concat(a(d.values())))+1},m={name:"s-popup",props:{customClass:{type:String,default:""},value:Boolean,position:{type:String,default:"center"},effect:{type:Boolean,default:!0},effectDuration:{type:Number,default:300},mask:{type:Boolean,default:!0},maskOpacity:{type:Number,default:.7},maskClose:{type:Boolean,default:!0},duration:{type:Number,default:0},preventTouchmove:{type:Boolean,default:!1},beforeShow:Function,beforeHide:Function},data:function(){return Object.assign(this,{popupId:"s-popup-id-"+Math.random().toString(36).substr(2),visibleId:0,visibleStatus:!1,effectTimeoutId:0,autoCloseTimeoutId:0}),{styleZindex:"",visibleClass:"",styleDuration:"",effectClass:""}},computed:{positionClass:function(){return this.position?"s-popup-position-"+this.position:""}},watch:{value:function(){this.updateVisible()}},methods:{show:function(){var e=this;return r(i.default.mark((function t(){var n,o,u;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.visibleStatus){t.next=14;break}if(e.visibleId++,n=!0,o=e.visibleId,!e.beforeShow){t.next=13;break}return t.prev=5,t.next=8,e.beforeShow.call(e.$parent);case 8:t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](5),n=!1;case 13:o===e.visibleId&&(n?(u=e.effect?e.effectDuration:0,e.visibleStatus=!0,e.$emit("input",!0),d.set(e.popupId,v()),e.styleZindex="z-index:".concat(d.get(e.popupId),";"),e.styleDuration="animation-duration:".concat(u,"ms;"),e.visibleClass="s-popup-visible",e.effectClass="s-popup-effect-enter",clearTimeout(e.effectTimeoutId),e.effectTimeoutId=setTimeout((function(){if(e.styleDuration="",e.effectClass="",e.visibleStatus){e.$emit("show");var t=parseInt(e.duration);t>0&&(clearTimeout(e.autoCloseTimeoutId),e.autoCloseTimeoutId=setTimeout((function(){e.visibleStatus&&e.hide()}),t))}}),u)):e.$emit("input",!1));case 14:case"end":return t.stop()}}),t,null,[[5,10]])})))()},hide:function(){var e=this;return r(i.default.mark((function t(){var n,o,u;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.visibleStatus){t.next=14;break}if(e.visibleId++,n=!0,o=e.visibleId,!e.beforeHide){t.next=13;break}return t.prev=5,t.next=8,e.beforeHide.call(e.$parent);case 8:t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](5),n=!1;case 13:o===e.visibleId&&(n?(u=e.effect?e.effectDuration:0,e.visibleStatus=!1,e.$emit("input",!1),e.styleDuration="animation-duration:"+u+"ms;",e.effectClass="s-popup-effect-leave",clearTimeout(e.autoCloseTimeoutId),clearTimeout(e.effectTimeoutId),e.effectTimeoutId=setTimeout((function(){e.visibleClass="",e.effectClass="",e.styleZindex="",e.styleDuration="",d.delete(e.popupId),e.visibleStatus||e.$emit("hide")}),u)):e.$emit("input",!0));case 14:case"end":return t.stop()}}),t,null,[[5,10]])})))()},updateVisible:function(){var e=this;this.$nextTick((function(){e.visibleStatus!==e.value&&e[e.value?"show":"hide"]()}))}},mounted:function(){this.updateVisible()},beforeDestroy:function(){d.delete(this.popupId),clearTimeout(this.effectTimeoutId),clearTimeout(this.autoCloseTimeoutId)}};t.default=m},a6de:function(e,t,n){"use strict";n.r(t);var i=n("5a26"),o=n.n(i);for(var u in i)"default"!==u&&function(e){n.d(t,e,(function(){return i[e]}))}(u);t["default"]=o.a},f491:function(e,t,n){"use strict";var i,o=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(e){return e.stopPropagation(),e.preventDefault(),function(e){return e.preventDefault()}(e)},e.e1=function(t){e.maskClose&&e.hide()},e.e2=function(e){return e.stopPropagation(),e.preventDefault(),function(e){return e.preventDefault()}(e)})},u=[];n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return i}))},f58f:function(e,t,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/s-popup/index-create-component',
    {
        'components/s-popup/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5186"))
        })
    },
    [['components/s-popup/index-create-component']]
]);
