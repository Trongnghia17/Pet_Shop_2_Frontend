<template>
  <div class="register-container">
    <div class="register-card">
      <div class="logo-section">
        <img src="../../assets/images/logo.png" alt="logo" class="logo">
      </div>
      <div class="form-section">
        <h1>ĐĂNG KÝ</h1>
        <v-form @submit.prevent="checkComfirmPassword">
          <div class="form-input">
            <label for="username">Tên:</label>
            <v-text-field
                class="input"
                outlined
                dense
                type="text"
                id="username"
                v-model="username"
                placeholder="Nhập tên của bạn"
                prepend-inner-icon="mdi-account-outline"
                required
            />
          </div>
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
                @click:append="togglePasswordVisibility('password')"
                class="input"
                required
            />
          </div>
          <div class="form-input">
            <label for="confirm-password">Nhập lại mật khẩu:</label>
            <v-text-field
                outlined
                dense
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirm-password"
                v-model="confirmPassword"
                placeholder="Nhập lại mật khẩu của bạn"
                prepend-inner-icon="mdi-lock-check-outline"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="togglePasswordVisibility('confirmPassword')"
                class="input"
                required
            />
          </div>
          <div class="register-actions">
            <v-btn type="submit" class="register-btn" elevation="2" x-large>
              <span>Đăng ký</span>
            </v-btn>
            <div class="login-prompt">
              Bạn đã có tài khoản? <router-link class="login-router" to="login">Đăng nhập ngay</router-link>
            </div>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import apiConfig from '@/apiConfig';
import { validateEmail } from '@/utils/validators';

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
      if(!this.email || !this.password) {
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
        if (response.data.status === 200){
          this.$toast.success('Đăng ký thành công!');
          this.$router.push('/login');
        } else if(response.data.status === 409){
          this.$toast.warning(response.data.message);
        } else {
          this.$toast.error('Đăng ký thất bại, vui lòng thử lại!');
        }
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f9fc;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
}

.register-card {
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

.register-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.register-btn {
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

.register-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 15px rgba(118, 75, 162, 0.3) !important;
}

.login-prompt {
  text-align: center;
  color: #666;
  font-size: 15px;
}

.login-router {
  text-decoration: none;
  color: #764ba2;
  font-weight: 600;
  transition: all 0.3s;
}

.login-router:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .register-card {
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
  .register-card {
    width: 100%;
  }

  .form-section {
    padding: 20px;
  }

  .register-btn {
    height: 45px !important;
  }
}
</style>