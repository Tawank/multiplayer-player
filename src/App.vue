<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>MultiPlayer</span>
        <span class="font-weight-light">Player</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>

    <v-content>
      <v-container>
        <v-layout
          text-xs-center
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
    }
  }
}
</script>
