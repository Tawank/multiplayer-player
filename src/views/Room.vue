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
      <Search :initSearch="song && song.src" @videoSelected="setVideo" @addToPlaylist="addToPlaylist" />
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
      if (!search) return
      this.setVideo({
        src: search.src,
        title: search.title,
        thumbnail: search.thumbnail
      })
      this.deleteFromPlaylist(search.key)
    },
    deleteFromPlaylist (key) {
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
  computed: {
    roomId () {
      return this.$route.params.id
    },
    song () {
      return this.$store.getters.roomsObj[this.roomId] && this.$store.getters.roomsObj[this.roomId].song
    }
  },
  watch: {
    '$route': 'fetchPlaylist'
  },
  components: {
    Player,
    Search,
    Playlist
  }
}
</script>
