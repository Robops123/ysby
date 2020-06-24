<template>
	<view>
		<view class="padding" :class="{padding1:active==1}">
			<view class="nav-bar">
				<view class="nav nav-left" :class="{active:active==1}" @click="toggle(1)"><text>热门推文</text></view>
				<view class="nav nav-right" :class="{active:active==2}" @click="toggle(2)"><text>精选商家</text></view>
				<view class="nav nav-right" :class="{active:active==3}" @click="toggle(3)"><text>推荐产品</text></view>
			</view>
			
			
			
			
			
			
			<view scroll-y="true" id="sv"   @scrolltolower='toBottom' >
				
				<view v-if="active==1" style="margin-top: 30upx;">
					<view class="sp-item3  news"  v-for="(item,index) in dataList" :key='index' >
						<view class="padding">
							<view class="sp-item3-top " style="margin-top: 0;padding-top: 0;" @click="toDetail(item)">
								<view>
									<image :src="item.logo" mode="" class="headface"></image>
								</view>
								<view class="">
									<view class="cr sp-item3-top-middle ellipsis" style="line-height: 90upx;">{{item.merchname}}</view>
								</view>
							</view>
							<view class="sp-item3-middle" @click="toDetail(item)">
								<!-- <view class="title" v-html="item.detail"></view> -->
								<view class="synopsis">
									<u-parse :content="item.detail"  class="article-detail" />
									<!-- <text v-html="item.detail" class="article-detail">
								    </text> -->
									<text class="all">全文</text>
								</view>
							</view>
							<view class="media-place">
								<view class="img-1" v-if="item.thumb.length==1">
									<image :src="itemChild" v-for='(itemChild,indexChild) in item.thumb' :key='indexChild'
									 mode=""  @click="showImgPreview(item.thumb,itemChild)"></image>
								</view>
								<view class="img-2" v-if="item.thumb.length==2">
									<image :src="itemChild" v-for='(itemChild,indexChild) in item.thumb' :key='indexChild'
									 mode="" @click="showImgPreview(item.thumb,itemChild)" ></image>
								</view>
								<view class="img-3" v-if="item.thumb.length>=3">
									<image :src="itemChild" v-if="indexChild<=2" v-for='(itemChild,indexChild) in item.thumb' :key='indexChild'
									 mode="" @click="showImgPreview(item.thumb,itemChild)"></image>
								</view>
							</view>
							<view style="overflow: hidden;">
									<video class="img-1" :src="item.video" v-if="item.video" :id='item.video' :initial-time	='item.video_seen_time=="" ? 0:item.video_seen_time'
									 @loadedmetadata='getVideoInfo($event,index)' @play='recordPrepare' @pause='recordProgress(item.id,index)' @timeupdate='timeupdate($event,index)'
									 controls style="position: relative;"></video>
								</view>
						</view>
							
							<view class="luntan-card-bot">
								<view class="luntan-card-bot-card" @click='showMenu'>
									<!-- <text class="iconfont icon-share2"></text> -->
									<image src="/static/img/pic/fenxiang.png" mode="" class="operate-pic"></image>
									<text class="operate-word">转发{{item.repost}}</text>
								</view>
								<view class="luntan-card-bot-card" @click="toDetail(item)"> 
									<!-- <text class="iconfont icon-tubiao-"></text> -->
									<image src="/static/img/pic/pinglun.png" mode="" class="operate-pic" style="margin-top: 2px;"></image>
									<text class="operate-word">评论{{item.comment}}</text>
								</view> 
								<view class="luntan-card-bot-card" @click="toggleZan(Number(item.isLike),item.id,index)">
									<text class="iconfont " :class="{'icon-zan':!Number(item.isLike),'icon-shou':Number(item.isLike),'zaned':Number(item.isLike)}" ></text>
									<text class="operate-word">赞{{item.like}}</text>
								</view>
							</view>
					</view>
					
				</view>
				
				
				<view class="" v-if="active==2">
					<view class="sp-item3"  v-for="(item,index) in dataList" :key='index' >
						<view class="sp-item3-top">
							<view>
								<image :src="item.logo" mode="" class="headface"></image>
							</view>
							<view >
								<view class="sp-item3-top-middle ellipsis">{{item.merchname}}</view>
								<view>
									<uni-rate disabled="true" size="12" :value="item.avgstar" style="float: left;margin-top: 24upx;"></uni-rate>
									<text class="s3 cg collectnum">{{item.collect}}人关注</text>
								</view>
							</view>
							<view class="enter-button" @click="toShop(item.id)">进店</view>
						</view>
						<view class="sp-item3-bottom">
							<view class=""  v-for="(childItem,childIndex) in item.goods" :key='childIndex' @click="toGoodsDetail(childItem.goodsid)">
								<image :src="childItem.thumb" mode=""></image>
								<view class="price">￥{{childItem.marketprice}}</view>
							</view>
							<!-- <view class="">
								<image src="../../static/img/bg/activity.png" mode=""></image>
								<view class="price">$282</view>
							</view>
							<view class="">
								<image src="../../static/img/bg/activity.png" mode=""></image>
								<view class="price">$282</view>
							</view> -->
						</view>
					</view>
				</view>
				
				<view class="box" v-if="active==3">
					<view class="list" v-for="(item,index) in dataList" :key='index' @click="toGoodsDetail(item.id)">
						<image :src="item.thumb" mode=""></image>
						<view class="word">
							<view class="s3 ellipsis">{{item.title}}</view>
							<view class="s1 cr">￥{{item.marketprice}}<text class="s2 cg fr">已售{{item.sales}}件</text></view>
						</view>
					</view>
				</view>
				
				<uni-load-more :status="more"></uni-load-more>
			</view>
			
			
		</view>
		
		<!--  -->
		 <uni-fab
		            :pattern="pattern"
		            horizontal="right"
					:popMenu="false"
		            vertical="bottom"
		            @fabClick="toTop"
		        ></uni-fab>		
				
		<!-- <share-prompt :show='popshow'  :shareTitle="'密码门'" @close='closeSharePrompt'  :uid='uid' :token='token'></share-prompt> -->
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	import BottomImageMenu from '@/components/zh-bottom-image-menu/zh-bottom-image-menu.js'
	var bottomImageMenu = null
	 // import topicon from '@/components/gwh-backTopIcon/gwh-backTopIcon.vue'
	 // import sharePrompt from '@/components/sharePrompt/sharePrompt'
	export default{
		data(){
			return{
				pattern:{
					color:'#fff',
					buttonColor:'#ffb6b9'
				},
				popshow:false,
				videoContext:'',
				playPosition:'',
				uid:'',
				token:'',
				logined:false,
				top:0,
				active:1,
				msg:[
					{length:3,
					videoSrc:'',
					},
					{length:0,
					videoSrc:'http://workers.lllnet.cn/video/gclc-techs/CYGR20201581243698-3.mp4?sign=22d05d9296b3ea0bbeb2a455ecc49212&t=5e846548',
					},
					{length:2,
					videoSrc:'',
					}
				],
				sh:'',
				dataList:[],
				page:1,
				pageSize:10,
				total:0,
				more:'',
				menus:[
			       {
			         icon: '/static/img/pic/other/weixin.png',
			         label: '微信',
			         onClick:() => {
			           this.share('WXSceneSession',5)
			         }
			       },
			       {
			         icon: '/static/img/pic/other/pyq.png',
			         label: '朋友圈',
			   	  onClick:() =>{
			   		  this.share('WXSenceTimeline',0)
			   	  }
			       },
			     ],
				shareType:5
			}
		},
		components:{
			uniRate,
			uniLoadMore,
			uParse,
			uniFab
			// topicon,
			// sharePrompt
		},
		computed: {
		     noMore () {
		       return this.dataList.length >= this.total 
		     },
			 showIcon(){
			 				 return this.top>=50
			 },
		   },
		   onReachBottom(){
			   if(this.noMore){
			   					this.more='noMore'
			   					return;
			   				}
			   				var that=this
			   				this.more='loading'
			   // setTimeout(function(){
			   				  that.page++
			   				  that.apart()
			   // },2000)
		   },
		   mounted(){
		   	var that=this
			var userInfo=uni.getStorageSync('userInfo')
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.logined=true
				this.uid=userInfo.uid
				this.token=userInfo.token
			}else{
				this.logined=false
			}
		   	this.apart()
			 bottomImageMenu = new BottomImageMenu(this.menus)
			uni.$on('logined',function(){
				var userInfo2=uni.getStorageSync('userInfo')
				that.logined=true
				that.uid=userInfo2.uid
				that.token=userInfo2.token
			})
		   	setTimeout(function(){
		   		that.$getHeight('#sv',(res) =>{
		   			that.sh=res
		   		})
		   	},0)
		   },
		   onPageScroll(e){
			 this.top=e.scrollTop
			 if(this.videoContext){
				 if(e.scrollTop>this.playPosition + 225 ){
					 this.videoContext.pause()
				 }
			 }
		   },
		methods:{
			toDetail(item){
				uni.navigateTo({
					url:'/pages/index/articleDetail?id='+item.id+'&like='+item.like+'&comment='+item.comment+'&repost='+item.repost
				})
			},
			toShop(id){
				uni.navigateTo({
					url:`/pages/bussiness/shopPreview?id=${id}`
				})
			},
			toGoodsDetail(id){
				uni.navigateTo({
					url:`/pages/index/goodsDetail?id=${id}`
				})
			},
			toggle(t){
				this.active=t
				this.reset()
				this.apart()
			},
			reset(){
				this.page=1
				this.total=0
				this.dataList=[]
				this.more=''
			},
			apart(){
				var that=this,params={
					page:this.page,
					pagesize:this.pageSize
				},url
				if(this.active==1){
					url='&r=api.college.hotarticle'
					params.uid=this.uid
				}else if(this.active==2){
					url='&r=api.college.merchant&&page='+this.page+'&pagesize='+this.pageSize
				}else if(this.active==3){
					url='&r=api.college.goods&&page='+this.page+'&pagesize='+this.pageSize
				}
				// else if(this.active==2){
				// 	var url='&r=api.discovery.goods'
				// 	var params={
				// 		pagesize:that.pageSize,
				// 		page:that.page
				// 	}
				// 	that.getList(params,url)
				// }
				that.getList(params,url)
			},
			getList(p,url){
				var that=this
				if(this.page==1){
					this.$loading()
				}
				  this.$apiPost(url,p).then((res) =>{
					  that.total=Number(res.total)
					  if(that.active==1){
						   that.dataList=that.dataList.concat(res.data.map((item) =>{
							   item.detail=item.detail.replace(/\<img/gi, '<img class="richImg"')
							   return item
						   }))
					  }else{
						   that.dataList=that.dataList.concat(res.data)
					  }
					 
					  that.more=''
					  if(that.page==1){
					  	uni.hideLoading()
					  }
				  })
			},
			toBottom(){
				if(this.noMore){
					this.more='noMore'
					return;
				}
				var that=this
				this.more='loading'
			  // setTimeout(function(){
				  that.page++
				  that.apart()
			  // },2000)
			},
			showImgPreview(list,cur){
				uni.previewImage({
					current:cur,
					urls:list
				})
			},
			// tapIcon(){
			// 	uni.pageScrollTo({
			// 		scrollTop:0,
			// 		duration:300
			// 	})
			// },
			// 视频观看记录
			recordPrepare(e){
				let id=e.target.id
				if(this.videoContext){
					if(this.videoContext.id!=id){
						this.videoContext.pause()
						setTimeout(() =>{
							this.playPosition=e.target.offsetTop
							 this.videoContext = uni.createVideoContext(id)
						})
					}
				}else{
					this.playPosition=e.target.offsetTop
					 this.videoContext = uni.createVideoContext(id)
				}
			},
			getVideoInfo(info,index){
				this.dataList[index].duration=info.detail.duration
			},
			recordProgress(id,index){
				if(!this.logined){
					return ;
				}
				var that=this,url
					url='&r=api.college.hotarticle.record'
				var params={
				  collegeid:id,
				  uid:this.uid,
				  token:this.token,
				  video_seen_time:this.dataList[index].currentTime,
				  video_all_time:this.dataList[index].duration
				}
				  this.$apiPost(url,params)
			},
			timeupdate(e,index){
				this.dataList[index].currentTime=e.detail.currentTime
			},
			// 点赞
			toggleZan(zaned,id,index){
				var ce=this.$operateInterceptor(this.logined)
				if(!ce){
					return ;
				}
				this.$loading()
				var that=this,url
				if(!zaned){
					url='&r=api.college.hotarticle.doLike'
				}else{
					url='&r=api.college.hotarticle.doLikeCancel'
				}
				var params={
				  collegeid:id,
				  uid:this.uid,
				  token:this.token
				}
				  this.$apiPost(url,params).then((res) =>{
					  uni.hideLoading()
					  that.dataList[index].isLike=!that.dataList[index].isLike
					  if(that.dataList[index].isLike){
						  that.$msg('点赞成功')
						  that.dataList[index].like++
					  }else{
						  that.$msg('取消点赞')
						  that.dataList[index].like--
					  }
					  
					  that.$forceUpdate()
				  })
			},
			// closeSharePrompt(){
			// 	 this.popshow=false
			// },
			showMenu() {
			      if (!bottomImageMenu) {
			        bottomImageMenu = new BottomImageMenu(this.menus, (menu, index) => {
			          uni.showToast({ title: `点击了:${menu.label},索引是${index},这是统一处理的`, icon: 'none' })
			        })
			      }
			      bottomImageMenu.show()
			    },
				share(type,way){
					this.$loading()
					let shareOPtions = {
						provider: 'weixin',
									// extra: {
									// 	scene: type
									// },
						scene: type, //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏,
						type:way,
						success: (e) => {
							uni.showModal({
								content: '已分享',
								showCancel:false
							})
						},
						fail: (e) => {
							uni.showModal({
								content: JSON.stringify(e),
								showCancel:false
							})
						},
						complete:function(){
							uni.hideLoading()
						}
					}
					// 1文字  2图片  0图文   5小程序
					switch (way){
						case 0:
							shareOPtions.summary = ' ';
							shareOPtions.imageUrl =this.shareImg ? this.shareImg : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
							shareOPtions.title = '我的分享';
							shareOPtions.href = 'www.baidu.com';
							break;
						case 1:
							shareOPtions.summary = this.shareText;
						case 2:
							shareOPtions.imageUrl = this.image;
							break;
						case 5:
							shareOPtions.imageUrl = 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
							// shareOPtions.title = '买啊';
							shareOPtions.miniProgram = {
								id:'gh_33446d7f7a26',
								path:'/pages/tabBar/component/component',
								webUrl:'https://uniapp.dcloud.io',
								type:0
							};
							break;
						default:
							break;
					}
					// if(shareOPtions.type === 0 && plus.os.name === 'iOS'){//如果是图文分享，且是ios平台，则压缩图片 
					// 	shareOPtions.imageUrl = await this.compress();
					// }
					// if(shareOPtions.type === 1 && shareOPtions.provider === 'qq'){//如果是分享文字到qq，则必须加上href和title
					// 	shareOPtions.href = 'https://uniapp.dcloud.io';
					// 	shareOPtions.title = '欢迎体验uniapp';
					// }
					uni.share(shareOPtions);
				},
			toTop(){
				uni.pageScrollTo({
					scrollTop:0,
					duration:300
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
	.nav-bar{
		text-align: center;
	}
	.nav{
		color: #afafaf;
		display: inline-block;
		width: 33%;
		box-sizing: border-box;
	}
	.nav.active text{
		color: #000000;
		position: relative;
	}
	.nav.active text::before{
		content: '';
		position: absolute;
		bottom: -10upx;
		width: 50upx;
		background-color: #ff7379;
		height: 2px;
		left: 50%;
		margin-left: -25upx;
	}
	
	.box{
		margin-top: 20upx;
	}
	.list:nth-of-type(odd){
		margin-right: 2%;
	}
	.list{
		display: inline-block;
		vertical-align: top;
		border-radius: 10upx;
		overflow: hidden;
		width: 49%;
		background-color: #fff;
		margin-bottom: 20upx;
	}
	.list image{
		width: 100%;
		height: 380upx;
	}
	.list .word .ellipsis{
		margin-bottom: 15upx;
	}
	.list .word{
		padding: 5upx 20upx  20upx ;
	}
	
	.sp-item3{
		border-radius: 20upx;
		background-color: #fff;
	}
	.sp-item3-top{
		padding: 20upx 30upx 0 0;
		margin: 20upx 0;
	}
	.sp-item3-top .headface{
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
		margin:0 15upx  0 0;
	}
	.sp-item3-top-middle image{
		width: 25upx;
		height: 25upx;
		vertical-align: middle;
		margin-right: 5upx;
	}
	.sp-item3-top-middle text text{
		color: #a9a9a9;
		margin-left: 10upx;
	}
	.sp-item3-top-middle{
		max-width: 400upx;
		}
	.sp-item3-top>view{
		display: inline-block;
		vertical-align: top;
	}
	.enter-button{
		color: #ff8f94;
		border: 1px solid #ff8f94;
		padding: 6upx 25upx;
		border-radius: 52upx;
		float: right;
		margin-top: 16upx;
	}
	.sp-item3-bottom>view{
			display: inline-block;
			vertical-align: top;
			width: 32%;
			margin-right: 2%;
			height: 220upx;
			position: relative;
			overflow: hidden;
			border-radius: 20upx;
	}
	.sp-item3-bottom>view:last-child{
		margin-right: 0;
	}
	.sp-item3-bottom{
		padding: 0 30upx;
		/* margin: 0 18upx; */
		display: flex;
		/* justify-content: space-between; */
		padding-bottom: 22upx;
	}
	.sp-item3-bottom image{
		width: 100%;
		height: 100%;
	}
	.sp-item3-bottom .price{
			position: absolute;
			left: 0;
			border-radius:0 20upx 0 20upx;
			bottom: 0;
			color: white;
			padding: 3upx 12upx;
			background-color: #999;
			opacity: 0.8;
			font-size: 24upx;
		}
		
		.all{
			color: #94cbd5;
		}
		
		
		.news{
			margin-bottom: 20upx;
			padding-bottom: 20upx;
		}
		.media-place{
			width: 100%;
			display: flex;
			justify-content: space-between;
		}
		.media-place>view{
			width: 100%;
		}
		.img-1 image{
			width: 100%;
			height: 300upx;
		}
		.img-2 image{
			width: 49%;
			height: 260upx;
		}
		.img-3 image{
			width: 33%;
			height: 220upx;
		}
		video.img-1{
			width: 100%;
		}
		/* .img-1 image,
		.img-2 image,
		.img-3 image,{
			width: 100%;
			height: 100%;
		} */
		/* .img-3{
			
		}
		.img-2{
			
		}
		.img-1{
			
		} */
		
		.luntan-card-bot{
			/* background: #f9f9f9; */
			width: 100%;
			height: 74upx;
			border-top: 2upx solid #e6e6e6;
			display: flex;
			justify-content: space-between;
			flex-wrap: nowrap;
		}
		.luntan-card-bot-card{
			width: 237upx;
			height: 100%;
			line-height: 74upx;
			font-size: 22upx;
			text-align: center;
		}
		.luntan-card-bot-card image{
			width: 30upx;
			height: 30upx;
			vertical-align: middle;
			/* margin: 0 10upx 6upx 0; */
		}
		
		
		.padding1{
			padding: 20upx 0;
		}
		
		.article-detail /deep/ .richImg
		{
			display: none !important;
		}
		.article-detail /deep/ .edui-upload-video{
			display: none !important;
		}
		.luntan-card-bot-card .iconfont{
			margin: 0 10upx;
		}
		.luntan-card-bot-card>text{
			vertical-align: middle;
		}
		.zaned{
			color: red;
		}
		.collectnum{
			margin-left: 15upx;
		}
		.operate-pic{
			width: 20px;
			height: 20px;
			margin: 0 10upx;
		}
		.operate-word{
			font-size: 28upx;
		}
</style>
