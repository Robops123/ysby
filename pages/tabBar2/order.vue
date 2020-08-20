<template>
	<view style="background-color: #fff;">
		<view class="nav-bar">
			<view class="nav nav-left" :class="{active:active=='qb'}" @click="toggle('qb')"><text>全部</text></view>
			<view class="nav nav-right" :class="{active:active==1}" @click="toggle(1)"><text>待付款</text></view>
			<view class="nav nav-left" :class="{active:active==2}" @click="toggle(2)"><text>待发货</text></view>
			<view class="nav nav-right" :class="{active:active==3}" @click="toggle(3)"><text>待收货</text></view>
			<view class="nav nav-left" :class="{active:active==6}" @click="toggle(6)"><text>已完成</text></view>
			<view class="nav nav-left" :class="{active:active=='qx'}" @click="toggle('qx')"><text>售后</text></view>
		</view>
		
		<view class="padding search">
			<view class="select">
				<image src="../../static/img/pic/search.png" mode="" class="search-img" ></image>
				<!-- <text class="order" @click="open">asdasd123123123123asdad</text> -->
				<input type="text" class="order order1" v-model="orderno" placeholder="订单号" @confirm='search'/>
				<!-- <image src="../../static/img/pic/more3.png" mode="" class="down-arrow"></image> -->
				<input type="text" class="order order2" v-model="keywords" placeholder="输入关键字..." @confirm='search'/>
			</view>
			<view class="search-btn" @click="search">搜索</view>
		</view>
		
		<scroll-view scroll-y="true" id="sv" :style="{height:sh-120+'px'}"  @scrolltolower='toBottom'>
			<view class="item" v-for="(item,index) in dataList" :key='index'>
				<view class=" padding" >
					<view class="top-line bottom-border">
						<view class="s1 cg">
							<view>
								<text>{{item.orderno}}</text>
								<!-- <text class="payway" v-show="item.paytype==0">未支付</text> -->
								<text class="payway" v-show="item.paytype==1">微信</text>
								<text class="payway" v-show="item.paytype==2">支付宝</text>
							</view>
							<view>
								{{item.createtime}}
							</view>
						</view>
						<text class="icon-arrow-right iconfont fr"></text>
					</view>
					
					<view class="md-line bottom-border" v-for="(childItem,childIndex) in item.goods" :key='childIndex'>
						<view>
							<image :src="childItem.goodspic" mode=""></image>
						</view>
						<view class="md-line-word">
							<view class="s1">
								<text class="limit-text">{{childItem.goodsname}}</text>
								<text class="fr cg s1">￥{{childItem.goodsprice}}</text>
							</view>
							<view class="s2 cg">
								<text class="limit-text">规格:<text class="s3 ">{{childItem.specifications ? childItem.specifications:'无规格'}}</text></text>
								<text class="fr s1">*{{childItem.amount}}</text>
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
							<text class="fr ">{{item.nickname}}</text>
						</view>
						<view class="status-line cg s2">
							<text>配送方式</text>
							<text class="fr cblue" v-if="item.delivery=='1'">快递</text>
							<text class="fr cblue" v-if="item.delivery=='2'">自提</text>
							<text class="fr cblue" v-if="item.delivery=='3'">其他</text>
						</view>
					</view>
					<view class="bottom-border s2 cg" style="text-align: right;padding-right: 30upx;">
						共<text class="cr">{{item.totalgoods}}</text>件商品 实付:<text class="cr">￥{{item.totalprice}}</text>
					</view>
					<view class="bottom-border btn-line">
						<button type="default" class="btn btn-primary" v-show="active==2" @click="openSend(item.orderno)">确认发货</button>
						<button type="default" class="btn btn-primary" v-show="active==2" @click="cancelOrder(item.orderno)">取消发货</button>
						<button type="default" class="btn " @click="showRemark(item.remark)">备注</button>
						<button type="default" class="btn " @click="toDetail(item.orderno)">查看详情</button>
					</view>
				</view>
			</view>
			<uni-load-more :status="more"></uni-load-more>
		</scroll-view>
		
		<pop ref='order' :dataList='orderList'></pop>
		
		<!-- 备注 -->
		<prompt :visible.sync="promptVisible" title='备注' :useDefault='false' :needCancelBtn='false'
		 mainColor="#ff6d7e" @confirm='promptVisible=false'>
		  <!-- 这里放入slot内容-->
		  <view class="remark">
			  <!-- <text>备注:</text> -->
			  <textarea v-model="remark" placeholder="" disabled />
		  </view>
		</prompt>
		
		
		<!-- 发货 -->
		<prompt :visible.sync="promptVisible2"  :useDefault='false' title='确认发货' :needCancelBtn='true'
		 mainColor="#ff6d7e" @confirm='confirmDoSend'>
		  <view class="padding send-prompt">
			  <view class="padding">快递公司</view>
			  <picker class="picker" @change="bindPickerChange" :value="current" :range="deliveryArray">
			       <view class="uni-input padding" v-if="current>=0">{{deliveryArray[current]}}</view>
				   <view class="uni-input padding" v-else style="color: grey;">选择快递公司</view>
			   </picker>
			  <view class="padding">快递单号</view>
			  <input class="padding" type="text" v-model="expressno" placeholder="请输入快递单号"/>
		  </view>
		</prompt>
	</view>
