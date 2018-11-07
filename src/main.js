import Vue from 'vue'
import router from './router'
import axios from 'axios'
import App from './App'

/* fastclick */ 
import FastClick from 'fastclick'
FastClick.attach(document.body)

/* flexible.js */
import '../static/lib/js/flexible_css.js'

/* iconfont */
import '../static/lib/iconfont/iconfont.css'

/* basic style */
import '../static/lib/css/basic.scss'

/* ExtendPlugin */
import ExtendPlugin from './plugins/vue.ext.js'
Vue.use(ExtendPlugin)

/* lodashPlugin */
import _ from './plugins/lodash'
Vue.use(_)

import { alloyDebug } from './service/alloyDebugService'
router.beforeEach((to,from,next)=>{
    //alloyDebug(to,next)
    next()
})

/* httpInterceptor */
import {request,response} from './service/httpInterceptor'
axios.interceptors.request.use(request)
axios.interceptors.response.use(response);

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)

import  { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)

/* store */
import store from './store'

/*filter*/
import filter from './filter'
Vue.use(filter)

/* router */

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el:'#app-box',
  router,
  store,
  render: h => h(App)
})
