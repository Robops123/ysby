<template>
	<view class="chat-pannel" >

			<view class="main" >
				<!-- <chat-suit-audio
					ref="audio"
					:username="username"
					:chatType="chatType"
					@newAudioMsg="saveSendMsg"></chat-suit-audio> -->
			
				<chat-msglist class="msg-list" 
					ref="msglist"
					:username="username"
					@msglistTap="normalScroll"></chat-msglist>
			</view>
				<chat-inputbar class="ipt-bar"
					ref="inputbar"
					:username="username"
					:chatType="chatType"
					:goods.sync="goods"
					@newTextMsg="saveSendMsg"
					@newImageMsg="saveSendMsg"
					@newLocationMsg="saveSendMsg"
					@newVideoMsg="saveSendMsg"
					@tapSendAudio="toggleRecordModal"
			
					@inputFocused="shortScroll"
					@inputBlured="normalScroll"></chat-inputbar>
	</view>
	
	
</template>

<script>
	import chatMsglist from "@/comps/chat/msglist/msglist.vue";
	import chatInputbar from "@/comps/chat/inputbar/inputbar.vue"
	import chatSuitAudio from "@/comps/chat/inputbar/suit/audio/audio.vue"
	
	let msgStorage = require("./msgstorage");
	let msgType = require("./msgtype");
	export default {
		components: {
			chatMsglist,
			chatInputbar,
			chatSuitAudio
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
				type: String,
			}
		},
		data() {
			return {
				initHeight:'',
				realHeight:'',
			}
		},
		created() {
			uni.$on('saveSendMsg', (data)=>{
				this.saveSendMsg(data);
			})
			this.getHeight()
		},
		beforeDestroy() {
			uni.$off('saveSendMsg');
		},
		
		onReady() {
			
		},
		methods: {
			toggleRecordModal(){
				this.$refs.audio.toggleRecordModal();
			},
			
			normalScroll(){
				this.$refs.msglist.normalScroll();
				this.$refs.inputbar.cancelEmoji();
			},
			
			shortScroll(){
				
				// this.getHeight()
				// this.getRealHeight()
				this.$refs.msglist.shortScroll();
			},
			
			saveSendMsg(data){
				msgStorage.saveMsg(data.msg, data.type);
				// return;
				// this.data.__comps__.inputbar.cancelEmoji();
			},
			
			getMore(){
				this.$refs.msglist.getHistoryMsg()
			},
			getHeight(){
				setTimeout(() =>{
					let query = uni.createSelectorQuery().in(this);
					query.selectAll(".chat-pannel").boundingClientRect();
					query.exec((res) => {
						this.initHeight = res[0][0].height;
						
					})
				},500)
			},
			getRealHeight(){
				setTimeout(() =>{
					let query = uni.createSelectorQuery().in(this);
					query.selectAll(".chat-pannel").boundingClientRect();
					query.exec((res) => {
						
						this.realHeight = res[0][0].height;
					})
				},500)
			}
		}
	}
</script>

<style>
	*{
		box-sizing: border-box;
	}
	page{
		background-color: #fff !important;
	}
	.main {
		width: 100%;
		height: 100%;
		/* overflow: scroll; */
	}
	.chat-pannel{
		height: calc(100vh - 160rpx);
		background-color: #f8f8f8;
		position: relative;
		/* overflow: scroll; */
		/* position: absolute; */
		/* left: 0;
		top: 0;
		right: 0;
		bottom: 0; */
		/* display: flex;
		flex-direction: column; */
	}
	.ipt-bar{
		height: 160rpx;
	}
	.msg-list{
		position: relative;
		height: 100%;
		overflow: scroll;
		/* height: 100vh; */
		/* background: green; */
		
		/* flex: 1; */
		/* height: 100%; */
		/* height: calc(100% - 160rpx); */
	}
</style>
