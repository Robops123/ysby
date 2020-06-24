<template>
	<view>
		<view class="top-nav padding">
			<view class="nav-content">
				<!-- #ifdef APP-PLUS -->
				<text class="iconfont icon-previewleft " @click="back"></text>
				<!-- #endif -->
				<view class="search-line">
					<icon type="search" size="20" class="icon" />
					<input type="text" v-model="keywords" placeholder="寻找商品" @confirm='search'/>
				</view>
				<!-- <view class="comment">
					<image src="../../static/img/pic/comment.png" mode="" class="" ></image>
				</view> -->
			</view>
		</view>
		
		
		<!--  -->
		<view class="sp-item3-top main">
			<view>
				<image :src="basic.logo" mode="" class="headface"></image>
			</view>
			<view >
				<view class="sp-item3-top-middle ellipsis">{{basic.merchname}}</view>
				<view>
					<uni-rate disabled="true" size="12" :value="basic.avgstar" style="float: left;margin-top: 24upx;"></uni-rate>
					<text class="s3 cg collectnum">{{basic.collect}}人关注</text>
				</view>
			</view>
			<view class="enter-button" @click="focus(id)">{{basic.isCollect=='1' ? '已关注':'关注'}}</view>
		</view>
		
		<!-- <image src="../../static/img/pic/logo.png" mode="" class="banner"></image> -->
		
		<swiper class="banner" autoplay="false" duration="500" interval="3000" :indicator-dots='true' indicator-active-color='#ff6d7e' indicator-color='#fff'>
		    <swiper-item v-for="(item, index) in carouselList" :key="index">
		    	<image :src="item.thumb" mode="" class="banner"></image>
		    </swiper-item>
		   </swiper>
		<view class="nav-bar">
			<view class="nav nav-left" :class="{active:active==1}" @click="toggle(1)"><text>精选</text></view>
			<view class="nav nav-right" :class="{active:active==2}" @click="toggle(2)"><text>新品</text></view>
			<view class="nav nav-left" :class="{active:active==3}" @click="toggle(3)"><text>销量</text></view>
			<view class="nav nav-left" :class="{active:active==4}" @click="toggle(4)">
				<text style="display: inline-block;vertical-align: middle;margin-right: 20upx;">价格</text>
				<view style="display: inline-block;vertical-align: middle;" class="range">
				<text class="icon-arrowup iconfont" :class="{active:rangeActive==1}"></text>
				<text class="icon-arrowdown-copy iconfont" :class="{active:rangeActive==2}" ></text>
				</view>
			</view>
		</view>
		
		<scroll-view scroll-y="true" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
			<view class="padding" style="background-color:#fff;">
				<view class="box">
					<view class="list" v-for="(item,index) in dataList" :key='index' @click="toGoodsDetail(item.id)">
						<image :src="item.thumb" mode=""></image>
						<view class="word">
							<view class="s3 ellipsis">{{item.title}}</view>
							<view class="s1 cr">￥{{item.marketprice}}<text class="s2 cg fr">已售{{item.sales}}件</text></view>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="more"></uni-load-more>
		</scroll-view>
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
				uid:'',
				token:'',
				keywords:'',
				logined:false,
				id:'',
				url:'',
				active:1,
				rangeActive:'',
				sh:'',
				dataList:[],
				page:1,
				pageSize:5,
				total:0,
				more:'',
				basic:'',
				carouselList:[]
			}
		},
		computed: {
		     noMore () {
		       return this.dataList.length >= this.total
		     },
		   },
		   onLoad(e){
			   this.id=e.id
		   },
		mounted(){
			var that=this
			this.url='&r=api.merchant.home.goods&page='+this.page+'&pagesize='+this.pageSize+'&sort='+this.active+'&merchid='+this.id+'&keywords='+this.keywords
			var userInfo=uni.getStorageSync('userInfo')
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.logined=true
				this.uid=userInfo.uid
				this.token=userInfo.token
			}else{
				this.logined=false
			}
			this.getBasic()
			uni.$on('logined',function(){
				var userInfo2=uni.getStorageSync('userInfo')
				that.logined=true
				that.uid=userInfo2.uid
				that.token=userInfo2.token
				that.getBasic()
			})
			this.getCarousel()
			this.getList(this.page)
			setTimeout(function(){
				that.$getHeight('#sv',(res) =>{
					that.sh=res
				})
			},0)
		},
		methods:{
			toGoodsDetail(goodsid){
				uni.navigateTo({
					url:'../index/goodsDetail?id='+goodsid
				})
			},
			share(){
				console.log('share')
			},
			search(){
				this.reset()
				this.getList()
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
				if(this.active!=4){
					this.rangeActive=''
					this.url='&r=api.merchant.home.goods&page='+this.page+'&pagesize='+this.pageSize+'&sort='+this.active+'&merchid='+this.id+'&keywords='+this.keywords
				}else{
					this.rangeActive= this.rangeActive == 1 ? 2:1
					if(this.rangeActive==1){
						this.url='&r=api.merchant.home.goods&page='+this.page+'&pagesize='+this.pageSize+'&sort='+4+'&merchid='+this.id+'&keywords='+this.keywords
					}else if(this.rangeActive==2){
						this.url='&r=api.merchant.home.goods&page='+this.page+'&pagesize='+this.pageSize+'&sort='+5+'&merchid='+this.id+'&keywords='+this.keywords
					}
				}
			},
			getList(p){
				var that=this
				// var params={
				//   page:p,
				//   pagesize: this.pageSize
				// }
				if(this.page==1){
					this.$loading()
				}
				  // var url='/wangtosale_list'
				  this.$apiPost(this.url).then((res) =>{
					  that.total=res.total
					  that.dataList=that.dataList.concat(res.data)
					  that.more=''
					  if(that.page==1){
					  	uni.hideLoading()
					  }
				  })
			},
			getBasic(){
				var that=this
				  var url='&r=api.merchant.home&merchid='+this.id+'&uid='+this.uid+'&token='+this.token
				  this.$apiPost(url).then((res) =>{
					  that.basic=res.data
				  })
			},
			getCarousel(){
				var that=this
				  var url='&r=api.merchant.home.banner&merchid='+this.id
				  this.$apiPost(url).then((res) =>{
					  that.carouselList=res.data
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
			// 关注
			focus(id){
							  var ce=this.$operateInterceptor(this.logined)
							  if(!ce){
							  	return ;
							  }
							  if(this.basic.isCollect=='1'){
							  	var url='&r=api.member.collection.remove'
							  }else{
							  	var url='&r=api.member.collection.add'
							  }
							  var that=this
							  var params={
							    uid:this.uid,
							    token: this.token,
							  	merchid:id
							  }
							    this.$apiPost(url,params).then((res) =>{
							  		// that.options[2].info++
									if(this.basic.isCollect=='1'){
										that.$msg('取消关注')
									}else{
										that.$msg('已关注')
									}
									that.getBasic()
							    })
			},
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
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
		padding-top: 96upx !important;
		/* #ifdef APP-PLUS */
		margin-top: var(--status-bar-height) !important;
		/* #endif */
	}
	
	
	
	.sp-item3-top{
		background-color:#fff;
		padding: 20upx 30upx 0 0;
		margin: 20upx 0;
	}
	.sp-item3-top .headface{
		width: 90upx;
		height: 90upx;
		/* border-radius: 50%; */
		margin: 0 15upx;
	}
	.sp-item3-top-middle image{
		width: 25upx;
		height: 25upx;
		vertical-align: middle;
		margin-right: 5upx;
	}
	.sp-item3-top-middle{
		max-width: 400upx;
	}
	.sp-item3-top-middle text text{
		color: #a9a9a9;
		margin-left: 10upx;
	}
	.sp-item3-top>view{
		display: inline-block;
		vertical-align: top;
	}
	.sp-item3-top-middle image{
		width: 25upx;
		height: 25upx;
		vertical-align: middle;
		margin-right: 5upx;
	}
	.sp-item3-top-middle text text{
		color: #a9a9a9;
		margin-left: 10upx;
	}
	.enter-button{
		color: #ff8f94;
		border: 1px solid #ff8f94;
		padding: 6upx 25upx;
		border-radius: 52upx;
		float: right;
		margin-top: 16upx;
	}
	
	
	.banner{
		width: 100%;
		height: 320upx;
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
	.collectnum{
		margin-left: 15upx;
	}
</style>
