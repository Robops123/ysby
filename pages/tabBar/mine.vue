<template>
	<view>
		<view class="top">
			<view >
				<view class="setting" >
					<image src="../../static/img/pic/setting.png" mode="" class="fr setting-img" @click="toSetting"></image>
				</view>
				<view v-if="logined" >
					<image :src="data.avatar ? data.avatar:'/static/img/app.jpg'" mode="" class="headface" @click="toPersonal"></image>
					<text class="s4 ellipsis nickname" @click="toPersonal">{{data.nickname ? data.nickname:'请重新登录'}}</text>
					<text class="fr s5" style="margin-top: 50upx;" @click="to('recharge',data.balance)">余额:{{data.balance ? data.balance:0}}</text>
				</view>
			</view>
			<view class="s4" style="padding: 50upx 0;text-align: center;" @click="tologin" v-if='!logined'>请先登录</view>
			<view class="options1">
				<view class="options1-item" @click="to('goods')">
					<view>{{logined ? data.collectGoods:0}}</view>
					<view>我的收藏</view>
				</view>
				<view class="options1-item" @click="to('shop')" v-show="merchModelStatus==1">
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
						<view class="s3 cg fr" @click="toMyOrder(0,0)">查看全部
						<text class="icon-arrow-right iconfont"></text>
						</view>
					</view>
					<view class="dd">
						<view class="item-list" @click="toMyOrder(1,0)">
							<view>
								<text class="rest" v-if="data.orderAmount1>0 && logined">{{data.orderAmount1}}</text>
								<image src="../../static/img/pic/mine/icon2.png" mode=""></image>
							</view>
							<view>待付款</view>
						</view>
						<view class="item-list" @click="toMyOrder(2,0)">
							<view>
								<text class="rest" v-if="data.orderAmount2>0 && logined">{{data.orderAmount2}}</text>
								<image src="../../static/img/pic/mine/icon4.png" mode=""></image>
							</view>
							<view>待发货</view>
						</view>
						<view class="item-list" @click="toMyOrder(3,60)">
							<view>
								<text class="rest" v-if="data.orderAmount3>0 && logined">{{data.orderAmount3}}</text>
								<image src="../../static/img/pic/mine/icon6.png" mode=""></image>
							</view>
							<view>待收货</view>
						</view>
						<view class="item-list" @click="to('myOrderDetail')">
							<view>
								<text class="rest" v-if="data.orderAmount4>0 && logined">{{data.orderAmount4}}</text>
								<image src="../../static/img/pic/mine/icon5.png" mode=""></image>
							</view>
							<view>待评价</view>
						</view>
						<view class="item-list" @click="toMyOrder('sh',240)">
							<view>
								<text class="rest" v-if="data.orderAmount5>0 && logined">{{data.orderAmount5}}</text>
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
						<!-- #ifdef APP-PLUS || H5 -->
						<view class="item-list" @click="contact" style="vertical-align: bottom;">
								<image src="../../static/img/pic/mine/icon8.png" mode=""></image>
							<view>官方客服</view>
						</view>
						<!-- #endif -->
						
						<!-- #ifdef MP -->
						<view class="item-list" style="vertical-align: bottom;">
							<button class="userinfo-btn" open-type="contact" >
								<image src="../../static/img/pic/mine/icon8.png" mode=""></image>
							</button>
							<view>官方客服</view>
						</view>
						<!-- #endif -->
						
						<view class="item-list" @click="to2(data.merchStatus)" v-if="data.merchStatus==2 || data.merchStatus==6">
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
		  <swiper class="preview" :autoplay="false" :style="{'height':swiperHeight+'px'}" :indicator-dots="true"
		    indicator-active-color='#ff6d7e' indicator-color='#868686' @change='advChange' :current='current'>
		      <swiper-item style='width: 100%;height: 100%;' class="banner" v-for='(item,index) in advImg' :key='index'>
		      	<image :src="item" mode="widthFix" style="width: 100%;height: 100%;border-radius: 25upx;" class="invite-pic" @load='imgLoad'></image>
		      </swiper-item>
		     </swiper>
		  
		  <view style="margin-top: 20upx;">
			  <button class="adv-btn" @click="saveImg()">保存图片</button>
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
				merchModelStatus:0,
				data:'',
				logined:false,
				  visible: false,
				  visible2:false,
				  advImg:[],
				  invite_code:'',
				  imgBaseUrl:'',
				  userInfo:{},
				  swiperHeight:'',
				  imgReady:false,
				  current:0,
				  percent:1.3,
				  loadingIndex:0
			}
		},
		onShow(){
			// this.imgBaseUrl=this.$imgBaseUrl
			var userInfo=uni.getStorageSync('userInfo')
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.userInfo=userInfo
				this.getUserInfo(userInfo)
				this.logined=true
			}else{
				this.logined=false
				this.advImg=[]
			}
		},
		onLoad(){
			// #ifdef MP
			this.wdnmd()
			// #endif
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary');
			this.merchModelStatus=Number(1)
			// #endif
		},
		methods:{
			contact(){
				uni.navigateTo({
					url:`/pages/index/webKf`
				})
			},
			toPersonal(){
				uni.navigateTo({
					url:`/pages/mine/personal`
				})
			},
			to(where,data){
				var ce=this.$operateInterceptor(this.logined)
				if(!ce){
					return ;
				}
				uni.navigateTo({
					url:`/pages/mine/${where}?data=${data}`
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
					this.$msg('申请审核中，请耐心等待')
					return ;
				}
				uni.navigateTo({
					url:`/pages/tabBar2/tabMain`
				})
			},
			// 小程序绕开审核
			wdnmd(){
				var that=this
				  var url='&r=api.mo'
				  this.$apiPost(url).then((res) =>{
					 that.merchModelStatus=Number(res.data.status)
				  }).catch((err) =>{
					  this.$msg(err)
				  })
			},
			toMyOrder(active,margin){
				var ce=this.$operateInterceptor(this.logined)
				if(!ce){
					return ;
				}
				uni.navigateTo({
					url:`/pages/mine/myOrder?active=${active}&userName=${this.data.nickname}&margin=${margin}`
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
			    	url:`/pages/mine/settings?is_oAuth=`+this.data.is_oAuth
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
				if(this.advImg.length>0){
					this.current=0
					this.visible=true
					// this.$nextTick(() =>{
					// 	this.getElementHeight('.invite-pic')
					// })
					return ;
				}
				this.$loading()
				var that=this
				var params={
					uid:this.userInfo.uid,
					token:this.userInfo.token,
					type:1,
					number:1
				}
				var url='&r=api.common.share.createPoster'
				  this.$apiPost(url,params).then((res) =>{
					  console.log(res)
					  that.advImg=new Array(res.data.total)
					  this.getElementHeight('.invite-pic')
					  that.loadingIndex++
					  that.advImg[0]=res.data.img
					  that.visible=true
						uni.hideLoading()
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
			saveImg(){
				var that=this
				that.$loading()
				uni.downloadFile({
						url: that.advImg[that.current],
						success: (res) =>{
							if (res.statusCode === 200){
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function() {
										uni.hideLoading()
										that.$msg('保存成功，请到相册中查看')
										that.visible=false
									},
									fail: function() {
										uni.hideLoading()
										that.$msg('保存失败')
									},
									complete:() =>{
										
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
			},
			getElementHeight(element) {
			                setTimeout(()=>{
			                    let query = uni.createSelectorQuery().in(this);
			                    query.select(element).boundingClientRect();
			                    query.exec((res) => {
			                        if (!res) {//如果没获取到，再调一次
			                            this.getElementHeight();
			                        }else {
										// this.imgReady=true
										this.swiperHeight = res[0].width*this.percent;
			                            // this.swiperHeight = res[0].width*this.percent;
			                        }
			                    })
			                },200)
			            },
						advChange(e){
							this.current=e.detail.current
							if(!this.advImg[this.current]){
								this.getNew(this.current)
							}
							
						},
						getNew(f){
							this.$loading()
							var that=this
							var params={
								uid:this.userInfo.uid,
								token:this.userInfo.token,
								type:1,
								number:f+1
							}
							var url='&r=api.common.share.createPoster'
							  this.$apiPost(url,params).then((res) =>{
								  that.advImg[f]=res.data.img
								  that.$forceUpdate()
								  that.loadingIndex++
									uni.hideLoading()
							  })
						},
						imgLoad(e){
							var w=e.detail.width,h=e.detail.height
							this.percent=h/w
							console.log(this.percent)
							this.getElementHeight('.invite-pic')
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
	.headface~text{
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
		.dd{
			margin-top: 60upx;
		}
		.dd .item-list{
			width: 20%;
			margin-top: 0;
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
			padding: 35upx 0;
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
		.icon-arrow-right{
			vertical-align: text-top;
		}
		
		/* 联系客服 */
		.userinfo-btn:before,
		.userinfo-btn:after{
			display: none;
		}
		.userinfo-btn{
			display: inline-block;
			background: none;
			padding: 0 !important;
			border: none;
			outline: none;
			width: 50upx;
			height: 50upx;
			margin-bottom: 20upx;
			text-align: center;
		}
		.nickname{
			max-width: 240upx;
		}
		/* .preview{
			height: initial;
		} */
</style>
