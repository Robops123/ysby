<template>
	<view>
		<view class="option-box">
			<view class="option-item" >
				<text style="display: inline-block;margin-top: 20upx;">头像</text>
				<view class="f1 fr">
					<image  :src="data.avatar" mode="" @click="changeHeadface"></image>
					<text style="margin-left: 20upx;"><text class="icon-arrow-right iconfont"></text></text>
					</view>
					<view class="" style="clear: both;">
						
					</view>
			</view>
			<view class="option-item" @click="promptVisible2=true">
				<text>昵称</text>
				<text class="f1 fr"><text style="padding-right: 20upx;">{{data.nickname}}</text><text class="icon-arrow-right iconfont"></text></text>
			</view>
			<view class="option-item" >
				<text>性别</text>
				<text class="f1 fr" @click="openSex">
					<text class="f2 cr" style="padding-right: 20upx;" v-if="!data.gender">设置</text>
					<text class="f2 " style="padding-right: 20upx;" v-else>{{data.gender=='1' ? '男':'女'}}</text>
					<text class="icon-arrow-right iconfont"></text></text>
			</view>
			<view class="option-item" >
				<text>出生日期</text>
				<view class="f1 fr" style="display: flex;">
				<picker mode="date"  :start="startDate" :end="endDate" @change="bindDateChange">
				                        <view class="uni-input">
										{{data.birthyear!='' ? (data.birthyear+'-'+data.birthmonth+'-'+data.birthday) : '选择'}}</view>
				                    </picker>
				<text class="icon-arrow-right iconfont"></text>
				</view>
			</view>
		</view>
		
		<view class="option-box">
			<view class="option-item" @click="openPicker">
				<text>常居地</text>
				<text class="f1 fr"><text style="padding-right: 20upx;">
				{{this.data.province}} {{this.data.city}} 
				</text>
				<text class="icon-arrow-right iconfont"></text>
				</text>
			</view>
			<view class="option-item" @click="promptVisible=true">
				<text>邮箱地址</text>
				<text class="f1 fr" >
					<text class="f2 cr" style="padding-right: 20upx;" v-if="!data.email">修改/添加</text>
					<text class="f2 " style="padding-right: 20upx;" v-else>{{data.email}}</text>
					<text class="icon-arrow-right iconfont"></text>
					</text>
			</view>
			<view class="option-item" @click="toAddressList">
				<text>收货地址</text>
				<text class="f1 fr" >
					<!-- <text class="f2 cr" style="padding-right: 20upx;">{{data.email ? data.email:'修改/添加'}}</text> -->
					<text class="icon-arrow-right iconfont"></text>
					</text>
			</view>
		</view>
		
		<!-- 地区选择 -->
		<lotus-address v-on:choseVal="choseValue" :secondary='true' :lotusAddressData="lotusAddressData"></lotus-address>
		
		<!-- 性别选择 -->
		<pop  ref='sex' :dataList='sexList'></pop>
		
		
		<!-- 邮箱 -->
		<prompt :visible.sync="promptVisible" :placeholder="data.email ? '修改邮箱地址':'添加邮箱地址'" :title='"邮箱地址"'
		 :defaultValue="data.email" @confirm="clickPromptConfirm" mainColor="#ff6d7e">
		  <!-- 这里放入slot内容-->
		</prompt>
		
		<!-- 昵称 -->
		<prompt :visible.sync="promptVisible2" placeholder="修改昵称"  :title='"昵称"'
		 :defaultValue="data.nickname" @confirm="clickPromptConfirm2" mainColor="#ff6d7e">
		  <!-- 这里放入slot内容-->
		</prompt>
	</view> 
</template>

