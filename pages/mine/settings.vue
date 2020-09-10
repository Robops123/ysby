<template>
	<view>
		<view class="option-box" v-if="logined">
			<view class="option-item" @click="to('personal')">
				<text>个人资料</text>
				<text class="f1 fr"><text class="icon-arrow-right iconfont"></text></text>
			</view>
			<view class="option-item" @click="to('account',is_oAuth)">
				<text>账号与安全</text>
				<text class="f1 fr"><text class="icon-arrow-right iconfont"></text></text>
			</view>
		</view>
		
		<view class="option-box">
			<view class="option-item" @click="to('suggestion')" v-show="logined">
				<text>意见反馈</text>
				<text class="f1 fr"><text style="padding-right: 20upx;">让我们更好</text><text class="icon-arrow-right iconfont"></text></text>
			</view>
			<view class="option-item" @click="to('aboutUs')">
				<text>关于我们</text>
				<text class="f1 fr"><text class="icon-arrow-right iconfont"></text></text>
			</view>
		</view>
		
		<view>
			<button type="primary" class="btn" @click="quit" v-if="logined">退出登录</button>
		</view>
		
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				logined:false,
				visible:false,
				is_oAuth:''
			}
		},
		onLoad(p){
			this.is_oAuth=p.is_oAuth
			console.log(this.is_oAuth)
			var userInfo=uni.getStorageSync('userInfo'),that=this
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.logined=true
			} else{
				this.logined=false
			}
			uni.$on('logined',function(){
				var userInfo2=uni.getStorageSync('userInfo')
				that.logined=true
			})
		},
		methods:{
			to(where,data){
				var ce=this.$operateInterceptor(this.logined)
				if(!ce){
					return ;
				}
				uni.navigateTo({
					url:`/pages/mine/${where}?data=${data}`
				})
			},
			quit(){
				this.$conn.closed = true;
				this.$im.conn.close();
				uni.removeStorageSync('userInfo')
				this.$msg('退出成功')
				this.$conn.closed = true;
				this.$im.conn.close();
				setTimeout(function(){
					uni.navigateBack({
						delta:1
					})
				},1000)
			},
			openPop(){
				// this.content=''
				// this.visible=true
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
	.fr{
		float: right;
	}
	
	.btn{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 75upx;
		background: white !important;
		text-align: center;
		line-height: 75upx;
		color: black !important;
		letter-spacing: 4px;
		font-size: 34upx;
	}

</style>
