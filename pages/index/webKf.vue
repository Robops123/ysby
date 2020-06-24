<template>
	<!-- #ifdef APP-PLUS || H5 -->
	<web-view :src="'/hybrid/html/local.html?hx_openid='+hx_openid+'&hx_pwd='+hx_pwd" @message='message' :webview-styles="webviewStyles"></web-view>
	<!-- #endif -->
	
	<!-- <web-view src=""></web-view> -->
	
</template>

<script>
	export default{
		data(){
			return {
				hx_openid:'',
				hx_pwd:'',
				webviewStyles:{
					 progress: {
					                        color: '#ff6d7e'
					                    }
				}
			}
		},
		onLoad(){
			var userInfo=uni.getStorageSync('userInfo')
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.hx_openid=userInfo.hx_openid
				this.hx_pwd=userInfo.hx_pwd
			}
			// this.$loading('精彩马上呈现')
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
