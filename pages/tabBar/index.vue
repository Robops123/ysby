<template>
	<view v-cloak>
		<view class="nav padding" style="padding-bottom: 10upx;">
			<!-- #ifdef APP-PLUS || H5 -->
				<uni-status-bar />
			<!-- #endif -->
			<view class="nav-content">
				<image src="../../static/img/pic/index/address.png" mode="" class="" style="width: 0.9rem;height: 1rem;margin: 3px 3px 0 0;"></image>
				<!-- <text class="iconfont icon-address cr" ></text> -->
				<view class="cityName ellipsis" v-show="located">{{city ? city:'定位中'}}</view>
				<view v-show="!located" @click="reLocate">重新获取</view>
				<view class="search-line">
					<icon type="search" size="20" class="icon" />
					<input type="text" v-model="keywords" @confirm='search' placeholder="搜索商家/商品"/>
				</view>
				<view class="comment" @click="toMessage">
					<image src="../../static/img/pic/msg.png" mode="" class="" ></image>
					<uni-badge :text="msgNum" type='main' class="badge" size="small" v-show="msgNum>0"></uni-badge>
				</view>
			</view>
		</view>
		
		<!-- 列表 -->
		<view class="padding main">
			<swiper class="swiper" style='border-radius: 8px;' autoplay="false" duration="500" interval="3000" 
			:indicator-dots='true' indicator-active-color='#ff6d7e' indicator-color='#fff'>
			    <swiper-item v-for="(item, index) in carouselList" class="swiper-item" :key="index" @click='toBannerDetail(item)'>
			    	<image :src="item.thumb" mode="" ></image>
			    </swiper-item>
			   </swiper>
			
			
			<view class="announcement">
				<text class="s1 cr title">公告</text>
				  <swiper class="content s2 cg ellipsis" :vertical="true"  :autoplay="true" duration="500" interval="5000" >
				    <swiper-item v-for="(item, index) in noticeList" :key="index">
				     <icon type="" class="iconfont icon-tubiao-1" size="12" style="vertical-align: middle;"/>
				<view  class='notice-content'>{{item.title}}</view>
				    </swiper-item>
				   </swiper>
				<!-- <view class="s2 cg content ellipsis">中企商会酒店APP将于今年4月全新asdasd上线，敬请期待！</view> -->
			</view>
			
			
			<!-- 类型 -->
			<view class="list ">
				<view class="list-item" v-for="(item,index) in productList" :key='index' @click="toCategory(item.id)">
					<image :src="item.icon" mode=""></image>
					<view class="item-name cg s3">{{item.name}}</view>
				</view>
				<view class="list-item"  @click="toCategory()">
					<image src="../../static/img/pic/index/icon4.png" mode=""></image>
					<view class="item-name cg s3">更多分类</view>
				</view>
				<!-- #ifdef APP-PLUS || H5 -->
				<view class="list-item"  @click="contact" style="vertical-align: bottom;">
						<image src="../../static/img/pic/index/icon10.png" mode=""></image>
					<view class="item-name cg s3">在线客服</view>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP -->
				<view class="list-item"  style="vertical-align: bottom;">
					<button class="userinfo-btn" open-type="contact">
						<image src="../../static/img/pic/index/icon10.png" mode=""></image>
					</button>
					<view class="item-name cg s3">在线客服</view>
				</view>
				<!-- #endif -->
			</view>
			</view>
			<image :src="bannerList[0].thumb" v-if="bannerList[0]" mode="widthFix" @click='toBannerDetail(bannerList[0])' class="banner banner2 banner-low"></image>
			<view class="padding main" style="padding-top: 20upx;">
			<view class="card card1">
				<view style="padding:0  2%;">
					<text >每日特价</text>
					<view class="fr s3 more" style="margin-top: 4upx;" @click="toGoodsList(activityData.id,activityData.title)">{{activityData.title}}<icon class="iconfont icon-arrow-right1" type="" size='14'/></view>
				</view>
				<view class="sp">
					<view class="sp-item" v-for="(item,index) in bargainList" :key='index' @click="toDetail(item.id)">
						<image :src="item.thumb" mode=""></image>
						<view class="s3 ellipsis">{{item.title}}</view>
						<view class="cr s3">￥{{item.marketprice}}</view>
						<view class="cg s2 del">￥{{item.productprice}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<image :src="bannerList[1].thumb" v-if="bannerList[1]" mode="widthFix" @click='toBannerDetail(bannerList[1])' class="banner banner3"></image>
		
		<view class="hot " style="padding-top: 20upx;">
			<view class="hot-title"><image src="../../static/img/pic/index/hot.png" mode=""></image>热卖商品</view>
			<view class=" sp2" style="margin-bottom: 0;padding:20upx 20upx 0 20upx;background: #f3f3f3;">
				<view class="sp-item2 list" style="margin-top: 0;margin-bottom: 20upx;" v-for="(item,index) in hotList" :key='index' @click="toDetail(item.id)">
					<image :src="item.thumb" mode=""></image>
					<view class=" ellipsis" style="padding-left: 20upx;">{{item.title}}</view>
					<view class="cr s5 word-bottom" style="padding: 5upx 20upx  20upx ;box-sizing: border-box;">
						<text><text class="s3">￥</text>{{item.marketprice}}</text>
						<view class="buy fr">
							<image src="../../static/img/pic/cart.png" mode="" @click.stop="getCategory(item.id,item.thumb,item.marketprice)"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<image :src="bannerList[2].thumb" v-if="bannerList[2]" style="margin-top: 0;" @click='toBannerDetail(bannerList[2])' mode="widthFix" class="banner banner2"></image>
		
		<view class="padding" v-show="merchModelStatus==1">
			<view class="card card2">
				<text>附近商家</text>
				<view class="fr s3 more" style="margin-top: 6upx;" @click="toDiscover">聚集知名店铺<icon class="iconfont icon-arrow-right1" type="" size='14'/></view>
			</view>
			
			
		</view>
		<view v-show="merchModelStatus==1">
			<view class="sp-item3"  v-for="(item,index) in businessList" :key='index'>
				<view class="sp-item3-top">
					<view>
						<image :src="item.logo" mode="" class="headface"></image>
					</view>
					<view >
						<view class="sp-item3-top-middle ellipsis">{{item.merchname}}</view>
						<view>
							<uni-rate disabled="true" size="12" :value="item.avgstar" style="float: left;margin-top: 24upx;"></uni-rate>
							<text class="s3 cg collectnum">{{item.collect}}人关注   
							<text class="s2" v-if="lng && lat"> | 距离{{item.distance < 10 ? (item.distance * 1000)+'米' : item.distance+'千米'}}</text>
							</text>
						</view>
					</view>
					<view class="enter-button" @click="toShop(item.id)">进店</view>
				</view>
				<view class="sp-item3-bottom">
					<view class="" v-for="(childItem,childIndex) in item.goods" :key='childIndex' @click="toGoodsDetail(childItem.goodsid,item.id)">
						<image :src="childItem.thumb" mode=""></image>
						<view class="price">￥{{childItem.marketprice}}</view>
					</view>
					<!-- <view class="">
						<image src="../../static/img/bg/activity.png" mode=""></image>
						<view class="price">$282</view>
					</view>
					<view class="">
						<image src="../../static/img/bg/activity.png" mode=""></image>
						<view class="price">$282</view>
					</view> -->
				</view>
			</view>
		</view>
		<!-- <uni-rate disabled="true" size="12" value="3.5" style="float: left;margin-top: 24upx;"></uni-rate> -->
		
		
		<!-- 规格 -->
		<sku ref='sku' @completeSpecChoose='completeSpecChoose' :defaultImg='defaultImg' :defaultPrice='defaultPrice'
		:category='category' :total='total' v-if="receivedCategory" :goodsid='id'></sku>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniStatusBar from "@/components/uni-status-bar/uni-status-bar"
	import amap from '@/common/amap-wx.js';  
	import sku from '@/components/sku/pages/sku.vue'
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	let msgStorage = require("@/comps/chat/msgstorage");
	export default{
		components:{
			uniRate,
			uniStatusBar,
			sku,
			uniBadge
		},
		data(){
			return{
				merchModelStatus:0,
				nickName:'aa',
				avatarUrl:'',
				defaultPrice:0,
				defaultImg:'',
				id:'',
				category:[],
				receivedCategory:false,
				total:0,
				logined:false,
				located:true,
				uid:'',
				token:'',
				keywords:'',
				productList:[
					// {name:'睡眠用品',type:1,imgUrl:'../../static/img/pic/index/icon6.png'},
					// {name:'出行用品',type:2,imgUrl:'../../static/img/pic/index/icon2.png'},
					// {name:'浴室用品',type:3,imgUrl:'../../static/img/pic/index/icon8.png'},
					// {name:'幼教玩具',type:4,imgUrl:'../../static/img/pic/index/icon7.png'},
					// {name:'哺乳用品',type:5,imgUrl:'../../static/img/pic/index/icon1.png'},
					// {name:'护理用品',type:6,imgUrl:'../../static/img/pic/index/icon5.png'},
					// {name:'服饰鞋帽',type:7,imgUrl:'../../static/img/pic/index/icon3.png'},
					// {name:'孕产用品',type:8,imgUrl:'../../static/img/pic/index/icon9.png'},
					// {name:'更多分类',type:9,imgUrl:'../../static/img/pic/index/icon4.png'},
					// {name:'在线客服',type:10,imgUrl:'../../static/img/pic/index/icon10.png'}
				],
				hotList:[],
				noticeList:[],
				carouselList:[],
				bargainList:[],
				bannerList:[],
				businessList:[],
				lng:'',
				lat:'',
				city:'',
				amapPlugin:null,
				key:'364f9609be0c585e1d79d1c6f5ca4faf',
				msgNum:'',
				activityData:{}
			}
		},
		// watch:{
		// 	lng(n){
		// 		if(n){
					
		// 		}
		// 	}
		// },
		onShow(){
			var userInfo=uni.getStorageSync('userInfo')
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.logined=true
				this.uid=userInfo.uid
				this.token=userInfo.token
				this.msgListener()
			}else{
				this.logined=false
			}
			
		},
		mounted(){
			// uni.clearStorageSync()
			// uni.setStorageSync('member',[{name:'cd82566fd157be7887d7ca6cb646575d'}])
			var that=this
			uni.$on('logined',function(){
				var userInfo2=uni.getStorageSync('userInfo')
				that.logined=true
				that.uid=userInfo2.uid
				that.token=userInfo2.token
				that.msgListener()
			})
			// #ifdef MP
			this.amapPlugin = new amap.AMapWX({  
			            key: this.key  
			        });  
			this.wdnmd()
			// #endif
			// #ifdef APP-PLUS
			this.merchModelStatus=Number(1)
			// #endif
			this.getCate()
			this.getHotList()
			this.getNotice()
			this.getCarsouselList()
			this.getBargain()
			this.getBanner()
			this.getNearbyBusiness()
			this.calcUnRead()
			this.getActivity()
			let members=uni.getStorageSync('member') || []
			this.transToName(members)
			
		},
		methods:{
			msgListener(){
				var that=this
				msgStorage.on("newChatMsg", function(renderableMsg, type, curChatMsg, sesskey){
					// console.log(renderableMsg, type, curChatMsg, sesskey)
					// 判断是否属于当前会话
					let members=uni.getStorageSync('member') || [],
					existance=false
					
					if(members.length==0){
						members.push({
							name:renderableMsg.yourname
						})
						// for(var i=0;i<members.length;i++){
							that.transToName(members)
						// }
					}else {
						for(var i=0;i<members.length;i++){
							if(members[i].name==renderableMsg.yourname){
								existance=true
							}
						}
						if(!existance){
							members.push({
								name:renderableMsg.yourname
							})
							// for(var i=0;i<members.length;i++){
								that.transToName(members)
							// }
						}else{
							that.transToName(members)
						}
					}
					
				});
			},
			async transToName(members){
				for(let i=0;i<members.length;i++){
					if(!members[i].chatTarget){
				await	this.getNameById(members[i].name).then((res) =>{
							if(res){
								members[i].chatTarget=res
							}else{
								members[i].chatTarget=''
							}
						})
						// members[i].chatTarget=await this.getNameById(members[i].name)
						// console.log(name)
					}
				}
				uni.setStorageSync('member',members)
				this.calcUnRead();
			},
			getNameById(id){
				var that=this,merchname,
				params={
					uid:this.uid,
					token:this.token,
					hxid:id
				}
				  var url='&r=api.member.assist.hxidToMerch'
				  return new Promise((resolve,reject) =>{
					  this.$apiPost(url,params).then((res) =>{
						  resolve(res.data.merchname)
					  }).catch((err) =>{
					  	this.$msg(err)
					  })
				  })
				  
			},
			// 轮播链接
			toBannerDetail(item){
				switch(item.type){
					case '1':
					uni.navigateTo({
						url:`/pages/index/bannerDetail?url=`+item.link
					})
					break ;
					case '2':
					uni.navigateTo({
						url:`/pages/index/goodsDetail?id=`+item.goodsid
					})
					break ;
					case '3':
					uni.navigateTo({
						url:`/pages/bussiness/shopPreview?id=`+item.merchid
					})
					break ;
				}
				
			},
			toMessage(){
				uni.$on('reduceMsg',(res) =>{
					this.msgNum-=res
				})
				uni.navigateTo({
					url:`/pages/chat/message`
				})
			},
			contact(){
				uni.navigateTo({
					url:`/pages/index/webKf`
				})
			},
			// 聚集知名店铺
			toDiscover(){
				uni.switchTab({
					url:'./discover'
				})
			},
			search(){
				uni.navigateTo({
					url:`/pages/index/searchResult?keyword=${this.keywords}`
				})
			},
			toCategory(t){
				uni.navigateTo({
					url:`/pages/index/goodsCategory?type=${t}`
				})
			},
			toDetail(id){
				uni.navigateTo({
					url:`/pages/index/goodsDetail?id=${id}`
				})
			},
			toGoodsList(id,title){
				uni.navigateTo({
					url:`/pages/index/goodsList?id=${id}&title=${title}`
				})
			},
			// 商品分类列表
			getCate(){
				var that=this,url='&r=api.home.category',params={
				  	   id:''
				  }
				  this.$apiPost(url,params).then((res) =>{
					  // that.category=res.data
					  this.productList=res.data
				  })
			},
			// 公告
			getNotice(p){
				var that=this
				  var url='&r=api.home.notice'
				  this.$apiPost(url).then((res) =>{
					 that.noticeList=res.data
				  }).catch((err) =>{
					  this.$msg(err)
				  })
			},
			// 热卖商品
			getHotList(p){
				var that=this
				  var url='&r=api.home.goods.hotsale'
				  this.$apiPost(url).then((res) =>{
					 that.hotList=res.data.category
				  }).catch((err) =>{
					  this.$msg(err)
				  })
			},
			// 轮播图
			getCarsouselList(p){
				var that=this
				  var url='&r=api.home.banner'
				  this.$apiPost(url).then((res) =>{
					 that.carouselList=res.data
				  }).catch((err) =>{
					  this.$msg(err)
				  })
			},
			// 热卖
			getBargain(){
				var that=this
				  var url='&r=api.home.goods.bargain'
				  this.$apiPost(url).then((res) =>{
					 that.bargainList=res.data
				  }).catch((err) =>{
					  this.$msg(err)
				  })
			},
			// 限时活动
			getActivity(){
				var that=this
				  var url='&r=api.home.activity'
				  this.$apiPost(url).then((res) =>{
					  that.activityData=res.data[0]
					 // that.bargainList=res.data
				  }).catch((err) =>{
					  this.$msg(err)
				  })
			},
			// 广告图
			getBanner(){
				var that=this
				  var url='&r=api.home.adv'
				  this.$apiPost(url).then((res) =>{
					 that.bannerList=res.data
				  }).catch((err) =>{
					  this.$msg(err)
				  })
			},
			// 小程序绕开审核
			wdnmd(){
				var that=this
				  var url='&r=api.mo'
				  this.$apiPost(url).then((res) =>{
					 that.merchModelStatus=Number(res.data.status)
				  }).catch((err) =>{
					  this.$msg(err)
				  })
			},
			reLocate(){
				uni.showModal({
					title:'提示',
					content:'重新获取定位?',
					success:() =>{
						this.getNearbyBusiness()
					}
				})
			},
			getNearbyBusiness(){
				// #ifdef APP-PLUS || H5
				this.appLocate()
				// #endif
				// #ifdef MP-WEIXIN
				this.mpLocate()
				// #endif
			},
			mpLocate(){
				var that=this
				console.log('mplocate')
				this.amapPlugin.getRegeo({
				                success: (res) => {  
									that.city=res[0].regeocodeData.addressComponent.city
									that.lng=res[0].longitude
									that.lat=res[0].latitude
									var params={
										longitude:res[0].longitude,
										latitude:res[0].latitude
									}
									that.located=true
									that.getNearBy(params)
				                },
								  fail:(reason) =>{
									  console.log(reason)
									  that.located=false
									  that.getNearBy({})
									  that.$msg('请打开定位功能')
								  }
				            });  
			},
			appLocate(){
				var that=this
				uni.getLocation({
					type: 'wgs84',
					geocode:true,
					success:(res) =>{
						that.city=res.address.city
						that.lng=res.longitude
						that.lat=res.latitude
						that.located=true
						that.getNearBy(res)
					},
					fail:(reason) =>{
						that.located=false
						that.getNearBy({})
						that.$msg('请打开定位功能')
					}
				})
			},
			getNearBy(res){
				var url='&r=api.home.merchant'
				var params={
					lng:res.longitude || '',
					lat:res.latitude || ''
				},that=this
				this.$apiPost(url,params).then((res) =>{
					that.businessList=res.data.map((item) =>{
						item.distance=parseInt(item.distance)
						return item
					})
				}).catch((err) =>{
					this.$msg(err)
				})
			},
			toShop(id){
				uni.navigateTo({
					url:`/pages/bussiness/shopPreview?id=${id}`
				})
			},
			toGoodsDetail(goodsid,merchid){
				uni.navigateTo({
					url:'/pages/index/goodsDetail?id='+goodsid+'&merchId='+merchid
				})
			},
			// 
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
										that.total=res.stock
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
			calcUnRead(){
				var member = uni.getStorageSync("member");
				var myName = uni.getStorageSync("myUsername");
				var num=0
				for(let i = 0; i < member.length; i++){
					let newChatMsgs = uni.getStorageSync(member[i].name + myName) || [];
					let historyChatMsgs = uni.getStorageSync("rendered_" + member[i].name + myName) || [];
					let curChatMsgs = historyChatMsgs.concat(newChatMsgs);
					if(curChatMsgs.length){
						let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
						if(lastChatMsg.info.from!=lastChatMsg.username){
							num+=newChatMsgs.length
						}
						
						// lastChatMsg.unReadCount = newChatMsgs.length;
						// if(lastChatMsg.unReadCount > 99) {
						// 	lastChatMsg.unReadCount = "99+";
						// }
						
					}
				}
				if(num > 99){
					num='99+'
				}
				this.msgNum=num
			},
			noticeChange(e){
				console.log(e)
			}
		}
	}
