<template>
	<view>
		<view class="padding top border-bottom">
			<image src="../../static/img/bg/activity.png" mode="" class="preview"></image>
			<view class="show-top">
				<view class="name">萨克打卡塑料袋即可拉伸京东卡上课了接到了打蜡卡时间段吉安市</view>
				<view class="share" @click="openShare">
					<view class="icon-fire iconfont cr"></view>
					<view class="cr s2">分享</view>
				</view>
			</view>
			<view class="cr s5">$ 58</view>
			<view class="cg s3">快递:10</view>
		</view>
		
		<view class="padding s2 border-bottom" @click="chooseCategory">
			<text class="cg" style="margin-right: 30upx;">选择</text>
			<text>选择 颜色分类</text>
			<text class="fr icon-fire iconfont cg"></text>
		</view>
		
		<view class="border-bottom s2">
			<view class="padding ">
				<text class="" style="margin-right: 30upx;">商品评价(797)</text>
				<text class="fr cr">查看全部 <text class="icon-fire iconfont" style="margin-left: 30upx;"></text></text>
			</view>
			<view class="padding">
				<view class="user">
					<image src="../../static/img/bg/activity.png" mode="" class="headface"></image>
					<text>余量打算的撒多</text>
				</view>
				<view class="comment">
					<view class="comment-word">
						啊实打实大师大所大所啊实打实大师大所大所啊实打实大师大所大所啊实打实大师大所大所啊实打实大师大所大所
						啊实打实大师大所大所啊实打实大师大所大所啊实打实大师大所大所啊实打实大师大所大所
					</view>
					<view class="comment-pic">
						<image src="../../static/img/bg/activity.png" mode="" v-for="(item,index) in 3" :key='index'></image>
					</view>
				</view>
				<view class="s3 cg">粉色，M</view>
				<view class="" style="text-align: center;">
					<button type="default" class="btn">查看全部评价</button>
				</view>
			</view>
		</view>
		
		<view class="">
			<view class="sp-item3"  v-for="(item,index) in 1" :key='index'>
				<view class="sp-item3-top">
					<view>
						<image src="../../static/img/pic/logo.png" mode="" class="headface"></image>
					</view>
					<view class="sp-item3-top-middle">
						<view>小象母婴馆</view>
						<view>
							<uni-rate disabled="true" size="12" value="3.5" style="float: left;margin-top: 24upx;"></uni-rate>
							<text class="s3 cg">1429人关注</text>
						</view>
					</view>
					<view class="enter-button enter-button1" >关注</view>
					<view class="enter-button enter-button2" >进店</view>
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
		
		<view class="hot">
			<text>热卖商品</text>
		</view>
		
		
		<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup" 
		 @click="onClick" @buttonClick="buttonClick" />
		 
		 <sku ref='sku'></sku>
		 
		 <uni-popup ref="popup" type="bottom">
			 <view class="popup">
				 <view class="cr s5">分享给好友</view>
				 <view class="padding">
					 <view class="share-item">
						 <image src="../../static/img/bg/activity.png" mode=""></image>
						 <view class="">朋友圈</view>
					 </view>
					 <view class="share-item">
					 						 <image src="../../static/img/bg/activity.png" mode=""></image>
					 						 <view class="">微信</view>
					 </view>
					 <view class="share-item">
					 						 <image src="../../static/img/bg/activity.png" mode=""></image>
					 						 <view class="">生成海报</view>
					 </view>
				 </view>
				 <view>
					 <button type="default" class="text-btn">取消</button>
				 </view>
			 </view>
		 </uni-popup>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	import sku from '@/components/sku/pages/sku.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default{
		components:{
			uniRate,
			uniGoodsNav,
			sku,
			uniPopup
		},
		data () {
		      return {
		        options: [{
		          icon: 'icon-fire',
		          text: '客服'
		        }, {
		          icon: 'icon-fire',
		          text: '店铺'
		        }, {
		          icon: 'icon-fire',
		          text: '收藏',
		          info: 2
		        }],
		        buttonGroup: [{
		          text: '加入购物车',
		          backgroundColor: '#ff0000',
		          color: '#fff'
		        },
		        {
		          text: '立即抢购',
		          backgroundColor: '#ffa200',
		          color: '#fff'
		        }
		        ]
		      }
		    },
		    methods: {
		      onClick (e) {
		        uni.showToast({
		          title: `点击${e.content.text}`,
		          icon: 'none'
		        })
		      },
		      buttonClick (e) {
		        console.log(e)
				if(e.index==0){
					uni.switchTab({
						url:'/pages/tabBar/cart',
					})
				}else{
					uni.navigateTo({
						url:'./createOrder'
					})
				}
		        // this.options[2].info++
		      },
			  chooseCategory(){
				  this.$refs.sku.specClass='show'
			  },
			  openShare(){
				  this.$refs.popup.open()
			  }
		    }
	}
