(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-cashier"],{"01ce":function(t,n,e){"use strict";var a=e("86b8"),o=e.n(a);o.a},"4baf":function(t,n,e){"use strict";e.r(n);var a=e("8596"),o=e("957d");for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);e("01ce");var r,s=e("f0c5"),c=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,"4e0af758",null,!1,a["a"],r);n["default"]=c.exports},"501b":function(t,n,e){var a=e("24fb");n=a(!1),n.push([t.i,"uni-page-body[data-v-4e0af758]{background:#f3f3f3}.margin[data-v-4e0af758]{margin:%?20?% 0;background-color:#fff}.border-bottom[data-v-4e0af758]{border-bottom:1px solid #ededed}.payway[data-v-4e0af758]{background-color:#fff}.payway uni-image[data-v-4e0af758]{width:%?60?%;height:%?60?%;margin-right:%?30?%}.payway uni-image[data-v-4e0af758],\n.payway uni-text[data-v-4e0af758],\n.payway uni-radio[data-v-4e0af758]{display:inline-block;vertical-align:middle}.payway uni-radio[data-v-4e0af758]{margin-top:%?10?%}.btn[data-v-4e0af758]{width:80%;height:%?75?%;background:#ff6d7e!important;border-radius:0;margin:%?80?% auto 0;text-align:center;line-height:%?75?%;letter-spacing:4px;color:#fff;font-size:%?34?%}body.?%PAGE?%[data-v-4e0af758]{background:#f3f3f3}",""]),t.exports=n},"78f3":function(t,n,e){"use strict";var a=e("ee27");e("99af"),e("d3b7"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,e("96cf");var o=a(e("c964")),i={data:function(){return{uid:"",token:"",type:"",platform:"",contact:"",money:"",orderno:"",loading:!1,price:.01,providerList:[]}},onLoad:function(t){this.platform=uni.getSystemInfoSync().platform;var n=uni.getStorageSync("userInfo");""!=n&null!=n&void 0!=n&&(this.uid=n.uid,this.token=n.token),this.contact=t.contact,this.orderno=t.orderId,this.money=t.money,this.getProviders()},methods:{to:function(t){},radioChange:function(t){this.type=t.detail.value,"rest"==this.type?this.restPay():this.requestPayment(this.type)},getProviders:function(){},weixinPay:function(){var t=this;console.log("发起支付"),this.loading=!0,uni.login({success:function(n){console.log("login success",n),uni.request({url:"https://unidemo.dcloud.net.cn/payment/wx/mp?code=".concat(n.code,"&amount=").concat(t.price),success:function(n){if(console.log("pay request success",n),200===n.statusCode)if(0===n.data.ret){console.log("得到接口prepay_id",n.data.payment);var e=n.data.payment;uni.requestPayment({timeStamp:e.timeStamp,nonceStr:e.nonceStr,package:e.package,signType:"MD5",paySign:e.paySign,success:function(t){uni.showToast({title:"感谢您的赞助!"})},fail:function(t){uni.showModal({content:"支付失败,原因为: "+t.errMsg,showCancel:!1})},complete:function(){t.loading=!1}})}else uni.showModal({content:n.data.desc,showCancel:!1});else uni.showModal({content:"支付失败，请重试！",showCancel:!1})},fail:function(n){console.log("fail",n),t.loading=!1,uni.showModal({content:"支付失败,原因为: "+n.errMsg,showCancel:!1})}})},fail:function(n){console.log("fail",n),t.loading=!1,uni.showModal({content:"支付失败,原因为: "+n.errMsg,showCancel:!1})}})},requestPayment:function(t){var n=this;return(0,o.default)(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n.loading=!0,e.next=3,n.getOrderInfo(t);case 3:if(a=e.sent,console.log(a),console.log("得到订单信息",a),200===a.statusCode){e.next=10;break}return console.log("获得订单信息失败",a),uni.showModal({content:"获得订单信息失败",showCancel:!1}),e.abrupt("return");case 10:uni.requestPayment({provider:t,orderInfo:a.data,success:function(t){console.log("success",t),uni.showToast({title:"感谢您的赞助!"})},fail:function(t){console.log("fail",t),uni.showModal({content:"支付失败,原因为: "+t.errMsg,showCancel:!1})},complete:function(){n.loading=!1}});case 11:case"end":return e.stop()}}),e)})))()},getOrderInfo:function(t){var n="",e="https://demo.dcloud.net.cn/payment/?payid="+t+"&appid="+n+"&total="+this.price;return new Promise((function(t){uni.request({url:e,success:function(n){t(n)},fail:function(n){t(n)}})}))},restPay:function(){this.$loading();var t=this,n={uid:this.uid,token:this.token,orderno:this.orderno},e="&r=api.member.order.pay";this.$apiPost(e,n).then((function(n){uni.hideLoading(),t.$msg("支付成功"),uni.$emit("updateOrder"),setTimeout((function(){uni.redirectTo({url:"./payResult?contact="+t.contact+"&money="+t.money+"&orderno="+t.orderno})}),1e3)}))}}};n.default=i},8596:function(t,n,e){"use strict";var a,o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",[e("v-uni-view",{staticClass:" margin"},[e("v-uni-view",{staticClass:"border-bottom padding"},[e("v-uni-text",[t._v("订单编号")]),e("v-uni-text",{staticClass:"fr"},[t._v(t._s(t.orderno))])],1),e("v-uni-view",{staticClass:"padding"},[e("v-uni-text",[t._v("订单金额")]),e("v-uni-text",{staticClass:"fr cr"},[t._v("￥"+t._s(t.money))])],1)],1),e("v-uni-view",{staticClass:"payway"},[e("v-uni-radio-group",{on:{change:function(n){arguments[0]=n=t.$handleEvent(n),t.radioChange.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"padding"},[e("v-uni-image",{attrs:{src:"",mode:""}}),e("v-uni-text",[t._v("余额支付")]),e("v-uni-radio",{staticClass:"fr",staticStyle:{transform:"scale(0.7)"},attrs:{value:"rest"}})],1)],1)],1)],1)},i=[];e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return a}))},"86b8":function(t,n,e){var a=e("501b");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=e("4f06").default;o("6f94eb1d",a,!0,{sourceMap:!1,shadowMode:!1})},"957d":function(t,n,e){"use strict";e.r(n);var a=e("78f3"),o=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n["default"]=o.a}}]);