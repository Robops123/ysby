(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/sharePrompt/sharePrompt"],{"218e":function(e,t,n){"use strict";var r,o=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return r}))},"69ce":function(e,t,n){"use strict";n.r(t);var r=n("fd01"),o=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=o.a},"74f1":function(e,t,n){"use strict";var r=n("e90a"),o=n.n(r);o.a},"8a17":function(e,t,n){"use strict";n.r(t);var r=n("218e"),o=n("69ce");for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);n("74f1");var a,s=n("f0c5"),c=Object(s["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);t["default"]=c.exports},e90a:function(e,t,n){},fd01:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n("4795"));function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n,r,o,i,a){try{var s=e[i](a),c=s.value}catch(u){return void n(u)}s.done?t(c):Promise.resolve(c).then(r,o)}function a(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function s(e){i(a,r,o,s,c,"next",e)}function c(e){i(a,r,o,s,c,"throw",e)}s(void 0)}))}}var s={props:{uid:{type:String},token:{type:String},goodsid:{type:String,default:""},miniProgramPath:{type:String,default:""},alterUrl:{type:String,default:""},show:{type:Boolean,default:!1},shareImg:{type:String},shareTitle:{type:String},shareContent:{type:String}},data:function(){return{popshow:!1,providerList:[],shareType:0,shareText:"嘎哈",visible:!1,spopshow:!1,advImg:"",popupShow:!0}},mounted:function(){this.popshow=this.show,console.log(this.popshow),this.getProvider()},watch:{show:function(e){console.log(e),this.popshow=e}},methods:{getProvider:function(){var t=this;e.getProvider({service:"share",success:function(e){console.log("success",e);for(var n=[],r=0;r<e.provider.length;r++)switch(e.provider[r]){case"weixin":n.push({name:"微信",way:5,id:"weixin",sort:0}),n.push({name:"朋友圈",id:"weixin",way:0,type:"WXSenceTimeline",sort:1});break;default:break}t.providerList=n.sort((function(e,t){return e.sort-t.sort}))},fail:function(t){console.log("获取分享通道失败",t),e.showModal({content:"获取分享通道失败",showCancel:!1})}})},share:function(t){var n=this;return a(r.default.mark((function o(){var i;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:n.$loading(),i={provider:t.id,extra:{scene:"WXSceneSession"},scene:t.type&&"WXSenceTimeline"===t.type?"WXSenceTimeline":"WXSceneSession",type:t.way,success:function(t){console.log("success",t),e.$emit("shareSuccess")},fail:function(t){console.log("fail",t),e.showModal({content:"分享失败",showCancel:!1})},complete:function(){e.hideLoading(),console.log("分享操作结束!")}},r.t0=t.way,r.next=0===r.t0?5:1===r.t0?10:2===r.t0?12:5===r.t0?14:18;break;case 5:return i.summary="",i.imageUrl=n.shareImg?n.shareImg:"/static/img/app.jpg",i.title=n.shareTitle,i.href=n.alterUrl,r.abrupt("break",19);case 10:return i.summary=n.shareText,r.abrupt("break",19);case 12:return i.imageUrl=n.image,r.abrupt("break",19);case 14:return i.imageUrl=n.shareImg?n.shareImg:"/static/img/app.jpg",i.title=n.shareTitle,i.miniProgram={id:"gh_2f5dfaa2fae2",path:n.miniProgramPath,webUrl:n.alterUrl,type:0},r.abrupt("break",19);case 18:return r.abrupt("break",19);case 19:1===i.type&&"qq"===i.provider&&(i.href="https://uniapp.dcloud.io",i.title="欢迎体验uniapp"),e.share(i);case 21:case"end":return r.stop()}}),o)})))()},createPoster:function(){this.$loading();var t=this,n={uid:this.uid,token:this.token,goodsid:this.goodsid,type:3},r="&r=api.common.share.createPoster";this.$apiPost(r,n).then((function(n){t.$emit("poster",n.data.img),t.close(),e.hideLoading()}))},saveImg:function(t){var n=this;n.$loading(),e.downloadFile({url:t,success:function(t){200===t.statusCode&&e.saveImageToPhotosAlbum({filePath:t.tempFilePath,success:function(){n.$msg("保存成功，请到相册中查看"),n.visible=!1},fail:function(){n.$msg("保存失败")},complete:function(){e.hideLoading()}})}})},close:function(){this.popshow=!1,this.$emit("close")}}};t.default=s}).call(this,n("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/sharePrompt/sharePrompt-create-component',
    {
        'components/sharePrompt/sharePrompt-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8a17"))
        })
    },
    [['components/sharePrompt/sharePrompt-create-component']]
]);
