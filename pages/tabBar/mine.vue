<template>
	<view>
		<view class="top">
			<view >
				<view class="setting" >
					<image src="../../static/img/pic/setting.png" mode="" class="fr setting-img" @click="toSetting"></image>
				</view>
				<view v-if="logined" @click="toPersonal">
					<image :src="data.avatar" mode="" class="headface" ></image>
					<text class="s4"   >{{data.nickname}}</text>
				</view>
			</view>
			<view class="s4" style="padding: 50upx 0;text-align: center;" @click="tologin" v-if='!logined'>请先登录</view>
			<view class="options1">
				<view class="options1-item" @click="to('goods')">
					<view>{{logined ? data.collectGoods:0}}</view>
					<view>我的收藏</view>
				</view>
				<view class="options1-item" @click="to('shop')">
					<view>{{logined ? data.collectMerch:0}}</view>
					<view>关注店铺</view>
				</view>
				<view class="options1-item" @click="to('viewHistoryf')">
					<view>{{logined ? data.history:0}}</view>
					<view>浏览足迹</view>
				</view>
			</view>
			
			<view class="padding">
				<view class="card">
					<view class="s5">
						<text>我的订单</text>
						<view class="s3 cg fr" @click="toMyOrder(0)">查看全部
						<text class="icon-arrow-right iconfont"></text>
						</view>
					</view>
					<view class="dd">
						<view class="item-list" @click="toMyOrder(1)">
							<view>
								<text class="rest" v-if="data.orderAmount1>0">{{data.orderAmount1}}</text>
								<image src="../../static/img/pic/mine/icon2.png" mode=""></image>
							</view>
							<view>待付款</view>
						</view>
						<view class="item-list" @click="toMyOrder(2)">
							<view>
								<text class="rest" v-if="data.orderAmount2>0">{{data.orderAmount2}}</text>
								<image src="../../static/img/pic/mine/icon4.png" mode=""></image>
							</view>
							<view>待发货</view>
						</view>
						<view class="item-list" @click="toMyOrder(3)">
							<view>
								<text class="rest" v-if="data.orderAmount3>0">{{data.orderAmount3}}</text>
								<image src="../../static/img/pic/mine/icon6.png" mode=""></image>
							</view>
							<view>待收货</view>
						</view>
						<view class="item-list" @click="toMyOrder(5)">
							<view>
								<text class="rest" v-if="data.orderAmount4>0">{{data.orderAmount4}}</text>
								<image src="../../static/img/pic/mine/icon5.png" mode=""></image>
							</view>
							<view>待评价</view>
						</view>
						<view class="item-list">
							<view>
								<text class="rest" v-if="data.orderAmount5>0">{{data.orderAmount5}}</text>
								<image src="../../static/img/pic/mine/icon10.png" mode=""></image>
							</view>
							<view>售后/退款</view>
						</view>
					</view>
				</view>
				
				
				<view class="card card2">
					<view class="s5">
						<text>我的服务</text>
					</view>
					<view class="dd2 ">
						<view class="item-list" @click="toRetail()" >
							<image src="../../static/img/pic/mine/icon3.png" mode=""></image>
							<view>代理中心</view>
						</view>
						<view class="item-list" @click="to('promotion')">
							<image src="../../static/img/pic/mine/icon11.png" mode=""></image>
							<view>推广介绍</view>
						</view>
						<view class="item-list" @click="showInvite(data.islocked)">
							<image src="../../static/img/pic/mine/icon12.png" mode=""></image>
							<view>邀请人</view>
						</view>
						<view class="item-list" @click="showAdv">
							<image src="../../static/img/pic/mine/icon13.png" mode=""></image>
							<view>邀请注册</view>
						</view>
						<view class="item-list" @click="to('addressList')">
							<image src="../../static/img/pic/mine/icon9.png" mode=""></image>
							<view>收货地址</view>
						</view>
						<view class="item-list" @click="to('help')">
							<image src="../../static/img/pic/mine/icon1.png" mode=""></image>
							<view>帮助中心</view>
						</view>
						<view class="item-list">
							<image src="../../static/img/pic/mine/icon8.png" mode=""></image>
							<view>官方客服</view>
						</view>
						<view class="item-list" @click="to2(data.merchStatus)" v-if="data.merchStatus>=2 && data.merchStatus<=4">
							<image src="../../static/img/pic/mine/icon7.png" mode=""></image>
							<view>我的店铺</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 邀请注册 -->
		<s-popup custom-class="demo-popup" position="center" v-model="visible" customClass='advPopup'>
		  <!-- 内容 -->
		  <image :src="advImg" mode=""></image>
		  <view style="margin-top: 20upx;">
			  <button class="adv-btn" @click="saveImg(advImg)">保存图片</button>
		  </view>
		</s-popup>
		
		<!-- 邀请人 -->
		<s-popup custom-class="demo-popup" position="center" v-model="visible2" customClass='advPopup'>
		  <!-- 内容 -->
			<view class="invite-container">
				<view class="invite-title">请输入邀请码</view>
				<view>
					<input type="text" v-model="invite_code" placeholder="请输入邀请码"/>
				</view>
				<view style="margin-top: 20upx;">
							  <button class="adv-btn adv-btn2" @click="saveInvite()">提交</button>
				</view>
			</view>
		</s-popup>
	</view>
