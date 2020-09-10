<script>
	require("sdk/libs/strophe");
	let msgStorage = require("comps/chat/msgstorage");
	let msgType = require("comps/chat/msgtype");
	
	let disp = require("utils/broadcast");
	let logout = false;
	let is_reconnect = false;
	export default {
		globalData: {
			unReadMessageNum: 0,
			userInfo: null,
			saveFriendList: [],
			saveGroupInvitedList: [],
			groupList: [],
			isIPX: false //是否为iphone X
		},
		onLaunch: function() {
	
			// #ifdef APP-PLUS
			this.updateTest()
			// #endif
		},
		onShow() {
			// console.log('App Show')
			var userInfo = uni.getStorageSync('userInfo')
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.HxInit()
			}
		},
		onHide: function() {
			// console.log('App Hide')
			this.$conn.closed = true;
			this.$im.conn.close();
		},
		methods: {
	
			onLoginSuccess(){
				uni.hideToast();
				uni.switchTab({
					url: "../chat/chat"
				});
			},
			
			ack(receiveMsg){
				// 处理未读消息回执
				var bodyId = receiveMsg.id;         // 需要发送已读回执的消息id
				var ackMsg = new this.$im.message("read", this.$im.conn.getUniqueId());
				ackMsg.set({
					id: bodyId,
					to: receiveMsg.from
				});
				this.$im.conn.send(ackMsg.body);
			},
			
			onMessageError(err){
				if(err.type === "error"){
					uni.showToast({
						title: err.errorText
					});
					return false;
				}
				return true;
			},
			
			getCurrentRoute(){
				let pages = getCurrentPages();
				let currentPage = pages[pages.length - 1];
				return currentPage.route;
			},
			
			calcUnReadSpot(message){
				let myName = uni.getStorageSync("myUsername");
				let members = uni.getStorageSync("member") || []; //好友
				var listGroups = uni.getStorageSync('listGroup')|| []; //群组
				let allMembers = members.concat(listGroups)
				let count = allMembers.reduce(function(result, curMember, idx){
					let chatMsgs;
					if (curMember.roomId) {
						chatMsgs = uni.getStorageSync(curMember.roomId + myName.toLowerCase()) || [];
					}else{
						chatMsgs = uni.getStorageSync(curMember.name.toLowerCase() + myName.toLowerCase()) || [];
					}
					return result + chatMsgs.length;
				}, 0);
				this.$options.globalData.unReadMessageNum = count;
				disp.fire("em.xmpp.unreadspot", message);
			},
			// 初始化方法
			HxInit(){
				var me = this;
				var logs = uni.getStorageSync("logs") || [];
				logs.unshift(Date.now());
				uni.setStorageSync("logs", logs);
				
				disp.on("em.main.ready", function(){
					me.calcUnReadSpot();
				});
				//离开chatroom
				disp.on("em.chatroom.leave", function(){
					// console.log('em.chatroom.leave');
					me.calcUnReadSpot();
				});
				disp.on("em.chat.session.remove", function(){
					me.calcUnReadSpot();
				});
				disp.on('em.chat.audio.fileLoaded', function(){
					me.calcUnReadSpot()
				});
				
				disp.on('em.main.deleteFriend', function(){
					me.calcUnReadSpot()
				});
				disp.on('em.chat.audio.fileLoaded', function(){
					me.calcUnReadSpot()
				});
				
				
				var userInfo = uni.getStorageSync('userInfo')
				if(userInfo!='' & userInfo!=null & userInfo!=undefined){
					this.$conn.open({
												apiUrl: this.$im.config.apiURL,
												user: userInfo.hx_openid,
												pwd: userInfo.hx_pwd,
												grant_type: 'password',
												appKey: this.$im.config.appkey,
											});
											uni.setStorageSync('myUsername',userInfo.hx_openid)
				}
				
				
				
				this.$im.conn.listen({
					onOpened: (message)=>{
						this.$im.conn.setPresence();
						console.log('登录成功');
						message.accessToken && uni.setStorageSync("myToken", message.accessToken);
						if (is_reconnect) {
							uni.hideToast();
							// this.$helper.toast('success', '登陆成功', 2000)
							is_reconnect = false;
						}
						// if(this.getCurrentRoute() == "pages/login/login" || getCurrentRoute() == "pages/login_token/login_token"){
						// 	this.onLoginSuccess();
						// }
						
					},
					onReconnect: ()=>{
						console.log('reconnect')
						// this.$helper.toast('loading', '重连中...', 2000)
					},
					onSocketConnected: ()=>{
						console.log('socketConnected')
						// this.$helper.toast('success', '登陆成功', 2000)
					},
					onClosed: ()=>{
						console.log('close')
						// this.$helper.toast('none', '网络已断开', 2000)
						this.$conn.closed = true;
						this.$im.conn.close();
					},
					onInviteMessage: (message)=>{
						this.$options.globalData.saveGroupInvitedList.push(message);
						disp.fire("em.xmpp.invite.joingroup", message);
						// uni.showModal({
						// 	title: message.from + " 已邀你入群 " + message.roomid,
						// 	success(){
						// 		disp.fire("em.xmpp.invite.joingroup", message);
						// 	},
						// 	error(){
						// 		disp.fire("em.xmpp.invite.joingroup", message);
						// 	}
						// });
					},
					onPresence: (message)=>{
						console.log("onPresence", message);
						switch(message.type){
						case "unsubscribe":
							// pages[0].moveFriend(message);
							break;
						// 好友邀请列表
						case "subscribe":
							if(message.status === "[resp:true]"){
								return;
							}
							else{
								// pages[0].handleFriendMsg(message);
								for (let i = 0; i < this.$options.globalData.saveFriendList.length; i ++) {
							      	if(this.$options.globalData.saveFriendList[i].from === message.from){
							      		this.$options.globalData.saveFriendList[i] = message
							      		disp.fire("em.xmpp.subscribe");
										return;
							 		}
							    }
								this.$options.globalData.saveFriendList.push(message);
								disp.fire("em.xmpp.subscribe");
							}
							break;
						case "subscribed":
							uni.showToast({
								title: "添加成功",
								duration: 1000
							});
							disp.fire("em.xmpp.subscribed");
							break;
						case "unsubscribed":
							uni.showToast({
								title: "已拒绝",
								duration: 1000
							});
							break;
						case "memberJoinPublicGroupSuccess":
							this.$helper.toast('none', '已进群', 1000)
							break;
						// 好友列表
						// case "subscribed":
						// 	let newFriendList = [];
						// 	for(let i = 0; i < me.$options.globalData.saveFriendList.length; i++){
						// 		if(me.$options.globalData.saveFriendList[i].from != message.from){
						// 			newFriendList.push(me.$options.globalData.saveFriendList[i]);
						// 		}
						// 	}
						// 	me.$options.globalData.saveFriendList = newFriendList;
						// 	break;
						// 删除好友
						case "unavailable":
							disp.fire("em.xmpp.contacts.remove");
							disp.fire("em.xmpp.group.leaveGroup", message);
							break;
				
						case 'deleteGroupChat':
							disp.fire("em.xmpp.invite.deleteGroup", message);
							break;
				
						case "leaveGroup": 
							disp.fire("em.xmpp.group.leaveGroup", message);
							break;
				
						case "removedFromGroup": 
							disp.fire("em.xmpp.group.leaveGroup", message);
							break;
						// case "joinChatRoomSuccess":
						// 	uni.showToast({
						// 		title: "JoinChatRoomSuccess",
						// 	});
						// 	break;
						// case "memberJoinChatRoomSuccess":
						// 	uni.showToast({
						// 		title: "memberJoinChatRoomSuccess",
						// 	});
						// 	break;
						// case "memberLeaveChatRoomSuccess":
						// 	uni.showToast({
						// 		title: "leaveChatRoomSuccess",
						// 	});
						// 	break;
				
						default:
							break;
						}
					},
				
					onRoster: (message)=>{
						// let pages = getCurrentPages();
						// if(pages[0]){
						// 	pages[0].onShow();
						// }
					},
				
					onVideoMessage: (message)=>{
						console.log("onVideoMessage: ", message);
						if(message){
							msgStorage.saveReceiveMsg(message, msgType.VIDEO);
						}
						this.calcUnReadSpot(message);
						this.ack(message);
					},
				
					onAudioMessage: (message)=>{
						console.log("onAudioMessage", message);
						if(message){
							if(this.onMessageError(message)){
								msgStorage.saveReceiveMsg(message, msgType.AUDIO);
							}
							this.calcUnReadSpot(message);
							this.ack(message);
						}
					},
					
					onCmdMessage: (message)=>{
						console.log("onCmdMessage", message);
						if(message){
							if(this.onMessageError(message)){
								msgStorage.saveReceiveMsg(message, msgType.CMD);
							}
							this.calcUnReadSpot(message);
							this.ack(message);
						}
					},
				
					// onLocationMessage: (message)=>{
					// 	console.log("Location message: ", message);
					// 	if(message){
					// 		msgStorage.saveReceiveMsg(message, msgType.LOCATION);
					// 	}
					// },
				
					onTextMessage: (message)=>{
						if(message){
							if(this.onMessageError(message)){
								msgStorage.saveReceiveMsg(message, msgType.TEXT);
							}
							this.calcUnReadSpot(message);
							this.ack(message);
						}
					},
					onCustomizeMessage: (message)=>{
						if(message){
							if(this.onMessageError(message)){
								msgStorage.saveReceiveMsg(message, msgType.CUSTOMIZE);
							}
							this.calcUnReadSpot(message);
							this.ack(message);
						}
					},
				
					onEmojiMessage: (message)=>{
						if(message){
							if(this.onMessageError(message)){
								msgStorage.saveReceiveMsg(message, msgType.EMOJI);
							}
							this.calcUnReadSpot(message);
							this.ack(message);
						}
					},
				
					onPictureMessage: (message)=>{
						console.log("onPictureMessage", message);
						if(message){
							if(this.onMessageError(message)){
								msgStorage.saveReceiveMsg(message, msgType.IMAGE);
							}
							this.calcUnReadSpot(message);
							this.ack(message);
						}
					},
				
					onFileMessage: (message)=>{
						if (message) {
							if(this.onMessageError(message)){
								msgStorage.saveReceiveMsg(message, msgType.FILE);
							}
							this.calcUnReadSpot(message);
							this.ack(message);
						}
					},
				
					// 各种异常
					onError: (error)=>{
						uni.showToast({
							title: error.type,
							icon: 'success',
							duration: 2000
						});
						// 16: server-side close the websocket connection
						if(error.type == this.$im.statusCode.WEBIM_CONNCTION_DISCONNECTED && !logout){
							if(this.$im.conn.autoReconnectNumTotal < this.$im.conn.autoReconnectNumMax){
								return;
							}
							uni.showToast({
								title: "服务端关闭连接",
							});
							// uni.redirectTo({
							// 	url: "../login/login"
							// });
							logout = true
							return;
						}
						// 8: offline by multi login
						if(error.type == this.$im.statusCode.WEBIM_CONNCTION_SERVER_ERROR){
							uni.showToast({
								title: "出现异地登录，连接断开",
							});
							// uni.redirectTo({
							// 	url: "../login/login"
							// });
						}
						if(error.type ==  this.$im.statusCode.WEBIM_CONNCTION_OPEN_ERROR){
							disp.fire("em.xmpp.error.passwordErr");
							// uni.showModal({
							// 	title: "用户名或密码错误",
							// 	confirmText: "OK",
							// 	showCancel: false
							// });
						}
						if (error.type == this.$im.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
							disp.fire("em.xmpp.error.tokenErr");
						}
						if (error.type == 'socket_error') {///sendMsgError
							uni.showToast({
								title: error.type,
								duration: 2000
							});
							disp.fire("em.xmpp.error.sendMsgErr", error);
							this.$conn.closed = true;
							this.$im.conn.close();
						}
					},
				});
				
				// 重新登录
				if(!this.$im.conn.isOpened() && uni.getStorageSync("myToken") && uni.getStorageSync("myUsername")) {
					is_reconnect = true;
					// this.$helper.toast('loading', '自动登陆中...', 10000, true);
					//尝试使用token重新登陆
				}
			},
			updateTest(){
				plus.runtime.getProperty(plus.runtime.appid,(widgetInfo) =>{
					var url='&r=api.update.hot',
					params={
						version:widgetInfo.version,
						name:widgetInfo.name 
					},that=this
					this.$apiPost(url,params).then((res) =>{
						if(res.update=="1" && res.wgtUrl){
							uni.showModal({
								title:'提示',
								content:'可以更新',
								confirmText:'更新',
								cancelText:'不更新',
								success: (cres) => {
								        if (cres.confirm) {
								            that.$loading('下载中')
								 var task=plus.downloader.createDownload(
								            	res.wgtUrl,
								            	{filename:'_doc/update/' + widgetInfo.name + '/' + new Date().getTime() + '/'},
								            	function(result,code){
								            		uni.hideLoading()
													let filePath = result.filename;
								            		that.$loading('安装中...')
								            		                       plus.runtime.install(filePath, {  
								            		                           force: false  
								            		                       }, function(e) {  
								            								   uni.hideLoading()
								            									   // that.$msg('安装成功，等待重启')
																				   plus.runtime.restart(); 
								            		                            
								            		                       }, function(e) {  
								            								   uni.hideLoading()
								            									   that.$msg('安装失败')
								            		                       });  
								            	}
								            )
											task.start()
								        } else if (cres.cancel) {
								            console.log('用户点击取消');
								        }
								    }
							})
						}
					}).catch((reason) =>{
						this.$msg(reason)
						console.log(reason)
					})
					 // uni.request({  
					 //        url: 'http://www.example.com/update/',  
					 //        data: {  
					 //            version: widgetInfo.version,  
					 //            name: widgetInfo.name  
					 //        },  
					 //        success: (result) => {  
					 //            var data = result.data;  
					 //            if (data.update && data.wgtUrl) {  
					 //                uni.downloadFile({  
					 //                    url: data.wgtUrl,  
					 //                    success: (downloadResult) => {  
					 //                        if (downloadResult.statusCode === 200) {  
					 //                            plus.runtime.install(downloadResult.tempFilePath, {  
					 //                                force: false  
					 //                            }, function() {  
					 //                                console.log('install success...');  
					 //                                plus.runtime.restart();  
					 //                            }, function(e) {  
					 //                                console.error('install fail...');  
					 //                            });  
					 //                        }  
					 //                    }  
					 //                });  
					 //            }  
					 //        }  
					 //    });  
				})
				
			}
		},
	}
</script>

<style>
@import "./static/css/iconfont.css";
	@import './static/css/common.css';
	@import './static/css/animate.css';
	/* @import url("/components/gaoyia-parse/parse.css"); */

	
	
	
</style>
