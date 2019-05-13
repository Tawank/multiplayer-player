<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <v-tabs
                centered
                dark
                icons-and-text
              >
                <v-tabs-slider color="yellow"></v-tabs-slider>

                <v-tab @click="() => { $router.push({ name: 'singin' }) }">
                  Logowanie
                  <v-icon>lock</v-icon>
                </v-tab>

                <v-tab @click="() => { $router.push({ name: 'singup' }) }">
                  Rejestracja
                  <v-icon>person_add</v-icon>
                </v-tab>
              </v-tabs>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      class="mt-4"
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Hasło"
                      id="password"
                      v-model="password"
                      type="password"
                      required></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit">Logowanie</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      model: 0
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  watch: {
    user (value) {
      if (value) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignin () {
      this.$store.dispatch('signUserIn', { email: this.email, password: this.password })
    }
  }
}
</script>
