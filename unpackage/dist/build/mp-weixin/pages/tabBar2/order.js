(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar2/order"],{"11ac":function(t,e,n){"use strict";n.r(e);var o=n("9c0a"),i=n("162c");for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);n("525f");var r,a=n("f0c5"),d=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);e["default"]=d.exports},"162c":function(t,e,n){"use strict";n.r(e);var o=n("fe4a"),i=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);e["default"]=i.a},"3dac":function(t,e,n){},"525f":function(t,e,n){"use strict";var o=n("3dac"),i=n.n(o);i.a},"9c0a":function(t,e,n){"use strict";var o={uniLoadMore:function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"9a2c"))}},i=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.promptVisible=!1})},s=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return o}))},fe4a:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){n.e("components/promptOptions/pop").then(function(){return resolve(n("0e67"))}.bind(null,n)).catch(n.oe)},i=function(){n.e("components/uni-load-more/uni-load-more").then(function(){return resolve(n("9a2c"))}.bind(null,n)).catch(n.oe)},s=function(){n.e("components/zz-prompt/index").then(function(){return resolve(n("4790"))}.bind(null,n)).catch(n.oe)},r={components:{uniLoadMore:i,pop:o,Prompt:s},data:function(){return{promptVisible:!1,promptVisible2:!1,uid:"",token:"",active:"qb",orderList:[{name:"asdasdasds"},{name:"asdasdasds"},{name:"asdasdasds"},{name:"asdasdasds"}],sh:"",dataList:[],page:1,pageSize:5,total:0,more:"",orderno:"",keywords:"",remark:"",current:0,expressno:"",deliveryArray:[],sendOrderNo:""}},computed:{noMore:function(){return this.dataList.length>=this.total}},onLoad:function(){},methods:{init:function(){var e=this,n=t.getStorageSync("userInfo");e=this;""!=n&null!=n&void 0!=n&&(this.uid=n.uid,this.token=n.token),this.getList(this.page,this.orderno,this.keywords),this.getDeliverList(),setTimeout((function(){e.$getHeight("#sv",(function(t){e.sh=t}))}),0)},choosed:function(e){t.$off("popChoosed")},open:function(){var e=this;t.$on("popChoosed",(function(t){e.choosed(t)})),this.$refs.order.show=!0},toDetail:function(e){t.navigateTo({url:"./operating/orderDetail?orderno="+e})},toggle:function(t){this.active=t,this.reset(),this.getList(this.page,this.orderno,this.keywords)},reset:function(){this.page=1,this.total=0,this.orderno="",this.keywords="",this.dataList=[],this.more=""},getList:function(e,n,o){var i=this,s={status:this.active,page:e,pagesize:this.pageSize,uid:this.uid,token:this.token,orderno:n,keywords:o};1==this.page&&this.$loading();var r="&r=api.myshop.orders";this.$apiPost(r,s).then((function(e){i.total=e.total,i.dataList=i.dataList.concat(e.data),i.more="",1==i.page&&t.hideLoading()}))},toBottom:function(){if(this.noMore)this.more="noMore";else{var t=this;this.more="loading",t.page++,t.getList(t.page,this.orderno,this.keywords)}},search:function(){this.page=1,this.total=0,this.dataList=[],this.more="",this.getList(this.page,this.orderno,this.keywords)},cancelOrder:function(t){var e=this,n={uid:this.uid,token:this.token,orderno:t},o="&r=api.myshop.orders.cancelSend";this.$apiPost(o,n).then((function(t){e.$msg("取消成功"),e.search()}))},showRemark:function(t){this.remark=t||"无备注",this.promptVisible=!0},openSend:function(t){this.sendOrderNo=t,this.promptVisible2=!0},confirmDoSend:function(){var e=this;this.$loading();var n=this,o={uid:this.uid,token:this.token,orderno:this.sendOrderNo,expressno:this.expressno,expressname:this.deliveryArray[this.current]},i="&r=api.myshop.orders.doSend";this.$apiPost(i,o).then((function(o){e.promptVisible2=!1,e.sendReset(),t.hideLoading(),n.$msg("发货成功"),n.search()}))},sendReset:function(){this.expressno="",this.current=0},bindPickerChange:function(t){console.log(t),this.current=t.detail.value,console.log(this.current)},getDeliverList:function(){var t=this,e="&r=api.myshop.orders.getExpressCompany",n={uid:this.uid,token:this.token};this.$apiPost(e,n).then((function(e){t.deliveryArray=e.data.map((function(t){return t.expressname}))}))}}};e.default=r}).call(this,n("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/tabBar2/order-create-component',
    {
        'pages/tabBar2/order-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("11ac"))
        })
    },
    [['pages/tabBar2/order-create-component']]
]);
