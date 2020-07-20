<template>
	<view>
		<view class="activity" style="margin-top: 20upx;">
			<view class="bottom-border">
				<text style="vertical-align: top;" class="label-80">商品名称</text>
				<textarea v-model="data.title" placeholder="请输入商品名称" class="txt"/>
			</view>
			<view class="bottom-border">
				<text style="vertical-align: top;" class="label-80">副标题</text>
				<input v-model="data.subtitle" placeholder="请输入商品副标题" />
			</view>
			<view class="bottom-border">
				<text style="vertical-align: top;" class="label-80">单位</text>
				<input v-model="data.unit" placeholder="请输入商品单位" />
			</view>
		</view>
		
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
							<text class="tip cg s3">750*350</text>
							<view class="cross">
								<view class="transverse-line"></view>
								<view class="vertical-line"></view>
							</view>
			 
						</view>
					</view>
					</view>
					<view class="s2 cg">首张图片为商品主图</view>
		</view>
		
		
		<view class="activity s2">
			<!-- <view class="bottom-border">
				<text class="label-80 cg">商品类型</text>
				<text>商品分类</text>
				<text class="fr s3">不可修改</text>
			</view> -->
			<view class="bottom-border">
				<text class="label-80 cg">商品分类</text>
				<view>
					<picker class="picker" @change="bindPickerChange" :value="cateCurrent" :range="array" :range-key="'name'">
					     <view class="uni-input " style="display: inline-block;">{{displayCate || "其他分类"}}</view>
						 <text class="icon-arrow-right iconfont fr"></text>
					 </picker>
					<!-- <text class="ellipsis cg" v-if="address==''">点击选择</text>
					<text class=" ellipsis" v-else>{{address}}</text> -->
					
				</view>
			</view>
			<view class="bottom-border">
				<text class="label-80 cg">热卖设置</text>
				<radio-group @change="radioChange"  class="radio-group">
						<text>是</text>	
				              <radio value="1" :checked="data.ishot=='1'" style="transform:scale(0.7)"/>
				          <text>否</text>
				                <radio value="2" :checked="data.ishot=='2'" style="transform:scale(0.7)"/>
				            </text>
				        </radio-group>
			</view>
		</view>
		
		<view class="activity s2">
			<view class="bottom-border">
				<text class="label-80 cg">价格</text>
				<input type="text" v-model="data.marketprice" style="vertical-align: middle;"/>
			</view>
			<view class="bottom-border">
				<text class="label-80 cg">库存</text>
				<input type="text" v-model="data.total" style="vertical-align: middle;"/>
			</view>
			<view class="bottom-border">
				<text class="label-80 cg">商品重量</text>
				<input type="text" v-model="data.weight" style="vertical-align: middle;"/>
			</view>
		</view>
		
		
		<view class="activity flex-between">
			<text class="cg ">商品上架</text>
			<switch class="fr " style="transform:scale(0.7)" :checked='data.goodsstatus=="3"' @change="switch1Change" />
		</view>
		
		<view class="activity flex-between">
				<text class="label-80 cg">商品排序</text>
				<input type="text" v-model="data.displayorder" style="text-align: right;"/>
		</view>
		
		<view style="margin: 10upx 0;text-align: center;" class="s2 cg">更多设置请至PC端后台</view>
		
		<view style="text-align: center;">
			<button type="default" class="btn" @click="submit">保存</button>
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
				displayCate:'',
				data:{},
				goodsid:'',
				uid:'',
				token:'',
				current:1,
				cateCurrent:0,
				 array: ['中国', '美国', '巴西', '日本'],
				imageList: [], //保存图片路径集合
				imageLength: 5, //限制图片张数
				sourceTypeIndex: 2, //添加方式限制
				sizeTypeIndex: 2, //图片尺寸限制
				// 地址
				lat:'',
				lng:'',
				address:'',
				pic:[]
			}
		},
		onLoad(p){
			var that=this
			this.goodsid=p.goodsid
			var userInfo=uni.getStorageSync('userInfo'),that=this
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.uid=userInfo.uid
				this.token=userInfo.token
			} 
			this.getDetail()
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
				chooseLocation(){
					var that=this
					uni.chooseLocation({
						success:(res) =>{
							// console.log(res)
							that.lat=res.latitude
							that.lng=res.longitude
							that.address=res.name
						}
					})
				},
				switch1Change(e){
					var v=e.detail.value
					if(v){
						this.data.goodsstatus='3'
					}else{
						this.data.goodsstatus='5'
					}
				},
				radioChange(e){
						var v=e.detail.value
						this.data.ishot=v
				},
				bindPickerChange(e){
					var v=e.detail.value
					this.displayCate=this.array[v].name
					this.data.cates=this.array[v].id
				},
				getDetail(){
					this.$loading()
					var that=this
					var params={
						uid:this.uid,
						token:this.token,
						goodsid:this.goodsid
					}
					var url='&r=api.myshop.goods.edit'
					  this.$apiPost(url,params).then((res) =>{
							that.data=res.data
							that.pic=[]
							that.array=res.data.category
							that.imageList=res.data.thumb.split(',')
							var regCate=that.array.filter((item) =>{return item.id==res.data.cates})
							if(regCate.length>0){
								that.displayCate=regCate[0].name
							}
							// that.imageList=res.data
							uni.hideLoading()
					  })
				},
				submit(){
					var  that=this,l=this.imageList.length;
					this.$loading()
					if(l==0){
						this.$msg('至少需上传一张图片')
						return ;
					}else{
						this.imageList.forEach((item,index) =>{
							if(item.indexOf('http://')<0 && item.indexOf('https://')<0){
								that.$upload(item,'',(cb) =>{
									that.pic.push(cb)
								var	t=that.pic.length
									if(l==t){
										that.submitForm()
									}
								})
							}else{
								that.pic.push(item)
								var	t=this.pic.length
									if(l==t){
										that.submitForm()
									}
							}
						})
					}
					
				},
				submitForm(){
					var that=this
					var params={
						uid:this.uid,
						token:this.token,
						goodsid:this.goodsid,
						title:this.data.title,
						subtitle:this.data.subtitle,
						unit:this.data.unit,
						thumb:this.pic.join(','),
						marketprice:this.data.marketprice,
						total:this.data.total,
						weight:this.data.weight,
						goodsstatus:this.data.goodsstatus,
						ishot:this.data.ishot,
						displayorder:this.data.displayorder,
						cates:this.data.cates
					}
					var url='&r=api.myshop.goods.doEdit'
					  this.$apiPost(url,params).then((res) =>{
							that.$msg('修改成功')
							setTimeout(function(){
								uni.hideLoading()
								that.getDetail()
							},1500)
					  })
				}
		}
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
	.bottom-border{
		padding: 15upx 0;
		margin: 15upx 0;
		border-bottom: 1px solid #f7f7f7;
		}
		.activity{
			padding: 15upx 30upx 15upx 20upx;
			font-size: 30upx;
			background: white;
			border-bottom: 20upx solid #f3f3f3;
		}
		.headface{
			width: 90upx;
			height: 90upx;
			border-radius: 50%;
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
		.label-80{
			width: 150upx;
			margin-right: 20upx;
			display: inline-block;
			vertical-align: middle;
		}
		.bottom-border>view{
			display: inline-block;
			vertical-align: middle;
		}
		.bottom-border textarea,
		.bottom-border input,
		.radio-group,.picker{
			width: 500upx;
			display: inline-block;
		}
		.picker{
			/* width: 60%; */
		}
		textarea{
			display: inline-block;
			vertical-align: top;
		}
		.txt{
			height: 100upx;
		}
</style>