</template>

<script>
	import pop from '@/components/promptOptions/pop.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	 import Prompt from '@/components/zz-prompt/index.vue'
	export default{
		components:{
			uniLoadMore,
			pop,
			Prompt
		},
		data(){
			return{
				promptVisible:false,promptVisible2:false,
				uid:'',
				token:'',
				active:'qb',
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
				keywords:'',
				remark:'',
				current:0,
				expressno:'',
				deliveryArray:[],
				sendOrderNo:''
			}
		},
		computed: {
		     noMore () {
		       return this.dataList.length >= this.total
		     },
		   },
		   onLoad(){
			  
			   
		   },
		methods:{
			init(){
				var that=this
				var userInfo=uni.getStorageSync('userInfo'),that=this
				if(userInfo!='' & userInfo!=null & userInfo!=undefined){
					this.uid=userInfo.uid
					this.token=userInfo.token
				}
				this.getList(this.page,this.orderno,this.keywords)
				this.getDeliverList()
				 setTimeout(function(){
				 	that.$getHeight('#sv',(res) =>{
				 		that.sh=res
				 	})
				 },0)
			},
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
					url:'./operating/orderDetail?orderno='+no
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
			},
			cancelOrder(order){
				var that=this
				var params={
				  uid:this.uid,
				  token: this.token,
					orderno:order
				}
				  var url='&r=api.myshop.orders.cancelSend'
				  this.$apiPost(url,params).then((res) =>{
					  this.$msg('取消成功')
					  this.search()
						// that.options[2].info++
				  })
			},
			showRemark(rm){
				this.remark=rm || '无备注'
				this.promptVisible=true
			},
			openSend(no){
				this.sendOrderNo=no
				this.promptVisible2=true
			},
			confirmDoSend(){
				this.$loading()
				var that=this
				var params={
				  uid:this.uid,
				  token:this.token,
				  orderno:this.sendOrderNo,
				  expressno:this.expressno,
				  expressname:this.deliveryArray[this.current]
				}
				  var url='&r=api.myshop.orders.doSend'
				  this.$apiPost(url,params).then((res) =>{
					  this.promptVisible2=false
					  this.sendReset()
					  uni.hideLoading()
					  that.$msg('发货成功')
						that.search()
				  })
				
			},
			sendReset(){
				this.expressno=''
				this.current=0
			},
			bindPickerChange(e){
				console.log(e)
				this.current=e.detail.value
				console.log(this.current)
			},
			getDeliverList(){
				var url='&r=api.myshop.orders.getExpressCompany',
				params={
					uid:this.uid,
					token:this.token
				}
				  this.$apiPost(url,params).then((res) =>{
						this.deliveryArray=res.data.map((item) =>{
							return item.expressname
						})
				  })
			}
		}
	}
</script>

<style>
	.nav-bar{
		text-align: center;
		padding: 30upx 0;
	}
	.nav{
		color: #afafaf;
		display: inline-block;
		width: 16.6% !important;
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
		padding-left: 15upx;
	}
	
	.search{
		background-color: #f7f7f8;
		display: flex;
	}
	.select{
		display: flex;
		background-color: #fff;
			/* width: 48%; */
			/* padding: 10upx 0; */
			margin:0 20upx 0 0;
			flex: 1;
			/* display: inline-block; */
			/* vertical-align: middle; */
	}
	.select image{
		width: 20px;
		height: 17px;
	}
	.order1{
		flex: 4;
		/* padding-left: 15upx; */
		border-right: 1px solid #f3f3f3;
	}
	.order2{
		flex: 6;
	}
	.search-btn{
		font-size: 28upx;
		width: 120upx;
		color: white;
		background: linear-gradient(to bottom,#ff9da1,#ff7076);
		line-height: 25px;
		text-align: center;
		border-radius: 25px;
	}
	.select .order{
		display: inline-block;
		vertical-align: middle;
		/* width: 70%; */
	}
	.select image,
	.select input{
		display: inline-block;
		vertical-align: middle;
	}
	.search>view{
		height: 25px;
		align-items: center;
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
	.remark{
		padding: 20upx;
		width: 100%;
		box-sizing: border-box;
	}
	.remark text,
	.remark textarea{
		display: inline-block;
		vertical-align: top;
	}
	.remark text{
		width: 30%;
		text-align: center;
	}
	.remark textarea{
		width: 100%;
		height: 90px;
		/* border: 1px dashed #f2f2f2; */
		padding-left: 20upx;
		box-sizing: border-box;
	}
	.send-prompt{
		text-align: left;
		width: 100%;
	}
	.send-prompt input{
		height: initial;
	}
</style>
