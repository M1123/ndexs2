<template>
  <div>
    <header class="header">
      <h1 v-if="this.user === 'student'" class="display-1">Личный кабинет студента</h1>
      <h1 v-if="this.user === 'teacher'" class="display-1">Личный кабинет преподавателя</h1>
      <v-spacer/>
      <v-btn @click="logout">Logout</v-btn>
    </header>
    <hr>
    <v-card class="mx-auto mt-5 question">
      <v-card-title>
        <h1 v-if="this.user === 'student'" class="display-1">Написать преподавателю</h1>
        <h1 v-if="this.user === 'teacher'" class="display-1">Написать студенту</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="mainForm" v-model="valid">
          <v-select
            v-if="this.user === 'teacher'"
            :items="themes"
            v-model="themeOfQuestion"
            outlined
            :rules="nameRules"
          ></v-select>
          <v-text-field
            v-if="this.user === 'student'"
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
          :rules="fileRules"
          accept=".pdf, image/*"
          label="Select File..."
          show-size
          v-model="fileOfQuestion"
        ></v-file-input>
        <v-spacer/>
        <v-btn @click="validate" type="submit" color="info">Send</v-btn>
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
    fileRules: [
      (v) => !v || v.size <= 102400 || 'Размер файла должен быть не более 100 KB!',
    ],
    nameRules: [
      (v) => !!v || 'Поле обязательно для ввода',
    ],
    themes: [],
    valid: true,
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
      this.historyOfMessages = [];
      localStorage.setItem('historyOfMessages', '[]');
    } else {
      this.historyOfMessages = JSON.parse(dataFromLocalStorage);
    }
    this.historyOfMessages.forEach((item) => {
      this.themes.push(item.theme);
    });
  },

  methods: {
    logout() {
      localStorage.removeItem('logedUser');
      this.$router.replace('/');
    },
    changeTheme(value) {
      this.themeOfQuestion = value;
    },
    validate() {
      if (this.$refs.mainForm.validate()) {
        this.send();
      }
    },
    reset() {
      this.fileOfQuestion = null;
      this.themeOfQuestion = null;
      this.textOfQuestion = null;
      this.$refs.mainForm.resetValidation();
      localStorage.removeItem('tempFile');
    },
    send() {
      const tempArray = JSON.parse(JSON.stringify(this.historyOfMessages));
      let match = null;
      localStorage.setItem('tempTheme', this.themeOfQuestion);
      this.historyOfMessages.forEach((item, i) => {
        if (item.theme === this.themeOfQuestion) {
          match = i;
        }
      });

      const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

      async function Main(file) {
        const result = await toBase64(file);
        localStorage.setItem('tempFile', result);
        return result;
      }

      if (this.fileOfQuestion) {
        Main(this.fileOfQuestion);
        let m = 0;
        this.historyOfMessages = JSON.parse(localStorage.getItem('historyOfMessages'));
        this.themeOfQuestion = localStorage.getItem('tempTheme');
        this.fileOfQuestion = localStorage.getItem('tempFile');
        const hm = this.historyOfMessages;
        hm.forEach((item, i) => {
          if (item.theme === this.themeOfQuestion) {
            m = i;
            console.log('m: ', m);
          }
        });
        hm[m].Qlist[hm.Qlist.length - 1].file = localStorage.getItem('tempFile');
        localStorage.setItem('historyOfMessages', JSON.stringify(hm));
        localStorage.removeItem('tempFile');
      }
      this.write(match, tempArray);
    },
    write(index, tempArray) {
      if (index !== null) { // повторные сообщения в этой теме
        let Qitem = {
          role: this.user,
          text: this.textOfQuestion,
          file: this.fileOfQuestion,
        };
        tempArray[index].Qlist.push(Qitem);
        Qitem = {};
      } else { // если еще нет сообщений с такой темой
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
      this.reset();
      localStorage.setItem('historyOfMessages', JSON.stringify(this.historyOfMessages));
    },
  },
};
</script>
<style scoped>
  .header{
    display: flex;
  }
  .question{
    width: 50vw;
    min-width: 320px;
    margin: 50px;
  }
</style>
