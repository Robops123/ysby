<template>
	<view>
		<view class="padding">
			<scroll-view scroll-y="true" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
				<view class="list" v-for="(item,index) in dataList" :key='index' @click="toGoodsDetail(item.goodsid)">
					<view class="date">{{item.createdate==today ? '今天':item.createdate}}
					<view class="fr cg" @click="to('viewHistorys',item.createdate)">
						<text class="s1">浏览更多</text>
						<text class="iconfont icon-arrow-right"></text>
					</view>
					</view>
					<view class="list2" v-for="(childItem,childIndex) in item.goods" :key='childIndex'>
						<image :src="childItem.thumb" mode=""></image>
							<view class="info">
								<view class="s2 title">
									{{childItem.title}}
								</view>
								<view class="bottom-content cr s5"><text class="s1">￥</text>{{childItem.marketprice}}</view>
								<view class="buy" >
									
									<!-- <text class="" style="color: #ff5b62;margin-right: 20upx;" v-if="operate" @click="deleteCollect(item.goodsid,index)">删除</text> -->
									<image src="../../static/img/pic/cart.png" mode="" @click.stop="addCollect(childItem.goodsid)"></image>
								</view>
							</view>
					</view>
				</view>
				<uni-load-more :status="more"></uni-load-more>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		components:{
			uniLoadMore
		},
		data() {
			return {
				operate:false,
				today:'',
				uid:'',
				token:'',
				active:1,
				tabActive:0,
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
			var userInfo=uni.getStorageSync('userInfo')
			var time=new Date()
			this.today=time.toLocaleDateString().replace(/\//gi,'-')
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.uid=userInfo.uid
				this.token=userInfo.token
				this.getList()
			}
			uni.$on('deleteRecord',function(){
				that.reset()
				that.getList()
			})
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
			to(where,p){
				uni.navigateTo({
					url:`/pages/mine/${where}?date=${p}`
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
				  pagesize: this.pageSize
				}
				if(this.page==1){
					this.$loading()
				}
				  var url='&r=api.member.footprint'
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
			addCollect(id){
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
			deleteCollect(id,from){
				var that=this
				var params={
				  uid:this.uid,
				  token: this.token,
					goodsid:id
				}
				  var url='&r=api.member.favorite.remove'
				  this.$apiPost(url,params).then((res) =>{
						// that.options[2].info++
						that.$msg('移除成功')
						that.dataList.splice(from,1)
				  })
			},
			toggleOperation(){
				this.operate=!this.operate
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
	.list>image,
	.list2>image{
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
