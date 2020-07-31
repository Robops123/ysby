"use weex:vue";
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!********************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/ysby/ysby/main.js?{"page":"pages%2Fsubnvues%2FgoodsDetailSwiper"} ***!
  \********************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var uni_app_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uni-app-style */ 1);\n/* harmony import */ var uni_app_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uni_app_style__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _pages_subnvues_goodsDetailSwiper_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/subnvues/goodsDetailSwiper.nvue?mpType=page */ 4);\n\n        \n        \n        \n        if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {\n          Promise.prototype.finally = function(callback) {\n            const promise = this.constructor\n            return this.then(\n              value => promise.resolve(callback()).then(() => value),\n              reason => promise.resolve(callback()).then(() => {\n                throw reason\n              })\n            )\n          }\n        }\n        _pages_subnvues_goodsDetailSwiper_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"].mpType = 'page'\n        _pages_subnvues_goodsDetailSwiper_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"].route = 'pages/subnvues/goodsDetailSwiper'\n        _pages_subnvues_goodsDetailSwiper_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"].el = '#root'\n        new Vue(_pages_subnvues_goodsDetailSwiper_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n        //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLFFBQThCO0FBQzlCLFFBQTZFO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLFFBQVEsMEZBQUc7QUFDWCxRQUFRLDBGQUFHO0FBQ1gsUUFBUSwwRkFBRztBQUNYLGdCQUFnQiwwRkFBRyIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgICAgIFxuICAgICAgICBpbXBvcnQgJ3VuaS1hcHAtc3R5bGUnXG4gICAgICAgIGltcG9ydCBBcHAgZnJvbSAnLi9wYWdlcy9zdWJudnVlcy9nb29kc0RldGFpbFN3aXBlci5udnVlP21wVHlwZT1wYWdlJ1xuICAgICAgICBpZiAodHlwZW9mIFByb21pc2UgIT09ICd1bmRlZmluZWQnICYmICFQcm9taXNlLnByb3RvdHlwZS5maW5hbGx5KSB7XG4gICAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuZmluYWxseSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5jb25zdHJ1Y3RvclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGhlbihcbiAgICAgICAgICAgICAgdmFsdWUgPT4gcHJvbWlzZS5yZXNvbHZlKGNhbGxiYWNrKCkpLnRoZW4oKCkgPT4gdmFsdWUpLFxuICAgICAgICAgICAgICByZWFzb24gPT4gcHJvbWlzZS5yZXNvbHZlKGNhbGxiYWNrKCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93IHJlYXNvblxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBBcHAubXBUeXBlID0gJ3BhZ2UnXG4gICAgICAgIEFwcC5yb3V0ZSA9ICdwYWdlcy9zdWJudnVlcy9nb29kc0RldGFpbFN3aXBlcidcbiAgICAgICAgQXBwLmVsID0gJyNyb290J1xuICAgICAgICBuZXcgVnVlKEFwcClcbiAgICAgICAgIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/ysby/ysby/main.js?{"type":"appStyle"} ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("Vue.prototype.__$appStyle__ = {}\nVue.prototype.__merge_style && Vue.prototype.__merge_style(__webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css */ 2).default,Vue.prototype.__$appStyle__)\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsMkRBQTJELG1CQUFPLENBQUMsa0RBQTJDIiwiZmlsZSI6IjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJWdWUucHJvdG90eXBlLl9fJGFwcFN0eWxlX18gPSB7fVxuVnVlLnByb3RvdHlwZS5fX21lcmdlX3N0eWxlICYmIFZ1ZS5wcm90b3R5cGUuX19tZXJnZV9zdHlsZShyZXF1aXJlKFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1jc3NcIikuZGVmYXVsdCxWdWUucHJvdG90eXBlLl9fJGFwcFN0eWxlX18pXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///1\n");

