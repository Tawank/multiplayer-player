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
          @click="() => {changeRole(index, item.role)}"
        >
          <v-list-tile-content>
            <v-list-tile-title :style="`color: ${item.status === 'online' ? 'green' : 'red'}`">{{index}}</v-list-tile-title>
            <v-list-tile-sub-title>{{item.role || 'nikt'}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-layout>
              <v-flex xs12>
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
    users: Object
  },
  data () {
    return {
    }
  },
  methods: {
    changeRole (user, role) {

    }
  }
}
</script>

<style scoped>

</style>
