(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/retail/retailMoney"],{"1acb":function(t,n,e){"use strict";(function(t){e("fabc");i(e("66fd"));var n=i(e("62b9"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"36ba":function(t,n,e){"use strict";var i,a=function(){var t=this,n=t.$createElement;t._self._c;t._isMounted||(t.e0=function(n){t.isshowinfo=!t.isshowinfo})},r=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return i}))},"432b":function(t,n,e){},"62b9":function(t,n,e){"use strict";e.r(n);var i=e("36ba"),a=e("913b");for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);e("f263");var s,o=e("f0c5"),u=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);n["default"]=u.exports},"913b":function(t,n,e){"use strict";e.r(n);var i=e("aa8d"),a=e.n(i);for(var r in i)"default"!==r&&function(t){e.d(n,t,(function(){return i[t]}))}(r);n["default"]=a.a},aa8d:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=function(){Promise.all([e.e("common/vendor"),e.e("components/s-popup/index")]).then(function(){return resolve(e("5186"))}.bind(null,e)).catch(e.oe)},a={components:{sPopup:i},data:function(){return{visible:!1,isshowinfo:!0,data:{},index:"",array:["微信","银行卡","支付宝"],uid:"",token:"",amount:"",wxno:"",bankcardno:"",alipayno:"",realname:"",idcardno:"",bankname:""}},mounted:function(){var n=t.getStorageSync("userInfo");""!=n&null!=n&void 0!=n&&(this.uid=n.uid,this.token=n.token,this.getDetail())},methods:{back:function(){t.navigateBack({delta:1})},to:function(n){t.navigateTo({url:"./".concat(n)})},getDetail:function(){this.$loading();var n=this,e={uid:this.uid,token:this.token},i="&r=api.member.commission";this.$apiPost(i,e).then((function(e){n.data=e.data,t.hideLoading()}))},startWithdraw:function(){this.visible=!0},oninput:function(t){var n=parseInt(t.detail.value),e=parseInt(this.data.canCommission);n>=e?this.amount=e:n<=1&&(this.amount=1)},intercept:function(){if(""===this.index)return this.$msg("请选择提现方式"),!1;if(0===this.index){if(!this.wxno)return this.$msg("请填写微信账号"),!1}else if(1===this.index){if(!this.realname)return this.$msg("请填写真实姓名"),!1;if(!this.checkIdcard(this.idcardno))return this.$msg("请填写正确身份证号"),!1;if(!this.bankcardno||!this.checkBankno(this.bankcardno))return this.$msg("请填写正确银行卡号"),!1;if(!this.bankname)return this.$msg("请填写所属支行"),!1}else if(2===this.index){if(!this.realname)return this.$msg("请填写真实姓名"),!1;if(!this.checkIdcard(this.idcardno))return this.$msg("请填写正确身份证号"),!1;if(!this.alipayno)return this.$msg("请填写支付宝账号"),!1}return!(this.amount>this.data.canCommission)||(this.$msg("超过可提现金额"),!1)},withdraw:function(){if(this.intercept()){this.$loading();var n=this,e={uid:this.uid,token:this.token,amount:this.amount,wxno:this.wxno,bankcardno:this.bankcardno,alipayno:this.alipayno,realname:this.realname,idcardno:this.idcardno,bankname:this.bankname,paytype:this.index+1},i="&r=api.member.commission.withdrawal";this.$apiPost(i,e).then((function(e){t.hideLoading(),n.$msg("提交成功，请等待审核"),setTimeout((function(){n.visible=!1,n.reset(),n.getDetail()}),1e3)}))}},reset:function(){this.wxno="",this.bankcardno="",this.alipayno="",this.realname="",this.idcardno="",this.bankcardno=""},withdrawWayChange:function(t){console.log(t);var n=t.detail.value;n!==this.index&&(this.index=n,this.reset())},checkIdcard:function(t){if(t=t.toUpperCase(),!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(t))return!1;var n,e;if(n=t.length,15==n){e=new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);var i=t.match(e),a=new Date("19"+i[2]+"/"+i[3]+"/"+i[4]);if(u=a.getFullYear()==Number(i[2])&&a.getMonth()+1==Number(i[3])&&a.getDate()==Number(i[4]),u){var r=new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2),s=new Array("1","0","X","9","8","7","6","5","4","3","2"),o=0;for(t=t.substr(0,6)+"19"+t.substr(6,t.length-6),c=0;c<17;c++)o+=t.substr(c,1)*r[c];return t+=s[o%11],!0}return!1}if(18==n){e=new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);var u;i=t.match(e),a=new Date(i[2]+"/"+i[3]+"/"+i[4]);if(u=a.getFullYear()==Number(i[2])&&a.getMonth()+1==Number(i[3])&&a.getDate()==Number(i[4]),u){var h,c;r=new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2),s=new Array("1","0","X","9","8","7","6","5","4","3","2"),o=0;for(c=0;c<17;c++)o+=t.substr(c,1)*r[c];return h=s[o%11],h==t.substr(17,1)}return!1}return!1},checkBankno:function(t){for(var n=t.substr(t.length-1,1),e=t.substr(0,t.length-1),i=[],a=e.length-1;a>-1;a--)i.push(e.substr(a,1));for(var r=[],s=[],o=[],u=0;u<i.length;u++)(u+1)%2==1?2*parseInt(i[u])<9?r.push(2*parseInt(i[u])):s.push(2*parseInt(i[u])):o.push(i[u]);for(var h=[],c=[],d=0;d<s.length;d++)h.push(parseInt(s[d])%10),c.push(parseInt(s[d])/10);for(var f=0,l=0,m=0,p=0,b=0,g=0;g<r.length;g++)f+=parseInt(r[g]);for(var v=0;v<o.length;v++)l+=parseInt(o[v]);for(var k=0;k<h.length;k++)m+=parseInt(h[k]),p+=parseInt(c[k]);b=parseInt(f)+parseInt(l)+parseInt(m)+parseInt(p);var w=parseInt(b)%10==0?10:parseInt(b)%10,I=10-w;return n==I}}};n.default=a}).call(this,e("543d")["default"])},f263:function(t,n,e){"use strict";var i=e("432b"),a=e.n(i);a.a}},[["1acb","common/runtime","common/vendor"]]]);