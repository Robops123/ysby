(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/loginVeri"],{"0084":function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e={data:function(){return{passitive:"",mobile:"",pwd:"",newpwd:"",invited_code:"",verifycode:"",reg:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,validateMsg:"",remain:60,timer:null,enable:!0}},onLoad:function(t){this.mobile=t.mobile,this.passitive=t.passitive},methods:{loginpsd:function(){t.redirectTo({url:"/pages/login/loginPsd?passitive="+this.passitive})},submit:function(){var i=this,e=this.validate();if(!1===e)return this.$msg(this.validateMsg),setTimeout((function(){i.validateMsg=""}),1e3),!1;this.$loading();this.mobile;var n="&r=api.member.account.register&mobile=".concat(this.mobile,"&pwd=").concat(this.pwd,"&verifycode=").concat(this.verifycode,"&invited_code=").concat(this.invited_code);this.$apiPost(n).then((function(e){t.hideLoading(),setTimeout((function(){i.$msg("注册成功")}),100),t.setStorageSync("userInfo",e.data),i.passitive?(t.$emit("logined"),t.navigateBack({delta:2})):t.switchTab({url:"../tabBar/mine"})}))},validate:function(){return this.reg.test(this.pwd)?this.pwd!=this.newpwd?(this.validateMsg="两次输入密码不一致",!1):void 0:(this.validateMsg="密码需为8-16位数字字母组合",!1)},getveri:function(){if(this.enable){var t=this;this.enable=!1,this.timer=setInterval((function(){t.settime()}),1e3)}},settime:function(){1==this.remain?(this.remain=60,clearInterval(this.timer),this.enable=!0):this.remain--},getcode:function(){var t,i=this;http.post("/sendsms",t).then((function(t){i.$success("发送成功")})).catch((function(t){i.$error(t)}))}}};i.default=e}).call(this,e("543d")["default"])},"0a92":function(t,i,e){"use strict";e.r(i);var n=e("0084"),a=e.n(n);for(var s in n)"default"!==s&&function(t){e.d(i,t,(function(){return n[t]}))}(s);i["default"]=a.a},"1fc7":function(t,i,e){"use strict";e.r(i);var n=e("8eda"),a=e("0a92");for(var s in a)"default"!==s&&function(t){e.d(i,t,(function(){return a[t]}))}(s);e("f567");var o,c=e("f0c5"),r=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);i["default"]=r.exports},"853c":function(t,i,e){},"8eda":function(t,i,e){"use strict";var n,a=function(){var t=this,i=t.$createElement;t._self._c},s=[];e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return s})),e.d(i,"a",(function(){return n}))},9784:function(t,i,e){"use strict";(function(t){e("fabc"),e("921b");n(e("66fd"));var i=n(e("1fc7"));function n(t){return t&&t.__esModule?t:{default:t}}t(i.default)}).call(this,e("543d")["createPage"])},f567:function(t,i,e){"use strict";var n=e("853c"),a=e.n(n);a.a}},[["9784","common/runtime","common/vendor"]]]);