<template>
	<view class="">
		<view class="luntan">
			<view class="luntan-card" >
				<view class="luntan-card-top">
					<image class="luntan-card-top-img" src="../../static/img/bg/activity.png" mode=""></image>
					<view class="luntan-card-top-txt">
						<view class="luntan-card-top-txt-title">{{data.merchname}}</view>
						<view class="luntan-card-top-txt-time">{{data.createtime}}</view>
					</view>
					<view class="enter-button" >进店</view>
				</view>
				<view v-html="data.detail" id="article">
					
				</view>
				<!-- <view class="luntan-card-title">中期商会与你携手前行</view>
				<view class="luntan-card-lianjie">#坚守共赢胜利#</view>
				<view class="luntan-card-introduce">抗击疫情，中企商会在行动！截至2月8日，中企商会持续投入抗击疫情，面对这场突如其来的“疫”战，中企商会与大家共同坚守，终将会取得这场疫情防控狙击战的胜利！加油！</view>
				<image class="luntan-card-img" src="../../static/img/bg/activity.png" mode=""></image> -->
				<view class="share" id="share">
					<text>分享</text>
					<image src="../../static/img/pic/other/weixin.png" mode="" style="width: 55upx;"></image>
					<image src="../../static/img/pic/other/pyq.png" mode=""></image>
					<image src="../../static/img/pic/other/QQ.png" mode=""></image>
				</view>
			</view>
			
			
			<view>
				<view style="width: 750upx;height: 26upx;background-color: #f6f7fb;"></view>
				
				<view class="luntan-card">
					<view class="luntan-change">
						<view class="luntan-change-card">
							<text class="luntan-change-card-txt luntan-change-card-txts">评论{{total}}</text>
							<text class="luntan-change-card-xian">赞{{like}}</text>
						</view>
					</view>
					
					<view class="comment">
						<scroll-view scroll-y="true" id="sv" style="max-height: 500px;"  @scrolltolower='toBottom'>
							<view class="comment-item" v-for='(item,index) in commentList' :key='index'>
								<image class="" :src="item.avatar" mode=""></image>
								<view class="word">
									<view class="s2 cg">{{item.nickname}}</view>
									<view class="">{{item.content}}</view>
									<view class="f2">
										<text class="date">{{item.createtime}}</text>
										<view class="fr">
											<view class="luntan-card-bot-card">
												<text class="iconfont icon-zan"></text>
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
					<view class="luntan-card-bot-card">
						<text class="iconfont icon-share2"></text>
						<text>转发{{repost}}</text>
					</view>
					<view class="luntan-card-bot-card" @click="openComment">
						<text class="iconfont icon-tubiao-"></text>
						<text>评论{{comment}}</text>
					</view>
					<view class="luntan-card-bot-card">
						<text class="iconfont icon-zan"></text>
						<text>赞{{like}}</text>
					</view>
				</view>
			</view>
			
		</view>
		
		<ygc-comment ref="ygcComment" 
		        :placeholder="'发布评论'" 
		        @pubComment="pubComment"></ygc-comment>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import ygcComment from '@/components/ygc-comment/ygc-comment.vue';
	export default{
		components:{
			uniLoadMore,
			ygcComment
		},
		data(){
			return{
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
				page:1,
				pageSize:5,
				total:0,
				more:''
			}
		},
		onLoad(e){
			this.id=e.id
			this.like=e.like
			this.comment=e.comment
			this.repost=e.repost
		},
		onPageScroll(e){
			console.log(e)
		},
		computed: {
		     noMore () {
		       return this.commentList.length >= this.total
		     },
		   },
		   mounted(){
		   	var that=this
		   	this.getDetail()
		   	setTimeout(function(){
		   		that.$getHeight('#sv',(res) =>{
					console.log(res)
		   			that.sh=res
		   		})
		   	},0)
		   },
		methods:{
			toggleTab(t){
				this.tabActive=t
			},
			getDetail(){
				var that=this
				var params={
				  id:this.id
				}
				  var url='&r=api.college.hotarticle.detail&id='+this.id
				  this.$apiPost(url,params).then((res) =>{
					  that.data=res.data
					  that.$nextTick(function(){
					  	that.calcArticleHeight()
					  })
					  that.getList()
				  })
			},
			getList(p){
				var that=this
				// var params={
				//   page:p,
				//   pagesize: this.pageSize
				// }
				if(this.page==1){
					this.$loading()
				}
				  var url='&r=api.college.hotarticle.comment&page='+this.page+'&pagesize='+this.pageSize+'&collegeid='+this.id
				  this.$apiPost(url).then((res) =>{
					  that.total=res.total
					  that.commentList=that.dataList.concat(res.data)
					  that.more=''
					  if(that.page==1){
					  	uni.hideLoading()
					  }
				  })
			},
			calcArticleHeight(){
				uni.getSystemInfo({
				  	success: (resu) => {
				  	const query = uni.createSelectorQuery()
				  	query.select('#article').boundingClientRect()
				  	query.exec(function(res) {
							console.log(res)
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
			pubComment(){
				this.$refs.ygcComment.maskState=0
				this.$refs.ygcComment.content=''
			},
			openComment(){
				this.$refs.ygcComment.maskState=1
			},
			
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
		padding: 0 24upx;
		box-sizing: border-box;
	}
	.luntan-card-top{
		width: 100%;
		height: 80upx;
		margin-top: 24upx;
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
		margin: 0 10upx 6upx 0;
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
		border: 2px solid #ff8f94;
		padding: 10upx 15upx;
		border-radius: 52upx;
		float: right;
		margin-top: 19upx;
	}
</style>
