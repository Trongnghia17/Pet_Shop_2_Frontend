<template>
  <v-container class="login-container" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card outlined>
          <v-card-title class="headline text-center">Đăng nhập</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login" ref="form">
              <v-text-field
                  v-model="email"
                  label="Email"
                  type="email"
                  required
                  outlined
              ></v-text-field>
              <v-text-field
                  v-model="password"
                  label="Mật khẩu"
                  type="password"
                  required
                  outlined
              ></v-text-field>
              <v-btn type="submit" color="primary" block>Đăng nhập</v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link to="/register">
              <v-btn text>Chưa có tài khoản? Đăng ký</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      console.log(`Email: ${this.email}, Password: ${this.password}`);
      alert('Đăng nhập thành công!');
    },
  },
};
</script>

<style>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
}
</style>
