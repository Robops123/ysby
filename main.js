import Vue from 'vue'
import App from './App'
import yuToast from '@/components/yu-toast/yu-toast'

// js
import { getHeight,loading,msg } from './static/js/common.js'
import request from './static/js/request.js'

// css
 import "./static/css/iconfont.css"
 import './static/css/common.css'

Vue.use(yuToast)
Vue.config.productionTip = false
Vue.prototype.$getHeight=getHeight
Vue.prototype.$loading=loading
Vue.prototype.$msg=msg
Vue.prototype.$apiPost=request.apiPost
Vue.prototype.$apiGet=request.apiGet


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
