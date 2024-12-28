<template>
  <v-container class="checkout-container">
    <h2>Thông tin thanh toán</h2>
    <v-form @submit.prevent="submitCheckout">
      <span>Địa chỉ giao hàng</span>
      <v-text-field
          v-model="checkoutInfo.address"
          required
          outlined
          dense
      ></v-text-field>
      <span>Hình thức thanh toán</span>
      <v-select
          v-model="checkoutInfo.payment_mode"
          :items="paymentModes"
          outlined
          dense
      ></v-select>
      <v-container v-if="checkoutInfo.payment_mode === 'card'">
        <span>Tên trên thẻ</span>
        <v-text-field
            v-model="checkoutInfo.nameCard"
            outlined
            dense
        ></v-text-field>
        <span>Số thẻ</span>
        <v-text-field
            v-model="checkoutInfo.cardNumber"
            outlined
            dense
        ></v-text-field>
        <span>CVC</span>
        <v-text-field
            v-model="checkoutInfo.cvc"
            outlined
            dense
        ></v-text-field>
        <v-row>
          <v-col>
            <span>Tháng</span>
            <v-text-field
                v-model="checkoutInfo.month"
                outlined
                dense
            ></v-text-field>
          </v-col>
          <v-col>
            <span>Năm</span>
            <v-text-field
                v-model="checkoutInfo.year"
                outlined
                dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <span>Tổng tiền</span>
      <v-text-field
          :value="checkoutInfo.amount"
          readonly
          outlined
          dense
      ></v-text-field>
      <v-btn type="submit" color="primary" class="custom-btn">Xác nhận thanh toán</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import apiConfigCheckout from '../../store/checkout';

export default {
  name: 'CheckoutPage',
  data() {
    return {
      checkoutInfo: {
        address: '',
        nameCard: '',
        cardNumber: '',
        cvc: '',
        month: '',
        year: '',
        amount: this.$route.query.amount || 0,
        payment_mode: 'cod',
      },
      paymentModes: [
        { text: 'Thanh toán khi nhận hàng', value: 'cod' },
        { text: 'Thẻ ngân hàng', value: 'card' },
      ],
    };
  },
  methods: {
    submitCheckout() {
      if (!this.checkoutInfo.address) {
        this.$toast.warning('Vui lòng nhập địa chỉ giao hàng');
        return;
      }
      apiConfigCheckout.checkout(this.checkoutInfo)
          .then(response => {
            if (response.status === 200) {
              this.$toast.success('Thanh toán thành công');
              this.$router.push({ path: '/home' });
            } else {
              this.$toast.warning('Thanh toán thất bại');
            }
          })
          .catch(error => {
            console.error('Error during checkout:', error);
            this.$toast.error('Đã xảy ra lỗi, vui lòng thử lại');
          });
    }
  },
};
</script>

<style scoped>
.checkout-container {
  width: 500px;
  margin: 50px auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
.form-group input, .form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.custom-btn {
  background-color: #ff6f61 !important;
  color: white !important;
  padding: 14px 18px !important;
  border: none !important;
  border-radius: 8px !important;
  font-size: 1.2rem !important;
  font-weight: bold !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
}

.custom-btn:hover {
  background-color: #e65a50 !important;
  transform: translateY(-2px) !important;
}

.custom-btn:active {
  background-color: #d95448 !important;
  transform: translateY(0) !important;
}
</style>