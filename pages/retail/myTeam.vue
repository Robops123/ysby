<template>
	<view>
		<view class="nav-bar">
			<view class="nav nav-left" :class="{active:active==1}" @click="toggle(1)"><text>一级(4)</text></view>
			<view class="nav nav-right" :class="{active:active==2}" @click="toggle(2)"><text>二级(4)</text></view>
			<view class="nav nav-left" :class="{active:active==3}" @click="toggle(3)"><text>三级(4)</text></view>
		</view>
		
		<view class="distributionOrder" >
			<scroll-view scroll-y="true" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
				<view class="distributionOrder-card"  v-for='(item,index) in dataList' :key='index'>
					<image class="distributionOrder-card-img" :src="item.avatar" mode=""></image>
					<view class="distributionOrder-card-title">
						<view>{{item.nickname}}</view>
						<view class="s3 cg">注册时间:{{item.createtime}}</view>
					</view>
					<view class="distributionOrder-card-zhuangtai ">推广2人</view>
					<view style="clear: both;"></view>
					<!-- <view class="distributionOrder-card-code">订单编号:DFGHH5588644592148956</view>
					<view class="distributionOrder-card-code distributionOrder-card-codes">下单时间：2020-02-11 12:12</view> -->
					<view class="distributionOrder-card-bot">
							<text class="distributionOrder-card-bot-tishi">消费0.00元</text>
							<text class="fr">
								<text class="distributionOrder-card-bot-tishi margin-left">0个订单</text>
							</text>
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
				active:1,
				tabActive:0,
				sh:'',
				dataList:[],
				page:1,
				pageSize:7,
				total:0,
				total1:0,
				total2:0,
				total3:0,
				more:'',
				uid:'',
				token:''
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
			toggle(t){
				this.active=t
				console.log(t)
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
					uid:this.uid,
					token:this.token,
					level:this.active,
				  page:p,
				  pagesize: this.pageSize
				}
				if(this.page==1){
					this.$loading()
				}
				  var url='&r=api.member.agent.team'
				  this.$apiPost(url,params).then((res) =>{
					  if(that.active==1){
						  that.total=res.total1
					  }else if(that.active==2){
						   that.total=res.total2
					  }else{
						   that.total=res.total3
					  }
					  that.total1=res.total1
					  that.total2=res.total2
					  that.total3=res.total3
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
page{
	background-color:#f3f3f3;
}

.nav-bar{
	background-color: #fff;
		padding: 25upx 0;
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
	width: 100upx;
	height: 100upx;
	float: left;
	margin: 16upx 23upx 0;
	border-radius: 50%;
	background-color: #007AFF;
}
.distributionOrder-card-title{
	font-family: PingFang-SC-Regular;
	font-size: 22upx;
	line-height: 45upx;
	font-weight: normal;
	font-stretch: normal;
	color: #2f2f2f;
	float: left;
	margin-top: 16upx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.distributionOrder-card-zhuangtai{
	height: 80upx;
	font-family: PingFang-SC-Regular;
	font-size: 22upx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 80upx;
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
	padding: 0 20upx;
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
