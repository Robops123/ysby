<template>
	<view>
		<view class="padding" style="padding-bottom: 66px;">
			<scroll-view scroll-y="true" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
				<view class="card" v-for="(item,index) in dataList" :key='index'>
					<view class="child-overall" >
						<view class="child-overall-item"> 
							<image src="../../static/img/bg/activity.png" mode=""></image>
							<view class="info">
								<view class="s2 title">
									儿童木马麻木童儿儿童木马麻木童儿儿童木马麻木童儿儿童木马麻木童儿
									童儿儿童木马麻木童儿儿童木马麻木童儿童儿儿童木马麻木童儿儿童木马麻木童儿
								</view>
								<view class="btn-box">
									<button type="default" class="btn btn1">再来一单</button>
									<button type="default" class="btn btn2" @click="toComment">评价</button>
								</view>
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
		data(){
			return{
				cartList:[
					{
						
					}
				],
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
			toComment(){
				uni.navigateTo({
					url:'./comment'
				})
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
	page{
		background-color: #f3f3f3;
	}
	.nav-bar{
		text-align: center;
		padding: 20upx 0;
		background-color: white;
	}
	.nav{
		color: #afafaf;
		display: inline-block;
		width: 20%;
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
	
	.card{
		background-color: #fff;
		border-radius: 18upx;
		margin: 20upx 0;
		/* border-top: 20upx solid #; */
	}
	.child-overall,.overall{
		padding: 20upx 15upx 0 15upx;
	}
	.child-overall:last-child{
		padding-bottom: 40upx;
	}
	.child-overall-item,
	.overall{
		display: flex;
		justify-items: center;
	}
	.overall{
		padding-right: 20upx;
	align-items: center;	
	justify-content: space-between;
	}
	.child-overall-item>image{
		width: 200upx;
		height: 200upx;
		margin-right: 20upx;
		border-radius: 17upx;
	}
	.child-overall-item .title{
		width: 360upx;
		/* height: 64upx; */
		overflow:hidden;//一定要写
		    text-overflow: ellipsis;//超出省略号
		    display:-webkit-box;//一定要写
		    -webkit-line-clamp: 2;//控制行数
		    -webkit-box-orient: vertical;//一定要写
	}
	.calculator text{
		display: inline-block;
		vertical-align: middle;
	}
	.calculator .calc{
		display: inline-block;
		vertical-align: middle;
		width: 40upx;
		height: 40upx;
		margin: 0 20upx;
		font-size: 36upx;
		line-height: 40upx;
		text-align: center;
		border-radius: 50%;
		border: 1px solid #e8e8e8;
	}
	.info{
		position: relative;
		flex: 1;
	}
	.options{
		background-color:#f9f9f9;
		display: inline-block;
		padding: 5upx 16upx;
		border-radius: 24upx;
		margin-top: 15upx;
	}
	.mount{
		margin-left: 15upx;
		text-align: right;
		padding-top: 20upx;
	}
	.btn-box{position: absolute;
	right: 0;
	bottom: 0;
		text-align: right;
	}
	.btn{
		height: 75upx;
		border-radius: 75upx;
		text-align: center;
		line-height: 75upx;
		color: white;
		font-size: 28upx;
		padding: 0 25upx;
		display: inline-block;
		background-color: white;
		margin-left: 15upx;
	}
	.btn1{
		border: 1px solid #dfdfdf !important;
		color: #7f7f7f !important;
	}
	.btn2{
		border: 1px solid #ffadb1 !important;
		color: #ff6f75 !important;
	}
	.bottom-content{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	
	.overall-title{
		margin: 0 10upx;
	}
	
	.bottom{
		position: fixed;
		left: 0;
		bottom: 50px;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:20upx 40upx;
		background-color: #fff;
		border: 1px solid #f1f1f1;
	}
	.bottom-right button{
		margin-left: 15upx;
	}
	.bottom-right button,
	.bottom-right text{
		display: inline-block;
		vertical-align: middle;
	}
	.bottom-right{
		flex: 1;
		text-align: right;
	}
	.arrow{
		color: #ccc;
	}
	.r-cb{
		display: flex;
	}
</style>
