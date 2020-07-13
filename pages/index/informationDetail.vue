<template>
	<view class="">
		<view class="luntan">
			<view class="luntan-card" >
				<!-- <view v-html="data.detail" id="article">
					
				</view> -->
				<!-- <rich-text :nodes=""></rich-text> -->
				<view class="s5" >
					{{data.title}}
				</view>
				<view class="cg " style="margin-bottom: 20upx;border-bottom: 1px solid #f3f3f3;padding-bottom: 10upx;">{{data.createtime}}</view>
				<view v-html="data.content"></view>
				 <!-- <u-parse :content="data.content" v-if="data" id="article" class="article"  ref='article'/> -->
				<!-- <view class="luntan-card-title">中期商会与你携手前行</view>
				<view class="luntan-card-lianjie">#坚守共赢胜利#</view>
				<view class="luntan-card-introduce">抗击疫情，中企商会在行动！截至2月8日，中企商会持续投入抗击疫情，面对这场突如其来的“疫”战，中企商会与大家共同坚守，终将会取得这场疫情防控狙击战的胜利！加油！</view>
				<image class="luntan-card-img" src="../../static/img/bg/activity.png" mode=""></image> -->
				<!-- <view class="share" id="share">
					<text>分享</text>
					<image src="../../static/img/pic/other/weixin.png" mode="" style="width: 55upx;"></image>
					<image src="../../static/img/pic/other/pyq.png" mode=""></image>
					<image src="../../static/img/pic/other/QQ.png" mode=""></image>
				</view> -->
			</view>
			
			
			<view>
				<view style="width: 750upx;height: 26upx;background-color: #f6f7fb;"></view>
				
				<view class="luntan-card">
					<view class="luntan-change">
						<view class="luntan-change-card">
							<text class="luntan-change-card-txt luntan-change-card-txts">评论</text>
							<!-- <text class="luntan-change-card-xian">赞{{like}}</text> -->
						</view>
					</view>
					
					<view class="comment">
						<scroll-view scroll-y="true" id="sv" style="max-height: 250px;"  @scrolltolower='toBottom'>
							<view class="comment-item" v-for='(item,index) in commentList' :key='index'>
								<image class="" :src="item.avatar" mode=""></image>
								<view class="word">
									<view class="s2 cg">{{item.nickname}}</view>
									<view class="">{{item.content}}</view>
									<view class="f2">
										<text class="date">{{item.createtime}}</text>
										<view class="fr">
											<view class="luntan-card-bot-card" @click="commentDoLike(item.id,item.isLike,index)">
												<text class="iconfont icon-zan" :class="{'icon-zan':item.isLike=='0','icon-shou':item.isLike=='1','zaned':item.isLike=='1'}"></text>
												<text>{{item.like}}</text>
											</view>
										</view>
									</view>
								</view>
							</view>
							<uni-load-more :status="more"></uni-load-more>
						</scroll-view>
					</view>
					
				</view>
				
				<view class="luntan-card-bot">
					<view class="luntan-card-bot-card"  @click="openShare">
						<!-- <text class="iconfont icon-share2"></text> -->
						<image src="../../static/img/pic/fenxiang.png" mode="" class="operate-pic"></image>
						<text class="operate-word">转发</text>
					</view>
					<view class="luntan-card-bot-card" @click="openComment">
						<image src="../../static/img/pic/pinglun.png" mode="" class="operate-pic"></image>
						<!-- <text class="iconfont icon-tubiao-"></text> -->
						<text class="operate-word">评论</text>
					</view>
					<view class="luntan-card-bot-card" @click="toggleZan(data.isLike)">
						<text class="iconfont " :class="{'icon-zan':data.isLike=='0','icon-shou':data.isLike=='1','zaned':data.isLike=='1'}" ></text>
						<text class="operate-word">赞</text>
					</view>
				</view>
			</view>
			
		</view>
		
		<share-prompt :show='popshow'  :shareTitle="title" @close='closeSharePrompt' :alterUrl="'http://yuying.qinshaozhuanshu.cn/app/index.php?i=2&c=entry&m=zhonghong_zhihui&do=mobile&r=wap.share.news.detail&id='+id"
		 :miniProgramPath="'/pages/index/informationDetail?id='+id"  :uid='uid' :token='token'></share-prompt>
		
		<ygc-comment ref="ygcComment" 
		        :placeholder="'发布评论'" 
		        @pubComment="pubComment"></ygc-comment>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import ygcComment from '@/components/ygc-comment/ygc-comment.vue';
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import sharePrompt from '@/components/sharePrompt/sharePrompt'
	export default{
		components:{
			uniLoadMore,
			ygcComment,
			uParse,
			sharePrompt
		},
		data(){
			return{
				title:'',
				popshow:false,
				id:'',
				active:1,
				tabActive:0,
				sh:'',
				sh2:'',
				dataList:[],
				commentList:[],
				data:'',
				like:'',
				comment:'',
				repost:'',
				isLike:false,
				page:1,
				pageSize:10,
				total:0,
				more:'',
				articleH:'',
				windowH:'',
				topH:'',
				readComplete:false,
				uid:'',
				token:'',
				logined:''
			}
		},
		onLoad(e){
			var that=this
			this.id=e.id
			var userInfo=uni.getStorageSync('userInfo')
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.logined=true
				this.uid=userInfo.uid
				this.token=userInfo.token
			}else{
				this.logined=false
			}
			this.getDetail()
			uni.$on('logined',function(){
				console.log('login')
				var userInfo2=uni.getStorageSync('userInfo')
				that.logined=true
				that.uid=userInfo2.uid
				that.token=userInfo2.token
				that.getDetail()
			})
		},
		onPageScroll(e){
			// this.calcArticleHeight()
			// if(!this.readComplete){
			// 	if(e.scrollTop>=this.articleH-(this.windowH-this.topH)){
			// 		if(this.logined){
			// 			this.readComplete=true
			// 			// this.$msg('阅读完成')
			// 			// this.reportReadProgress()
			// 		}
			// 	}
			// }
		},
		computed: {
		     noMore () {
		       return this.commentList.length >= this.total
		     },
		   },
		   mounted(){
		   	// var that=this
			// uni.$on('updated',function(){
			// 	that.calcArticleHeight()
			// })
		   	// this.getDetail()
		   	// setTimeout(function(){
		   	// 	that.$getHeight('#sv',(res) =>{
		   	// 		that.sh=res
		   	// 	})
		   	// },0)
		   },
		methods:{
			toggleTab(t){
				this.tabActive=t
			},
			async getDetail(){
				var that=this
				 await that.getList()
				var params={
				  newsid:this.id,
				  uid:this.uid,
				  token:this.token
				}
				  var url='&r=api.college.news.detail'
				  this.$apiPost(url,params).then((res) =>{
					  that.data=res.data
					  that.$forceUpdate()
					// that.$nextTick(function(){
					//  						 that.$loading()
					 	// setTimeout(function(){
					 	// 						that.calcArticleHeight()
					 	// 					},100)
					 // })
				  })
			},
			getList(p){
				var that=this
				var params={
				  page:p,
				  pagesize: this.pageSize,
				  newsid:this.id
				}
				  var url='&r=api.college.news.comment'
				  this.$apiPost(url,params).then((res) =>{
					  that.total=res.total
					  that.commentList=that.dataList.concat(res.data)
					  that.more=''
					  
					 // if(that.page==1){
						//  that.$nextTick(function(){
						//  						 that.$loading()
						//  	setTimeout(function(){
						//  							that.calcArticleHeight()
						//  						},100)
						//  })
					 // }
				  }).catch((reason) =>{
					 // if(that.page==1){
						//  that.$nextTick(function(){
						//  						  that.$loading()
						//  	setTimeout(function(){
						//  		that.calcArticleHeight()
						//  	},1000)
						//  })
					 // }
				  })
				  
			},
			calcArticleHeight(){
				var that=this
				uni.getSystemInfo({
				  	success: (resu) => {
						that.windowH=resu.windowHeight
				  	const query = uni.createSelectorQuery()
				var  qs=query.select('#article').boundingClientRect()
				  	query.exec(function(res) {
						that.articleH=res[0].height
						that.topH=res[0].top
						uni.hideLoading()
						if(that.articleH-(that.windowH-that.topH)<=0){
							if(that.logined){
								that.readComplete=true
								// this.$msg('阅读完成')
								that.reportReadProgress()
							}
						}
				  		})
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
				  that.getList(that.page)
			  // },2000)
			},
			pubComment(e){
				var ce=this.$operateInterceptor(this.logined)
				if(!ce){
					return ;
				}
				var that=this,url
					url='&r=api.college.news.commentAdd'
				var params={
				  newsid:this.id,
				  uid:this.uid,
				  token:this.token,
				  content:e
				}
				  this.$apiPost(url,params).then((res) =>{
					  that.$msg('发布评论成功')
					  that.showComment()
					  this.$refs.ygcComment.maskState=0
					  this.$refs.ygcComment.content=''
					  that.$forceUpdate()
				  })
			},
			showComment(){
				this.page=1
				this.total=0
				this.more=''
				this.commentList=[]
				this.getList()
			},
			openComment(){
				this.$refs.ygcComment.maskState=1
			},
			// 评论点赞
			commentDoLike(id,zaned,from){
				var ce=this.$operateInterceptor(this.logined)
				if(!ce){
					return ;
				}
				this.$loading()
				var that=this,url
				if(zaned=='0'){
					url='&r=api.college.news.commentDoLike'
				}else{
					url='&r=api.college.news.commentDoLikeCancel'
				}
				var params={
				  news_comment_id:id,
				  uid:this.uid,
				  token:this.token
				}
				  this.$apiPost(url,params).then((res) =>{
					  uni.hideLoading()
					  // this.commentList[from].isLike=!this.commentList[from].isLike
					  if(zaned=='0'){
						  this.commentList[from].isLike='1'
					  	this.commentList[from].like++
						that.$msg('点赞成功')
					  }else{
						   this.commentList[from].isLike='0'
					  	this.commentList[from].like--
						that.$msg('取消点赞')
					  }
					  
					  that.$forceUpdate()
				  })
			},
			// 文章点赞
			toggleZan(zaned){
				var ce=this.$operateInterceptor(this.logined)
				if(!ce){
					return ;
				}
				this.$loading()
				console.log(zaned)
				var that=this,url
				if(zaned=='0'){
					url='&r=api.college.news.doLike'
				}else{
					url='&r=api.college.news.doLikeCancel'
				}
				var params={
				  newsid:this.id,
				  uid:this.uid,
				  token:this.token
				}
				  this.$apiPost(url,params).then((res) =>{
					  
					  if(zaned=='0'){
						  that.data.isLike='1'
						  that.$msg('点赞成功')
					  }else{
						  that.data.isLike='0'
						  that.$msg('取消点赞')
					  }
					  console.log(that.data.isLike)
					  uni.hideLoading()
					  that.$forceUpdate()
				  })
			},
			reportReadProgress(){
				var that=this,url
					url='&r=api.college.hotarticle.status'
				var params={
				  collegeid:this.data.id,
				  uid:this.uid,
				  token:this.token,
				  status:1
				}
				  this.$apiPost(url,params).then((res) =>{
					  that.$msg('已阅读完成')
				  })
			},
			closeSharePrompt(){
				 this.popshow=false
			},
			openShare(){
				var ce=this.$operateInterceptor(this.logined)
				if(!ce){
					return ;
				}
				this.title=this.data.title || '资讯详情'
				this.popshow=true
			}
		}
	}
</script>

<style>
	.luntan-change{
		margin-bottom: 40upx;
		padding-left: 30upx;
		/* width: 750upx; */
		box-sizing: border-box;
		height: 92upx;
		border-bottom: 1px solid #f7f7f7;
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
		/* padding: 0 0; */
		box-sizing: border-box;
	}
	.luntan-change-card{
		width: 100%;
		
		height: 60upx;
		margin-top: 20upx;
	}
	.luntan-change-card-txt{
		font-size: 28upx;
		color: #939393;
		display: block;
	}
	.luntan-change-card-txts{
		color: #000;
		display: inline-block;
		padding-bottom: 15upx;
		border-bottom: 2px solid #FF5761;
	}
	.luntan-change-card-xian{
		/* width: 100%; */
		/* height: 6upx; */
		color: #7f7f7f;
		float: right;
		border-radius: 6upx;
		margin-top: 14upx;
	}
	.luntan{
		width: 750upx;
		background-color: white;
	}
	.luntan-card{
		width: 100%;
		padding: 0 24upx 20upx;
		box-sizing: border-box;
	}
	.luntan-card-top{
		width: 100%;
		height: 80upx;
		padding: 24upx 0;
	}
	.luntan-card-top-img{
		width: 80upx;
		height: 100%;
		border-radius: 50%;
		float: left;
	}
	
	.luntan-card-top-txt{
		width: 434upx;
		height: 100%;
		float: left;
		margin-left: 28upx;
	}
	.luntan-card-top-txt-title{
		width: 100%;
		height: 42upx;
		line-height: 42upx;
		font-size: 28upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.luntan-card-top-txt-time{
		width: 100%;
		height: 22upx;
		font-size: 22upx;
		line-height: 22upx;
		margin-top: 16upx;
		color: #c3c3c3;
	}
	.luntan-card-top-btn{
		width: 120upx;
		height: 60upx;
		margin: 10upx 20upx 0;
		float: right;
	}
	.luntan-card-title{
		width: 100%;
		font-size: 28upx;
		line-height: 30upx;
		font-weight: 600;
		margin: 30upx 0;
		color: #6d6d6d;
	}
	.luntan-card-lianjie{
		width: 100%;
		font-size: 28upx;
		line-height: 30upx;
		color: #2447c2;
	}
	.luntan-card-introduce{
		width: 100%;
		font-size: 26upx;
		line-height: 34upx;
		margin: 10upx 0 18upx 0;
	}
	.luntan-card-img{
		width: 100%;
		height: 350upx;
	}
	.luntan-card-imgbox{
		width: 100%;
		height: 705upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.luntan-card-imgboxs{
		width: 464upx;
		height: 470upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.luntan-card-imgs{
		width: 228upx;
		height: 229upx;
		margin-bottom: 6upx;
		background-color: #007AFF;
	}
	.luntan-card-juli{
		width: 100%;
		height: 85upx;
		font-family: PingFang-SC-Regular;
		font-size: 24upx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 85upx;
		letter-spacing: 1upx;
		color: #6f6f6f;
	}
	.luntan-card-juli image{
		width: 28upx;
		height: 34upx;
		float: left;
		margin: 26upx 22upx 0 0;
		vertical-align: middle;
	}
	.luntan-card-bot{
		background: #f9f9f9;
		width: 100%;
		height: 74upx;
		margin-top: 30upx;
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
	.share{
		padding: 0 0 30upx 60upx;
		font-size: 26upx;
		color: #7f7f7f;
		margin: 40upx 0 10upx;
	}
	.share>text,
	.share image{
		display: inline-block;
		vertical-align: middle;
	}
	.share image{
		width: 50upx;
		height: 50upx;
		margin: 0 35upx ;
		
	}
	.comment{
		padding-left: 20upx;
	}
	.comment-item{
		display: flex;
		margin-bottom: 30upx;
	}
	.comment-item>image,
	.comment-item>view{
		/* display: inline-block;
		vertical-align: top; */
	}
	.comment-item>view{
		flex: 1;
	}
	.comment-item>image{
		width: 80upx;
		height: 80upx;
		margin-right: 30upx;
	}
	.f1{
		color: #2447C2;
	}
	.f2{
		color: #858585;
		margin-top: 15upx;
	}
	.fr .luntan-card-bot-card{
		width: initial;
		display: inline-block;
		vertical-align: middle;
		line-height: 44upx;
		margin-left: 40upx;
	}
	.fr{
		float: right;
	}
	
	.enter-button{
		color: #ff8f94;
		border: 1px solid #ff8f94;
		padding: 6upx 25upx;
		border-radius: 52upx;
		float: right;
		margin-top: 16upx;
	}
	
	.zaned{
		color: red;
	}
	
	.luntan-card-bot-card .iconfont{
		margin: 0 10upx;
	}
	.luntan-card-bot-card>text{
		vertical-align: middle;
	}
	.operate-pic{
		/* width: 1rem;
		height: 1rem; */
		margin: 0 10upx;
	}
	.operate-word{
		font-size: 28upx;
	}
	.article img{
		width: initial;
		max-width: 100%;
	}
</style>
