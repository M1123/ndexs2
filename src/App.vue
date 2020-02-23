<template>
  <v-app>
    <h1>
      <router-link to="/">EXS2</router-link>
    </h1>
    <hr>
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({

  }),
};
</script>
