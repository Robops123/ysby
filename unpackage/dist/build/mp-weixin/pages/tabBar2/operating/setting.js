(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar2/operating/setting"],{"0e78":function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement;t._self._c},s=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}))},1912:function(t,e,i){"use strict";var n=i("6d85"),a=i.n(n);a.a},"4bf7":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("4795"));function a(t){return t&&t.__esModule?t:{default:t}}function s(t,e,i,n,a,s,o){try{var u=t[s](o),r=u.value}catch(c){return void i(c)}u.done?e(r):Promise.resolve(r).then(n,a)}function o(t){return function(){var e=this,i=arguments;return new Promise((function(n,a){var o=t.apply(e,i);function u(t){s(o,n,a,u,r,"next",t)}function r(t){s(o,n,a,u,r,"throw",t)}u(void 0)}))}}var u=[["camera"],["album"],["camera","album"]],r=[["compressed"],["original"],["compressed","original"]],c={data:function(){return{uid:"",token:"",pic:[],imageList:[],imageLength:5,sourceTypeIndex:2,sizeTypeIndex:2,lat:"",lng:"",address:"",data:{},loaded:!1}},onLoad:function(){var e=t.getStorageSync("userInfo");""!=e&null!=e&void 0!=e&&(this.uid=e.uid,this.token=e.token),this.getDetail()},methods:{getDetail:function(){this.$loading();var e=this,i={uid:this.uid,token:this.token},n="&r=api.myshop.my";this.$apiPost(n,i).then((function(i){e.pic=[],e.data=i.data,e.imageList=i.data.banner.split(","),e.loaded=!0,e.lng=i.data.lng,e.lat=i.data.lat,t.hideLoading()}))},changeHeadface:function(){var e=this;t.chooseImage({success:function(i){if(i.tempFiles[0].size>2097152)e.$msg("图片过大，请重新选择图片");else{t.showLoading();var n=i.tempFilePaths[0];e.$upload(n,"",(function(i){e.data.logo=i,t.hideLoading()}))}}})},chooseImage:function(){var e=o(n.default.mark((function e(){var i=this;return n.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.chooseImage({sourceType:u[this.sourceTypeIndex],sizeType:r[this.sizeTypeIndex],count:this.imageLength-this.imageList.length,success:function(t){i.imageList=i.imageList.concat(t.tempFilePaths)}});case 1:case"end":return e.stop()}}),e,this)})));function i(){return e.apply(this,arguments)}return i}(),previewImage:function(e){var i=e.target.dataset.src;t.previewImage({current:i,urls:this.imageList})},deleteImage:function(t){if(!(this.imageList.length<=1)){var e=t.currentTarget.dataset.index,i=this,n=i.imageList;n.splice(parseInt(e),1),i.imageList=n}},chooseLocation:function(){var e=this;t.chooseLocation({success:function(t){e.lat=t.latitude,e.lng=t.longitude,e.data.address=t.name}})},switch1Change:function(t){var e=t.detail.value;this.data.merch_status=1==e?"6":"2"},submit:function(){var t=this,e=this,i=this.imageList.length;this.$loading(),0!=i?this.imageList.forEach((function(n,a){if(n.indexOf("blob")>-1)e.$upload(n,"",(function(n){e.pic.push(n);var a=t.pic.length;i==a&&e.submitForm()}));else{e.pic.push(n);var s=t.pic.length;i==s&&e.submitForm()}})):this.$msg("至少需上传一张图片")},submitForm:function(){var e=this,i={uid:this.uid,token:this.token,logo:this.data.logo,banner:this.pic.join(","),merchname:this.data.merchname,address:this.data.address,lng:this.lng,lat:this.lat,merch_status:this.data.merch_status},n="&r=api.myshop.my.change";this.$apiPost(n,i).then((function(i){e.$msg("修改成功"),t.hideLoading(),setTimeout((function(){e.getDetail()}),500)}))}}};e.default=c}).call(this,i("543d")["default"])},"6d85":function(t,e,i){},"75bb":function(t,e,i){"use strict";i.r(e);var n=i("0e78"),a=i("bf56");for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("1912");var o,u=i("f0c5"),r=Object(u["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);e["default"]=r.exports},9255:function(t,e,i){"use strict";(function(t){i("fabc"),i("921b");n(i("66fd"));var e=n(i("75bb"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},bf56:function(t,e,i){"use strict";i.r(e);var n=i("4bf7"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a}},[["9255","common/runtime","common/vendor"]]]);