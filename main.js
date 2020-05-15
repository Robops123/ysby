import Vue from 'vue'
import App from './App'

// js
import { getHeight,loading,msg,operateInterceptor,upload } from './static/js/common.js'
import request from './static/js/request.js'
import siteinfo from './common/siteinfo.js'

// css


Vue.config.productionTip = false
Vue.prototype.$getHeight=getHeight
Vue.prototype.$loading=loading
Vue.prototype.$msg=msg
Vue.prototype.$upload=upload
Vue.prototype.$operateInterceptor=operateInterceptor
Vue.prototype.$apiPost=request.apiPost
Vue.prototype.$apiGet=request.apiGet
Vue.prototype.$imgBaseUrl='http://192.168.1.157/yishuban2/attachment/'

App.siteinfo=siteinfo
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
