<template>
  <div class="auth-container">
    <div class="auth-form">
      <h2>Đăng Nhập</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label>Email:</label>
          <input type="email" v-model="formData.email" required />
        </div>

        <div>
          <label>Mật khẩu:</label>
          <input type="password" v-model="formData.password" required />
        </div>

        <button type="submit">Đăng Nhập</button>
      </form>

      <p>
        Chưa có tài khoản?
        <router-link to="/register">Đăng Ký</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import apiConfig from '@/apiConfig';

export default {
  name: 'LoginPage',
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await apiConfig.login({
          email: this.formData.email,
          password: this.formData.password,
        });
        console.log('Đăng nhập thành công:', response.data);
        alert('Đăng nhập thành công!');
        localStorage.setItem('token', response.data.token); // Lưu token nếu API trả về
        this.$router.push('/dashboard'); // Điều hướng đến dashboard sau khi đăng nhập
      } catch (error) {
        console.error('Lỗi khi đăng nhập:', error.response?.data || error.message);
        alert('Đăng nhập thất bại, vui lòng thử lại!');
      }
    },
  },
};
</script>

<style scoped>
/* Tái sử dụng CSS từ ví dụ trước */
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}
.auth-form h2 {
  margin-bottom: 20px;
}
.auth-form label {
  display: block;
  margin: 10px 0 5px;
}
.auth-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.auth-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.auth-form button:hover {
  background-color: #0056b3;
}
.auth-form p {
  margin-top: 15px;
}
.auth-form a {
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
}
</style>
