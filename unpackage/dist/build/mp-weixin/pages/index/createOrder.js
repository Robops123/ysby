(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/createOrder"],{"0c93":function(t,o,e){"use strict";e.r(o);var s=e("f849"),i=e.n(s);for(var n in s)"default"!==n&&function(t){e.d(o,t,(function(){return s[t]}))}(n);o["default"]=i.a},"2ae6":function(t,o,e){},"5b0f":function(t,o,e){"use strict";var s=e("2ae6"),i=e.n(s);i.a},d3ca:function(t,o,e){"use strict";e.r(o);var s=e("fd7d"),i=e("0c93");for(var n in i)"default"!==n&&function(t){e.d(o,t,(function(){return i[t]}))}(n);e("5b0f");var r,d=e("f0c5"),a=Object(d["a"])(i["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],r);o["default"]=a.exports},df32:function(t,o,e){"use strict";(function(t){e("fabc"),e("921b");s(e("66fd"));var o=s(e("d3ca"));function s(t){return t&&t.__esModule?t:{default:t}}t(o.default)}).call(this,e("543d")["createPage"])},f849:function(t,o,e){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var e={data:function(){return{form:{uid:"",token:"",goodsid:"",addressid:"",remark:"",specifications:"",amount:"",goodsprice:""},address:"",spec:"",goodsImg:"",goodsName:"",total:""}},computed:{disabled1:function(){return this.form.amount<=1},disabled2:function(){return this.form.amount>=this.total}},onLoad:function(o){console.log(o);var e=t.getStorageSync("userInfo");""!=e&null!=e&void 0!=e&&(this.form.uid=e.uid,this.form.token=e.token,this.getAddressList());var s=JSON.parse(o.choosedSpec);this.spec=s.selectArr,this.goodsImg=s.goodsImg,this.form.goodsid=o.goodsId,this.goodsName=o.goodsName,this.total=s.stock,this.form.amount=s.selectNum,this.form.specifications=s.selectArr,this.form.goodsprice=s.marketPrice},methods:{minus:function(){this.disabled1||--this.form.amount},plus:function(){this.disabled2||++this.form.amount},createOrder:function(){this.$loading();var o="&r=api.member.order.create";this.$apiPost(o,this.form).then((function(o){console.log(o),t.navigateTo({url:"./cashier?orderId="+o.ordero}),t.hideLoading()}))},chooseAddress:function(){var o=this;t.$on("chooseAddress",(function(e){o.address=e.province+e.city+e.district+e.address,o.form.addressid=e.id,t.$off("chooseAddress")})),t.navigateTo({url:"../mine/addressList?type=choose"})},getAddressList:function(){var t=this,o={uid:this.form.uid,token:this.form.token,page:1,pagesize:99},e="&r=api.member.address";this.$apiPost(e,o).then((function(o){o.data.forEach((function(o){"1"==o.isdefault&&(t.address=o.province+o.city+o.district+o.address)}))}))}}};o.default=e}).call(this,e("543d")["default"])},fd7d:function(t,o,e){"use strict";var s,i=function(){var t=this,o=t.$createElement;t._self._c},n=[];e.d(o,"b",(function(){return i})),e.d(o,"c",(function(){return n})),e.d(o,"a",(function(){return s}))}},[["df32","common/runtime","common/vendor"]]]);