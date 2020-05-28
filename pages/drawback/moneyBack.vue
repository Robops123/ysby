<template>
	<view>
		<view class="child-overall-item padding bgwhite margin" 
		v-for='(item,index) in goods' :key='index'>
			<image :src="item.goodspic" mode=""></image>
			<view class="info">
				<view>
					<view class="s2 title">
						{{item.goodsname}}
					</view>
					<view class="s3 cg options">
						{{item.specifications ? item.specifications:'无规格'}}<icon type="" class="icon-fire iconfont"></icon>
					</view>
				</view>
			</view>
		</view>
		
		<view class="padding bgwhite">
			<view class="choice" v-if="form.type==1">
				<text>货物状态</text>
				<view class="fr">
					<picker class="picker" @change="bindPickerChange" :value="cateCurrent" :range="array">
					     <view class="uni-input">{{array[cateCurrent]}}</view>
					 </picker>
					 <!-- <text class="icon-arrow-right iconfont cg"></text> -->
				</view>
			</view>
			<view class="choice">
				<text>退款原因</text>
				<view class="fr">
					<picker class="picker" @change="bindPickerChange2" :value="cateCurrent2" :range="array2">
					     <view class="uni-input">{{array2[cateCurrent2]}}</view>
					 </picker>
					 <text class="icon-arrow-right iconfont cg"></text>
				</view>
			</view>
			<view class="choice pannel">
				<view>退款金额：￥
				<input type="number" v-model="form.price" @input='filter'/>
				</view>
				<view class="cg s3">最多￥45.00,含发货邮费￥0.00</view>
				<view v-if="form.type==1">
					<text>退款说明：</text>
					<input type="text" v-model="form.remark" placeholder="选填"/>
				</view>
			</view>
			<view class="choice" v-if="form.type==2">
				<text>退货方式</text>
				<view class="fr">
					<picker class="picker" @change="bindPickerChange3" :value="cateCurrent3" :range="array3">
					     <view class="uni-input">{{array3[cateCurrent3]}}</view>
					 </picker>
					 <text class="icon-arrow-right iconfont cg"></text>
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
							<image src="../../static/img/pic/other/camera.png" mode=""></image>
							<view class="s2 cg">上传凭证(最多5张)</view>
						</view>
					</view>
					</view>
		</view>
		
		
		<view>
			<button type="default" class="btn" @click="submit">提交</button>
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
				goods:[],
				current:1,
				cateCurrent:0,
				cateCurrent2:0,
				cateCurrent3:0,
				 array: ['待发货', '待收货', '已收货'],
				 array2: ['质量不好', '欺诈', '无理取闹', '辣鸡'],
				 array3: ['快递', '快递2'],
				imageList: [], //保存图片路径集合
				imageLength: 5, //限制图片张数
				sourceTypeIndex: 2, //添加方式限制
				sizeTypeIndex: 2, //图片尺寸限制
				// 地址
				lat:'',
				lng:'',
				pic:[],
				address:'',
				form:{
					price:'',
					uid:'',
					token:'',
					reason:'',
					orderno:'',
					goods:[],
					ways:'',
					remark:'',
					type:'',
					pics:''
				}
			}
		},
		onLoad(p){
			this.goods=JSON.parse(p.goods)
			this.form.type=p.type
			this.form.orderno=p.orderno
			var userInfo=uni.getStorageSync('userInfo'),that=this
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.form.uid=userInfo.uid
				this.form.token=userInfo.token
			}
		},
		methods:{
			to(w){
				uni.navigateTo({
					url:`/pages/drawback/afterSale`
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
					this.cateCurrent=e.detail.value
				},
				bindPickerChange2(e){
					this.cateCurrent2=e.detail.value
					this.form.reason=this.array2[this.cateCurrent2]
				},
				bindPickerChange3(e){
					this.cateCurrent3=e.detail.value
					this.form.ways=this.array3[this.cateCurrent3]
				},
				filter(event) { //过滤input密码类型只输入数字
						let i = Number(event.target.value)
						// var reg=new RegExp("^[0-9]*$")
						if(i>45) {
							setTimeout(() => {
								this.form.price=45
							},0)
						} else if(i<0){
							setTimeout(() => {
								this.form.price=0
							},0)
						}
					},
					submit(){
						var  that=this,l=this.imageList.length;
						this.$loading()
						if(l==0){
							that.submitForm()
						}else{
							this.imageList.forEach((item,index) =>{
								that.$upload(item,'',(cb) =>{
									that.pic.push(cb)
								var	t=this.pic.length
									if(l==t){
										that.submitForm()
									}
								})
							})
						}
						
					},
					submitForm(){
						var that=this
						var url='&r=api.member.order.refund'
						this.goods.forEach((item) =>{
							this.form.goods.push({
								goodsid:item.goodsid,
								amount:item.amount
							})
						})
						this.form.pics=this.pic.join(',')
						  this.$apiPost(url,this.form).then((res) =>{
								that.$msg('评价成功')
								that.pic=[]
								uni.hideLoading()
								// setTimeout(function(){
								// 	that.to()
								// },500)
						  })
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
		/* height: 64upx; */
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
		 height: 60upx;
	 }
	 .add-view>view{
		 width: 128upx;
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
