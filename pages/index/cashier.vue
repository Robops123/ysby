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
					<radio value="wxpay" :checked="type=='wxpay'" class="fr" style="transform:scale(0.7)"/>
				</view>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<template v-if="providerList.length > 0">
				<view class="padding" v-for="(item,index) in providerList" :key="index"   >
					<image src="../../static/img/pic/other/alipay.png" mode="" v-if='item.id=="alipay"'></image>
					<image src="../../static/img/pic/other/wxpay.png" mode="" v-if='item.id=="wxpay"'></image>
					<image src="../../static/img/pic/other/applepay.png" mode="" v-if='item.id=="appleiap"'></image>
					<text>{{item.name}}</text>
					<radio :value="item.id" :checked="type=='item.id'" class="fr" style="transform:scale(0.7)"/>
				</view>
				</template>
				<!-- #endif -->
			</radio-group>
		</view>
		
		<!-- <view style="text-align: center;">
			<button type="default" class="btn" @click="to('payResult')" :loading="loading">支付</button>
		</view> -->
	</view>
</template>

<script>
	export default{
		data(){
			return {
				type:'',
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
				
				// uni.navigateTo({
				// 	url:'./payResult'
				// })
			},
			radioChange(e){
				this.type=e.detail.value
				// if(this.type=='wxpay'){
				// 	this.weixinPay()
				// }else{
					this.requestPayment(this.type)
				// }
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
						this.type=this.providerList[0].id || 'wxpay'
						this.$forceUpdate()
				    },
				    fail: (e) => {
				        console.log("获取支付通道失败：", e);
				    }
				});
				// #endif
			},
			weixinPay() {
			    console.log("发起支付");
			    this.loading = true;
			    uni.login({
			        success: (e) => {
			            console.log("login success", e);
			            uni.request({
			                url: `https://unidemo.dcloud.net.cn/payment/wx/mp?code=${e.code}&amount=${this.price}`,
			                success: (res) => {
			                    console.log("pay request success", res);
			                    if (res.statusCode !== 200) {
			                        uni.showModal({
			                            content: "支付失败，请重试！",
			                            showCancel: false
			                        });
			                        return;
			                    }
			                    if (res.data.ret === 0) {
			                        console.log("得到接口prepay_id", res.data.payment);
			                        let paymentData = res.data.payment;
			                        uni.requestPayment({
			                            timeStamp: paymentData.timeStamp,
			                            nonceStr: paymentData.nonceStr,
			                            package: paymentData.package,
			                            signType: 'MD5',
			                            paySign: paymentData.paySign,
			                            success: (res) => {
			                                uni.showToast({
			                                    title: "感谢您的赞助!"
			                                })
			                            },
			                            fail: (res) => {
			                                uni.showModal({
			                                    content: "支付失败,原因为: " + res
			                                        .errMsg,
			                                    showCancel: false
			                                })
			                            },
			                            complete: () => {
			                                this.loading = false;
			                            }
			                        })
			                    } else {
			                        uni.showModal({
			                            content: res.data.desc,
			                            showCancel: false
			                        })
			                    }
			                },
			                fail: (e) => {
			                    console.log("fail", e);
			                    this.loading = false;
			                    uni.showModal({
			                        content: "支付失败,原因为: " + e.errMsg,
			                        showCancel: false
			                    })
			                }
			            })
			        },
			        fail: (e) => {
			            console.log("fail", e);
			            this.loading = false;
			            uni.showModal({
			                content: "支付失败,原因为: " + e.errMsg,
			                showCancel: false
			            })
			        }
			    })
			},
			async requestPayment(e) {
			    this.loading = true;
			    let orderInfo = await this.getOrderInfo(e);
				console.log(orderInfo)
			    console.log("得到订单信息", orderInfo);
			    if (orderInfo.statusCode !== 200) {
			        console.log("获得订单信息失败", orderInfo);
			        uni.showModal({
			            content: "获得订单信息失败",
			            showCancel: false
			        })
			        return;
			    }
			    uni.requestPayment({
			        provider: e,
			        orderInfo: orderInfo.data,
			        success: (e) => {
			            console.log("success", e);
			            uni.showToast({
			                title: "感谢您的赞助!"
			            })
			        },
			        fail: (e) => {
			            console.log("fail", e);
			            uni.showModal({
			                content: "支付失败,原因为: " + e.errMsg,
			                showCancel: false
			            })
			        },
			        complete: () => {
			            this.loading = false;
			        }
			    })
			},
			getOrderInfo(e) {
			    let appid = "";
			    // #ifdef APP-PLUS
			    appid = plus.runtime.appid;
			    // #endif
			    let url = 'https://demo.dcloud.net.cn/payment/?payid=' + e + '&appid=' + appid + '&total=' + this.price;
			    return new Promise((res) => {
			        uni.request({
			            url: url,
			            success: (result) => {
			                res(result);
			            },
			            fail: (e) => {
			                res(e);
			            }
			        })
			    })
			},
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
