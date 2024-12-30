<template>
  <div class="login-page">
    <img src="../../assets/images/logo.png" alt="logo" class="logo">
    <div class="login-form">
      <h1>ĐĂNG NHẬP</h1>
      <v-form @submit.prevent="handleLogin">
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
              @click:append="togglePasswordVisibility"
              class="input"
              required />
        </div>
        <div class="button">
          <v-btn type="submit" class="login-btn">Đăng nhập</v-btn>
          <div>
            Bạn chưa có tài khoản ? <router-link class="register-router" to="register">Đăng ký ngay</router-link>
          </div>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import apiConfig from '@/apiConfig';
import Cookies from 'js-cookie';
import { validateEmail } from '@/utils/validators';
import { validatePassword } from '@/utils/validators';


export default {
  name: 'LoginPage',
  data() {
    return {
        email: '',
        password: '',
        showPassword: false,
    };
  },
  methods: {
    async handleLogin() {
      if (!this.email || !this.password) {
        this.$toast.error('Vui lòng nhập đầy đủ thông tin!');
        return;
      }

      if (!validateEmail(this.email)) {
        this.$toast.error('Email không đúng định dạng!');
        return;
      }
      if (!validatePassword(this.password)) {
        this.$toast.error('Mật khẩu phải có ít nhất 6 ký tự, chứa ít nhất 1 chữ viết hoa và 1 ký tự đặc biệt!');
        return;
      }

      try {
        const data = {
          email: this.email,
          password: this.password,
        };
        const response = await apiConfig.login(data);
        if (response.data.status === 200) {
          Cookies.set('token', response.data.token, { expires: 365 });
          Cookies.set('auth_name', response.data.username, { expires: 365 });
          if (response.data.role === 'admin') {
            this.$toast.success('Đăng nhập dưới quyền quản trị viên!');
            this.$router.push('/admin/dashboard');
          } else {
            this.$toast.success('Đăng nhập thành công!');
            this.$router.push('/home');
          }
        } else if (response.data.status === 401) {
          this.$toast.warning(response.data.message);
        } else {
          this.$toast.error('Đăng nhập thất bại, vui lòng thử lại!');
        }
      } catch (error) {
        console.error('Lỗi khi đăng nhập:', error.response?.data || error.message);
        this.$toast.error('Đăng nhập thất bại, vui lòng thử lại!');
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

  },
};
</script>

<style scoped>
.login-page {
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
  min-height: 95vh;
}
.logo {
  max-width: 30vw;
  height: auto;
}
.login-form {
  min-width: 40vw;
}
.login-form h1 {
  margin: 20px;
  text-align: center;
  color:#ED1D22;
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
.register-router{
  text-decoration: none;
  color: #ED1D22;
}
.register-router:hover{
  font-weight: bold;
  color: #ED1D22;
}
.button .login-btn{
  width: 50%;
  margin-bottom: 20px;
  background: linear-gradient(45deg, #ff0044, #ff7070);
}
.button .login-btn:hover{
  background: linear-gradient(45deg,  #ed2775, #fb6452);
  color: white;
}

</style>