</script>

<style>
	.preview{
		width: 100%;
		height: 550upx;
	}
	.top>view{
		margin-bottom: 20upx;
	}
	.show-top>view{
		display: inline-block;
		vertical-align: middle;
	}
	.share{
		text-align: center;
	}
	.show-top .name{
		width: 580upx;
		line-height: 48upx;
		margin-right: 50upx;
	}
	.border-bottom{
		border-bottom: 20upx solid #f3f3f3;
	}
	
	.user>image,
	.user>text{
		vertical-align: middle;
		display: inline-block;
	}
	
	.user .headface{
		width: 70upx;
		margin-right: 20upx;
		height: 70upx;
		border-radius: 50%;
	}
	.comment-word{
		line-height: 1.5;
		height: 72upx;
		overflow:hidden;//一定要写
		    text-overflow: ellipsis;//超出省略号
		    display:-webkit-box;//一定要写
		    -webkit-line-clamp: 2;//控制行数
		    -webkit-box-orient: vertical;//一定要写
			margin: 25upx 0 15upx;
	}
	
	.comment-pic image{
		width: 31%;
		height: 200upx;
		border-radius: 10upx;
		margin-right: 2% ;
	}
	.btn{
		border: 1px solid #b8b8b8;
		padding: 0 25upx;
		text-align: center;
		border-radius: 50upx;
		display: inline-block;
		font-size: 30upx;
		background-color: #fff;
		margin: 30upx 0;
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
		margin: 0 15upx;
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
		padding: 0 30upx;
		/* margin: 0 18upx; */
		display: flex;
		justify-content: space-between;
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
	.enter-button1{
		margin-left: 30upx;
		background-color: #ff8f94;
		color: #fff;
	}
	
	
	.hot{
		text-align: center;
		padding: 20upx 0;
		background-color: #f3f3f3;
	}
	.hot text,
	.hot text::before,
	.hot text::after{
		display: inline-block;
		vertical-align: middle;
	}
	.hot text::before{
		content: '';
		width: 80upx;
		height: 1px;
		background-color: #aeaeae;
		margin-right: 30upx;
	}
	.hot text::after{
		content: '';
		width: 80upx;
		height: 1px;
		background-color: #aeaeae;
		margin-left: 30upx;
	}
	
	.popup{
		text-align: center;
		background-color: #fff;
		z-index: 99;
		padding-top: 30upx;
	}
	.share-item{
		display: inline-block;
		width: 33%;
		padding-bottom: 30upx;
		border-bottom: 1px solid #efefef;
	}
	.share-item image{
		width: 80upx;
		height: 80upx;
	}
	.text-btn{
		border: none !important;
		outline: none;
		background-color: #fff !important;
		color: #666 !important;
		line-height: 70upx;
		padding: 0 0 20upx;
		text-align: center;
	}
	.text-btn:after{
		display: none;
	}
</style>
