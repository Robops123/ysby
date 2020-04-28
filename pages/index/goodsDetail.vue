<template>
	<view>
		<view class="padding top border-bottom">
			<!-- <image src="../../static/img/bg/activity.png" mode="" class="preview"></image> -->
			<swiper class="preview" autoplay="false" duration="500" interval="3000" >
			    <swiper-item v-for="(item, index) in data.thumb_url" :key="index">
			    	<image :src="item" mode="" class="banner"></image>
			    </swiper-item>
			   </swiper>
			<view class="show-top" style="margin-top: 20upx;">
				<view class="name">{{data.title}}</view>
				<view class="share" @click="openShare">
					<view class="icon-share iconfont cr"></view>
					<view class="cr s2">分享</view>
				</view>
			</view>
			<view class="cr s5">￥{{data.marketprice}}</view>
			<view class="cg s3">快递:10</view>
		</view>
		
		<view class="padding s2 border-bottom" @click="chooseCategory">
			<text class="cg" style="margin-right: 30upx;">选择</text>
			<text>{{choosedSpec!='' ? choosedSpec.selectArr:'选择 颜色分类'}}</text>
			<text class="fr icon-arrow-right iconfont cg"></text>
		</view>
		
		<view class="border-bottom s2">
			<view class="padding ">
				<text class="" style="margin-right: 30upx;">商品评价({{data.commentstotal}})</text>
				<text class="fr cr" @click="toComments">查看全部 <text class="icon-arrow-right iconfont" style="margin-left: 30upx;"></text></text>
			</view>
			<view class="padding" v-for="(item,index) in data.comments" :key='index'>
				<view class="user">
					<image :src="item.headimgurl" mode="" class="headface"></image>
					<text>{{item.nickname}}</text>
				</view>
				<view class="comment">
					<view class="comment-word">
						{{item.content}}
					</view>
					<view class="comment-pic">
						<image :src="commentImgItem" mode="" v-for="(commentImgItem,commentImgIndex) in item.picurl" v-if='commentImgIndex<=3' :key='commentImgIndex'></image>
					</view>
				</view>
				<view class="s3 cg">{{item.skuname}}</view>
				
			</view>
			<view class="" style="text-align: center;">
				<button type="default" class="btn" @click="toComments">查看全部评价</button>
			</view>
		</view>
		
		<view class="">
			<view class="sp-item3"  v-for="(item,index) in 1" :key='index'>
				<view class="sp-item3-top">
					<view>
						<image :src="data.logo" mode="" class="headface"></image>
					</view>
					<view class="sp-item3-top-middle">
						<view>{{data.merchname}}</view>
						<view>
							<uni-rate disabled="true" size="12" :value="data.avgstar" style="float: left;margin-top: 24upx;"></uni-rate>
							<text class="s3 cg">{{data.collect}}人关注</text>
						</view>
					</view>
					<view class="enter-button enter-button1" >关注</view>
					<view class="enter-button enter-button2" >进店</view>
				</view>
				<view class="sp-item3-bottom">
					<view v-for="(goodsItem, goodsIndex) in data.goods" :key="goodsIndex">
						<image :src="goodsItem.thumb" mode=""></image>
						<view class="price">￥{{goodsItem.marketprice}}</view>
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
		
		<view class="hot">
			<text>热卖商品</text>
		</view>
		<view class="detail" v-html="data.content">
			
		</view>
		
		
		<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup" 
		 @click="onClick" @buttonClick="buttonClick" />
		 
		 <sku ref='sku' @completeSpecChoose='completeSpecChoose' :category='category' :total='total' v-if="receivedCategory" :goodsid='id'></sku>
		 
		 
		 <view  class="popup-box" v-if="popshow">
			 <view class="wrapper" @click="popshow=false"></view>
			 <view class="popup animated slideInUp">
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
					 <button type="default" class="text-btn" @click="popshow=false">取消</button>
				 </view>
			 </view>
		 </view>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	import sku from '@/components/sku/pages/sku.vue'
	// import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default{
		components:{
			uniRate,
			uniGoodsNav,
			sku,
			// uniPopup
		},
		data () {
		      return {
				  popshow:false,
				  id:'',
				  merchId:'',
				  data:'',
				  category:[],
				  total:'',
				  receivedCategory:false,
				  choosedSpec:'',
		        options: [{
		          icon: 'icon-kefu',
		          text: '客服'
		        }, {
		          icon: 'icon-iconfontshop-copy',
		          text: '店铺'
		        }, {
		          icon: 'icon-star',
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
			onLoad(p){
				this.id=p.id
				this.merchId=p.merchId
				this.getDetail()
				this.getCategory()
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
						url:'./createOrder?goodsId='+this.id+'&merchId='+this.merchId+'&choosedSpec='+JSON.stringify(this.choosedSpec)
					})
				}
		        // this.options[2].info++
		      },
			  chooseCategory(){
				  this.$refs.sku.specClass='show'
			  },
			  openShare(){
				  this.popshow=true
			  },
			  getDetail(){
				  var that=this
				  var url='&r=api.goods.detail&id='+this.id
				  // var params={
				  //   page:p,
				  //   pagesize: this.pageSize
				  // }
				    // var url='/wangtosale_list'
				    this.$apiPost(url).then((res) =>{
						that.data=res.data
				  	  // that.total=res.total
				  	  // that.dataList=that.dataList.concat(res.data)
				  	  // that.more=''
				    })
			  },
			  getCategory(){
				  var that=this
				  var url='&r=api.goods.detail.sku&goodsid='+this.id
				    this.$apiPost(url).then((res) =>{
						if(res.data!=''){
							that.category=res.data
							that.total=res.stock
							that.receivedCategory=true
						}
				  		
				    })
			  },
			  completeSpecChoose(e){
				  console.log(e)
				  this.choosedSpec=e
			  },
			  toComments(){
				  uni.navigateTo({
				  	url:'./goodsComments?id='+this.id
				  })
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
	.popup-box{
		position: fixed;
		display: flex;
		align-items: flex-end;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
	}
	.popup-box .wrapper{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #333;
		opacity: 0.6;
	}
	.popup-box .popup{
		position: relative;
		width: 100%;
		bottom: 0 !important;
		left: 0;
		right: 0;
		height: 360upx;
		box-sizing: border-box;
	}
	
</style>
