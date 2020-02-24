<template>
  <v-app>
    <header>
      <router-link to="/"><h1>EXS2</h1></router-link>
      <v-btn v-if="this.logedUser" @click="logout">Logout</v-btn>
    </header>
    <hr>
    <router-view @auth="auth"/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({
    logedUser: false,
  }),
  methods: {
    auth(value) {
      this.logedUser = value;
    },
    logout() {
      localStorage.removeItem('logedUser');
      this.$router.replace('/login');
      this.logedUser = false;
    },
  },
};
</script>
