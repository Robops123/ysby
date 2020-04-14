<template>
	<view>
		<view class="child-overall-item padding bgwhite margin">
			<image src="../../static/img/bg/activity.png" mode=""></image>
			<view class="info">
				<view>
					<view class="s2 title">
						儿童木马麻木童儿儿童木马麻木童儿儿童木马麻木童儿儿童木马麻木童儿
						童儿儿童木马麻木童儿儿童木马麻木童儿童儿儿童木马麻木童儿儿童木马麻木童儿
					</view>
					<view class="s3 cg options">
						海蓝色；24(155/60A)<icon type="" class="icon-fire iconfont"></icon>
					</view>
				</view>
			</view>
		</view>
		
		<view class="padding bgwhite">
			<view class="choice">
				<text>货物状态</text>
				<view class="fr">
					<picker class="picker" @change="bindPickerChange" :value="cateCurrent" :range="array">
					     <view class="uni-input">{{array[cateCurrent]}}</view>
					 </picker>
					 <text class="icon-fire iconfont cg"></text>
				</view>
			</view>
			<view class="choice">
				<text>退款原因</text>
				<view class="fr">
					<picker class="picker" @change="bindPickerChange2" :value="cateCurrent2" :range="array2">
					     <view class="uni-input">{{array[cateCurrent2]}}</view>
					 </picker>
					 <text class="icon-fire iconfont cg"></text>
				</view>
			</view>
			<view class="choice pannel">
				<view>退款金额：￥
				<input type="text" value="" />
				</view>
				<view class="cg s3">最多￥45.00,含发货邮费￥0.00</view>
				<view>
					<text>退款说明：</text>
					<input type="text" value="" placeholder="选填"/>
				</view>
			</view>
		</view>
		
		<view class="padding bgwhite margin">
			<view>上传凭证</view>
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
							<image src="../../static/img/bg/activity.png" mode=""></image>
							<view class="s2 cg">上传凭证(最多5张)</view>
						</view>
					</view>
					</view>
		</view>
		
		
		<view>
			<button type="default" class="btn" @click="to('afterSale')">提交</button>
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
			return{
				current:1,
				cateCurrent:0,
				cateCurrent2:0,
				 array: ['中国', '美国', '巴西', '日本'],
				 array2: ['中国', '美国', '巴西', '日本'],
				imageList: [], //保存图片路径集合
				imageLength: 5, //限制图片张数
				sourceTypeIndex: 2, //添加方式限制
				sizeTypeIndex: 2, //图片尺寸限制
				// 地址
				lat:'',
				lng:'',
				address:''
			}
		},
		methods:{
			to(w){
				uni.navigateTo({
					url:`/pages/drawback/${w}`
				})
			},
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
				bindPickerChange(e){
					console.log(e)
				},
				bindPickerChange2(e){
					console.log(e)
				}
		}
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
	.margin{
		margin: 20upx 0;
	}
	.bgwhite{
		background-color: #fff;
	}
	.child-overall-item,
	.overall{
		display: flex;
		justify-items: center;
	}
	.child-overall-item>image{
		width: 150upx;
		height: 150upx;
		margin-right: 20upx;
	}
	.child-overall-item .title{
		margin-top: 10upx;
		width: 500upx;
		height: 64upx;
		overflow:hidden;//一定要写
		    text-overflow: ellipsis;//超出省略号
		    display:-webkit-box;//一定要写
		    -webkit-line-clamp: 2;//控制行数
		    -webkit-box-orient: vertical;//一定要写
	}
	.choice{
		padding: 20upx 0;
	}
	.choice:not(:last-child){
		border-bottom: 1px solid #dedede;
	}
	.picker,.choice input{
		display: inline-block;
		vertical-align: bottom;
	}
	.choice .iconfont{
		margin-left: 20upx;
	}
	.pannel>view{
		margin: 15upx 0;
	}
	
	
	/* 第一套图片上传样式（内部图标相机） */
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
		height: 220upx;
		width: 220upx;
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
		width: 220upx;
		height: 220upx;
		padding: 45upx 0;
		box-sizing: border-box;
		margin: 15upx 15upx 15upx 0upx;
		text-align: center;
		/* display: flex;
		align-items: center;
		justify-content: center; */
		/* background: #f7f7f7; */
		border: 3upx dashed #979797;
		border-radius: 8upx;
	}
	 .add-view image{
		 width: 70upx;
		 height: 70upx;
	 }
	 .add-view>view{
		 width: 110upx;
		 margin: 0 auto;
	 }
	 
	 .btn{
	 	width: 100%;
	 	height: 80upx;
	 	line-height: 80upx;
	 	text-align: center;
	 	font-size: 30upx;
	 	display: inline-block;
		margin-top: 90upx;
		color: #fff !important;
	 	border-radius: 0;
	 	background-color: #ff6d7e !important;
	 }
</style>
