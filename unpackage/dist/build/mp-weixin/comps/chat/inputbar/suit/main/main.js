(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["comps/chat/inputbar/suit/main/main"],{"07b4":function(e,t,s){"use strict";var n,i=function(){var e=this,t=e.$createElement;e._self._c},a=[];s.d(t,"b",(function(){return i})),s.d(t,"c",(function(){return a})),s.d(t,"a",(function(){return n}))},4886:function(e,t,s){"use strict";var n=s("d525"),i=s.n(n);i.a},"5c31":function(e,t,s){"use strict";s.r(t);var n=s("bd00"),i=s.n(n);for(var a in n)"default"!==a&&function(e){s.d(t,e,(function(){return n[e]}))}(a);t["default"]=i.a},bd00:function(e,t,s){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=s("57fd"),i=s("ac99"),a={components:{},props:{username:{type:Object,value:{}},chatType:{type:String,value:n.chatType.SINGLE_CHAT}},data:function(){return{inputMessage:"",userMessage:""}},created:function(){},onReady:function(){},methods:{focus:function(){this.$emit("inputFocused")},blur:function(){this.$emit("inputBlured")},isGroupChat:function(){return this.chatType==n.chatType.CHAT_ROOM},getSendToParam:function(){return this.isGroupChat()?this.username.groupId:this.username.your},bindMessage:function(e){this.userMessage=e.detail.value},emojiAction:function(e){var t,s=this.userMessage.length-1;if(e&&"[del]"!=e)t=this.userMessage+e;else if("[del]"==e){var n=this.userMessage.lastIndexOf("["),i=this.userMessage.lastIndexOf("]"),a=i-n;t=-1!=i&&i==s&&a>=3&&a<=4?this.userMessage.slice(0,n):this.userMessage.slice(0,s)}this.userMessage=t,this.inputMessage=t},sendMessage:function(){var t=this;if(String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")},this.userMessage.trim()){var s=this.$im.conn.getUniqueId(),a=new this.$im.message(n.TEXT,s);console.log(this.chatType,this.username.myName,this.getSendToParam(),s,a),a.set({msg:this.userMessage,from:this.username.myName,to:this.getSendToParam(),roomType:!1,chatType:this.chatType,success:function(e,s){console.log(e,s),i.fire("em.chat.sendSuccess",e,t.userMessage)},fail:function(e,t){console.log("失败了")}}),this.chatType==n.chatType.CHAT_ROOM&&a.setGroup("groupchat");try{this.$im.conn.send(a.body)}catch(u){console.log(u)}e.$emit("saveSendMsg",{msg:a,type:n.TEXT}),this.userMessage="",this.inputMessage=""}}}};t.default=a}).call(this,s("543d")["default"])},c1f9:function(e,t,s){"use strict";s.r(t);var n=s("07b4"),i=s("5c31");for(var a in i)"default"!==a&&function(e){s.d(t,e,(function(){return i[e]}))}(a);s("4886");var u,r=s("f0c5"),c=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);t["default"]=c.exports},d525:function(e,t,s){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'comps/chat/inputbar/suit/main/main-create-component',
    {
        'comps/chat/inputbar/suit/main/main-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c1f9"))
        })
    },
    [['comps/chat/inputbar/suit/main/main-create-component']]
]);