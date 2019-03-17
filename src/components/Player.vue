<template>
  <vue-plyr>
    <div class="plyr__video-embed">
      <iframe
        :src="'https://www.youtube.com/embed/'+ src +'?iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1'"
        allowfullscreen allowtransparency allow="autoplay">
      </iframe>
    </div>
  </vue-plyr>
</template>

<script>
export default {
  props: {
    src: String
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  },
  components: {
  }
}
</script>

<style>

</style>
