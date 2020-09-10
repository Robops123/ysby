<template>
	
		<!-- <view class="f-row"> -->
		<view class="text-input between">
				<input
					class="f news"
					type="text"
					v-model="inputMessage"
					cursor-spacing="65"
					confirm-type="send"
					@confirm="sendMessage('txt')"
					@input="bindMessage"
					@tap="focus"
					@focus="focus"
					@blur="blur"
					placeholder="输入新消息"
					placeholder-style="color:#CFCFCF; padding-left:5px;"
					 />
					 
					 <button class="send_btn" @click="sendMessage('txt')">发送</button>
					 
					 
					 <view class="goods-prompt" v-show="hasGoods" @click="sendMessage('customize')">
						 <view class="title">发送该商品</view>
						 <image :src="goodsInfo.pic" mode="" class="goods-pic"></image>
						 <view class="price">￥{{goodsInfo.price}}</view>
						 
						 
						 <image src="/static/img/pic/index/arrow_target.png" mode="" class="arrow-target"></image>
					 </view>
		</view>
	
</template>

<script>
	let msgType = require("../../../msgtype");
	let disp = require("../../../../../utils/broadcast");
	
	export default {
		components: {
			
		},
		props: {
			username: {
				type: Object,
				value: {},
			},
			chatType: {
				type: String,
				value: msgType.chatType.SINGLE_CHAT,
			},
			goods:{
				type: String
			}
		},
		data() {
			return {
				inputMessage: "",		// render input 的值
				userMessage: "",		// input 的实时值
				hasGoods:false,
				goodsInfo:'',
				timer:''
			}
		},
		created() {
			// var goods=this.$parent.$parent.$parent.$parent.goods
			// #ifdef APP-PLUS
			if(this.goods){
				this.goodsInfo=JSON.parse(this.goods)
				this.hasGoods=true
				this.timer=setTimeout(() =>{
					this.hasGoods=false
				},5000)
			}
			// #endif
			// #ifdef MP
			console.log(this.$parent)
			setTimeout(() =>{
				if(this.$parent.goods){
					this.goodsInfo=JSON.parse(this.$parent.goods)
					this.hasGoods=true
					this.timer=setTimeout(() =>{
						this.hasGoods=false
					},5000)
				}
			},300)
			
			// #endif
		},
		
		onReady() {
			
		},
		methods: {
			focus(){
				this.$emit('inputFocused')
			},
			
			blur(){
				this.$emit('inputBlured')
			},
			
			isGroupChat(){
				return this.chatType == msgType.chatType.CHAT_ROOM;
			},
			
			getSendToParam(){
				return this.isGroupChat() ? this.username.groupId : this.username.your;
			},
			
			// bindinput 不能打冒号！
			bindMessage(e){
				this.userMessage = e.detail.value
			},
			
			emojiAction(emoji){
				var str;
				var msglen = this.userMessage.length - 1;
				if(emoji && emoji != "[del]"){
					str = this.userMessage + emoji;
				}
				else if(emoji == "[del]"){
					let start = this.userMessage.lastIndexOf("[");
					let end = this.userMessage.lastIndexOf("]");
					let len = end - start;
					if(end != -1 && end == msglen && len >= 3 && len <= 4){
						str = this.userMessage.slice(0, start);
					}
					else{
						str = this.userMessage.slice(0, msglen);
					}
				}
				this.userMessage = str,
				this.inputMessage = str
			},
			
			sendMessage(type){
				this.hasGoods=false
				clearTimeout(this.timer)
				let me = this;
				String.prototype.trim=function()
				{
				     return this.replace(/(^\s*)|(\s*$)/g, '');
				}
				if(type=='txt'){
					if(!this.userMessage.trim()){
						return;
					}
				}
				let id = this.$im.conn.getUniqueId();
				let msg = new this.$im.message(type, id);
				msg.set({
					msg: this.userMessage || me.goodsInfo,
					from: this.username.myName,
					to: this.getSendToParam(),
					roomType: false,
					chatType: this.chatType,
					success(id, serverMsgId){
						//console.log('成功了')
						if(type=='customize'){
							me.userMessage=me.goodsInfo
						}
						disp.fire('em.chat.sendSuccess', id, me.userMessage);
					},
					fail(id, serverMsgId){
						console.log('失败了')
					}
				});
				if(this.chatType == msgType.chatType.CHAT_ROOM){
					msg.setGroup("groupchat");
				}
				try{
					this.$im.conn.send(msg.body);
				}catch(e){
					console.log(e);
				}
				
				uni.$emit('saveSendMsg', {
					msg: msg,
					type: type,
				})
				this.userMessage = '';
				this.inputMessage = '';
			},
		}
	}
</script>

<style>
	
.text-input {
	width: 100%;
	height: 100rpx;
	padding: 0 20rpx 0 40rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	/* display: block; */
}
.text-input image{
	width: 40rpx;
}
.text-input button{
	
}
.text-input input{
	height: 100%;
	flex: 1;
}

.news {
	/* width: 100%; */
	/* height: 62rpx; */
	font-size: 14px;
	box-sizing: border-box;
	/* padding: 0 32rpx; */
	display: inline-block;
	/* margin-top: 10rpx; */
	/* line-height: 48rpx; */
	position:relative;
	top: 0;
}

.send_btn {
	height: 60rpx;
	line-height: 60rpx;
	font-size: 17px;
	color: #fff;
	padding: 0;
	display: inline-block;
	float: right;
	padding: 0 20rpx;
	background-color: #ff6d7e;
	
}

.f-row{
	/* height:100rpx; */
	display:flex;
	align-items:center;
}


.goods-prompt{
	position: absolute;
	bottom: 130rpx;
	padding: 15rpx;
	border: 1px solid #cecece;
	border-radius: 10rpx;
	right: 20rpx;
	background-color: #fff;
}
.goods-prompt .title{
	font-size: 28rpx;
}
.goods-prompt .arrow-target{
	width: 20rpx;
	height: 20rpx;
	position: absolute;
	bottom: -20rpx;
	right: 40rpx;
}
.goods-prompt .goods-pic{
	width: 250rpx;
	height: 250rpx;
	margin: 15rpx 0;
}
.price{
	font-size: 24rpx;
	color:#E12635;
}
</style>
