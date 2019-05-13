<template>
  <v-layout row wrap>
    <v-flex lg3 md4 sm6 xs12 :key="room.id" v-for="(room, index) in rooms">
      <v-card :color="colors[index % colors.length]" class="white--text ma-1">
        <v-layout row wrap>
          <v-flex xs5>
            <v-img
              :src="((room.song && room.song.thumbnail) ? room.song.thumbnail : '/question.png')"
              height="125px" class="ml-2"
              contain
            ></v-img>
          </v-flex>
          <v-flex xs7>
            <v-card-title primary-title>
              <div style="width: 100%;">
                <div :title="room.name" class="headline">{{room.name}}</div>
                <div :title="room.description" class="text-truncate">{{room.description}}</div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider light></v-divider>
        <v-card-actions class="pa-3">
          <div :title="room.song.title" class="text-truncate caption" v-if="room.song">Aktualnie gra: {{room.song.title}}</div>
          <v-spacer></v-spacer>
          <v-btn flat color="white" @click="() => {$router.push({ name: 'room', params: { id: room.id }})}">Wejdź</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
      colors: [
        'red darken-4',
        'blue darken-4',
        'purple darken-1',
        'cyan darken-4',
        'orange darken-3',
        'green darken-3'
      ]
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
