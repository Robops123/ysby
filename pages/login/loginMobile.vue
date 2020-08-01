<template>
	<view class="box">
		<view class="f1">手机号登录/注册</view>
		
		<view class="input-line">
			<view class="uni-list-cell">
			    <view class="uni-list-cell-db">
			        <picker @change="bindPickerChange" :value="index" :range="array">
			            <view class="uni-input">{{array[index]}}
						<text class="iconfont icon-arrowdown-copy"></text>
						</view>
			        </picker>
			    </view>
			</view>
			<input type="text" value="" v-model="mobile" placeholder="请输入手机号"/>
		</view>
		<!-- #ifndef MP -->
		<view class="f2" @click="contact">登录遇到问题</view>
		<!-- #endif -->
		<!-- #ifdef MP -->
		<button class="userinfo-btn2 f2" open-type="contact">
			登录遇到问题
		</button>
		<!-- #endif -->
		
		<view>
			<button type="primary" class="btn" @click="next">下一步</button>
		</view>
		
		<view class="hot">
			<view class="hot-title">
				其他方式登录
			</view>
			<view class="login-other">
				<!-- #ifdef MP -->
				<button type="default" class="userinfo-btn" open-type="getUserInfo"     @click="loginMP">
					<button type="default" class="userinfo-btn" open-type="getPhoneNumber" @getphonenumber="getphonenumber" withCredentials="true" >
						<image src="../../static/img/pic/other/weixin.png" mode="" class="login-pic" ></image>
					</button>
					
				</button>
				<!-- #endif -->
				
				
				<!-- #ifdef APP-PLUS -->
				<image src="../../static/img/pic/other/weixin.png" mode="" class="login-pic" @click="authorizeLogin"></image>
				<!-- #endif -->
			</view>
		</view>
		<!-- <view class="f3 s2" style="margin-bottom: 160upx;">未注册的手机号码验证后自动注册</view> -->
		
	<!-- 	<view class="f3 other-login">
			<view class="line"></view>
			<text>第三方账号登录</text>
			</view>
			 -->
			<!-- <view class="options">
				<view class="option-item">
					<view class="pic">
						<image src="../../static/certification/headface.png" mode=""></image>
					</view>
					<view class="f3">微信</view>
				</view>
				<view class="option-item">
					<view class="pic">
						<image src="../../static/certification/headface.png" mode=""></image>
					</view>
					<view class="f3">QQ</view>
				</view>
			</view> -->
			
			
			
			<view class="f3 sm-word">
				<!-- <text> -->
					<text>登录即代表同意</text>
					<text class="f5" @click="openWebView('1','服务协议')">《易舒伴平台用户服务协议》</text>
					<text class="f5" @click="openWebView('2','隐私政策')">《隐私政策》</text>
					<text>等，接受免除或者限制责任，诉讼管辖约定等粗体标示条款。</text>
					<!-- </text> -->
			</view>
			
			
			
			<!-- 邀请人 -->
			<s-popup custom-class="demo-popup" position="center" v-model="visible" customClass='advPopup'>
			  <!-- 内容 -->
			  <view class="padding">
				  <view style="text-align: center;margin: 20upx 0;" class="s4">绑定手机号</view>
				  <view class="input-line">
				  	<input type="text" v-model="verimobile" placeholder="请输入手机号"/>
				  </view>
				  				<view class="input-line">
				  					<input type="text" v-model="vericode" placeholder="请输入验证码"/>
				  					<button  class="veri" @click="getveri">{{enable? '发送验证码':'剩余'+remain+'s'}}</button>
				  				</view>
				  				<view style="margin-top: 20upx;">
				  				<button class="adv-btn adv-btn2" @click="submit()">绑定</button>
				  				</view>
			  </view>
			</s-popup>
	</view>
</template>

