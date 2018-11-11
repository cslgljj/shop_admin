import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/common.less'
import ElementUI from 'element-ui'
import axios from 'axios'
import Vue from 'vue'
import App from './App'

import router from './router'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
