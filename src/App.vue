<template>
  <v-app>
    <header class="header">
      <router-link to="/" class="display-1">Вопросы</router-link>
      <v-spacer/>
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

<style  scoped>
  .header{
    display: flex;
  }
  .display-1{
    text-decoration: none;
    color: #000;
  }
</style>
