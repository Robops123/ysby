<template>
	<view>
		<view class=" margin">
			<view class="border-bottom padding">
				<text>订单编号</text>
				<text class="fr">{{orderno}}</text>
			</view>
			<view class="padding">
				<text>订单金额</text>
				<text class="fr cr">￥{{money}}</text>
			</view>
		</view>
		
		<view class="payway">
			<radio-group @change="radioChange">
				<!-- #ifdef MP-WEIXIN || MP-QQ -->
				<view class="padding border-bottom">
					<image src="../../static/img/pic/other/wxpay.png" mode=""></image>
					<text>微信支付</text>
					<radio value="wxpay" :checked="type=='wxpay'" class="fr" style="transform:scale(0.7)"/>
				</view>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<template v-if="providerList.length > 0">
				<view class="padding border-bottom" v-for="(item,index) in providerList" :key="index"   >
					<image src="../../static/img/pic/other/alipay.png" mode="" v-if='item.id=="alipay"'></image>
					<image src="../../static/img/pic/other/wxpay.png" mode="" v-if='item.id=="wxpay"'></image>
					<image src="../../static/img/pic/other/applepay.png" mode="" v-if='item.id=="appleiap"'></image>
					<text>{{item.name}}</text>
					<radio :value="item.id" :checked="type=='item.id'" class="fr" style="transform:scale(0.7)"/>
				</view>
				</template>
				<!-- #endif -->
				<!-- 余额？ -->
				<view class="padding border-bottom">
					<image src="../../static/img/pic/other/ye.png" mode=""></image>
					<text>余额支付</text>
					<radio value='rest' class="fr" style="transform:scale(0.7)"/>
				</view>
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
				uid:'',
				token:'',
				type:'',
				platform:'',
				contact:'',
				money:'',
				orderno:'',
				loading: false,
				price: 0.01,
				providerList: []
			}
		},
		onLoad(p){
			this.platform=uni.getSystemInfoSync().platform
			var userInfo=uni.getStorageSync('userInfo')
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.uid=userInfo.uid
				this.token=userInfo.token
			}
			this.contact=p.contact
			this.orderno=p.orderId
			this.money=p.money
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
				console.log(this.type)
				if(this.type=='rest'){
					uni.showModal({
						title:'提示',
						content:'确认使用余额支付吗',
						success:(e) =>{
							if(e.confirm){
								this.restPay()
							}
						}
					})
				}else{
					let method=this.providerList.filter((item) => {return item.id==this.type}),way
					if(method.length>0){
						way=method[0].name
					}else{
						way='微信'
					}
					uni.showModal({
						title:'提示',
						content:'确认使用'+way+'支付吗',
						success:(e) =>{
							if(e.confirm){
								// #ifdef APP-PLUS
								this.requestPayment(this.type)
								// #endif
								// #ifdef MP
								this.weixinPay()
								// #endif
							}
						}
					})
				}
				
				
				// if(this.type=='wxpay'){
				// 	this.weixinPay()
				// }else{
					// 
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
			    this.loading = true;
				var that=this
			    uni.login({
					 provider: 'weixin',
			        success: (e) => {
			            console.log("login success", e);
						// let params={
						// 	code:e.code,
						// }
			            uni.request({
			                url: `https://www.wxzdhy.cn/app/index.php?i=2&c=entry&m=zhonghong_zhihui&do=mobile&r=api.order.pay&code=${e.code}&orderno=${that.orderno}&uid=${that.uid}&token=${that.token}&type=2`,
							method:'GET',
			                success: (res) => {
			                    console.log("pay request success", res);
			                    if (res.statusCode !== 200) {
			                        uni.showModal({
			                            content: "支付失败，请重试！",
			                            showCancel: false
			                        });
			                        return;
			                    }
			                    if (res.data.state === 200) {
			                        console.log("得到接口prepay_id", res.data);
			                        let paymentData = res.data;
			                        uni.requestPayment({
										provider:'wxpay',
			                            timeStamp: paymentData.timeStamp,
			                            nonceStr: paymentData.nonceStr,
			                            package: paymentData.package,
			                            signType: 'MD5',
			                            paySign: paymentData.paySign,
			                            success: (res) => {
			                                uni.$emit('updateOrder')
			                                setTimeout(function(){
			                                	uni.redirectTo({
			                                		url:'./payResult?contact='+that.contact+'&money='+that.money+'&orderno='+that.orderno
			                                	})
			                                },1000)
			                            },
			                            fail: (res) => {
			                                uni.showModal({
			                                    content: "支付失败",
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
			                        content: "支付失败",
			                        showCancel: false
			                    })
			                }
			            })
			        },
			        fail: (e) => {
			            console.log("fail", e);
			            this.loading = false;
			            uni.showModal({
			                content: "支付失败",
			                showCancel: false
			            })
			        }
			    })
			},
			async requestPayment(e) {
				var that=this
				this.$loading()
			    this.loading = true;
			    let orderInfo = await this.getOrderInfo(e);
			    // if (orderInfo.statusCode !== 200) {
			    //     console.log("获得订单信息失败", orderInfo);
			    //     uni.showModal({
			    //         content: "获得订单信息失败",
			    //         showCancel: false
			    //     })
			    //     return;
			    // }
				console.log(orderInfo)
			    uni.requestPayment({
			        provider: e,
					orderInfo:orderInfo.data,
			        success: (e) => {
						uni.hideLoading()
			            uni.$emit('updateOrder')
			            setTimeout(function(){
			            	uni.redirectTo({
			            		url:'./payResult?contact='+that.contact+'&money='+that.money+'&orderno='+that.orderno
			            	})
			            },1000)
			        },
			        fail: (e) => {
			            uni.showModal({
			                content: "支付失败",
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
			    // let url = 'https://demo.dcloud.net.cn/payment/?payid=' + e + '&appid=' + appid + '&total=' + this.price;
				// let url='http://www.wxzdhy.cn/app/index.php?i=2&c=entry&m=zhonghong_zhihui&do=mobile&r=api.member.order.payOrder'
				let url='http://www.wxzdhy.cn/app/index.php?i=2&c=entry&m=zhonghong_zhihui&do=mobile&r=api.member.order.payOrder'
				let params={
					uid:this.uid,
					token:this.token,
					type:e,
					orderno:this.orderno
				}
				// console.log(params)
			    return new Promise((res) => {
			        uni.request({
			            url: url,
						data:params,
						// method:'get',
			            success: (result) => {
							uni.hideLoading()
			                res(result);
			            },
			            fail: (e) => {
							uni.hideLoading()
			                res(e);
			            }
			        })
			    })
			},
			restPay(){
				this.$loading()
				var that=this
				var params={
					uid:this.uid,
					token:this.token,
					orderno:this.orderno
				}
				var url='&r=api.member.order.pay'
				  this.$apiPost(url,params).then((res) =>{
					uni.hideLoading()
					that.$msg('支付成功')
					setTimeout(function(){
						uni.$emit('updateOrder')
						uni.redirectTo({
							url:'./payResult?contact='+that.contact+'&money='+that.money+'&orderno='+that.orderno
						})
					},1000)
				  })
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
