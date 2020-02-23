<template>
  <div>
    <v-btn @click="logout">Logout</v-btn>
    <v-card class="mx-auto mt-5 question">
      <v-card-title>
        <h1 v-if="this.user === 'student'" class="display-1">Написать препадователю</h1>
        <h1 v-if="this.user === 'teacher'" class="display-1">Написать студенту</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Тема вопроса"
            v-model="themeOfQuestion"
            :rules="nameRules"
          />
          <v-textarea
            label="Текст сообщения"
            v-model="textOfQuestion"
            :rules="nameRules"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions >
        <v-file-input
          v-if="this.user === 'student'"
          :rules="rules"
          accept=".pdf, image/*"
          label="Select File..."
          show-size
          v-model="fileOfQuestion"
        ></v-file-input>
        <v-spacer/>
        <v-btn @click="send" color="info">Send</v-btn>
      </v-card-actions>
    </v-card>
    <v-spacer></v-spacer>
    <History
      @changeTheme="changeTheme"
      :historyOfMessages="historyOfMessages"
    />
  </div>
</template>

<script>
import History from '@/components/History.vue';

export default {
  components: {
    History,
  },
  data: () => ({
    rules: [
      (v) => !v || v.size <= 102400 || 'Размер файла должен быть не более 100 KB!',
    ],
    nameRules: [
      (v) => !!v || 'Поле обязательно для ввода',
    ],
    textOfQuestion: null,
    themeOfQuestion: null,
    fileOfQuestion: null,
    historyOfMessages: null,
    user: null,
  }),
  created() {
    this.user = localStorage.getItem('logedUser');
    const dataFromLocalStorage = localStorage.getItem('historyOfMessages');
    if (dataFromLocalStorage === null) {
      this.historyOfMessages = []; // { theme: null, Qlist: [{ text: null, file: null }] }
      localStorage.setItem('historyOfMessages', '[]'); // { "theme": "null", "Qlist": [{ "text": "null", "file": "null" }] }
    } else {
      this.historyOfMessages = JSON.parse(dataFromLocalStorage);
    }
  },

  methods: {
    changeTheme(value) {
      this.themeOfQuestion = value;
    },
    logout() {
      localStorage.removeItem('logedUser');
      this.$router.replace('/login');
    },
    send() {
      const tempArray = JSON.parse(JSON.stringify(this.historyOfMessages));
      let match = null;
      this.historyOfMessages.forEach((item, i) => {
        if (item.theme === this.themeOfQuestion) {
          match = i;
        }
      });
      if (match !== null) {
        let Qitem = {
          role: this.user,
          text: this.textOfQuestion,
          file: this.fileOfQuestion,
        };
        tempArray[match].Qlist.push(Qitem);
        Qitem = {};
      } else {
        let question = {
          theme: this.themeOfQuestion,
          Qlist: [
            {
              role: this.user,
              text: this.textOfQuestion,
              file: this.fileOfQuestion,
            },
          ],
        };
        tempArray.push(question);
        question = {};
      }
      this.historyOfMessages = tempArray;

      console.log(this.historyOfMessages);

      localStorage.setItem('historyOfMessages', JSON.stringify(this.historyOfMessages));
    },
  },
};
</script>
<style scoped>
  .question{
    width: 50vw;
    min-width: 320px;
    margin: 50px;
  }
</style>
