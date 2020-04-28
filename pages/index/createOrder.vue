<template>
	<view style="padding-bottom: 80upx;">
		<view class="margin padding s2">
			<text>收货地址</text>
			<text class="cg fr">
				北京市朝阳区10000号
					<text class="icon-arrow-right iconfont"></text>
			</text>
		</view>
		<view class="child-overall padding margin" v-for="(item,index) in 1" :key='index'>
			<view class="child-overall-item"> 
				<image src="../../static/img/bg/activity.png" mode=""></image>
				<view class="info">
					<view>
						<view class="s2 title">
							儿童木马麻木童儿儿童木马麻木童儿儿童木马麻木童儿儿童木马麻木童儿
							童儿儿童木马麻木童儿儿童木马麻木童儿童儿儿童木马麻木童儿儿童木马麻木童儿
						</view>
						<view class="s3 cg options">
							海蓝色；24(155/60A)
							<!-- <image src="../../static/img/pic/more3.png" mode="" class="down-arrow"></image> -->
						</view>
					</view>
					<view class="s3" style="text-align: right;">
						<view class="">$45.00</view>
						<view class=" cg">*1</view>
					</view>
				</view>
				
			</view>
			<view class="bottom-content">
				<text style="line-height: 60upx;">购买数量</text>
				<view class="calculator fr">
					<view class="calc minus">-</view>
					<text class="result">1</text>
					<view class="calc plus">+</view>
				</view>
			</view>
			<view style="text-align: right;margin: 70upx 0 0;">
				共1件商品 共计:<text class="cr">$45</text>
			</view>
		</view>
		
		<view class="margin padding msg">
			<text>买家留言</text>
			<textarea value="" maxlength="50" placeholder="50字以内(选填)"/>
		</view>
		
		<view class="padding conclude">
			<view>
				<text>商品小计</text>
				<text class='fr'>$45</text>
			</view>
			<view>
				<text>运费</text>
				<text class='fr'>$0.00</text>
			</view>
		</view>
		
		
		<view class="bottom">
			<view class="bottom-right" style="text-align: right;">
				<text class="s2 cg">共1件,</text>
				<text class="cg s1">合计:</text>
				<text class="cr" style="font-size: 34upx;">$21.45</text>
				<button type="warn" @click="to('cashier')">立即支付</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				form:{
					uid:'',
					token:'',
					merchid:'',
					goodsid:'',
					addressid:'',
					remark:'',
					specifications:'',
					amount:'',
					goodsprice:'',
					totalprice:''
				}
				
			}
		},
		onLoad(e){
			var userInfo=uni.getStorageSync('userInfo')
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.form.uid=userInfo.uid
				this.form.token=userInfo.token
			}
			var choosedSpec=JSON.parse(e.choosedSpec)
			this.form.merchid=e.merchId
			this.form.goodsid=e.goodsId
			this.form.amount=choosedSpec.selectNum
			this.form.specifications=choosedSpec.choosedid.join(',')
			this.form.goodsprice=choosedSpec.marketPrice
		},
		methods:{
			to(w){
				uni.navigateTo({
					url:'./cashier'
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
	.child-overall,.overall{
		padding: 20upx 15upx;
	}
	.child-overall:last-child{
		padding-bottom: 40upx;
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
		width: 360upx;
		/* height: 64upx; */
		margin-top: 10upx;
		overflow:hidden;//一定要写
		    text-overflow: ellipsis;//超出省略号
		    display:-webkit-box;//一定要写
		    -webkit-line-clamp: 2;//控制行数
		    -webkit-box-orient: vertical;//一定要写
	}
	.bottom-content{
		margin: 20upx 0;
	}
	.options{
		margin: 25upx 0 0;
	}
	.calculator text{
		display: inline-block;
		vertical-align: middle;
	}
	.calculator .calc,
	.calculator .result{
		display: inline-block;
		vertical-align: middle;
		width: 60upx;
		height: 60upx;
		font-size: 36upx;
		line-height: 60upx;
		text-align: center;
		border: 1px solid #e8e8e8;
	}
	.calculator .result{
		width: 80upx;
		text-align: center;
		border: 1px solid #e8e8e8;
	}
	.info{
		display: flex;
		flex: 1;
		justify-content: space-between;
	}
	.msg>text,
	.msg>textarea{
		display: inline-block;
		vertical-align: top;
	}
	.msg>text{
		margin-right: 30upx;
	}
	.msg>textarea{
		width: 60%;
		max-height: 160upx;
	}
	.conclude{
		background-color: #fff;
	}
	.conclude>view{
		margin: 20upx 0;
	}
	
	.bottom{
		position: fixed;
		left: 0;
		bottom: 0;
		
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0 0 0 40upx;
		background-color: #fff;
		border: 1px solid #f1f1f1;
	}
	.bottom-right button{
		margin-left: 15upx;
		height: 100%;
		height: 80upx;
		border-radius: 0;
		font-size: 30upx;
	}
	.bottom-right button,
	.bottom-right text{
		display: inline-block;
		vertical-align: middle;
	}
	.bottom-right{
		flex: 1;
		text-align: right;
	}
</style>
