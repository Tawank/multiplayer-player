<template>
  <v-layout
    wrap
  >
    <v-flex lg6 md12 class="px-1">
      <Player :src="songSrc" />
    </v-flex>
    <v-flex lg6 md12 class="px-1">
      <Search :initSearch="songSrc" @videoSelected="setVideo" />
    </v-flex>
  </v-layout>
</template>

<script>
import Player from '../components/Player'
import Search from '../components/Search'

export default {
  methods: {
    setVideo ({ src, title, thumbnail }) {
      this.$store.dispatch('setSong', { roomId: this.roomId, src, title, thumbnail })
    }
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
  components: {
    Player,
    Search
  }
}
</script>
