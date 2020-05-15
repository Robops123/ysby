<template>
	<view>
		<view class="child-overall-item padding bgwhite margin" v-for="(item,index) in goods" :key='index'>
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
			</view>
		</view>
		
		<view class="padding bgwhite choice" @click="to('moneyBack')">
			<image src="../../static/img/pic/other/tk.png" mode=""></image>
			<view class="s2">
				<view>我要退款(无需退货)</view>
				<view class="cg des">没收到货,或与卖家协商同意不用退货只退款</view>
			</view>
			<view class="iconfont icon-fire fr"></view>
		</view>
		<view class="padding bgwhite choice" @click="to('goodsBack')">
			<image src="../../static/img/pic/other/th.png" mode=""></image>
			<view class="s2">
				<view>我要退货退款</view>
				<view class="cg des">已收到货,需要退还收到的货物</view>
			</view>
			<view class="iconfont icon-fire fr"></view>
		</view>
	</view>
</template>

<script>
	export default{
		components:{
		},
		data(){
			return {
				orderno:'',
				goods:[]
			}
		},
		onLoad(p){
			this.orderno=p.orderno
			this.goods=JSON.parse(p.goods)
		},
		methods:{
			to(w){
				uni.navigateTo({
					url:`/pages/drawback/${w}`
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
	.margin{
		margin: 20upx 0;
	}
	.bgwhite{
		background-color: #fff;
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
		width: 500upx;
		/* height: 64upx; */
		overflow:hidden;//一定要写
		    text-overflow: ellipsis;//超出省略号
		    display:-webkit-box;//一定要写
		    -webkit-line-clamp: 2;//控制行数
		    -webkit-box-orient: vertical;//一定要写
	}
	.choice:not(:last-child){
		border-bottom: 1px solid #dedede;
	}
	.choice>image{
		height: 50upx;
		width: 50upx;
		margin-right: 40upx;
	}
	.choice .iconfont{
		margin-top: 20upx;
	}
	.choice .des{
		margin-top: 10upx;
	}
	.choice>image,
	.choice>view{
		display: inline-block;
		vertical-align: top;
	}
</style>
