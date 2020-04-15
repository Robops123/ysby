<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 -->
			<uni-status-bar />
		<!-- #endif -->
		<view class="nav padding">
			<text class="iconfont icon-address cr" ></text>
			<view>无锡</view>
			<view class="search-line">
				<icon type="search" size="20" class="icon" @click="search"/>
				<input type="text" value="" placeholder="寻找附近的商家"/>
			</view>
			<view class="comment">
				<image src="../../static/img/pic/comment.png" mode="" class="" ></image>
			</view>
		</view>
		
		<!-- 列表 -->
		<view class="padding main">
			<image src="../../static/img/bg/activity.png" mode="" class="banner"></image>
			
			<view class="announcement">
				<text class="s1 cr title">公告</text>
				<view class="s2 cg content ellipsis"><icon type="" class="iconfont icon-tubiao-" size="12"/>中企商会酒店APP将于今年4月全新asdasd上线，敬请期待！</view>
			</view>
			
			
			<!-- 类型 -->
			<view class="list ">
				<view class="list-item" v-for="(item,index) in productList" :key='index' @click="toCategory">
					<image :src="`${item.imgUrl}`" mode=""></image>
					<view class="item-name cg s3">{{item.name}}</view>
				</view>
			</view>
			
			<image src="../../static/img/bg/activity.png" mode="" class="banner banner2"></image>
			
			<view class="card card1">
				<view>
					<text>每日特价</text>
					<view class="fr s3 more">超低价好货<icon class="iconfont icon-arrow-right" type="" size='14'/></view>
				</view>
				<view class="sp">
					<view class="sp-item" v-for="(item,index) in 3" :key='index'>
						<image src="../../static/img/bg/activity.png" mode=""></image>
						<view class="s3 ellipsis">婴儿衣物洗衣液</view>
						<view class="cr s3">$ 282.00</view>
						<view class="cg s2 del">$ 320.00</view>
					</view>
				</view>
			</view>
		</view>
		
		<image src="../../static/img/bg/activity.png" mode="" class="banner banner3"></image>
		
		<view class="hot padding">
			<view class="hot-title"><image src="../../static/img/pic/index/hot.png" mode=""></image>热卖商品</view>
			<view class=" sp2">
				<view class="sp-item2 " v-for="(item,index) in 6" :key='index'>
					<image src="../../static/img/bg/activity.png" mode=""></image>
					<view class="s3 ellipsis">AARDMAN尿布包 烦那个谁多撒大声地</view>
					<view class="cr s3">$282</view>
				</view>
			</view>
		</view>
		
		<image src="../../static/img/bg/activity.png" mode="" class="banner banner2"></image>
		
		<view class="padding">
			<view class="card card2">
				<text>附近商家</text>
				<view class="fr s3 more">聚集知名店铺<icon class="iconfont icon-arrow-right" type="" size='14'/></view>
			</view>
			
			
		</view>
		<view class="">
			<view class="sp-item3"  v-for="(item,index) in 3" :key='index'>
				<view class="sp-item3-top">
					<view>
						<image src="../../static/img/pic/logo.png" mode="" class="headface"></image>
					</view>
					<view class="sp-item3-top-middle">
						<view>小象母婴馆</view>
						<view>
							<uni-rate disabled="true" size="12" value="3.5" style="float: left;margin-top: 24upx;"></uni-rate>
							<text class="s3 cg">1429人关注 | <text class="s2">500m以内</text></text>
						</view>
					</view>
					<view class="enter-button">进店</view>
				</view>
				<view class="sp-item3-bottom">
					<view class="">
						<image src="../../static/img/bg/activity.png" mode=""></image>
						<view class="price">$282</view>
					</view>
					<view class="">
						<image src="../../static/img/bg/activity.png" mode=""></image>
						<view class="price">$282</view>
					</view>
					<view class="">
						<image src="../../static/img/bg/activity.png" mode=""></image>
						<view class="price">$282</view>
					</view>
				</view>
			</view>
		</view>
		<uni-rate disabled="true" size="12" value="3.5" style="float: left;margin-top: 24upx;"></uni-rate>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniStatusBar from "@/components/uni-status-bar/uni-status-bar"
	export default{
		components:{
			uniRate,
			uniStatusBar
		},
		data(){
			return{
				productList:[
					{name:'睡眠用品',type:1,imgUrl:'../../static/img/pic/index/icon6.png'},
					{name:'出行用品',type:2,imgUrl:'../../static/img/pic/index/icon2.png'},
					{name:'浴室用品',type:3,imgUrl:'../../static/img/pic/index/icon8.png'},
					{name:'幼教玩具',type:4,imgUrl:'../../static/img/pic/index/icon7.png'},
					{name:'哺乳用品',type:5,imgUrl:'../../static/img/pic/index/icon1.png'},
					{name:'护理用品',type:6,imgUrl:'../../static/img/pic/index/icon5.png'},
					{name:'服饰鞋帽',type:7,imgUrl:'../../static/img/pic/index/icon3.png'},
					{name:'孕产用品',type:8,imgUrl:'../../static/img/pic/index/icon9.png'},
					{name:'更多分类',type:9,imgUrl:'../../static/img/pic/index/icon4.png'},
					{name:'在线客服',type:10,imgUrl:'../../static/img/pic/index/icon10.png'}
				]
			}
		},
		mounted(){
		},
		methods:{
			search(){
				uni.navigateTo({
					url:`/pages/index/searchResult`
				})
			},
			toCategory(){
				uni.navigateTo({
					url:`/pages/index/goodsCategory`
				})
			}
		}
	}
