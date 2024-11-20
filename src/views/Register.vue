<template>
  <div class="register-page">
    <img src="../assets/logo.png"  alt="logo" class="logo">
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
        this.$toast.warning('Mật khẩu và xác nhận mật khẩu không khớp!');
        return;
      }
      if (this.password.length < 8 || this.confirmPassword.length < 8) {
        this.$toast.warning('Mật khẩu và xác nhận mật khẩu phải có ít nhất 8 ký tự!');
        return;
      }
      try {
        const response = await apiConfig.register({
          name: this.username,
          email: this.email,
          password: this.password,
        });
        console.log('Đăng ký thành công:', response.data);
        this.$toast.success('Đăng ký thành công!');
        this.$router.push('/login');
      } catch (error) {
        this.$toast.error('Đăng ký thất bại, vui lòng thử lại!');
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

.register-form {
  min-width: 40vw;
}

.register-form h1 {
  margin: 20px;
  text-align: center;
  color:#ED1D22;
}

.button {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-input .input {
  margin-top: 10px;
  border-radius: 12px;
}

.login-router {
  text-decoration: none;
  color: #ED1D22;
}

.login-router:hover {
  font-weight: bold;
  color: #ED1D22;
}

.button .register-btn {
  width: 50%;
  margin-bottom: 20px;
  background: linear-gradient(45deg, #ff0044, #ff7070);
}
.button .register-btn:hover{
  background: linear-gradient(45deg,  #ed2775, #fb6452);
  color: white;
}

</style>
