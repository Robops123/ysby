<template>
	<view>
		<view class="top-nav padding">
			<view class="nav-content">
				<text class="iconfont icon-previewleft " @click="back"></text>
				<view class="search-line">
					<input type="text" value="" placeholder="寻找附近的商家"/>
				</view>
				<view class="comment">
					<image src="../../static/img/pic/comment.png" mode="" class="" ></image>
				</view>
			</view>
		</view>
		
		
		<view class="main">
			<view class="nav-bar">
				<view class="nav nav-left" :class="{active:active==1}" @click="toggle(1)"><text>全部</text></view>
				<view class="nav nav-right" :class="{active:active==2}" @click="toggle(2)"><text>销量</text></view>
				<view class="nav nav-left" :class="{active:active==3}" @click="toggle(3)">
					<text>价格</text>
					<view class="range s3">
						<text class="icon-arrowup iconfont" :class="{active:rangeActive==1}"></text>
						<text class="icon-arrowdown-copy iconfont" :class="{active:rangeActive==2}" ></text>
					</view>
					</view>
				<view class="nav nav-right" :class="{active:active==4}" @click="toggle(4)"><text>店铺</text></view>
			</view>
			<scroll-view scroll-y="true" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
				<view class="padding">
					<view class="list" v-for="(item,index) in dataList" :key='index'>
						<image src="../../static/img/bg/activity.png" mode=""></image>
							<view class="info">
								<view class="s2 title">
									儿童木马麻木童儿儿童木马麻木童儿儿童木马麻木童儿儿童木马麻木童儿
									童儿儿童木马麻木童儿儿童木马麻木童儿童儿儿童木马麻木童儿儿童木马麻木童儿
								</view>
								<view class="bottom-content cr s5"><text class="s1">$</text>79.80</view>
								<view class="buy">
									<image src="../../static/img/pic/cart.png" mode=""></image>
								</view>
							</view>
					</view>
				</view>
				<uni-load-more :status="more"></uni-load-more>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import uniStatusBar from "@/components/uni-status-bar/uni-status-bar"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		components:{
			uniStatusBar,
			uniLoadMore
		},
		data(){
			return{
				active:1,
				rangeActive:'',
				sh:'',
				dataList:[],
				page:1,
				pageSize:5,
				total:0,
				more:''
			}
		},
		computed: {
		     noMore () {
		       return this.dataList.length >= this.total
		     },
		   },
		mounted(){
			var that=this
			this.getList(this.page)
			setTimeout(function(){
				that.$getHeight('#sv',(res) =>{
					that.sh=res
				})
			},0)
		},
		methods:{
			toggle(t){
				this.active=t
				this.reset()
				this.getList(this.page)
			},
			toggleRange(t){
				console.log(t)
				this.rangeActive=t
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			reset(){
				this.page=1
				this.total=0
				this.dataList=[]
				this.more=''
				if(this.active!=3){
					this.rangeActive=''
				}else{
					this.rangeActive= this.rangeActive == 1 ? 2:1
				}
			},
			getList(p){
				var that=this
				var params={
				  page:p,
				  pagesize: this.pageSize
				}
				if(this.page==1){
					this.$loading()
				}
				  var url='/wangtosale_list'
				  this.$apiPost(url,params).then((res) =>{
					  that.total=res.allnum
					  that.dataList=that.dataList.concat(res.data)
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
				  that.getList(that.page)
			  // },2000)
			},
		}
	}
</script>

<style>
	.top-nav{
		z-index: 999;
		background-color: #fff;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		box-sizing: border-box;
		padding-top: var(--status-bar-height);
		/* display: flex;
		justify-content: space-around; */
		
	}
	 .nav-content{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.search-line{
		/* height: 120upx; */
		background-color: #f4f4f4;
		border-radius: 120upx;
		flex: 1;
		margin: 0 40upx;
		padding: 8upx 15upx;
	}
	.search-line icon{
		display: inline-block;
			vertical-align: middle;
	}
	.search-line input{
		display: inline-block;
		width: 70%;
		height: 100%;
		vertical-align: middle;
		margin-left: 10upx;
	}
	.main{
		padding-top: 96upx;
		margin-top: var(--status-bar-height);
	}
	
	.nav-bar{
		padding: 25upx 0;
		text-align: center;
	}
	.nav{
		color: #afafaf;
		display: inline-block;
		width: 25%;
		box-sizing: border-box;
	}
	.nav.active>text{
		color: #000000;
		position: relative;
	}
	.nav.active>text::before{
		content: '';
		position: absolute;
		bottom: -10upx;
		width: 50upx;
		background-color: #ff7379;
		height: 2px;
		left: 50%;
		margin-left: -25upx;
	}
	.range{
		display: inline-block;
		vertical-align: middle;
		margin-left: 15upx;
	}
	.range>.iconfont{
		font-size: 24upx;
		display: block;
		transform: scale(2);
	}
	.range>text.active{
		color: #000000;
	}
	
	
	
	.list{
		margin-bottom: 20upx;
	}
	.list>image,
	.list .info
	{
		display: inline-block;
		vertical-align: top;
	}
	.list>image{
		width: 280upx;
		height: 280upx;
		border-radius: 10px;
		margin-right: 20upx;
	}
	.list .title{
		line-height: 1.5;
		width: 360upx;
		height: 72upx;
		overflow:hidden;//一定要写
		    text-overflow: ellipsis;//超出省略号
		    display:-webkit-box;//一定要写
		    -webkit-line-clamp: 2;//控制行数
		    -webkit-box-orient: vertical;//一定要写
	}
	.list .bottom-content{
		margin: 80upx 0 30upx;
	}
	.buy{
		text-align: right;
	}
	.buy icon{
		border: 1px solid #ff6d7e;
		border-radius: 50%;
		padding: 10upx;
	}
	
	.hint{
		margin: 20upx 0;
		font-size: 28upx;
		text-align: center;
	}
	
	.comment image{
		width: 45upx;
		height: 40upx;
		display: inline-block;
		vertical-align: middle;
	}
	.range image{
		width: 15upx;
		height: 10upx;
	}
	.buy image{
		width: 60upx;
		height: 60upx;
		padding: 10upx;
	}
</style>
