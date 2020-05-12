<template>
	<view class="main">
		<view class="padding">
			<view class="sub-title">自助服务</view>
			<view class="opt-container">
				<view style="width: max-content;margin: 40upx 0;">
					<view class="item-list" @click="getList()" v-for="(item,index) in 5" :key='index'>
						<image src="../../static/img/pic/mine/icon2.png" mode=""></image>
						<view>退款/售后</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="sub-title padding">猜你想问</view>
		<view class="question" v-for="(item,index) in questionList" :key='index'>
			<view @click="showQuestion(index)">
				<text>{{index+1}}、如何催单 商品不想要了怎么推开</text>
				<text class="fr iconfont icon-down" ></text>
			</view>
			<view v-show="item.show" class="question-detail" :class="{animate__fadeInDown:item.show}">
				啊实打实大师大所大所大所多所多所啊实打实大师大所大所大所大所多啊实打实大师大所大所多
				啊实打实大师大所大所大所多所多所啊实打实大师大所大所大所大所多啊实打实大师大所大所多
				啊实打实大师大所大所大所多所多所啊实打实大师大所大所大所大所多啊实打实大师大所大所多
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				questionList:[{},{},{},{}]
			}
		},
		onLoad(){
			
		},
		methods:{
			getList(){
				
			},
			showQuestion(from){
				this.questionList[from].show=!this.questionList[from].show
				this.questionList.splice(0,0)
			}
		}
	}
</script>

<style>
	.main{
		border-top: 20upx solid #f3f3f3;
	}
	.sub-title{
		font-size: 18px;
		margin-top: 30upx;
	}
	.opt-container{
		width: 100%;
		overflow: hidden;
		overflow-x: auto;
	}
	.item-list image{
		width: 70upx;
		height: 60upx;
		margin-bottom: 20upx;
	}
	.item-list{
	width: 160upx;	
	text-align: center;
	display: inline-block;
	vertical-align: middle;
	}
	.item-list view{
		white-space: nowrap;
		font-size: 24upx;
		color: #696969;
	}
	.question{
		padding: 20upx ;
		margin: 20upx 0;
		
	}
	.question:not(:last-child){
		border-bottom:1px solid #dcdcdc;
	}
	/* .question .iconfont{
		 margin-top: 5px;
	} */
	.question-detail{
		transition: 0.4s linear all;
		margin-top: 20upx;
		line-height: 1.5;
		text-indent: 20px;
	}
</style>
