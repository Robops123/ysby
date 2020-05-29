<template>
	<view class="main-bg-color">
		<view class="top">
			<view>
				<view class="process" v-if="data.status=='1'">等待买家支付</view>
				<view class="process" v-if="data.status=='2'">等待卖家发货</view>
				<view class="process" v-if="data.status=='3'">等待买家收货</view>
				<view class="process" v-if="data.status=='4'">订单已取消</view>
				<view class="process" v-if="data.status=='5'">买家已收货，待评论</view>
				<view class="process" v-if="data.status=='6'">订单已完成</view>
				<view class="intro">订单金额(含运费):￥{{data.totalprice}}</view>
			</view>
			<image src="../../../static/img/pic/shape1.png" mode=""></image>
		</view>
		<view class="activity">
				<view class="lh1">
					<text class="c2">订单编号: </text>
					<text class="fr">{{data.orderno}}</text>
				</view>
				<view class="lh1">
					<text class="c2">订单状态: </text>
					<text class="fr payway" v-if="data.status=='1'">待支付</text>
					<text class="fr payway" v-if="data.status=='2'">待发货</text>
					<text class="fr payway" v-if="data.status=='3'">待收货</text>
					<text class="fr payway" v-if="data.status=='4'">已取消</text>
					<text class="fr payway" v-if="data.status=='5'">待评论</text>
					<text class="fr payway" v-if="data.status=='6'">已完成</text>
				</view>
				<view class="lh1">
					<text class="c2">支付方式: </text>
					<text class="fr" v-show="data.paytype=='1'">微信</text>
					<text class="fr" v-show="data.paytype=='2'">支付宝</text>
					<text class="fr" v-show="data.paytype=='3'">余额</text>
				</view>
				<view class="lh1">
					<text class="c2">配送状态: </text>
					<text class="fr " v-if="data.delivery=='1'">快递</text>
					<text class="fr " v-if="data.delivery=='2'">自提</text>
					<text class="fr " v-if="data.delivery=='3'">其他</text>
				</view>
		</view>
		
		<view class="activity">
			<view class="margin1" >
				<image src="../../../static/img/pic/address.png" mode="" class="pre-img"></image>
				<text class="">收件信息</text>
				<view class="fr cr" @click="openchange">修改
				<image src="../../../static/img/pic/more.png" mode="" class="right-arrow"></image></view>
			</view>
				<view class="margin1" >
					<text class="c2">收件人：</text>
					<text class="fr">{{data.contact}}</text>
				</view>
				<view class="margin1">
					<text class="c2">联系电话：</text>
					<text class="fr">{{data.addrmobile}}</text>
				</view>
				<view class="margin1" @click="toPromoteFee">
					<text class="c2">收货地址：</text>
					<text class="fr">{{data.address}}</text>
				</view>
		</view>
		
		
		<view class=" activity">
			<view class="margin1" >
				<image src="../../../static/img/pic/info.png" mode="" class=" pre-img pre-img2"></image>
				<text class="">会员信息</text>
			</view>
			<view class="content">
				<view class="img">
					<image :src="data.avatar" mode="" ></image>
				</view>
					<view class="s1">
						<view class="">{{data.nickname}}</view>
						<view class="  s1">手机号：{{data.usermobile}}</view>
					</view>
					<!-- <view class="fr cg">
						<text class="icon-arrow-right iconfont"></text>
					</view> -->
			</view>
		</view>
		
		
		<view class="activity">
			<view class="margin1" >
				<image src="../../../static/img/pic/goods.png" class="pre-img" mode=""></image>
				<text class="">订单商品</text>
				<text class="fr">(价格单位:元)</text>
			</view>
			
			<view class="content" v-for="(item,index) in data.goods" :key='index'>
				<view class="img">
					<image :src="item.goodspic" mode=""></image>
				</view>
					<view class="s1 ellipsis">
						<view class="limit-text">{{item.goodsname}}</view>
						<view class="s2 cg">
							<text class="limit-text">规格:<text class="s3 ">{{item.specifications ? item.specifications:'无规格'}}</text></text>
						</view>
						<view class="s2 cg">
							<text class="limit-text">单价/数量:<text class="s3 ">{{item.goodsprice}}*{{item.amount}}</text></text>
						</view>
					</view>
			</view>
		</view>
		
		
		<view class="activity">
			<view class=" bottom-border" >
				<text class="cg">商品小计</text>
				<text class="fr">￥{{data.totalprice}}</text>
			</view>
			<view class=" bottom-border" >
				<text class="cg">运费</text>
				<text class="fr">￥{{data.freight}}</text>
			</view>
			<view class=" bottom-border" >
				<text class="cg">实付费(含运费)</text>
				<text class="fr">￥{{data.totalpricereal}}</text>
			</view>
		</view>
		
		
		<view class="activity">
			<view class=" " >
				<text class="cg">下单时间：</text>
				<text class="">{{data.createtime}}</text>
			</view>
			<view class=" " >
				<text class="cg">支付时间：</text>
				<text class="">{{data.paytime ? data.paytime:'未支付'}}</text>
			</view>
		</view>
		
		<view class="s3 cg" style="text-align: center;padding: 30upx 0 40upx;background-color: #F3F3F3;">更多设置请到PC端后台</view>
		
		<!-- <view class="btn-box">
			<button class="btn">确认收货</button>
		</view> -->
		
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
		
		<!-- 修改信息 -->
		<prompt :visible.sync="promptVisible"  :title='"修改备注"' :useDefault="false" class="change-table"
		  @confirm="clickPromptConfirm" mainColor="#ff6d7e">
		  <!-- 这里放入slot内容-->
		  <view class="line">
			  <text>收件人</text>
			  <input type="text" v-model="form.contact" />
		  </view>
		  <view class="line">
		  			  <text>联系电话</text>
		  			  <input type="text" v-model="form.mobile" />
		  </view>
		  <view class="line">
		  			  <text>收件地址</text>
		  			  <input type="text" v-model="form.address" />
		  </view>
		</prompt>
	</view>
