<template>
	<view class="distribution">
		<view class="userinfo">
			<image class="userinfo-img" :src="data.avatar" mode=""></image>
			<view class="userinfo-txt">
				<view class="userinfo-txt-title">{{data.nickname}}</view>
				<view class="userinfo-txt-people">推荐人：{{data.invited_name ? data.invited_name:'暂无'}}</view>
			</view>
		</view>
		<view class="invisity-code" @click="showQrcode">
			<image class="invisity-code-img" src="../../static/img/pic/proxy/icon7.png" mode=""></image>
			<text class="invisity-code-txt">我的邀请码: {{data.invited_code}}</text>
			<image class="invisity-code-img fr invisity-code-img-r" src="../../static/img/pic/proxy/icon4.png" mode=""></image>
		</view>
		<view class="tixian">
			<view class="tixian-success">
				<view class="tixian-success-num">{{data.doneCommission}}</view>
				<view class="tixian-success-txt">成功提现佣金(元)</view>
			</view>
			<view class="tixian-ke">
				<view class="tixian-ke-left">
					<view class="tixian-success-num">{{data.canCommission}}</view>
					<view class="tixian-success-txt">可提现佣金(元)</view>
				</view>
				<view class="tixian-ke-right" @click="to('retailMoney')">佣金提现</view>
			</view>
		</view>
		<view class="distribution-info">
			<view class="distribution-info-card" @click="to('retailMoney')">
				<image class="distribution-info-card-img" src="../../static/img/pic/proxy/icon3.png" mode=""></image>
				<view class="distribution-info-card-right">
					<view class="distribution-info-card-right-top">代理佣金</view>
					<view class="distribution-info-card-right-bot">{{data.commission}} 元</view>
				</view>
			</view><view class="distribution-info-card distribution-info-cards" @click="to('retailOrder')">
				<image class="distribution-info-card-img" src="../../static/img/pic/proxy/icon2.png" mode=""></image>
				<view class="distribution-info-card-right">
					<view class="distribution-info-card-right-top">代理订单</view>
					<view class="distribution-info-card-right-bot">{{data.xxx || 0}} 笔</view>
				</view>
			</view><view class="distribution-info-card" @click="to('withdrawDetail')">
				<image class="distribution-info-card-img" src="../../static/img/pic/proxy/icon5.png" mode=""></image>
				<view class="distribution-info-card-right">
					<view class="distribution-info-card-right-top">提现明细</view>
					<view class="distribution-info-card-right-bot">{{data.withdrawalAmount}} 笔</view>
				</view>
			</view><view class="distribution-info-card distribution-info-cards" @click="to('myTeam')">
				<image class="distribution-info-card-img" src="../../static/img/pic/proxy/icon6.png" mode=""></image>
				<view class="distribution-info-card-right">
					<view class="distribution-info-card-right-top">我的团队</view>
					<view class="distribution-info-card-right-bot">{{data.teamAmount}} 人</view>
				</view>
			</view>
		</view>
		<view style="clear: both;"></view>
		<view class="tuiguang" @click="showQrcode">
			<image class="tuiguang-ma-img" src="../../static/img/pic/proxy/icon4.png" mode=""></image>
			<text class="tuiguang-txt">推广二维码</text>
			<text class="fr iconfont icon-fire cg"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid:'',
				token:'',
				data:'',
				qrcode:''
			}
		},
		mounted(){
			var userInfo=uni.getStorageSync('userInfo')
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.uid=userInfo.uid
				this.token=userInfo.token
				this.getInfo()
				this.getPromoteQrcode()
			}
		},
		methods: {
			to(where){
				uni.navigateTo({
					url:`./${where}`
				})
			},
			getInfo(){
				var that=this
				var url='&r=api.member.agents'
				var params={
					uid:this.uid,
					token:this.token
				}
				  this.$apiPost(url,params).then((res) =>{
					that.data=res.data	
				  })
			},
			getPromoteQrcode(){
				var that=this
				var url='&r=api.member.agents.invited_qrcode'
				var params={
					uid:this.uid,
					token:this.token
				}
				  this.$apiPost(url,params).then((res) =>{
					that.qrcode=res.data.qrcode	
				  })
			},
			showQrcode(){
				uni.previewImage({
					current:this.qrcode,
					urls:[this.qrcode]
				})
			}
		}
	}
</script>

