<template>
	<view style="padding-bottom: 50px;" v-cloak>
		<view class="padding top border-bottom">
			<!-- <image src="../../static/img/bg/activity.png" mode="" class="preview"></image> -->
			<swiper class="preview" :autoplay="autoplay" duration="500" interval="9999999" @transition='swiperChange'>
				<swiper-item v-if="data.video">
								<video :src="data.video" class="preview" id="myVideo"  @click="visible2=true">
								</video>
							</swiper-item>
			    <swiper-item v-for="(item, index) in data.thumb_url" :key="index">
			    	<image :src="item" mode="" class="banner"></image>
			    </swiper-item>
			   </swiper>
			
			<!-- <custom-swiper class="preview" :swiperList="swiperList" v-if="swiperList.length>0"></custom-swiper> -->
			
			<view class="show-top" style="margin-top: 20upx;">
				<view class="name">{{data.title}}</view>
				<view class="share" @click="openShare">
					<view class="icon-share iconfont cr"></view>
					<view class="cr s2">分享</view>
				</view>
			</view>
			<view class="cr s5">￥{{data.marketprice}}</view>
			<view class="cg s3">快递:10</view>
		</view>
		
		<view class="padding s2 border-bottom" @click="chooseCategory">
			<text class="cg" style="margin-right: 30upx;">选择</text>
			<text v-show="needCategory">{{choosedSpec!='' ? choosedSpec.selectArr:'选择 颜色分类'}}</text>
			<text v-show="!needCategory">暂无规格可选</text>
			<text class="fr icon-arrow-right iconfont cg"></text>
		</view>
		
		<view class="border-bottom s2" v-if='data.commentstotal'>
			<view class="padding ">
				<text class="" style="margin-right: 30upx;">商品评价({{data.commentstotal}})</text>
				<text class="fr cr" @click="toComments" v-if='data.comments'>查看全部 <text class="icon-arrow-right iconfont" style="margin-left: 30upx;"></text></text>
			</view>
			<view class="padding" v-for="(item,index) in data.comments" :key='index'>
				<view class="user">
					<image :src="item.headimgurl" mode="" class="headface"></image>
					<text>{{item.nickname}}</text>
				</view>
				<view class="comment">
					<view class="comment-word">
						{{item.content}}
					</view>
					<view class="comment-pic">
						<image :src="commentImgItem" mode="" v-for="(commentImgItem,commentImgIndex) in item.picurl" v-if='commentImgIndex<=3' :key='commentImgIndex'></image>
					</view>
				</view>
				<view class="s3 cg">{{item.skuname}}</view>
				
			</view>
			<view class="" style="text-align: center;" >
				<button type="default" class="btn" @click="toComments">{{data.toComments ? "查看全部评价":'暂无评论'}}</button>
			</view>
		</view>
		
		<view class="">
			<view class="sp-item3"  v-for="(item,index) in 1" :key='index'>
				<view class="sp-item3-top">
					<view>
						<image :src="data.logo" mode="" class="headface"></image>
					</view>
					<view >
						<view class="sp-item3-top-middle ellipsis">{{data.merchname ? data.merchname:"官方自营"}}</view>
						<view>
							<uni-rate disabled="true" size="12" v-if="data.merchid!=0" :value="data.avgstar" style="float: left;margin-top: 24upx;"></uni-rate>
							<uni-rate disabled="true" size="12" v-else value="5" style="float: left;margin-top: 24upx;"></uni-rate>
							<text class="s3 cg">{{data.collect}}人关注</text>
						</view>
					</view>
					<view class="enter-button enter-button1" v-if="data.merchid!=0" @click="focus(data.merchid)">{{data.isCollect=='1' ? '已关注':'关注'}}</view>
					<view class="enter-button enter-button2" @click="toShop(data.merchid)">进店</view>
				</view>
				<view class="sp-item3-bottom">
					<view v-for="(goodsItem, goodsIndex) in data.goods" :key="goodsIndex" @click="toGoodsDetail(goodsItem.goodsid,data.merchid)">
						<image :src="goodsItem.thumb" mode=""></image>
						<view class="price">￥{{goodsItem.marketprice}}</view>
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
		
		<view class="hot">
			<text>商品详情</text>
		</view>
		<view class="detail" v-html="data.content">
			
		</view>
		
		
		<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup" 
		 @click="onClick" @buttonClick="buttonClick" class="goods-nav animated slideInUp" v-show="!hideNav"/>
		 
		 <sku ref='sku' @completeSpecChoose='completeSpecChoose' :defaultImg='thumb_url[1]'
		 :category='category' :total='total' v-if="receivedCategory" :goodsid='id'></sku>
		 
		 
		 <view  class="popup-box" v-if="popshow">
			 <view class="wrapper" @click="popshow=false"></view>
			 <view class="popup animated slideInUp">
				 <view class="cr s5">分享给好友</view>
				 <view class="padding">
					 <!-- #ifdef APP-PLUS -->
					 <view class="share-item" v-for="(item,index) in providerList" :key='index' @tap="share(item)">
					 						 <image src="../../static/img/pic/other/weixin.png" mode="" v-if="item.name=='微信'"></image>
											 <image src="../../static/img/pic/other/pyq.png" mode="" v-if="item.name=='朋友圈'"></image>
					 						 <view class="">{{item.name}}</view>
					 </view>
					 <!-- #endif -->
					 <!-- #ifdef MP-WEIXIN -->
						<button class="share-item share-btn" open-type="share">
											<image src="../../static/img/pic/other/weixin.png" mode="" ></image>
												 <view class="">微信</view>
						</button>
					 <!-- #endif -->
					 <!-- <view class="share-item">
					 						 <image src="../../static/img/bg/activity.png" mode=""></image>
					 						 <view class="">微信</view>
					 </view> -->
					 <view class="share-item" @click="createPoster">
					 						 <image src="../../static/img/pic/other/post.png" mode=""></image>
					 						 <view class="">生成海报</view>
					 </view>
					 
				 </view>
				 <view>
					 <button type="default" class="text-btn" @click="popshow=false">取消</button>
				 </view>
			 </view>
		 </view>
		 
		 
		 <!-- 海报 -->
		 <s-popup custom-class="demo-popup" position="center" v-model="visible" customClass='advPopup'>
		   <!-- 内容 -->
		   <image :src="advImg" mode="" style="width: 100%;height: 320px;"></image>
		   <view style="margin-top: 20upx;">
		 	  <button class="adv-btn" @click="saveImg(advImg)">保存图片</button>
		   </view>
		 </s-popup>
		 
		 
		 <s-popup custom-class="demo-popup" position="center" v-model="visible2" customClass='advPopup'>
		   <!-- 内容 -->
		   <video :src="data.video" controls style="width: 100%;height: 320px;"></video>
		 </s-popup>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	import sku from '@/components/sku/pages/sku.vue'
	import sPopup from '@/components/s-popup/index';
	// import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default{
		components:{
			uniRate,
			uniGoodsNav,
			sku,
			sPopup,
			// uniPopup
		},
		onShow(){
			
		},
		data () {
		      return {
				  videoContext:'',
				  image:'',
				  advImg:'',
				  hideNav:true,
				  autoplay:true,
				  path:'',
				  logined:false,
				  popshow:false,
				  visible:false,
				  visible2:false,
				  uid:'',
				  token:'',
				  id:'',
				  merchId:'',
				  data:'',
				  thumb_url:'',
				  swiperList:[],
				  category:[],
				  total:'',
				  receivedCategory:false,
				  needCategory:false,
				  choosedSpec:'',
		        options: [{
		          icon: 'icon-kefu',
		          text: '客服'
		        }, {
		          icon: 'icon-iconfontshop-copy',
		          text: '店铺'
		        }, {
		          icon: 'icon-star',
		          text: '收藏',
				  collected:false,
				  color:'ff9c00'
		          // info: 0
		        }],
		        buttonGroup: [{
		          text: '加入购物车',
		          backgroundColor: '#ff0000',
		          color: '#fff'
		        },
		        {
		          text: '立即抢购',
		          backgroundColor: '#ffa200',
		          color: '#fff'
		        }
		        ],
				// 分享
				providerList:[],
				shareType:0,
				shareText:'嘎哈'
		      }
		    },
			onLoad(p){
				var that=this
				this.id=p.id
				// this.merchId=p.merchId
				var userInfo=uni.getStorageSync('userInfo')
				if(userInfo!='' & userInfo!=null & userInfo!=undefined){
					this.logined=true
					this.uid=userInfo.uid
					this.token=userInfo.token
				}else{
					this.logined=false
				}
				this.getDetail()
				this.getProvider()
				uni.$on('logined',function(){
					var userInfo2=uni.getStorageSync('userInfo')
					that.logined=true
					that.uid=userInfo2.uid
					that.token=userInfo2.token
					that.getDetail()
				})
			},
			onShareAppMessage() {
				
				return {
					title: "小美女小帅哥快来买啊",
					path: '/pages/index/goodsDetail?id='+this.id,
					imageUrl:this.image ? this.image : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
				}
			},
			onPageScroll(e){
				if(e.scrollTop==0){
					this.hideNav=true
				}else{
					this.hideNav=false
				}
			},
		    methods: {
				toGoodsDetail(goodsid,merchid){
					uni.navigateTo({
						url:'goodsDetail?id='+goodsid+'&merchId='+merchid
					})
				},
		      onClick (e) {
				  if(e.index==0){
					  // 客服
				  }else if(e.index==1){
					  // 店铺
					  this.toShop(this.data.merchid)
				  }else if(e.index==2){
					  // 收藏
					  this.collect(e.content.collected)
				  }
		        // uni.showToast({
		        //   title: `点击${e.content.text}`,
		        //   icon: 'none'
		        // })
		      },
		      buttonClick (e) {
		        console.log(e)
				if(e.index==0){
					this.addCollect()
				}else{
					this.buy()
				}
		        // this.options[2].info++
		      },
			  // 添加购物车
			  addCollect(){
				  var ce=this.$operateInterceptor(this.logined)
				  if(!ce){
				  	return ;
				  }
				  var that=this
				  var params={
				    uid:this.uid,
				    token: this.token,
					goodsid:this.id
				  }
				    var url='&r=api.member.cart.add'
				    this.$apiPost(url,params).then((res) =>{
				  		// that.options[2].info++
						that.$msg('添加成功')
				    })
			  },
			  // 购买
			  buy(){
				  var ce=this.$operateInterceptor(this.logined)
				  if(!ce){
				  	return ;
				  }
				  if((this.choosedSpec.choosedid=='' || this.choosedSpec.choosedid==undefined || this.choosedSpec.choosedid==null) & this.needCategory){
				  	this.chooseCategory()
				  	return ;
				  }
				  if(this.total==null || this.total==0){
					  this.$msg('该商品已卖完')
					  return ;
				  }
				  uni.navigateTo({
				  	url:'./createOrder?goodsId='+this.id+'&merchId='+this.data.merchid
					+'&choosedSpec='+JSON.stringify(this.choosedSpec)+'&goodsName='+this.data.title+'&total='+this.total+'&marketprice='+this.data.marketprice
				  })
			  },
			  // 购物车数量
			  getCollectNum(){
				  
			  },
			  // 更改收藏状态
			  collect(colected){
				  var ce=this.$operateInterceptor(this.logined)
				  if(!ce){
				  	return ;
				  }
				  var that=this,url
				  var params={
				    uid:this.uid,
				    token: this.token,
				  					goodsid:this.id
				  }
				  if(colected){
					   url='&r=api.member.favorite.remove'
				  }else{
					   url='&r=api.member.favorite.add'
				  }
				    this.$apiPost(url,params).then((res) =>{
				  		// that.options[2].info++
						if(colected){
							that.options[2].collected=false
							that.options[2].icon='icon-star'
						}else{
							that.options[2].collected=true
							that.options[2].icon='icon-shoucang'
						}
				    })
			  },
			  // 关注
			  focus(id){
				  var ce=this.$operateInterceptor(this.logined)
				  if(!ce){
				  	return ;
				  }
				  if(this.data.isCollect=='1'){
					  return ;
				  }
				  var that=this
				  var params={
				    uid:this.uid,
				    token: this.token,
				  	merchid:id
				  }
				    var url='&r=api.member.collection.add'
				    this.$apiPost(url,params).then((res) =>{
				  		// that.options[2].info++
						that.data.isCollect='1'
				  						that.$msg('已关注')
				    })
			  },
			  chooseCategory(){
				  if(this.needCategory){
					  this.$refs.sku.specClass='show'
				  }
			  },
			  openShare(){
				  this.popshow=true
			  },
			  getDetail(){
				  var that=this
				  var url='&r=api.goods.detail&id='+this.id+'&uid='+this.uid+'&token='+this.token
				  // var params={
				  //   page:p,
				  //   pagesize: this.pageSize
				  // }
				    // var url='/wangtosale_list'
				    this.$apiPost(url).then((res) =>{
						that.data=res.data
						that.thumb_url=res.data.thumb_url
						// if(res.data.video){
						// 	this.swiperList.push({
						// 		type:'video',
						// 		url:res.data.video
						// 	})
						// }
						// for(let i in res.data.thumb_url){
						// 	this.swiperList.push({
						// 		type:"image",
						// 		url:res.data.thumb_url[i]
						// 	})
						// }
						if(that.data.isFavorite=='1'){
								that.options[2].collected=true
								that.options[2].icon='icon-shoucang'
						}else{
							that.options[2].collected=false
							that.options[2].icon='icon-star'
						}
						that.$nextTick(function(){
							that.getCategory()
							that.videoContext = uni.createVideoContext('myVideo')
						})
				  	  // that.total=res.total
				  	  // that.dataList=that.dataList.concat(res.data)
				  	  // that.more=''
				    })
			  },
			  getCategory(){
				  var that=this
				  var url='&r=api.goods.detail.sku&goodsid='+this.id
				    this.$apiPost(url).then((res) =>{
							that.category=res.data
							that.total=res.stock
							if(res.resultMessage=='暂无数据'){
								that.needCategory=false
							}else{
								that.needCategory=true
							}
							that.$nextTick(function(){
								that.receivedCategory=true
							})
				    })
			  },
			  pause(){
				this.autoplay=true
				},
				play(){
				this.autoplay=false
				},
				swiperChange(e){
					this.autoplay=true
					this.videoContext.pause();
				},
			  completeSpecChoose(e){
				  this.choosedSpec=e
			  },
			  toComments(){
				  if(!this.data.comments){
					  return ;
				  }
				  uni.navigateTo({
				  	url:'./goodsComments?id='+this.id
				  })
			  },
			  toShop(id){
			  	uni.navigateTo({
			  		url:`/pages/bussiness/shopPreview?id=${id}`
			  	})
			  },
			  // 海报
			  createPoster(){
				  	var ce=this.$operateInterceptor(this.logined)
				  	if(!ce){
				  		return ;
				  	}
					this.$loading()
				  	var that=this
				  	var params={
				  		uid:this.uid,
				  		token:this.token,
						goodsid:this.id
				  	}
				  	var url='&r=api.common.share.createPoster'
				  	  this.$apiPost(url,params).then((res) =>{
				  		  that.advImg=res.data.img
				  		  that.visible=true
						  that.popshow=false
						  uni.hideLoading()
				  	  })
			  },
			  saveImg(url){
			  	var that=this
			  	that.$loading()
			  	uni.downloadFile({
			  			url: url,
			  			success: (res) =>{
			  				if (res.statusCode === 200){
			  					uni.saveImageToPhotosAlbum({
			  						filePath: res.tempFilePath,
			  						success: function() {
			  							that.$msg('保存成功，请到相册中查看')
			  							that.visible=false
			  						},
			  						fail: function() {
			  							that.$msg('保存失败')
			  						},
			  						complete:() =>{
			  							uni.hideLoading()
			  						}
			  					});
			  				}
			  			}
			  		})
			  },
			  // 分享
			  getProvider(){
				  uni.getProvider({
				  	service: 'share',
				  	success: (e) => {
				  		console.log('success', e);
				  		let data = []
				  		for (let i = 0; i < e.provider.length; i++) {
				  			switch (e.provider[i]) {
				  				case 'weixin':
				  					data.push({
				  						name: '微信',
				  						id: 'weixin',
				  						sort:0
				  					})
				  					data.push({
				  						name: '朋友圈',
				  						id: 'weixin',
				  						type:'WXSenceTimeline',
				  						sort:1
				  					})
				  					break;
				  				// case 'sinaweibo':
				  				// 	data.push({
				  				// 		name: '分享到新浪微博',
				  				// 		id: 'sinaweibo',
				  				// 		sort:2
				  				// 	})
				  				// 	break;
				  				// case 'qq':
				  				// 	data.push({
				  				// 		name: '分享到QQ',
				  				// 		id: 'qq',
				  				// 		sort:3
				  				// 	})
				  				// 	break;
				  				default:
				  					break;
				  			}
				  		}
				  		this.providerList = data.sort((x,y) => {
				  			return x.sort - y.sort
				  		});
				  	},
				  	fail: (e) => {
				  		console.log('获取分享通道失败', e);
				  		uni.showModal({
				  			content:'获取分享通道失败',
				  			showCancel:false
				  		})
				  	}
				  });
			  },
			  async share(e) {
				  console.log(e)
			  	console.log('分享通道:'+ e.id +'； 分享类型:' + this.shareType);
			  	
			  	// if(!this.shareText && (this.shareType === 1 || this.shareType === 0)){
			  	// 	uni.showModal({
			  	// 		content:'分享内容不能为空',
			  	// 		showCancel:false
			  	// 	})
			  	// 	return;
			  	// }
			  	
			  	// if(!this.image && (this.shareType === 2 || this.shareType === 0)){
			  	// 	uni.showModal({
			  	// 		content:'分享图片不能为空',
			  	// 		showCancel:false
			  	// 	})
			  	// 	return;
			  	// }
			  	
			  	let shareOPtions = {
			  		provider: e.id,
					extra: {
						scene: "WXSceneSession"
					},
			  		scene: e.type && e.type === 'WXSenceTimeline' ? 'WXSenceTimeline' : 'WXSceneSession', //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
			  		type: this.shareType,
			  		success: (e) => {
			  			console.log('success', e);
			  			uni.showModal({
			  				content: e,
			  				showCancel:false
			  			})
			  		},
			  		fail: (e) => {
			  			console.log('fail', e)
			  			uni.showModal({
			  				content: e,
			  				showCancel:false
			  			})
			  		},
			  		complete:function(){
			  			console.log('分享操作结束!')
			  		}
			  	}
			  	
			  	switch (this.shareType){
			  		case 0:
			  			shareOPtions.summary = '好玩';
			  			shareOPtions.imageUrl =this.data.thumb_url['1'];
			  			shareOPtions.title = this.data.title;
			  			shareOPtions.href = 'https://uniapp.dcloud.io';
			  			break;
			  		case 1:
			  			shareOPtions.summary = this.shareText;
			  			break;
			  		case 2:
			  			shareOPtions.imageUrl = this.image;
			  			break;
			  		case 5:
			  			shareOPtions.imageUrl = this.image ? this.image : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
			  			shareOPtions.title = this.data.title+'买啊';
			  			shareOPtions.miniProgram = {
			  				id:'gh_33446d7f7a26',
			  				path:'/pages/tabBar/component/component',
			  				webUrl:'https://uniapp.dcloud.io',
			  				type:0
			  			};
			  			break;
			  		default:
			  			break;
			  	}
			  	
			  	// if(shareOPtions.type === 0 && plus.os.name === 'iOS'){//如果是图文分享，且是ios平台，则压缩图片 
			  	// 	shareOPtions.imageUrl = await this.compress();
			  	// }
			  	if(shareOPtions.type === 1 && shareOPtions.provider === 'qq'){//如果是分享文字到qq，则必须加上href和title
			  		shareOPtions.href = 'https://uniapp.dcloud.io';
			  		shareOPtions.title = '欢迎体验uniapp';
			  	}
			  	uni.share(shareOPtions);
			  },
			  compress(url){
				  uni.compressImage({
				    src: url,
				    quality: 80,
				    success: res => {
						console.log(res.tempFilePath)
						return res.tempFilePath;
				    },
					fail:(reason) =>{
						console.log(reason)
					}
				  })
			  }
		    }
	}
