<template>
	<view>
		<view class="padding" style="padding-bottom: 66px;">
			<view class="card" v-for="(item,index) in 3" :key='index'>
				<view class="overall">
					<checkbox-group @change="checkboxChange" class="r-cb">
					    <checkbox value=""  style="transform:scale(0.7)"/>
					</checkbox-group>
					<view class="">
						<icon type="" class="icon-fire iconfont"></icon>
						<text class="overall-title">艺术班自营</text>
						<icon type="" class="icon-fire iconfont arrow"></icon>
					</view>
				</view>
				
				<view class="child-overall" v-for="(item,index) in 2" :key='index'>
					<view class="child-overall-item"> 
						<checkbox-group @change="checkboxChange" class="r-cb">
						    <checkbox value=""  style="transform:scale(0.7)"/>
						</checkbox-group>
						<image src="../../static/img/bg/activity.png" mode=""></image>
						<view class="info">
							<view class="s2 title">
								儿童木马麻木童儿儿童木马麻木童儿儿童木马麻木童儿儿童木马麻木童儿
								童儿儿童木马麻木童儿儿童木马麻木童儿童儿儿童木马麻木童儿儿童木马麻木童儿
							</view>
							<view class="s3 cg options">
								海蓝色；24(155/60A)<icon type="" class="icon-fire iconfont"></icon>
							</view>
							<view class="bottom-content">
								<text class="cr">$79.80</text>
								<view class="calculator fr">
									<view class="calc minus">-</view>
									<text>1</text>
									<view class="calc plus">+</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bottom">
			<checkbox-group @change="checkboxChange" class="r-cb">
			    <checkbox value=""  style="transform:scale(0.7)"/>全选
			</checkbox-group>
			<view class="bottom-right">
				<text class="cg s1">合计:</text>
				<text class="cr" style="font-size: 34upx;">$21.45</text>
				<button type="warn" >去结算(2)</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onShow(){
			console.log('show')
		},
		data(){
			return{
				cartList:[
					{
						
					}
				]
			}
		},
		methods:{
			checkboxChange(e){
				console.log(e)
			}
		}
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
	
	.card{
		background-color: #fff;
		border-radius: 18upx;
		margin: 20upx 0;
		/* border-top: 20upx solid #; */
	}
	.child-overall,.overall{
		padding: 20upx 0 0 15upx;
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
		width: 200upx;
		height: 200upx;
		margin-right: 20upx;
		border-radius: 17upx;
	}
	.child-overall-item .title{
		width: 360upx;
		/* height: 64upx; */
		overflow:hidden;//一定要写
		    text-overflow: ellipsis;//超出省略号
		    display:-webkit-box;//一定要写
		    -webkit-line-clamp: 2;//控制行数
		    -webkit-box-orient: vertical;//一定要写
	}
	.calculator text{
		display: inline-block;
		vertical-align: middle;
	}
	.calculator .calc{
		display: inline-block;
		vertical-align: middle;
		width: 40upx;
		height: 40upx;
		margin: 0 20upx;
		font-size: 36upx;
		line-height: 40upx;
		text-align: center;
		border-radius: 50%;
		border: 1px solid #e8e8e8;
	}
	.info{
		position: relative;
	}
	.bottom-content{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	.options{
		background-color:#f9f9f9;
		display: inline-block;
		padding: 5upx 16upx;
		border-radius: 24upx;
		margin-top: 15upx;
	}
	.overall-title{
		margin: 0 10upx;
	}
	
	.bottom{
		position: fixed;
		left: 0;
		bottom: 0;
		/* #ifdef H5 */
		bottom: 50px;
		/* #endif */
		
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:20upx 40upx;
		background-color: #fff;
		border: 1px solid #f1f1f1;
	}
	.bottom-right button{
		margin-left: 15upx;
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
	.arrow{
		color: #ccc;
	}
	.r-cb{
		display: flex;
	}
</style>
