<template>
	<view style="border-top: 20upx solid #f3f3f3;padding-bottom: 130upx;">
		<view class="bottom-border" v-for='(item,index) in 20' :key='index'>
			<view class="padding s2">
				<view class="s8 magin">
					<text class="label-80">许愿</text>
					<text>188382723651</text>
				</view>
				<view class="flex-between magin">
					<text class="address">江苏省无锡市滨湖区爱丽丝德哈卡收到货拉可适当</text>
					<view class="icon-fire iconfont " @click="toChange('edit')"></view>
				</view>
			</view>
		</view>
		
		<view style="text-align: center;">
			<button type="default" class="btn" @click="toChange('add')"><view class="icon-fire iconfont button-icon"></view>新建收货地址</button>
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
			toChange(t){
				uni.navigateTo({
					url:'./addressChange'
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.bottom-border{
		border-bottom: 1px solid #f7f7f7;
	}
	.label-80{
		display: inline-block;
		margin-right: 20upx;
		width: 120upx;
	}
	.address{
		display: inline-block;
		width: 80%;
	}
	.magin{
		margin: 10upx 0;
	}
	
	.btn{
		width: 80%;
		height: 75upx;
		background: #ff6d7e !important;
		border-radius: 0;
		margin: 20upx 10%;
		text-align: center;
		line-height: 75upx;
		border-radius: 75upx;
		letter-spacing: 4px;
		color: white;
		font-size: 34upx;
		position: fixed;
		bottom: 40upx;
	}
	.button-icon{
		display: inline;
	}
</style>
