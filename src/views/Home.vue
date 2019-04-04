<template>
  <v-layout row wrap>
    <v-flex xs12>
      <AddRoom />
    </v-flex>
    <v-flex xs12>
      <Rooms />
    </v-flex>
  </v-layout>
</template>

<script>
import Rooms from '../components/Rooms'
import AddRoom from '../components/AddRoom'

export default {
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
    Rooms,
    AddRoom
  }
}
</script>
