<template>
	<view style="padding-bottom: 110upx;">
		<view class="top">
			<view>
				<view class="process" v-if='data.status=="1"'>订单未支付</view>
				<view class="process" v-if='data.status=="2"'>等待卖家发货</view>
				<view class="process" v-if='data.status=="3"'>卖家已发货</view>
				<view class="process" v-if='data.status=="4"'>订单已取消</view>
				<view class="process" v-if='data.status=="5"'>买家已收货，待评论</view>
				<view class="process" v-if='data.status=="6"'>订单已完成</view>
				<view class="process" v-if='data.status=="7"'>等待商家退款</view>
				<view class="process" v-if='data.status=="8"'>退款成功</view>
			</view>
			<image src="../../static/img/pic/shape2.png" mode=""></image>
		</view>
		<view class="about padding margin bgwhite">
			<view class="icon-fire iconfont"></view>
			<view class="s3">
				<view>{{data.contact}}  {{data.mobile}}</view>
				<view style="margin-top: 10upx;">{{data.address}}</view>
			</view>
		</view>
		
		<view class="child-overall-item padding bgwhite" v-for='(item,index) in data.goods' :key='index'>
			<image :src="item.goodspic" mode=""></image>
			<view class="info">
				<view>
					<view class="s2 title">
						{{item.goodsname}}
					</view>
					<view class="s3 cg options">
						{{item.specifications}}<icon type="" class="icon-fire iconfont"></icon>
					</view>
				</view>
				<view class="s3" style="text-align: right;">
					<view class="">￥{{item.goodsprice}}</view>
					<view class=" cg">*{{item.amount}}</view>
				</view>
			</view>
		</view>
		
		<view class="padding bgwhite margin">
				<view class="" >
					<text class="">商品小计</text>
					<text class="fr">{{data.totalprice}}元</text>
				</view>
				<view class="margin">
					<text class="">运费</text>
					<text class="fr">{{data.freight}}元</text>
				</view>
				<view class="margin" >
					<text class="">实付费(含运费)</text>
					<text class="fr cr">{{data.totalpricereal}}元</text>
				</view>
		</view>
		<view class="padding bgwhite">
				<view class="">
					<text class="pre">订单编号: </text>
					<text class=""> {{data.orderno}}</text>
				</view>
				<view class="">
					<text class="pre">创建时间: </text>
					<text class=""> {{data.createtime}}</text>
				</view>
				<view class="">
					<text class="pre">支付时间: </text>
					<text class=""> {{data.paytime}}</text>
				</view>
		</view>
		<view class="btn-box bgwhite" >
			<button type="default" class="btn" @click="toDrawback">申请退款</button>
			<!-- <button type="default" class="btn">确认收货</button> -->
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
			uid:'',
				token:'',
				orderno:'',
				data:{}
			}
		},
		onLoad(p){
			var userInfo=uni.getStorageSync('userInfo')
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.uid=userInfo.uid
				this.token=userInfo.token
			}
			this.orderno=p.orderno
			this.getDetail()
		},
		methods:{
			toDrawback(){
				uni.navigateTo({
					url:'/pages/drawback/chooseWay?orderno='+this.orderno+'&goods='+JSON.stringify(this.data.goods)
				})
			},
			getDetail(){
				this.$loading()
				var that=this
				var params={
					uid:this.uid,
					token:this.token,
					orderno:this.orderno
				}
				var url='&r=api.member.order.detail'
				  this.$apiPost(url,params).then((res) =>{
					uni.hideLoading()
					that.data=res.data
				  })
			}
		}
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
	.top{
		display: flex;
		align-items: center;
		padding: 30upx 30upx 40upx;
		justify-content: space-between;
		background: #ff757b;
		color: white;
	}
	.top image{
		width: 90upx;
		height: 90upx;
	}
	.process{
		font-size: 34upx;
		line-height: 40upx;
	}
	.intro{
		font-size: 26upx;
	}
	.margin{
		margin: 20upx 0;
	}
	.bgwhite{
		background-color: #fff;
	}
	.about>.iconfont{
		margin-right: 30upx;
	}
	.about>view{
		display: inline-block;
		vertical-align: middle;
	}
	.child-overall-item,
	.overall{
		display: flex;
		justify-items: center;
	}
	.child-overall-item>image{
		width: 150upx;
		height: 150upx;
		margin-right: 20upx;
	}
	.child-overall-item .title{
		margin-top: 10upx;
		width: 360upx;
		/* height: 64upx; */
		overflow:hidden;//一定要写
		    text-overflow: ellipsis;//超出省略号
		    display:-webkit-box;//一定要写
		    -webkit-line-clamp: 2;//控制行数
		    -webkit-box-orient: vertical;//一定要写
	}
	.info{
		display: flex;
		flex: 1;
		justify-content: space-between;
	}
	.options{
		margin: 25upx 0 0;
	}
	.pre{
		margin-right: 20upx;
	}
	.btn-box{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 20upx 30upx 20upx 0;
		text-align: right;
		box-sizing: border-box;
	}
	.btn{
		width: 220upx;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		border: 1px solid #e0e0e0 !important;
		font-size: 30upx;
		display: inline-block;
		margin-left: 40upx;
		border-radius: 70upx;
		background-color: #fff !important;
	}
</style>
