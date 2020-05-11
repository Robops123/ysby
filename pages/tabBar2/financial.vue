<template>
	<view style="width: 100%;">
		<view class="activity">
			<view class="item-2">
				<view class="cg s2">今日交易额(元)</view>
				<view class="s7 cr">{{data.todayTrade}}</view>
			</view>
			<view class="item-2">
				<view class="cg s2">今日订单量(件)</view>
				<view class="s7">{{data.todayOrder}}</view>
			</view>
		</view>
		
		<view style="width: 100%;">
			<view class="nav-bar">
				<view class="nav nav-left" :class="{active:active==1}" @click="toggle(1)"><text>累计订单</text></view>
				<view class="nav nav-right" :class="{active:active==2}" @click="toggle(2)"><text>产品出售量</text></view>
				<view class="nav nav-left" :class="{active:active==3}" @click="toggle(3)"><text>店铺资金</text></view>
			</view>
			<view class="conclude">
				<text class="s2 cg" v-if='active==1'>累计订单:{{sum}}单</text>
				<text class="s2 cg" v-if='active==2'>产品出售量:{{sum}}件</text>
				<text class="s2 cg" v-if='active==3'>店铺资金:{{sum}}元</text>
			</view>
			<view class="qiun-charts" >
				<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
			</view>
			
			<view class="item-5">
				<view class="cg" :class="{active:active2==1}" @click="toggle2(1)">近一月</view>
				<view class="cg" :class="{active:active2==2}" @click="toggle2(2)">近二月</view>
				<view class="cg" :class="{active:active2==4}" @click="toggle2(4)">近四月</view>
				<view class="cg" :class="{active:active2==6}" @click="toggle2(6)">近六月</view>
				<view class="cg" :class="{active:active2==12}" @click="toggle2(12)">近一年</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
		var canvaLineA=null;
	export default{
		data(){
			return{
				active:1,
				active2:1,
				uid:'',
				token:'',
				data:'',
				sum:'',
				des:'累计订单量'
			}
		},
		mounted(){
			// this.init()
		},
		methods:{
			init(){
				_self = this;
				var info=uni.getSystemInfoSync()
							// uni.upx2px(750) 这是uni-app自带的自适应，以750的尺寸为基准。动态变化
							this.cWidth=info.windowWidth;
							var userInfo=uni.getStorageSync('userInfo')
							if(userInfo!='' & userInfo!=null & userInfo!=undefined){
								this.uid=userInfo.uid
								this.token=userInfo.token
								this.getBasicData()
							}
							this.getChartsData();
			},
			toggle(t){
				this.active=t
				this.active2=1
				if(t==1){
					this.des='累计订单量'
				}else if(t==2){
					this.des='产品出售量'
				}else if(t==3){
					this.des='店铺资金'
				}
				this.getChartsData()
			},
			toggle2(t){
				this.active2=t
				this.getChartsData()
			},
			getBasicData(){
				this.$loading()
				var that=this
				var url='&r=api.myshop.finance'
				var params={
					uid:this.uid,
					token:this.token
				}
				  this.$apiPost(url,params).then((res) =>{
					  uni.hideLoading()
					that.data=res.data	
				  })
			},
			getChartsData(){
				this.$loading()
				var that=this
				var url='&r=api.myshop.finance.totalOrder'
				var params={
					uid:this.uid,
					token:this.token,
					period:this.active2,
					type:this.active
				}
				  this.$apiPost(url,params).then((res) =>{
					  uni.hideLoading()
					  that.sum=res.data.sum
					  that.getServerData(res.data)
				  })
			},
			getServerData(data){
				let LineA={categories:[],series:[]};
									LineA.categories=data.day;
									LineA.series=[{
										name:this.des,
										data:data.nums,
										color:'#f56c6c'
									}]
									// LineA.series=[{
									// 	name:"南京",
									// 	data:[12,15,10,18,6,13],
									// 	color:'#409eff'
									// },{
									// 	name:"苏州",
									// 	data:[15,6,13,18,8,14],
									// 	color:'#e6a23c'
									// },{
									// 	name:"无锡",
									// 	data:[13,12,13,16,9,10],
									// 	color:'#f56c6c'
									// }];
									_self.showLineA("canvasLineA",LineA,data.minnum,data.maxnum);
						},
						// 展示图标的函数 接收参数，一个块的id,一个数据
						showLineA(canvasId,chartData,min,max){
							canvaLineA=new uCharts({
												$this:_self,
												canvasId: canvasId,
												type: 'line',
												fontSize:11,
												legend:{show:false,position:'top',float:'left'},
												dataLabel:false,
												dataPointShape:true,
												background:'#FFFFFF',
												pixelRatio:_self.pixelRatio,
												categories: chartData.categories,
												series: chartData.series,
												animation: true,
												xAxis: {
													type:'grid',
													gridColor:'#CCCCCC',
													gridType:'dash',
													dashLength:8,
													labelCount:4,
												},
												yAxis: {
													gridType:'dash',
													gridColor:'#CCCCCC',
													dashLength:8,
													// splitNumber:(max-min)/6,
													// min:min,
													max:max,
													// format:(val)=>{return val}
												},
												width: this.cWidth-10,
												height: 200,
												extra: {
													line:{
														type: 'straight'
													}
												}
											});
						},
						// 点击图表显示的内容
						touchLineA(e) {
							// 使用声明的变量canvaLineA
							canvaLineA.showToolTip(e, {
								format: function (item, category) {
									return category + ' ' + item.name + ':' + item.data 
								}
							});
						}
		}
	}
</script>

<style>
	.qiun-charts {
			width: 750upx;
			height: 500upx;
			background-color: #FFFFFF;
		}
		
		.charts {
			width: 750upx;
			height: 500upx;
			background-color: #FFFFFF;
		}
	.activity{
		padding: 30upx 30upx 30upx 20upx;
		font-size: 30upx;
		background: white;
		margin-top: 20upx;
		border-bottom: 20upx solid #f3f3f3;
	}
	.item-2{
		text-align: center;
		display: inline-block;
		vertical-align: top;
		width: 50%;
	}
	.item-2>view{
		margin: 10upx 0;
	}
	
	
	.nav-bar{
		width: 100%;
		box-sizing: border-box;
		padding: 20upx 0;
		background-color: #fff;
	}
	.nav{
		white-space: nowrap;
		color: #afafaf;
		display: inline-block;
		width: 33% !important;
		text-align: center;
		box-sizing: border-box;
	}
	.nav text{
		/* display: inline-block;
		width: 33%; */
	}
	.nav.active text{
		color: #000000;
		position: relative;
	}
	.nav.active text::before{
		content: '';
		position: absolute;
		bottom: -10upx;
		width: 50upx;
		background-color: #ff7379;
		height: 2px;
		left: 50%;
		margin-left: -25upx;
	}
	.item-5{
		
		}
		.item-5>view{
			width: 20%;
			color: #a9a9a9;
			padding: 25upx 0;
			text-align: center;
			display: inline-block;
			vertical-align: top;
			box-sizing: border-box;
			background-color: #fff;
			border: 1px solid #eaeaea;
		}
		.item-5>view.active{
			color: black;
			border: none;
		}
		
		
		.conclude{
			padding-left: 100upx;
			background-color: #fff;
		}
		.conclude text{
			
			display: list-item;
			color: #156cc9;
			vertical-align: middle;
		}
		
		
</style>