<style>
.distribution{
	width: 750upx;
	min-height: 100vh;
	background-color: #f3f3f3;
}
.userinfo{
	width: 750upx;
	padding: 30upx 25upx;
	box-sizing: border-box;
	background: linear-gradient(to right,#ff9da1,#ff7076);
}
.userinfo-img{
	width: 120upx;
	height: 120upx;
	border-radius: 50%;
	margin-right: 20upx;
	vertical-align: middle;
	background-color: white;
}
.userinfo-txt{
	display: inline-block;
	vertical-align: middle;
}
.userinfo-txt-title{
	width: 100%;
	font-family: PingFang-SC-Regular;
	font-size: 26upx;
	font-weight: normal;
	font-stretch: normal;
	color: #ffffff;
}
.userinfo-txt-people{
	width: 100%;
	height: 22upx;
	font-family: PingFang-SC-Regular;
	font-size: 22upx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 22upx;
	color: #ffffff;
	margin-top: 20upx;
}
.userinfo-txt-level{
	width: 100%;
	height: 20upx;
	font-family: PingFang-SC-Regular;
	font-size: 20upx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 20upx;
	color: #ffffff;
	margin-top: 16upx;
}
.invisity-code{
	width: 750upx;
	padding: 40upx 20upx;
	margin-top: 20upx;
	box-sizing:border-box;
	background-color: white;
}
.invisity-code-img{
	width: 32upx;
	height: 32upx;
	vertical-align: middle;
	margin-right: 20upx;
}
.invisity-code-img-r{
	margin-top: 5upx;
}
.invisity-code-txt{
	font-family: PingFang-SC-Regular;
	font-size: 26upx;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 2upx;
	color: #121212;
}
.tixian{
	width: 750upx;
	height: 328upx;
	background-color: white;
	margin-top: 20upx;
}
.tixian-success{
	width: 100%;
	height: 160upx;
	border-bottom: 2upx solid #eeeeee;
	overflow: hidden;
}
.tixian-ke{
	width: 100%;
	height: 166upx;
	overflow: hidden;
}
.tixian-ke-left{
	width: 546upx;
	height: 100%;
	overflow: hidden;
	float: left;
}
.tixian-success-num{
	width: 100%;
	height: 30upx;
	font-family: PingFang-SC-Regular;
	font-size: 38upx;
	font-weight: bold;
	font-stretch: normal;
	line-height: 30upx;
	color: #f82a2a;
	margin: 40upx 0 0 24upx;
}
.tixian-success-txt{
	width: 100%;
	height: 24upx;
	font-family: PingFang-SC-Regular;
	font-size: 24upx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 24upx;
	color: #121212;
	margin: 20upx 0 0 24upx;
}
.tixian-ke-right{
	width: 150upx;
	height: 57upx;
	background-color: #cccccc;
	border-radius: 29upx;
	line-height: 57upx;
	text-align: center;
	font-family: PingFang-SC-Regular;
	font-size: 24upx;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 2px;
	color: #ffffff;
	float: right;
	margin: 57upx 27upx 0 0;
}
.distribution-info{
	width: 750upx;
	margin-top: 22upx;
}
.distribution-info-card{
	width: 50%;
	box-sizing: border-box;
	height: 145upx;
	border-right: 2upx solid #f3f3f3;
	border-bottom: 2upx solid #f3f3f3;
	float: left;
	background-color: #FFFFFF;
}
.distribution-info-cards{
	border-right: none!important;
	/* border-bottom: none!important; */
}
.distribution-info-card-img{
	width: 53upx;
	height: 52upx;
	float: left;
	margin: 46upx 24upx 0 21upx;
}
.distribution-info-card-right{
	width: 276upx;
	height: 100%;
	float: left;
}
.distribution-info-card-right-top{
	width: 100%;
	height: 28upx;
	font-family: PingFang-SC-Regular;
	font-size: 28upx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 28upx;
	color: #111111;
	margin-top: 44upx;
}
.distribution-info-card-right-bot{
	width: 100%;
	height: 24upx;
	font-family: PingFang-SC-Regular;
	font-size: 24upx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 24upx;
	color: #7e7e7e;
	margin-top: 10upx;
}
.tuiguang{
	width: 750upx;
	background-color: #FFFFFF;
	padding:  20upx;
	box-sizing: border-box;
}
.tuiguang-ma-img{
	width: 30upx;
	height: 30upx;
	vertical-align: middle;
	margin-right: 20upx;
}
.tuiguang-txt{
	height: 100%;
	font-family: PingFang-SC-Regular;
	font-size: 26upx;
	font-weight: normal;
	font-stretch: normal;
	color: #232222;
}
</style>
