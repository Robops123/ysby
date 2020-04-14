<template>
	<view>
		<view class="pop" v-if="show">
			<view class="pop-wrapper" @click="show=false"></view>
			<view class="pop-container">
				<view class="options" v-for="(item,index) in dataList" :key='index' @click="choose(item)">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['dataList'],
		data(){
			return{
				show:false
			}
		},
		methods:{
			choose(info){
				this.show=false
				uni.$emit('popChoosed',info)
			}
		}
	}
</script>

<style>
	.pop{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
	}
	.pop .pop-wrapper{
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: #696969;
		opacity: 0.8;
	}
	.pop .pop-container{
		width: 80%;
		position: relative;
		max-height: 500upx;
		min-height: 200upx;
		overflow-y: auto;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 20px;
	}
	.pop .options{
		box-sizing: border-box;
		line-height: 100upx;
		padding-left: 60upx;
		height: 100upx;
		border-bottom: 2px solid #ebebeb;
	}
	.pop .options:last-child{
		border-bottom: 0;
	}
</style>
