(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/goodsList"],{"2ad9":function(t,e,i){"use strict";i.r(e);var n=i("b8bc"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},"870b":function(t,e,i){"use strict";(function(t){i("fabc"),i("921b");n(i("66fd"));var e=n(i("f52e"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},"999c":function(t,e,i){"use strict";var n=i("b2bb"),o=i.n(n);o.a},b2bb:function(t,e,i){},b8bc:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){i.e("components/uni-load-more/uni-load-more").then(function(){return resolve(i("9a2c"))}.bind(null,i)).catch(i.oe)},o={components:{uniLoadMore:n},data:function(){return{uid:"",token:"",goodsId:"",merchId:"",url:"",active:1,rangeActive:"",sh:"",dataList:[],page:1,pageSize:5,total:0,more:"",logined:!1}},computed:{noMore:function(){return this.dataList.length>=this.total}},onLoad:function(e){this.merchId=e.cateId,this.goodsId=e.goodsId;var i=this;this.url="&r=api.goods&page="+this.page+"&pagesize="+this.pageSize+"&sort="+this.active;var n=t.getStorageSync("userInfo");""!=n&null!=n&void 0!=n?(this.logined=!0,this.uid=n.uid,this.token=n.token):this.logined=!1,this.getList(this.page),t.$on("logined",(function(){var e=t.getStorageSync("userInfo");i.logined=!0,i.uid=e.uid,i.token=e.token})),setTimeout((function(){i.$getHeight("#sv",(function(t){i.sh=t}))}),0)},methods:{to:function(e,i){t.navigateTo({url:"/pages/index/".concat(e,"?id=").concat(i,"&merchId=").concat(this.merchId)})},toggle:function(t){this.active=t,this.reset(),this.getList(this.page)},toggleRange:function(t){this.rangeActive=t},back:function(){t.navigateBack({delta:1})},reset:function(){this.page=1,this.total=0,this.dataList=[],this.more="",3!=this.active?(this.rangeActive="",this.url="&r=api.goods&page="+this.page+"&pagesize="+this.pageSize+"&sort="+this.active):(this.rangeActive=1==this.rangeActive?2:1,1==this.rangeActive?this.url="&r=api.goods&page="+this.page+"&pagesize="+this.pageSize+"&sort=3":2==this.rangeActive&&(this.url="&r=api.goods&page="+this.page+"&pagesize="+this.pageSize+"&sort=4"))},getList:function(e){var i=this;1==this.page&&this.$loading(),this.$apiPost(this.url).then((function(e){i.total=e.total,i.dataList=i.dataList.concat(e.data),i.more="",1==i.page&&t.hideLoading()}))},toBottom:function(){if(this.noMore)this.more="noMore";else{var t=this;this.more="loading",t.page++,t.getList(t.page)}},addCollect:function(t){var e=this.$operateInterceptor(this.logined);if(e){var i=this,n={uid:this.uid,token:this.token,goodsid:t};console.log(n);var o="&r=api.member.cart.add";this.$apiPost(o,n).then((function(t){i.$msg("添加成功")}))}}}};e.default=o}).call(this,i("543d")["default"])},cced:function(t,e,i){"use strict";var n={"uni-load-more":function(){return i.e("components/uni-load-more/uni-load-more").then(i.bind(null,"9a2c"))}},o=function(){var t=this,e=t.$createElement;t._self._c},a=[];i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}))},f52e:function(t,e,i){"use strict";i.r(e);var n=i("cced"),o=i("2ad9");for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("999c");var s,r=i("f0c5"),c=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);e["default"]=c.exports}},[["870b","common/runtime","common/vendor"]]]);