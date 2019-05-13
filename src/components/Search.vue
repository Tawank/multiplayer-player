<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-layout>
        <v-flex xs11>
          <v-text-field
            v-on:keyup.enter="searchYoutube"
            label="Szukaj"
            v-model="search"
          ></v-text-field>

        </v-flex>
        <v-flex xs1>
          <v-btn
            dark
            depressed
            icon
            color="black"
            @click="searchYoutube"
          >
            <v-icon medium>
              search
            </v-icon>
          </v-btn>
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
              @click="() => { }"
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
import axios from 'axios'

export default {
  props: {
    initSearch: String
  },
  data () {
    return {
      related: null,
      search: ''
    }
  },
  mounted () {
    if (this.initSearch) {
      axios.get(`https://us-central1-multiplayer-player.cloudfunctions.net/youtubeRelated?id=${this.initSearch}`).then((response) => {
        this.related = response.data.items.map(x => ({
          title: x.snippet.title,
          src: x.id.videoId,
          thumbnail: x.snippet.thumbnails.medium.url
        })).slice(0, 24)
      }).catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      })
    } else {
      axios.get(`https://us-central1-multiplayer-player.cloudfunctions.net/youtubeRelated?search=music`).then((response) => {
        this.related = response.data.items.map(x => ({
          title: x.snippet.title,
          src: x.id.videoId,
          thumbnail: x.snippet.thumbnails.medium.url
        })).slice(0, 24)
      }).catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      })
    }
  },
  methods: {
    getRelated (id) {
      axios.get(`https://us-central1-multiplayer-player.cloudfunctions.net/youtubeRelated?id=${id}`).then((response) => {
        this.related = response.data.items.map(x => ({
          title: x.snippet.title,
          src: x.id.videoId,
          thumbnail: x.snippet.thumbnails.medium.url
        })).slice(0, 24)
      }).catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      })
    },
    searchYoutube () {
      axios.get(`https://us-central1-multiplayer-player.cloudfunctions.net/youtubeRelated?search=${this.search}`).then((response) => {
        this.related = response.data.items.map(x => ({
          title: x.snippet.title,
          src: x.id.videoId,
          thumbnail: x.snippet.thumbnails.medium.url
        })).slice(0, 24)
      }).catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      })
    },
    setSrc (src, title, thumbnail) {
      console.log({ src, title, thumbnail })
      this.$emit('videoSelected', { src, title, thumbnail })
    }
  }
}
</script>

<style>

</style>
