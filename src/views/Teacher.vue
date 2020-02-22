<template>
  <div>
    <v-card class="mx-auto mt-5 question">
      <v-card-title>
        <h1 class="display-1">Ответ студенту</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-textarea
            label="Текст ответа"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="info">Send</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

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
    margin: 50px;
    min-width: 320px;
    width: 50vw;
  }
</style>
