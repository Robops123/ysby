<template>
	<view class="invite-container padding">
		<view class="invite-title">联系方式:</view>
		<view class="content">
			<input type="number" v-model="mobile" placeholder="您的联系方式" />
		</view>
		<view class="invite-title">意见:</view>
		<view class="content">
			<textarea v-model="content" placeholder="写下您的宝贵意见" />
		</view>
		<view class="invite-title">图片:</view>
		<view class="activity">
			<view class="uploads">
					<!-- 图片上传 -->
					<view class='upload-image-view'>
						<!-- 标题已经省略 -->
						<!-- <view class='title'>上传xxxx图片</view> -->
						<block v-for="(image,index) in imageList" :key="index">
							<view class='image-view'>
								<image :src="image" :data-src="image" @tap="previewImage"></image>
								<view class='del-btn' :data-index="index" @tap='deleteImage'>
									<view class='baicha'></view>
								</view>
							</view>
						</block>
						<view class='add-view' v-if="imageList.length < imageLength" @tap="chooseImage">
							<view class="cross">
								<view class="transverse-line"></view>
								<view class="vertical-line"></view>
							</view>
			 
						</view>
					</view>
					</view>
					<view class="s2 cg">首张图片为商品主图</view>
		</view>
		<view style="margin-top: 20upx;">
			<button class="adv-btn adv-btn2" @click="submit()">提交</button>
		</view>
	</view>
</template>

