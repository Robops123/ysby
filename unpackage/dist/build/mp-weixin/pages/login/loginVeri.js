(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/loginVeri"],{"0084":function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={data:function(){return{show:!1,mobile:"",code:"",passitive:"",remain:60,timer:null,enable:!0}},onLoad:function(e){this.mobile=e.mobile,this.passitive=e.passitive},methods:{contact:function(){e.navigateTo({url:"/pages/index/webKf"})},loginveri:function(){e.redirectTo({url:"/pages/login/loginPsd?passitive="+this.passitive+"&mobile="+this.mobile})},submit:function(){var t=this,i="&r=api.member.account.loginByCode&mobile="+this.mobile+"&code="+this.code;this.$apiPost(i).then((function(i){e.setStorageSync("userInfo",i.data),t.$conn.open({apiUrl:t.$im.config.apiURL,user:i.data.hx_openid,pwd:i.data.hx_pwd,grant_type:"password",appKey:t.$im.config.appkey}),e.setStorageSync("myUsername",i.data.hx_openid),t.passitive?(e.$emit("logined"),e.navigateBack({delta:2})):e.switchTab({url:"../tabBar/mine"})}))},showpsd:function(){this.show=!this.show},getveri:function(){this.enable&&this.getcode()},settime:function(){1==this.remain?(this.remain=60,clearInterval(this.timer),this.enable=!0):this.remain--},getcode:function(){var t=this;this.$loading();var i={mobile:this.mobile,type:2},n="&r=api.member.account.registercode";this.$apiPost(n,i).then((function(i){e.hideLoading(),t.$msg("验证码发送成功"),t.enable=!1,t.timer=setInterval((function(){t.settime()}),1e3)}))}}};t.default=i}).call(this,i("543d")["default"])},"0a92":function(e,t,i){"use strict";i.r(t);var n=i("0084"),a=i.n(n);for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);t["default"]=a.a},"1fc7":function(e,t,i){"use strict";i.r(t);var n=i("d51b"),a=i("0a92");for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);i("f567");var s,r=i("f0c5"),c=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);t["default"]=c.exports},9784:function(e,t,i){"use strict";(function(e){i("fabc");n(i("66fd"));var t=n(i("1fc7"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,i("543d")["createPage"])},d51b:function(e,t,i){"use strict";var n,a=function(){var e=this,t=e.$createElement;e._self._c},o=[];i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return o})),i.d(t,"a",(function(){return n}))},e9e9:function(e,t,i){},f567:function(e,t,i){"use strict";var n=i("e9e9"),a=i.n(n);a.a}},[["9784","common/runtime","common/vendor"]]]);