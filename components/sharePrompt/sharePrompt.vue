<template>
	<view  class="popup-box" v-show="popshow">
				 <view class="wrapper" @click="close" ></view>
				 <view class="popup animated slideInUp" >
					 <view class="cr s5">分享给好友</view>
					 <view class="padding">
						 <!-- #ifdef APP-PLUS -->
						 <view class="share-item" v-for="(item,index) in providerList" :key='index' @tap="share(item)">
						 						 <image src="../../static/img/pic/other/weixin.png" mode="" v-if="item.name=='微信'"></image>
												 <image src="../../static/img/pic/other/pyq.png" mode="" v-if="item.name=='朋友圈'"></image>
						 						 <view class="">{{item.name}}</view>
						 </view>
						 <!-- #endif -->
						 <!-- #ifdef MP-WEIXIN -->
							<button class="share-item share-btn" open-type="share">
												<image src="../../static/img/pic/other/weixin.png" mode="" ></image>
													 <view class="">微信</view>
							</button>
						 <!-- #endif -->
						 <!-- <view class="share-item">
						 						 <image src="../../static/img/bg/activity.png" mode=""></image>
						 						 <view class="">微信</view>
						 </view> -->
						 <view class="share-item" @click="createPoster" v-if="goodsid!=''">
						 						 <image src="../../static/img/pic/other/post.png" mode=""></image>
						 						 <view class="">生成海报</view>
						 </view>
						 
					 </view>
					 <view>
						 <button type="default" class="text-btn" @click="close">取消</button>
					 </view>
				 </view>
				 
				 
				
	</view>
</template>

<script>
	
	export default{
		// components:{
		// 	sPopup
		// },
		props:{
			uid:{
				type:String
			},
			token:{
				type:String
			},
			goodsid:{
				type:String,
				default:''
			},
			miniProgramPath:{
				type:String,
				default:''
			},
			alterUrl:{
				type:String,
				default:''
			},
			// 
			show:{
				type:Boolean,
				default:false
			},
			shareImg:{
				type:String
			},
			shareTitle:{
				type:String
			},
			shareContent:{
				type:String
			}
		},
		data(){
			return {
				popshow:false,
				// 分享
				providerList:[],
				shareType:0,
				shareText:'嘎哈',
				visible:false,
				spopshow:false,
				advImg:'',
				popupShow:true,
			}
		},
		mounted(){
			this.popshow=this.show
			console.log(this.popshow)
			this.getProvider()
		},
		watch:{
			show(n){
				console.log(n)
				this.popshow=n
			}
		},
		methods:{
			// 分享
			getProvider(){
							  uni.getProvider({
							  	service: 'share',
							  	success: (e) => {
							  		console.log('success', e);
							  		let data = []
							  		for (let i = 0; i < e.provider.length; i++) {
							  			switch (e.provider[i]) {
							  				case 'weixin':
							  					data.push({
							  						name: '微信',
													way:5,
							  						id: 'weixin',
							  						sort:0
							  					})
							  					data.push({
							  						name: '朋友圈',
							  						id: 'weixin',
													way:0,
							  						type:'WXSenceTimeline',
							  						sort:1
							  					})
							  					break;
							  				// case 'sinaweibo':
							  				// 	data.push({
							  				// 		name: '分享到新浪微博',
							  				// 		id: 'sinaweibo',
							  				// 		sort:2
							  				// 	})
							  				// 	break;
							  				// case 'qq':
							  				// 	data.push({
							  				// 		name: '分享到QQ',
							  				// 		id: 'qq',
							  				// 		sort:3
							  				// 	})
							  				// 	break;
							  				default:
							  					break;
							  			}
							  		}
							  		this.providerList = data.sort((x,y) => {
							  			return x.sort - y.sort
							  		});
							  	},
							  	fail: (e) => {
							  		console.log('获取分享通道失败', e);
							  		uni.showModal({
							  			content:'获取分享通道失败',
							  			showCancel:false
							  		})
							  	}
							  });
			},
			async share(e) {
				this.$loading()
				let shareOPtions = {
					provider: e.id,
								extra: {
									scene: "WXSceneSession"
								},
					scene: e.type && e.type === 'WXSenceTimeline' ? 'WXSenceTimeline' : 'WXSceneSession', //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
					type: e.way,
					success: (e) => {
						console.log('success', e);
						uni.showModal({
							content: '分享成功',
							showCancel:false
						})
					},
					fail: (e) => {
						console.log('fail', e)
						uni.showModal({
							content: '分享失败',
							showCancel:false
						})
					},
					complete:function(){
						uni.hideLoading()
						console.log('分享操作结束!')
					}
				}
				// 1文字  2图片  0图文   5小程序
				switch (e.way){
					case 0:
						shareOPtions.summary = '';
						shareOPtions.imageUrl =this.shareImg ? this.shareImg : '/static/img/app.jpg'
						shareOPtions.title = this.shareTitle;
						shareOPtions.href = this.alterUrl;
						break;
					case 1:
						shareOPtions.summary = this.shareText;
						break;
					case 2:
						shareOPtions.imageUrl = this.image;
						break;
					case 5:
						shareOPtions.imageUrl = this.shareImg ? this.shareImg : '/static/img/app.jpg'
						shareOPtions.title = this.shareTitle;
						shareOPtions.miniProgram = {
							id:'gh_2f5dfaa2fae2',
							path:this.miniProgramPath,
							webUrl:this.alterUrl,
							type:0
						};
						break;
					default:
						break;
				}
				
				// if(shareOPtions.type === 0 && plus.os.name === 'iOS'){//如果是图文分享，且是ios平台，则压缩图片 
				// 	shareOPtions.imageUrl = await this.compress();
				// }
				if(shareOPtions.type === 1 && shareOPtions.provider === 'qq'){//如果是分享文字到qq，则必须加上href和title
					shareOPtions.href = 'https://uniapp.dcloud.io';
					shareOPtions.title = '欢迎体验uniapp';
				}
				uni.share(shareOPtions);
			},
			// 海报
			createPoster(){
								this.$loading()
							  	var that=this
							  	var params={
							  		uid:this.uid,
							  		token:this.token,
									goodsid:this.goodsid,
									type:3
							  	}
							  	var url='&r=api.common.share.createPoster'
							  	  this.$apiPost(url,params).then((res) =>{
							  		  // that.advImg=res.data.img
							  		//   that.visible=true
									  // that.popupShow=false
									  that.$emit('poster',res.data.img)
									  that.close()
									  uni.hideLoading()
							  	  })
			},
			saveImg(url){
				var that=this
				that.$loading()
				uni.downloadFile({
						url: url,
						success: (res) =>{
							if (res.statusCode === 200){
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function() {
										that.$msg('保存成功，请到相册中查看')
										that.visible=false
									},
									fail: function() {
										that.$msg('保存失败')
									},
									complete:() =>{
										uni.hideLoading()
									}
								});
							}
						}
					})
			},
			close(){
				this.popshow=false
				this.$emit('close')
			}
		}
	}
