(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-createOrder"],{"0c93":function(t,i,e){"use strict";e.r(i);var a=e("6737"),s=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(i,t,(function(){return a[t]}))}(o);i["default"]=s.a},"3f5b":function(t,i,e){"use strict";var a,s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticStyle:{"padding-bottom":"80upx"}},[e("v-uni-view",{staticClass:"margin padding s2",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.chooseAddress.apply(void 0,arguments)}}},[e("v-uni-text",[t._v("收货地址")]),e("v-uni-text",{staticClass:"cg fr"},[t._v(t._s(t.address?t.address:"添加收货地址")),e("v-uni-text",{staticClass:"icon-arrow-right iconfont"})],1)],1),e("v-uni-view",{staticClass:"child-overall padding margin"},[e("v-uni-view",{staticClass:"child-overall-item"},[e("v-uni-image",{attrs:{src:t.goodsImg,mode:""}}),e("v-uni-view",{staticClass:"info"},[e("v-uni-view",[e("v-uni-view",{staticClass:"s2 title"},[t._v(t._s(t.goodsName))]),e("v-uni-view",{staticClass:"s3 cg options"},[t._v(t._s(t.spec))])],1),e("v-uni-view",{staticClass:"s3",staticStyle:{"text-align":"right"}},[e("v-uni-view",{},[t._v("￥"+t._s(t.form.goodsprice))]),e("v-uni-view",{staticClass:" cg"},[t._v("*"+t._s(t.form.amount))])],1)],1)],1),e("v-uni-view",{staticClass:"bottom-content"},[e("v-uni-text",{staticStyle:{"line-height":"60upx"}},[t._v("购买数量")]),e("v-uni-view",{staticClass:"calculator fr"},[e("v-uni-view",{staticClass:"calc minus",class:{disabled:t.disabled1},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.minus.apply(void 0,arguments)}}},[t._v("-")]),e("v-uni-text",{staticClass:"result"},[t._v(t._s(t.form.amount))]),e("v-uni-view",{staticClass:"calc plus",class:{disabled:t.disabled2},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.plus.apply(void 0,arguments)}}},[t._v("+")])],1)],1),e("v-uni-view",{staticStyle:{"text-align":"right",margin:"70upx 0 0"}},[t._v("共"+t._s(t.form.amount)+"件商品 共计:"),e("v-uni-text",{staticClass:"cr"},[t._v("￥"+t._s(t.form.goodsprice*t.form.amount))])],1)],1),e("v-uni-view",{staticClass:"margin padding msg"},[e("v-uni-text",[t._v("买家留言")]),e("v-uni-textarea",{attrs:{maxlength:"50",placeholder:"50字以内(选填)"},model:{value:t.form.remark,callback:function(i){t.$set(t.form,"remark",i)},expression:"form.remark"}})],1),e("v-uni-view",{staticClass:"padding conclude"},[e("v-uni-view",[e("v-uni-text",[t._v("商品小计")]),e("v-uni-text",{staticClass:"fr"},[t._v("￥"+t._s(t.form.goodsprice*t.form.amount))])],1),e("v-uni-view",[e("v-uni-text",[t._v("运费")]),e("v-uni-text",{staticClass:"fr"},[t._v("￥"+t._s(t.freight||0))])],1)],1),e("v-uni-view",{staticClass:"bottom"},[e("v-uni-view",{staticClass:"bottom-right",staticStyle:{"text-align":"right"}},[e("v-uni-text",{staticClass:"s2 cg"},[t._v("共"+t._s(t.form.amount)+"件,")]),e("v-uni-text",{staticClass:"cg s1"},[t._v("合计:")]),e("v-uni-text",{staticClass:"cr",staticStyle:{"font-size":"34upx"}},[t._v("￥"+t._s(t.totalMoney))]),e("v-uni-button",{attrs:{type:"warn"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.createOrder.apply(void 0,arguments)}}},[t._v("立即支付")])],1)],1)],1)},o=[];e.d(i,"b",(function(){return s})),e.d(i,"c",(function(){return o})),e.d(i,"a",(function(){return a}))},"48d4":function(t,i,e){"use strict";var a=e("a9da"),s=e.n(a);s.a},6737:function(t,i,e){"use strict";e("4160"),e("a15b"),e("159b"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a={data:function(){return{form:{uid:"",token:"",goodsid:"",addressid:"",remark:"",specifications:"",amount:"",goodsprice:"",skuidsort:""},freight:"",address:"",spec:"",goodsImg:"",goodsName:"",total:"",contact:{}}},computed:{disabled1:function(){return this.form.amount<=1},disabled2:function(){return this.form.amount>=this.total||this.form.amount>49},totalMoney:function(){return this.form.goodsprice*this.form.amount+(this.freight||0)}},onLoad:function(t){var i=uni.getStorageSync("userInfo");""!=i&null!=i&void 0!=i&&(this.form.uid=i.uid,this.form.token=i.token,this.getAddressList());var e=JSON.parse(t.choosedSpec);this.form.skuidsort=e.choosedid.join(","),this.spec=e.selectArr,this.goodsImg=e.goodsImg,this.form.goodsid=t.goodsId,this.goodsName=t.goodsName,this.total=e.stock||t.total,this.form.amount=e.selectNum||1,this.form.specifications=e.selectArr||"",this.form.goodsprice=e.marketPrice||t.marketprice},methods:{minus:function(){this.disabled1||--this.form.amount},plus:function(){this.disabled2||++this.form.amount},createOrder:function(){var t=this;this.$loading();var i=this,e="&r=api.member.order.create",a={uid:this.form.uid,token:this.form.token,goods:[{goodsid:this.form.goodsid,amount:this.form.amount,specifications:this.form.specifications,freight:this.freight||0,skuidsort:this.form.skuidsort}],addressid:this.form.addressid,remark:this.form.remark};a.goods=JSON.stringify(a.goods),this.$apiPost(e,a).then((function(e){uni.navigateTo({url:"./cashier?orderId="+e.data.orderno+"&contact="+JSON.stringify(i.contact)+"&money="+t.totalMoney}),uni.hideLoading()}))},chooseAddress:function(){var t=this;uni.$on("chooseAddress",(function(i){t.contact=i,t.address=i.province+i.city+i.district+i.address,t.form.addressid=i.id,uni.$off("chooseAddress")})),uni.navigateTo({url:"../mine/addressList?type=choose"})},getAddressList:function(){var t=this,i={uid:this.form.uid,token:this.form.token,page:1,pagesize:99},e="&r=api.member.address";this.$apiPost(e,i).then((function(i){i.data.forEach((function(i){"1"==i.isdefault&&(t.form.addressid=i.id,t.contact=i,t.address=i.province+i.city+i.district+i.address)}))}))}}};i.default=a},8421:function(t,i,e){var a=e("24fb");i=a(!1),i.push([t.i,"uni-page-body[data-v-705d7873]{background:#f3f3f3}.margin[data-v-705d7873]{margin:%?20?% 0;background-color:#fff}.child-overall[data-v-705d7873],.overall[data-v-705d7873]{padding:%?20?% %?15?%}.child-overall[data-v-705d7873]:last-child{padding-bottom:%?40?%}.child-overall-item[data-v-705d7873],\n.overall[data-v-705d7873]{display:-webkit-box;display:-webkit-flex;display:flex;justify-items:center}.child-overall-item>uni-image[data-v-705d7873]{width:%?150?%;height:%?150?%;margin-right:%?20?%}.child-overall-item .title[data-v-705d7873]{width:%?360?%;\n\t/* height: 64upx; */margin-top:%?10?%;overflow:hidden;/*一定要写 */text-overflow:ellipsis;/*超出省略号 */display:-webkit-box;/*一定要写 */-webkit-line-clamp:2;/*控制行数 */-webkit-box-orient:vertical/*一定要写 */}.bottom-content[data-v-705d7873]{margin:%?20?% 0}.options[data-v-705d7873]{margin:%?25?% 0 0}.calculator uni-text[data-v-705d7873]{display:inline-block;vertical-align:middle}.calculator .calc[data-v-705d7873],\n.calculator .result[data-v-705d7873]{display:inline-block;vertical-align:middle;width:%?60?%;height:%?60?%;font-size:%?36?%;line-height:%?60?%;text-align:center;border:1px solid #e8e8e8}.calculator .result[data-v-705d7873]{width:%?80?%;text-align:center;border:1px solid #e8e8e8}.info[data-v-705d7873]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.msg>uni-text[data-v-705d7873],\n.msg>uni-textarea[data-v-705d7873]{display:inline-block;vertical-align:top}.msg>uni-text[data-v-705d7873]{margin-right:%?30?%}.msg>uni-textarea[data-v-705d7873]{width:60%;max-height:%?160?%}.conclude[data-v-705d7873]{background-color:#fff}.conclude>uni-view[data-v-705d7873]{margin:%?20?% 0}.bottom[data-v-705d7873]{position:fixed;left:0;bottom:0;width:100%;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:0 0 0 %?40?%;background-color:#fff;border:1px solid #f1f1f1}.bottom-right uni-button[data-v-705d7873]{margin-left:%?15?%;height:100%;height:%?80?%;border-radius:0;font-size:%?30?%}.bottom-right uni-button[data-v-705d7873],\n.bottom-right uni-text[data-v-705d7873]{display:inline-block;vertical-align:middle}.bottom-right[data-v-705d7873]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:right}.disabled[data-v-705d7873]{border-color:#f4f4f4;background-color:#f4f4f4}body.?%PAGE?%[data-v-705d7873]{background:#f3f3f3}",""]),t.exports=i},a9da:function(t,i,e){var a=e("8421");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=e("4f06").default;s("193788e8",a,!0,{sourceMap:!1,shadowMode:!1})},d3ca:function(t,i,e){"use strict";e.r(i);var a=e("3f5b"),s=e("0c93");for(var o in s)"default"!==o&&function(t){e.d(i,t,(function(){return s[t]}))}(o);e("48d4");var n,d=e("f0c5"),r=Object(d["a"])(s["default"],a["b"],a["c"],!1,null,"705d7873",null,!1,a["a"],n);i["default"]=r.exports}}]);