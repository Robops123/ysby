<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 -->
			<uni-status-bar />
		<!-- #endif -->
		<view class="top-nav">
			<!-- #ifdef APP-PLUS || H5 -->
				<view class="icon-previewleft iconfont" @click="back"></view>
			<!-- #endif -->
				<view class="nav-bar">
					<view class="nav nav-left" :class="{active:active==1}" @click="toggle(1)"><text>商品专区</text></view>
					<view class="nav nav-right" :class="{active:active==2}" @click="toggle(2)"><text>品牌专区</text></view>
				</view>
		</view>
		
		<!-- 菜 -->
		<view class="content" v-cloak>
			<scroll-view scroll-y="true" class="left-scroll">
				<view class="">
					<view class="left-item s1 " :class="{active:tabActive==index}" @click="toggleTab(index,item)"  v-for="(item,index) in category" :key='index'>
						<text>{{item.name}}</text>
					</view>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="right-scroll"  >
				<view class="" >
					<image  :src="category[tabActive].advimg" v-if="category.length>0 && categoryReady" mode="widthFix" class="banner" ></image>
					<!-- <image v-else :src="category[tabActive].thumb" mode="" class="banner"></image> -->
					<view class="s1 headline" v-if="active==1 && category.length>0">{{'全部'+category[tabActive].name+'商家'}}</view>
					<view class="s1 headline" v-if="active==2 && category.length>0">{{'全部'+category[tabActive].name+'用品'}}</view>
					<!-- 区 -->
					<view class="right-content" v-if="active==1">
						<view class="right-item" v-for="(item,index) in dataList" :key='index' @click="to('goodsList',tabActive,item.id)">
							<image :src="item.logo" mode=""></image>
							<view class="s3 cg ellipsis">{{item.merchname}}</view>
						</view>
					</view>
					<view class="right-content" v-if="active==2">
						<view class="right-item" v-for="(item,index) in dataList" :key='index' @click="to('goodsList',tabActive,item.id)">
							<image :src="item.logo" mode=""></image>
							<view class="s3 cg ellipsis">{{item.name}}</view>
						</view>
					</view>
				</view>
				<!-- <uni-load-more :status="more"></uni-load-more> -->
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
				type:'',
				categoryReady:false,
				url:'&r=api.home.morecate',
				url2:'&r=api.home.morecate.catemerch',
				tapped:'',
				category:[],
				active:1,
				tabActive:'',
				sh:'',
				dataList:[],
				page:1,
				pageSize:20,
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
			   // if(p.type!='false'){
				   this.type=p.type
				   
			   // }
			   this.getCategory(this.type)
			   
		   },
		methods:{
			toggleTab(t,item){
				this.tabActive=t
				this.tapped=item.id
				this.reset()
				this.getList('',item.id)
			},
			to(w,id1,id2){
				if(this.active==1){
					// cateId=this.category[id1].id
					// goodsId=id2
					uni.navigateTo({
						url:'./goodsList?merchId='+id2+'&cateId='+this.category[id1].id+'&type=1'
					})
				}else{
					uni.navigateTo({
						url:'./goodsList?brandId='+this.category[id1].id+'&cateId='+id2+'&type=2'
					})
				}
				
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			toggle(t){
				this.active=t
				this.category=[]
				this.tapped=false
				this.reset()
				this.getCategory(this.type)
			},
			reset(){
				if(this.active==1){
					 this.url='&r=api.home.morecate'
					 this.url2='&r=api.home.morecate.catemerch'
				}else{
					 this.url='&r=api.home.morecate.brand'
					this.url2='&r=api.home.morecate.brandcates'
				}
				this.page=1
				this.total=0
				this.dataList=[]
				this.more=''
			},
			getCategory(t=''){
				var that=this
				  // var params={
				  // 	   id:t
				  // }
				  this.$apiPost(this.url).then((res) =>{
					  that.category=res.data
					  // that.tabActive=0
					  for(var i=0;i<res.data.length;i++){
						  if(res.data[i].id==t){
							  that.tabActive=i
						  }
					  }
					  if(!this.tabActive){
						  this.tabActive=0
					  }
					  that.categoryReady=true
				res.data.length>0 && that.getList('',t || res.data[0].id)
				  })
			},
			getList(p,id){
				var that=this
				// var params={
				//   page:p,
				//   pagesize: this.pageSize
				// }
				// if(this.page==1){
				// 	this.$loading()
				// }
				  // var params={
				  // 	   id:id
				  // }
				  
				  if(this.active==1){
					  this.url2+='&cateid='+id
				  }else{
					  this.url2+='&brandid='+id
				  }
				  this.$apiPost(this.url2).then((res) =>{
					  that.dataList=that.dataList.concat(res.data)
					  that.more=''
					  // if(that.page==1){
					  // 	uni.hideLoading()
					  // }
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
				  that.getList(that.page,id)
			  // },2000)
			},
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
		padding: 35upx 0 35upx 40upx;
		/* #ifdef APP-PLUS */
			/* padding: 20upx 0 20upx 40upx; */
			padding-top: var(--status-bar-height);
		/* #endif */
		display: flex;
		/* justify-content: space-around; */
		align-items: center;
	}
	.top-nav .iconfont{
		font-size: 27px;
	}
	
	.nav-bar{
		position: absolute;
		left: 70px;
		right: 70px;
		font-size: 16px;
		/* #ifdef APP-PLUS */
			top: var(--status-bar-height);
			padding: 10upx 0 20upx;
		/* #endif */
		text-align: center;
	}
	.nav{
		color: #afafaf;
		display: inline-block;
		width: 50%;
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
	
	.content{
		background-color: #f7f7f7;
		position: absolute;
		padding-top: 80upx;
		/* #ifdef MP-WEIXIN */
		padding-top: 32upx;
		/* #endif */
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		margin-top: var(--status-bar-height);
	}
	.left-scroll{
		width: 220upx;
		text-align: center;
		display: inline-block;
	}
	.left-item{
		margin: 25upx 0;
		padding: 20upx 0;
	}
	.left-item.active{
		background-color: #fff;
	}
	.left-item.active text{
		display: inline-block;
		width: 100%;
		border-left: 2px solid #ff6d7e;
	}
	.right-scroll{
		padding: 0 30upx 25upx;
		flex: 1;
		background-color: white;
	}
	.right-scroll .banner{
		width: 100%;
		/* height: 240upx; */
		max-height: 120px;
		margin-top: 20upx;
	}
	.right-scroll .headline{
		margin: 25upx 0;
	}
	.right-item{
		display: inline-block;
		vertical-align: top;
		text-align: center;
		width: 33%;
		margin: 20upx 0;
	}
	.right-item image{
		width: 100upx;
		height: 100upx;
		margin-bottom: 30upx;
	}
	.right-content{
		text-align: justify;
	}
</style>
