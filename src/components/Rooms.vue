<template>
  <v-layout row>
    <v-flex xs3>
      <v-card color="cyan darken-2" class="white--text" :key="room.id" v-for="room in rooms">
        <v-layout>
          <v-flex xs5>
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
              height="125px"
              contain
            ></v-img>
          </v-flex>
          <v-flex xs7>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{room.name}}</div>
                <div>{{room.description}}</div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider light></v-divider>
        <v-card-actions class="pa-3">
          <v-spacer></v-spacer>
          <v-btn flat color="white" @click="() => {$router.push({ name: 'Room', params: { id: room.id }})}">Wejdź</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  computed: {
    rooms () {
      return this.$store.getters.rooms
    }
  },
  components: {
  }
}
</script>
