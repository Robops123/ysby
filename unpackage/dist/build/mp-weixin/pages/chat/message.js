(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/chat/message"],{"278d":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var o=function(){var t=this,e=t.$createElement;t._self._c},r=[]},"3b3f":function(t,e,n){"use strict";n.r(e);var a=n("5620"),o=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=o.a},5620:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("a34a"));function o(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,a,o,r,u){try{var i=t[r](u),c=i.value}catch(s){return void n(s)}i.done?e(c):Promise.resolve(c).then(a,o)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(a,o){var u=t.apply(e,n);function i(t){r(u,a,o,i,c,"next",t)}function c(t){r(u,a,o,i,c,"throw",t)}i(void 0)}))}}var i=function(){n.e("comps/uni/uni-swipe-action/uni-swipe-action").then(function(){return resolve(n("8fee"))}.bind(null,n)).catch(n.oe)},c=n("7657"),s=n("ac99"),h={components:{uniSwipeAction:i},data:function(){return{uid:"",token:"",focus:!1,search_btn:!0,search_chats:!1,show_mask:!1,yourname:"",unReadSpotNum:0,unReadNoticeNum:0,messageNum:0,unReadTotalNotNum:0,arr:[],show_clear:!1,gotop:!1,input_code:"",options:[{text:"置顶"},{text:"标记为已读",style:{backgroundColor:"rgb(254,156,1)"}},{text:"删除",style:{backgroundColor:"rgb(255,58,49)"}}]}},onLoad:function(){var e=this,n=t.getStorageSync("userInfo");""!=n&null!=n&void 0!=n&&(this.uid=n.uid,this.token=n.token),this.arr=this.getChatList(),s.on("em.xmpp.unreadspot",(function(t){e.arr=e.getChatList(),e.unReadSpotNum=getApp().globalData.unReadMessageNum>99?"99+":getApp().globalData.unReadMessageNum})),s.on("em.xmpp.contacts.remove",(function(){e.getRoster()}));var a=this;c.on("newChatMsg",(function(n,o,r,u){var i=t.getStorageSync("member")||[],c=!1;if(0==i.length)i.push({name:n.yourname}),e.transToName(i);else{for(var s=0;s<i.length;s++)i[s].name==n.yourname&&(c=!0);c?a.transToName(i):(i.push({name:n.yourname}),e.transToName(i))}}))},onShow:function(){this.unReadSpotNum=getApp().globalData.unReadMessageNum>99?"99+":getApp().globalData.unReadMessageNum,this.messageNum=getApp().globalData.saveFriendList.length,this.unReadNoticeNum=getApp().globalData.saveGroupInvitedList.length,this.unReadTotalNotNum=getApp().globalData.saveFriendList.length+getApp().globalData.saveGroupInvitedList.length},methods:{openSearch:function(){var t=this;this.search_btn=!1,this.search_chats=!0,this.gotop=!0,setTimeout((function(){t.focus=!0}),300)},onSearch:function(t){var e=t.detail.value,n=this.getChatList(),a=[];n.forEach((function(t,n){-1!=String(t.username).indexOf(e)&&a.push(t)})),this.arr=a},cancel:function(){this.search_btn=!0,this.search_chats=!1,this.gotop=!1,this.focus=!1,this.arr=this.getChatList(),this.unReadSpotNum=getApp().globalData.unReadMessageNum>99?"99+":getApp().globalData.unReadMessageNum},clearInput:function(){this.input_code="",this.show_clear=!1},onInput:function(t){var e=t.detail.value;this.show_clear=!!e},getRoster:function(){var e=this,n={success:function(n){for(var a=[],o=0;o<n.length;o++)"both"==n[o].subscription&&a.push(n[o]);t.setStorage({key:"member",data:a}),e.listGroups(),s.fire("em.main.ready"),e.arr=e.getChatList(),e.unReadSpotNum=getApp().globalData.unReadMessageNum>99?"99+":getApp().globalData.unReadMessageNum},error:function(t){console.log(t)}};this.$im.conn.getRoster(n)},listGroups:function(){var e=this;return this.$im.conn.listRooms({success:function(n){t.setStorage({key:"listGroup",data:n}),e.getChatList()},error:function(t){console.log(t)}})},getChatList:function(){for(var e=[],n=t.getStorageSync("member"),a=t.getStorageSync("myUsername"),o=t.getStorageSync("listGroup")||[],r=0;r<n.length;r++){var u=t.getStorageSync(n[r].name+a)||[],i=t.getStorageSync("rendered_"+n[r].name+a)||[],c=i.concat(u);if(c.length){var s=c[c.length-1];s.unReadCount=u.length,s.unReadCount>99&&(s.unReadCount="99+");var h=s.time.split(" ")[0].split("-"),g=s.time.split(" ")[1].split(":"),l=h[2]<10?"0"+h[2]:h[2];s.dateTimeNum="".concat(h[1]).concat(l).concat(g[0]).concat(g[1]).concat(g[2]),s.time="".concat(h[1],"月").concat(h[2],"日 ").concat(g[0],"时").concat(g[1],"分"),s.chatTarget=n[r].chatTarget,e.push(s)}}for(var m=0;m<o.length;m++){var f=t.getStorageSync(o[m].roomId+a)||[],d=t.getStorageSync("rendered_"+o[m].roomId+a)||[],p=d.concat(f);if(p.length){var v=p[p.length-1];v.unReadCount=f.length,v.unReadCount>99&&(v.unReadCount="99+");var b=v.time.split(" ")[0].split("-"),y=v.time.split(" ")[1].split(":"),S=b[2]<10?"0"+b[2]:b[2];v.time="".concat(b[1],"月").concat(b[2],"日 ").concat(y[0],"时").concat(y[1],"分"),v.dateTimeNum="".concat(b[1]).concat(S).concat(y[0]).concat(y[1]).concat(y[2]),v.groupName=o[m].name,e.push(v)}}return e.sort((function(t,e){return e.dateTimeNum-t.dateTimeNum})),e},transToName:function(e){var n=this;return u(a.default.mark((function o(){var r,u;return a.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:r=a.default.mark((function t(o){return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e[o].chatTarget){t.next=3;break}return t.next=3,n.getNameById(e[o].name).then((function(t){e[o].chatTarget=t||""}));case 3:case"end":return t.stop()}}),t)})),u=0;case 2:if(!(u<e.length)){o.next=7;break}return o.delegateYield(r(u),"t0",4);case 4:u++,o.next=2;break;case 7:t.setStorageSync("member",e),n.arr=n.getChatList();case 9:case"end":return o.stop()}}),o)})))()},getNameById:function(t){var e=this,n={uid:this.uid,token:this.token,hxid:t},a="&r=api.member.assist.hxidToMerch";return new Promise((function(t,o){e.$apiPost(a,n).then((function(e){t(e.data.nickname)})).catch((function(t){e.$msg(t)}))}))},into_chatRoom:function(t){var e=t;"groupchat"==e.chatType||"chatRoom"==e.chatType||e.groupName?this.into_groupChatRoom(e):this.into_singleChatRoom(e)},into_singleChatRoom:function(e){var n={myName:e.username,your:e.yourname};t.$emit("reduceMsg",e.unReadCount),t.navigateTo({url:"../chat/chat?username="+JSON.stringify(n)+"&title="+e.chatTarget})},into_groupChatRoom:function(e){var n=t.getStorageSync("myUsername"),a={myName:n,your:e.groupName,groupId:e.info.to};t.navigateTo({url:"../groupChatRoom/groupChatRoom?username="+JSON.stringify(a)})},action_click:function(t,e){switch(t.index){case 2:this.del_chat(e);break;default:break}},del_chat:function(e){var n,a=e;n="groupchat"==a.chatType||"chatRoom"==a.chatType?{your:a.info.to}:{your:a.username};var o=t.getStorageSync("myUsername"),r=getCurrentPages();t.showModal({title:"",content:"删除该聊天记录?",confirmText:"删除",success:function(e){e.confirm&&(t.setStorageSync(n.your+o,""),t.setStorageSync("rendered_"+n.your+o,""),r[0]&&r[0].onShow(),s.fire("em.chat.session.remove"))},fail:function(t){}})}}};e.default=h}).call(this,n("543d")["default"])},"5d9f":function(t,e,n){"use strict";(function(t){n("fabc");a(n("66fd"));var e=a(n("82aa"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"82aa":function(t,e,n){"use strict";n.r(e);var a=n("278d"),o=n("3b3f");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("bbbc");var u,i=n("f0c5"),c=Object(i["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);e["default"]=c.exports},"99f2":function(t,e,n){},bbbc:function(t,e,n){"use strict";var a=n("99f2"),o=n.n(a);o.a}},[["5d9f","common/runtime","common/vendor"]]]);