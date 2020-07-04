<template>
	<view style="background: white;">
		<scroll-view scroll-y id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
			<view class="list-item s5" v-for='(item,index) in dataList' :key='index'>
				<view class="">
					<view>
						{{item.status=='1' ? '充值失败':'充值成功'}}
					</view>
					<view>
						<text class="sm-gray">{{item.createtime}}</text>
					</view>
				</view>
				
				<view class=" cr"><text class="s3">￥</text>{{item.money}}</view>
			</view>
			<uni-load-more :status="more"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components:{
			uniLoadMore
		},
		data() {
			return {
				uid:'',
				totalCommission:'',
				token:'',
				active:0,
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
		methods: {
			toggleNav(t){
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
				  pagesize: this.pageSize,
				  uid:this.uid,
				  token:this.token,
				}
				if(this.page==1){
					this.$loading()
				}
				  var url='&r=api.member.recharge'
				  this.$apiPost(url,params).then((res) =>{
					  console.log(res)
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
	.tip{
		line-height: 90upx;
		padding-left: 20upx;
		color: white;
		background: linear-gradient(to right,#ff9da1,#ff7076);
	}
.nav-bar{
	display: flex;
	justify-content: space-around;
	line-height: 90upx;
}
.active{
	border-bottom: 2px solid #ff6d7e;
		color: #ff6d7e;
}
.sm-gray{
	color: #8f8f8f;
	font-size: 30upx;
}
.list-item{
	padding: 30upx 40upx 30upx 30upx;
	display: flex;
	/* border-bottom: 2px solid #e4e4e4; */
	justify-content: space-between;
	align-items: center;
}
.list-item>view{
	display: inline-block;
	vertical-align: middle;
	
}
.conclude{
	display: flex;
	justify-content: space-around;
	padding: 25upx 0;
	}
	.conclude view{
		text-align: center;
		
		line-height: 50upx;
	}
	.fr{
		float: right;
	}
</style>
