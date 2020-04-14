<template>
	<view class="box">
		<view class="f1">手机号登录/注册</view>
		<view class="fn"><text>您输入的号码是</text>+86 18237127467212132</view>
		
		<view class="input-line">
			<input type="text" value="" placeholder="请输入验证码"/>
			<button type="primary" class="veri">获取验证码</button>
		</view>
		<view class="f2">
			<text @click="loginpsd()">密码登录</text>
		</view>
		
		<view>
			<button type="primary" class="btn" @click="to">登录</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			loginpsd(){
				uni.redirectTo({
					url:'/pages/login/loginPsd'
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
		background: #ff6d7e !important;
		border-radius: 75upx;
		text-align: center;
		line-height: 75upx;
		letter-spacing: 4px;
		color: white;
		font-size: 34upx;
		margin: 20upx 0;
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