/***/ }),
/* 2 */
/*!****************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/ysby/ysby/App.vue?vue&type=style&index=0&lang=css ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../hbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!../../hbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!../../hbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-0-2!../../hbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!../../hbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=css */ 3);
/* harmony import */ var _hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 3 */
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!./node_modules/postcss-loader/src??ref--8-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/ysby/ysby/App.vue?vue&type=style&index=0&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "@FONT-FACE": [
    {
      "fontFamily": "iconfont",
      "src": "url('~@/static/css/iconfont.eot?t=1589251166258#iefix') format('embedded-opentype'), \r\n  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),\r\n  url('~@/static/css/iconfont.woff?t=1589251166258') format('woff'),\r\n  url('~@/static/css/iconfont.ttf?t=1589251166258') format('truetype'), \r\n  url('~@/static/css/iconfont.svg?t=1589251166258#iconfont') format('svg')"
    }
  ],
  "iconfont": {
    "fontFamily": "\"iconfont\"",
    "fontSize": "16",
    "fontStyle": "normal",
    "WebkitFontSmoothing": "antialiased",
    "MozOsxFontSmoothing": "grayscale"
  },
  "icon-star": {
    "content:before": "\"\\e6c3\""
  },
  "icon-arrowup": {
    "content:before": "\"\\e60f\""
  },
  "icon-arrowdown-copy": {
    "content:before": "\"\\e623\""
  },
  "icon-previewleft": {
    "content:before": "\"\\e75b\""
  },
  "icon-shou": {
    "content:before": "\"\\e650\""
  },
  "icon-share": {
    "content:before": "\"\\e631\""
  },
  "icon-address": {
    "content:before": "\"\\e61f\""
  },
  "icon-iconfontshop-copy": {
    "content:before": "\"\\e61c\""
  },
  "icon-arrow-right": {
    "content:before": "\"\\e622\""
  },
  "icon-share1": {
    "content:before": "\"\\e61d\""
  },
  "icon-zan": {
    "content:before": "\"\\e60c\""
  },
  "icon-down": {
    "content:before": "\"\\e94d\""
  },
  "icon-share2": {
    "content:before": "\"\\e624\""
  },
  "icon-tubiao-": {
    "content:before": "\"\\e61b\""
  },
  "icon-arrow-right1": {
    "content:before": "\"\\e614\""
  },
  "icon-kefu": {
    "content:before": "\"\\e60a\""
  },
  "icon-Write": {
    "content:before": "\"\\e6b9\""
  },
  "icon-tubiao-1": {
    "content:before": "\"\\e60b\""
  },
  "icon-shoucang": {
    "content:before": "\"\\e607\""
  },
  "padding": {
    "paddingTop": "20upx",
    "paddingRight": "30upx",
    "paddingBottom": "20upx",
    "paddingLeft": "30upx",
    "boxSizing": "border-box"
  },
  "right-arrow": {
    "display": "inline-block",
    "marginLeft": "20upx",
    "width": "20upx",
    "height": "30upx"
  },
  "down-arrow": {
    "display": "inline-block",
    "marginLeft": "20upx",
    "width": "30upx",
    "height": "20upx"
  },
  "search-img": {
    "width": "40upx",
    "height": "40upx",
    "display": "inline-block",
    "verticalAlign": "middle"
  },
  "dots-img": {
    "width": "44upx",
    "height": "12upx",
    "display": "inline-block",
    "verticalAlign": "middle"
  },
  "pre-img": {
    "width": "30upx",
    "height": "40upx",
    "display": "inline-block",
    "verticalAlign": "bottom",
    "marginRight": "15upx"
  },
  "pre-img2": {
    "width": "50upx",
    "height": "40upx"
  },
  "setting-img": {
    "width": "40upx",
    "height": "40upx"
  },
  "s1": {
    "fontSize": "28upx"
  },
  "s2": {
    "fontSize": "24upx"
  },
  "s3": {
    "fontSize": "26upx"
  },
  "s4": {
    "fontSize": "40upx"
  },
  "s5": {
    "fontSize": "36upx"
  },
  "s6": {
    "fontSize": "32upx"
  },
  "s7": {
    "fontSize": "50upx"
  },
  "s8": {
    "fontSize": "30upx"
  },
  "cr": {
    "color": "#ff6d7e",
    "fontWeight": "bold"
  },
  "cg": {
    "color": "#808080"
  },
  "cb": {
    "color": "#6b6a69"
  },
  "cblue": {
    "color": "#2caeff"
  },
  "del": {
    "textDecoration": "line-through"
  },
  "ellipsis": {
    "textOverflow": "ellipsis",
    "overflow": "hidden",
    "whiteSpace": "nowrap"
  },
  "fr": {
    "float": "right"
  },
  "fl": {
    "float": "left"
  },
  "vertical-middle": {
    "display": "inline-block",
    "verticalAlign": "middle"
  },
  "flex-between": {
    "alignItems": "center",
    "display": "flex",
    "justifyContent": "space-between"
  },
  "nav-bar": {
    "paddingTop": "5upx",
    "paddingRight": 0,
    "paddingBottom": "20upx",
    "paddingLeft": 0
  },
  "fixed-fab": {
    "position": "fixed",
    "bottom": "50",
    "right": "50",
    "width": "100",
    "height": "100",
    "background": "#E1673E",
    "color": "#ffffff",
    "zIndex": 9999
  },
  "slideInUp": {
    "WebkitAnimationName": "slideInUp",
    "animationName": "slideInUp"
  },
  "shake": {
    "WebkitAnimationName": "shake",
    "animationName": "shake"
  },
  "animate__slideInUp": {
    "WebkitAnimationName": "slideInUp",
    "animationName": "slideInUp"
  },
  "animate__fadeInDown": {
    "WebkitAnimationName": "fadeInDown",
    "animationName": "fadeInDown"
  },
  "animated": {
    "WebkitAnimationDuration": 0.3,
    "animationDuration": 0.3,
    "WebkitAnimationFillMode": "both",
    "animationFillMode": "both"
  }
}

