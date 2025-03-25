<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo-section">
        <img src="../../assets/images/logo.png" alt="logo" class="logo">
      </div>
      <div class="form-section">
        <h1>ĐĂNG NHẬP</h1>
        <v-form @submit.prevent="handleLogin">
          <div class="form-input">
            <label for="email">Email:</label>
            <v-text-field
                class="input"
                outlined
                dense
                type="text"
                id="email"
                v-model="email"
                placeholder="Nhập email của bạn"
                prepend-inner-icon="mdi-email-outline"
                required
            />
          </div>
          <div class="form-input">
            <label for="password">Mật khẩu:</label>
            <v-text-field
                outlined
                dense
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                placeholder="Nhập mật khẩu của bạn"
                prepend-inner-icon="mdi-lock-outline"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="togglePasswordVisibility"
                class="input"
                required
            />
          </div>
          <div class="forgot-password">
            <a href="#">Quên mật khẩu?</a>
          </div>
          <div class="login-actions">
            <v-btn type="submit" class="login-btn" elevation="2" x-large>
              <span>Đăng nhập</span>
            </v-btn>
            <div class="register-prompt">
              Bạn chưa có tài khoản? <router-link class="register-router" to="register">Đăng ký ngay</router-link>
            </div>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import apiConfig from '@/apiConfig';
import Cookies from 'js-cookie';
import { validateEmail } from '@/utils/validators';

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
      if (this.password.length < 8) {
        this.$toast.error('Mật khẩu phải có ít nhất 8 ký tự!');
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f9fc;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
}

.login-card {
  display: flex;
  max-width: 900px;
  width: 90%;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.logo-section {
  flex: 0 0 45%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e5e9f2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.logo {
  max-width: 80%;
  height: auto;
}

.form-section {
  flex: 0 0 55%;
  padding: 40px;
}

.form-section h1 {
  margin-bottom: 30px;
  text-align: center;
  color: #764ba2;
  font-weight: 700;
  font-size: 28px;
}

.form-input {
  margin-bottom: 20px;
}

.form-input label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
}

.input {
  border-radius: 8px;
}

.forgot-password {
  text-align: right;
  margin-bottom: 25px;
}

.forgot-password a {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.forgot-password a:hover {
  color: #764ba2;
}

.login-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-btn {
  width: 100%;
  margin-bottom: 25px;
  background: linear-gradient(90deg, #667eea, #764ba2) !important;
  color: white !important;
  font-weight: 600;
  height: 48px !important;
  border-radius: 8px !important;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: transform 0.3s !important;
}

.login-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 15px rgba(118, 75, 162, 0.3) !important;
}

.register-prompt {
  text-align: center;
  color: #666;
  font-size: 15px;
}

.register-router {
  text-decoration: none;
  color: #764ba2;
  font-weight: 600;
  transition: all 0.3s;
}

.register-router:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-card {
    flex-direction: column;
    width: 95%;
  }

  .logo-section, .form-section {
    flex: 1;
    width: 100%;
    padding: 30px;
  }

  .logo-section {
    padding: 25px;
  }

  .logo {
    max-width: 180px;
  }

  .form-section h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
}

@media (max-width: 480px) {
  .login-card {
    width: 100%;
  }

  .form-section {
    padding: 20px;
  }

  .login-btn {
    height: 45px !important;
  }
}
</style>