<script>
	import sPopup from '@/components/s-popup/index';
	export default{
		components:{
			sPopup
		},
		data(){
			return{
				array: ['中国+86'],
				index:0,
				mobile:'',
				passitive:'',
				code:'',
				params:{
					
				},
				visible:false,
				vericode:'',
				verimobile:'',
				remain:60,
				timer:null,
				enable:true
			}
		},
		onLoad(e){
			this.passitive=e.passitive
		},
		methods:{
			contact(){
				uni.navigateTo({
					url:`/pages/index/webKf`
				})
			},
			bindPickerChange(e){
				this.index=e.detail.value
			},
			next(){
				var reg=/^1[3456789]\d{9}$/
				if(!reg.test(this.mobile)){
					this.$msg('请输入正确的手机号')
					return ;
				}
				this.testLogin()
				// uni.navigateTo({
				// 	url:'/pages/login/loginVeri?mobile='+this.mobile
				// })
			},
			testLogin(){
				this.$loading()
				var that=this
				var url='&r=api.member.account.login&mobile='+this.mobile+'&pwd='
				var params={
					
				}
				  this.$apiPost(url).then((res) =>{
				  }).catch((reason) =>{
					  if(reason.resultMessage=='用户不存在'){
						 uni.navigateTo({
						 	url:'/pages/login/register?mobile='+this.mobile+'&passitive='+this.passitive
						 })
						}else{
							uni.navigateTo({
								url:'/pages/login/loginPsd?mobile='+this.mobile+'&passitive='+this.passitive
							})
						}
						uni.hideLoading()
				  })
			},
			openPDF(){
				uni.openDocument({
				      filePath: 'https://example.com/somefile.pdf',
				      success: function (res) {
				      }
				    });
			},
			openWebView(type,title){
				uni.navigateTo({
					url:'/pages/login/agreement?type='+type+'&title='+title
				})
			},
			authorizeLogin(){
				var that=this
				uni.login({
				  provider: 'weixin',
				  scopes:'auth_user',
				  success: function (loginRes) {
				    // 获取用户信息
				    uni.getUserInfo({
				      provider: 'weixin',
				      success: function (infoRes) {
						  var info=infoRes.userInfo,
						  params={
							  unionId:info.unionId,
							  avatarUrl:info.avatarUrl.replace('http://','https://'),
							  nickName:info.nickName,
							  type:'1'
						  }
						  console.log(infoRes)
						   that.bind(params)
				      }
				    });
				  }
				});
			},
			getphonenumber(e){
				var that=this
				console.log(e)
				    // 获取用户信息
					if(!e.detail.iv || !e.detail.encryptedData){
						return ;
					}
					var	params={
							  iv:e.detail.iv,
							  encryptedData:e.detail.encryptedData,
							  code:that.code
						  }
				var that=this
			
						  that.getMpMobile(params)
					
				
				
				 
				// var info=e.detail,
			// params={
			// 		  type:'2',
			// 		  iv:info.iv,
			// 		  encryptedData:info.encryptedData,
			// 		  code:that.code
			// 	  }
			},
			getuserinfo(e){
				console.log(e)
				// this.params={
				// 	type:'2',
				// 	iv:e.detail.iv,
				// 	encryptedData:e.detail.encryptedData,
				// }
				
			},
			getMpMobile(p){
				var that=this,
				url=`&r=api.member.account.getPhoneNumber`
				this.$apiPost(url,p).then((res) =>{
					that.params.mobile=res.data.purePhoneNumber
					console.log(res.data)
					uni.login({
						 provider: 'weixin',
						  success: function (loginRes) {
							   that.params.code=loginRes.code
							  uni.getUserInfo({
							        provider: 'weixin',
							        success: function (info) {
							         that.params.type='2'
									 that.params.iv=info.iv
									 that.params.encryptedData=info.encryptedData
									 console.log(that.params)
							          that.bind(that.params)
							        }
							      });
						   
						   
						   }
						 });
					
				})
				
			},
			bind(p){
				this.$loading()
				var that=this,
				url=`&r=api.member.account.loginByoAuth`
				this.$apiPost(url,p).then((res) =>{
					console.log(res)
					uni.hideLoading()
					uni.setStorageSync('userInfo',res.data)
					that.$conn.open({
												apiUrl: that.$im.config.apiURL,
												user: res.data.hx_openid,
												pwd: res.data.hx_pwd,
												grant_type: 'password',
												appKey: that.$im.config.appkey
											});
																uni.setStorageSync('myUsername',res.data.hx_openid)
					if(that.passitive){
											    uni.$emit('logined')
												uni.navigateBack({
													delta:1
												})
					}else{
											   uni.switchTab({
											   	url:'../tabBar/mine'
											   })
					}
					that.$msg('登录成功')
				}).catch((reason) =>{
					console.log(reason)
					if(reason.resultCode=='400101' && p.type=='1'){
						that.params=p
						that.visible=true
					}
				})
			},
			loginMP(){
				var that=this
				uni.login({
					 provider: 'weixin',
					  success: function (loginRes) {
					    that.code=loginRes.code
					   }
					 });
			},
			submit(){
				if(!this.vericode){
					this.$msg('请输入验证码')
					return ;
				}
				this.params.mobile=this.verimobile
				this.params.verifycode=this.vericode
				this.bind(this.params)
			},
			// 验证码
			getveri(){
			if(this.enable){
				var reg=/^1[3456789]\d{9}$/
				if(!reg.test(this.verimobile)){
					this.$msg('请输入正确的手机号')
					return ;
				}
			  this.getcode()
				}
			},
			  settime(){
			    if(this.remain == 1){
			      this.remain=60
			      clearInterval(this.timer);
			          this.enable=true
			    }else{
			      this.remain--;
			    }
			  },
			  getcode(){
			    var that=this
			    this.$loading()
			    var params={
			    	mobile:this.verimobile,
					type:3
			    	// pwd:this.pwd
			    }
			    // var url='&r=api.member.account.register'
			    var url=`&r=api.member.account.registercode`
			      this.$apiPost(url,params).then((res) =>{
			    	  uni.hideLoading()
					that.$msg('验证码发送成功')
					that.enable=false
					that.timer = setInterval(function(){
					      // 定时器到底了 兄弟们回家啦
					      that.settime()
					    }, 1000)
			      })
			  }
		}
	}
