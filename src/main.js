// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/global.css'
import '../static/fonts/iconfont.css'
import '../static/fonts/demo.css'

// //vuex
// import Vuex from 'vuex'
//  Vue.use(Vuex)
// let store = new Vuex.Store({
//   state:{
//     num:0,
//   },
//   mutations:{
//     addNum(state){
//       state.num++
//     },
//     reduceNum(){
//       state.num--
//     }
//   }
// })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>'
})
