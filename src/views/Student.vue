<template>
  <div>
    <v-btn @click="logout">Logout</v-btn>
    <v-card class="mx-auto mt-5 question">
      <v-card-title>
        <h1 class="display-1">Вопрос преподавателю</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Тема вопроса"
            v-model="themeOfQuestion"
          />
          <v-textarea
            label="Текст вопроса"
            v-model="textOfQuestion"
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
          v-model="fileOfQuestion"
        ></v-file-input>
        <v-spacer/>
        <v-btn @click="send" color="info">Send</v-btn>
      </v-card-actions>
    </v-card>
    <v-spacer></v-spacer>
    <History
      type="Student"
    />
  </div>
</template>

<script>
import History from '@/components/History.vue';

export default {
  name: 'App',
  components: {
    History,
  },
  data: () => ({
    rules: [
      (value) => !value || value.size <= 102400 || 'Размер файла должен быть не более 100 KB!',
    ],
    textOfQuestion: null,
    themeOfQuestion: null,
    fileOfQuestion: null,
  }),
  methods: {
    logout() {
      this.$router.replace('/login');
    },
    send() {
      localStorage.setItem('items', [JSON.stringify(this.fileOfQuestion)].toString());
      // console.log(JSON.stringify(this.fileOfQuestion));
      const rhinoStorage = localStorage.getItem('rhino');
      const rhino = this.fileOfQuestion;
      console.log('fileOfQuestion-', typeof (fileOfQuestion));
      if (rhinoStorage) {
        // Reuse existing Data URL from localStorage
        rhino.setAttribute('src', rhinoStorage);
      } else {
        // Create XHR, Blob and FileReader objects
        const xhr = new XMLHttpRequest();
        let blob;
        const fileReader = new FileReader();

        xhr.open('GET', 'rhino.png', true);
        xhr.responseType = 'arraybuffer';

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            // Create a blob from the response
            blob = new Blob([xhr.response], { type: 'image/png' });

            // onload needed since Google Chrome doesn't support addEventListener for FileReader
            fileReader.onload = function (evt) {
              // Read out file contents as a Data URL
              const { result } = evt.target;
              // Set image src to Data URL
              rhino.setAttribute('src', result);
              // Store Data URL in localStorage
              try {
                localStorage.setItem('rhino', result);
              } catch (e) {
                console.log(`Storage failed: ${e}`);
              }
            };
            // Load blob as Data URL
            fileReader.readAsDataURL(blob);
          }
        }, false);
        // Send XHR
        xhr.send();
      }
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
