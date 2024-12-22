<template>
  <div class="checkout-container">
    <h2>Thông tin thanh toán</h2>
    <form @submit.prevent="submitCheckout">
      <div class="form-group">
        <label for="address">Địa chỉ giao hàng</label>
        <input type="text" id="address" v-model="checkoutInfo.address" required />
      </div>
      <div class="form-group">
        <label for="nameCard">Tên trên thẻ</label>
        <input type="text" id="nameCard" v-model="checkoutInfo.nameCard" />
      </div>
      <div class="form-group">
        <label for="cardNumber">Số thẻ</label>
        <input type="text" id="cardNumber" v-model="checkoutInfo.cardNumber" />
      </div>
      <div class="form-group">
        <label for="cvc">CVC</label>
        <input type="text" id="cvc" v-model="checkoutInfo.cvc" />
      </div>
      <div class="form-group">
        <label>Tháng/Năm hết hạn</label>
        <div class="expiration">
          <input type="text" placeholder="Tháng" v-model="checkoutInfo.month" />
          <input type="text" placeholder="Năm" v-model="checkoutInfo.year" />
        </div>
      </div>
      <div class="form-group">
        <label for="payment_mode">Hình thức thanh toán</label>
        <select id="payment_mode" v-model="checkoutInfo.payment_mode">
          <option value="cod">Thanh toán khi nhận hàng</option>
          <option value="card">Thẻ ngân hàng</option>
        </select>
      </div>
      <div class="form-group">
        <label for="amount">Tổng tiền</label>
        <input type="text" id="amount" :value="checkoutInfo.amount" readonly />
      </div>
      <button type="submit" class="btn btn-primary">Xác nhận thanh toán</button>
    </form>
  </div>
</template>

<script>
import apiConfigCheckout from "../../store/checkout";

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
    };
  },
  methods: {
    submitCheckout() {
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
    },
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
.expiration {
  display: flex;
  gap: 10px;
}
.btn-primary {
  background-color: #ffcc00;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
}
</style>
