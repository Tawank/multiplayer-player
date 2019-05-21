<template>
  <v-card>
    <v-card-title class="title mb-0 pb-2">
    Playlista
    </v-card-title>
    <v-list two-line>
      <template v-for="(item, index) in playlist">
        <v-divider
          :key="'divider' + index"
        ></v-divider>
        <v-list-tile
          :key="'tile' + index"
          avatar
          @click="() => {}"
        >
          <v-list-tile-avatar>
            <img :src="item.thumbnail">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
            <v-list-tile-sub-title>{{item.user}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-layout>
              <v-flex xs12>
                <v-btn icon ripple @click="() => { playFromPlaylist(item.src, item.title, item.thumbnail, index) }">
                  <v-icon color="grey lighten-1">play_arrow</v-icon>
                </v-btn>
                <v-btn icon ripple @click="() => { getRelated(item.src) }" class="ml-2">
                  <v-icon color="grey lighten-1">apps</v-icon>
                </v-btn>
                <v-btn icon ripple @click="() => { deleteFromPlaylist(index) }" class="ml-2">
                  <v-icon color="grey lighten-1">delete</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    playlist: Object
  },
  data () {
    return {
    }
  },
  methods: {
    playFromPlaylist (src, title, thumbnail, key) {
      this.$emit('deleteFromPlaylist', key)
      this.$emit('playFromPlaylist', { src, title, thumbnail })
    },
    getRelated (search) {
      this.$store.dispatch('searchRelated', search)
    },
    deleteFromPlaylist (key) {
      this.$emit('deleteFromPlaylist', key)
    }
  }
}
</script>

<style scoped>

</style>
