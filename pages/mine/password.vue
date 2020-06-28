<template>
	<view>
		<view class="option-box">
			<view class="option-item" >
				<text>原密码</text>
				<input type="password" v-model="form.oldPass" placeholder="填写原密码"/>
			</view>
			<view class="option-item" >
				<text>新密码</text>
				<input type="password" v-model="form.newPass" placeholder="填写新密码"/>
			</view>
			<view class="option-item" >
				<text>确认密码</text>
				<input type="password" v-model="form.confirmPass" placeholder="再次填写确认"/>
			</view>
		</view>
		
		<view style="text-align: center;">
			<button type="default" class="btn" @click="changePwd">完成</button>
		</view>
		
		
		<view class="confirm-container" v-show="showConfirm">
			<view class="confirm-wrapper"></view>
			<view class="confirm-content padding">
				<view class="confirm-title">提示</view>
				<view class="confirm-describe">密码修改成功</view>
				<view class="confirm-btn" @click="confirm">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				url:'&r=api.member.setting.changePwd',
				showConfirm:false,
				form:{
					uid:'',
					token:'',
					oldPass:'',
					newPass:'',
					confirmPass:''
				}
			}
		},
		mounted(){
			var userInfo=uni.getStorageSync('userInfo'),that=this
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.form.uid=userInfo.uid
				this.form.token=userInfo.token
			} 
		},
		methods:{
			changePwd(){
				this.$loading()
				var that=this
				  this.$apiPost(this.url,this.form).then((res) =>{
					  uni.hideLoading()
					  that.showConfirm=true
					 //  uni.showModal({
					 //  	showCancel:false,
						// title:'提示',
						// content:'密码修改成功',
						// confirmColor:'#ff6d7e',
						// success:(res) =>{
						// 	if(res.confirm){
						// 		uni.navigateBack({
						// 			delta:1
						// 		})
						// 	}
						// }
					 //  })
				  })
			},
			confirm(){
				this.showConfirm=false
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
	.option-box{
		background: white;
		padding-left: 30upx;
	}
	.option-item{
		/* line-height: 90upx; */
		padding: 15upx 0;
	}
	.option-item>text{
		display: inline-block;
		vertical-align: middle;
		padding-bottom: 15upx;
		width: 150upx;
	}
	.option-item>input{
		display: inline-block;
		vertical-align: middle;
		width: 500upx;
		padding-bottom: 15upx;
		border-bottom: 1px solid #efefef;
	}
	.btn{
		width: 80%;
		height: 75upx;
		background: #ff6d7e !important;
		border-radius: 75upx;
		text-align: center;
		line-height: 75upx;
		letter-spacing: 4px;
		color: white !important;
		font-size: 34upx;
		margin-top: 200upx;
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
	.confirm-content{
		position: relative;
		text-align: center;
		width: 85%;
		border-radius: 8px;
		background: #fff;
		padding: 30upx 15upx 0;
		z-index: 2;
	}
	.confirm-container{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.confirm-wrapper{
		position: fixed;
		z-index: 1;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0,0,0,0.3);
	}
	.confirm-describe{
		color: #7c7c7c;
		margin: 20upx 0 80upx;
	}
	.confirm-btn{
		color: #ff6d7e;
		border-top: 1px solid #f3f3f3;
		padding: 20upx 0;
	}
</style>
