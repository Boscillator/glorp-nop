// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import * as firebase from 'firebase'

import App from './App'
import * as Store from './store'

Vue.use(Vuex)
Vue.use(VueMaterial)
Vue.config.productionTip = false

var config = {
  apiKey: "AIzaSyBRdozT9HLIntrsbFu2fll-u8TPjX0o9wk",
  authDomain: "glorpnop.firebaseapp.com",
  databaseURL: "https://glorpnop.firebaseio.com",
  projectId: "glorpnop",
  storageBucket: "glorpnop.appspot.com",
  messagingSenderId: "706058654523"
};
firebase.initializeApp(config)

const store = new Vuex.Store(Store)

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App }
})
