<template>
	<view class="padding">
		<scroll-view scroll-y="true" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
			<view class="list" v-for="(item,index) in dataList" :key='index'>
				<image src="../../static/img/bg/activity.png" mode=""></image>
					<view class="info">
						<view class="s2 title">
							儿童木马麻木童儿儿童木马麻木童儿儿童木马麻木童儿儿童木马麻木童儿
							童儿儿童木马麻木童儿儿童木马麻木童儿童儿儿童木马麻木童儿儿童木马麻木童儿
						</view>
						<view class="bottom-content cr s5"><text class="s1">$</text>79.80</view>
						<view class="buy">
							<image src="../../static/img/pic/cart.png" mode=""></image>
						</view>
					</view>
			</view>
			<uni-load-more :status="more"></uni-load-more>
		</scroll-view>
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
	.buy image{
		width: 60upx;
		height: 60upx;
		padding: 10upx;
	}
</style>
