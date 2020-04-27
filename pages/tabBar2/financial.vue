<template>
	<view>
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
		
		<view>
			<view class="nav-bar">
				<view class="nav nav-left" :class="{active:active==1}" @click="toggle(1)"><text>累计订单</text></view>
				<view class="nav nav-right" :class="{active:active==2}" @click="toggle(2)"><text>产品出售量</text></view>
				<view class="nav nav-left" :class="{active:active==3}" @click="toggle(3)"><text>店铺资金</text></view>
			</view>
			<view class="conclude">
				<text class="s2 cg">累计订单:1356件</text>
			</view>
			<view class="qiun-charts">
				<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
			</view>
			
			<view class="item-5">
				<view class="cg" :class="{active:active2==1}" @click="toggle2(1)">近一月</view>
				<view class="cg" :class="{active:active2==2}" @click="toggle2(2)">近二月</view>
				<view class="cg" :class="{active:active2==3}" @click="toggle2(3)">近四月</view>
				<view class="cg" :class="{active:active2==4}" @click="toggle2(4)">近六月</view>
				<view class="cg" :class="{active:active2==5}" @click="toggle2(5)">近一年</view>
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
				data:''
			}
		},
		mounted(){
			this.init()
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
							this.getServerData();
			},
			toggle(t){
				this.active=t
			},
			toggle2(t){
				this.active2=t
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
			getServerData(){
				let LineA={categories:[],series:[]};
									LineA.categories=['2010','2012','2014','2016','2018','2020'];
									LineA.series=[{
										name:"南京",
										data:[12,15,10,18,6,13],
										color:'#409eff'
									},{
										name:"苏州",
										data:[15,6,13,18,8,14],
										color:'#e6a23c'
									},{
										name:"无锡",
										data:[13,12,13,16,9,10],
										color:'#f56c6c'
									}];
									_self.showLineA("canvasLineA",LineA);
						},
						// 展示图标的函数 接收参数，一个块的id,一个数据
						showLineA(canvasId,chartData){
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
													dashLength:8
												},
												yAxis: {
													gridType:'dash',
													gridColor:'#CCCCCC',
													dashLength:8,
													splitNumber:5,
													min:10,
													max:180,
													format:(val)=>{return val.toFixed(0)+'元'}
												},
												width: _self.cWidth,
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
							console.log(canvaLineA)
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
		text-align: center;
		padding: 20upx 0;
		background-color: #fff;
	}
	.nav{
		color: #afafaf;
		display: inline-block;
		width: 33%;
		box-sizing: border-box;
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
