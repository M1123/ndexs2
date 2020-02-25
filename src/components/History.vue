//компонент выводящий историю сообщений
<template>
<div>
 <div v-if="this.historyOfMessages !== null" class="display-1">Вопросы и ответы</div>
  <v-card
    v-for="(item, index) in this.historyOfMessages"
    :key="index"
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
              <button v-if="element.file" @click="saveFile(element.file)">
                <v-icon>mdi-download</v-icon>
              </button>
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
      const ext = file.match('/(.*?);')[1];
      const link = document.createElement('a');
      link.setAttribute('href', file);
      link.setAttribute('download', `Вложение.${ext}`);
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
  .display-1{
    margin: auto;
    text-align: center;
  }
  .question{
    border: #ddd;
    margin: 20px;
    min-width: 320px;
    width: 90%;
  }
  .themeTitle{
    cursor: pointer;
    margin: 5px;
  }
  .themeTitle:hover{
    border: 1px solid #ddd;
    margin: 3px;
    zoom: 1.25;
  }
</style>
