<template>
<div>
 <h1 class="display-1">Вопросы и ответы</h1>
  <v-card v-for="(item, index) in this.historyOfMessages" :key="index"
    class="mx-auto question"
  >
    <v-card-title>
      <h3
        @click="chooseThisTheme(item.theme)"
        class="themeTitle"
      >Тема обсуждения: {{item.theme}}</h3>
    </v-card-title>
    <v-card-text>
       <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Роль пользователя</th>
            <th class="text-left">Текст</th>
            <th class="text-left">Файл</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(element, index) in item.Qlist" :key="index">
            <td>{{ element.role }}</td>
            <td>{{ element.text }}</td>
            <td>
              <button v-if="element.file" @click="saveFile(element.file)">save</button>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
export default {
  props: ['historyOfMessages'],
  components: {

  },
  methods: {
    chooseThisTheme(theme) {
      this.$emit('changeTheme', theme);
    },
    saveFile(file) {
      const ext = file;
      const link = document.createElement('a');
      link.setAttribute('href', file);
      link.setAttribute('download', `*.${ext}`);
      link.click();
    },
  },
  computed: {
    test() {
      return this.historyOfMessages;
    },
  },
};
</script>

<style scoped>
  .question{
    min-width: 320px;
    width: 100%;
  }
  .themeTitle{
    cursor: pointer;
  }
</style>
