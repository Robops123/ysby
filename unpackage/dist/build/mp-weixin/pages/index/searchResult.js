(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/searchResult"],{"19d7":function(t,e,i){"use strict";i.r(e);var n=i("c952"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},"3cb3":function(t,e,i){},8945:function(t,e,i){"use strict";var n={uniRate:function(){return i.e("components/uni-rate/uni-rate").then(i.bind(null,"1006"))},uniLoadMore:function(){return i.e("components/uni-load-more/uni-load-more").then(i.bind(null,"9a2c"))}},o=function(){var t=this,e=t.$createElement;t._self._c},a=[];i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}))},"9ea8":function(t,e,i){"use strict";(function(t){i("fabc");n(i("66fd"));var e=n(i("e00e"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},c2d5:function(t,e,i){"use strict";var n=i("3cb3"),o=i.n(n);o.a},c952:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){i.e("components/uni-status-bar/uni-status-bar").then(function(){return resolve(i("039e"))}.bind(null,i)).catch(i.oe)},o=function(){i.e("components/uni-load-more/uni-load-more").then(function(){return resolve(i("9a2c"))}.bind(null,i)).catch(i.oe)},a=function(){i.e("components/sku/pages/sku").then(function(){return resolve(i("e937"))}.bind(null,i)).catch(i.oe)},s={components:{uniStatusBar:n,uniLoadMore:o,sku:a},data:function(){return{defaultPrice:0,defaultImg:"",id:"",category:[],receivedCategory:!1,totalsku:0,logined:!1,uid:"",token:"",keyword:"",active:0,rangeActive:"",sh:"",dataList:[],page:1,pageSize:10,total:0,more:"",lat:"",lng:""}},computed:{noMore:function(){return this.dataList.length>=this.total}},onLoad:function(e){var i=this,n=t.getStorageSync("userInfo");""!=n&null!=n&void 0!=n?(this.logined=!0,this.uid=n.uid,this.token=n.token):this.logined=!1,t.$on("logined",(function(){var e=t.getStorageSync("userInfo");i.logined=!0,i.uid=e.uid,i.token=e.token})),this.keyword=e.keyword,this.getPosition(),setTimeout((function(){i.$getHeight("#sv",(function(t){i.sh=t}))}),0)},methods:{toggle:function(t){this.active=t,this.reset(),this.getList()},toggleRange:function(t){this.rangeActive=t},back:function(){t.navigateBack({delta:1})},toDetail:function(e){t.navigateTo({url:"/pages/index/goodsDetail?id=".concat(e)})},toShop:function(e){t.navigateTo({url:"/pages/bussiness/shopPreview?id=".concat(e)})},reset:function(){this.page=1,this.total=0,this.dataList=[],this.more="",2!=this.active?this.rangeActive="":this.rangeActive=1==this.rangeActive?2:1},getList:function(){var e=this,i={page:this.page,pagesize:this.pageSize,lng:this.lng,lat:this.lat,keywords:this.keyword,type:this.active};1==this.rangeActive?i.type=3:2==this.rangeActive&&(i.type=2),1==this.page&&this.$loading();var n="&r=api.home.search";this.$apiPost(n,i).then((function(i){e.total=i.data.total,e.dataList=e.dataList.concat(i.data.data),e.more="",1==e.page&&t.hideLoading()}))},toBottom:function(){if(this.noMore)this.more="noMore";else{var t=this;this.more="loading",t.page++,t.getList()}},getPosition:function(){var e=this;this.$loading(),t.getLocation({type:"wgs84",success:function(t){console.log(t),e.lng=t.longitude,e.lat=t.latitude,e.getList()},fail:function(t){console.log(t),e.reset(),e.lng="",e.lat="",e.getList()},complete:function(){t.hideLoading()}})},search:function(){this.active=0,this.reset(),this.getList()},getCategory:function(e,i,n){var o=this.$operateInterceptor(this.logined);if(o){this.defaultImg=i,this.defaultPrice=n.split(" - ")[0],this.$loading(),this.id=e;var a=this,s="&r=api.goods.detail.sku&goodsid="+e;this.$apiPost(s).then((function(e){a.category=e.data,a.totalsku=e.stock,a.receivedCategory=!0,a.$nextTick((function(){a.$refs.sku.specClass="show",t.hideLoading()}))}))}},completeSpecChoose:function(t){this.addCollect(this.id,t.choosedid.join(","),t.selectArr),this.receivedCategory=!1},addCollect:function(e,i,n){this.$loading();var o=this,a={uid:this.uid,token:this.token,goodsid:e,specifications:n,skuidsort:i},s="&r=api.member.cart.add";this.$apiPost(s,a).then((function(e){t.hideLoading(),o.$msg("添加成功")}))}}};e.default=s}).call(this,i("543d")["default"])},e00e:function(t,e,i){"use strict";i.r(e);var n=i("8945"),o=i("19d7");for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("c2d5");var s,c=i("f0c5"),u=Object(c["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);e["default"]=u.exports}},[["9ea8","common/runtime","common/vendor"]]]);