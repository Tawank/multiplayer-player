<template>
  <vue-plyr>
    <div class="plyr__video-embed">
      <iframe
        :src="'https://www.youtube.com/embed/'+ database +'?iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1'"
        allowfullscreen allowtransparency allow="autoplay">
      </iframe>
    </div>
  </vue-plyr>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export default {
  data () {
    return {
      database: ''
    }
  },
  mounted () {
    firebase.database().ref('/').on('value', (snapshot) => {
      this.database = snapshot.val()
    })
  },
  methods: {
  }
}
</script>

<style>

</style>
