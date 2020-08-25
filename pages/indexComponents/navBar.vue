<template>
	<view>
		<view class="nav padding" style="padding-bottom: 10upx;">
			<!-- #ifdef APP-PLUS || H5 -->
				<uni-status-bar />
			<!-- #endif -->
			<view class="nav-content">
				<image src="../../static/img/pic/index/address.png" mode="" class="" style="width: 0.9rem;height: 1rem;margin: 3px 3px 0 0;"></image>
				<!-- <text class="iconfont icon-address cr" ></text> -->
				<view class="cityName ellipsis" v-show="located">{{city ? city:'定位中'}}</view>
				<view v-show="!located" @click="reLocate">重新获取</view>
				<view class="search-line">
					<icon type="search" size="20" class="icon" />
					<input type="text" v-model="keywords" @confirm='search' placeholder="搜索"/>
				</view>
				<view class="comment" @click="toMessage">
					<image src="../../static/img/pic/msg.png" mode="" class="" ></image>
					<uni-badge :text="msgNum" type='main' class="badge" size="small" v-show="msgNum>0"></uni-badge>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let msgStorage = require("@/comps/chat/msgstorage");
	export default{
		props:['located','city','logined','uid','token'],
		data(){
			return {
				keywords:'',
				msgNum:'',
			}
		},
		mounted(){
			if(this.logined){
				let members=uni.getStorageSync('member') || []
				this.transToName(members)
				this.calcUnRead()
				this.msgListener()
			}
		},
		watch:{
			logined(n){
				if(n===true){
					this.msgListener()
				}
			}
		},
		methods:{
			reLocate(){
				uni.showModal({
					title:'提示',
					content:'重新获取定位?',
					success:() =>{
						uni.$emit('relocate')
					}
				})
			},
			search(){
				uni.navigateTo({
					url:`/pages/index/searchResult?keyword=${this.keywords}`
				})
			},
			toMessage(){
				uni.$on('reduceMsg',(res) =>{
					this.msgNum-=res
				})
				uni.navigateTo({
					url:`/pages/chat/message`
				})
			},
			// hx
			msgListener(){
				var that=this
				msgStorage.on("newChatMsg", function(renderableMsg, type, curChatMsg, sesskey){
					console.log(renderableMsg, type, curChatMsg, sesskey)
					// 判断是否属于当前会话
					let members=uni.getStorageSync('member') || [],
					existance=false
					
					if(members.length==0){
						members.push({
							name:renderableMsg.yourname
						})
						// for(var i=0;i<members.length;i++){
							that.transToName(members)
						// }
					}else {
						for(var i=0;i<members.length;i++){
							if(members[i].name==renderableMsg.yourname){
								existance=true
							}
						}
						if(!existance){
							members.push({
								name:renderableMsg.yourname
							})
							// for(var i=0;i<members.length;i++){
								that.transToName(members)
							// }
						}else{
							that.transToName(members)
						}
					}
					
				});
			},
			async transToName(members){
				for(let i=0;i<members.length;i++){
					if(!members[i].chatTarget){
				await	this.getNameById(members[i].name).then((res) =>{
							if(res){
								members[i].chatTarget=res
							}else{
								members[i].chatTarget=''
							}
						})
						// members[i].chatTarget=await this.getNameById(members[i].name)
						// console.log(name)
					}
				}
				uni.setStorageSync('member',members)
				this.calcUnRead();
			},
			getNameById(id){
				var that=this,merchname,
				params={
					uid:this.uid,
					token:this.token,
					hxid:id
				}
				  var url='&r=api.member.assist.hxidToMerch'
				  return new Promise((resolve,reject) =>{
					  this.$apiPost(url,params).then((res) =>{
						  resolve(res.data.merchname)
					  }).catch((err) =>{
						  resolve('')
						  uni.hideToast()
					  	// this.$msg(err)
					  })
				  })
				  
			},
			calcUnRead(){
				var member = uni.getStorageSync("member");
				var myName = uni.getStorageSync("myUsername");
				var num=0
				for(let i = 0; i < member.length; i++){
					let newChatMsgs = uni.getStorageSync(member[i].name + myName) || [];
					let historyChatMsgs = uni.getStorageSync("rendered_" + member[i].name + myName) || [];
					let curChatMsgs = historyChatMsgs.concat(newChatMsgs);
					if(curChatMsgs.length){
						let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
						if(lastChatMsg.info.from!=lastChatMsg.username){
							num+=newChatMsgs.length
						}
						
						// lastChatMsg.unReadCount = newChatMsgs.length;
						// if(lastChatMsg.unReadCount > 99) {
						// 	lastChatMsg.unReadCount = "99+";
						// }
						
					}
				}
				if(num > 99){
					num='99+'
				}
				if(num>0){
					this.msgNum=num
					const innerAudioContext = uni.createInnerAudioContext();
					innerAudioContext.src = '/static/media/msgNotice.mp3';
					innerAudioContext.play()
				}
			},
		}
	}
</script>

<style>
	.nav{
		z-index: 999;
		background-color: #fff;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		box-sizing: border-box;
		/* #ifdef MP */
		padding-top: 0 !important;
		/* #endif */
		
	}
	.nav .nav-content{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.search-line{
		/* height: 120upx; */
		background-color: #f4f4f4;
		border-radius: 120upx;
		flex: 1;
		margin: 0 40upx;
		padding: 8upx 15upx;
	}
	.search-line icon{
		display: inline-block;
			vertical-align: middle;
	}
	.search-line input{
		display: inline-block;
		width: 70%;
		height: 100%;
		vertical-align: middle;
		margin-left: 10upx;
	}
	.comment image{
		position: relative;
		width: 45upx;
		height: 40upx;
		display: inline-block;
		vertical-align: middle;
	}
	.cityName{
		max-width: 120upx;
		overflow: hidden;
	}
	
	.comment{
		position: relative;
	}
	.badge{
		position: absolute;
		right: -8px;
		top: -8px;
	}
	.collectnum{
		margin:0 15upx;
	}
</style>
