<template>
	<view>
		<view class="nav-bar">
			<view class="nav nav-left" :class="{active:active==3}" @click="toggle(3)"><text>出售中</text></view>
			<view class="nav nav-right" :class="{active:active==4}" @click="toggle(4)"><text>已售罄</text></view>
			<view class="nav nav-left" :class="{active:active==5}" @click="toggle(5)"><text>仓库中</text></view>
			<view class="nav nav-right" :class="{active:active==6}" @click="toggle(6)"><text>回收站</text></view>
		</view>
		
		<view class="padding search">
			<!-- <view class="select">
				<icon type="search" size="20"/>
				<text class="order" @click="open">asdasd123123123123asdad</text>
				<icon type="search" class="fr" size="20"/>
			</view> -->
			<view>
				<icon type="search" size="20" style="float: left;"/>
				<input type="text" v-model="keywords" placeholder="输入关键字" @confirm='search'/>
			</view>
		</view>
		
		<scroll-view scroll-y="true" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
			<view class="item" v-for="(item,index) in dataList" :key='index'>
				<view class=" padding" >
					<view class="md-line bottom-border">
						<view>
							<image :src="item.thumb" mode=""></image>
						</view>
						<view class="md-line-word">
							<view class="s1">
								<text class="limit-text">{{item.title}}</text>
							</view>
							<view class=" cr s1">￥{{item.marketprice}}</view>
							<view class="s2 cg bottom">
								<text class="">库存:{{item.total}}</text>
								<text class="">销量:{{item.salesreal}}</text>
								<image src="../../../static/img/pic/dots.png" mode="" class="dots-img" @click="toEdit(item.id)"></image>
							</view>
						</view>
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
			pop,
			uniLoadMore
		},
		data(){
			return{
				uid:'',
				token:'',
				keywords:'',
				active:3,
				orderList:[
					{name:'asdasdasds'},{name:'asdasdasds'},{name:'asdasdasds'},{name:'asdasdasds'}
				],
				sh:'',
				dataList:[],
				page:1,
				pageSize:10,
				total:0,
				more:''
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
			toEdit(id){
				uni.navigateTo({
					url:'./editGoods?goodsid='+id
				})
			},
			toggle(t){
				this.active=t
				this.reset()
				this.getList(this.page)
			},
			reset(){
				this.page=1
				this.keywords=''
				this.total=0
				this.dataList=[]
				this.more=''
			},
			search(){
				this.page=1
				this.total=0
				this.dataList=[]
				this.more=''
				this.getList(this.page)
			},
			getList(p){
				var that=this
				var params={
				  page:p,
				  pagesize: this.pageSize,
				  uid:this.uid,
				  token:this.token,
				  keywords:this.keywords,
				  goodsstatus:this.active
				}
				if(this.page==1){
					this.$loading()
				}
				  var url='&r=api.myshop.goods'
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
	
	
	.order{
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.search{
		background-color: #f7f7f8;
	}
	.select text{
		width: 70%;
	}
	.select icon,
	.select text{
		display: inline-block;
		vertical-align: middle;
	}
	.search>view{
		background-color: #fff;
			width: 98%;
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
		width: 520upx;
	}
	.limit-text{
		display: inline-block;
		width: 400upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.md-line image{
		height: 120upx;
		width: 120upx;
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
		border: 1px solid #eee;
		text-align: center;
		margin-left: 15upx;
		height: initial;
		line-height: initial;
		background-color: #fff !important;
	}
	.btn-primary{
		background-color: #2CAEFF;
		color: #fff;
		border: none;
	}
	.item{
		border-bottom: 20upx solid #f3f3f3;
	}
	.bottom{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.bottom image{
		width: 30upx;
		height: 20upx;
		margin-top: 8upx;
	}
</style>
