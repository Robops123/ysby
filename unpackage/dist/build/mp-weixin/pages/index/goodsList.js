(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/goodsList"],{"2ad9":function(t,e,i){"use strict";i.r(e);var n=i("b8bc"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},"70e7":function(t,e,i){},"870b":function(t,e,i){"use strict";(function(t){i("fabc");n(i("66fd"));var e=n(i("f52e"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},"999c":function(t,e,i){"use strict";var n=i("70e7"),o=i.n(n);o.a},b3a7:function(t,e,i){"use strict";var n={uniLoadMore:function(){return i.e("components/uni-load-more/uni-load-more").then(i.bind(null,"9a2c"))}},o=function(){var t=this,e=t.$createElement;t._self._c},a=[];i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}))},b8bc:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){i.e("components/uni-load-more/uni-load-more").then(function(){return resolve(i("9a2c"))}.bind(null,i)).catch(i.oe)},o=function(){i.e("components/sku/pages/sku").then(function(){return resolve(i("e937"))}.bind(null,i)).catch(i.oe)},a={components:{uniLoadMore:n,sku:o},data:function(){return{defaultPrice:0,defaultImg:"",id:"",activityId:"",category:[],receivedCategory:!1,totalsku:0,uid:"",sorts:1,token:"",merchId:"",cateId:"",brandId:"",url:"&r=api.goods",active:1,rangeActive:"",sh:"",dataList:[],page:1,pageSize:5,total:0,more:"",logined:!1}},computed:{noMore:function(){return this.dataList.length>=this.total}},onLoad:function(e){var i=this;1==e.type?(this.merchId=e.merchId,this.cateId=e.cateId):2==e.type?(this.brandId=e.brandId,this.cateId=e.cateId):(this.activityId=e.id,t.setNavigationBarTitle({title:e.title}));var n=t.getStorageSync("userInfo");""!=n&null!=n&void 0!=n?(this.logined=!0,this.uid=n.uid,this.token=n.token):this.logined=!1,this.getList(this.page),t.$on("logined",(function(){var e=t.getStorageSync("userInfo");i.logined=!0,i.uid=e.uid,i.token=e.token})),setTimeout((function(){i.$getHeight("#sv",(function(t){i.sh=t}))}),0)},methods:{to:function(e,i){t.navigateTo({url:"/pages/index/".concat(e,"?id=").concat(i,"&merchId=").concat(this.merchId)})},toggle:function(t){this.active=t,this.reset(),this.getList(this.page)},toggleRange:function(t){this.rangeActive=t},back:function(){t.navigateBack({delta:1})},reset:function(){this.page=1,this.total=0,this.dataList=[],this.more="",3!=this.active?(this.rangeActive="",this.sorts=this.active):(this.rangeActive=1==this.rangeActive?2:1,1==this.rangeActive?this.sorts=3:2==this.rangeActive&&(this.sorts=4))},getList:function(e){var i=this,n={page:e,pagesize:this.pageSize,sort:this.sorts,brandid:this.brandId,cateid:this.cateId,merchid:this.merchId,id:this.activityId};1==this.page&&this.$loading(),this.$apiPost(this.url,n).then((function(e){i.total=e.total,i.dataList=i.dataList.concat(e.data),i.more="",1==i.page&&t.hideLoading()}))},toBottom:function(){if(this.noMore)this.more="noMore";else{var t=this;this.more="loading",t.page++,t.getList(t.page)}},getCategory:function(e,i,n){var o=this.$operateInterceptor(this.logined);if(o){this.defaultImg=i,this.defaultPrice=n.split(" - ")[0],this.$loading(),this.id=e;var a=this,s="&r=api.goods.detail.sku&goodsid="+e;this.$apiPost(s).then((function(e){a.category=e.data,a.totalsku=e.stock,a.receivedCategory=!0,a.$nextTick((function(){a.$refs.sku.specClass="show",t.hideLoading()}))}))}},completeSpecChoose:function(t){this.addCollect(this.id,t.choosedid.join(","),t.selectArr),this.receivedCategory=!1},addCollect:function(e,i,n){this.$loading();var o=this,a={uid:this.uid,token:this.token,goodsid:e,specifications:n,skuidsort:i},s="&r=api.member.cart.add";this.$apiPost(s,a).then((function(e){t.hideLoading(),o.$msg("添加成功")}))}}};e.default=a}).call(this,i("543d")["default"])},f52e:function(t,e,i){"use strict";i.r(e);var n=i("b3a7"),o=i("2ad9");for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("999c");var s,c=i("f0c5"),r=Object(c["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);e["default"]=r.exports}},[["870b","common/runtime","common/vendor"]]]);