(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/help"],{"64d6":function(t,e,n){"use strict";n.r(e);var i=n("ba3b"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"83d8":function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}))},b2ca:function(t,e,n){},b2f2:function(t,e,n){"use strict";(function(t){n("fabc");i(n("66fd"));var e=i(n("e1a7"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},ba3b:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){Promise.all([n.e("common/vendor"),n.e("components/gaoyia-parse/parse")]).then(function(){return resolve(n("d204"))}.bind(null,n)).catch(n.oe)},a={components:{uParse:i},data:function(){return{page:1,pageSize:10,cateList:[],questionList:[]}},onLoad:function(){this.getList()},methods:{getList:function(){var t=this,e={page:this.page,pagesize:this.pageSize},n="&r=api.helper.category";this.$apiPost(n,e).then((function(e){t.cateList=t.cateList.concat(e.data),t.getCorespondList(e.data[0].id)}))},getCorespondList:function(e){this.questionList=[],this.$loading();var n=this,i={page:this.page,pagesize:this.pageSize,cateid:e},a="&r=api.helper.catehelp";this.$apiPost(a,i).then((function(e){n.questionList=n.questionList.concat(e.data),t.hideLoading()}))},showQuestion:function(t){this.questionList[t].show=!this.questionList[t].show,this.questionList.splice(0,0)}}};e.default=a}).call(this,n("543d")["default"])},e1a7:function(t,e,n){"use strict";n.r(e);var i=n("83d8"),a=n("64d6");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("e590");var s,u=n("f0c5"),c=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);e["default"]=c.exports},e590:function(t,e,n){"use strict";var i=n("b2ca"),a=n.n(i);a.a}},[["b2f2","common/runtime","common/vendor"]]]);