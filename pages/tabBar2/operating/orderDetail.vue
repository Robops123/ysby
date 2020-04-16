<template>
	<view class="main-bg-color">
		<view class="top">
			<view>
				<view class="process">等待卖家发货</view>
				<view class="intro">订单金额(含运费):￥12.03</view>
			</view>
			<image src="../../../static/img/pic/shape1.png" mode=""></image>
		</view>
		<view class="activity">
				<view class="lh1">
					<text class="c2">订单编号: </text>
					<text class="fr"> EE2312321E21312E</text>
				</view>
				<view class="lh1">
					<text class="c2">订单状态: </text>
					<text class="fr payway">待发货</text>
				</view>
				<view class="lh1">
					<text class="c2">支付方式: </text>
					<text class="fr">微信支付</text>
				</view>
				<view class="lh1">
					<text class="c2">配送状态: </text>
					<text class="fr">快递</text>
				</view>
		</view>
		
		<view class="activity">
			<view class="margin1" >
				<image src="../../../static/img/pic/address.png" mode="" class="pre-img"></image>
				<text class="">收件信息</text>
				<view class="fr cr">修改
				<image src="../../../static/img/pic/more.png" mode="" class="right-arrow"></image></view>
			</view>
				<view class="margin1" >
					<text class="c2">收件人：</text>
					<text class="fr">许愿</text>
				</view>
				<view class="margin1">
					<text class="c2">联系电话：</text>
					<text class="fr">1877777777</text>
				</view>
				<view class="margin1" @click="toPromoteFee">
					<text class="c2">收货地址：</text>
					<text class="fr">江苏省无锡市滨湖区太湖大道100号</text>
				</view>
		</view>
		
		
		<view class=" activity">
			<view class="margin1" >
				<image src="../../../static/img/pic/info.png" mode="" class=" pre-img pre-img2"></image>
				<text class="">会员信息</text>
			</view>
			<view class="content">
				<view class="img">
					<image src="../../../static/img/pic/logo.png" mode="" ></image>
				</view>
					<view class="s1">
						<view class="">休息休息</view>
						<view class="  s1">手机号：213123123123</view>
					</view>
					<view class="fr cg">
						<text class="icon-arrow-right iconfont"></text>
					</view>
			</view>
		</view>
		
		
		<view class="activity">
			<view class="margin1" >
				<image src="../../../static/img/pic/goods.png" class="pre-img" mode=""></image>
				<text class="">订单商品</text>
				<text class="fr">(价格单位:元)</text>
			</view>
			
			<view class="content">
				<view class="img">
					<image src="../../../static/img/pic/logo.png" mode=""></image>
				</view>
					<view class="s1 ellipsis">
						<view class="limit-text">儿童木马瑶瑶马宝宝大叔大婶阿萨大师</view>
						<view class="s2 cg">
							<text class="limit-text">规格<text class="s3 ">深蓝色:24(155/60A)</text></text>
						</view>
						<view class="s2 cg">
							<text class="limit-text">单价/数量:<text class="s3 ">79.80*1</text></text>
						</view>
					</view>
			</view>
		</view>
		
		
		<view class="activity">
			<view class=" bottom-border" >
				<text class="cg">商品小计</text>
				<text class="fr">&79.80</text>
			</view>
			<view class=" bottom-border" >
				<text class="cg">运费</text>
				<text class="fr">&79.80</text>
			</view>
			<view class=" bottom-border" >
				<text class="cg">实付费(含运费)</text>
				<text class="fr">&79.80</text>
			</view>
		</view>
		
		
		<view class="activity">
			<view class=" " >
				<text class="cg">下单时间：</text>
				<text class="">2020-03-30 12:45:30</text>
			</view>
			<view class=" " >
				<text class="cg">支付时间：</text>
				<text class="">2020-03-30 12:45:30</text>
			</view>
		</view>
		
		<view class="s3 cg" style="text-align: center;padding: 30upx 0 40upx;background-color: #F3F3F3;">更多设置请到PC端后台</view>
		
		<view class="btn-box">
			<button class="btn">确认收货</button>
		</view>
		
		<!-- <view class="location">
			<icon type="" class="icon-fire iconfont"></icon>
			<view style="font-size: 28upx;">
				<view>许愿 1866666632</view>
				<view class="c2">北京市 北京辖区 朝阳区 100号</view>
			</view>
		</view>
		
		<view class="activity " style="display: flex;">
			<view class="left">
				<image src="../../../static/img/pic/logo.png" mode=""></image>
			</view>
			<view class="right">
				<view class="" style="padding-left: 20upx;width: 60%;">2020年春季蠡湖马拉松半马报名</view>
				<view class="c1-wrapper">
					<view class=" font1 c1">$160</view>
					<view class=" font2 c1">*10</view>
				</view>
			</view>
		</view> -->
		
		
	</view>
</template>

<script>
	export default{
		methods:{
			toFee(){
				uni.navigateTo({
					url:'/pages/myActivity/feeDetail'
				})
			},
			toPromoteFee(){
				uni.navigateTo({
					url:'/pages/myActivity/promoteFeeDetail'
				})
			}
		}
	}
</script>

<style>
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
		font-size: 32upx;
		line-height: 40upx;
	}
	.intro{
		font-size: 26upx;
	}
	.activity image{
		width: 105upx;
		height: 104upx;
		border-radius: 7upx;
	}
	.activity{
		padding: 15upx 30upx 15upx 20upx;
		font-size: 30upx;
		background: white;
		border-bottom: 20upx solid #f3f3f3;
	}
	.right{
		flex: 1;
		position: relative;
	}
	/* .left,.right{
		display: inline-block;
		vertical-align: top;
	} */
	.margin1:not(:last-child){
		margin-bottom: 35upx;
	}
	.location{
		border-top: 10upx solid #f3f3f3;
		padding: 20upx 40upx;
		background: white;
	}
	.location>view{
		display: inline-block;
		vertical-align: middle;
	}
	.location image{
		width: 25upx;
		height: 30upx;
		margin-right: 30upx;
	}
	.fr{
		float: right;
		}
		.font1{
			font-size: 26upx;
		}
		.font2{
			font-size: 34upx;
		}
		.c1-wrapper{
			position: absolute;
			top: 50%;
			right: 0;
			transform: translate(-20%,-30%);
		}
		.c1{
			color: #888;
			text-align: right;
		}
		.c2{
			color: #828282;
			margin-right: 40upx;
		}
		.lh1{
			line-height: 40upx;
		}
		
		.payway{
			margin-left: 38upx;
			border-radius: 24upx;
			background-color: #ff6d7e;
			padding: 0 10upx;
			color: white;
		}
		.content>view{
			display: inline-block;
			
			vertical-align: top;
		}
		.contant image{
			width: 90upx;
			height: 90upx;
			margin-right: 20upx;
		}
		.content .img{
			margin-right: 20upx;
		}
		.content .fr{
			float: right;
			margin-top: 35upx;
		}
		.bottom-border{
			padding: 15upx 0;
			margin: 15upx 0;
			border-bottom: 1px solid #f7f7f7;
			}
			.btn-box{
				padding: 20upx 0;
				text-align: right;
			}
			.btn{
				display: inline-block;
				font-size: 28upx;
				padding: 15upx 30upx;
				border-radius: 10upx;
				text-align: center;
				margin-right: 15upx;
				height: initial;
				line-height: initial;
				background-color: #ff6d7e !important;
				color: #fff !important;
				}
</style>
