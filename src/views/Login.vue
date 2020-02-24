<template>
  <div>
    <v-card width="400" class="mx-auto mt-5" @submit.prevent="onSubmit">
      <v-card-title>
        <h1 class="display-1">LogIn</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="userName"
            label="Username"
            prepend-icon="mdi-account-circle"
            :rules="nameRules"
          />
          <v-text-field
            :type="showPassword?'text':'password'"
            label="Password"
            v-model="password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword?'mdi-eye':'mdi-eye-off'"
            @click:append="showPassword=!showPassword"
            :rules="nameRules"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-card-text class="loginWarning">{{loginWarning}}</v-card-text>
        <v-spacer></v-spacer>
        <v-btn @click="validate" type="submit" color="info">LogIn</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    showPassword: false,
    valid: true,
    userName: null,
    password: null,
    loginWarning: null,
    nameRules: [
      (v) => !!v || 'Поле обязательно для ввода',
    ],
  }),
  mounted() {
    if (!window.localStorage.getItem('data')) {
      localStorage.setItem('data', JSON.stringify({ teacher: 'tdemo', student: 'sdemo' }));
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const usersData = JSON.parse(localStorage.getItem('data'));
        if (usersData[this.userName] === this.password) {
          localStorage.setItem('logedUser', this.userName);
          this.$router.push('/user');
          this.$emit('auth', true);
        } else {
          this.loginWarning = 'Неверный логин и/или пароль';
        }
      }
    },
  },
};
</script>
<style>
  .loginWarning{
    color: red;
  }
</style>
