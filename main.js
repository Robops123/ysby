import Vue from 'vue'
import App from './App'

// js
import { getHeight } from './static/js/common.js'

// css
 import "./static/css/font.css"
 import './static/css/common.css'

Vue.config.productionTip = false
Vue.prototype.$getHeight=getHeight


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