</script>

<style>
	.preview{
		width: 100%;
		height: 550upx;
	}
	.top>view{
		margin-bottom: 20upx;
	}
	.show-top>view{
		display: inline-block;
		vertical-align: middle;
	}
	.share{
		text-align: center;
	}
	.show-top .name{
		width: 580upx;
		line-height: 48upx;
		margin-right: 50upx;
	}
	.border-bottom{
		border-bottom: 20upx solid #f3f3f3;
	}
	
	.user>image,
	.user>text{
		vertical-align: middle;
		display: inline-block;
	}
	
	.user .headface{
		width: 70upx;
		margin-right: 20upx;
		height: 70upx;
		border-radius: 50%;
	}
	.comment-word{
		line-height: 1.5;
		height: 72upx;
		overflow:hidden;//一定要写
		    text-overflow: ellipsis;//超出省略号
		    display:-webkit-box;//一定要写
		    -webkit-line-clamp: 2;//控制行数
		    -webkit-box-orient: vertical;//一定要写
			margin: 25upx 0 15upx;
	}
	
	.comment-pic image{
		width: 31%;
		height: 200upx;
		border-radius: 10upx;
		margin-right: 2% ;
	}
	.btn{
		border: 1px solid #b8b8b8;
		padding: 0 25upx;
		text-align: center;
		border-radius: 50upx;
		display: inline-block;
		font-size: 30upx;
		background-color: #fff;
		margin: 30upx 0;
	}
	
	
	.sp-item3{
		border-radius: 20upx;
		background-color: #fff;
	}
	.sp-item3-top{
		padding: 20upx 30upx 0 0;
		margin: 20upx 0;
	}
	.sp-item3-top .headface{
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
		margin: 0 15upx;
	}
	.sp-item3-top-middle{
		max-width: 350upx;
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
		border: 2px solid #ff8f94;
		padding: 10upx 15upx;
		border-radius: 52upx;
		float: right;
		margin-top: 16upx;
	}
	.sp-item3-bottom>view{
			display: inline-block;
			vertical-align: top;
			width: 33%;
			height: 220upx;
			position: relative;
			overflow: hidden;
			border-radius: 20upx;
	}
	.sp-item3-bottom{
		padding: 0 30upx;
		/* margin: 0 18upx; */
		display: flex;
		/* justify-content: space-between; */
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
			padding: 5upx 8upx;
			background-color: #999;
			opacity: 0.8;
		}
	.enter-button1{
		margin-left: 30upx;
		background-color: #ff8f94;
		color: #fff;
	}
	
	
	.hot{
		text-align: center;
		padding: 20upx 0;
		background-color: #f3f3f3;
	}
	.hot text,
	.hot text::before,
	.hot text::after{
		display: inline-block;
		vertical-align: middle;
	}
	.hot text::before{
		content: '';
		width: 80upx;
		height: 1px;
		background-color: #aeaeae;
		margin-right: 30upx;
	}
	.hot text::after{
		content: '';
		width: 80upx;
		height: 1px;
		background-color: #aeaeae;
		margin-left: 30upx;
	}
	
	.popup{
		text-align: center;
		background-color: #fff;
		z-index: 99;
		padding-top: 30upx;
	}
	.share-item{
		display: inline-block;
		vertical-align: middle;
		width: 33%;
		padding-bottom: 30upx;
		border-bottom: 1px solid #efefef;
	}
	.share-item image{
		width: 80upx;
		height: 80upx;
	}
	.text-btn{
		border: none !important;
		outline: none;
		background-color: #fff !important;
		color: #666 !important;
		line-height: 70upx;
		padding: 0 0 20upx;
		text-align: center;
	}
	.text-btn:after{
		display: none;
	}
	.popup-box{
		position: fixed;
		display: flex;
		align-items: flex-end;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
	}
	.popup-box .wrapper{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #333;
		opacity: 0.6;
	}
	.popup-box .popup{
		position: relative;
		width: 100%;
		bottom: 0 !important;
		left: 0;
		right: 0;
		height: 360upx;
		box-sizing: border-box;
	}
	.share-btn{
		outline: none;
		background-color: initial;
		color: initial;
		line-height: initial;
		vertical-align: middle;
		font-size: 14px;
	}
	.share-btn::after{
		display: none;
	}
	.goods-nav{
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 3;
	}
	.bottom-nav{
		position: relative;
	}
	
	.adv-btn{
		width: 94%;
		margin: 0 auto;
		background-color: #fba1b0;
		color: #fff;
		border-radius: 6px;
		line-height: 1;
		border: none;
		outline: none;
		padding: 20upx 0;
		text-align: center;
		margin-bottom: 20upx;
		font-size: 12px;
	}
	.banner{
		height: 100%;
	}
	.detail img{
		width: 100%;
	}
</style>
