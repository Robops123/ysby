<template>
	<view style="padding-bottom: 80upx;">
		<view class="margin padding s2" @click="chooseAddress">
			<text>收货地址</text>
			<text class="cg fr">
				{{address ? address:'添加收货地址'}}
					<text class="icon-arrow-right iconfont"></text>
			</text>
		</view>
		<view class="child-overall padding margin" v-for="(item,index) in data" :key='index'>
			<view class="child-overall-item"> 
				<image :src="item.thumb" mode=""></image>
				<view class="info">
					<view>
						<view class="s2 title">
							{{item.title}}
						</view>
						<view class="s3 cg options">
							{{item.specifications ? item.specifications:'无规格'}}
							<!-- <image src="../../static/img/pic/more3.png" mode="" class="down-arrow"></image> -->
						</view>
					</view>
					<view class="s3" style="text-align: right;">
						<view class="">￥{{item.marketprice}}</view>
						<view class=" cg">*{{item.amount}}</view>
					</view>
				</view>
				
			</view>
			<!-- <view class="bottom-content">
				<text style="line-height: 60upx;">购买数量</text>
				<view class="calculator fr">
					<view class="calc minus" :class="{disabled:disabled1}" @click="minus">-</view>
					<text class="result">{{form.amount}}</text>
					<view class="calc plus" :class="{disabled:disabled2}" @click="plus">+</view>
				</view>
			</view> -->
			<view style="text-align: right;margin: 70upx 0 0;">
				共{{item.amount}}件商品 共计:<text class="cr">￥{{item.marketprice*item.amount}}</text>
			</view>
		</view>
		
		<view class="margin padding msg">
			<text>买家留言</text>
			<textarea v-model="form.remark" maxlength="50" placeholder="50字以内(选填)"/>
		</view>
		
		<view class="padding conclude">
			<view>
				<text>商品小计</text>
				<text class='fr'>￥{{totalPrice}}</text>
			</view>
			<view>
				<text>运费</text>
				<text class='fr'>￥{{freight || 0}}</text>
			</view>
		</view>
		
		
		<view class="bottom">
			<view class="bottom-right" style="text-align: right;">
				<text class="s2 cg">共{{totalAmount}}件,</text>
				<text class="cg s1">合计:</text>
				<text class="cr" style="font-size: 34upx;">￥{{totalMoney}}</text>
				<button type="warn" @click="createOrder">立即支付</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				freight:0,
				data:[],
				totalPrice:0,
				totalAmount:0,
				form:{
					uid:'',
					token:'',
					// merchid:'',
					goods:[],
					addressid:'',
					remark:'',
				},
				address:'',
				spec:'',
				goodsImg:'',
				goodsName:'',
				total:'',
				contact:{},
				ids:[]
			}
		},
		computed:{
			disabled1(){
				return this.form.amount<=1
			},
			disabled2(){
				return this.form.amount>=this.total
			},
			totalMoney(){
				return this.totalPrice+(Number(this.freight));
			}
		},
		onLoad(e){
			var userInfo=uni.getStorageSync('userInfo'),that=this
			var selectedGoods=JSON.parse(e.selectedGoods)
			this.data=selectedGoods
			selectedGoods.forEach((item) =>{
				that.ids.push(item.goodsid)
				that.form.goods.push({
					goodsid:item.goodsid,
					amount:item.amount,
					specifications:item.specifications || '',
					skuidsort:item.skuidsort || ''
				})
				that.totalAmount+=parseInt(item.amount)
				that.totalPrice+=parseFloat(item.marketprice) * parseInt(item.amount)
			})
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.form.uid=userInfo.uid
				this.form.token=userInfo.token
				this.getAddressList()
			}
			// this.spec=choosedSpec.selectArr
			// this.goodsImg=choosedSpec.goodsImg
			// // this.form.merchid=e.merchId 
			// this.form.goodsid=e.goodsId
			// this.goodsName=e.goodsName
			// this.total=choosedSpec.stock
			// this.form.amount=choosedSpec.selectNum
			// this.form.specifications=choosedSpec.selectArr
			// this.form.goodsprice=choosedSpec.marketPrice
		},
		methods:{
			minus(){
				if(!this.disabled1){
					--this.form.amount
				}
			},
			plus(){
				if(!this.disabled2){
					++this.form.amount
				}
			},
			createOrder(){
				this.$loading()
				var that=this
				var url='&r=api.member.order.create'
				this.form.goods=JSON.stringify(this.form.goods)
				this.form.type=1
				  this.$apiPost(url,this.form).then((res) =>{
					  uni.navigateTo({
					  	url:'./cashier?orderId='+res.data.orderno+'&contact='+JSON.stringify(that.contact)+'&money='+this.totalPrice
					  })
					  uni.hideLoading()
					  // that.$msg('删除成功')
					  // setTimeout(function(){
						 //  that.getAddressList()
					  // },0)
				  })
				// uni.navigateTo({
				// 	url:'./cashier'
				// })
			},
			chooseAddress(){
				var that=this
				uni.$on('chooseAddress',function(item){
					that.address=item.province+item.city+item.district+item.address
					that.form.addressid=item.id
					that.contact=item
					that.calcFreight()
					uni.$off('chooseAddress')
				})
				uni.navigateTo({
					url:'../mine/addressList?type=choose'
				})
			},
			getAddressList(){
				var that=this
				var params={
					uid:this.form.uid,
					token:this.form.token,
					page:1,
					pagesize:99,
				}
				var url='&r=api.member.address'
				  this.$apiPost(url,params).then((res) =>{
					res.data.forEach((item) =>{
						if(item.isdefault=='1'){
							that.address=item.province+item.city+item.district+item.address
							that.form.addressid=item.id
							that.contact=item
							that.calcFreight()
						}
					})
				  })
			},
			calcFreight(){
				this.$loading()
				var that=this
				var params={
					uid:this.form.uid,
					token:this.form.token,
					goodsid:this.ids.join(','),
					addressid:this.form.addressid
				}
				var url='&r=api.member.order.freight'
				  this.$apiPost(url,params).then((res) =>{
					  uni.hideLoading()
					  res.data.freight.forEach((item,index) =>{
						  that.form.goods[index].freight=item
					  })
					that.freight=res.data.freightTotal
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
	.disabled{
		border-color: #f4f4f4;
		background-color: #f4f4f4;
	}
</style>