</template>

<script>
	import Prompt from '@/components/zz-prompt/index.vue'
	export default{
		components:{
			Prompt
		},
		data(){
			return{
				promptVisible:false,
				data:{},
				orderno:'',
				uid:'',
				token:'',
				form:{
					contact:'',
					mobile:'',
					address:''
				}
			}
		},
		onLoad(p){
			var userInfo=uni.getStorageSync('userInfo'),that=this
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.uid=userInfo.uid
				this.token=userInfo.token
			}
			this.orderno=p.orderno
			this.getDetail()
		},
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
			},
			openchange(){
				this.form={
					contact:this.data.contact,
					mobile:this.data.addrmobile,
					address:this.data.address
				}
				this.promptVisible=true
			},
			clickPromptConfirm(){
				this.$loading()
				var that=this
				var params={
				  uid:this.uid,
				  token:this.token,
				  orderno:this.orderno,
				  contact:this.form.contact,
				  mobile:this.form.mobile,
				  address:this.form.address
				}
				  var url='&r=api.myshop.orders.changeAddr'
				  this.$apiPost(url,params).then((res) =>{
					  that.$msg('修改成功')
					  uni.hideLoading()
					  setTimeout(function(){
						  that.promptVisible=false
						  that.getDetail()
					  },500)
				  })
			},
			getDetail(){
				this.$loading()
				var that=this
				var params={
				  uid:this.uid,
				  token:this.token,
				  orderno:this.orderno,
				}
				  var url='&r=api.myshop.orders.detail'
				  this.$apiPost(url,params).then((res) =>{
					  that.data=res.data
					  uni.hideLoading()
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
				
				.change-table .line{
					margin: 20upx 0;
				}
				.change-table .line text,
				.change-table .line input{
					display: inline-block;
					vertical-align: middle;
				}
				.change-table .line text{
					width: 30%;
					margin-right: 5%;
				}
				.change-table .line input{
					width: 60%;
					border-bottom: 1px solid #c9c9c9;
				}
</style>
