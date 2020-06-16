<template>
	<view>
		<web-view :src="url"  :webview-styles="webviewStyles">111</web-view>
		<!-- <share-prompt :show='popshow'  :shareTitle="'密码门'" @close='closeSharePrompt'  ></share-prompt> -->
	</view>
</template>

<script>
	// import sharePrompt from '@/components/sharePrompt/sharePrompt'
	export default{
		// components:{
		// 	sharePrompt
		// },
		onLoad(p){
			this.url=p.url
		},
		onNavigationBarButtonTap(){
			this.$loading()
			// this.openShare()
				let shareOPtions = {
					provider: 'weixin',
								extra: {
									scene: "WXSceneSession"
								},
					scene: 'WXSceneSession', //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
					type: 5,
					success: (e) => {
						console.log('success', e);
						uni.showModal({
							content: '已分享',
							showCancel:false
						})
					},
					fail: (e) => {
						console.log('fail', e)
						uni.showModal({
							content: JSON.stringify(e),
							showCancel:false
						})
					},
					complete:function(){
						uni.hideLoading()
						console.log('分享操作结束!')
					}
				}
				// 1文字  2图片  0图文   5小程序
				// switch (this.shareType){
				// 	case 0:
				// 		shareOPtions.summary = '好玩';
				// 		shareOPtions.imageUrl =this.shareImg ? this.shareImg : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
				// 		shareOPtions.title = this.shareTitle;
				// 		shareOPtions.href = 'https://uniapp.dcloud.io';
				// 		break;
				// 	case 1:
				// 		shareOPtions.summary = this.shareText;
				// 		break;
				// 	case 2:
				// 		shareOPtions.imageUrl = this.image;
				// 		break;
				// 	case 5:
						shareOPtions.imageUrl = this.shareImg ? this.shareImg : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
						shareOPtions.title = this.shareTitle+'买啊';
						shareOPtions.miniProgram = {
							id:'gh_33446d7f7a26',
							path:'/pages/tabBar/component/component',
							webUrl:'https://uniapp.dcloud.io',
							type:0
						};
				// 		break;
				// 	default:
				// 		break;
				// }
				
				// if(shareOPtions.type === 0 && plus.os.name === 'iOS'){//如果是图文分享，且是ios平台，则压缩图片 
				// 	shareOPtions.imageUrl = await this.compress();
				// }
				// if(shareOPtions.type === 1 && shareOPtions.provider === 'qq'){//如果是分享文字到qq，则必须加上href和title
				// 	shareOPtions.href = 'https://uniapp.dcloud.io';
				// 	shareOPtions.title = '欢迎体验uniapp';
				// }
				uni.share(shareOPtions);
		},
		data(){
			return {
				url:'',
				webviewStyles:{
					 progress: {
					    color: '#ff6d7e'
					}
				},
				popshow:false,
			}
		},
		methods:{
			// closeSharePrompt(){
			// 	 this.popshow=false
			// },
			// openShare(){
			// 	this.popshow=true
			// }
		}
	}
</script>

<style>
</style>
