<template>
	<view style="padding-bottom: 50px;" >
		<swiper class="preview alterPreview" :autoplay="autoplay" duration="500" interval="3000" v-show='alterShow'
		 :indicator-dots='true' indicator-active-color='#ff6d7e' indicator-color='#fff'>
			<swiper-item v-if="data.video && data.videopic" style='width: 100%;'>
							<image :src="data.videopic" mode="" class="banner"></image>
						</swiper-item>
		    <swiper-item v-for="(item, index) in data.thumb_url" :key="index" style='width: 100%;'>
		    	<image :src="item" mode="" class="banner"></image>
		    </swiper-item>
		   </swiper>
		<view class="padding top border-bottom" style="padding-bottom: 0;" :class="{resetTop:alterShow}">
			<!-- <image src="../../static/img/bg/activity.png" mode="" class="preview"></image> -->
			<!-- #ifdef MP || H5 -->
			<swiper class="preview " :autoplay="autoplay" duration="500" interval="3000" 
			@transition='swiperChange' :indicator-dots='true' indicator-active-color='#ff6d7e' indicator-color='#fff'>
				<swiper-item v-if="data.video">
								<video :src="data.video" class="preview" id="myVideo" :poster='data.videopic'  @play='play' @pause='pause'>
								</video>
							</swiper-item>
			    <swiper-item v-for="(item, index) in data.thumb_url" :key="index">
			    	<image :src="item" mode="heightFix" class="banner"></image>
			    </swiper-item>
			   </swiper>
			<!-- #endif -->
			
			
			
			
			<!-- <custom-swiper class="preview" :swiperList="swiperList" v-if="swiperList.length>0"></custom-swiper> -->
			
			<view class="show-top" style="margin-top: 20upx;margin-bottom: 0;">
				<view class="name" style="margin-bottom: 0;">{{data.title}}</view>
				<view class="share" @click="openShare">
					<view class="icon-share iconfont cr"></view>
					<view class="cr s2">分享</view>
				</view>
			</view>
			<view class="cr s5" style="margin-bottom: 0;">￥{{data.marketprice}}</view>
			<view class="cg s3" style="margin-bottom: 10upx;">运费:{{data.freight}}</view>
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
				<text class="fr cr" @click="toComments" v-if='data.comments'>查看全部 <text class="icon-arrow-right iconfont" style="margin-left: 12upx;"></text></text>
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
					<view class="comment-pic" v-if='item.picurl.length>0'>
						<image :src="commentImgItem" mode="" v-for="(commentImgItem,commentImgIndex) in item.picurl.split(',')"
						v-if="commentImgIndex<=3"  :key='commentImgIndex' @click="readImg(commentImgItem)"></image>
					</view>
				</view>
				<view class="s3 cg">{{item.skuname ? item.skuname:'无规格'}}</view>
				
			</view>
			<view class="" style="text-align: center;" >
				<button type="default" class="btn" @click="toComments">{{data.comments.length>0 ? "查看全部评价":'暂无评论'}}</button>
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
							<text class="s3 cg collectnum">{{data.collect}}人关注</text>
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
		<view class="detail padding" v-html="data.content">
			
		</view>
		
		
		<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup" 
		 @click="onClick" @buttonClick="buttonClick" class="goods-nav animated slideInUp" />
		 
		 <sku ref='sku' @completeSpecChoose='completeSpecChoose' :defaultImg='thumb_url["1"] || ""' :defaultPrice='defaultPrice' @closeSku='closesku'
		 :category='category' :total='total' v-if="receivedCategory" :goodsid='id'></sku>
		 
		 
		
		 
		 <share-prompt :show='popshow'  :shareTitle="title" :miniProgramPath="'/pages/index/GoodsDetail?id='+id"
		 :alterUrl="'http://yuying.qinshaozhuanshu.cn/app/index.php?i=2&c=entry&m=zhonghong_zhihui&do=mobile&r=wap.share.goods.detail&id='+id"
		  @close='closeSharePrompt' :goodsid="id" :uid='uid' :token='token' @poster='getPoster'></share-prompt>
		 
		 
		 <!-- 海报 -->
		 <s-popup custom-class="demo-popup" position="center" v-model="visible" customClass='advPopup' @hide='hide'>
		   <!-- 内容 -->
		   <image :src="advImg" mode="widthFix" style="width: 100%;border-radius: 25upx;"></image>
		   <view style="margin-top: 20upx;">
		 	  <button class="adv-btn" @click="saveImg(advImg)">保存图片</button>
		   </view>
		 </s-popup>
		 
		 <!-- <s-popup custom-class="demo-popup" position="center" v-model="visible2" customClass='advPopup'>
		   <video :src="data.video" controls style="width: 100%;height: 320px;"></video>
		 </s-popup> -->
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	import sku from '@/components/sku/pages/sku.vue'
	import sPopup from '@/components/s-popup/index';
	import sharePrompt from '@/components/sharePrompt/sharePrompt'
	// import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default{
		components:{
			uniRate,
			uniGoodsNav,
			sku,
			sPopup,
			sharePrompt
			// uniPopup
		},
		onShow(){
			
		},
		data () {
		      return {
				  alterShow:false,
				  subNVue:'',
				  title:'',
				  hx_openid:'',
				  hx_pwd:'',
				  defaultPrice:0,
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
				collectOperate:false,
		      }
		    },
			onUnload(){
				uni.$off('logined')
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
					this.hx_openid=userInfo.hx_openid
					this.hx_pwd=userInfo.hx_pwd
				}else{
					this.logined=false
				}
				this.getDetail()
				// this.getProvider()
				uni.$on('logined',function(){
					var userInfo2=uni.getStorageSync('userInfo')
					that.logined=true
					that.uid=userInfo2.uid
					that.token=userInfo2.token
					this.hx_openid=userInfo.hx_openid
					this.hx_pwd=userInfo.hx_pwd
					that.getDetail()
				})
			},
			onShareAppMessage() {
				
				return {
					title: this.data.title,
					path: '/pages/index/goodsDetail?id='+this.id,
					imageUrl:this.image ? this.image : '/static/img/app.jpg'
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
					  this.tochat(this.data.merchid)
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
			  // 客服聊天
			  async tochat(id) {
				  var ce=this.$operateInterceptor(this.logined)
				  if(!ce){
				  	return ;
				  }
			  	var that = this
				this.$loading()
			  	var params = {
			  		merchid:id,
			  		uid:this.uid,
			  		token:this.token
			  	}
			  	var url = '&r=api.member.order.contactMerch'
			  	this.$apiPost(url, params).then((res) => {
			  		 this.$conn.open({
			  				apiUrl: this.$im.config.apiURL,
			  				user: that.hx_openid,
			  				pwd: that.hx_pwd,
			  				grant_type: 'password',
			  				appKey: this.$im.config.appkey
			  			});
			  			uni.setStorageSync('myUsername',that.hx_openid)
			  			var username={
			  				your:res.data.merch_hx_openid,
			  				myName:that.hx_openid
			  			}
						uni.hideLoading()
			  		uni.navigateTo({
			  			url: `/pages/chat/chat?username=${JSON.stringify(username)}&title=${res.data.merchname}`
			  		})
			  	})
			  	
			  },
		      buttonClick (e) {
		        console.log(e)
				if(e.index==0){
					if((this.choosedSpec.choosedid=='' || this.choosedSpec.choosedid==undefined || this.choosedSpec.choosedid==null) & this.needCategory){
										  this.collectOperate=true
						this.chooseCategory()
						return ;
					}
					this.addCollect(this.choosedSpec)
				}else{
					this.buy()
				}
		        // this.options[2].info++
		      },
			  // 添加购物车
			  addCollect(e){
				  var ce=this.$operateInterceptor(this.logined)
				  if(!ce){
				  	return ;
				  }
				  var that=this
				  var params={
				    uid:this.uid,
				    token: this.token,
					goodsid:this.id,
					specifications:e.selectArr,
					skuidsort:e.choosedid.join(',')
				  }
				    var url='&r=api.member.cart.add'
				    this.$apiPost(url,params).then((res) =>{
				  		// that.options[2].info++
						that.collectOperate=false
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
				  this.$loading()
				  if(this.data.isCollect=='1'){
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
						uni.hideLoading()
				  		// that.options[2].info++
						if(this.data.isCollect=='1'){
							that.$msg('取消关注')
							that.data.isCollect='0'
						}else{
							that.$msg('已关注')
							that.data.isCollect='1'
						}
						
				    })
			  },
			  chooseCategory(){
				  if(this.needCategory){
					  var that=this
					  // #ifdef APP-PLUS
					  this.subNVue.hide()
					  this.alterShow=true
					  // #endif
					  uni.$on('closeSku',function(){
						  that.subNVue.show()
						  that.alterShow=false
					  })
					  this.defaultPrice=this.data.marketprice.split(' - ')[0]
					  this.$refs.sku.specClass='show'
				  }
			  },
			  openShare(){
				  var ce=this.$operateInterceptor(this.logined)
				  if(!ce){
				  	return ;
				  }
				  this.title=this.data.title
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
						uni.setNavigationBarTitle({
							title:res.data.title
						})
						var range=that.data.marketprice.split(' - ')
						if(range.length>1){
							if(range[0]==range[1]){
								that.data.marketprice=range[0]
							}
						}
						that.thumb_url=res.data.thumb_url
						// #ifdef APP-PLUS
						this.subNVue = uni.getSubNVueById('sp'); // 通过 id 获取 nvue 子窗体
						this.subNVue.show('slide-in-top', 250);
						uni.$emit('page-popup', {  
							thumb_url:res.data.thumb_url,
							video:res.data.video,
							poster:res.data.videopic
						});
						// #endif
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
							// #ifdef MP || H5
							that.videoContext = uni.createVideoContext('myVideo')
							// #endif
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
				  if(this.collectOperate){
					  this.addCollect(e)
					  return ;
				  }
				  this.choosedSpec=e
				  uni.navigateTo({
				  	url:'./createOrder?goodsId='+this.id+'&merchId='+this.data.merchid
				  					+'&choosedSpec='+JSON.stringify(this.choosedSpec)+'&goodsName='+this.data.title+'&total='+this.total+'&marketprice='+this.data.marketprice
				  })
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
			  closeSharePrompt(){
				  this.popshow=false
			  },
			  readImg(url){
				  uni.previewImage({
				  	current:url,
				  	urls:[url]
				  })
			  },
			  closesku(){
				  console.log('close')
				   this.subNVue.show()
				   this.alterShow=false
			  },
			  getPoster(e){
				  // #ifdef APP-PLUS
				  this.subNVue.hide()
				  this.alterShow=true
				  // #endif
				  this.visible=true
				  this.advImg=e
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
										uni.hideLoading()
			  							that.$msg('保存成功，请到相册中查看')
										// #ifdef APP-PLUS
										that.subNVue.show()
										that.alterShow=false
										// #endif
											that.visible=false
			  						},
			  						fail: function() {
										uni.hideLoading()
			  							that.$msg('保存失败')
			  						},
			  						complete:() =>{
			  							
			  						}
			  					});
			  				}
			  			}
			  		})
			  },
			  hide(){
				  // #ifdef APP-PLUS
				  this.subNVue.show()
				  this.alterShow=false
				  // #endif
			  }
			  // compress(url){
				 //  uni.compressImage({
				 //    src: url,
				 //    quality: 80,
				 //    success: res => {
					// 	console.log(res.tempFilePath)
					// 	return res.tempFilePath;
				 //    },
					// fail:(reason) =>{
					// 	console.log(reason)
					// }
				 //  })
			  // }
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
		/* height: 72upx; */
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
		background-color: #fff !important;
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
		left: 0;
		width: 100%;
		z-index: 100;
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
		padding: 35upx 0;
		text-align: center;
		margin-bottom: 20upx;
		font-size: 12px;
	}
	.banner{
		margin: 0 auto;
		width: 100%;
		height: 100%;
	}
	.detail{
		word-break: break-all;
	}
	.detail img{
		width: initial;
		max-width: 100%;
	}
	.collectnum{
		margin-left: 15upx;
	}
	.advPopup{
		padding: 20upx 0;
	}
	.icon-arrow-right{
		vertical-align: middle;
	}
	.top{
		/* #ifdef APP-PLUS */
			padding-top: 250px;
		/* #endif */
	}
	.resetTop{
		/* #ifdef APP-PLUS */
			padding-top: 0 !important;
		/* #endif */
	}
	.alterPreview{
		height: 250px !important;
	}
</style>
