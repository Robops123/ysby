<template>
	<view>
		<view class="nav-bar">
			<view class="nav nav-left" :class="{active:active==0}" @click="toggle(0)"><text>全部</text></view>
			<view class="nav nav-right" :class="{active:active==1}" @click="toggle(1)"><text>待付款</text></view>
			<view class="nav nav-left" :class="{active:active==2}" @click="toggle(2)"><text>待发货</text></view>
			<view class="nav nav-right" :class="{active:active==3}" @click="toggle(3)"><text>待收货</text></view>
			<view class="nav nav-left" :class="{active:active==6}" @click="toggle(6)"><text>已完成</text></view>
		</view>
		
		<view class="padding search">
			<view class="select">
				<image src="../../../static/img/pic/search.png" mode="" class="search-img" ></image>
				<!-- <text class="order" @click="open">asdasd123123123123asdad</text> -->
				<input type="text" class="order" v-model="orderno" placeholder="订单号" @confirm='search'/>
				<!-- <image src="../../static/img/pic/more3.png" mode="" class="down-arrow"></image> -->
			</view>
			<view>
				<input type="text" v-model="keywords" placeholder="输入关键字" @confirm='search'/>
			</view>
		</view>
		
		<scroll-view scroll-y="true" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
			<view class="item" v-for="(item,index) in dataList" :key='index'>
				<view class=" padding" >
					<view class="top-line bottom-border">
						<view class="s1 cg">
							<view>
								<text>{{item.orderno}}</text>
								<text class="payway">微信支付</text>
							</view>
							<view>
								2020/03/30 12:30:40
							</view>
						</view>
						<text class="icon-arrow-right iconfont fr"></text>
					</view>
					
					<view class="md-line bottom-border">
						<view>
							<image :src="item.goodsPic" mode=""></image>
						</view>
						<view class="md-line-word">
							<view class="s1">
								<text class="limit-text">{{item.goodsname}}</text>
								<text class="fr cg s1">￥{{item.goodsprice}}</text>
							</view>
							<view class="s2 cg">
								<text class="limit-text">规格:<text class="s3 ">{{item.specifications}}</text></text>
								<text class="fr s1">*{{item.amount}}</text>
							</view>
						</view>
					</view>
					<view class="bottom-border">
						<view class="status-line cg s2">
							<text>订单状态</text>
							<text class="fr cr" v-if="item.status=='1'">待支付</text>
							<text class="fr cr" v-if="item.status=='2'">待发货</text>
							<text class="fr cr" v-if="item.status=='3'">待收货</text>
							<text class="fr cr" v-if="item.status=='4'">已取消</text>
							<text class="fr cr" v-if="item.status=='5'">待评论</text>
							<text class="fr cr" v-if="item.status=='6'">已完成</text>
						</view>
						<view class="status-line cg s2">
							<text>买家昵称</text>
							<text class="fr ">许愿</text>
						</view>
						<view class="status-line cg s2">
							<text>配送方式</text>
							<text class="fr cblue" v-if="item.delivery=='1'">快递</text>
							<text class="fr cblue" v-if="item.delivery=='2'">自提</text>
							<text class="fr cblue" v-if="item.delivery=='3'">其他</text>
						</view>
					</view>
					<view class="bottom-border s2 cg" style="text-align: right;padding-right: 30upx;">
						共<text class="cr">1</text>件商品 实付:<text class="cr">￥{{item.totalprice}}</text>
					</view>
					<view class="bottom-border btn-line">
						<button type="default" class="btn btn-primary">确认发货</button>
						<button type="default" class="btn btn-primary">取消发货</button>
						<button type="default" class="btn ">备注</button>
						<button type="default" class="btn " @click="toDetail(item.orderno)">查看详情</button>
					</view>
				</view>
			</view>
			<uni-load-more :status="more"></uni-load-more>
		</scroll-view>
		
		<pop ref='order' :dataList='orderList'></pop>
	</view>
</template>

