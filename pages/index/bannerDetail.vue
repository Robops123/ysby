<template>
	<view style="width: 300upx; height: 400upx;">
		<web-view :src="url"  :webview-styles="webviewStyles" >
		</web-view>
	</view>
</template>

<script>
	import BottomImageMenu from '@/components/zh-bottom-image-menu/zh-bottom-image-menu.js'
	var bottomImageMenu = null
	export default{
		computed: {
		    menus() {
		      return [
		        {
		          icon: '/static/img/pic/other/weixin.png',
		          label: '微信',
		          onClick:() => {
		            this.share('WXSceneSession',1)
		          }
		        },
		        {
		          icon: '/static/img/pic/other/pyq.png',
		          label: '朋友圈',
				  onClick:() =>{
					  this.share('WXSenceTimeline',1)
				  }
		        },
		      ]
		    }
		  },
		onLoad(p){
			this.url=p.url
			 bottomImageMenu = new BottomImageMenu(this.menus)
		},
		onNavigationBarButtonTap(){
			// this.$loading()
			// this.openShare()
			this.showMenu()
				
		},
		data(){
			return {
				url:'',
				shareType:0,
				webviewStyles:{
					 progress: {
					    color: '#ff6d7e'
					}
				},
				popshow:false,
			}
		},
		methods:{
			closeSharePrompt(){
				 this.popshow=false
			},
			openShare(){
				this.popshow=true
			},
			showMenu() {
			      if (!bottomImageMenu) {
			        bottomImageMenu = new BottomImageMenu(this.menus, (menu, index) => {
			          uni.showToast({ title: `点击了:${menu.label},索引是${index},这是统一处理的`, icon: 'none' })
			        })
			      }
			      bottomImageMenu.show()
			    },
				share(type){
					this.$loading()
					let shareOPtions = {
						provider: 'weixin',
									extra: {
										scene: type
									},
						scene: type, //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
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
					switch (this.shareType){
						case 0:
							shareOPtions.summary = ' ';
							shareOPtions.imageUrl =this.shareImg ? this.shareImg : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
							shareOPtions.title = '';
							shareOPtions.href = this.url;
							break;
						case 1:
							shareOPtions.summary = this.shareText;
							break;
						case 2:
							shareOPtions.imageUrl = this.image;
							break;
						case 5:
							shareOPtions.imageUrl = this.shareImg ? this.shareImg : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
							shareOPtions.title = this.shareTitle+'买啊';
							shareOPtions.miniProgram = {
								id:'gh_2f5dfaa2fae2',
								path:'/pages/tabBar/component/component',
								webUrl:'https://uniapp.dcloud.io',
								type:0
							};
							break;
						default:
							break;
					}
					
					// if(shareOPtions.type === 0 && plus.os.name === 'iOS'){//如果是图文分享，且是ios平台，则压缩图片 
					// 	shareOPtions.imageUrl = await this.compress();
					// }
					// if(shareOPtions.type === 1 && shareOPtions.provider === 'qq'){//如果是分享文字到qq，则必须加上href和title
					// 	shareOPtions.href = 'https://uniapp.dcloud.io';
					// 	shareOPtions.title = '欢迎体验uniapp';
					// }
					uni.share(shareOPtions);
				}
		}
	}
</script>

<style>
</style>