</script>

<style>
	.nav{
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
	.banner{
		border-radius: 10upx;
		width: 100%;
		height: 320upx;
	}
	.banner2{
		height: 220upx;
		margin-top: 20upx;
	}
	.banner3{
		margin: 10upx 0 20upx;
		height: 260upx;
	}
	.title{
		margin-right: 10upx;
		padding-right: 10upx;
		border-right: 1px solid #f4f4f4;
	}
	.content icon{
		margin-right: 5upx;
		color: #ffba2d;
	}
	.content{
		display: inline-block;
		vertical-align: middle;
		width: 80%;
	}
	
	.list{
		text-align: justify;
		margin-top: 30upx;
	}
	.list-item{
		display: inline-block;
		margin:0 42upx 26upx 0;
		text-align: center;
	}
	.list-item:nth-of-type(5n){
		margin-right: 0;
	}
	.list-item image{
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
	}
	
	.card{
		padding: 10upx 8upx;
		margin: 15upx 0;
	}
	.card1{
		background-color: #fff7f5;
	}
	.card .more .iconfont{
		margin-left: 10upx;
		font-size: 28upx;
		border-radius: 50%;
		color: #ffb6b9;
		/* background-color: #; */
		vertical-align: bottom;
	}
	
	.sp-item image{
		width: 200upx;
		height: 200upx;
		border-radius: 5upx;
	}
	.sp-item{
		margin:8upx 40upx 20upx 0;
		display: inline-block;
		vertical-align: top;
		/* pad */
	}
	.sp-item:last-child{
		margin-right: 0;
	}
	
	.hot{
		text-align: center;
	}
	.hot .hot-title,
	.hot .hot-title::before,
	.hot .hot-title::after{
		display: inline-block;
		vertical-align: middle;
	}
	.hot .hot-title::before{
		content: '';
		width: 80upx;
		height: 1px;
		background-color: #aeaeae;
		margin-right: 30upx;
	}
	.hot .hot-title::after{
		content: '';
		width: 80upx;
		height: 1px;
		background-color: #aeaeae;
		margin-left: 30upx;
	}
	.hot-title image{
		width: 30upx;
		height: 30upx;
		margin-right: 18upx;
	}
	
	.sp2{
		text-align: justify;
		margin: 40upx 0 20upx;
	}
	.sp2 .sp-item2{
		width: 47%;
		display: inline-block;
		margin-bottom: 15upx;
	}
	.sp2 .sp-item2:nth-of-type(odd){
		margin-right: 5%;
	}
	.sp2 .sp-item2 view{
		margin-bottom: 20upx;
	}
	.sp2 image{
		margin-bottom: 10upx;
		width: 100%;
		height: 350upx;
	}
	.card2{
		background-color: #fdf2f6;
		border-radius: 8upx;
		padding: 10upx 18upx;
		margin-bottom: 0;
	}
	
	.sp-item3:last-child .sp-item3-bottom{
		border-bottom: 50upx solid #f6f1f3;
	}
	.sp-item3-top{
		padding: 0 30upx;
		margin: 20upx 0;
	}
	.sp-item3-top .headface{
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
		margin: 0 15upx;
	}
	/* .sp-item3-top-middle{
		width: 300upx;
		} */
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
	.sp-item3-top>view{
		display: inline-block;
		vertical-align: middle;
	}
	.enter-button{
		color: #ff8f94;
		border: 2px solid #ff8f94;
		padding: 10upx 15upx;
		border-radius: 52upx;
		float: right;
		margin-top: 19upx;
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
		padding: 0 48upx;
		/* margin: 0 18upx; */
		display: flex;
		justify-content: space-between;
		border-bottom: 22upx solid #f6f1f3;
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
		
		.comment image{
			width: 45upx;
			height: 40upx;
			display: inline-block;
			vertical-align: middle;
		}
</style>
