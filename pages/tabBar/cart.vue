<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view class=" manage">管理</view>
		<!-- #endif -->
		<view class="padding" style="padding-bottom: 46px;">
			
			<view class="card" v-for="(item,index) in dataList" :key='index'>
				<view class="overall">
					<checkbox-group @change="parentChange($event,item)" class="r-cb" v-if="operate">
					    <checkbox value="" :checked="item.checked" style="transform:scale(0.7)"/>
					</checkbox-group>
					<view class="">
						<icon type="" class="icon-iconfontshop-copy iconfont"></icon>
						<text class="overall-title">{{item.merchname}}</text>
						<icon type="" class="icon-arrow-right iconfont "></icon>
					</view>
				</view>
				
				<view class="child-overall" v-for="(ChildItem,ChildIndex) in item.goods" :key='ChildIndex'>
					<view class="child-overall-item"> 
						<checkbox-group @change="childChange($event,ChildItem,index,ChildIndex)" class="r-cb" v-if="operate">
						    <checkbox  :checked="ChildItem.checked"  style="transform:scale(0.7)"/>
						</checkbox-group>
						<image :src="ChildItem.thumb" mode=""></image>
						<view class="info">
							<view class="s2 title">
								{{ChildItem.title}}
							</view>
							<view class="s3 cg options">
								{{ChildItem.specs ? ChildItem.specs:'选择规格'}}<icon type="" class="icon-arrowdown-copy iconfont"></icon>
							</view>
							<view class="bottom-content">
								<text class="cr">￥{{ChildItem.marketprice}}</text>
								<view class="calculator fr">
									<view class="calc minus">-</view>
									<text>{{ChildItem.amount}}</text>
									<view class="calc plus">+</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bottom animated slideInUp" v-if="operate">
			<checkbox-group @change="AllChange" class="r-cb">
			    <checkbox value=""  style="transform:scale(0.7)"/>全选
			</checkbox-group>
			<view class="bottom-right">
				<text class="cg s1">合计:</text>
				<text class="cr" style="font-size: 34upx;">￥{{totalPrice}}</text>
				<button type="warn" class="buy-btn">去结算(2)</button>
				<text class="" style="color: #ff5b62;margin-left: 20upx;" @click="deleteCarts">删除</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		data(){
			return{
				selectedGoodsId:[],
				operate:false,
				uid:'',
				token:'',
				page:1,
				pagesize:10,
				total:0,
				more:'',
				url:'&r=api.member.cart',
				dataList:[],
				totalPrice:''
			}
		},
		components:{
			uniLoadMore
		},
		computed: {
		     noMore () {
		       return this.dataList.length >= this.total
		     },
		   },
		onShow(){
			var userInfo=uni.getStorageSync('userInfo')
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.uid=userInfo.uid
				this.token=userInfo.token
				this.getList()
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
			// 全选
			AllChange(e){
				console.log(e)
			},
			// 商店选择
			parentChange(e,item){
				var id=e.detail.value[0],that=this
				if(id==undefined){
					item.goods.forEach((item) =>{
						var index=that.selectedGoodsId.indexOf(item.goodsid)
						that.selectedGoodsId.splice(index,1)
					})
				}else{
					item.goods.forEach((item) =>{
						var index=that.selectedGoodsId.indexOf(item.goodsid)
						if(index==-1){
							that.selectedGoodsId.push(item.goodsid)
						}
						
					})
				}
				console.log(this.selectedGoodsId)
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
				this.dataList[pi].goods[ci].checked=!this.dataList[pi].goods[ci].checked
			},
			toggleOperation(){
				this.operate=!this.operate
			},
			deleteCarts(){
				
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
</style>
