(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/addressList"],{"31fe":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{dataList:"",url:"&r=api.member.address",uid:"",token:"",mode:""}},mounted:function(){var e=t.getStorageSync("userInfo"),n=this;""!=e&null!=e&void 0!=e&&(this.uid=e.uid,this.token=e.token,this.getAddressList()),t.$on("updateAddressList",(function(){n.getAddressList()}))},onLoad:function(t){"choose"==t.type&&(this.mode=1)},methods:{toChange:function(e,n){t.navigateTo({url:"./addressChange?type="+e+"&item="+JSON.stringify(n)})},getAddressList:function(){var t=this,e={uid:this.uid,token:this.token,page:1,pagesize:99};this.$apiPost(this.url,e).then((function(e){t.dataList=e.data}))},longpress:function(e,n){var i,s=this;1==this.mode&&(i=["删除","选为收货地址"],t.showActionSheet({itemList:i,success:function(i){console.log(i),0==i.tapIndex?s.deleteAddress(e):1==i.tapIndex&&(t.$emit("chooseAddress",n),t.navigateBack({delta:1}))},fail:function(t){console.log(t.errMsg)}}))},deleteAddress:function(t){var e=this,n={uid:this.uid,token:this.token,addressid:t},i="&r=api.member.address.delete";this.$apiPost(i,n).then((function(t){e.$msg("删除成功"),setTimeout((function(){e.getAddressList()}),500)}))}}};e.default=n}).call(this,n("543d")["default"])},"41c4":function(t,e,n){"use strict";(function(t){n("fabc");i(n("66fd"));var e=i(n("c23a"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},9093:function(t,e,n){"use strict";var i=n("a289"),s=n.n(i);s.a},a289:function(t,e,n){},b1ee:function(t,e,n){"use strict";n.r(e);var i=n("31fe"),s=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=s.a},b4b2:function(t,e,n){"use strict";var i,s=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}))},c23a:function(t,e,n){"use strict";n.r(e);var i=n("b4b2"),s=n("b1ee");for(var o in s)"default"!==o&&function(t){n.d(e,t,(function(){return s[t]}))}(o);n("9093");var a,u=n("f0c5"),d=Object(u["a"])(s["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);e["default"]=d.exports}},[["41c4","common/runtime","common/vendor"]]]);