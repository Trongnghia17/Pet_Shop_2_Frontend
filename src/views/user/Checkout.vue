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

      <!-- Phần tử Stripe Elements -->
      <v-container v-if="checkoutInfo.payment_mode === 'stripe'">
        <span>Thông tin thẻ</span>
        <div id="card-element" class="stripe-card-element"></div>
        <p v-if="stripeError" class="error-message">{{ stripeError }}</p>
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
import { loadStripe } from '@stripe/stripe-js';
import apiConfigCheckout from '../../store/checkout';

export default {
  name: 'CheckoutPage',
  data() {
    return {
      stripe: null, // Stripe instance
      elements: null, // Stripe Elements instance
      cardElement: null, // Stripe card element
      stripeError: null, // Error from Stripe

      checkoutInfo: {
        address: '',
        payment_mode: 'cod',
        amount: this.$route.query.amount || 0,
      },

      paymentModes: [
        { text: 'Thanh toán khi nhận hàng', value: 'cod' },
        { text: 'Thẻ ngân hàng', value: 'stripe' },
      ],
    };
  },
  async mounted() {
    try {
      // Load Stripe instance
      this.stripe = await loadStripe('pk_test_51QSIce04G9pDHJKpuQjhstz1mBkR7l9hxZgrzSauIkIk7ZgtfEOMbJ35mLu8WMNGMElFhe3p7GQh4qMFnT0NmFRu00ypc83FB8');
      this.elements = this.stripe.elements();

      // Watch for payment mode changes
      this.$watch(
          () => this.checkoutInfo.payment_mode,
          (newMode) => {
            if (newMode === 'stripe') {
              this.$nextTick(() => {
                const cardElementContainer = document.querySelector('#card-element');
                if (cardElementContainer && !this.cardElement) {
                  this.cardElement = this.elements.create('card');
                  this.cardElement.mount('#card-element');
                }
              });
            } else if (this.cardElement) {
              this.cardElement.unmount();
              this.cardElement = null;
            }
          }
      );
    } catch (error) {
      console.error('Error initializing Stripe:', error);
    }
  },
  methods: {
    async submitCheckout() {
      if (!this.checkoutInfo.address) {
        this.$toast.warning('Vui lòng nhập địa chỉ giao hàng');
        return;
      }

      if (this.checkoutInfo.payment_mode === 'stripe') {
        try {
          // Create a Stripe token
          const { token, error } = await this.stripe.createToken(this.cardElement);
          if (error) {
            this.stripeError = error.message;
            return;
          }
          this.checkoutInfo.stripeToken = token.id;
        } catch (error) {
          console.error('Error creating Stripe token:', error);
          this.$toast.error('Đã xảy ra lỗi khi tạo token. Vui lòng thử lại.');
          return;
        }
      }

      // Process the checkout
      apiConfigCheckout
          .checkout(this.checkoutInfo)
          .then((response) => {
            if (response.status === 200) {
              this.$toast.success('Thanh toán thành công');
              this.$router.push({ path: '/home' });
            } else {
              this.$toast.warning('Thanh toán thất bại');
            }
          })
          .catch((error) => {
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

.stripe-card-element {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: -10px;
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
</style>
