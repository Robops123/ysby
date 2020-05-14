<template>
	<view style="background: white;">
		<view class="tip">预计佣金:+{{totalCommission || 0}}元</view>
		<view  class="nav-bar">
			<view :class="{active:active==0}" @click="toggleNav(0)">所有</view>
			<view :class="{active:active==1}" @click="toggleNav(1)">待审核</view>
			<view :class="{active:active==3}" @click="toggleNav(3)">未打款</view>
			<view :class="{active:active==4}" @click="toggleNav(4)">已打款</view>
			<view :class="{active:active==2}" @click="toggleNav(2)">无效</view>
		</view>
		<scroll-view scroll-y id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
			<view class="list-item s2" v-for='(item,index) in dataList' :key='index'>
				<view>
					<text>{{item.paytype==1 ? '提现到微信钱包':'提现到银行卡'}}</text>
					<text class="fr">+{{item.commission}}</text>
				</view>
				<view>
					<text class="sm-gray">{{item.createtime}}</text>
					<text class="fr" v-show='item.status=="1"'>待审核</text>
					<text class="fr" v-show='item.status=="2"'>审核驳回</text>
					<text class="fr" v-show='item.status=="3"'>未打款</text>
					<text class="fr" v-show='item.status=="4"'>已打款</text>
				</view>
			</view>
			
			<!-- <view class="conclude">
				<view>
					<view>申请佣金</view>
					<view class="sm-gray">35.00</view>
				</view>
				<view>
					<view>实际金额</view>
					<view class="sm-gray">35.00</view>
				</view>
				<view>
					<view>提现手续费</view>
					<view class="sm-gray">35.00元</view>
				</view>
			</view> -->
			<uni-load-more :status="more"></uni-load-more>
		</scroll-view>
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
				totalCommission:'',
				token:'',
				active:1,
				tabActive:0,
				sh:'',
				dataList:[],
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
			toggleNav(t){
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
				  token:this.token,
				  status:this.active
				}
				if(this.page==1){
					this.$loading()
				}
				  var url='&r=api.member.commission.detail'
				  this.$apiPost(url,params).then((res) =>{
					  that.total=res.total
					  that.totalCommission=res.totalCommission
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
	.tip{
		line-height: 90upx;
		padding-left: 20upx;
		color: white;
		background: linear-gradient(to right,#ff9da1,#ff7076);
	}
.nav-bar{
	display: flex;
	justify-content: space-around;
	line-height: 90upx;
}
.active{
	border-bottom: 2px solid #ff6d7e;
		color: #ff6d7e;
}
.sm-gray{
	color: #8f8f8f;
	font-size: 30upx;
}
.list-item{
	padding: 30upx 20upx;
	border-bottom: 2px solid #e4e4e4;
}
.conclude{
	display: flex;
	justify-content: space-around;
	padding: 25upx 0;
	}
	.conclude view{
		text-align: center;
		
		line-height: 50upx;
	}
	.fr{
		float: right;
	}
</style>
