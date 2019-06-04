<template>
  <v-layout
    wrap
  >
    <v-flex lg6 md12 class="px-1">
      <v-layout wrap>
        <v-flex xs12>
          <Player ref="player" v-if="song" :src="song.src" :startedDate="song.startedDate" @ended="songEnded"/>
        </v-flex>
        <v-flex xs12>
          <Playlist :playlist="playlist" @playFromPlaylist="playFromPlaylist" @deleteFromPlaylist="deleteFromPlaylist" />
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex lg6 md12 class="px-1">
      <v-layout wrap>
        <v-flex xs12>
          <Search :initSearch="song && song.src" @videoSelected="setVideo" @addToPlaylist="addToPlaylist" />
        </v-flex>
        <v-flex xs12>
          <Users :users="users"/>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import Player from '../components/Player'
import Search from '../components/Search'
import Playlist from '../components/Playlist'
import Users from '../components/Users'
import firebase from 'firebase/app'
import 'firebase/database'

export default {
  data () {
    return {
      playlist: {},
      loading: false,
      error: null
    }
  },
  methods: {
    setVideo ({ src, title, thumbnail }) {
      if (this.banned === true) return
      firebase.database().ref(`rooms/${this.roomId}/song`).set({
        src,
        title,
        thumbnail,
        startedDate: firebase.database.ServerValue.TIMESTAMP
      }, error => {
        if (error) {
          this.error = error
          console.log(error)
        }
      })
      this.$refs.player.player.play()
    },
    addToPlaylist ({ src, title, thumbnail }) {
      if (this.banned === true) return
      let newSong = firebase.database().ref(`playlist/${this.roomId}`).push()
      newSong.set({
        src,
        title,
        thumbnail
      }, error => {
        if (error) {
          this.error = error
          console.log(error)
        }
      })
    },
    fetchPlaylist () {
      firebase.database().ref(`playlist/${this.roomId}`).on('value', (snapshot) => {
        this.playlist = snapshot.val()
      })
    },
    playFromPlaylist (search) {
      if (this.banned === true) return
      if (!search) return
      this.setVideo({
        src: search.src,
        title: search.title,
        thumbnail: search.thumbnail
      })
      this.deleteFromPlaylist(search.key)
    },
    deleteFromPlaylist (key) {
      if (this.banned === true) return
      firebase.database().ref(`playlist/${this.roomId}/${key}`).set(null)
    },
    songEnded () {
      this.playFromPlaylist({
        key: Object.keys(this.playlist)[0],
        ...this.playlist[Object.keys(this.playlist)[0]]
      })
    }
  },
  created () {
    this.fetchPlaylist()
  },
  mounted () {
    if (this.user) {
      firebase.database().ref(`rooms/${this.$route.params.id}/users/${this.user.email.replace(/[.#$]/g, '')}/status`).set('online')
      firebase.database().ref(`rooms/${this.$route.params.id}/users/${this.user.email.replace(/[.#$]/g, '')}/status`).onDisconnect().set('offline')
    }
  },
  beforeRouteLeave (to, from, next) {
    console.log(this.roomId)
    firebase.database().ref(`playlist/${this.$route.params.id}`).off()
    firebase.database().ref(`rooms/${this.$route.params.id}/users/${this.user.email.replace(/[.#$]/g, '')}/status`).set('offline')
    next()
  },
  computed: {
    roomId () {
      return this.$route.params.id
    },
    song () {
      return this.$store.getters.roomsObj[this.roomId] && this.$store.getters.roomsObj[this.roomId].song
    },
    users () {
      return this.$store.getters.roomsObj[this.roomId] && this.$store.getters.roomsObj[this.roomId].users
    },
    user () {
      return this.$store.getters.user
    },
    banned () {
      return this.$store.getters.banned
    }
  },
  watch: {
    $route (to, from) {
      this.fetchPlaylist()
    },
    user (newVal) {
      firebase.database().ref(`rooms/${this.$route.params.id}/users/${newVal.email.replace(/[.#$]/g, '')}/status`).set('online')
      firebase.database().ref(`rooms/${this.$route.params.id}/users/${newVal.email.replace(/[.#$]/g, '')}/status`).onDisconnect().set('offline')
    }
  },
  components: {
    Player,
    Search,
    Playlist,
    Users
  }
}
</script>
