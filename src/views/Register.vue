<template>
  <div class="register-page">
    <img src="../assets/logo.jpg"  alt="logo" class="logo">
    <div class="register-form">
      <h1>ĐĂNG KÝ</h1>
      <v-form @submit.prevent="checkComfirmPassword">
        <div class="form-input">
          <label for="email">Email:</label>
          <v-text-field class="input" outlined type="text" id="email" v-model="email"  required />
        </div>
        <div class="form-input">
          <label for="username">Tài khoản:</label>
          <v-text-field class="input" outlined type="text" id="username" v-model="username"  required />
        </div>
        <div class="form-input">
          <label for="password">Mật khẩu:</label>
          <v-text-field
              outlined
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="togglePasswordVisibility('password')"
              class="input"
              required />
        </div>
        <div class="form-input">
          <label for="confirm-password">Nhập lại mật khẩu:</label>
          <v-text-field
              outlined
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirm-password"
              v-model="confirmPassword"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="togglePasswordVisibility('confirmPassword')"
              class="input"
              required />
        </div>
        <div class="button">
          <v-btn type="submit" class="register-btn">Đăng ký</v-btn>
          <div>
            Bạn đã có tài khoản, <router-link class="login-router" to="login">Đăng nhập ngay</router-link>
          </div>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      showConfirmPassword: false,
      showPassword: false,
    };
  },
  methods: {
    checkComfirmPassword(){
      console.log(`Email: ${this.email},Username: ${this.username} , Password: ${this.password}, Confirm Password: ${this.confirmPassword}`)
      alert('Đăng ký thành công');
    },
    togglePasswordVisibility(field) {
      if (field === 'password') {
        this.showPassword = !this.showPassword
      } else if (field === 'confirmPassword') {
        this.showConfirmPassword = !this.showConfirmPassword
      }


    }
  },
};
</script>

<style scoped>
.register-page {
  border: 1px solid #ccc;
  box-shadow: 0 0  10px rgba(0, 0, 0, 0.1);
  margin: 20px 20px;
  padding: 20px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10%;
  border-radius: 12px;
}
.logo {
  max-width: 30%;
  height: auto;
}
.register-form {
  width: 40%;
}
.register-form h1 {
  margin: 20px;
  text-align: center;
  color:#FEA910;
}
.button{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-input .input{
  margin-top: 10px;
  border-radius: 12px;
}
.login-router{
  text-decoration: none;
  color: #000000;
}
.login-router:hover{
  font-weight: bold;
  color: orange;
}
.button .register-btn{
  width: 50%;
  margin-bottom: 20px;
  background: linear-gradient(to right, #FEA910, #FEA910, #FEA910);
}
.button .register-btn:hover{
  background: linear-gradient(45deg,  #f8c555, orange);
  color: white;
}

</style>