<script>
	 import lotusAddress from "@/components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";
	 import pop from '@/components/promptOptions/pop'
	 import Prompt from '@/components/zz-prompt/index.vue'
	 export default{
		 data(){
			 const currentDate = this.getDate({
			             format: true
			         })
			 return{
				 promptVisible:false,promptVisible2:false,
				 uid:'',
				 token:'',
				 data:{},
				 // 性别
				 sexList:[
					{name:'男'}, 
					{name:'女'},
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
			 pop,
			 Prompt
		 },
		   computed: {
		         startDate() {
		             return this.getDate('start');
		         },
		         endDate() {
		             return this.getDate('end');
		         }
		     },
		 mounted(){
			var userInfo=uni.getStorageSync('userInfo'),that=this
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.uid=userInfo.uid
				this.token=userInfo.token
				this.getPersonalInfo()
			} 
		 },
		 methods:{
			 // 更换头像
			 changeHeadface(){
				var  that = this;
				uni.chooseImage({
				    success: (chooseImageRes) => {
						if(chooseImageRes.tempFiles[0].size > 2097152){
							that.$msg('图片过大，请重新选择图片')
							return ;
						}
						uni.showLoading()
				        const tempFilePaths = chooseImageRes.tempFilePaths[0];
				        that.$upload(tempFilePaths,'',(res) =>{
				        	that.data.avatar=res
							uni.hideLoading()
				        	that.submitPersonalInfo()
				        	})
				    }
				});
				
				  //   uni.chooseImage({
				  //    count: 1,
				  //    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				  //    success: function (res) {
						//  that.$loading()
						//  console.log(res)
				  //     const tempFilePaths = res.tempFilePaths[0];
					 //  const uploadTask = uni.uploadFile({
					 //   url : '',
					 //   filePath: tempFilePaths,
					 //   name: 'file',
					 //   // formData: {
					 //   //  'user': 'test'
					 //   // },
					 //   success: function (uploadFileRes) {
					 //  							   console.log(uploadFileRes)
					  						  
					 //   }
					 //  });
				  
				  //     // uploadTask.onProgressUpdate(function (res) {
				  //     //  that.percent = res.progress;
				  //     // });
				  //    },
				  //    error : function(e){
						//  console.log(e)
						//  uni.hideLoading()
						//  that.$msg(e)
				  //    }
				  //   });
			 },
			  //打开picker
			         openPicker() {
			             this.lotusAddressData.visible = true;
			         },
					 toAddressList(){
						uni.navigateTo({
							url:'./addressList'
						}) 
					 },
			         //回传已选的省市区的值
			         choseValue(res){
			             //res数据源包括已选省市区与省市区code
			             this.lotusAddressData.visible = res.visible;//visible为显示与关闭组件标识true显示false隐藏
			             //res.isChose = 1省市区已选 res.isChose = 0;未选
			             if(res.isChose){
			                 this.lotusAddressData.provinceName = res.province;//省
			                 this.lotusAddressData.cityName = res.city;//市
							 this.data.province = res.province;//省
							 this.data.city = res.city;//市
			                 // this.lotusAddressData.townName = res.town;//区
			                 this.region = `${res.province} ${res.city} ${res.town}`; //region为已选的省市区的值
							  this.submitPersonalInfo()
			             }
			         },
					 // 性别选择
					 choosed(m){
						 if(m.name=='男'){
							 this.data.gender='1'
						 }else{
							 this.data.gender='2'
						 }
						  this.submitPersonalInfo()
						 uni.$off('popChoosed')
					 },
					 openSex(){
						 var that=this
						 uni.$on('popChoosed',function(e){
							 that.choosed(e)
						 })
						 this.$refs.sex.show=true
					 },
					 // 邮箱和昵称
					 clickPromptConfirm(e){
						 var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
						 if(!reg.test(e)){
							 this.$msg('请输入正确的邮箱')
							 return false;
						 }
						  this.data.email=e
						   this.submitPersonalInfo()
					 },
					 clickPromptConfirm2(e){
						 this.data.nickname=e
						  this.submitPersonalInfo()
					 },
					 // 日期选择
					 bindDateChange: function(e) {
						 var data=e.detail.value.split('-')
						 this.data.birthyear=data[0]
						 this.data.birthmonth=data[1]
						 this.data.birthday=data[2]
						 this.submitPersonalInfo()
					         },
							 getDate(type) {
							             const date = new Date();
							             let year = date.getFullYear();
							             let month = date.getMonth() + 1;
							             let day = date.getDate();
							 
							             if (type === 'start') {
							                 year = year - 60;
							             } else if (type === 'end') {
							                 year = year + 2;
							             }
							             month = month > 9 ? month : '0' + month;;
							             day = day > 9 ? day : '0' + day;
							             return `${year}-${month}-${day}`;
							         },
					 getPersonalInfo(){
						 var that=this
						 var params={
						 	uid:this.uid,
						 	token:this.token,
						 }
						 var url='&r=api.member.setting'
						   this.$apiPost(url,params).then((res) =>{
						 	  that.data=res.data
							  uni.hideLoading()
						   })
					 },
					 submitPersonalInfo(){
						 this.$loading()
						 var that=this
						 var params=this.data
						 params.uid=this.uid
						 params.token=this.token
						 var url='&r=api.member.setting.edit'
						   this.$apiPost(url,params).then((res) =>{
							   that.promptVisible=false
							   that.promptVisible2=false
							   that.getPersonalInfo()
						   })
					 }
					 
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
