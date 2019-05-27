<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-layout>
        <v-flex xs12>
          <v-text-field
            v-on:keyup.enter="searchYoutube"
            label="Szukaj"
            v-model="search"
            append-outer-icon="search"
            @click:append-outer="searchYoutube"
            class="mt-0 pt-0"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex
    v-for="item in related"
    :key="item.src"
    xs2
    d-flex
    >
      <v-card flat tile class="d-flex">
        <v-img
        :src="item.thumbnail"
        :lazy-src="item.thumbnail"
        aspect-ratio="1.1"
        class="grey lighten-2"
        @click="() => {}"
        >
        <v-layout column fill-height class="lightbox white--text">
          <v-flex shrink>
            <div class="subheading" style="height: 50px; background:rgba(0,0,0,0.7); overflow:hidden;">{{item.title}}</div>
          </v-flex>
          <v-spacer></v-spacer>
          <v-layout class="mt-4">
            <v-flex xs12>
              <v-btn
              dark :class="$vuetify.breakpoint.width < 1450 ? 'mx-0' : 'mx-1'"
              depressed :style="$vuetify.breakpoint.width < 1675 ? 'width: 30px;' : ''"
              icon medium
              color="grey darken-3"
              @click="() => { setSrc(item.src, item.title, item.thumbnail) }"
              >
              <v-icon medium>
                play_arrow
              </v-icon>
              </v-btn>
              <v-btn
              dark :class="$vuetify.breakpoint.width < 1450 ? 'mx-0' : 'mx-1'"
              depressed :style="$vuetify.breakpoint.width < 1675 ? 'width: 30px;' : ''"
              icon medium
              color="grey darken-3"
              @click="() => { addToPlaylist(item.src, item.title, item.thumbnail) }"
              >
              <v-icon medium>
                playlist_add
              </v-icon>
              </v-btn>
              <v-btn
              dark :class="$vuetify.breakpoint.width < 1450 ? 'mx-0' : 'mx-1'"
              depressed :style="$vuetify.breakpoint.width < 1675 ? 'width: 30px;' : ''"
              icon medium
              color="grey darken-3"
              @click="() => { getRelated(item.src) }"
              >
              <v-icon medium>
                apps
              </v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-layout>
        <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0
        >
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-layout>
        </v-img>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    initSearch: String
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    related () {
      return this.$store.getters.related
    }
  },
  mounted () {
    if (this.initSearch) {
      this.$store.dispatch('searchRelated', this.initSearch)
    } else {
      this.$store.dispatch('searchRelated', 'music')
    }
  },
  methods: {
    getRelated (id) {
      this.$store.dispatch('searchRelated', id)
    },
    searchYoutube () {
      this.$store.dispatch('searchRelated', this.search)
    },
    setSrc (src, title, thumbnail) {
      this.$emit('videoSelected', { src, title, thumbnail })
    },
    addToPlaylist (src, title, thumbnail) {
      console.log({ src, title, thumbnail })
      this.$emit('addToPlaylist', { src, title, thumbnail })
    }
  }
}
</script>

<style>

</style>