<script>
	var sourceType = [
			['camera'], //拍照
			['album'], //相册
			['camera', 'album'] //拍照或相册
		]
		var sizeType = [
			['compressed'], //压缩
			['original'], //原图
			['compressed', 'original'] //压缩或原图
		]
	export default{
		data(){
			return {
				uid:'',
				token:'',
				mobile:'',
				img:'',
				content:'',
				imageList:[],
				pic:[],
				imageLength:3
			}
		},
		mounted(){
			var userInfo=uni.getStorageSync('userInfo'),that=this
				this.uid=userInfo.uid
				this.token=userInfo.token
		},
		methods:{
			//选择图片
			chooseImage: async function() {
					uni.chooseImage({
						sourceType: sourceType[this.sourceTypeIndex],
						// #ifdef MP-WEIXIN
						sizeType: sizeType[this.sizeTypeIndex],
						// #endif
						count: this.imageLength - this.imageList.length,
						success: (res) => {
							this.imageList = this.imageList.concat(res.tempFilePaths);
						}
					})
				},
				//预览图片
				previewImage: function(e) {
					var current = e.target.dataset.src
					uni.previewImage({
						current: current,
						urls: this.imageList
					})
				},
				//删除图片
				deleteImage: function(e) {
					var index = e.target.dataset.index;
					var that = this;
					var images = that.imageList;
					images.splice(index, 1);
					that.imageList = images;
				},
				submit(){
					var  that=this,l=this.imageList.length;
					if(!this.mobile){
						this.$msg('请填写联系方式')
						return ;
					}
					if(!this.content){
						this.$msg('请填写内容')
						return ;
					}
					if(l==0){
						this.$msg('至少需上传一张图片')
						return ;
					}else{
						this.$loading()
						this.imageList.forEach((item,index) =>{
							if(item.indexOf('http://')<0 && item.indexOf('https://')<0){
								that.$upload(item,'',(cb) =>{
									that.pic.push(cb)
								var	t=that.pic.length
									if(l==t){
										that.submitSuggestion()
									}
								})
							}else{
								that.pic.push(item)
								var	t=this.pic.length
									if(l==t){
										that.submitSuggestion()
									}
							}
						})
					}
					
				},
			submitSuggestion(){
				var that=this
				var params={
					uid:this.uid,
					token:this.token,
					content:this.content,
					mobile:this.mobile,
					img:this.pic.join(',')
				}
				var url='&r=api.member.advice'
				  this.$apiPost(url,params).then((res) =>{
					  uni.hideLoading()
					  that.$msg('提交成功,谢谢参与')
					  setTimeout(() =>{
						  uni.navigateBack({
						  	delta:1
						  })
					  },1500)
				  })
			}
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.invite-title{
		margin-bottom: 20upx;
	}
	.content textarea{
		width: 100% !important;
		height: 250upx;
		border: 1px solid #F3F3F3;
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
		padding: 35upx 0;
		text-align: center;
		margin-bottom: 20upx;
		font-size: 12px;
	}
	.adv-btn2{
		margin-top: 50upx;
	}
	.upload-image-view {
		width: 100%;
		margin: 20upx 0 20upx 0;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
	 
	.upload-image-view .title {
		width: 100%;
		font-family: PingFang-SC-Regular;
		font-size: 24upx;
		color: #4a4a4a;
		margin-bottom: 15upx;
		line-height: 100%;
	}
	 
	.upload-image-view .info {
		width: 100%;
		font-family: PingFang-SC-Regular;
		font-size: 24upx;
		color: #ff4259;
		height: 24upx;
		margin-top: 15upx;
		line-height: 24upx;
	}
	 
	.upload-image-view .image-view {
		height: 175upx;
		width: 175upx;
		position: relative;
		margin: 15upx 45upx 15upx 0upx;
		border-radius: 8upx;
	}
	 
	.upload-image-view .image-view image {
		height: 100%;
		width: 100%;
		border-radius: 8upx;
	}
	 
	.upload-image-view .image-view .del-btn {
		background-color: #f67371;
		border-radius: 50%;
		width: 25upx;
		height: 25upx;
		position: absolute;
		top: -12upx;
		right: -12upx;
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	 
	.upload-image-view .image-view .del-btn .baicha {
		display: inline-block;
		width: 20upx;
		height: 5upx;
		background: #fff;
		line-height: 0;
		font-size: 0;
		vertical-align: middle;
		-webkit-transform: rotate(45deg);
	}
	 
	.upload-image-view .image-view .del-btn .baicha:after {
		content: '/';
		display: block;
		width: 20upx;
		height: 5upx;
		background: #fff;
		-webkit-transform: rotate(-90deg);
	}
	 
	.upload-image-view .add-view {
		position: relative;
		height: 175upx;
		width: 175upx;
		margin: 15upx 15upx 15upx 0upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f7f7f7;
		/* border: 3upx dashed #979797; */
		border-radius: 8upx;
	}
	 
	/* 相机 */
	 
	.upload-image-view .add-view .xiangji {
		height: 40upx;
		width: 48upx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	 
	.upload-image-view .add-view .xiangji .tixing {
		width: 10upx;
		height: 7upx;
		background-color: #fff;
		border-right: 10upx solid #fff;
		border-bottom: 7upx solid #b2b2b2;
		border-left: 10upx solid #fff;
	}
	 
	.upload-image-view .add-view .xiangji .changfx {
		height: 32upx;
		width: 48upx;
		border-radius: 5%;
		background-color: #b2b2b2;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	 
	.upload-image-view .add-view .xiangji .changfx .yuan1 {
		height: 20upx;
		width: 20upx;
		border-radius: 50%;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	 
	.upload-image-view .add-view .xiangji .changfx .yuan2 {
		height: 10upx;
		width: 10upx;
		border-radius: 50%;
		background-color: #b2b2b2;
	}
	 
	/* 第二套图片上传样式（内部图标 十字架）*/
	 
	/* 十字架 */
	.upload-image-view .add-view .cross {
		height: 48upx;
		width: 48upx;
		display: flex;
		flex-wrap: wrap;
		position: relative;
	}
	 
	.upload-image-view .add-view .cross .transverse-line {
		height: 100%;
		width: 48%;
		position: absolute;
		border-right: 3upx solid #afafaf;
		top: 0;
		left: 0;
	}
	 
	.upload-image-view .add-view .cross .vertical-line {
		height: 48%;
		width: 100%;
		position: absolute;
		border-bottom: 3upx solid #afafaf;
		top: 0;
		left: 0;
	}
	.uploads{
		/* padding-left: 50upx; */
	}
	.tip{
		position: absolute;
		right: 0;
		top: 0;
	}
	.btn{
		width: 100%;
		height: 75upx;
		background: #ff6d7e !important;
		border-radius: 0;
		text-align: center;
		line-height: 75upx;
		letter-spacing: 4px;
		color: white !important;
		font-size: 34upx;
	}
	.content{
		margin-bottom: 20upx;
	}
</style>
