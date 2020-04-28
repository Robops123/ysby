<template>
	<view class="productDetail">
		<view class="popup" catchtouchmove="true" :class="specClass" @touchmove.stop.prevent="moveHandle">
			<view class="mask" @tap="closeSf"></view>
			<view class="layer attr-content">
				<view class="specification-wrapper">
					<scroll-view class="specification-wrapper-content" scroll-y="true">
						<view class="specification-header">
							<view class="specification-left"><image class="product-img"></image></view>
							<view class="specification-right">
								<view class="price-content">
									<text class="sign">¥</text>
									<text class="price">{{ marketPrice*selectNum || 0 }}</text>
								</view>
								<view class="inventory">库存:{{ stock || 0 }}</view>
								<view class="choose">已选:{{ selectArr.join(',') }}</view>
							</view>
						</view>
						<view class="specification-content">
							<view class="specification-item" v-for="(item, index1) in categorys" :key="index1">
								<view class="item-title">{{ item.title }}</view>
								<view class="item-wrapper">
									<view
										class="item-content"
										@click="skuClick(item_value, index1, index2)"
										v-for="(item_value, index2) in item.item"
										:key="index2"
										:class="{actived:item_value.choosed==true}"
									>
										{{ item_value.itemtitle }}
									</view>
								</view>
							</view>
							<view class="specification-item">
								<view class="item-title">数量</view>
								<view class="item-wrapper">
									<stepper size="small" :min="1" :max="stock" v-if="stock" :defaultValue="selectNum"  @change="changeNum"></stepper>
								</view>
							</view>
						</view>
					</scroll-view>
					<view class="close" @tap="closeSf"><image class="close-item" src="../static/close.png"></image></view>
				</view>
				<view class="btn-wrapper"><button class="sure" :class="{disabedbtn:stock==0 || stock==null || marketPrice==0}"
				 @click="confirmChoose" :disabled="stock==0 || stock==null || marketPrice==0">确定</button></view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import stepper from '../components/other/stepper.vue';
	// import products from '../json/product.json';
	// import skuList from '../json/skuList.json';
	// import specList from '../json/specList.json';
	export default{
		props:['category','total','goodsid'],
		components:{
			stepper
		},
		data() {
			return {
				// product: products.product,
				// showSet: false,
				// specifications: specList.specifications, //spu规格列表
				// difference: skuList.difference, //sku列表
				// shopItemInfo: {}, //存放要和选中的值进行匹配的数据
				// subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
				// selectshop: {}, //存放最后选中的商品
				
				specClass: 'none',
				selectArr: [], //存放被选中的值
				selectNum: 1 ,//选中数量,
				// 
				categorys:'',
				choosedid:[],
				marketPrice:'',
				stock:''
			};
		},
		// computed: {
		// 	canCount() {
		// 		return this.subIndex.some(item => item === -1);
		// 	}
		// },
		mounted() {
			this.categorys=this.category
			this.stock=Number(this.total)
			// this.specifications.map(item => {
			// 	this.selectArr.push('');
			// 	this.subIndex.push(-1);
			// });
			// this.checkItem(); //计算sku里面规格形成路径
			// this.checkInpath(-1); //传-1是为了不跳过循环
			// this.getData(1);
		},
		methods: {
			skuClick(value, index1, index2) {
				var that=this
				this.selectNum=1
				this.categorys[index1].item.map((item,index) =>{
					if(index==index2){
						return item.choosed=!item.choosed
					}else{
						return item.choosed=false
					}
				})
				this.choosedid=[],this.selectArr=[]
				this.$forceUpdate()
				this.categorys.forEach((item,index) =>{
					item.item.forEach((item2,index2) =>{
						if(item2.choosed){
							that.choosedid.push(item2.itemid)
							that.selectArr.push(item2.itemtitle)
						}
					})
				})
				this.getActualRest()
				// if (value.ishow) {
				// 	if (this.selectArr[index1] != value.name) {
				// 		this.$set(this.selectArr, index1, value.name);
				// 		this.$set(this.subIndex, index1, index2);
				// 	} else {
				// 		this.$set(this.selectArr, index1, '');
				// 		this.$set(this.subIndex, index1, -1);
				// 	}
				// 	this.checkInpath(index1);
				// 	//如果全部选完
				// 	if (this.selectArr.every(item => item != '')) {
				// 		this.selectshop = this.shopItemInfo[this.selectArr];
				// 		this.selectNum = 1;
				// 	}
				// }
			},
			getActualRest(){
				var that=this
				var url='&r=api.goods.detail.skustock&goodsid='+this.goodsid+'&specitemid='+this.choosedid.join(',')
				  this.$apiPost(url).then((res) =>{
					  that.marketPrice=res.data.marketprice
					  that.stock=Number(res.data.stock)
				  })
			},
			checkInpath(clickIndex) {
				// console.time('筛选可选路径需要的时间是');
				//循环所有属性判断哪些属性可选
				//当前选中的兄弟节点和已选中属性不需要循环
		
				for (let i = 0, len = this.specifications.length; i < len; i++) {
					if (i == clickIndex) {
						continue;
					}
					let len2 = this.specifications[i].item.length;
					for (let j = 0; j < len2; j++) {
						if (this.subIndex[i] != -1 && j == this.subIndex[i]) {
							continue;
						}
						let choosed_copy = [...this.selectArr];
						this.$set(choosed_copy, i, this.specifications[i].item[j].name);
						let choosed_copy2 = choosed_copy.filter(item => item !== '' && typeof item !== 'undefined');
						if (this.shopItemInfo.hasOwnProperty(choosed_copy2)) {
							this.$set(this.specifications[i].item[j], 'ishow', true);
						} else {
							this.$set(this.specifications[i].item[j], 'ishow', false);
						}
					}
				}
				// console.log(this.specifications)
				// console.timeEnd('筛选可选路径需要的时间是');
			},
			checkItem() {
				// console.time('计算有多小种可选路径需要的时间是');
				//计算有多小种可选路径
				let result = this.difference.reduce(
					(arrs, items) => {
						return arrs.concat(
							items.difference.reduce(
								(arr, item) => {
									return arr.concat(
										arr.map(item2 => {
											//利用对象属性的唯一性实现二维数组去重
											if (!this.shopItemInfo.hasOwnProperty([...item2, item])) {
												this.shopItemInfo[[...item2, item]] = items;
											}
											return [...item2, item];
										})
									);
								},
								[[]]
							)
						);
					},
					[[]]
				);
				// console.timeEnd('计算有多小种可选路径需要的时间是');
			},
			getData(spuid) {
				Promise.all([
					uni.request({
						url: 'https://www.easy-mock.com/mock/5d351e87b5e1f213739d6498/shop/productDetail',
						method: 'POST',
						data: {
							spuid: spuid
						}
					}),
					uni.request({
						url: 'https://www.easy-mock.com/mock/5d351e87b5e1f213739d6498/shop/getspec',
						method: 'POST',
						data: {
							spuid: spuid
						}
					}),
					uni.request({
						url: 'https://www.easy-mock.com/mock/5d351e87b5e1f213739d6498/shop/getsku',
						method: 'POST',
						data: {
							spuid: spuid
						}
					})
				])
					.then(result => {
						let [[err1, product], [err2, speclist], [err3, skulist]] = result;
						if (product.data.status === 1) {
							this.product = product.data.product;
						}
						if (speclist.data.status === 1) {
							this.specifications = speclist.data.specifications;
							this.specifications.map(item => {
								this.selectArr.push('');
								this.subIndex.push(-1);
							});
						}
						if (skulist.data.status === 1) {
							this.difference = skulist.data.difference;
							this.checkItem(); //计算sku里面规格形成路径
							this.checkInpath(-1); //传-1是为了不跳过循环
						}
					})
					.catch(e => console.log(e));
			},
			//规格弹窗开关
			toggleSpec() {
				this.specClass = 'show';
			},
			moveHandle() {
				//禁止父元素滑动
			},
			closeSf() {
				this.specClass = 'hide';
				setTimeout(() => {
					this.specClass = 'none';
				}, 250);
			},
			changeNum(val) {
				this.selectNum = parseInt(val);
			},
			confirmChoose(){
				var d={
					selectArr:this.selectArr.join(','),
					selectNum:this.selectNum,
					choosedid:this.choosedid,
					marketPrice:this.marketPrice
				}
				this.$emit('completeSpecChoose',d)
				this.specClass = 'hide';
				setTimeout(() => {
					this.specClass = 'none';
				}, 250);
			}
		}
	}
