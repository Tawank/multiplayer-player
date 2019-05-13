<template>
  <v-layout>
    <v-flex xs12>
      <v-layout>
        <v-flex xs5>
          <v-text-field
            v-model="roomName"
            class="mx-2"
            label="Nazwa pokoju"
            solo
          ></v-text-field>
        </v-flex>
        <v-flex xs5>
          <v-text-field
            v-model="roomDescription"
            class="mx-2"
            label="Opis pokoju"
            solo
          ></v-text-field>
        </v-flex>
        <v-flex xs1>
          <v-btn @click="addRoom">Dodaj pokój</v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      roomName: '',
      roomDescription: ''
    }
  },
  mounted () {
  },
  methods: {
    addRoom () {
      this.$store.dispatch('addRoom', { name: this.roomName, description: this.roomDescription })
    }
  }
}
</script>

<style>

</style>
