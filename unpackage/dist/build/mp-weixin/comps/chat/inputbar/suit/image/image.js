(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["comps/chat/inputbar/suit/image/image"],{"8f13":function(e,t,n){"use strict";n.r(t);var a=n("c7f1"),i=n.n(a);for(var c in a)"default"!==c&&function(e){n.d(t,e,(function(){return a[e]}))}(c);t["default"]=i.a},c7f1:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n("57fd"),i=n("ac99"),c={components:{},data:function(){return{}},props:{username:{type:Object,value:{}},chatType:{type:String,value:a.chatType.SINGLE_CHAT}},onUnload:function(){},methods:{openCamera:function(){var t=this;e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["camera"],success:function(e){t.upLoadImage(e)}})},sendImage:function(){var t=this;e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(e){t.upLoadImage(e)}})},isGroupChat:function(){return this.chatType==a.chatType.CHAT_ROOM},getSendToParam:function(){return this.isGroupChat()?this.username.groupId:this.username.your},upLoadImage:function(t){var n=this,c=t.tempFilePaths,o=this.$im.conn.context.accessToken;e.getImageInfo({src:t.tempFilePaths[0],success:function(t){var u={jpg:!0,gif:!0,png:!0,bmp:!0},s=n.$im.config.appkey.split("#"),r=t.width,p=t.height,f=t.path.lastIndexOf("."),d=~f&&t.path.slice(f+1)||"";d.toLowerCase()in u&&e.uploadFile({url:"https://a1.easemob.com/"+s[0]+"/"+s[1]+"/chatfiles",filePath:c[0],name:"file",header:{"Content-Type":"multipart/form-data",Authorization:"Bearer "+o},success:function(t){var o=t.data,u=JSON.parse(o),s=n.$im.conn.getUniqueId(),f=new n.$im.message(a.IMAGE,s),m={type:a.IMAGE,size:{width:r,height:p},url:u.uri+"/"+u.entities[0].uuid,filetype:d,filename:c[0]};f.set({apiUrl:n.$im.config.apiURL,body:m,from:n.username.myName,to:n.getSendToParam(),roomType:!1,chatType:n.chatType,success:function(e){i.fire("em.chat.sendSuccess",s)}}),n.chatType==a.chatType.CHAT_ROOM&&f.setGroup("groupchat"),n.$im.conn.send(f.body),e.$emit("saveSendMsg",{msg:f,type:a.IMAGE})}})}})}}};t.default=c}).call(this,n("543d")["default"])},ded2:function(e,t,n){"use strict";var a,i=function(){var e=this,t=e.$createElement;e._self._c},c=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return a}))},eb8b:function(e,t,n){"use strict";n.r(t);var a=n("ded2"),i=n("8f13");for(var c in i)"default"!==c&&function(e){n.d(t,e,(function(){return i[e]}))}(c);var o,u=n("f0c5"),s=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);t["default"]=s.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'comps/chat/inputbar/suit/image/image-create-component',
    {
        'comps/chat/inputbar/suit/image/image-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("eb8b"))
        })
    },
    [['comps/chat/inputbar/suit/image/image-create-component']]
]);
