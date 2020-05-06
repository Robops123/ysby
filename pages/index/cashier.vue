<template>
	<view>
		<view class=" margin">
			<view class="border-bottom padding">
				<text>订单编号</text>
				<text class="fr">DSADAS232131231232331</text>
			</view>
			<view class="padding">
				<text>订单金额</text>
				<text class="fr cr">$45.00</text>
			</view>
		</view>
		
		<view class="payway">
			<radio-group @change="radioChange">
				<!-- #ifdef MP-WEIXIN || MP-QQ -->
				<view class="padding">
					<image src="../../static/img/pic/other/wxpay.png" mode=""></image>
					<text>微信支付</text>
					<radio value="1"  class="fr" style="transform:scale(0.7)"/>
				</view>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<template v-if="providerList.length > 0">
				<view class="padding" v-for="(item,index) in providerList" :key="index" @click="requestPayment(item,index)"  :loading="item.loading">
					<image src="../../static/img/pic/other/alipay.png" mode=""></image>
					<text>支付宝</text>
					<radio value="2"  class="fr" style="transform:scale(0.7)"/>
				</view>
				</template>
				<!-- #endif -->
			              
						 
			            </radio-group>
		</view>
		
		<view style="text-align: center;">
			<button type="default" class="btn" @click="to('payResult')">支付</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				platform:'',
				loading: false,
				price: 1,
				providerList: []
			}
		},
		mounted(){
			this.platform=uni.getSystemInfoSync().platform
			this.getProviders()
		},
		methods:{
			to(w){
				uni.navigateTo({
					url:'./payResult'
				})
			},
			getProviders(){
				// #ifdef APP-PLUS
				uni.getProvider({
				    service: "payment",
				    success: (e) => {
				        console.log("payment success:" + JSON.stringify(e));
				        let providerList = [];
				        e.provider.map((value) => {
				            switch (value) {
				                case 'alipay':
				                    providerList.push({
				                        name: '支付宝',
				                        id: value,
				                        loading: false
				                    });
				                    break;
				                case 'wxpay':
				                    providerList.push({
				                        name: '微信',
				                        id: value,
				                        loading: false
				                    });
				                    break;
									case 'appleiap':
									    providerList.push({
									        name: '苹果支付',
									        id: value,
									        loading: false
									    });
									    break;
				                default:
				                    break;
				            }
				        })
				        this.providerList = providerList;
				    },
				    fail: (e) => {
				        console.log("获取支付通道失败：", e);
				    }
				});
				// #endif
			}
		}
	}
</script>

<style>
	page{
		background: #f3f3f3;
	}
	.margin{
		margin: 20upx 0;
		background-color: #fff;
	}
	.border-bottom{
		border-bottom:1px solid #ededed; 
	}
	.payway{
		background-color: #fff;
	}
	.payway image{
		width: 60upx;
		height: 60upx;
		margin-right: 30upx;
	}
	.payway image,
	.payway text,
	.payway radio{
		display: inline-block;
		vertical-align: middle;
	}
	.payway radio{
		margin-top: 10upx;
	}
	.btn{
		width: 80%;
		height: 75upx;
		background: #ff6d7e !important;
		border-radius: 0;
		margin: 80upx auto 0;
		text-align: center;
		line-height: 75upx;
		letter-spacing: 4px;
		color: white;
		font-size: 34upx;
	}
</style>
