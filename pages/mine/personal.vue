<template>
	<view>
		<view class="option-box">
			<view class="option-item" >
				<text style="display: inline-block;margin-top: 20upx;">头像</text>
				<view class="f1 fr">
					<image  src="../../static/img/pic/logo.png" mode=""></image>
					<text style="margin-left: 20upx;"><text class="icon-arrow-right iconfont"></text></text>
					</view>
					<view class="" style="clear: both;">
						
					</view>
			</view>
			<view class="option-item" >
				<text>昵称</text>
				<text class="f1 fr"><text style="padding-right: 20upx;">中企商会网</text><text class="icon-arrow-right iconfont"></text></text>
			</view>
			<view class="option-item" >
				<text>性别</text>
				<text class="f1 fr" @click="openSex"><text class="f2 cr" style="padding-right: 20upx;">设置</text><text class="icon-arrow-right iconfont"></text></text>
			</view>
			<view class="option-item" >
				<text>出生日期</text>
				<text class="f1 fr"><text class="icon-arrow-right iconfont"></text></text>
			</view>
		</view>
		
		<view class="option-box">
			<view class="option-item" >
				<text>常居地</text>
				<text class="f1 fr"><text style="padding-right: 20upx;">无锡</text><text class="icon-arrow-right iconfont"></text></text>
			</view>
			<view class="option-item" >
				<text>邮箱地址</text>
				<text class="f1 fr" @click="openPicker"><text class="f2 cr"  style="padding-right: 20upx;">修改/添加</text><text class="icon-arrow-right iconfont"></text></text>
			</view>
			<view class="option-item" >
				<text>收货地址</text>
				<text class="f1 fr" @click="openPicker"><text class="f2 cr" style="padding-right: 20upx;">修改/添加</text><text class="icon-arrow-right iconfont"></text></text>
			</view>
		</view>
		
		<!-- 地区选择 -->
		<lotus-address v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address>
		
		<!-- 性别选择 -->
		<pop  ref='sex' :dataList='sexList'></pop>
	</view>
</template>

<script>
	 import lotusAddress from "@/components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";
	 import pop from '@/components/promptOptions/pop'
	 export default{
		 data(){
			 return{
				 // 性别
				 sexList:[
					{name:'男'}, 
					{name:'女'},
					{name:'男'},
					{name:'女'},
					{name:'男'},
					{name:'女'}
				 ],
				 // 地区选择
				lotusAddressData:{
				                visible:false,
				                provinceName:'',
				                cityName:'',
				                townName:'',
				            },
				            region:''
			}
		 },
		 components:{
			 lotusAddress,
			 pop
		 },
		 methods:{
			  //打开picker
			         openPicker() {
			             this.lotusAddressData.visible = true;
			             this.lotusAddressData.provinceName = '广东省';
			             this.lotusAddressData.cityName = '广州市';
			             this.lotusAddressData.townName = '白云区';
			         },
			         //回传已选的省市区的值
			         choseValue(res){
			             //res数据源包括已选省市区与省市区code
			             console.log(res);
			             this.lotusAddressData.visible = res.visible;//visible为显示与关闭组件标识true显示false隐藏
			             //res.isChose = 1省市区已选 res.isChose = 0;未选
			             if(res.isChose){
			                 this.lotusAddressData.provinceName = res.province;//省
			                 this.lotusAddressData.cityName = res.city;//市
			                 this.lotusAddressData.townName = res.town;//区
			                 this.region = `${res.province} ${res.city} ${res.town}`; //region为已选的省市区的值
			             }
			         },
					 // 性别选择
					 choosed(m){
						 console.log(m)
						 uni.$off('popChoosed')
					 },
					 openSex(){
						 var that=this
						 uni.$on('popChoosed',function(e){
							 that.choosed(e)
						 })
						 this.$refs.sex.show=true
					 },
					 
		 }
	 }
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
	.option-box{
		background: white;
		padding-left: 30upx;
		border-top: 15upx solid #f3f3f3;
		border-bottom: 15upx solid #f3f3f3;
	}
	image{
		vertical-align: middle;
		border-radius: 50%;
		height: 90upx;
		width: 90upx;
		margin: 15upx 0;
		display: inline-block;
		margin-left: -25upx;
	}
	.option-box .option-item:last-child{
		border: none;
	}
	.option-item{
		line-height: 90upx;
		border-bottom: 1px solid #efefef;
	}
	.f1{
		color: #b5b5b5;
		margin-right: 25upx;
	}
	.f2{
	}
	.fr{
		float: right;
	}
</style>
