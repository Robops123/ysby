(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/retail/myTeam"],{"1b5b":function(t,e,n){"use strict";var i=n("3c80"),o=n.n(i);o.a},"226b":function(t,e,n){"use strict";(function(t){n("fabc"),n("921b");i(n("66fd"));var e=i(n("2ccd"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"2bb9":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){n.e("components/uni-load-more/uni-load-more").then(function(){return resolve(n("9a2c"))}.bind(null,n)).catch(n.oe)},o={components:{uniLoadMore:i},data:function(){return{active:1,tabActive:0,sh:"",dataList:[],page:1,pageSize:7,total:0,total1:0,total2:0,total3:0,more:"",uid:"",token:""}},computed:{noMore:function(){return this.dataList.length>=this.total}},mounted:function(){var e=this,n=t.getStorageSync("userInfo");""!=n&null!=n&void 0!=n&&(this.uid=n.uid,this.token=n.token,this.getList(this.page)),setTimeout((function(){e.$getHeight("#sv",(function(t){e.sh=t}))}),0)},methods:{distributionOrderdetail:function(){t.navigateTo({url:"/pages/distributionOrderdetail/distributionOrderdetail"})},toggle:function(t){this.active=t,console.log(t),this.reset(),this.getList(this.page)},reset:function(){this.page=1,this.total=0,this.dataList=[],this.more=""},getList:function(e){var n=this,i={uid:this.uid,token:this.token,level:this.active,page:e,pagesize:this.pageSize};1==this.page&&this.$loading();var o="&r=api.member.agent.team";this.$apiPost(o,i).then((function(e){1==n.active?n.total=e.total1:2==n.active?n.total=e.total2:n.total=e.total3,n.total1=e.total1,n.total2=e.total2,n.total3=e.total3,n.dataList=n.dataList.concat(e.data),n.more="",1==n.page&&t.hideLoading()}))},toBottom:function(){if(this.noMore)this.more="noMore";else{var t=this;this.more="loading",t.page++,t.getList(t.page)}}}};e.default=o}).call(this,n("543d")["default"])},"2ccd":function(t,e,n){"use strict";n.r(e);var i=n("d062"),o=n("d994");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("1b5b");var u,r=n("f0c5"),s=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],u);e["default"]=s.exports},"3c80":function(t,e,n){},d062:function(t,e,n){"use strict";var i={"uni-load-more":function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"9a2c"))}},o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}))},d994:function(t,e,n){"use strict";n.r(e);var i=n("2bb9"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a}},[["226b","common/runtime","common/vendor"]]]);