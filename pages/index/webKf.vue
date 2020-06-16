<template>
	<!-- #ifdef APP-PLUS || H5 -->
	<web-view src="/hybrid/html/local.html" @message='message' :webview-styles="webviewStyles"></web-view>
	<!-- #endif -->
	
	<!-- #ifdef MP-WEIXIN -->
	<web-view src=""></web-view>
	<!-- #endif -->
	
</template>

<script>
	export default{
		data(){
			return {
				webviewStyles:{
					 progress: {
					                        color: '#ff6d7e'
					                    }
				}
			}
		},
		onLoad(){
			this.$loading('精彩马上呈现')
		},
		methods:{
			message(p){
				uni.hideLoading()
			}
		}
	}
</script>

<style>
</style>
