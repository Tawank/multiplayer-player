<template>
  <v-layout
    wrap
  >
    <v-flex lg6 md12 class="px-1">
      <v-layout wrap>
        <v-flex xs12>
          <Player :src="songSrc" />
        </v-flex>
        <v-flex xs12>
          <Playlist :playlist="playlist" @playFromPlaylist="playFromPlaylist" @deleteFromPlaylist="deleteFromPlaylist" />
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex lg6 md12 class="px-1">
      <Search :initSearch="songSrc" @videoSelected="setVideo" @addToPlaylist="addToPlaylist" />
    </v-flex>
  </v-layout>
</template>

<script>
import Player from '../components/Player'
import Search from '../components/Search'
import Playlist from '../components/Playlist'
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
      firebase.database().ref(`playlist/${this.roomId}`).set({
        src,
        title,
        thumbnail
      }, error => {
        console.log(error)
      })
    },
    addToPlaylist ({ src, title, thumbnail }) {
      let newSong = firebase.database().ref(`playlist/${this.roomId}`).push()
      newSong.set({
        src,
        title,
        thumbnail
      }, error => {
        this.error = error
        console.log(error)
      })
    },
    fetchPlaylist () {
      firebase.database().ref(`playlist/${this.roomId}`).on('value', (snapshot) => {
        this.playlist = snapshot.val()
      })
    },
    playFromPlaylist () {
    },
    deleteFromPlaylist () {
    }
  },
  created () {
    this.fetchPlaylist()
  },
  computed: {
    roomId () {
      return this.$route.params.id
    },
    songSrc () {
      if (this.$store.getters.roomsObj[this.roomId] && this.$store.getters.roomsObj[this.roomId].song) {
        return this.$store.getters.roomsObj[this.roomId].song.src
      } else return null
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  components: {
    Player,
    Search,
    Playlist
  }
}
</script>
