<template>
	<view>
		<view class="option-box">
			<view class="option-item" >
				<text>手机号</text>
				<text class="f1 fr"><text style="padding-right: 20upx;">{{mobile}}</text></text>
			</view>
			<view class="option-item" v-show="is_oAuth=='0'">
				<text>密码</text>
				<text class="f1 fr"><text class="f2 cr"  style="padding-right: 20upx;" @click="toPassword">修改</text><text class="icon-arrow-right iconfont"></text></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				mobile:'',
				is_oAuth:''
			}
		},
		onLoad(p){
			this.is_oAuth=p.is_oAuth
			var userInfo=uni.getStorageSync('userInfo'),that=this
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.mobile=userInfo.mobile
			} 
		},
		methods:{
			toPassword(){
				uni.navigateTo({
					url:'./password'
				})
			}
		}
	}
</script>

<style>
	.option-box{
		background: white;
		padding-left: 30upx;
		border-top: 15upx solid #f3f3f3;
		border-bottom: 15upx solid #f3f3f3;
	}
	image{
		vertical-align: middle;
		border-radius: 50%;
		height: 90upx;
		width: 90upx;
		margin: 15upx 0;
		display: inline-block;
		margin-left: -25upx;
	}
	.option-box .option-item:last-child{
		border: none;
	}
	.option-item{
		line-height: 90upx;
		border-bottom: 1px solid #efefef;
	}
	.f1{
		color: #b5b5b5;
		margin-right: 25upx;
	}
	.f2{
	}
	.fr{
		float: right;
	}
</style>
