<template>
	<view>
		<view class="distributionOrder" >
			<view class="distributionOrder-title">累计金额:+{{totalCommission}}元</view>
			<scroll-view scroll-y="true" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
				<view class="distributionOrder-card"  v-for='(item,index) in dataList' :key='index' >
					<image class="distributionOrder-card-img" :src="item.avatar" mode=""></image>
					<view class="distributionOrder-card-title">
					{{item.nickname}}
					<text v-show="item.level=='1'">一级</text>
					<text v-show="item.level=='2'">二级</text>
					<text v-show="item.level=='3'">三级</text>
					</view>
					<view class="distributionOrder-card-zhuangtai cr">已完成</view>
					<view style="clear: both;"></view>
					<view class="distributionOrder-card-code">订单编号:{{item.orderno}}</view>
					<view class="distributionOrder-card-code distributionOrder-card-codes">下单时间：{{item.createtime}}</view>
					<view class="distributionOrder-card-bot">
							<text class="distributionOrder-card-bot-tishi">订单金额:</text>
							<text class="distributionOrder-card-bot-price">{{item.orderprice}}</text>
							<text class="distributionOrder-card-bot-tishi margin-left">获得佣金:+</text>
							<text class="distributionOrder-card-bot-price">{{item.commission}}</text>
					</view>
				</view>
				<uni-load-more :status="more"></uni-load-more>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components:{
			uniLoadMore
		},
		data() {
			return {
				uid:'',
				token:'',
				active:1,
				tabActive:0,
				sh:'',
				dataList:[],
				totalCommission:'',
				page:1,
				pageSize:20,
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
			   var userInfo=uni.getStorageSync('userInfo')
			   if(userInfo!='' & userInfo!=null & userInfo!=undefined){
			   	this.uid=userInfo.uid
			   	this.token=userInfo.token
			   	this.getList(this.page)
			   }
			   setTimeout(function(){
			   	that.$getHeight('#sv',(res) =>{
			   		that.sh=res
			   	})
			   },0)
		   },
		methods: {
			distributionOrderdetail(){
				uni.navigateTo({
					url:'/pages/distributionOrderdetail/distributionOrderdetail'
				})
			},
			to(where){
				uni.navigateTo({
					url:`/pages/retail/${where}`
				})
			},
			toggleTab(t){
				this.tabActive=t
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			toggle(t){
				this.active=t
				this.reset()
				this.getList(this.page)
			},
			reset(){
				this.page=1
				this.total=0
				this.dataList=[]
				this.more=''
			},
			getList(p){
				var that=this
				var params={
				  page:p,
				  pagesize: this.pageSize,
				  uid:this.uid,
				  token:this.token
				}
				if(this.page==1){
					this.$loading()
				}
				  var url='&r=api.member.agents.order'
				  this.$apiPost(url,params).then((res) =>{
					  that.total=res.total
					  that.dataList=that.dataList.concat(res.data)
					  that.totalCommission=res.totalCommission
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
page{
	background-color:#f3f3f3;
}
.distributionOrder-title{
	width: 750upx;
	height: 90upx;
	line-height: 90upx;
	background: linear-gradient(to right,#ff9da1,#ff7076);
	font-family: PingFang-SC-Regular;
	font-size: 28upx;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #ffffff;	
	margin-top: 20upx;
	text-indent:23upx;
}
.distributionOrder-card{
	width: 750upx;
	background-color: #FFFFFF;
	margin-top: 20upx;
}
.distributionOrder-card-img{
	width: 57upx;
	height: 57upx;
	float: left;
	margin: 16upx 23upx 0;
	border-radius: 50%;
	background-color: #007AFF;
}
.distributionOrder-card-title{
	width: 530upx;
	height: 57upx;
	font-family: PingFang-SC-Regular;
	font-size: 22upx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 57upx;
	color: #2f2f2f;
	float: left;
	margin-top: 16upx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.distributionOrder-card-title text{
	margin-left: 40upx;
}
.distributionOrder-card-zhuangtai{
	height: 57upx;
	font-family: PingFang-SC-Regular;
	font-size: 22upx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 57upx;
	float: right;
	text-align: center;
	margin: 16upx 28upx 0 0;
}
.distributionOrder-card-code{
	width: 700upx;
	font-family: PingFang-SC-Regular;
	font-size: 20upx;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 2upx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: #888888;
	margin: 41upx auto 0;
}
.distributionOrder-card-codes{
	margin: 18upx auto 0;
}
.distributionOrder-card-bot{
	width: 750upx;
	text-align: right;
	border-top: 2upx solid #ededed;
	margin-top: 28upx;
}
.distributionOrder-card-bot-price{
	display: inline-block;
	height: 100%;
	font-family: PingFang-SC-Regular;
	font-size: 30upx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 76upx;
	letter-spacing: 2upx;
	color: #181818;
	margin-right: 20upx;
}
.distributionOrder-card-bot-tishi{
	display: inline-block;
	height: 100%;
	font-family: PingFang-SC-Regular;
	font-size: 20upx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 80upx;
	letter-spacing: 2upx;
	color: #3f3f3f;
}
.margin-left{
	margin-left: 20upx;
}
</style>
