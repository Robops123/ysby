(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/goodsCategory"],{2704:function(t,e,a){"use strict";a.r(e);var i=a("9302"),n=a.n(i);for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},"3e5f":function(t,e,a){"use strict";(function(t){a("fabc");i(a("66fd"));var e=i(a("c203"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},"5d54":function(t,e,a){},6401:function(t,e,a){"use strict";var i=a("5d54"),n=a.n(i);n.a},9302:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){a.e("components/uni-status-bar/uni-status-bar").then(function(){return resolve(a("039e"))}.bind(null,a)).catch(a.oe)},n=function(){a.e("components/uni-load-more/uni-load-more").then(function(){return resolve(a("9a2c"))}.bind(null,a)).catch(a.oe)},o={components:{uniStatusBar:i,uniLoadMore:n},data:function(){return{type:"",categoryReady:!1,url:"&r=api.home.morecate",url2:"&r=api.home.morecate.catemerch",tapped:"",category:[],active:1,tabActive:0,sh:"",dataList:[],page:1,pageSize:20,total:0,more:""}},computed:{noMore:function(){return this.dataList.length>=this.total}},onLoad:function(t){this.type=t.type,this.getCategory()},methods:{toggleTab:function(t,e){this.tabActive=t,this.tapped=e.id,this.reset(),this.getList("",e.id)},to:function(e,a,i){var n,o;1==this.active?(n=this.category[a].id,o=i):(o=this.category[a].id,n=i),t.navigateTo({url:"./goodsList?cateId="+n+"&goodsId="+o})},back:function(){t.navigateBack({delta:1})},toggle:function(t){this.active=t,1==t?(this.url="&r=api.home.morecate",this.url2="&r=api.home.morecate.catemerch"):(this.url="&r=api.home.morecate.brand",this.url2="&r=api.home.morecate.brandcates"),this.tapped=!1,this.reset(),this.getCategory()},reset:function(){this.page=1,this.total=0,this.dataList=[],this.more=""},getCategory:function(){var t=this,e={id:""};this.$apiPost(this.url,e).then((function(e){t.category=e.data,t.tabActive=0,t.categoryReady=!0,t.getList("",e.data[0].id)}))},getList:function(t,e){var a=this;1==this.active?this.url2+="&cateid="+e:this.url2+="&brandid="+e,this.$apiPost(this.url2).then((function(t){a.dataList=a.dataList.concat(t.data),a.more=""}))},toBottom:function(){if(this.noMore)this.more="noMore";else{var t=this;this.more="loading",t.page++,t.getList(t.page,id)}}}};e.default=o}).call(this,a("543d")["default"])},c203:function(t,e,a){"use strict";a.r(e);var i=a("d4bc"),n=a("2704");for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("6401");var r,c=a("f0c5"),u=Object(c["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);e["default"]=u.exports},d4bc:function(t,e,a){"use strict";var i,n=function(){var t=this,e=t.$createElement;t._self._c},o=[];a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return i}))}},[["3e5f","common/runtime","common/vendor"]]]);