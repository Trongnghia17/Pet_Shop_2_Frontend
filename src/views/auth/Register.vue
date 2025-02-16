<template>
  <div class="register-page">
    <img src="../../assets/images/logo.png" alt="logo" class="logo">
    <div class="register-form">
      <h1>ĐĂNG KÝ</h1>
      <v-form @submit.prevent="checkComfirmPassword">
        <div class="form-input">
          <label for="username">Tên:</label>
          <v-text-field class="input" outlined type="text" id="username" v-model="username" required />
        </div>
        <div class="form-input">
          <label for="email">Email:</label>
          <v-text-field class="input" outlined type="text" id="email" v-model="email" required />
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
      <v-dialog v-model="showTwoFactorAuth" max-width="500px" >
        <TwoFactorAuth :qrImage="qrImage" @verify="registerUser" />
      </v-dialog>
    </div>
  </div>
</template>

<script>
import apiConfig from '@/apiConfig';
import { validateEmail } from '@/utils/validators';
import QRCode from 'qrcode';
import TwoFactorAuth from '@/components/TwoFactorAuth.vue';
import { validatePassword } from '@/utils/validators';

export default {
  name: 'RegisterPage',
  components: {
    TwoFactorAuth,
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      showConfirmPassword: false,
      showPassword: false,
      qrImage: null,
      showTwoFactorAuth: false,
    };
  },
  methods: {
    async checkComfirmPassword() {
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
      if (this.password !== this.confirmPassword) {
        this.$toast.warning('Mật khẩu và xác nhận mật khẩu không khớp!');
        return;
      }
      try {
        const response = await apiConfig.getQrCode({
          name: this.username,
          email: this.email,
          password: this.password,
        });
        if (response.data.status === 200) {
          const otpauthUrl = response.data.qr_image;
          this.qrImage = await QRCode.toDataURL(otpauthUrl);
          this.qrImageSecret = response.data.google2fa_secret; // Store the secret
          this.showTwoFactorAuth = true;
          this.$toast.success('Vui lòng quét mã QR và nhập mã xác thực 2FA!');
        } else if (response.data.status === 409) {
          this.$toast.warning(response.data.message);
        } else {
          this.$toast.error('Đăng ký thất bại, vui lòng thử lại!');
        }
      } catch (error) {
        this.$toast.error('Đăng ký thất bại, vui lòng thử lại!');
      }
    },
    async registerUser(twoFactorCode) {
      try {
        const response = await apiConfig.register({
          name: this.username,
          email: this.email,
          password: this.password,
          google2fa_code: twoFactorCode,
          google2fa_secret: this.qrImageSecret, // Include the google2fa_secret
        });
        if (response.data.status === 200) {
          this.$toast.success('Đăng ký thành công!');
          this.$router.push('/login');
        } else {
          this.$toast.error('Mã xác thực 2FA không hợp lệ!');
        }
      } catch (error) {
        this.$toast.error('Xác thực 2FA thất bại, vui lòng thử lại!');
      }
    },
    togglePasswordVisibility(field) {
      if (field === 'password') {
        this.showPassword = !this.showPassword;
      } else if (field === 'confirmPassword') {
        this.showConfirmPassword = !this.showConfirmPassword;
      }
    },
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
  color: #ED1D22;
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

.button .register-btn:hover {
  background: linear-gradient(45deg, #ed2775, #fb6452);
  color: white;
}

.qr-code {
  margin-top: 20px;
  max-width: 100%;
}
</style>