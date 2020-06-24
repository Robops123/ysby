<template>
	<view class="box">
		<view class="f1">手机号登录</view>
		<view class="fn"><text>您输入的号码是</text>+86 {{mobile}}</view>
		
		<view class="input-line">
			<input type="text" v-model="code" placeholder="请输入验证码"/>
			<button  class="veri" @click="getveri">{{enable? '发送验证码':'剩余'+remain+'s'}}</button>
		</view>
		<view class="f2" style="overflow: hidden;">
			<text @click="loginveri()">密码登录</text>
			<text class="fr" @click="contact">登录遇到问题</text>
			<text ></text>
		</view>
		
		<view>
			<button type="primary" class="btn" @click="submit">登录</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				show:false,
				mobile:'',
				code:'',
				passitive:'',
				remain:60,
				timer:null,
				enable:true
			}
		},
		onLoad(e){
			this.mobile=e.mobile
			this.passitive=e.passitive
		},
		methods:{
			contact(){
				uni.navigateTo({
					url:`/pages/index/webKf`
				})
			},
			loginveri(){
				uni.redirectTo({
					url:'/pages/login/loginPsd?passitive='+this.passitive+'&mobile='+this.mobile
				})
			},
			submit(){
				var that=this
				var url='&r=api.member.account.loginByCode&mobile='+this.mobile+'&code='+this.code
				  this.$apiPost(url).then((res) =>{
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
								delta:2
							})
					   }else{
						   uni.switchTab({
						   	url:'../tabBar/mine'
						   })
					   }
				  })
			},
			showpsd(){
				this.show=!this.show
			},
			getveri(){
			if(this.enable){
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
			    	mobile:this.mobile,
					type:2
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
	.box{
		background: white;
		padding: 30upx 40upx;
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
		top: 0;
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
	.btn{
		width: 100%;
		height: 75upx;
		background: #ff6d7e  !important;
		border-radius: 75upx;
		text-align: center;
		line-height: 75upx;
		letter-spacing: 4px;
		color: white;
		font-size: 34upx;
		margin: 60upx 0 0;
		
	}
	.f1{
		margin-bottom: 20upx;
		font-size: 44upx;
	}
	.f2{
		margin: 20upx 0 50upx;
		font-size: 30upx;
		color: #ff6b74;
	}
	.fr{
		
		float: right;
	}
	.fn{
		font-size: 28upx;
		margin-bottom: 60upx;
	}
	.fn text{
		color: #7a7a7a;
	}
</style>
