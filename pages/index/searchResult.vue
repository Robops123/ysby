<template>
	<view>
		<view class="top-nav padding">
			<view class="nav-content">
				<!-- #ifdef APP-PLUS -->
				<text class="iconfont icon-previewleft " @click="back"></text>
				<!-- #endif -->
				<view class="search-line">
					<input type="text" v-model="keyword" placeholder="寻找附近的商家" @confirm='search'/>
				</view>
				<view class="comment">
					<image src="../../static/img/pic/comment.png" mode="" class="" ></image>
				</view>
			</view>
		</view>
		
		
		<view class="main">
			<view class="nav-bar">
				<view class="nav nav-left" :class="{active:active==0}" @click="toggle(0)"><text>全部</text></view>
				<view class="nav nav-right" :class="{active:active==1}" @click="toggle(1)"><text>销量</text></view>
				<view class="nav nav-left" :class="{active:active==2}" @click="toggle(2)">
					<text>价格</text>
					<view class="range s3">
						<text class="icon-arrowup iconfont" :class="{active:rangeActive==1}"></text>
						<text class="icon-arrowdown-copy iconfont" :class="{active:rangeActive==2}" ></text>
					</view>
					</view>
				<view class="nav nav-right" :class="{active:active==4}" @click="toggle(4)"><text>店铺</text></view>
			</view>
			<scroll-view scroll-y="true" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
				<view class="padding">
					<view class="list" v-for="(item,index) in dataList" :key='index'>
						<view v-if="item.isgoods==1" @click="toDetail(item.id)">
							<image :src="item.thumb" mode=""></image>
								<view class="info">
									<view class="s2 title">
										{{item.title}}
									</view>
									<view class="bottom-content cr s5"><text class="s1">￥</text>{{item.marketprice}}</view>
									<view class="buy">
										<image src="../../static/img/pic/cart.png" mode="" @click.stop="addCollect(item.id)"></image>
									</view>
								</view>
						</view>
						<view v-else class="merch">
							<image :src="item.logo" mode="" class="headface"></image>
							<view class="md">
								<view class="s3 merchname">{{item.merchname}}</view>
								<view class="tw">
									<uni-rate disabled="true" size="12" :value="item.avgstar" style="float: left;margin-top: 24upx;"></uni-rate>
									<text class="s3 cg">{{item.collect}}人关注 </text>
								</view>
							</view>
							<view class="enter-button" @click="toShop(item.id)">进店</view>
						</view>
					</view>
				</view>
				<uni-load-more :status="more"></uni-load-more>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import uniStatusBar from "@/components/uni-status-bar/uni-status-bar"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		components:{
			uniStatusBar,
			uniLoadMore
		},
		data(){
			return{
				logined:false,
				uid:'',
				token:'',
				keyword:'',
				active:0,
				rangeActive:'',
				sh:'',
				dataList:[],
				page:1,
				pageSize:10,
				total:0,
				more:'',
				lat:'',
				lng:''
			}
		},
		computed: {
		     noMore () {
		       return this.dataList.length >= this.total
		     },
		   },
		   onLoad(p){
			   var that=this
			   var userInfo=uni.getStorageSync('userInfo')
			   if(userInfo!='' & userInfo!=null & userInfo!=undefined){
			   	this.logined=true
			   	this.uid=userInfo.uid
			   	this.token=userInfo.token
			   }else{
			   	this.logined=false
			   }
			   uni.$on('logined',function(){
			   	var userInfo2=uni.getStorageSync('userInfo')
			   	that.logined=true
			   	that.uid=userInfo2.uid
			   	that.token=userInfo2.token
			   })
			   this.keyword=p.keyword
			   this.getPosition()
			   setTimeout(function(){
			   	that.$getHeight('#sv',(res) =>{
			   		that.sh=res
			   	})
			   },0)
		   },
		methods:{
			toggle(t){
				this.active=t
				this.reset()
				this.getList()
			},
			toggleRange(t){
				this.rangeActive=t
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			// 商品详情
			toDetail(id){
				uni.navigateTo({
					url:`/pages/index/goodsDetail?id=${id}`
				})
			},
			toShop(id){
				uni.navigateTo({
					url:`/pages/bussiness/shopPreview?id=${id}`
				})
			},
			addCollect(id){
				var ce=this.$operateInterceptor(this.logined)
				if(!ce){
					return ;
				}
				var that=this
				var params={
				  uid:this.uid,
				  token: this.token,
					goodsid:id
				}
				  var url='&r=api.member.cart.add'
				  this.$apiPost(url,params).then((res) =>{
						// that.options[2].info++
										that.$msg('添加成功')
				  })
			},
			reset(){
				this.page=1
				this.total=0
				this.dataList=[]
				this.more=''
				if(this.active!=2){
					this.rangeActive=''
				}else{
					this.rangeActive= this.rangeActive == 1 ? 2:1
				}
			},
			getList(){
				var that=this
				var params={
				  page:this.page,
				  pagesize: this.pageSize,
				  lng:this.lng,
				  lat:this.lat,
				  keywords:this.keyword,
				  type:this.active
				}
				if(this.rangeActive==1){
					params.type=3
				}else if(this.rangeActive==2){
					params.type=2
				}
				if(this.page==1){
					this.$loading()
				}
				  var url='&r=api.home.search'
				  this.$apiPost(url,params).then((res) =>{
					  that.total=res.data.total
					  that.dataList=that.dataList.concat(res.data.data)
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
				  that.getList()
			  // },2000)
			},
			getPosition(){
				var that=this
				this.$loading()
				uni.getLocation({
					type: 'wgs84',
					success:(res) =>{
						console.log(res)
						that.lng=res.longitude
						that.lat=res.latitude
						that.getList()
					},
					fail:(reason) =>{
						console.log(reason)
						that.reset()
						that.lng=''
						that.lat=''
						that.getList()
					},
					complete:() =>{
						uni.hideLoading()
					}
				})
			},
			search(){
				this.active=0
				this.reset()
				this.getList()
			}
		}
	}
</script>

<style>
	.top-nav{
		z-index: 999;
		background-color: #fff;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		box-sizing: border-box;
		/* #ifdef APP-PLUS */
			padding-top: var(--status-bar-height);
		/* #endif */
		/* display: flex;
		justify-content: space-around; */
		
	}
	.top-nav .iconfont{
		font-size: 27px;
	}
	 .nav-content{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.search-line{
		/* height: 120upx; */
		background-color: #f4f4f4;
		border-radius: 120upx;
		flex: 1;
		margin: 0 40upx;
		padding: 8upx 15upx;
	}
	.search-line icon{
		display: inline-block;
			vertical-align: middle;
	}
	.search-line input{
		display: inline-block;
		width: 70%;
		height: 100%;
		vertical-align: middle;
		margin-left: 10upx;
	}
	.main{
		padding-top: 80upx;
		/* #ifdef APP-PLUS */
		margin-top: var(--status-bar-height);
		/* #endif */
	}
	
	.nav-bar{
		padding: 25upx 0;
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
	
	
	
	.list{
		margin-bottom: 28upx;
	}
	.list image,
	.list .info,
	.merch>image,
	.merch>view
	{
		display: inline-block;
		vertical-align: top;
	}
	.list image{
		width: 280upx;
		height: 280upx;
		border-radius: 10px;
		margin-right: 20upx;
	}
	.list .title{
		line-height: 1.5;
		width: 360upx;
		height: 72upx;
		overflow:hidden;//一定要写
		    text-overflow: ellipsis;//超出省略号
		    display:-webkit-box;//一定要写
		    -webkit-line-clamp: 2;//控制行数
		    -webkit-box-orient: vertical;//一定要写
	}
	.list .bottom-content{
		margin: 80upx 0 30upx;
	}
	.buy{
		text-align: right;
	}
	.buy icon{
		border: 1px solid #ff6d7e;
		border-radius: 50%;
		padding: 10upx;
	}
	
	.hint{
		margin: 20upx 0;
		font-size: 28upx;
		text-align: center;
	}
	
	.comment image{
		width: 45upx;
		height: 40upx;
		display: inline-block;
		vertical-align: middle;
	}
	.range image{
		width: 15upx;
		height: 10upx;
	}
	.buy image{
		width: 60upx;
		height: 60upx;
		padding: 10upx;
	}
	
	
	
	.list .headface{
		width: 120upx ;
		height: 120upx ;
		border-radius: 50% ;
		margin-right: 25upx;
	}
	.loading{
		width: 40upx;
		height: 20upx;
		margin-top: 50upx;
	}
	
	.manage{
		text-align: right;
		padding: 20upx ;
		box-sizing: border-box;
		background-color: #fff;
	}
	.merchname{
		line-height: 1.5;
		width: 360upx;
		/* height: 72upx; */
		overflow:hidden;//一定要写
		    text-overflow: ellipsis;//超出省略号
		    display:-webkit-box;//一定要写
		    -webkit-line-clamp: 2;//控制行数
		    -webkit-box-orient: vertical;//一定要写
	}
	.enter-button{
		color: #ff8f94;
		border: 2px solid #ff8f94;
		padding: 10upx 15upx;
		border-radius: 52upx;
		float: right;
		margin-top: 16upx;
	}
</style>
