(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/bussiness/shopPreview"],{"46fd":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){i.e("components/uni-status-bar/uni-status-bar").then(function(){return resolve(i("039e"))}.bind(null,i)).catch(i.oe)},o=function(){i.e("components/uni-load-more/uni-load-more").then(function(){return resolve(i("9a2c"))}.bind(null,i)).catch(i.oe)},s={components:{uniStatusBar:n,uniLoadMore:o},data:function(){return{uid:"",token:"",keywords:"",logined:!1,id:"",url:"",active:1,rangeActive:"",sh:"",dataList:[],page:1,pageSize:5,total:0,more:"",basic:"",carouselList:[]}},computed:{noMore:function(){return this.dataList.length>=this.total}},onLoad:function(t){this.id=t.id},mounted:function(){var e=this;this.url="&r=api.merchant.home.goods&page="+this.page+"&pagesize="+this.pageSize+"&sort="+this.active+"&merchid="+this.id+"&keywords="+this.keywords;var i=t.getStorageSync("userInfo");""!=i&null!=i&void 0!=i?(this.logined=!0,this.uid=i.uid,this.token=i.token):this.logined=!1,this.getBasic(),t.$on("logined",(function(){var i=t.getStorageSync("userInfo");e.logined=!0,e.uid=i.uid,e.token=i.token,e.getBasic()})),this.getCarousel(),this.getList(this.page),setTimeout((function(){e.$getHeight("#sv",(function(t){e.sh=t}))}),0)},methods:{share:function(){console.log("share")},search:function(){this.reset(),this.getList()},toggle:function(t){this.active=t,this.reset(),this.getList(this.page)},toggleRange:function(t){this.rangeActive=t},back:function(){t.navigateBack({delta:1})},reset:function(){this.page=1,this.total=0,this.dataList=[],this.more="",4!=this.active?(this.rangeActive="",this.url="&r=api.merchant.home.goods&page="+this.page+"&pagesize="+this.pageSize+"&sort="+this.active+"&merchid="+this.id+"&keywords="+this.keywords):(this.rangeActive=1==this.rangeActive?2:1,1==this.rangeActive?this.url="&r=api.merchant.home.goods&page="+this.page+"&pagesize="+this.pageSize+"&sort=4&merchid="+this.id+"&keywords="+this.keywords:2==this.rangeActive&&(this.url="&r=api.merchant.home.goods&page="+this.page+"&pagesize="+this.pageSize+"&sort=5&merchid="+this.id+"&keywords="+this.keywords))},getList:function(e){var i=this;1==this.page&&this.$loading(),this.$apiPost(this.url).then((function(e){i.total=e.total,i.dataList=i.dataList.concat(e.data),i.more="",1==i.page&&t.hideLoading()}))},getBasic:function(){var t=this,e="&r=api.merchant.home&merchid="+this.id+"&uid="+this.uid+"&token="+this.token;this.$apiPost(e).then((function(e){t.basic=e.data}))},getCarousel:function(){var t=this,e="&r=api.merchant.home.banner&merchid="+this.id;this.$apiPost(e).then((function(e){t.carouselList=e.data}))},toBottom:function(){if(this.noMore)this.more="noMore";else{var t=this;this.more="loading",t.page++,t.getList(t.page)}},focus:function(t){var e=this.$operateInterceptor(this.logined);if(e&&"0"!=this.basic.isCollect){var i=this,n={uid:this.uid,token:this.token,merchid:t},o="&r=api.member.collection.add";this.$apiPost(o,n).then((function(t){i.getBasic(),i.$msg("已关注")}))}}}};e.default=s}).call(this,i("543d")["default"])},5915:function(t,e,i){"use strict";var n={"uni-rate":function(){return i.e("components/uni-rate/uni-rate").then(i.bind(null,"1006"))},"uni-load-more":function(){return i.e("components/uni-load-more/uni-load-more").then(i.bind(null,"9a2c"))}},o=function(){var t=this,e=t.$createElement;t._self._c},s=[];i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}))},"84e6":function(t,e,i){"use strict";var n=i("b9e1"),o=i.n(n);o.a},"94c5":function(t,e,i){"use strict";(function(t){i("fabc"),i("921b");n(i("66fd"));var e=n(i("ca9f"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},9913:function(t,e,i){"use strict";i.r(e);var n=i("46fd"),o=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=o.a},b9e1:function(t,e,i){},ca9f:function(t,e,i){"use strict";i.r(e);var n=i("5915"),o=i("9913");for(var s in o)"default"!==s&&function(t){i.d(e,t,(function(){return o[t]}))}(s);i("84e6");var a,r=i("f0c5"),c=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],a);e["default"]=c.exports}},[["94c5","common/runtime","common/vendor"]]]);