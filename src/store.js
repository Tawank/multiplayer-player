import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app'
import 'firebase/database'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: []
  },
  mutations: {
    setRooms (state, payload) {
      state.rooms = payload
    }
  },
  actions: {
    listenRooms ({ commit }, payload) {
      firebase.database().ref('/rooms').on('value', snapshot => {
        let array = []
        let object = snapshot.val()
        Object.keys(object).forEach((key) => {
          array.push({ id: key, ...object[key] })
        })
        commit('setRooms', array)
      })
    },
    addRoom ({ commit }, payload) {
      let newPostRef = firebase.database().ref('rooms').push()
      let update = {
        name: payload.name,
        description: payload.description
      }
      newPostRef.set(update, error => {
        console.log(error)
      })
    }
  },
  getters: {
    rooms (state) {
      return state.rooms
    }
  }
})