</script>

<style>
	.popup{
		position: relative;
		text-align: center;
		background-color: #fff;
		z-index: 99999999999999;
		padding-top: 30upx;
	}
	.share-item{
		display: inline-block;
		vertical-align: middle;
		width: 33%;
		padding-bottom: 30upx;
		border-bottom: 1px solid #efefef;
	}
	.share-item image{
		width: 80upx;
		height: 80upx;
	}
	.text-btn{
		border: none !important;
		outline: none;
		background-color: #fff !important;
		color: #666 !important;
		line-height: 70upx;
		padding: 0 0 20upx;
		text-align: center;
	}
	.text-btn:after{
		display: none;
	}
	.popup-box{
		position: fixed;
		display: flex;
		align-items: flex-end;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99999999;
	}
	.popup-box .wrapper{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #333;
		opacity: 0.6;
	}
	.popup-box .popup{
		position: relative;
		width: 100%;
		bottom: 0 !important;
		left: 0;
		right: 0;
		height: 360upx;
		box-sizing: border-box;
	}
	.share-btn{
		outline: none;
		background-color: initial;
		color: initial;
		line-height: initial;
		vertical-align: middle;
		font-size: 14px;
	}
	.share-btn::after{
		display: none;
	}
	.goods-nav{
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 3;
	}
	.bottom-nav{
		position: relative;
	}
	
	.adv-btn{
		width: 94%;
		margin: 0 auto;
		background-color: #fba1b0;
		color: #fff;
		border-radius: 6px;
		line-height: 1;
		border: none;
		outline: none;
		padding: 20upx 0;
		text-align: center;
		margin-bottom: 20upx;
		font-size: 12px;
	}
	.banner{
		width: 100%;
		height: 100%;
	}
	.detail img{
		width: 100%;
	}
</style>
