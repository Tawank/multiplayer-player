import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import rooms from './modules/rooms'
import shared from './modules/shared'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    rooms,
    shared
  }
})