<script>
	import pop from '@/components/promptOptions/pop.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		components:{
			uniLoadMore,
			pop
		},
		data(){
			return{
				uid:'',
				token:'',
				active:0,
				orderList:[
					{name:'asdasdasds'},{name:'asdasdasds'},{name:'asdasdasds'},{name:'asdasdasds'}
				],
				sh:'',
				dataList:[],
				page:1,
				pageSize:5,
				total:0,
				more:'',
				orderno:'',
				keywords:''
			}
		},
		computed: {
		     noMore () {
		       return this.dataList.length >= this.total
		     },
		   },
		   onLoad(p){
			   var that=this
			  var userInfo=uni.getStorageSync('userInfo'),that=this
			  if(p){
			  	this.active=p.active
			  }
			  if(userInfo!='' & userInfo!=null & userInfo!=undefined){
			  	this.uid=userInfo.uid
			  	this.token=userInfo.token
			  }
			  this.getList(this.page,this.orderno,this.keywords)
			   setTimeout(function(){
			   	that.$getHeight('#sv',(res) =>{
			   		that.sh=res
			   	})
			   },0)
			   
		   },
		methods:{
			choosed(m){
									 uni.$off('popChoosed')
			},
			open(){
									 var that=this
									 uni.$on('popChoosed',function(e){
										 that.choosed(e)
									 })
									 this.$refs.order.show=true
			},
			toDetail(no){
				
				uni.navigateTo({
					url:'./orderDetail?orderno='+no
				})
			},
			toggle(t){
				this.active=t
				this.reset()
				this.getList(this.page,this.orderno,this.keywords)
			},
			reset(){
				this.page=1
				this.total=0
				this.orderno=''
				this.keywords=''
				this.dataList=[]
				this.more=''
			},
			getList(p,no,k){
				var that=this
				var params={
					status:this.active,
				  page:p,
				  pagesize: this.pageSize,
				  uid:this.uid,
				  token:this.token,
				  orderno:no,
				  keywords:k
				}
				if(this.page==1){
					this.$loading()
				}
				  var url='&r=api.myshop.orders'
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
				  that.getList(that.page,this.orderno,this.keywords)
			  // },2000)
			},
			search(){
				this.page=1
				this.total=0
				this.dataList=[]
				this.more=''
				this.getList(this.page,this.orderno,this.keywords)
			}
		}
	}
</script>

<style>
	.nav-bar{
		text-align: center;
		padding-bottom: 20upx;
	}
	.nav{
		color: #afafaf;
		display: inline-block;
		width: 20%;
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
	
	
	.order{
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.search{
		background-color: #f7f7f8;
	}
	.select .order{
		display: inline-block;
		vertical-align: middle;
		width: 70%;
	}
	.select icon,
	.select text{
		display: inline-block;
		vertical-align: middle;
	}
	.search>view{
		background-color: #fff;
			width: 48%;
			padding: 10upx 0;
			margin:0 1%;
			display: inline-block;
			vertical-align: middle;
	}
	.payway{
		margin-left: 38upx;
		border-radius: 24upx;
		background-color: #ff6d7e;
		padding: 0 10upx;
		color: white;
	}
	.bottom-border{
		padding: 20upx 0;
		border-bottom: 1px solid #f7f7f7;
	}
	/* .top-line{
		
	} */
	.top-line .fr{
		margin-top: 20upx;
	}
	.top-line>view,
	.md-line>view{
		display: inline-block;
		vertical-align: top;
	}
	.md-line-word{
		width: 560upx;
	}
	.limit-text{
		display: inline-block;
		width: 400upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.md-line image{
		height: 90upx;
		width: 90upx;
		margin-right: 20upx;
	}
	.status-line{
		margin: 10upx 0;
	}
	
	.btn-line{
		text-align: right;
	}
	.btn{
		display: inline-block;
		font-size: 28upx;
		padding: 10upx 20upx;
		border-radius: 10upx;
		border: 1px solid #eee !important;
		text-align: center;
		margin-left: 15upx;
		height: initial;
		line-height: initial;
		background-color: #fff !important;
	}
	.btn-primary{
		background-color: #2CAEFF !important;
		color: #fff !important;
		border: none !important;
	}
	.item{
		border-bottom: 20upx solid #f3f3f3;
	}
</style>
