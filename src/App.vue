<template>
  <v-app>
    <h1>
      <router-link to="/">EXS2</router-link>
    </h1>
    <hr>
    <router-view
      v-bind:msg="msg"
    />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({
    msg: [
      {
        id: 1,
        title: 'Тема вопроса1',
        text: 'q1 lorem20',
      },
      {
        id: 2,
        title: 'Тема вопроса2',
        text: 'q1 lorem20',
      },
      {
        id: 3,
        title: 'Тема вопроса3',
        text: 'q1 lorem20',
      },
      {
        id: 4,
        title: 'Тема вопроса4',
        text: 'q1 lorem20',
      },
    ],
  }),
};
</script>
