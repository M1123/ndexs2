<template>
  <div>
    <v-card class="mx-auto mt-5 question">
      <v-card-title>
        <h1 class="display-1">Вопрос преподавателю</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Тема вопроса"
          />
          <v-textarea
            label="Текст вопроса"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-file-input
          :rules="rules"
          accept=".pdf, image/*"
          label="Select File..."
          show-size
        ></v-file-input>
        <v-spacer/>
        <v-btn color="info">Send</v-btn>
      </v-card-actions>
    </v-card>
    <v-spacer></v-spacer>
    <History
      type="Student"
    />
  </div>
</template>

<script>
import History from '@/views/History.vue';

export default {
  name: 'App',
  components: {
    History,
  },
  data: () => ({
    rules: [
      (value) => !value || value.size <= 102400 || 'Размер файла должен быть не более 100 KB!',
    ],
  }),
};
</script>
<style scoped>
  .question{
    width: 50vw;
    min-width: 320px;
    margin: 50px;
  }
</style>