</template>

<script>
	import sPopup from '@/components/s-popup/index';
	export default{
		 components: {
		    sPopup
		  },
		data(){
			return {
				data:'',
				logined:false,
				  visible: false,
				  visible2:false,
				  advImg:'',
				  invite_code:'',
				  imgBaseUrl:'',
				  userInfo:{}
			}
		},
		onShow(){
			// this.imgBaseUrl=this.$imgBaseUrl
			var userInfo=uni.getStorageSync('userInfo')
			console.log(userInfo)
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.userInfo=userInfo
				this.getUserInfo(userInfo)
				this.logined=true
			}else{
				this.logined=false
			}
		},
		methods:{
			toPersonal(){
				uni.navigateTo({
					url:`/pages/mine/personal`
				})
			},
			to(where){
				var ce=this.$operateInterceptor(this.logined)
				if(!ce){
					return ;
				}
				uni.navigateTo({
					url:`/pages/mine/${where}`
				})
			},
			to2(s){
				var ce=this.$operateInterceptor(this.logined)
				if(!ce){
					return ;
				}
				if(s==3){
					this.$msg('已被禁用')
					return ;
				}
				if(s==4){
					this.$msg('商家申请审核中，请耐心等待')
					return ;
				}
				uni.navigateTo({
					url:`/pages/tabBar2/tabMain`
				})
			},
			toMyOrder(active){
				var ce=this.$operateInterceptor(this.logined)
				if(!ce){
					return ;
				}
				uni.navigateTo({
					url:`/pages/mine/myOrder?active=${active}&userName=${this.data.nickname}`
				})
			},
			toMyOrderDetail(){
				var ce=this.$operateInterceptor(this.logined)
				if(!ce){
					return ;
				}
				uni.navigateTo({
					url:`/pages/mine/myOrderDetail?active=5`
				})
			},
			tologin(){
				var ce=this.$operateInterceptor(this.logined)
				if(!ce){
					return ;
				}
				uni.navigateTo({
					url:`/pages/login/loginMobile`
				})
			},
			toRetail(){
				var ce=this.$operateInterceptor(this.logined)
				if(!ce){
					return ;
				}
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
				console.log(u)
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
			},
			showAdv(){
				var ce=this.$operateInterceptor(this.logined)
				if(!ce){
					return ;
				}
				var that=this
				var params={
					uid:this.userInfo.uid,
					token:this.userInfo.token,
				}
				var url='&r=api.common.share.createPoster'
				  this.$apiPost(url,params).then((res) =>{
					  that.advImg=res.data.img
					  that.visible=true
				  })
			},
			showInvite(locked){
				var ce=this.$operateInterceptor(this.logined)
				if(!ce){
					return ;
				}
				if(locked && locked==0){
					this.visible2=true
				}else{
					this.$msg('已绑定邀请人无需重复绑定')
				}
			},
			saveImg(url){
				var that=this
				that.$loading()
				uni.downloadFile({
						url: url,
						success: (res) =>{
							if (res.statusCode === 200){
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function() {
										that.$msg('保存成功，请到相册中查看')
										that.visible=false
									},
									fail: function() {
										that.$msg('保存失败')
									},
									complete:() =>{
										uni.hideLoading()
									}
								});
							}
						}
					})
			},
			saveInvite(){
				var that=this
				var params={
					uid:this.userInfo.uid,
					token:this.userInfo.token,
					inviteCode:this.invite_code
				}
				var url='&r=api.member.my.invite'
				  this.$apiPost(url,params).then((res) =>{
					  that.$msg('绑定邀请人成功')
					  setTimeout(function(){
						  that.visible2=false
						  that.getUserInfo(that.userInfo)
					  },1000)
				  })
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
			position: relative;
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
		.advPopup image{
			width: 100%;
			height: 320px;
			margin:  0 auto;
		}
		
		.adv-btn{
			width: 94%;
			margin: 0 auto;
			background-color: #fba1b0;
			color: #fff;
			border-radius: 6px;
			line-height: 1;
			border: none;
			outline: none;
			padding: 20upx 0;
			text-align: center;
			margin-bottom: 20upx;
			font-size: 12px;
		}
		
		.invite-container{
			padding: 30upx;
		}
		.invite-title{
			font-size: 18px;
			margin-bottom: 30upx;
		}
		.invite-container input{
			padding: 10upx 0;
			border-bottom: 1px solid #e9e9e9;
		}
		.adv-btn2{
			margin-top: 50upx;
		}
		
		.item-list .rest{
			width: 40upx;
			height: 40upx;
			display: inline-block;
			position: absolute;
			border: 1px solid #ffb6b9;
			border-radius: 40upx;
			color: #fff;
			background-image: radial-gradient(#ff6d7e, #ffb6b9, #fff);
			/* background-color: #fff; */
			top: -15upx;
			left: 50%;
			z-index: 1;
			margin-left: 10upx;
		}
</style>