/***/ }),
/* 4 */
/*!**************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/ysby/ysby/pages/subnvues/goodsDetailSwiper.nvue?mpType=page ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _goodsDetailSwiper_nvue_vue_type_template_id_3fc20fca_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./goodsDetailSwiper.nvue?vue&type=template&id=3fc20fca&mpType=page */ 5);\n/* harmony import */ var _goodsDetailSwiper_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./goodsDetailSwiper.nvue?vue&type=script&lang=js&mpType=page */ 7);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _goodsDetailSwiper_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _goodsDetailSwiper_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../hbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);\n\nvar renderjs\n\n\nfunction injectStyles (context) {\n  \n  if(!this.options.style){\n          this.options.style = {}\n      }\n      if(Vue.prototype.__merge_style && Vue.prototype.__$appStyle__){\n        Vue.prototype.__merge_style(Vue.prototype.__$appStyle__, this.options.style)\n      }\n      if(Vue.prototype.__merge_style){\n                Vue.prototype.__merge_style(__webpack_require__(/*! ./goodsDetailSwiper.nvue?vue&type=style&index=0&lang=css&mpType=page */ 9).default, this.options.style)\n            }else{\n                Object.assign(this.options.style,__webpack_require__(/*! ./goodsDetailSwiper.nvue?vue&type=style&index=0&lang=css&mpType=page */ 9).default)\n            }\n\n}\n\n/* normalize component */\n\nvar component = Object(_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _goodsDetailSwiper_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _goodsDetailSwiper_nvue_vue_type_template_id_3fc20fca_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _goodsDetailSwiper_nvue_vue_type_template_id_3fc20fca_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  \"bcb7b770\",\n  false,\n  _goodsDetailSwiper_nvue_vue_type_template_id_3fc20fca_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ninjectStyles.call(component)\ncomponent.options.__file = \"pages/subnvues/goodsDetailSwiper.nvue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMEk7QUFDMUk7QUFDaUY7QUFDTDtBQUM1RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxtQkFBTyxDQUFDLDZFQUFzRTtBQUMxSCxhQUFhO0FBQ2IsaURBQWlELG1CQUFPLENBQUMsNkVBQXNFO0FBQy9IOztBQUVBOztBQUVBO0FBQzZLO0FBQzdLLGdCQUFnQix1TEFBVTtBQUMxQixFQUFFLG1HQUFNO0FBQ1IsRUFBRSx3R0FBTTtBQUNSLEVBQUUsaUhBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsNEdBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDZSxnRiIsImZpbGUiOiI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMsIHJlY3ljbGFibGVSZW5kZXIsIGNvbXBvbmVudHMgfSBmcm9tIFwiLi9nb29kc0RldGFpbFN3aXBlci5udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTNmYzIwZmNhJm1wVHlwZT1wYWdlXCJcbnZhciByZW5kZXJqc1xuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9nb29kc0RldGFpbFN3aXBlci5udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCJcbmV4cG9ydCAqIGZyb20gXCIuL2dvb2RzRGV0YWlsU3dpcGVyLm52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmbXBUeXBlPXBhZ2VcIlxuZnVuY3Rpb24gaW5qZWN0U3R5bGVzIChjb250ZXh0KSB7XG4gIFxuICBpZighdGhpcy5vcHRpb25zLnN0eWxlKXtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuc3R5bGUgPSB7fVxuICAgICAgfVxuICAgICAgaWYoVnVlLnByb3RvdHlwZS5fX21lcmdlX3N0eWxlICYmIFZ1ZS5wcm90b3R5cGUuX18kYXBwU3R5bGVfXyl7XG4gICAgICAgIFZ1ZS5wcm90b3R5cGUuX19tZXJnZV9zdHlsZShWdWUucHJvdG90eXBlLl9fJGFwcFN0eWxlX18sIHRoaXMub3B0aW9ucy5zdHlsZSlcbiAgICAgIH1cbiAgICAgIGlmKFZ1ZS5wcm90b3R5cGUuX19tZXJnZV9zdHlsZSl7XG4gICAgICAgICAgICAgICAgVnVlLnByb3RvdHlwZS5fX21lcmdlX3N0eWxlKHJlcXVpcmUoXCIuL2dvb2RzRGV0YWlsU3dpcGVyLm52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWNzcyZtcFR5cGU9cGFnZVwiKS5kZWZhdWx0LCB0aGlzLm9wdGlvbnMuc3R5bGUpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucy5zdHlsZSxyZXF1aXJlKFwiLi9nb29kc0RldGFpbFN3aXBlci5udnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1jc3MmbXBUeXBlPXBhZ2VcIikuZGVmYXVsdClcbiAgICAgICAgICAgIH1cblxufVxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL2hidWlsZGVyWC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIFwiYmNiN2I3NzBcIixcbiAgZmFsc2UsXG4gIGNvbXBvbmVudHMsXG4gIHJlbmRlcmpzXG4pXG5cbmluamVjdFN0eWxlcy5jYWxsKGNvbXBvbmVudClcbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicGFnZXMvc3VibnZ1ZXMvZ29vZHNEZXRhaWxTd2lwZXIubnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///4\n");

