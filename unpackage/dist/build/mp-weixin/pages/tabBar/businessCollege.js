(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/businessCollege"],{"08a1":function(t,e,i){"use strict";(function(t){i("fabc");o(i("66fd"));var e=o(i("a2ad"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},"48f8":function(t,e,i){},"79ba":function(t,e,i){"use strict";var o={uniRate:function(){return i.e("components/uni-rate/uni-rate").then(i.bind(null,"1006"))},uniLoadMore:function(){return i.e("components/uni-load-more/uni-load-more").then(i.bind(null,"9a2c"))},uniFab:function(){return i.e("components/uni-fab/uni-fab").then(i.bind(null,"3aa1"))}},n=function(){var t=this,e=t.$createElement;t._self._c},a=[];i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return o}))},a2ad:function(t,e,i){"use strict";i.r(e);var o=i("79ba"),n=i("e6e3");for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);i("b0fc");var s,r=i("f0c5"),c=Object(r["a"])(n["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);e["default"]=c.exports},b0fc:function(t,e,i){"use strict";var o=i("48f8"),n=i.n(o);n.a},b7ba:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){i.e("components/uni-rate/uni-rate").then(function(){return resolve(i("1006"))}.bind(null,i)).catch(i.oe)},n=function(){i.e("components/uni-load-more/uni-load-more").then(function(){return resolve(i("9a2c"))}.bind(null,i)).catch(i.oe)},a=function(){i.e("components/uni-fab/uni-fab").then(function(){return resolve(i("3aa1"))}.bind(null,i)).catch(i.oe)},s=function(){Promise.all([i.e("common/vendor"),i.e("components/sharePrompt/sharePrompt")]).then(function(){return resolve(i("8a17"))}.bind(null,i)).catch(i.oe)},r={data:function(){var t=this;return{merchModelStatus:0,showFab:!1,from:"",collegeid:"",title:"",pattern:{color:"#fff",buttonColor:"#ffb6b9"},popshow:!1,videoContext:"",playPosition:"",uid:"",token:"",logined:!1,top:0,active:1,msg:[{length:3,videoSrc:""},{length:0,videoSrc:"http://workers.lllnet.cn/video/gclc-techs/CYGR20201581243698-3.mp4?sign=22d05d9296b3ea0bbeb2a455ecc49212&t=5e846548"},{length:2,videoSrc:""}],sh:"",dataList:[],page:1,pageSize:10,total:0,more:"",menus:[{icon:"/static/img/pic/other/weixin.png",label:"微信",onClick:function(){t.share("WXSceneSession",5)}},{icon:"/static/img/pic/other/pyq.png",label:"朋友圈",onClick:function(){t.share("WXSenceTimeline",0)}}],shareType:5}},components:{uniRate:o,uniLoadMore:n,uniFab:a,sharePrompt:s},computed:{noMore:function(){return this.dataList.length>=this.total},showIcon:function(){return this.top>=50}},onReachBottom:function(){if(this.noMore)this.more="noMore";else{var t=this;this.more="loading",t.page++,t.apart()}},onShareAppMessage:function(){return this.submitRepost(),{title:this.title,path:"/pages/index/articleDetail?id="+this.collegeid,imageUrl:this.image?this.image:"/static/img/app.jpg"}},onShow:function(){var e=t.getStorageSync("userInfo");""!=e&null!=e&void 0!=e?(this.logined=!0,this.uid=e.uid,this.token=e.token):(this.uid="",this.token="",this.logined=!1)},mounted:function(){var e=this;this.reset(),this.apart(),this.wdnmd(),t.$on("logined",(function(){var i=t.getStorageSync("userInfo");e.logined=!0,e.uid=i.uid,e.token=i.token,e.reset(),e.apart()})),setTimeout((function(){e.$getHeight("#sv",(function(t){e.sh=t}))}),0)},onPageScroll:function(t){this.top=t.scrollTop,this.top>0?this.showFab=!0:this.showFab=!1,this.videoContext&&t.scrollTop>this.playPosition+225&&this.videoContext.pause()},methods:{toDetail:function(e,i){var o=this;this.collegeid=e.id,this.title=e.title,this.from=i,t.$on("detailShareSuccess",(function(){o.submitRepost(),t.$off("detailShareSuccess")})),t.navigateTo({url:"/pages/index/articleDetail?id="+e.id+"&like="+e.like+"&comment="+e.comment+"&repost="+e.repost})},toZxDetail:function(e){t.navigateTo({url:"../index/informationDetail?id="+e})},toShop:function(e){t.navigateTo({url:"/pages/bussiness/shopPreview?id=".concat(e)})},toGoodsDetail:function(e){t.navigateTo({url:"/pages/index/goodsDetail?id=".concat(e)})},wdnmd:function(){var t=this,e=this,i="&r=api.mo";this.$apiPost(i).then((function(t){e.merchModelStatus=Number(t.data.status)})).catch((function(e){t.$msg(e)}))},toggle:function(t){this.active=t,this.reset(),this.apart()},reset:function(){this.page=1,this.total=0,this.dataList=[],this.more=""},apart:function(){var t,e=this,i={page:this.page,pagesize:this.pageSize};1==this.active?(t="&r=api.college.hotarticle",i.uid=this.uid):2==this.active?t="&r=api.college.merchant&&page="+this.page+"&pagesize="+this.pageSize:3==this.active?t="&r=api.college.goods&&page="+this.page+"&pagesize="+this.pageSize:4==this.active&&(t="&r=api.college.news&&page="+this.page+"&pagesize="+this.pageSize),e.getList(i,t)},getList:function(e,i){var o=this;1==this.page&&this.$loading(),this.$apiPost(i,e).then((function(e){o.total=Number(e.total),1==o.active?o.dataList=o.dataList.concat(e.data.map((function(t){return t.detail=t.detail.replace(/\<img/gi,'<img class="richImg"'),t}))):o.dataList=o.dataList.concat(e.data),o.$forceUpdate(),o.more="",1==o.page&&t.hideLoading()}))},toBottom:function(){if(this.noMore)this.more="noMore";else{var t=this;this.more="loading",t.page++,t.apart()}},showImgPreview:function(e,i){t.previewImage({current:i,urls:e})},recordPrepare:function(e,i,o){var n=this,a=e.currentTarget.dataset.id;if(this.videoContext){var s=t.createVideoContext(a);this.videoContext!=s&&(this.videoContext.pause(),setTimeout((function(){n.playPosition=e.target.offsetTop,n.videoContext=t.createVideoContext(a)})))}else this.playPosition=e.target.offsetTop,this.videoContext=t.createVideoContext(a)},getVideoInfo:function(t,e){this.dataList[e].duration=t.detail.duration},recordProgress:function(t,e){if(this.logined){var i;i="&r=api.college.hotarticle.record";var o={collegeid:t,uid:this.uid,token:this.token,video_seen_time:this.dataList[e].currentTime,video_all_time:this.dataList[e].duration};this.$apiPost(i,o)}},timeupdate:function(t,e){this.dataList[e].currentTime=t.detail.currentTime},toggleZan:function(e,i,o){var n=this.$operateInterceptor(this.logined);if(n){this.$loading();var a,s=this;a="0"==e?"&r=api.college.hotarticle.doLike":"&r=api.college.hotarticle.doLikeCancel";var r={collegeid:i,uid:this.uid,token:this.token};this.$apiPost(a,r).then((function(i){t.hideLoading(),"0"==e?(s.dataList[o].isLike="1",s.$msg("点赞成功"),s.dataList[o].like++):(s.dataList[o].isLike="0",s.$msg("取消点赞"),s.dataList[o].like--),s.$forceUpdate()}))}},closeSharePrompt:function(){this.popshow=!1},showMenu:function(t,e,i){this.collegeid=t,this.title=e,this.from=i,this.popshow=!0},share:function(e,i){var o=this;this.$loading();var n={provider:"weixin",scene:e,type:i,success:function(e){t.showModal({content:"已分享",showCancel:!1}),o.submitRepost()},fail:function(e){t.showModal({content:JSON.stringify(e),showCancel:!1})},complete:function(){t.hideLoading()}};switch(i){case 0:n.summary=" ",n.imageUrl=this.shareImg?this.shareImg:"/static/img/app.jpg",n.title=this.title,n.href="http://yuying.qinshaozhuanshu.cn/app/index.php?i=2&c=entry&m=zhonghong_zhihui&do=mobile&r=wap.share.article.detail&id="+this.collegeid;break;case 1:n.summary=this.shareText;case 2:n.imageUrl=this.image;break;case 5:n.imageUrl="/static/img/app.jpg",n.title=this.title,n.miniProgram={id:"gh_2f5dfaa2fae2",path:"/pages/index/articleDetail?id="+this.collegeid,webUrl:"http://yuying.qinshaozhuanshu.cn/app/index.php?i=2&c=entry&m=zhonghong_zhihui&do=mobile&r=wap.share.article.detail&id="+this.collegeid,type:0};break;default:break}t.share(n)},toTop:function(){t.pageScrollTo({scrollTop:0,duration:300})},shareSuccess:function(){this.submitRepost()},submitRepost:function(){var t={uid:this.uid,token:this.token,collegeid:this.collegeid},e="&r=api.college.hotarticle.doRepost",i=this;this.$apiPost(e,t).then((function(t){i.refresh(),i.$forceUpdate()}))},refresh:function(){var t=this,e="&r=api.college.hotarticle",i={uid:this.uid,page:this.from+1,pagesize:1};t=this;this.$apiPost(e,i).then((function(e){t.dataList[t.from].repost=e.data[0].repost,t.$forceUpdate()}))}}};e.default=r}).call(this,i("543d")["default"])},e6e3:function(t,e,i){"use strict";i.r(e);var o=i("b7ba"),n=i.n(o);for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);e["default"]=n.a}},[["08a1","common/runtime","common/vendor"]]]);