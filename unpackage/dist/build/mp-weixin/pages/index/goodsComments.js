(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/goodsComments"],{"27a2":function(t,e,n){"use strict";(function(t){n("fabc");o(n("66fd"));var e=o(n("3d51"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"2a03":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){n.e("components/uni-load-more/uni-load-more").then(function(){return resolve(n("9a2c"))}.bind(null,n)).catch(n.oe)},a={components:{uniLoadMore:o},data:function(){return{goodsid:"",active:1,rangeActive:"",sh:"",dataList:[],page:1,pageSize:6,total:0,more:""}},computed:{noMore:function(){return this.dataList.length>=this.total}},onLoad:function(t){var e=this;this.goodsid=t.id,this.getList(this.page),setTimeout((function(){e.$getHeight("#sv",(function(t){e.sh=t}))}),0)},methods:{getList:function(e){var n=this,o={page:e,pagesize:this.pageSize};1==this.page&&this.$loading();var a="&r=api.goods.detail.comments&goodsid="+this.goodsid+"&page="+e+"&pagesize="+this.pageSize;this.$apiPost(a,o).then((function(e){n.total=e.total,n.dataList=n.dataList.concat(e.data),n.more="",1==n.page&&t.hideLoading()}))},toBottom:function(){if(this.noMore)this.more="noMore";else{var t=this;this.more="loading",t.page++,t.getList(t.page)}},readImg:function(e){t.previewImage({current:e,urls:[e]})}}};e.default=a}).call(this,n("543d")["default"])},"3d51":function(t,e,n){"use strict";n.r(e);var o=n("a409"),a=n("aade");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("b688");var u,r=n("f0c5"),s=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);e["default"]=s.exports},"5f48":function(t,e,n){},a409:function(t,e,n){"use strict";var o={uniLoadMore:function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"9a2c"))}},a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}))},aade:function(t,e,n){"use strict";n.r(e);var o=n("2a03"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a},b688:function(t,e,n){"use strict";var o=n("5f48"),a=n.n(o);a.a}},[["27a2","common/runtime","common/vendor"]]]);