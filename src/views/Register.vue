<template>
  <div class="register-page">
    <img src="../assets/logo.jpg"  alt="logo" class="logo">
    <div class="register-form">
      <h1>ĐĂNG KÝ</h1>
      <v-form @submit.prevent="checkComfirmPassword">
        <div class="form-input">
          <label for="username">Tên:</label>
          <v-text-field class="input" outlined type="text" id="username" v-model="username"  required />
        </div>
        <div class="form-input">
          <label for="email">Email:</label>
          <v-text-field class="input" outlined type="text" id="email" v-model="email"  required />
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
            Bạn đã có tài khoản ? <router-link class="login-router" to="login">Đăng nhập ngay</router-link>
          </div>
        </div>
      </v-form>
    </div>
  </div>
</template>


<script>
import apiConfig from '@/apiConfig';

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
    async checkComfirmPassword() {
      if (this.password !== this.confirmPassword) {
        alert('Mật khẩu và xác nhận mật khẩu không khớp!');
        return;
      }
      try {
        const response = await apiConfig.register({
          username: this.username,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
        });
        console.log('Đăng ký thành công:', response.data);
        alert('Đăng ký thành công!');
        this.$router.push('/login');
      } catch (error) {
        console.error('Lỗi khi đăng ký:', error.response?.data || error.message);
        alert('Đăng ký thất bại, vui lòng thử lại!');
      }
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
  color: orange;
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
