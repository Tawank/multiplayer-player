<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title @click="() => { $router.push({ name: 'home' }) }" class="headline text-uppercase">
        <span>MultiPlayer</span>
        <span class="font-weight-light">Player</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-img
        :src="'https://api.adorable.io/avatars/' + user"
        class="mr-2"
        height="50px"
        contain
        position="right center"
        aspect-ratio="1"
      ></v-img>
      {{user}}
    </v-toolbar>

    <v-content>
      <v-container>
        <v-layout
          wrap
        >
          <router-view>
          </router-view>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      user: ''
    }
  },
  mounted () {
    this.user = Math.random().toString(36).substring(7)
  }
}
</script>
