<template>
	<view >
		<!-- #ifdef MP-WEIXIN || H5-->
		<!-- <view class=" manage" @click="toggleOperation">{{operate ? '完成':'管理'}}</view> -->
		<web-view v-if="url" :src="url"  :webview-styles="webviewStyles" >
		</web-view>
		<!-- #endif -->
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	import BottomImageMenu from '@/components/zh-bottom-image-menu/zh-bottom-image-menu.js'
	// #endif
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
		  onShareAppMessage(){
			return{
				title: '我的分享',
				path: '/pages/index/bannerDetail?url='+this.url,
				imageUrl:this.image ? this.image : '/static/img/app.jpg'
			}  
		  },
		onLoad(p){
			this.url=decodeURIComponent(p.url)
			           // #ifdef APP-PLUS
					   bottomImageMenu = new BottomImageMenu(this.menus)
			           var  wv = plus.webview.create("","custom-webview",{
			                      plusrequire:"none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
			                'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
			                      top:uni.getSystemInfoSync().statusBarHeight+44 //放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
			                  })
			                  wv.loadURL(this.url)
			                  var currentWebview = this.$scope.$getAppWebview(); //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
			                  currentWebview.append(wv);//一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
			                  setTimeout(function() {
			                      console.log(wv.getStyle())
			                  }, 1000);//如果是首页的onload调用时需要延时一下，二级页面无需延时，可直接获取
			                  // #endif
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
						},
						fail: (e) => {
							console.log('fail', e)
						},
						complete:function(){
							uni.hideLoading()
							bottomImageMenu.close()
							console.log('分享操作结束!')
						}
					}
					// 1文字  2图片  0图文   5小程序
					switch (this.shareType){
						case 0:
							shareOPtions.summary = ' ';
							shareOPtions.imageUrl =this.shareImg ? this.shareImg : '/static/img/app.jpg'
							shareOPtions.title = '分享链接';
							shareOPtions.href = this.url;
							break;
						case 1:
							shareOPtions.summary = '分享链接';
							break;
						case 2:
							shareOPtions.imageUrl = this.image;
							break;
						case 5:
							shareOPtions.imageUrl = this.shareImg ? this.shareImg : '/static/img/app.jpg'
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
