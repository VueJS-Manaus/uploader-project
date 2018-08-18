import Vue from 'vue'
import App from './App'
import router from './router'
import * as firebase from 'firebase'
import { store } from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import AlerComp from './components/shared/Alert'

Vue.use(BootstrapVue)

Vue.config.productionTip = false
Vue.component('app-alert', AlerComp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyD4exgJ7DPBYBG2XKY9zyaNYxo_YqM9qYQ',
      authDomain: 'uploader-project-14ee5.firebaseapp.com',
      databaseURL: 'https://uploader-project-14ee5.firebaseio.com',
      projectId: 'uploader-project-14ee5',
      storageBucket: 'uploader-project-14ee5.appspot.com'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('loadedFiles')
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
})
