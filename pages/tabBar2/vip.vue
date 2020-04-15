<template>
	<view style="border-top: 20upx solid #F3F3F3;">
		<scroll-view scroll-y="true" id="sv" :style="{height:sh-50+'px'}"  @scrolltolower='toBottom'>
			<view class="list" v-for="(item,index) in dataList" :key='index'>
				<view>
					<image src="../../static/img/pic/logo.png" mode=""></image>
				</view>
				<view>
					<view class="s1">月亮都知道</view>
					<view class="s3 cg time">关注时间:2020-03-30 12:13:32</view>
				</view>
				<view class="btn">移除粉丝</view>
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
		   methods:{
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
	.list>view{
		display: inline-block;
		vertical-align: middle;
	}
	.list{
		padding: 20upx;
		background-color: #fff;
	}
	.list image{
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		margin-right: 20upx;
	}
	.list .time{
		margin-top: 25upx;
	}
	.list .btn{
		float: right;
		margin-top: 40upx;
		padding: 4upx 10upx;
		border: 1px solid #ff6d7e !important;
		color: #ff6d7e !important;
		text-align: center;
		border-radius: 50upx;
	}
</style>