</script>

<style>
	.nav{
		z-index: 999;
		background-color: #fff;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		box-sizing: border-box;
		/* #ifdef MP */
		padding-top: 0 !important;
		/* #endif */
		
	}
	.nav .nav-content{
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
		padding-top: 84upx;
	}
	.swiper{
		/* #ifdef APP-PLUS */
		margin-top: 76upx;
		/* #endif */
		height: 150px;
	}
	.swiper-item{
		width: 100%;
		height: 100%;
		border-radius: 8px;
		/* height: 600upx !important; */
	}
	.swiper-item image{
		width: 100%;
		height: 100%;
		border-radius: 8px;
	}
	.banner{
		border-radius: 10upx;
		width: 100%;
		height: 360upx;
	}
	.banner2{
		height: 135px;
		margin-top: 20upx;
		border-radius: 0 !important;
	}
	.banner3{
		margin: 10upx 0 20upx;
		height: 135px;
		border-radius: 0 !important;
	}
	.banner-low{
		width: 100%;
		/* height: 200upx; */
		/* width: 710upx; */
		/* display: block; */
		/* margin: 0 auto; */
	}
	.title{
		margin-right: 10upx;
		padding-right: 10upx;
		border-right: 1px solid #f4f4f4;
	}
	.content icon{
		margin-right: 5upx;
		color: #ffba2d;
		display: inline-block;
		vertical-align: top !important;
	}
	.content{
		display: inline-block;
		vertical-align: middle;
		overflow-x: auto;
		width: 86%;
		height: 38upx;
	}
	
	.list{
		text-align: justify;
		margin-top: 30upx;
	}
	.list-item{
		display: inline-block;
		margin:0 0 26upx 0;
		width: 20%;
		text-align: center;
	}
	.list-item:nth-of-type(5n){
		margin-right: 0;
	}
	.list-item image{
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
	}
	
	.card{
		padding: 10upx 8upx;
		margin: 15upx 0;
	}
	.card1{
		background-color: #fff7f5;
	}
	.card .more .iconfont{
		margin-left: 10upx;
		font-size: 28upx;
		border-radius: 50%;
		color: #ffb6b9;
		/* background-color: #; */
		vertical-align: bottom;
	}
	
	.sp-item image{
		width: 200upx;
		height: 200upx;
		border-radius: 10upx;
	}
	.sp-item{
		margin:8upx 0 10upx 2%;
		display: inline-block;
		vertical-align: top;
		width: 31%;
		/* pad */
	}
	..sp-item:last-child{
		margin-right: 0;
	}
	.sp-item .ellipsis{
		width: 200upx;
	}
	.sp-item:last-child{
		margin-right: 0;
	}
	
	.hot{
		text-align: center;
	}
	.hot .hot-title,
	.hot .hot-title::before,
	.hot .hot-title::after{
		display: inline-block;
		vertical-align: middle;
	}
	.hot .hot-title::before{
		content: '';
		width: 80upx;
		height: 1px;
		background-color: #aeaeae;
		margin-right: 30upx;
	}
	.hot .hot-title::after{
		content: '';
		width: 80upx;
		height: 1px;
		background-color: #aeaeae;
		margin-left: 30upx;
	}
	.hot-title image{
		width: 30upx;
		height: 30upx;
		margin-right: 18upx;
	}
	
	.sp2{
		text-align: justify;
		margin: 40upx 0 20upx;
	}
	.sp2 .sp-item2{
		background: #FFF;
		width: 49%;
		display: inline-block;
		/* margin-bottom: 15upx; */
	}
	.sp2 .sp-item2:nth-of-type(odd){
		margin-right: 2%;
	}
	.sp2 .sp-item2 view{
		/* margin-bottom: 20upx; */
	}
	.sp2 image{
		/* margin-bottom: 10upx; */
		width: 100%;
		height: 350upx;
	}
	.card2{
		background-color: #fdf2f6;
		border-radius: 8upx;
		padding: 10upx 18upx;
		margin-bottom: 0;
	}
	
	.sp-item3:last-child .sp-item3-bottom{
		border-bottom: 50upx solid #f6f1f3;
	}
	.sp-item3-top{
		padding: 0 30upx;
		margin: 20upx 0;
	}
	.sp-item3-top .headface{
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
		margin: 0 15upx;
	}
	.sp-item3-top-middle{
		max-width: 400upx;
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
	.sp-item3-top>view{
		display: inline-block;
		vertical-align: top;
	}
	.enter-button{
		color: #ff8f94;
		border: 1px solid #ff8f94;
		padding: 6upx 25upx;
		border-radius: 52upx;
		float: right;
		margin-top: 16upx;
	}
	.sp-item3-bottom>view{
			display: inline-block;
			vertical-align: top;
			width: 32%;
			margin-right: 2%;
			height: 220upx;
			position: relative;
			overflow: hidden;
			border-radius: 20upx;
	}
	.sp-item3-bottom>view:last-child{
		margin-right: 0;
	}
	.sp-item3-bottom{
		padding: 0 30upx;
		/* margin: 0 18upx; */
		display: flex;
		/* justify-content: space-between; */
		border-bottom: 22upx solid #f6f1f3;
		padding-bottom: 22upx;
	}
	.sp-item3-bottom image{
		width: 100%;
		height: 100%;
	}
	.sp-item3-bottom .price{
			position: absolute;
			left: 0;
			border-radius:0 20upx 0 20upx;
			bottom: 0;
			color: white;
			padding: 3upx 12upx;
			background-color: #999;
			opacity: 0.8;
			font-size: 24upx;
		}
		
		.comment image{
			position: relative;
			width: 45upx;
			height: 40upx;
			display: inline-block;
			vertical-align: middle;
		}
		
		.buy image{
			width: 55upx;
			height: 55upx;
			padding: 10upx;
			margin-top: -15upx;
		}
		.word-bottom>view{
			display: inline-block;
			vertical-align:middle;
		}
		.cityName{
			max-width: 120upx;
			overflow: hidden;
		}
		
		.comment{
			position: relative;
		}
		.badge{
			position: absolute;
			right: -8px;
			top: -8px;
		}
		.collectnum{
			margin:0 15upx;
		}
		.announcement{
			margin-top: 15upx;
		}
		.notice-content{
			width: 90%;
			display: inline-block;
			overflow-x: auto;
		}
		
		
		/* 联系客服 */
		.userinfo-btn:before,
		.userinfo-btn:after{
			display: none;
		}
		.userinfo-btn{
			display: inline-block;
			background: none;
			padding: 0 !important;
			border: none;
			outline: none;
			width: 90upx;
			height: 90upx;
			margin: 0 auto;
			text-align: center;
		}
</style>