/***/ }),
/* 5 */
/*!********************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/ysby/ysby/pages/subnvues/goodsDetailSwiper.nvue?vue&type=template&id=3fc20fca&mpType=page ***!
  \********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_goodsDetailSwiper_nvue_vue_type_template_id_3fc20fca_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../hbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../hbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.js!../../../../hbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../hbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!../../../../hbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./goodsDetailSwiper.nvue?vue&type=template&id=3fc20fca&mpType=page */ 6);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_goodsDetailSwiper_nvue_vue_type_template_id_3fc20fca_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_goodsDetailSwiper_nvue_vue_type_template_id_3fc20fca_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_goodsDetailSwiper_nvue_vue_type_template_id_3fc20fca_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_goodsDetailSwiper_nvue_vue_type_template_id_3fc20fca_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 6 */
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/ysby/ysby/pages/subnvues/goodsDetailSwiper.nvue?vue&type=template&id=3fc20fca&mpType=page ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: ["sp-container"] },
    [
      _c(
        "swiper",
        {
          staticClass: ["preview"],
          attrs: {
            autoplay: _vm.autoplay,
            duration: "500",
            interval: "5000",
            indicatorDots: true,
            indicatorActiveColor: "#ff6d7e",
            indicatorColor: "#fff"
          },
          on: { transition: _vm.swiperChange }
        },
        [
          _vm.video
            ? _c(
                "swiper-item",
                { staticClass: ["sp-swiper-item"] },
                [
                  _c("u-video", {
                    staticClass: ["preview"],
                    attrs: {
                      src: _vm.video,
                      id: "myVideo",
                      poster: _vm.videoPic
                    },
                    on: { play: _vm.play, pause: _vm.pause }
                  })
                ],
                1
              )
            : _vm._e(),
          _vm._l(_vm.thumb_url, function(item, index) {
            return _c(
              "swiper-item",
              { key: index, staticClass: ["sp-swiper-item"] },
              [
                _c("u-image", {
                  staticClass: ["banner"],
                  attrs: { src: item, mode: "" }
                })
              ],
              1
            )
          })
        ],
        2
      )
    ],
    1
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 7 */
/*!**************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/ysby/ysby/pages/subnvues/goodsDetailSwiper.nvue?vue&type=script&lang=js&mpType=page ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_goodsDetailSwiper_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../hbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib??ref--4-0!../../../../hbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!../../../../hbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./goodsDetailSwiper.nvue?vue&type=script&lang=js&mpType=page */ 8);\n/* harmony import */ var _hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_goodsDetailSwiper_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_goodsDetailSwiper_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_goodsDetailSwiper_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_goodsDetailSwiper_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_goodsDetailSwiper_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTBkLENBQWdCLCtmQUFHLEVBQUMiLCJmaWxlIjoiNy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vaGJ1aWxkZXJYL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL2hidWlsZGVyWC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNC0xIS4uLy4uLy4uLy4uL2hidWlsZGVyWC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9nb29kc0RldGFpbFN3aXBlci5udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vaGJ1aWxkZXJYL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL2hidWlsZGVyWC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNC0xIS4uLy4uLy4uLy4uL2hidWlsZGVyWC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9nb29kc0RldGFpbFN3aXBlci5udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///7\n");

