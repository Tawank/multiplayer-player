import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/database'

Vue.use(Vuex)

export default {
  state: {
    rooms: [],
    roomsObj: {},
    playlist: [],
    related: []
  },
  mutations: {
    setRooms (state, payload) {
      state.rooms = payload
    },
    setRoomsObj (state, payload) {
      state.roomsObj = payload
    },
    setPlaylist (state, payload) {
      state.playlist = payload
    },
    setRelated (state, payload) {
      state.related = payload
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
        commit('setRoomsObj', object)
      })
    },
    addRoom ({ commit }, payload) {
      let newPostRef = firebase.database().ref('rooms').push()
      let update = {
        name: payload.name,
        description: payload.description,
        user: payload.user.email,
        users: payload.users
      }
      newPostRef.set(update, error => {
        console.log(error)
      })
    },
    searchRelated ({ commit }, payload) {
      axios.get(`https://us-central1-multiplayer-player.cloudfunctions.net/youtubeRelated?search=${payload}`).then((response) => {
        commit('setRelated', response.data.items.map(x => ({
          title: x.snippet.title,
          src: x.id.videoId,
          thumbnail: x.snippet.thumbnails.medium.url
        })).slice(0, 24))
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  getters: {
    rooms (state) {
      return state.rooms
    },
    roomsObj (state) {
      return state.roomsObj
    },
    playlist (state) {
      return state.playlist
    },
    related (state) {
      return state.related
    }
  }
}
