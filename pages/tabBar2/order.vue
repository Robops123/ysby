<template>
	<view>
		<view class="nav-bar">
			<view class="nav nav-left" :class="{active:active==1}" @click="toggle(1)"><text>全部</text></view>
			<view class="nav nav-right" :class="{active:active==2}" @click="toggle(2)"><text>待付款</text></view>
			<view class="nav nav-left" :class="{active:active==3}" @click="toggle(3)"><text>待发货</text></view>
			<view class="nav nav-right" :class="{active:active==4}" @click="toggle(4)"><text>待收货</text></view>
			<view class="nav nav-left" :class="{active:active==5}" @click="toggle(5)"><text>已完成</text></view>
		</view>
		
		<view class="padding search">
			<view class="select">
				<image src="../../static/img/pic/search.png" mode="" class="search-img"></image>
				<text class="order" @click="open">asdasd123123123123asdad</text>
				<image src="../../static/img/pic/more3.png" mode="" class="down-arrow"></image>
			</view>
			<view>
				<input type="text" value="" placeholder="输入关键字"/>
			</view>
		</view>
		
		<scroll-view scroll-y="true" id="sv" :style="{height:sh-50+'px'}"  @scrolltolower='toBottom'>
			<view class="item" v-for="(item,index) in dataList" :key='index'>
				<view class=" padding" >
					<view class="top-line bottom-border">
						<view class="s1 cg">
							<view>
								<text>asdasdasdasdasdd</text>
								<text class="payway">微信支付</text>
							</view>
							<view>
								2020/03/30 12:30:40
							</view>
						</view>
						<image src="../../static/img/pic/more2.png" mode="" class="fr right-arrow"></image>
					</view>
					
					<view class="md-line bottom-border">
						<view>
							<image src="../../static/img/pic/logo.png" mode=""></image>
						</view>
						<view class="md-line-word">
							<view class="s1">
								<text class="limit-text">儿童木马瑶瑶马宝宝大叔大婶阿萨大师</text>
								<text class="fr cg s1">$79.80</text>
							</view>
							<view class="s2 cg">
								<text class="limit-text">规格<text class="s3 ">深蓝色:24(155/60A)</text></text>
								<text class="fr s1">*1</text>
							</view>
						</view>
					</view>
					<view class="bottom-border">
						<view class="status-line cg s2">
							<text>订单状态</text>
							<text class="fr cr">待发货</text>
						</view>
						<view class="status-line cg s2">
							<text>买家昵称</text>
							<text class="fr ">许愿</text>
						</view>
						<view class="status-line cg s2">
							<text>配送方式</text>
							<text class="fr cblue">快递</text>
						</view>
					</view>
					<view class="bottom-border s2 cg" style="text-align: right;padding-right: 30upx;">
						共<text class="cr">1</text>件商品 实付:<text class="cr">$79.80</text>
					</view>
					<view class="bottom-border btn-line">
						<button type="default" class="btn btn-primary">确认发货</button>
						<button type="default" class="btn btn-primary">取消发货</button>
						<button type="default" class="btn ">备注</button>
						<button type="default" class="btn " @click="toDetail">查看详情</button>
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
				active:1,
				orderList:[
					{name:'asdasdasds'},{name:'asdasdasds'},{name:'asdasdasds'},{name:'asdasdasds'}
				],
				sh:'',
				dataList:[],
				page:1,
				pageSize:5,
				total:0,
				more:''
			}
		},
		computed: {
		     noMore () {
		       return this.dataList.length >= this.total
		     },
		   },
		   mounted(){
		   	var that=this
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
			toDetail(){
				uni.navigateTo({
					url:'operating/orderDetail'
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
				  pagesize: this.pageSize
				}
				if(this.page==1){
					this.$loading()
				}
				  var url='/wangtosale_list'
				  this.$apiPost(url,params).then((res) =>{
					  that.total=res.allnum
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
		padding: 20upx 0;
		background-color: #fff;
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
		background-color: #fff;
		border-bottom: 20upx solid #f3f3f3;
	}
</style>
