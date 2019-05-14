import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

import firebase from 'firebase/app'
import 'firebase/auth'

import router from './router'
import store from '@/store'

Vue.config.productionTip = false

Vue.use(VuePlyr)

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyA0AhNeFdAuO_M0yZSwiH61nVY7RKTnTAM',
      authDomain: 'multiplayer-player.firebaseapp.com',
      databaseURL: 'https://multiplayer-player.firebaseio.com',
      projectId: 'multiplayer-player',
      storageBucket: 'multiplayer-player.appspot.com',
      messagingSenderId: '401823794317'
    })
    this.$store.dispatch('listenRooms')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
}).$mount('#app')
