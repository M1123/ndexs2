<template>
  <div>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">LogIn</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Username"
            prepend-icon="mdi-account-circle"
          />
          <v-text-field
            :type="showPassword?'text':'password'"
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword?'mdi-eye':'mdi-eye-off'"
            @click:append="showPassword=!showPassword"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info">LogIn</v-btn>
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
    // msg: [
    //   { id: 1, title: 'Тема вопроса1', text: 'q1 lorem20' },
    //   { id: 2, title: 'Тема вопроса2', text: 'q1 lorem20' },
    //   { id: 3, title: 'Тема вопроса3', text: 'q1 lorem20' },
    //   { id: 4, title: 'Тема вопроса4', text: 'q1 lorem20' },
    // ],
    showPassword: false,
  }),
};
</script>
