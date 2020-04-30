<template>
	<view class="box">
		<view class="f1">手机号登录/注册</view>
		
		<view class="input-line">
			<view class="uni-list-cell">
			    <view class="uni-list-cell-db">
			        <picker @change="bindPickerChange" :value="index" :range="array">
			            <view class="uni-input">{{array[index]}}∨</view>
			        </picker>
			    </view>
			</view>
			<input type="text" value="" v-model="mobile" placeholder="请输入手机号"/>
		</view>
		<view class="f2 s2">登录遇到问题</view>
		
		<view>
			<button type="primary" class="btn" @click="next">下一步</button>
		</view>
		<view class="f3 s2" style="margin-bottom: 160upx;">未注册的手机号码验证后自动注册</view>
		
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
				<text>登录即代表同意
				<text class="f5">《中企商会酒店平台用户服务协议》</text>
				<text class="f5">《隐私政策》</text>
				等，接受免除或者限制责任，诉讼管辖约定等粗体标示条款。
				</text>
			</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				array: ['中国+86'],
				index:0,
				mobile:'',
				passitive:''
			}
		},
		onLoad(e){
			this.passitive=e.passitive
		},
		methods:{
			bindPickerChange(e){
				this.index=e.detail.value
				console.log(e)
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
						 	url:'/pages/login/loginVeri?mobile='+this.mobile+'&passitive='+this.passitive
						 })
						}else{
							uni.navigateTo({
								url:'/pages/login/loginPsd?mobile='+this.mobile+'&passitive='+this.passitive
							})
						}
						uni.hideLoading()
				  })
			}
		}
	}
</script>

<style>
	.box{
		background: white;
		padding: 30upx 40upx;
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
	.f3.sm-word{
		font-size: 26upx;
		text-align: left;
		padding-bottom: 120upx;
	}
	.f5{
		color: #ff6b74;
		}
</style>
