<template>
	<view>
		<view class="padding">
			<view >
				<view class="top">
					 <image :src="data.goodspic" mode=""></image>
					 <view class="s3 ">
						<view class="ellipsis title">{{data.goodsname}}</view>
						<view class="cg" style="margin-top: 15upx;">分类:{{data.specifications ? data.specifications:'无分类'}}</view>
					 </view>
				</view>
			</view>
			
			<view class="rate">
				<text>商品评价</text>
				<uni-rate class="stars" 
				active-color="#ff5b62" margin="10" size="18" @change='starChange' :value="form.star" ></uni-rate>
			</view>
			<view>
				<textarea class="comment" v-model="form.content" placeholder="留下你的评价,可以帮助更多小伙伴啊" />
			</view>
			
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
							<image src="../../static/img/pic/other/camera.png" mode=""></image>
							<view class="s2 cg">添加图片</view>
						</view>
					</view>
					</view>
					
					<radio-group @change="radioChange"  class="radio-group">
						 <radio value="0" :checked="current === 0" style="transform:scale(0.6)"/>
							<text>公开</text>	
					             <radio value="1" :checked="current === 1" style="transform:scale(0.6)"/>
					          <text>匿名</text>
					        </radio-group>
							
							<view style="text-align: center;">
								<button type="default" class="btn" @click="submit">提交</button>
							</view>
		</view>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
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
		components:{
			uniRate
		},
		data(){
			return {
				index:'',
				index2:'',
				index3:'',
				data:'',
				form:{
					merchid:'',
					uid:'',
					token:'',
					orderid:'',
					content:'',
					isanonymous:'0',
					star:'',
					pic:[]
				},
				current:0,
				imageList: [], //保存图片路径集合
				imageLength: 5, //限制图片张数
				sourceTypeIndex: 2, //添加方式限制
				sizeTypeIndex: 2, //图片尺寸限制
			}
		},
		onLoad(p){
			var that=this
			var userInfo=uni.getStorageSync('userInfo'),that=this
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.form.uid=userInfo.uid
				this.form.token=userInfo.token
			}
			var info=JSON.parse(p.item)
			this.index=p.index
			this.index2=p.index2
			this.index3=p.index3
			this.data=info
			this.form.goodsid=info.goodsid
			this.form.merchid=p.merchid
			this.form.orderid=p.orderno
		},
		methods:{
			starChange(e){
				this.form.star=e.value
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
				radioChange(e){
					console.log(e)
					this.form.isanonymous=e.detail.value
				},
				submit(){
					var  that=this,l=this.imageList.length;
					this.$loading()
					if(l==0){
						that.submitForm()
					}else{
						this.imageList.forEach((item,index) =>{
							that.$upload(item,'',(cb) =>{
								that.form.pic.push(cb)
							var	t=this.form.pic.length
								if(l==t){
									that.submitForm()
								}
							})
						})
					}
					
				},
				submitForm(){
					var that=this
					var url='&r=api.member.order.commentAdd'
					  this.$apiPost(url,this.form).then((res) =>{
							that.$msg('评价成功')
							uni.hideLoading()
							// uni.$emit('updateOrder')
							uni.$emit('disableComment',{index:that.index,index2:that.index2,index3:that.index3})
							setTimeout(function(){
								uni.navigateBack({
									delta:1
								})
							},500)
					  })
				}
		}
	}
</script>

<style>
	.top image{
		width: 90upx;
		height: 90upx;
		margin-right: 25upx;
	}
	.title{
		width: 500upx;
	}
	.top>view,
	.top image{
		display: inline-block;
		vertical-align: middle;
	}
	.rate{
		display: flex;
		align-items: center;
		margin: 30upx 0;
	}
	.rate>text{
		margin-right: 20upx;
	}
	 textarea{
		padding-left: 20upx;
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
		height: 184upx;
		width: 250upx;
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
		width: 250upx;
		padding: 45upx 0;
		margin: 15upx 15upx 15upx 0upx;
		text-align: center;
		/* display: flex;
		align-items: center;
		justify-content: center; */
		background: #f7f7f7;
		/* border: 3upx dashed #979797; */
		border-radius: 8upx;
	}
	 .add-view image{
		 width: 70upx;
		 height: 70upx;
	 }
	.btn{
		width: 100%;
		height: 75upx;
		background: #ff6d7e !important;
		border-radius: 0;
		margin: 20upx 0;
		text-align: center;
		line-height: 75upx;
		letter-spacing: 4px;
		color: white;
		font-size: 34upx;
	}
</style>
