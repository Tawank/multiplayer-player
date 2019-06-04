import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  state: {
    user: null,
    banned: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setBanned (state, payload) {
      state.banned = payload
    }
  },
  actions: {
    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(user => {
        const newUser = {
          id: user.uid,
          email: user.email
        }
        commit('setUser', newUser)
        commit('setLoading', false)
      }).catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
    },
    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(user => {
        const newUser = {
          id: user.uid,
          email: user.email
        }
        commit('setUser', newUser)
        commit('setLoading', false)
      }).catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
    },
    autoSignIn ({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        email: payload.email
      })
    },
    logout ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    banned (state) {
      return state.banned
    }
  }
}
