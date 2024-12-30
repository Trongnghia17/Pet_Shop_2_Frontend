<template>
  <div class="two-factor-auth">
    <div v-if="qrImage" class="form-input">
      <label for="2fa-code">Mã xác thực 2FA:</label>
      <v-text-field class="input" outlined type="text" id="2fa-code" v-model="twoFactorCode" required />
      <img :src="qrImage" alt="QR Code" class="qr-code" />
    </div>
    <div class="button">
      <v-btn @click="verifyTwoFactorCode" class="verify-btn">Xác thực</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TwoFactorAuth',
  props: {
    qrImage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      twoFactorCode: '',
    };
  },
  methods: {
    verifyTwoFactorCode() {
      if (this.twoFactorCode) {
        this.$emit('verify', this.twoFactorCode);
      } else {
        this.$toast.error('Vui lòng nhập mã xác thực 2FA!');
      }
    },
  },
};
</script>

<style scoped>
.two-factor-auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white; /* Add background color */
  padding: 20px; /* Add padding */
  border-radius: 12px; /* Add border radius */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add box shadow */
}

.form-input .input {
  margin-top: 10px;
  border-radius: 12px;
}

.qr-code {
  margin-top: 20px;
  max-width: 100%;
  height: auto;
}

.button {
  width: 100%;
  display: flex;
  justify-content: center;
}

.button .verify-btn {
  width: 70%;
  margin-top: 20px;
  background: linear-gradient(45deg, #ff0044, #ff7070);
  border-radius: 8px;
}

.button .verify-btn:hover {
  background: linear-gradient(45deg, #ed2775, #fb6452);
  color: white;
}
</style>