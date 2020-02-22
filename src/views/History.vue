<template>
  <v-card
    class="mx-auto question"
  >
    <v-card-title>
      <h1 class="display-1">Вопросы и ответы</h1>
    </v-card-title>
    <v-card-text>
      <QAitem/>
    </v-card-text>
  </v-card>
</template>

<script>
import QAitem from '@/views/QAitem.vue';

export default {
  components: {
    QAitem,
  },
};
</script>

<style scoped>
  .question{
    min-width: 320px;
    width: 100%;
  }
</style>
