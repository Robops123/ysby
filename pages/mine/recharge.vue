<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="cr manage" @click="toList">明细</view>
		<!-- #endif -->
		<view class=" margin">
			<view class="border-bottom padding">
				<text>充值金额</text>
				<input type="number" v-model="money" placeholder="请输入充值金额" class="fr" style="text-align: right;"/>
				<!-- <text class="fr">{{orderno}}</text> -->
			</view>
			<view class="padding">
				<text>账户金额</text>
				<text class="fr cr">￥{{price || 0}}</text>
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
				<view class="padding border-bottom" v-for="(item,index) in providerList" :key="index" >
					<image src="../../static/img/pic/other/alipay.png" mode="" v-if='item.id=="alipay"'></image>
					<image src="../../static/img/pic/other/wxpay.png" mode="" v-if='item.id=="wxpay"'></image>
					<image src="../../static/img/pic/other/applepay.png" mode="" v-if='item.id=="appleiap"'></image>
					<text>{{item.name}}</text>
					<radio :value="item.id" :checked="type==item.id" class="fr" style="transform:scale(0.7)"/>
				</view>
				</template>
				<!-- #endif -->
				<!-- 余额？ -->
			</radio-group>
		</view>
		
		<view style="text-align: center;">
			<button type="default" class="btn" @click="pay" :loading="loading">支付</button>
		</view>
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
				money:'',
				orderno:'',
				loading: false,
				price: 0,
				providerList: []
			}
		},
		onNavigationBarButtonTap(){
			this.toList()
		},
		onLoad(p){
			this.price=p.data
			this.platform=uni.getSystemInfoSync().platform
			var userInfo=uni.getStorageSync('userInfo')
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.uid=userInfo.uid
				this.token=userInfo.token
			}
			this.getProviders()
		},
		methods:{
			radioChange(e){
				this.type=e.detail.value
				// if(this.type=='rest'){
				// 	this.restPay()
				// }else{
					
				// }
				
				
				// if(this.type=='wxpay'){
				// 	this.weixinPay()
				// }else{
					// 
				// }
			},
			toList(){
				uni.navigateTo({
					url:`/pages/mine/rechargeList`
				})
			},
			pay(){
				let method=this.providerList.filter((item) => {return item.id==this.type})[0].name
				uni.showModal({
					title:'提示',
					content:'确认使用'+method+'支付吗',
					success:(e) =>{
						if(e.confirm){
							this.requestPayment(this.type)
						}
					}
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
				if(!this.money){
					this.$msg('请输入充值金额')
					return ;
				}
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
						that.$msg('充值成功')
						
						that.getUserInfo()
			            // uni.$emit('updateOrder')
			            // setTimeout(function(){
			            	// uni.redirectTo({
			            	// 	url:'./payResult?contact='+that.contact+'&money='+that.money+'&orderno='+that.orderno
			            	// })
			            // },1000)
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
				// let url='http://yuying.qinshaozhuanshu.cn/app/index.php?i=2&c=entry&m=zhonghong_zhihui&do=mobile&r=api.member.order.payOrder'
				let url='http://yuying.qinshaozhuanshu.cn/app/index.php?i=2&c=entry&m=zhonghong_zhihui&do=mobile&r=api.member.recharge.pay'
				let params={
					uid:this.uid,
					token:this.token,
					type:e,
					money:this.money
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
					uni.$emit('updateOrder')
					setTimeout(function(){
						uni.redirectTo({
							url:'./payResult?contact='+that.contact+'&money='+that.money+'&orderno='+that.orderno
						})
					},1000)
				  })
			},
			// 刷新余额
			getUserInfo(){
				var that=this
				var url='&r=api.member.my&uid='+this.uid+'&token='+this.token
				  this.$apiPost(url).then((res) =>{
					that.price=res.data.balance
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
		border-radius: 75upx;
		margin: 200upx auto 0;
		text-align: center;
		line-height: 75upx;
		letter-spacing: 4px;
		color: white !important;
		font-size: 34upx;
	}
	.manage{
		text-align: right;
		padding: 20upx ;
		box-sizing: border-box;
		background-color: #fff;
	}
</style>
