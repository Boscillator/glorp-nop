// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import App from './App'
import * as Store from './store'

Vue.use(Vuex)
Vue.use(VueMaterial)
Vue.config.productionTip = false

const store = new Vuex.Store(Store)

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App }
})
