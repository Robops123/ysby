(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar2/operating/editGoods"],{"0774":function(t,i,e){"use strict";var a;e.d(i,"b",(function(){return s})),e.d(i,"c",(function(){return n})),e.d(i,"a",(function(){return a}));var s=function(){var t=this,i=t.$createElement;t._self._c},n=[]},1037:function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=s(e("a34a"));function s(t){return t&&t.__esModule?t:{default:t}}function n(t,i,e,a,s,n,o){try{var r=t[n](o),d=r.value}catch(u){return void e(u)}r.done?i(d):Promise.resolve(d).then(a,s)}function o(t){return function(){var i=this,e=arguments;return new Promise((function(a,s){var o=t.apply(i,e);function r(t){n(o,a,s,r,d,"next",t)}function d(t){n(o,a,s,r,d,"throw",t)}r(void 0)}))}}var r=[["camera"],["album"],["camera","album"]],d=[["compressed"],["original"],["compressed","original"]],u={data:function(){return{displayCate:"",data:{},goodsid:"",uid:"",token:"",current:1,cateCurrent:0,array:["中国","美国","巴西","日本"],imageList:[],imageLength:5,sourceTypeIndex:2,sizeTypeIndex:2,lat:"",lng:"",address:"",pic:[],catesList:[],catesValueList:"",goid:"",stock:"",weight:"",marketprice:""}},onLoad:function(i){this.goodsid=i.goodsid;var e=t.getStorageSync("userInfo");""!=e&null!=e&void 0!=e&&(this.uid=e.uid,this.token=e.token),this.getDetail(),this.getCates()},methods:{chooseImage:function(){var i=o(a.default.mark((function i(){var e=this;return a.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:t.chooseImage({sourceType:r[this.sourceTypeIndex],sizeType:d[this.sizeTypeIndex],count:this.imageLength-this.imageList.length,success:function(t){e.imageList=e.imageList.concat(t.tempFilePaths)}});case 1:case"end":return i.stop()}}),i,this)})));function e(){return i.apply(this,arguments)}return e}(),previewImage:function(i){var e=i.target.dataset.src;t.previewImage({current:e,urls:this.imageList})},deleteImage:function(t){var i=t.target.dataset.index,e=this,a=e.imageList;a.splice(i,1),e.imageList=a},chooseLocation:function(){var i=this;t.chooseLocation({success:function(t){i.lat=t.latitude,i.lng=t.longitude,i.address=t.name}})},switch1Change:function(t){var i=t.detail.value;this.data.goodsstatus=i?"3":"5"},radioChange:function(t){var i=t.detail.value;this.data.ishot=i},bindPickerChange:function(t){var i=t.detail.value;this.displayCate=this.array[i].name,this.data.cates=this.array[i].id},getDetail:function(){this.$loading();var i=this,e={uid:this.uid,token:this.token,goodsid:this.goodsid},a="&r=api.myshop.goods.edit";this.$apiPost(a,e).then((function(e){i.data=e.data,i.pic=[],i.array=e.data.category,i.imageList=e.data.thumb.split(",");var a=i.array.filter((function(t){return t.id==e.data.cates}));a.length>0&&(i.displayCate=a[0].name),t.hideLoading()}))},submit:function(){var t=this,i=this,e=this.imageList.length;this.$loading(),0!=e?this.imageList.forEach((function(a,s){if(a.indexOf("http://")<0&&a.indexOf("https://")<0)i.$upload(a,"",(function(t){i.pic.push(t);var a=i.pic.length;e==a&&i.submitForm()}));else{i.pic.push(a);var n=t.pic.length;e==n&&i.submitForm()}})):this.$msg("至少需上传一张图片")},submitForm:function(){var i=this,e={uid:this.uid,token:this.token,goodsid:this.goodsid,title:this.data.title,subtitle:this.data.subtitle,unit:this.data.unit,thumb:this.pic.join(","),marketprice:this.marketprice,stock:this.stock,weight:this.weight,goodsstatus:this.data.goodsstatus,ishot:this.data.ishot,displayorder:this.data.displayorder,cates:this.data.cates,goid:this.goid},a="&r=api.myshop.goods.doEdit";this.$apiPost(a,e).then((function(e){i.$msg("修改成功"),setTimeout((function(){t.hideLoading(),i.getByCates(),i.getDetail()}),1500)}))},getCates:function(){var t=this,i="&r=api.myshop.goods.sku&goodsid="+this.goodsid+"&uid="+this.uid+"&token="+this.token;this.$apiPost(i).then((function(i){t.catesList=i.data,t.catesValueList=new Array(i.data.length).fill(0),t.getByCates()}))},getByCates:function(){var t=this,i="&r=api.myshop.goods.skustock",e={goodsid:this.goodsid,specitemid:this.catesList.map((function(i,e){return i.item[t.catesValueList[e]].itemid})).join(","),uid:this.uid,token:this.token};this.$apiPost(i,e).then((function(i){t.marketprice=i.data.marketprice,t.weight=i.data.weight,t.stock=i.data.stock,t.goid=i.data.goid,t.$forceUpdate()}))},bindCatesChange:function(t,i){this.catesValueList[i]=t.detail.value,this.getByCates(),this.$forceUpdate(),console.log(this.catesValueList)}}};i.default=u}).call(this,e("543d")["default"])},"16e1":function(t,i,e){"use strict";var a=e("d3c4"),s=e.n(a);s.a},"1c09":function(t,i,e){"use strict";(function(t){e("fabc");a(e("66fd"));var i=a(e("db79"));function a(t){return t&&t.__esModule?t:{default:t}}t(i.default)}).call(this,e("543d")["createPage"])},7770:function(t,i,e){"use strict";e.r(i);var a=e("1037"),s=e.n(a);for(var n in a)"default"!==n&&function(t){e.d(i,t,(function(){return a[t]}))}(n);i["default"]=s.a},d3c4:function(t,i,e){},db79:function(t,i,e){"use strict";e.r(i);var a=e("0774"),s=e("7770");for(var n in s)"default"!==n&&function(t){e.d(i,t,(function(){return s[t]}))}(n);e("16e1");var o,r=e("f0c5"),d=Object(r["a"])(s["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);i["default"]=d.exports}},[["1c09","common/runtime","common/vendor"]]]);