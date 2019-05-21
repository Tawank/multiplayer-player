<template>
  <vue-plyr ref="plyr">
    <div class="plyr__video-embed">
      <iframe
        :src="'https://www.youtube.com/embed/' + src + '?iv_load_policy=3&autoplay=1&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1'"
        allowfullscreen allowtransparency allow="autoplay">
      </iframe>
    </div>
  </vue-plyr>
</template>

<script>
export default {
  props: {
    src: String,
    startedDate: Number
  },
  data () {
    return {
      synchronised: false
    }
  },
  mounted () {
    this.player.on('playing', () => {
      this.playing()
    })
    this.player.on('ended', () => {
      this.$emit('ended')
    })
  },
  computed: {
    player () {
      return this.$refs.plyr.player
    }
  },
  methods: {
    playing () {
      if (!this.synchronised) {
        console.log(((+new Date()) - this.startedDate) / 1000)
        this.player.currentTime = (((+new Date()) - this.startedDate) / 1000)
        this.synchronised = true
      }
    }
  },
  watch: {
    src (newVal) {
      this.player.source = {
        type: 'video',
        sources: [
          {
            src: newVal,
            provider: 'youtube'
          }
        ]
      }
      this.synchronised = false
    }
  },
  components: {
  }
}
</script>

<style>

</style>
