<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title @click="() => { $router.push({ name: 'home' }) }" class="headline text-uppercase" style="cursor: pointer;">
        <span>MultiPlayer</span>
        <span class="font-weight-light">Player</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      {{user}}
      <v-img
        :src="user && `https://api.adorable.io/avatars/${user}`"
        class="ml-3"
        height="50px"
        max-width="50px"
        contain
        position="right center"
        aspect-ratio="1"
      ></v-img>
      <v-toolbar-items>
        <v-btn @click="() => { $router.push({ name: 'singin' }) }" flat class="ml-4">Logowanie<v-icon right dark>lock</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <router-view>
        </router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      user: '',
      adjectives: [
        'Agresywny',
        'Arogancki',
        'Bezczelny',
        'Beznadziejny',
        'Bezwzględny',
        'Biedny',
        'Bojaźliwy',
        'Bystry',
        'Brudny',
        'Chamski',
        'Chciwy',
        'Denerwujący',
        'Despotyczny',
        'Dobry',
        'Dowcipny',
        'Dynamiczny',
        'Dziki',
        'Egoistyczny',
        'Elokwentny',
        'Energiczny',
        'Gorszy',
        'Gwałtowny',
        'Ironiczny',
        'Komunikatywny',
        'Łakomy',
        'Nieśmiały',
        'Niezależny',
        'Nikczemny',
        'Obłąkany',
        'Podejrzliwy',
        'Pracowity',
        'Punktualny',
        'Rozczarowany',
        'Rozpalony',
        'Samodzielny',
        'Skąpy',
        'Skromny',
        'Smutny',
        'Surowy',
        'Szalony',
        'Szarmancki',
        'Sztywny',
        'Tchórzliwy',
        'Taktowny',
        'Tolerancyjny',
        'Uczciwy',
        'Utalentowany',
        'Wykształcony',
        'Prowokujący',
        'Wyrozumiały',
        'Zabawny',
        'Zakochany',
        'Zaniepokojony',
        'Zarozumiały',
        'Zawistny',
        'Zazdrosny',
        'Znudzony',
        'Zwariowany'
      ],
      nouns: [
        'Andrzej',
        'Damian',
        'Janusz',
        'Gandalf',
        'Hobbit',
        'Pepa',
        'Dzik',
        'Pingwin',
        'Harry',
        'Papużka',
        'Nimfa',
        'Dres',
        'Małpa',
        'Pawian',
        'Goryl',
        'Mariola',
        'Grażyna',
        'Gitarzystka',
        'Gargamel',
        'Bambo',
        'Cezar',
        'Tezeusz',
        'Minos',
        'Koń',
        'Kuna',
        'Prometeusz',
        'Surykatka',
        'Robin',
        'Czubaka',
        'Han Solo',
        'Żyd',
        'Rosjanin'
      ]
    }
  },
  mounted () {
    this.user = this.nouns[Math.floor((Math.random() * this.nouns.length))]
    let adj = this.adjectives[Math.floor((Math.random() * this.adjectives.length))]
    this.user = (this.user[this.user.length - 1] === 'a' ? adj.replace(/.$/, 'a') : adj) + ' ' + this.user
  }
}
</script>
