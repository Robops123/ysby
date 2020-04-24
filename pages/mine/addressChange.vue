<template>
	<view class="padding">
		<view class="bottom-border">
			<text style="vertical-align: top;" class="label-80">收货人</text>
			<input v-model="contactname" placeholder="请输入收货人姓名" />
		</view>
		<view class="bottom-border">
			<text style="vertical-align: top;" class="label-80">收货号码</text>
			<input v-model="usermobile" placeholder="请输入收货人手机号" />
		</view>
		<view class="bottom-border">
			<text style="vertical-align: top;" class="label-80">所在地区</text>
			<input v-model="region" placeholder="省市区 乡镇等" @click="openPicker"/>
		</view>
		<view class="bottom-border">
			<text style="vertical-align: top;" class="label-80">详细地址</text>
			<input v-model="address" placeholder="街道 楼牌号等" />
		</view>
		
		
		<view class="setting bottom-border flex-between">
			<view>
				<view class="s8">设置默认地址</view>
				<view class="s2">提醒:每次下单会默认推荐使用改地址</view>
			</view>
			<switch color='#ff6d7e' :checked="isdefault=='1'" @change="switch1Change" style="transform:scale(0.7)"/>
		</view>
		
		<view style="text-align: center;">
			<button type="default" class="btn" @click="submit">保存</button>
		</view>
		
		
		<!-- 地区选择 -->
		<lotus-address v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address>
	</view>
</template>

<script>
	 import lotusAddress from "@/components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";
	export default{
		components:{
					 lotusAddress
		},
		data(){
			return{
				type:'add',
				uid:'',
				token:'',
				contactname:'',
				usermobile:'',
				address:'',
				addressid:'',
				url:'',
				lotusAddressData:{
				                visible:false,
				                provinceName:'',
				                cityName:'',
				                townName:'',
				            },
							isdefault:'2'
			}
		},
		onLoad(e){
			if(e.type=='edit'){
				this.type='edit'
				var item=JSON.parse(e.item)
				this.contactname=item.contactname
				this.usermobile=item.usermobile
				this.address=item.address
				this.lotusAddressData.provinceName=item.province
				this.lotusAddressData.cityName=item.city
				this.lotusAddressData.townName=item.district
				this.isdefault=item.isdefault
				this.addressid=item.id
				this.url='&r=api.member.address.edit'
			}else{
				this.url='&r=api.member.address.add'
			}
			var userInfo=uni.getStorageSync('userInfo')
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.uid=userInfo.uid
				this.token=userInfo.token
			}
		},
		computed:{
			region:{
				 get(){
				     return `${this.lotusAddressData.provinceName} ${this.lotusAddressData.cityName} ${this.lotusAddressData.townName}`
				    },
				    set(val){}
			}
		},
		methods:{
			switch1Change(e){
				if(e.detail.value){
					this.isdefault='1'
				}else{
					this.isdefault='2'
				}
			},
			openPicker() {
			    this.lotusAddressData.visible = true;
			},
			//回传已选的省市区的值
			choseValue(res){
			    //res数据源包括已选省市区与省市区code
			    this.lotusAddressData.visible = res.visible;//visible为显示与关闭组件标识true显示false隐藏
			    //res.isChose = 1省市区已选 res.isChose = 0;未选
			    if(res.isChose){
			        this.lotusAddressData.provinceName = res.province;//省
			        this.lotusAddressData.cityName = res.city;//市
			        this.lotusAddressData.townName = res.town;//区
			        // this.region = `${res.province} ${res.city} ${res.town}`; //region为已选的省市区的值
			    }
			},
			submit(){
				var that=this
				// var reg=/^1[3456789]\d{9}$/
				// if(!reg.test(this.usermobile)){
				// 	this.$msg('请输入正确的手机号')
				// 	return ;
				// }
				var params={
					uid:this.uid,
					token:this.token,
					contactname:this.contactname,
					usermobile:this.usermobile,
					province:this.lotusAddressData.provinceName,
					city:this.lotusAddressData.cityName,
					district:this.lotusAddressData.townName,
					address:this.address,
					isdefault:this.isdefault
				}
				if(this.type=='edit'){
					params.addressid=this.addressid
				}
				  this.$apiPost(this.url,params).then((res) =>{
					  if(that.type=='add'){
						  that.$msg('添加成功')
					  }else{
						  that.$msg('修改成功')
					  }
					  setTimeout(function(){
						  that.back()
						  uni.$emit('updateAddressList')
					  },1000)
				  })
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
	.bottom-border{
		padding: 15upx 0;
		margin: 15upx 0;
		border-bottom: 1px solid #f7f7f7;
		}
		.label-80{
			width: 150upx;
			margin-right: 20upx;
			display: inline-block;
			vertical-align: middle;
		}
		.bottom-border>view{
			display: inline-block;
			vertical-align: middle;
		}
		.bottom-border textarea,
		.bottom-border input{
			width: 500upx;
			display: inline-block;
		}
		.setting{
			margin-top: 50%;
		}
		.setting .s2{
			margin-top: 20upx;
		}
		.btn{
			margin-top: 50upx;
			width: 80%;
			height: 75upx;
			background: #ff6d7e !important;
			border-radius: 0;
			text-align: center;
			line-height: 75upx;
			border-radius: 75upx;
			letter-spacing: 4px;
			color: white;
			font-size: 34upx;
		}
</style>
