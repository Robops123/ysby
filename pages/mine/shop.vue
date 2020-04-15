<template>
	<view class="padding">
		<scroll-view scroll-y="true" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
			<view class="list" v-for="(item,index) in dataList" :key='index'>
				<image src="../../static/img/bg/activity.png" mode="" class="headface"></image>
				<view class="md">
					<view class="s3">小象母婴旗舰店</view>
					<view class="tw">
						<uni-rate disabled="true" size="12" value="3.5" style="float: left;margin-top: 24upx;"></uni-rate>
						<text class="s3 cg">1429人关注 </text>
					</view>
				</view>
				<image src="../../static/img/pic/diamonds.png" mode="" class="loading fr"></image>
			</view>
			<uni-load-more :status="more"></uni-load-more>
		</scroll-view>
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
				active:1,
				tabActive:0,
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
		   mounted(){
		   	var that=this
		   	this.getList(this.page)
		   	setTimeout(function(){
		   		that.$getHeight('#sv',(res) =>{
		   			that.sh=res
		   		})
		   	},0)
		   },
		methods: {
			distributionOrderdetail(){
				uni.navigateTo({
					url:'/pages/distributionOrderdetail/distributionOrderdetail'
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
				  page:p,
				  pagesize: this.pageSize
				}
				if(this.page==1){
					this.$loading()
				}
				  var url='/wangtosale_list'
				  this.$apiPost(url,params).then((res) =>{
					  that.total=res.allnum
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
	.tw text{
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
</style>
