<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view class=" manage" @click="toggleOperation">管理</view>
		<!-- #endif -->
		<!-- </view> -->
		<view class="padding">
			<scroll-view scroll-y="true" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
				<view class="list" v-for="(item,index) in dataList" :key='index' @click="toShop(item.merchid)">
					<image :src="item.logo" mode="" class="headface"></image>
					<view class="md">
						<view class="s3 merchname">{{item.merchname}}</view>
						<view class="tw">
							<uni-rate disabled="true" size="12" :value="item.avgstar" style="float: left;margin-top: 24upx;"></uni-rate>
							<text class="s3 cg">{{item.collect}}人关注 </text>
						</view>
					</view>
						<text class="fr" style="color: #ff5b62;margin-right: 20upx;" v-if="operate" @click.stop="deleteCollect(item.merchid,index)">删除</text>
					<!-- <image src="../../static/img/pic/diamonds.png" mode="" class="loading fr"></image> -->
				</view>
				<uni-load-more :status="more"></uni-load-more>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		components:{
			uniRate,
			uniLoadMore
		},
		data() {
			return {
				operate:false,
				uid:'',
				token:'',
				active:1,
				tabActive:0,
				sh:'',
				dataList:[],
				page:1,
				pageSize:8,
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
			toShop(id){
				uni.navigateTo({
					url:`/pages/bussiness/shopPreview?id=${id}`
				})
			},
			to(where){
				uni.navigateTo({
					url:`/pages/retail/${where}`
				})
			},
			toggleTab(t){
				this.tabActive=t
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
				  var url='&r=api.member.collection'
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
			toggleOperation(){
				this.operate=!this.operate
			},
			deleteCollect(id,from){
				var that=this
				var params={
				  uid:this.uid,
				  token: this.token,
					merchid:id
				}
				  var url='&r=api.member.collection.remove'
				  this.$apiPost(url,params).then((res) =>{
						// that.options[2].info++
						that.$msg('移除成功')
						that.dataList.splice(from,1)
				  })
			},
		}
	}
</script>

<style>
	.list{
		margin-bottom: 50upx;
	}
	.list>image,
	.list>view{
		display: inline-block;
		vertical-align: middle;
	}
	.tw>image,
	.tw>text{
		
	}
	.tw{
		margin: 30upx 0 -10upx;
	}
	.tw image{
		width: 25upx;
		height: 25upx;
		vertical-align: middle;
		margin-right: 5upx;
	}
	.tw>text{
		color: #a9a9a9;
		margin-left: 20upx;
	}
	.headface{
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
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
</style>
