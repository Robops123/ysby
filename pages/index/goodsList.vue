<template>
	<view>
		<view class="nav-bar">
			<view class="nav nav-left" :class="{active:active==1}" @click="toggle(1)"><text>综合</text></view>
			<view class="nav nav-right" :class="{active:active==2}" @click="toggle(2)"><text>最新</text></view>
			<view class="nav nav-left" :class="{active:active==3}" @click="toggle(3)">
				<text style="display: inline-block;vertical-align: middle;margin-right: 20upx;">价格</text>
				<view style="display: inline-block;vertical-align: middle;" class="range">
				<text class="icon-arrowup iconfont" :class="{active:rangeActive==1}"></text>
				<text class="icon-arrowdown-copy iconfont" :class="{active:rangeActive==2}" ></text>
				</view>
			</view>
			<view class="nav nav-right" :class="{active:active==4}" @click="toggle(5)"><text>热卖</text></view>
		</view>
		
		<scroll-view scroll-y="true" class="content" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
			<view class="box">
				<view class="list" v-for="(item,index) in dataList" :key='index' @click="to('goodsDetail',item.id)">
					<image :src="item.thumb" mode=""></image>
					<view class="word">
						<view class="s3 ellipsis">{{item.title}}</view>
						<view class="s5 cr word-bottom">
							<view>￥{{item.marketprice}}</view>
							<view class="buy fr">
								<image src="../../static/img/pic/cart.png" mode=""></image>
							</view>
						</view>
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
		data(){
			return{
				url:'',
				active:1,
				rangeActive:'',
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
			this.url='&r=api.goods&page='+this.page+'&pagesize='+this.pageSize+'&sort='+this.active
			this.getList(this.page)
			setTimeout(function(){
				that.$getHeight('#sv',(res) =>{
					that.sh=res
				})
			},0)
		},
		methods:{
			to(w,id){
				uni.navigateTo({
					url:`/pages/index/${w}?id=${id}`
				})
			},
			toggle(t){
				this.active=t
				this.reset()
				this.getList(this.page)
			},
			toggleRange(t){
				this.rangeActive=t
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			reset(){
				this.page=1
				this.total=0
				this.dataList=[]
				this.more=''
				if(this.active!=3){
					this.rangeActive=''
					this.url='&r=api.goods&page='+this.page+'&pagesize='+this.pageSize+'&sort='+this.active
				}else{
					this.rangeActive= this.rangeActive == 1 ? 2:1
					if(this.rangeActive==1){
						this.url='&r=api.goods&page='+this.page+'&pagesize='+this.pageSize+'&sort='+3
					}else if(this.rangeActive==2){
						this.url='&r=api.goods&page='+this.page+'&pagesize='+this.pageSize+'&sort='+4
					}
				}
			},
			getList(p){
				var that=this
				// var params={
				//   page:p,
				//   pagesize: this.pageSize
				// }
				if(this.page==1){
					this.$loading()
				}
				  // var url='/wangtosale_list'
				  this.$apiPost(this.url).then((res) =>{
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
		}
	}
</script>

<style>
	.nav-bar{
		border-top: 20upx solid #f3f3f3;
		padding: 20upx 0;
		text-align: center;
	}
	.nav{
		color: #afafaf;
		display: inline-block;
		width: 25%;
		box-sizing: border-box;
	}
	.nav.active>text{
		color: #000000;
		position: relative;
	}
	.nav.active>text::before{
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
		box-sizing: border-box;
		padding: 0 20upx;
		background-color: #f3f3f3;
	}
	.box{
		margin-top: 20upx;
	}
	.list:nth-of-type(odd){
		margin-right: 2%;
	}
	.list{
		display: inline-block;
		vertical-align: top;
		border-radius: 10upx;
		overflow: hidden;
		width: 49%;
		background-color: #fff;
		margin-bottom: 20upx;
	}
	.list image{
		width: 100%;
		height: 380upx;
	}
	.list .word .ellipsis{
		margin-bottom: 15upx;
	}
	.list .word{
		padding: 5upx 20upx  20upx ;
	}
	
	.range{
		display: inline-block;
		vertical-align: middle;
		margin-left: 15upx;
	}
	.range>.iconfont{
		font-size: 24upx;
		display: block;
		transform: scale(2);
	}
	.range>text.active{
		color: #000000;
	}
	.buy image{
		width: 60upx;
		height: 60upx;
		padding: 10upx;
	}
	.word-bottom>view{
		display: inline-block;
		vertical-align:-webkit-baseline-middle;
	}
</style>
