<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs6 class="px-1">
        <Player />
      </v-flex>
      <v-flex xs6 class="px-1">
        <Search />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Player from '../components/Player'
import Search from '../components/Search'

export default {
  components: {
    Player,
    Search
  }
}
</script>