/***/ }),
/* 8 */
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/ysby/ysby/pages/subnvues/goodsDetailSwiper.nvue?vue&type=script&lang=js&mpType=page ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });exports.default = void 0; //\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\nvar _default =\n{\n  data: function data() {\n    return {\n      thumb_url: [],\n      video: '',\n      videoPic: '',\n      autoplay: true,\n      videoContext: '' };\n\n  },\n  mounted: function mounted() {\n    var that = this;\n    uni.$on('page-popup', function (data) {\n      that.thumb_url = data.thumb_url;\n      that.video = data.video;\n      that.videoPic = data.poster;\n      that.videoContext = uni.createVideoContext('myVideo');\n    });\n\n  },\n  methods: {\n    pause: function pause() {\n      this.autoplay = true;\n    },\n    play: function play() {\n      this.autoplay = false;\n    },\n    swiperChange: function swiperChange(e) {\n      this.autoplay = true;\n      this.videoContext.pause();\n    } } };exports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vcGFnZXMvc3VibnZ1ZXMvZ29vZHNEZXRhaWxTd2lwZXIubnZ1ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBO0FBQ0EsTUFEQSxrQkFDQTtBQUNBO0FBQ0EsbUJBREE7QUFFQSxlQUZBO0FBR0Esa0JBSEE7QUFJQSxvQkFKQTtBQUtBLHNCQUxBOztBQU9BLEdBVEE7QUFVQSxTQVZBLHFCQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FMQTs7QUFPQSxHQW5CQTtBQW9CQTtBQUNBLFNBREEsbUJBQ0E7QUFDQTtBQUNBLEtBSEE7QUFJQSxRQUpBLGtCQUlBO0FBQ0E7QUFDQSxLQU5BO0FBT0EsZ0JBUEEsd0JBT0EsQ0FQQSxFQU9BO0FBQ0E7QUFDQTtBQUNBLEtBVkEsRUFwQkEsRSIsImZpbGUiOiI4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuXHQ8ZGl2IGNsYXNzPVwic3AtY29udGFpbmVyXCI+XG5cdFx0PHN3aXBlcsKgY2xhc3M9XCJwcmV2aWV3XCLCoDphdXRvcGxheT1cImF1dG9wbGF5XCLCoGR1cmF0aW9uPVwiNTAwXCLCoGludGVydmFsPVwiNTAwMFwiwqBcclxuXHRcdFx0QHRyYW5zaXRpb249J3N3aXBlckNoYW5nZScgOmluZGljYXRvci1kb3RzPSd0cnVlJyBpbmRpY2F0b3ItYWN0aXZlLWNvbG9yPScjZmY2ZDdlJyBpbmRpY2F0b3ItY29sb3I9JyNmZmYnPlxyXG5cdFx0XHRcdFx0XHQ8c3dpcGVyLWl0ZW0gdi1pZj1cInZpZGVvXCIgY2xhc3M9XCJzcC1zd2lwZXItaXRlbVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDx2aWRlbyA6c3JjPVwidmlkZW9cIiBjbGFzcz1cInByZXZpZXdcIiBpZD1cIm15VmlkZW9cIiAgOnBvc3Rlcj0ndmlkZW9QaWMnIEBwbGF5PSdwbGF5JyBAcGF1c2U9J3BhdXNlJz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3ZpZGVvPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8L3N3aXBlci1pdGVtPlxyXG5cdFx0wqDCoMKgwqA8c3dpcGVyLWl0ZW3CoHYtZm9yPVwiKGl0ZW0swqBpbmRleCnCoGluwqB0aHVtYl91cmxcIsKgOmtleT1cImluZGV4XCIgY2xhc3M9XCJzcC1zd2lwZXItaXRlbVwiPlxyXG5cdFx0wqDCoMKgwqBcdDxpbWFnZSA6c3JjPVwiaXRlbVwiIG1vZGU9XCJcIiBjbGFzcz1cImJhbm5lclwiPjwvaW1hZ2U+XHJcblx0XHTCoMKgwqDCoDwvc3dpcGVyLWl0ZW0+XHJcblx0XHTCoMKgwqA8L3N3aXBlcj5cblx0PC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuXHRleHBvcnQgZGVmYXVsdCB7XHJcblx0XHRkYXRhKCl7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0dGh1bWJfdXJsOltdLFxyXG5cdFx0XHRcdHZpZGVvOicnLFxyXG5cdFx0XHRcdHZpZGVvUGljOicnLFxyXG5cdFx0XHRcdGF1dG9wbGF5OnRydWUsXHJcblx0XHRcdFx0dmlkZW9Db250ZXh0OicnXHJcblx0XHRcdH1cclxuXHRcdH0sXG5cdFx0bW91bnRlZCgpe1xyXG5cdFx0XHR2YXIgdGhhdD10aGlzXHJcblx0XHRcdHVuaS4kb24oJ3BhZ2UtcG9wdXAnLCAoZGF0YSkgPT4geyAgXHJcblx0XHRcdFx0dGhhdC50aHVtYl91cmw9ZGF0YS50aHVtYl91cmxcclxuXHRcdFx0XHR0aGF0LnZpZGVvPWRhdGEudmlkZW9cclxuXHRcdFx0XHR0aGF0LnZpZGVvUGljPWRhdGEucG9zdGVyXHJcblx0XHRcdFx0dGhhdC52aWRlb0NvbnRleHQgPSB1bmkuY3JlYXRlVmlkZW9Db250ZXh0KCdteVZpZGVvJylcclxuXHRcdFx0fSkgIFxyXG5cclxuXHRcdH0sXHJcblx0XHRtZXRob2RzOntcclxuXHRcdFx0cGF1c2UoKXtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmF1dG9wbGF5PXRydWVcclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdHBsYXkoKXtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmF1dG9wbGF5PWZhbHNlXHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRzd2lwZXJDaGFuZ2UoZSl7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmF1dG9wbGF5PXRydWVcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMudmlkZW9Db250ZXh0LnBhdXNlKCk7XHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdH1cblx0fVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbi5zcC1jb250YWluZXJ7XHJcblx0aGVpZ2h0OiAyNTBweDtcclxufVxyXG4ucHJldmlldywuc3Atc3dpcGVyLWl0ZW17XHJcblx0aGVpZ2h0OiAyNTBweDtcclxufVxyXG4uYmFubmVye1xyXG5cdGhlaWdodDogMjUwcHg7XHJcbn1cclxuPC9zdHlsZT5cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///8\n");

