<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view class=" manage" @click="toggleOperation">管理</view>
		<!-- #endif -->
		<view class="padding">
			<view class="date">{{date==today ? '今天':date}}</view>
			
			<!-- <view style="text-align: center;" v-if="!dataList">----暂无记录----</view> -->
			<scroll-view scroll-y="true" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
				<view class="list" v-for="(item,index) in dataList" :key='index' @click="toGoodsDetail(item.goodsid)">
					
					<image :src="item.thumb" mode=""></image>
						<view class="info">
							<view class="s2 title">
								{{item.title}}
							</view>
							<view class="bottom-content cr s5"><text class="s1">￥</text>{{item.marketprice}}</view>
							<view class="buy" >
								<text class="" style="color: #ff5b62;margin-right: 20upx;" v-if="operate" @click.stop="deleteCollect(item.goodsid,index)">删除</text>
								<image src="../../static/img/pic/cart.png" mode="" @click.stop="getCategory(item.goodsid,item.thumb,item.marketprice)"></image>
							</view>
						</view>
				</view>
				<uni-load-more :status="more"></uni-load-more>
			</scroll-view>
		</view>
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
		data() {
			return {
				defaultPrice:0,
				defaultImg:'',
				id:'',
				category:[],
				receivedCategory:false,
				totalsku:0,
				operate:false,
				today:'',date:'',
				uid:'',
				token:'',
				active:1,
				tabActive:0,
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
			   this.date=p.date
			   var that=this
			   var userInfo=uni.getStorageSync('userInfo')
			   var time=new Date()
			   this.today=time.toLocaleDateString().replace(/\//gi,'-')
			   if(userInfo!='' & userInfo!=null & userInfo!=undefined){
			   	this.uid=userInfo.uid
			   	this.token=userInfo.token
			   	this.getList(this.page)
			   }
			   setTimeout(function(){
			   	that.$getHeight('#sv',(res) =>{
			   		that.sh=res
			   	})
			   },0)
		   },
		   onNavigationBarButtonTap(){
		   	this.toggleOperation()
		   },
		methods: {
			distributionOrderdetail(){
				uni.navigateTo({
					url:'/pages/distributionOrderdetail/distributionOrderdetail'
				})
			},
			toGoodsDetail(id){
				uni.navigateTo({
					url:`/pages/index/goodsDetail?id=${id}`
				})
			},
			to(where){
				uni.navigateTo({
					url:`/pages/retail/${where}`
				})
			},
			back(){
				uni.navigateBack({
					delta:1
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
					uid:this.uid,
					token:this.token,
				  page:p,
				  pagesize: this.pageSize,
				  createdate:this.date
				}
				if(this.page==1){
					this.$loading()
				}
				  var url='&r=api.member.footprint.detail'
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
			deleteCollect(id,from){
				var that=this
				var params={
				  uid:this.uid,
				  token: this.token,
					goodsid:id
				}
				  var url='&r=api.member.footprint.remove'
				  this.$apiPost(url,params).then((res) =>{
						// that.options[2].info++
						that.$msg('移除成功')
						that.dataList.splice(from,1)
						uni.$emit('deleteRecord')
				  })
			},
			toggleOperation(){
				this.operate=!this.operate
			},
			getCategory(id,img,price){
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
	.list{
		margin-bottom: 20upx;
	}
	.list>image,
	.list .info
	{
		display: inline-block;
		vertical-align: top;
	}
	.list>image{
		width: 280upx;
		height: 280upx;
		border-radius: 10px;
		margin-right: 20upx;
	}
	.list .title{
		line-height: 1.5;
		width: 360upx;
		/* height: 72upx; */
		overflow:hidden;//一定要写
		    text-overflow: ellipsis;//超出省略号
		    display:-webkit-box;//一定要写
		    -webkit-line-clamp: 2;//控制行数
		    -webkit-box-orient: vertical;//一定要写
	}
	.list .bottom-content{
		margin: 80upx 0 0;
	}
	.buy{
		text-align: right;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.buy image{
		width: 60upx;
		height: 60upx;
		padding: 10upx;
	}
	
	.manage{
		text-align: right;
		padding: 20upx ;
		box-sizing: border-box;
		background-color: #fff;
	}
	
	.date{
		font-size: 48upx;
		font-weight: bold;
		border-bottom: 1px solid #f4f4f4;
		padding: 20upx 0;
		margin-bottom: 20upx;
	}
</style>
