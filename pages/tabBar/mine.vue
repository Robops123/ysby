<template>
	<view>
		<view class="top">
			<view v-if="logined">
				<view class="setting" >
					<image src="../../static/img/pic/setting.png" mode="" class="fr setting-img" @click="toSetting"></image>
				</view>
				<image :src="data.avatar" mode="" class="headface" @click="toRetail"></image>
				<text class="s4"  @click="tologin"  >{{data.nickname}}</text>
			</view>
			<view class="s4" style="padding: 50upx 0;text-align: center;" @click="tologin" v-else>请先登录</view>
			<view class="options1">
				<view class="options1-item" @click="to('goods')">
					<view>{{logined ? data.collectGoods:0}}</view>
					<view>我的收藏</view>
				</view>
				<view class="options1-item" @click="to('shop')">
					<view>{{logined ? data.collectMerch:0}}</view>
					<view>关注店铺</view>
				</view>
				<view class="options1-item" @click="test">
					<view>{{logined ? data.history:0}}</view>
					<view>浏览足迹</view>
				</view>
			</view>
			
			<view class="padding">
				<view class="card">
					<view class="s5">
						<text>我的订单</text>
						<view class="s3 cg fr" @click="to('myOrder')">查看全部
						<text class="icon-arrow-right iconfont"></text>
						</view>
					</view>
					<view class="dd">
						<view class="item-list">
							<image src="../../static/img/pic/mine/icon2.png" mode=""></image>
							<view>待付款</view>
						</view>
						<view class="item-list">
							<image src="../../static/img/pic/mine/icon4.png" mode=""></image>
							<view>待发货</view>
						</view>
						<view class="item-list">
							<image src="../../static/img/pic/mine/icon6.png" mode=""></image>
							<view>待收货</view>
						</view>
						<view class="item-list">
							<image src="../../static/img/pic/mine/icon5.png" mode=""></image>
							<view>待评价</view>
						</view>
						<view class="item-list">
							<image src="../../static/img/pic/mine/icon10.png" mode=""></image>
							<view>售后/退款</view>
						</view>
					</view>
				</view>
				
				
				<view class="card card2">
					<view class="s5">
						<text>我的服务</text>
					</view>
					<view class="dd2 ">
						<view class="item-list">
							<image src="../../static/img/pic/mine/icon3.png" mode=""></image>
							<view>代理中心</view>
						</view>
						<view class="item-list">
							<image src="../../static/img/pic/mine/icon11.png" mode=""></image>
							<view>推广介绍</view>
						</view>
						<view class="item-list">
							<image src="../../static/img/pic/mine/icon12.png" mode=""></image>
							<view>邀请人</view>
						</view>
						<view class="item-list">
							<image src="../../static/img/pic/mine/icon13.png" mode=""></image>
							<view>邀请注册</view>
						</view>
						<view class="item-list" @click="to('addressList')">
							<image src="../../static/img/pic/mine/icon9.png" mode=""></image>
							<view>收货地址</view>
						</view>
						<view class="item-list">
							<image src="../../static/img/pic/mine/icon1.png" mode=""></image>
							<view>帮助中心</view>
						</view>
						<view class="item-list">
							<image src="../../static/img/pic/mine/icon8.png" mode=""></image>
							<view>官方客服</view>
						</view>
						<view class="item-list" @click="to2()">
							<image src="../../static/img/pic/mine/icon7.png" mode=""></image>
							<view>我的店铺</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				data:'',
				logined:false
			}
		},
		onShow(){
			var userInfo=uni.getStorageSync('userInfo')
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.getUserInfo(userInfo)
				this.logined=true
			}
		},
		methods:{
			to(where){
				uni.navigateTo({
					url:`/pages/mine/${where}`
				})
			},
			to2(){
				uni.navigateTo({
					url:`/pages/tabBar2/tabMain`
				})
			},
			tologin(){
				uni.navigateTo({
					url:`/pages/login/loginMobile`
				})
			},
			toRetail(){
				uni.navigateTo({
					url:`/pages/retail/retailCenter`
				})
			},
			toSetting() {
			    uni.navigateTo({
			    	url:`/pages/mine/settings`
			    })    
			},
			test(){
				uni.navigateTo({
					url:'../test'
				})    
			},
			getUserInfo(u){
				var that=this
				var url='&r=api.member.my&uid='+u.uid+'&token='+u.token
				  this.$apiPost(url).then((res) =>{
					that.data=res.data	
				  })
			},
			wxlogin(provider) {
			    uni.login({
			        provider: 'qq',
			        // #ifdef MP-ALIPAY
			        scopes: 'auth_user', //支付宝小程序需设置授权类型
			        // #endif
			        success: (res) => {
			            console.log('login success:', res);
			            // 更新保存在 store 中的登录状态
						uni.getUserInfo({
						      provider: 'qq',
						      success: function (infoRes) {
						        console.log('用户昵称为：' + infoRes.userInfo.nickName);
						      }
						    });
			        },
			        fail: (err) => {
			            console.log('login fail:', err);
			        }
			    });
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
	.top{
		background-image: url(../../static/img/bg/bg.png);
		background-size: 100%;
		background-repeat: no-repeat;
	}
	
	.headface{
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		vertical-align: middle;
		margin: 20upx 30upx 10upx 30upx;
	}
	.headface+text{
		display: inline-block;
		vertical-align: middle;
	}
	.options1{
		
		text-align: center;
		display: flex;
		justify-content: space-around;
	}
	.card{
		padding: 30upx 30upx 50upx 30upx;
		box-shadow: 0 0 8px #ccc;
		background-color: #fff;
		border-radius: 10px;
	}
	.card .fr{
			display: inline-block;
			vertical-align: middle;
			margin-top: 5upx;
		}
		.card .fr icon{
			margin-left: 20upx;
		}
		
		.item-list{
			text-align: center;
			margin-top: 60upx;
			display: inline-block;
			vertical-align: top;
		}
		.dd .item-list{
			width: 20%;
		}
		.card.card2{
			box-shadow: none;
			margin-top: 25upx;
		}
		.dd2 .item-list{
			width: 25%;
		}
		 .item-list view{
			white-space: nowrap;
			font-size: 24upx;
			color: #696969;
		}
		.dd .item-list:last-child{
			margin-right: 0;
		}
		/* .dd2 .item-list:nth-of-type(4n){
			mar
		} */
		 .item-list image{
			width: 70upx;
			height: 60upx;
			margin-bottom: 20upx;
		}
		.dd2 .item-list image{
			width: 50upx;
			height: 50upx;
		}
		.setting{
			text-align: right;
			padding: 20upx 20upx 0 0;
		}
</style>