</script>

<style lang="less">
	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		overflow: hidden;
	
		&.show {
			display: block;
	
			.mask {
				animation: showPopup 0.2s linear both;
			}
	
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
	
		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}
	
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
	
		&.none {
			display: none;
		}
	
		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.3);
		}
	
		.layer {
			display: flex;
			width: 100%;
			// height: 1014rpx;
			flex-direction: column;
			// min-height: 40vh;
			// max-height: 1014rpx;
			position: fixed;
			z-index: 99;
			bottom: 0;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
	
			.specification-wrapper {
				width: 100%;
				padding: 30rpx 25rpx;
				box-sizing: border-box;
				.specification-wrapper-content {
					width: 100%;
					max-height: 900rpx;
					min-height: 600rpx;
					&::-webkit-scrollbar {
						/*隐藏滚轮*/
						display: none;
					}
	
					.specification-header {
						width: 100%;
						display: flex;
						flex-direction: row;
						position: relative;
						margin-bottom: 40rpx;
	
						.specification-left {
							width: 180rpx;
							height: 180rpx;
							flex: 0 0 180rpx;
	
							.product-img {
								width: 180rpx;
								height: 180rpx;
								background-color: #999999;
							}
						}
	
						.specification-right {
							flex: 1;
							padding: 0 35rpx 0 28rpx;
							box-sizing: border-box;
							display: flex;
							flex-direction: column;
							justify-content: flex-end;
							font-weight: 500;
							text-align: left;
							.price-content {
								color: #fe3a3a;
								margin-bottom: 20rpx;
	
								.sign {
									font-size: 28rpx;
								}
	
								.price {
									font-size: 48rpx;
								}
							}
	
							.inventory {
								font-size: 24rpx;
								color: #999999;
								margin-bottom: 14rpx;
							}
	
							.choose {
								font-size: 28rpx;
								color: #333333;
							}
						}
					}
	
					.specification-content {
						font-weight: 500;
	
						.specification-item {
							margin-bottom: 40rpx;
	
							&:last-child {
								margin-bottom: 0;
							}
	
							.item-title {
								margin-bottom: 20rpx;
								font-size: 28rpx;
								text-align: left;
								color: #999999;
							}
	
							.item-wrapper {
								display: flex;
								flex-direction: row;
								flex-flow: wrap;
	
								.item-content {
									border-radius: 58rpx;
									display: inline-block;
									padding: 15rpx 35rpx;
									background-color: #ffffff;
									color: #333333;
									font-size: 28rpx;
									margin-right: 20rpx;
									border: 2rpx solid #f4f4f4;
									box-sizing: border-box;
	
									&.actived {
										border-color: #fe3a3a;
										color: #fe3a3a;
									}
	
									&.noactived {
										background-color: #f4f4f4;
										border-color: #f4f4f4;
									}
								}
							}
						}
					}
				}
				.close {
					position: absolute;
					top: 30rpx;
					right: 25rpx;
					width: 50rpx;
					height: 50rpx;
					text-align: center;
					line-height: 50rpx;
					.close-item {
						width: 50rpx;
						height: 50rpx;
					}
				}
			}
	
			.btn-wrapper {
				display: flex;
				width: 100%;
				height: 120rpx;
				flex: 0 0 120rpx;
				align-items: center;
				justify-content: space-between;
				padding: 0 26rpx;
				box-sizing: border-box;
	
				.layer-btn {
					width: 335rpx;
					height: 76rpx;
					border-radius: 38rpx;
					color: #fff;
					line-height: 76rpx;
					text-align: center;
					font-weight: 500;
					font-size: 28rpx;
	
					&.add-cart {
						background: #ffbe46;
					}
	
					&.buy {
						background: #fe3a3a;
					}
				}
				.sure {
					width: 698rpx;
					height: 76rpx;
					border-radius: 38rpx;
					color: #fff;
					line-height: 76rpx;
					text-align: center;
					font-weight: 500;
					font-size: 28rpx;
					background: #fe3a3a;
				}
			}
		}
		.disabedbtn{
			background-color: #CED0D2 !important;
		}
		
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
	
			100% {
				opacity: 1;
			}
		}
	
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
	
			100% {
				opacity: 0;
			}
		}
	
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
	
			100% {
				transform: translateY(0%);
			}
		}
	
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
	
			100% {
				transform: translateY(120%);
			}
		}
	}
</style>
