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
									<video class="img-1" :src="item.video" v-if="item.video" :id='item.video'
									 @loadedmetadata='getVideoInfo($event,index)' @play='recordPrepare' @pause='recordProgress(item.id,index)' @timeupdate='timeupdate($event,index)'
									 controls style="position: relative;"></video>
								</view>
						</view>
							
							<view class="luntan-card-bot">
								<view class="luntan-card-bot-card" @click='share'>
									<text class="iconfont icon-share2"></text>
									<text>转发{{item.repost}}</text>
								</view>
								<view class="luntan-card-bot-card" @click="toDetail(item)"> 
									<text class="iconfont icon-tubiao-"></text>
									<text>评论{{item.comment}}</text>
								</view> 
								<view class="luntan-card-bot-card">
									<text class="iconfont " :class="{'icon-zan':!item.isLike,'icon-shou':item.isLike,'zaned':item.isLike}" @click="toggleZan(item.isLike,item.id,index)"></text>
									<text>赞{{item.like}}</text>
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
									<text class="s3 cg">{{item.collect}}人关注</text>
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
					:content="content"
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
	 // import topicon from '@/components/gwh-backTopIcon/gwh-backTopIcon.vue'
	 // import sharePrompt from '@/components/sharePrompt/sharePrompt'
	export default{
		data(){
			return{
				content:{
					iconPath:'data:image/png;base64,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'
				},
				pattern:{
					color:'#fff',
					backgroundColor:'#ff6d7e'
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
				more:''
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
			 }  
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
					params.uid=1182
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
					  that.dataList[index].isLike=!that.dataList[index].isLike
					  if(that.dataList[index].isLike){
						  that.dataList[index].like++
					  }else{
						  that.dataList[index].like--
					  }
					  uni.hideLoading()
					  that.$forceUpdate()
				  })
			},
			// closeSharePrompt(){
			// 	 this.popshow=false
			// },
			async share(e) {
				this.$loading()
				let shareOPtions = {
					provider: 'weixin',
								extra: {
									scene: "WXSceneSession"
								},
					scene: 'WXSceneSession', //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
					type: 5,
					success: (e) => {
						console.log('success', e);
						uni.showModal({
							content: '已分享',
							showCancel:false
						})
					},
					fail: (e) => {
						console.log('fail', e)
						uni.showModal({
							content: JSON.stringify(e),
							showCancel:false
						})
					},
					complete:function(){
						console.log('分享操作结束!')
						uni.hideLoading()
					}
				}
				// 1文字  2图片  0图文   5小程序
				// switch (this.shareType){
				// 	case 0:
				// 		shareOPtions.summary = '好玩';
				// 		shareOPtions.imageUrl =this.shareImg ? this.shareImg : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
				// 		shareOPtions.title = this.shareTitle;
				// 		shareOPtions.href = 'https://uniapp.dcloud.io';
				// 		break;
				// 	case 1:
				// 		shareOPtions.summary = this.shareText;
				// 		break;
				// 	case 2:
				// 		shareOPtions.imageUrl = this.image;
				// 		break;
				// 	case 5:
						shareOPtions.imageUrl = this.shareImg ? this.shareImg : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
						shareOPtions.title = this.shareTitle+'买啊';
						shareOPtions.miniProgram = {
							id:'gh_33446d7f7a26',
							path:'/pages/tabBar/component/component',
							webUrl:'https://uniapp.dcloud.io',
							type:0
						};
				// 		break;
				// 	default:
				// 		break;
				// }
				
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
		border: 2px solid #ff8f94;
		padding: 10upx 15upx;
		border-radius: 52upx;
		float: right;
		margin-top: 16upx;
	}
	.sp-item3-bottom>view{
			display: inline-block;
			vertical-align: top;
			width: 33%;
			height: 220upx;
			position: relative;
			overflow: hidden;
			border-radius: 20upx;
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
			padding: 5upx 8upx;
			background-color: #999;
			opacity: 0.8;
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
			margin: 0 10upx 6upx 0;
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
</style>
