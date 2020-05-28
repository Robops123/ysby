<template>
	<view class="padding">
		<view class="nav-bar">
			<view class="nav nav-left" :class="{active:active==1}" @click="toggle(1)"><text>附近商家</text></view>
			<view class="nav nav-right" :class="{active:active==2}" @click="toggle(2)"><text>优质产品</text></view>
		</view>
		
		<scroll-view scroll-y="true" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom' >
		<view class="" v-if="active==1">
			<view class="sp-item3"  v-for="(item,index) in dataList" :key='index'>
				<view class="sp-item3-top">
					<view>
						<image :src="item.logo" mode="" class="headface"></image>
					</view>
					<view >
						<view class="sp-item3-top-middle ellipsis">{{item.merchname}}</view>
						<view>
							<uni-rate disabled="true" size="12" :value="item.avgstar" style="float: left;margin-top: 24upx;"></uni-rate>
							<text class="s3 cg">{{item.collect}}人关注<text class="s2" v-if="lng && lat"> | {{parseInt(item.distance)}}千米</text></text>
						</view>
					</view>
					<view class="enter-button" @click="toShop(item.id)">进店</view>
				</view>
				<view class="sp-item3-bottom">
					<view class="" v-for="(childItem,childIndex) in item.goods" :key='childIndex' @click="toDetail(childItem.goodsid)">
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
		
		
			<view class="box" v-if="active==2">
				<view class="list" v-for="(item,index) in dataList" :key='index' @click="toDetail(item.id)">
					<image :src="item.thumb" mode=""></image>
					<view class="word">
						<view class="s3 ellipsis">{{item.title}}</view>
						<view class="s1 cr">￥{{item.marketprice}}<text class="s2 cg fr">已售{{item.sales}}件</text></view>
					</view>
				</view>
			</view>
			<uni-load-more :status="more"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		data(){
			return{
				located:false,
				active:1,
				sh:'',
				dataList:[],
				page:1,
				pageSize:5,
				total:0,
				more:'',
				lat:'',
				lng:''
			}
		},
		components:{
			uniRate,
			uniLoadMore
		},
		computed: {
		     noMore () {
		       return this.dataList.length >= this.total
		     },
		   },
		   mounted(){
		   	var that=this
		   	this.apart()
		   	setTimeout(function(){
		   		that.$getHeight('#sv',(res) =>{
		   			that.sh=res
		   		})
		   	},0)
		   },
		methods:{
			toShop(id){
				uni.navigateTo({
					url:`/pages/bussiness/shopPreview?id=${id}`
				})
			},
			toDetail(id){
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
					 url='&r=api.discovery.merchant'
					if(this.located){
						params.lng=this.longitude
						params.lat=this.latitude
						this.getList(params,url)
					}else{
						this.locate(params,url)
					}
				}else{
					 url='&r=api.discovery.goods'
					that.getList(params,url)
				}
			},
			getList(p,url){
				var that=this
				if(this.page==1){
					this.$loading()
				}
				  this.$apiPost(url,p).then((res) =>{
					  that.dataList=that.dataList.concat(res.data)
					  that.total=res.total
					  that.more=''
					  if(that.page==1){
					  	uni.hideLoading()
					  }
				  })
			},
			locate(params,url){
				var that=this
				uni.getLocation({
					type: 'wgs84',
					success:(res) =>{
						that.located=true
						that.lng=res.longitude
						that.lat=res.latitude
						params.lng=res.longitude
						params.lat=res.latitude
						that.getList(params,url)
					},
					fail:(reason) =>{
						params.lng=''
						params.lat=''
						that.getList(params,url)
						that.located=false
						that.$msg('请打开定位功能')
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
		width: 50%;
		box-sizing: border-box;
	}
	.nav-left{
		padding-right: 50upx;
		text-align: right;
	}
	.nav-right{
		padding-left: 50upx;
		text-align: left;
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
		margin: 0 15upx;
	}
	.sp-item3-top-middle{
		max-width: 400upx;
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
</style>
