<template>
  <v-card>
    <v-card-title class="title mb-0 pb-2">
    Użytkownicy
    </v-card-title>
    <v-list two-line>
      <template v-for="(item, index) in users">
        <v-divider
          :key="'divider' + index"
        ></v-divider>
        <v-list-tile
          :key="'tile' + index"
          avatar
          @click="() => {}"
        >
          <v-list-tile-content>
            <v-list-tile-title :style="`color: ${item.status === 'online' ? 'green' : 'red'}`">{{index}}</v-list-tile-title>
            <v-list-tile-sub-title>{{item.role || 'nikt'}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-layout>
              <v-flex xs12>
                <v-btn flat @click="changeRole(index, item.role || 'nikt', 'admin')" color="success">Admin</v-btn>
                <v-btn flat @click="changeRole(index, item.role || 'nikt', 'nikt')" color="warning">Nikt</v-btn>
                <v-btn flat @click="changeRole(index, item.role || 'nikt', 'ban')" color="error">Ban</v-btn>
              </v-flex>
            </v-layout>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'

export default {
  props: {
    users: Object
  },
  data () {
    return {
      roles: [
        'admin',
        'nikt',
        'ban'
      ]
    }
  },
  methods: {
    changeRole (user, role, toRole) {
      if ((role === 'nikt' || role === 'ban') && this.user && this.users[this.user.email.replace(/[.#$]/g, '')].role === 'admin') {
        firebase.database().ref(`rooms/${this.$route.params.id}/users/${user}/role`).set(toRole)
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style scoped>

</style>
