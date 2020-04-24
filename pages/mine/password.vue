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
				<text>确认</text>
				<input type="password" v-model="form.confirmPass" placeholder="再次填写确认"/>
			</view>
		</view>
		
		<view style="text-align: center;">
			<button type="default" class="btn" @click="changePwd">完成</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				url:'&r=api.member.setting.changePwd',
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
					  that.$msg('修改成功')
					  uni.hideLoading()
					  setTimeout(function(){
						  uni.navigateBack({
						  	delta:1
						  })
					  },300)
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
		color: white;
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
</style>
