<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view class=" manage" @click="toggleOperation">{{operate ? '完成':'管理'}}</view>
		<!-- #endif -->
		<view class="padding" style="padding-bottom: 46px;">
			
			<view class="card" v-for="(item,index) in dataList" :key='index' v-if="logined && item.goods && item.goods.length>0">
				<view class="overall">
					<checkbox-group @change="parentChange($event,item,index)" class="r-cb" v-show="operate">
					    <checkbox value="" :checked="item.checked" style="transform:scale(0.7)"/>
					</checkbox-group>
					<view class="" @click="toShop(item.merchid)">
						<icon type="" class="icon-iconfontshop-copy iconfont"></icon>
						<text class="overall-title">{{item.merchname}}</text>
						<icon type="" class="icon-arrow-right iconfont "></icon>
					</view>
				</view>
				
				<view class="child-overall" v-for="(ChildItem,ChildIndex) in item.goods" :key='ChildIndex'>
					<view class="child-overall-item"> 
						<checkbox-group @change="childChange($event,ChildItem,index,ChildIndex)" class="r-cb" v-show="operate">
						    <checkbox  :checked="ChildItem.checked==true"  style="transform:scale(0.7)"/>
						</checkbox-group>
						<image :src="ChildItem.thumb" mode=""></image>
						<view class="info">
							<view class="s2 title">
								{{ChildItem.title}}
							</view>
							<view class="s3 cg options" @click="getCategory(ChildItem,index,ChildIndex)">
								{{ChildItem.specifications ? ChildItem.specifications:'选择规格'}}<icon type="" class="icon-arrowdown-copy iconfont"></icon>
							</view>
							<view class="bottom-content">
								<text class="cr">￥{{ChildItem.marketprice}}</text>
								<view class="calculator fr">
									<view class="calc minus" :class="{disabled:ChildItem.disabled1}" @click="minus(index,ChildIndex)">-</view>
									<text>{{ChildItem.amount}}</text>
									<view class="calc plus" :class="{disabled:ChildItem.disabled2}" @click="plus(index,ChildIndex)">+</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view style="text-align: center;" v-if="!logined">----还没登录哦----</view>
		</view>
		
		<view class="bottom animated slideInUp" v-show="operate">
			<checkbox-group @change="AllChange" class="r-cb">
			    <checkbox style="transform:scale(0.7)" :checked="chooseAll"/>全选
			</checkbox-group>
			<view class="bottom-right">
				<text class="cg s1">合计:</text>
				<text class="cr" style="font-size: 34upx;">￥{{result.totalPrice}}</text>
				<button type="warn" class="buy-btn" @click="getChecked">去结算({{result.totalAmount}})</button>
				<text class="" style="color: #ff5b62;margin-left: 20upx;" @click="deleteCarts">删除</text>
			</view>
		</view>
		
		
		<sku ref='sku' @completeSpecChoose='completeSpecChoose' :defaultImg='defaultImg' @closeSku='closeSku'
		:category='category' :total='totalStock' v-if="receivedCategory" :goodsid='choosedId'></sku>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import sku from '@/components/sku/pages/sku.vue'
	export default{
		data(){
			return{
				logined:false,
				selectedGoodsId:[],
				operate:false,
				uid:'',
				token:'',
				page:1,
				pagesize:50,
				total:0,
				more:'',
				url:'&r=api.member.cart',
				dataList:[],
				chooseAll:false,
				// 规格列表
				category:[],
				choosedPi:'',
				choosedCi:'',
				choosedId:'',
				defaultImg:'',
				totalStock:0,
				receivedCategory:false,
				choosedSpec:{}
				// totalPrice:''
			}
		},
		components:{
			uniLoadMore,
			sku
		},
		// watch:{
		// 	dataList:{
		// 		handler: function (val, oldVal) {
		// 			console.log(val)
		// 		},
		// 		deep:true
		// 	}
		// },
		computed: {
		     noMore () {
		       return this.dataList.length >= this.total
		     },
			 result(){
				 var result={totalPrice:0,totalAmount:0}
				 this.dataList.forEach((item) =>{
					 if(item.goods && item.goods.length>0){
						 item.goods.forEach((item2) =>{
						 	if(item2.checked){
						 		result.totalPrice+=item2.amount * item2.marketprice
						 		result.totalAmount++
						 	}
						 })
					 }
				 })
				 return result
			 },
		   },
		onShow(){
			var userInfo=uni.getStorageSync('userInfo')
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.logined=true
				this.uid=userInfo.uid
				this.token=userInfo.token
				this.getList()
			}else{
				this.uid=''
				this.token=''
				this.logined=false
			}
		},
		onReachBottom(){
			if(this.noMore){
								this.more='noMore'
								return;
							}
							var that=this
							this.more='loading'
			// setTimeout(function(){
							  that.page++
							  that.getList(that.page)
			// },2000)
		},
		onNavigationBarButtonTap(){
			this.toggleOperation()
		},
		mounted(){
			
		},
		methods:{
			toShop(id){
				uni.navigateTo({
					url:`/pages/bussiness/shopPreview?id=${id}`
				})
			},
			// 全选
			AllChange(e){
				if(e.detail.value[0]!=undefined){
					this.chooseAll=true
					this.dataList.forEach((item) =>{
						item.checked=true
						item.goods.forEach((item2) =>{
							item2.checked=true
						})
					})
				}else{
					this.chooseAll=false
					this.dataList.forEach((item) =>{
						item.checked=false
						item.goods.forEach((item2) =>{
							item2.checked=false
						})
					})
				}
				this.dataList.splice(0,0)
				this.$forceUpdate()
			},
			// 商店选择
			parentChange(e,t,i){
				// var id=e.detail.value[0],that=this
				// if(id==undefined){
				// 	item.goods.forEach((item) =>{
				// 		var index=that.selectedGoodsId.indexOf(item.goodsid)
				// 		that.selectedGoodsId.splice(index,1)
				// 	})
				// }else{
				// 	item.goods.forEach((item) =>{
				// 		var index=that.selectedGoodsId.indexOf(item.goodsid)
				// 		if(index==-1){
				// 			that.selectedGoodsId.push(item.goodsid)
				// 		}
						
				// 	})
				// }
				// console.log(this.selectedGoodsId)
				if(e.detail.value[0]!=undefined){
					this.dataList[i].checked=true
					this.dataList[i].goods.forEach((item) =>{
						// if(item.hasSpec){
							item.checked=true
						// }
					})
				}else{
					this.chooseAll=false
					this.dataList[i].checked=false
					this.dataList[i].goods.forEach((item) =>{
						item.checked=false
					})
				}
				this.dataList.splice(0,0)
				this.$forceUpdate()
			},
			// 商品选择
			childChange(e,t,pi,ci){
				// var id=e.detail.value[0],index=this.selectedGoodsId.indexOf(item.goodsid)
				// if(id==undefined){
				// 		this.selectedGoodsId.splice(index,1)
				// }else{
				// 	if(index)
				// 	this.selectedGoodsId.push(id)
				// }
				if(e.detail.value[0]!=undefined){
					this.dataList[pi].goods[ci].checked=true
				}else{
					this.chooseAll=false
					this.dataList[pi].goods[ci].checked=false
				}
				var fl=this.dataList[pi].goods.filter((item) =>{return item.checked}).length
				if(fl==this.dataList[pi].goods.length){
					this.dataList[pi].checked=true
				}else{
					this.dataList[pi].checked=false
				}
				this.dataList.splice(0,0)
				this.$forceUpdate()
			},
			toggleOperation(){
				var ce=this.$operateInterceptor(this.logined)
				if(!ce){
					return ;
				}
				this.operate=!this.operate
			},
			// 改规格
			getCategory(item,pi,ci){
					  var that=this
				that.choosedPi=pi
				that.choosedCi=ci
							  var url='&r=api.goods.detail.sku&goodsid='+item.goodsid
							    this.$apiPost(url).then((res) =>{
									if(res.data!=''){
										that.category=res.data
										that.totalStock=res.stock
										that.choosedId=item.goodsid
										that.defaultImg=item.thumb
										that.receivedCategory=true
										that.$nextTick(function(){
											setTimeout(function(){
												that.$refs.sku.specClass='show'
												uni.$on('closeSku',function(){
													that.receivedCategory=false
												})
											},0)
										})
									}else{
										that.$msg('此商品无其他规格可选')
									}
							  		
							    })
			},
			closeSku(){
				// console.log('s')
				// this.receivedCategory=false
			},
			completeSpecChoose(e){
							  // this.choosedSpec=e
							  this.receivedCategory=false
				this.dataList[this.choosedPi].goods[this.choosedCi].specifications=e.selectArr
				this.dataList[this.choosedPi].goods[this.choosedCi].skuidsort=e.choosedid.join(',')
				this.dataList[this.choosedPi].goods[this.choosedCi].marketprice=e.marketPrice
				this.dataList[this.choosedPi].goods[this.choosedCi].amount=e.selectNum
				this.dataList[this.choosedPi].goods[this.choosedCi].stock=e.stock
				this.$forceUpdate()
			},
			minus(pi,ci){
				var item=this.dataList[pi].goods[ci]
				if(item.amount<=1){
					this.dataList[pi].goods[ci].disabled1=true
				}else{
					this.dataList[pi].goods[ci].amount--
					this.dataList[pi].goods[ci].disabled2=false
					this.dataList[pi].goods[ci].disabled1=false
				}
				this.$forceUpdate()
			},
			plus(pi,ci){
				var item=this.dataList[pi].goods[ci]
				if(item.amount>=item.stock){
					this.dataList[pi].goods[ci].disabled2=true
				}else{
					this.dataList[pi].goods[ci].amount++
					this.dataList[pi].goods[ci].disabled1=false
					this.dataList[pi].goods[ci].disabled2=false
				}
				this.$forceUpdate()
			},
			// 删除购物车
			deleteCarts(){
				var that=this
				that.selectedGoodsId=[]
				this.dataList.forEach((item) =>{
					item.goods.forEach((item2) =>{
						if(item2.checked){
							that.selectedGoodsId.push(item2.goodsid)
						}
					})
				})
				if(this.selectedGoodsId==''){
					return ;
				}
				var params={
					uid:this.uid,
					token:this.token,
					goodsid:this.selectedGoodsId.join(',')
				}
				var url='&r=api.member.cart.remove'
				  this.$apiPost(url,params).then((res) =>{
					  that.$msg('移除成功')
					  setTimeout(function(){
						  that.getList()
					  },0)
				  })
			},
			getList(){
				var that=this
				var params={
					uid:this.uid,
					token:this.token,
					page:this.page,
					pagesize:this.pagesize,
				}
				  this.$apiPost(this.url,params).then((res) =>{
					  that.total=res.data.length
					that.dataList=res.data	
				  })
			},
			getChecked(){
				var that=this
				var selectedGoods=[]
				console.log(this.dataList)
				try{
					this.dataList.forEach((item) =>{
						if(item.goods && item.goods.length>0){
							item.goods.forEach((item2) =>{
								console.log(item2)
								if(item2.checked){
									console.log(item2.checked)
									if(!item2.skuidsort){
										throw new Error('specError')
									}
									selectedGoods.push(item2)
								}
							})
						}
						
					})
				}catch(e){
					this.$msg('请选择规格')
					return ;
				}
				if(selectedGoods.length==0){
					this.$msg('请选择要购买的商品')
					return ;
				}
				uni.navigateTo({
					url:'../index/createCartOrder?selectedGoods='+JSON.stringify(selectedGoods)+'&type=1'
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
	
	.card{
		background-color: #fff;
		border-radius: 18upx;
		margin: 0 0 20upx;
		/* border-top: 20upx solid #; */
	}
	.child-overall,.overall{
		padding: 20upx 0 0 15upx;
	}
	.child-overall:last-child{
		padding-bottom: 40upx;
	}
	.child-overall-item,
	.overall{
		display: flex;
		justify-items: center;
	}
	.child-overall-item>image{
		width: 200upx;
		height: 200upx;
		margin-right: 20upx;
		border-radius: 17upx;
	}
	.child-overall-item .title{
		width: 360upx;
		/* height: 64upx; */
		overflow:hidden;//一定要写
		    text-overflow: ellipsis;//超出省略号
		    display:-webkit-box;//一定要写
		    -webkit-line-clamp: 2;//控制行数
		    -webkit-box-orient: vertical;//一定要写
	}
	.calculator text{
		display: inline-block;
		vertical-align: middle;
	}
	.calculator .calc{
		display: inline-block;
		vertical-align: middle;
		width: 40upx;
		height: 40upx;
		margin: 0 20upx;
		font-size: 36upx;
		line-height: 40upx;
		text-align: center;
		border-radius: 50%;
		border: 1px solid #e8e8e8;
	}
	.info{
		position: relative;
	}
	.bottom-content{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	.options{
		background-color:#f9f9f9;
		display: inline-block;
		padding: 5upx 16upx;
		border-radius: 24upx;
		margin-top: 15upx;
	}
	.overall-title{
		margin: 0 10upx;
	}
	
	.bottom{
		position: fixed;
		left: 0;
		bottom: 0;
		/* #ifdef H5 */
		bottom: 50px;
		/* #endif */
		
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:20upx 40upx;
		background-color: #fff;
		border: 1px solid #f1f1f1;
	}
	.bottom-right button{
		margin-left: 15upx;
	}
	.bottom-right button,
	.bottom-right text{
		display: inline-block;
		vertical-align: middle;
	}
	.bottom-right{
		flex: 1;
		text-align: right;
	}
	.arrow{
		color: #ccc;
	}
	.r-cb{
		display: flex;
		align-items: center;
	}
	
	.manage{
		text-align: right;
		padding: 20upx ;
		box-sizing: border-box;
		background-color: #fff;
	}
	.buy-btn{
		background-color: #ff5b62;
		line-height: 1;
		padding: 20upx ;
		font-size: 32upx;
	}
	.disabled{
		border-color: #f4f4f4;
		background-color: #f4f4f4;
	}
</style>
