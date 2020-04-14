<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 -->
			<uni-status-bar />
		<!-- #endif -->
		<view class="top-nav padding">
			<icon type="search" size="20" class="icon" @click="back"/>
			<view class="search-line">
				<input type="text" value="" placeholder="寻找附近的商家"/>
			</view>
			<view>
				<icon type="info" size="20"/>
			</view>
		</view>
		
		
		<view class="main">
			<view class="nav-bar">
				<view class="nav nav-left" :class="{active:active==1}" @click="toggle(1)"><text>全部</text></view>
				<view class="nav nav-right" :class="{active:active==2}" @click="toggle(2)"><text>销量</text></view>
				<view class="nav nav-left" :class="{active:active==3}" @click="toggle(3)"><text>价格</text></view>
				<view class="nav nav-right" :class="{active:active==4}" @click="toggle(4)"><text>店铺</text></view>
			</view>
			<scroll-view scroll-y="true" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
				<view class="padding">
					<view class="list" v-for="(item,index) in 5" :key='index'>
						<image src="../../static/img/bg/activity.png" mode=""></image>
							<view class="info">
								<view class="s2 title">
									儿童木马麻木童儿儿童木马麻木童儿儿童木马麻木童儿儿童木马麻木童儿
									童儿儿童木马麻木童儿儿童木马麻木童儿童儿儿童木马麻木童儿儿童木马麻木童儿
								</view>
								<view class="bottom-content cr s5"><text class="s1">$</text>79.80</view>
								<view class="buy">
									<icon type="" class="icon-fire iconfont cr"></icon>
								</view>
							</view>
					</view>
				</view>
				<!-- <p v-if="loading" class="hint">加载中...</p>
				   <p v-if="noMore" class="hint">没有更多了</p> -->
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from "@/components/uni-status-bar/uni-status-bar"
	export default{
		components:{
			uniStatusBar
		},
		data(){
			return{
				active:1,
				sh:'',
				page:1,
				pageSize:5,
				total:0,
			}
		},
		computed: {
		     // noMore () {
		     //   return this.dealList.length >= this.total
		     // },
		     // disabled () {
		     //   return this.loading || this.noMore
		     // }
		   },
		onLoad(){
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
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			getList(p){
				var that=this
				var params={
				  page:p,
				  pagesize: this.pageSize
				}
				  var url='http://admin.chinaduancai.com/api/wangtosale_list'
				  uni.request({
				  	data:params,
					url:url,
					success:(res) =>{
						console.log(res)
					}
				  })
			},
			load(){
			  this.page++
			  this.getList(this.page)
			},
			toBottom(){
				console.log('bottom')
			}
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
		display: flex;
		justify-content: space-around;
		align-items: center;
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
</style>