</script>

<style>
	uni-page-body{
		height: 100%;
	}
	.box{
		position: absolute;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		background: white;
		padding: 30upx 40upx;
		word-break: keep-all;
	}
	.input-line{
		background: white;
		line-height: 100upx;
		border-bottom: 1px solid #f6f6f6;
	}
	.input-line input,
	.input-line text,
	.input-line .uni-list-cell{
		display: inline-block;
		vertical-align: middle;
	}
	.input-line text,
	 .input-line .uni-list-cell{
		width: 30%;
		font-size: 32upx;
		margin-right: 4%;
	}
	.input-line input,
	{
		width: 55%;
	}
	.btn{
		width: 100%;
		height: 75upx;
		background: #ff6d7e !important;
		border-radius: 75upx;
		text-align: center;
		line-height: 75upx;
		letter-spacing: 4px;
		color: white;
		font-size: 34upx;
		margin: 20upx 0;
	}
	.other-login{
		text-align: center;
		position: relative;
	}
	.other-login text{
		padding: 0 20upx;
		position: relative;
		z-index: 2;
		background: white;
	}
	.line{
		width: 100%;
		height:1px ;
		position: absolute;
		left: 0;
		top: 50%;
		background-color: #e5e5e5;
	}
	.options{
		text-align: center;
	}
	.option-item{
		display: inline-block;
		vertical-align: top;
		margin: 50upx 80upx 100upx;
	}
	
	.option-item image{
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	.f1{
		margin-bottom: 60upx;
		font-size: 44upx;
	}
	.f2{
		margin: 20upx 0 50upx;
		color: #ff6b74;
	}
	.f3{
		text-align: center;
		color: #6e6e6e;
	}
	.f3.sm-word>text{
		/* width: 100%; */
		display: inline-block;
	}
	.f3.sm-word{
		position: absolute;
		width: calc(100% - 80upx);
		bottom: 20upx;
		font-size: 26upx;
		text-align: left;
		padding-bottom: 120upx;
		word-break: break-all;
	}
	.f5{
		color: #ff6b74;
		}
		
		.hot{
			text-align: center;
			margin: 100upx 0 40upx;
		}
		.hot .hot-title,
		.hot .hot-title::before,
		.hot .hot-title::after{
			display: inline-block;
			vertical-align: middle;
		}
		.hot .hot-title::before{
			content: '';
			width: 200upx;
			height: 1px;
			background-color: #aeaeae;
			margin-right: 30upx;
		}
		.hot .hot-title::after{
			content: '';
			width: 200upx;
			height: 1px;
			background-color: #aeaeae;
			margin-left: 30upx;
		}
		.login-other{
			margin-top: 60upx;
			text-align: center;
		}
		.login-pic{
			margin: 0 auto;
			width: 39px;
			height: 33px;
		}
		.userinfo-btn:before,
		.userinfo-btn:after{
			display: none;
		}
		.userinfo-btn{
			background: none;
			padding: 0 !important;
			border: none;
			outline: none;
			width: 39px;
			height: 33px;
			margin: 0 auto;
			text-align: center;
		}
		
		/* 联系客服 */
		.userinfo-btn2:before,
		.userinfo-btn2:after{
			display: none;
		}
		.userinfo-btn2{
			display: inline-block;
			font-size: 13px;
			background: none;
			padding: 0 !important;
			border: none;
			outline: none;
			margin: 0 auto;
			text-align: center;
		}
		.input-line{
			background: white;
			line-height: 100upx;
			border-bottom: 1px solid #f6f6f6;
		}
		.input-line image{
			width: 30upx;
			height: 15upx;
			
			margin-top: 40upx;
		}
		.input-line input,
		.input-line text,
		.input-line .uni-list-cell{
			display: inline-block;
			vertical-align: middle;
		}
		.input-line text,
		 .input-line .uni-list-cell{
			width: 30%;
			font-size: 32upx;
			margin-right: 4%;
		}
		.input-line input,
		{
			width: 55%;
		}
		.veri{
			height: 60upx;
			float: right;
			color: black;
			font-size: 28upx;
			line-height: 60upx;
			margin-top: 20upx;
			border: none;
			outline: none;
			border-radius: 80upx;
			background-color: #f0f0f0;
			padding: 0 30upx;
		}
		.veri::after{
			border: none;
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
</style>
