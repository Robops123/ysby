<template>
	<view>
		<view class="nav-bar">
			<!-- <view class="nav nav-left" :class="{active:active==0}" @click="toggle(0)"><text>全部</text></view> -->
			<view class="nav nav-right" :class="{active:active==1}" @click="toggle(1)"><text>待付款</text></view>
			<view class="nav nav-left" :class="{active:active==2}" @click="toggle(2)"><text>待发货</text></view>
			<view class="nav nav-right" :class="{active:active==3}" @click="toggle(3)"><text>待收货</text></view>
			<view class="nav nav-left" :class="{active:active==6}" @click="toggle(6)"><text>已完成</text></view>
		</view>
		<view class="padding" >
			<scroll-view scroll-y="true" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
				<view class="card" v-for="(item,index) in dataList" :key='index' >
					
					<view v-for="(item2,index2) in item.goods" :key='index2'>
						<view class="overall">
								<view @click.stop="toShop(item2.merchid)">
									<icon type="" class="icon-iconfontshop-copy iconfont"></icon>
									<text class="overall-title">{{item2.merchname}}</text>
									<text class="icon-arrow-right iconfont"></text>
								</view>
								<text class="fr cr s2" v-show='item.status==1'>待付款</text>
								<text class="fr cr s2" v-show='item.status==2'>待发货</text>
								<text class="fr cr s2" v-show='item.status==3'>待收货</text>
								<text class="fr cr s2" v-show='item.status==6'>已完成</text>
						</view>
						<view class="child-overall" >
							<view class="child-overall-item" v-for="(childItem,childIndex) in item2.goodsdata" :key='childIndex' @click="toGoodsDetail(childItem.goodsid)"> 
								<image :src="childItem.goodspic" mode=""></image>
								<view class="info">
									<view class="s2 title">
										{{childItem.goodsname}}
									</view>
									<view class="s3 cg options ellipsis">
										{{childItem.specifications}}
										<!-- <image src="../../static/img/pic/more3.png" mode="" class="down-arrow"></image> -->
									</view>
									<view class="bottom-content">
										<text class="s3 fr">共{{childItem.amount}}件商品 合计:<text class="s1">￥{{item.totalprice}}</text></text>
									</view>
								</view>
								<view class="mount">
									<view class="s3 "><text class="s1">￥{{childItem.goodsprice}}</text></view>
									<view class="s3 cg">*{{childItem.amount}}</view>
								</view>
							</view>
						</view>
						
						<view class="btn-box">
							<button type="default" class="btn btn1" v-show='item.status!=4' @click.stop="addCollect(item2.goodsdata)">加入购物车</button>
							<button type="default" class="btn btn1" v-show='item.status==4'>删除订单</button>
							<button type="default" class="btn btn1" v-show='item.status==1' @click="cancelOrder(item.orderno,index)">取消订单</button>
							<button type="default" class="btn btn2" v-show='item.status==1' @click="topay(item)">去付款</button>
							<button type="default" class="btn btn2" v-show='item.status!=1' @click="toDrawback(item)">申请退款</button>
							<button type="default" class="btn btn2" v-show='item.status==2'>联系卖家</button>
							<button type="default" class="btn btn2" v-show='item.status==3' @click="confirmReceive(item.orderno)">确认收货</button>
						</view>
					</view>
					
					
				</view>
				<uni-load-more :status="more"></uni-load-more>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		components:{
			uniLoadMore
		},
		data(){
			return{
				uid:'',
				token:'',
				active:1,
				cartList:[
					{
						
					}
				],
				sh:'',
				dataList:[],
				page:1,
				pageSize:8,
				total:0,
				more:''
			}
		},
		onLoad(p){
			var that=this
			var userInfo=uni.getStorageSync('userInfo'),that=this
			if(p.active!=0){
				this.active=p.active
			}
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.uid=userInfo.uid
				this.token=userInfo.token
			}
			this.getList(this.page)
			setTimeout(function(){
				that.$getHeight('#sv',(res) =>{
					that.sh=res
				})
			},0)
			uni.$on('updateOrder',() =>{
				this.reset()
				this.getList(this.page)
			})
		},
		computed: {
		     noMore () {
		       return this.dataList.length >= this.total
		     },
		   },
		methods:{
			toDetail(){
				uni.navigateTo({
					url:'./myOrderDetail'
				})
			},
			toShop(id){
				uni.navigateTo({
					url:`/pages/bussiness/shopPreview?id=${id}`
				})
			},
			toGoodsDetail(id){
				uni.navigateTo({
					url:`/pages/index/goodsDetail?id=${id}`
				})
			},
			topay(item){
				uni.navigateTo({
					url:`/pages/index/cashier?orderId=${item.orderno}&money=${item.totalprice}`
				})
			},
			toDrawback(item){
				var goods=[]
				item.goods.forEach((item1) =>{
					item1.goodsdata.forEach((item2) =>{
						goods.push(item2)
					})
				})
				uni.navigateTo({
					url:`/pages/drawback/chooseWay?goods=${JSON.stringify(goods)}&orderno=${item.orderno}`
				})
			},
			toggle(t){
				this.active=t
				this.reset()
				this.getList(this.page)
			},
			reset(){
				this.page=1
				this.total=0
				this.dataList=[]
				this.more=''
			},
			getList(p){
				var that=this
				var params={
				  page:p,
				  pagesize: this.pageSize,
				  uid:this.uid,
				  token:this.token,
				  status:this.active
				}
				if(this.page==1){
					this.$loading()
				}
				  var url='&r=api.member.order'
				  this.$apiPost(url,params).then((res) =>{
					  that.total=res.total
					  that.dataList=that.dataList.concat(res.data)
					  that.more=''
					  if(that.page==1){
					  	uni.hideLoading()
					  }
				  })
			},
			toBottom(){
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
			addCollect(item){
				var that=this,ids=[]
				item.forEach((items) =>{
					ids.push(items.goodsid)
				})
				var params={
				  uid:this.uid,
				  token: this.token,
					goodsid:ids.join(',')
				}
				  var url='&r=api.member.cart.add'
				  this.$apiPost(url,params).then((res) =>{
						// that.options[2].info++
										that.$msg('添加成功')
				  })
			},
			cancelOrder(order,from){
				var that=this
				var params={
				  uid:this.uid,
				  token: this.token,
					orderno:order
				}
				  var url='&r=api.member.order.cancel'
				  this.$apiPost(url,params).then((res) =>{
					  this.$msg('取消成功')
						// that.options[2].info++
						that.dataList.splice(from,1)
				  })
			},
			confirmReceive(order){
				var that=this
				var params={
				  uid:this.uid,
				  token: this.token,
					orderno:order
				}
				  var url='&r=api.member.order.receive'
				  this.$apiPost(url,params).then((res) =>{
					  this.$msg('确认收货成功')
					  this.reset()
					  this.getList(this.page)
						// that.options[2].info++
				  })
			}
		}
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
	.nav-bar{
		text-align: center;
		padding: 20upx 0;
		background-color: white;
	}
	.nav{
		color: #afafaf;
		display: inline-block;
		width: 25%;
		box-sizing: border-box;
	}
	.nav.active text{
		color: #000000;
		position: relative;
	}
	.nav.active text::before{
		content: '';
		position: absolute;
		bottom: -10upx;
		width: 50upx;
		background-color: #ff7379;
		height: 2px;
		left: 50%;
		margin-left: -25upx;
	}
	
	.card{
		background-color: #fff;
		border-radius: 18upx;
		margin: 20upx 0;
		/* border-top: 20upx solid #; */
	}
	.child-overall,.overall{
		padding: 20upx 15upx 0 15upx;
	}
	.child-overall:last-child{
		padding-bottom: 40upx;
	}
	.child-overall-item,
	.overall{
		display: flex;
		justify-items: center;
	}
	.overall{
		padding-right: 20upx;
	align-items: center;	
	justify-content: space-between;
	}
	.child-overall-item>image{
		width: 200upx;
		height: 200upx;
		margin-right: 20upx;
		border-radius: 17upx;
	}
	.child-overall-item{
		margin-bottom: 20upx;
	}
	.child-overall-item .info{
		width: 320upx;
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
	.options{
		background-color:#f9f9f9;
		display: inline-block;
		padding: 5upx 16upx;
		border-radius: 24upx;
		margin-top: 15upx;
	}
	.mount{
		flex: 1;
		margin-left: 15upx;
		text-align: right;
		padding-top: 20upx;
	}
	.btn-box{
		text-align: right;
		padding-right: 25upx;
		padding-bottom: 20upx;
		margin: 35upx 0 15upx;
	}
	.btn{
		width: 28%;
		height: 75upx;
		border-radius: 75upx;
		text-align: center;
		line-height: 75upx;
		color: white;
		font-size: 28upx;
		padding: 0 !important;
		display: inline-block;
		background-color: white;
		margin-left: 15upx;
	}
	.btn1{
		border: 1px solid #dfdfdf !important;
		color: #7f7f7f !important;
	}
	.btn2{
		border: 1px solid #ffadb1 !important;
		color: #ff6f75 !important;
	}
	.bottom-content{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		white-space: nowrap;
	}
	
	.overall-title{
		margin: 0 10upx;
	}
	
	.bottom{
		position: fixed;
		left: 0;
		bottom: 50px;
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
	}
</style>
