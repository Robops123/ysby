(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["comps/chat/inputbar/suit/image/image"],{"88a4":function(e,t,a){"use strict";var n;a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return c})),a.d(t,"a",(function(){return n}));var i=function(){var e=this,t=e.$createElement;e._self._c},c=[]},"8f13":function(e,t,a){"use strict";a.r(t);var n=a("c7f1"),i=a.n(n);for(var c in n)"default"!==c&&function(e){a.d(t,e,(function(){return n[e]}))}(c);t["default"]=i.a},c7f1:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a("57fd"),i=a("ac99"),c={components:{},data:function(){return{}},props:{username:{type:Object,value:{}},chatType:{type:String,value:n.chatType.SINGLE_CHAT}},onUnload:function(){},methods:{openCamera:function(){var t=this;e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["camera"],success:function(e){t.upLoadImage(e)}})},sendImage:function(){var t=this;e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(e){t.upLoadImage(e)}})},isGroupChat:function(){return this.chatType==n.chatType.CHAT_ROOM},getSendToParam:function(){return this.isGroupChat()?this.username.groupId:this.username.your},upLoadImage:function(t){var a=this,c=t.tempFilePaths,o=this.$im.conn.context.accessToken;e.getImageInfo({src:t.tempFilePaths[0],success:function(t){var u={jpg:!0,gif:!0,png:!0,bmp:!0},s=a.$im.config.appkey.split("#"),r=t.width,p=t.height,f=t.path.lastIndexOf("."),m=~f&&t.path.slice(f+1)||"";m.toLowerCase()in u&&e.uploadFile({url:"https://a1.easemob.com/"+s[0]+"/"+s[1]+"/chatfiles",filePath:c[0],name:"file",header:{"Content-Type":"multipart/form-data",Authorization:"Bearer "+o},success:function(t){var o=t.data,u=JSON.parse(o),s=a.$im.conn.getUniqueId(),f=new a.$im.message(n.IMAGE,s),l={type:n.IMAGE,size:{width:r,height:p},url:u.uri+"/"+u.entities[0].uuid,filetype:m,filename:c[0]};f.set({apiUrl:a.$im.config.apiURL,body:l,from:a.username.myName,to:a.getSendToParam(),roomType:!1,chatType:a.chatType,success:function(e){i.fire("em.chat.sendSuccess",s)}}),a.chatType==n.chatType.CHAT_ROOM&&f.setGroup("groupchat"),a.$im.conn.send(f.body),e.$emit("saveSendMsg",{msg:f,type:n.IMAGE})}})}})}}};t.default=c}).call(this,a("543d")["default"])},eb8b:function(e,t,a){"use strict";a.r(t);var n=a("88a4"),i=a("8f13");for(var c in i)"default"!==c&&function(e){a.d(t,e,(function(){return i[e]}))}(c);var o,u=a("f0c5"),s=Object(u["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);t["default"]=s.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'comps/chat/inputbar/suit/image/image-create-component',
    {
        'comps/chat/inputbar/suit/image/image-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("eb8b"))
        })
    },
    [['comps/chat/inputbar/suit/image/image-create-component']]
]);
