(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/createOrder"],{"0c93":function(t,o,i){"use strict";i.r(o);var e=i("f849"),s=i.n(e);for(var r in e)"default"!==r&&function(t){i.d(o,t,(function(){return e[t]}))}(r);o["default"]=s.a},"5b0f":function(t,o,i){"use strict";var e=i("9136"),s=i.n(e);s.a},9136:function(t,o,i){},c9bc:function(t,o,i){"use strict";var e,s=function(){var t=this,o=t.$createElement;t._self._c},r=[];i.d(o,"b",(function(){return s})),i.d(o,"c",(function(){return r})),i.d(o,"a",(function(){return e}))},d3ca:function(t,o,i){"use strict";i.r(o);var e=i("c9bc"),s=i("0c93");for(var r in s)"default"!==r&&function(t){i.d(o,t,(function(){return s[t]}))}(r);i("5b0f");var n,d=i("f0c5"),a=Object(d["a"])(s["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],n);o["default"]=a.exports},df32:function(t,o,i){"use strict";(function(t){i("fabc");e(i("66fd"));var o=e(i("d3ca"));function e(t){return t&&t.__esModule?t:{default:t}}t(o.default)}).call(this,i("543d")["createPage"])},f849:function(t,o,i){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var i={data:function(){return{form:{uid:"",token:"",goodsid:"",addressid:"",remark:"",specifications:"",amount:"",goodsprice:""},freight:"",address:"",spec:"",goodsImg:"",goodsName:"",total:"",contact:{}}},computed:{disabled1:function(){return this.form.amount<=1},disabled2:function(){return this.form.amount>=this.total||this.form.amount>49},totalMoney:function(){return this.form.goodsprice*this.form.amount+(this.freight||0)}},onLoad:function(o){var i=t.getStorageSync("userInfo");""!=i&null!=i&void 0!=i&&(this.form.uid=i.uid,this.form.token=i.token,this.getAddressList());var e=JSON.parse(o.choosedSpec);this.spec=e.selectArr,this.goodsImg=e.goodsImg,this.form.goodsid=o.goodsId,this.goodsName=o.goodsName,this.total=e.stock||o.total,this.form.amount=e.selectNum||1,this.form.specifications=e.selectArr||"",this.form.goodsprice=e.marketPrice||o.marketprice},methods:{minus:function(){this.disabled1||--this.form.amount},plus:function(){this.disabled2||++this.form.amount},createOrder:function(){var o=this;this.$loading();var i=this,e="&r=api.member.order.create",s={uid:this.form.uid,token:this.form.token,goods:[{goodsid:this.form.goodsid,amount:this.form.amount,specifications:this.form.specifications,freight:this.freight||0}],addressid:this.form.addressid,remark:this.form.remark};s.goods=JSON.stringify(s.goods),this.$apiPost(e,s).then((function(e){t.navigateTo({url:"./cashier?orderId="+e.data.orderno+"&contact="+JSON.stringify(i.contact)+"&money="+o.totalMoney}),t.hideLoading()}))},chooseAddress:function(){var o=this;t.$on("chooseAddress",(function(i){o.contact=i,o.address=i.province+i.city+i.district+i.address,o.form.addressid=i.id,t.$off("chooseAddress")})),t.navigateTo({url:"../mine/addressList?type=choose"})},getAddressList:function(){var t=this,o={uid:this.form.uid,token:this.form.token,page:1,pagesize:99},i="&r=api.member.address";this.$apiPost(i,o).then((function(o){o.data.forEach((function(o){"1"==o.isdefault&&(t.form.addressid=o.id,t.contact=o,t.address=o.province+o.city+o.district+o.address)}))}))}}};o.default=i}).call(this,i("543d")["default"])}},[["df32","common/runtime","common/vendor"]]]);