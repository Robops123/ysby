<template>
	<view>
		<view class="nav-bar">
			<view class="nav nav-left" :class="{active:active==1}" @click="toggle(1)"><text>综合</text></view>
			<view class="nav nav-right" :class="{active:active==2}" @click="toggle(2)"><text>最新</text></view>
			<view class="nav nav-left" :class="{active:active==3}" @click="toggle(3)">
				<text style="display: inline-block;vertical-align: middle;margin-right: 20upx;">价格</text>
				<view style="display: inline-block;vertical-align: middle;" class="range">
				<text class="icon-arrowup iconfont" :class="{active:rangeActive==1}"></text>
				<text class="icon-arrowdown-copy iconfont" :class="{active:rangeActive==2}" ></text>
				</view>
			</view>
			<view class="nav nav-right" :class="{active:active==5}" @click="toggle(5)"><text>热卖</text></view>
		</view>
		
		<scroll-view scroll-y="true" class="content" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
			<view class="box">
				<view class="list" v-for="(item,index) in dataList" :key='index' @click="to('goodsDetail',item.id)">
					<image :src="item.thumb" mode=""></image>
					<view class="word">
						<view class="s3 ellipsis">{{item.title}}</view>
						<view class="s5 cr word-bottom">
							<view>￥{{item.marketprice}}</view>
							<view class="buy fr">
								<image src="../../static/img/pic/cart.png" mode="" @click.stop="getCategory(item.id,item.thumb,item.marketprice)"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="more"></uni-load-more>
		</scroll-view>
		
		<sku ref='sku' @completeSpecChoose='completeSpecChoose' :defaultImg='defaultImg' :defaultPrice='defaultPrice'
		:category='category' :total='totalsku' v-if="receivedCategory" :goodsid='id'></sku>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import sku from '@/components/sku/pages/sku.vue'
	export default{
		components:{
			uniLoadMore,
			sku
		},
		data(){
			return{
			defaultPrice:0,
			defaultImg:'',
			id:'',
			category:[],
			receivedCategory:false,
			totalsku:0,
				uid:'',
				sorts:1,
				token:'',
				merchId:'',
				cateId:'',
				brandId:'',
				url:'&r=api.goods',
				active:1,
				rangeActive:'',
				sh:'',
				dataList:[],
				page:1,
				pageSize:5,
				total:0,
				more:'',
				logined:false
			}
		},
		computed: {
		     noMore () {
		       return this.dataList.length >= this.total
		     },
		   },
		   onLoad(e){
			 var that=this
			 if(e.type==1){
				 this.merchId=e.merchId
				 this.cateId=e.cateId
			 }else{
				 this.brandId=e.brandId
				 this.cateId=e.cateId
			 }
			 // this.url='&r=api.goods&page='+this.page+'&pagesize='+this.pageSize+'&sort='+this.active
			 var userInfo=uni.getStorageSync('userInfo')
			 if(userInfo!='' & userInfo!=null & userInfo!=undefined){
			 	this.logined=true
			 	this.uid=userInfo.uid
			 	this.token=userInfo.token
			 }else{
			 	this.logined=false
			 }
			 this.getList(this.page)
			 uni.$on('logined',function(){
			 	var userInfo2=uni.getStorageSync('userInfo')
			 	that.logined=true
			 	that.uid=userInfo2.uid
			 	that.token=userInfo2.token
			 })
			 setTimeout(function(){
			 	that.$getHeight('#sv',(res) =>{
			 		that.sh=res
			 	})
			 },0)
			 },
		methods:{
			to(w,id){
				uni.navigateTo({
					url:`/pages/index/${w}?id=${id}&merchId=${this.merchId}`
				})
			},
			toggle(t){
				this.active=t
				this.reset()
				this.getList(this.page)
			},
			toggleRange(t){
				this.rangeActive=t
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			reset(){
				this.page=1
				this.total=0
				this.dataList=[]
				this.more=''
				if(this.active!=3){
					this.rangeActive=''
					this.sorts=this.active
					// this.url='&r=api.goods&page='+this.page+'&pagesize='+this.pageSize+'&sort='+this.active
				}else{
					this.rangeActive= this.rangeActive == 1 ? 2:1
					if(this.rangeActive==1){
						this.sorts=3
						// this.url='&r=api.goods&page='+this.page+'&pagesize='+this.pageSize+'&sort='+3
					}else if(this.rangeActive==2){
						this.sorts=4
						// this.url='&r=api.goods&page='+this.page+'&pagesize='+this.pageSize+'&sort='+4
					}
				}
			},
			getList(p){
				var that=this
				var params={
				  page:p,
				  pagesize: this.pageSize,
				  sort:this.sorts,
				  brandid:this.brandId,
				  cateid:this.cateId,
				  merchid:this.merchId
				}
				if(this.page==1){
					this.$loading()
				}
				  // var url='/wangtosale_list'
				  this.$apiPost(this.url,params).then((res) =>{
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
				  // this.url='&r=api.goods&page='+this.page+'&pagesize='+this.pageSize+'&sort='+this.active
				  that.getList(that.page)
			  // },2000)
			},
			getCategory(id,img,price){
				var ce=this.$operateInterceptor(this.logined)
				if(!ce){
					return ;
				}
				this.defaultImg=img
				this.defaultPrice=price.split(' - ')[0]
				this.$loading()
				this.id=id
							  var that=this
							  var url='&r=api.goods.detail.sku&goodsid='+id
							    this.$apiPost(url).then((res) =>{
										that.category=res.data
										that.totalsku=res.stock
										// if(res.resultMessage=='暂无数据'){
										// 	that.needCategory=false
										// }else{
										// 	that.needCategory=true
										// }
										that.receivedCategory=true
										that.$nextTick(function(){
											that.$refs.sku.specClass='show'
											uni.hideLoading()
										})
							    })
			},
			completeSpecChoose(e){
				this.addCollect(this.id,e.choosedid.join(','),e.selectArr)
				this.receivedCategory=false
			},
			addCollect(id,skuidsort,specifications){
				this.$loading()
				var that=this
				var params={
				  uid:this.uid,
				  token: this.token,
					goodsid:id,
					specifications:specifications,
					skuidsort:skuidsort
				}
				  var url='&r=api.member.cart.add'
				  this.$apiPost(url,params).then((res) =>{
						// that.options[2].info++
						uni.hideLoading()
										that.$msg('添加成功')
				  })
			},
		}
	}
</script>

<style>
	.nav-bar{
		border-top: 20upx solid #f3f3f3;
		padding: 20upx 0;
		text-align: center;
	}
	.nav{
		color: #afafaf;
		display: inline-block;
		width: 25%;
		box-sizing: border-box;
	}
	.nav.active>text{
		color: #000000;
		position: relative;
	}
	.nav.active>text::before{
		content: '';
		position: absolute;
		bottom: -10upx;
		width: 50upx;
		background-color: #ff7379;
		height: 2px;
		left: 50%;
		margin-left: -25upx;
	}
	
	
	.content{
		box-sizing: border-box;
		padding: 0 20upx;
		background-color: #f3f3f3;
	}
	.box{
		margin-top: 20upx;
	}
	.list:nth-of-type(odd){
		margin-right: 2%;
	}
	.list{
		display: inline-block;
		vertical-align: top;
		border-radius: 10upx;
		overflow: hidden;
		width: 49%;
		background-color: #fff;
		margin-bottom: 20upx;
	}
	.list image{
		width: 100%;
		height: 380upx;
	}
	.list .word .ellipsis{
		margin-bottom: 15upx;
	}
	.list .word{
		padding: 5upx 20upx  20upx ;
	}
	
	.range{
		display: inline-block;
		vertical-align: middle;
		margin-left: 15upx;
	}
	.range>.iconfont{
		font-size: 24upx;
		display: block;
		transform: scale(2);
	}
	.range>text.active{
		color: #000000;
	}
	.buy image{
		width: 60upx;
		height: 60upx;
		padding: 10upx;
	}
	.word-bottom>view{
		display: inline-block;
		vertical-align:-webkit-baseline-middle;
	}
</style>
