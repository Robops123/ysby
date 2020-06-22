<template>
	<!-- #ifdef APP-PLUS || H5 -->
	<web-view src="http://yuying.qinshaozhuanshu.cn/web/merchant.php?c=site&a=entry&i=2&m=zhonghong_zhihui&do=web&r=chat" @message='message' :webview-styles="webviewStyles"></web-view>
	<!-- #endif -->
	
	<!-- <web-view src=""></web-view> -->
	
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