/***/ }),
/* 9 */
/*!**********************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/ysby/ysby/pages/subnvues/goodsDetailSwiper.nvue?vue&type=style&index=0&lang=css&mpType=page ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_goodsDetailSwiper_nvue_vue_type_style_index_0_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../hbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!../../../../hbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!../../../../hbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-0-2!../../../../hbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!../../../../hbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./goodsDetailSwiper.nvue?vue&type=style&index=0&lang=css&mpType=page */ 10);
/* harmony import */ var _hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_goodsDetailSwiper_nvue_vue_type_style_index_0_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_goodsDetailSwiper_nvue_vue_type_style_index_0_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_goodsDetailSwiper_nvue_vue_type_style_index_0_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_goodsDetailSwiper_nvue_vue_type_style_index_0_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_hbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_goodsDetailSwiper_nvue_vue_type_style_index_0_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 10 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!./node_modules/postcss-loader/src??ref--8-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/ysby/ysby/pages/subnvues/goodsDetailSwiper.nvue?vue&type=style&index=0&lang=css&mpType=page ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "sp-container": {
    "height": "250"
  },
  "preview": {
    "height": "250"
  },
  "sp-swiper-item": {
    "height": "250"
  },
  "banner": {
    "height": "250"
  }
}

/***/ }),
/* 11 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })
/******/ ]);