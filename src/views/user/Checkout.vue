<template>
  <v-container class="checkout-container my-8">
    <div class="checkout-header">
      <h1 class="text-h4 font-weight-bold mb-2">Thông tin thanh toán</h1>
      <div class="checkout-divider"></div>
    </div>

    <v-form @submit.prevent="submitCheckout" class="checkout-form">
      <div class="checkout-section">
        <h3 class="section-title">
          <v-icon class="mr-2">mdi-map-marker</v-icon>
          Địa chỉ giao hàng
        </h3>
        <v-text-field
            v-model="checkoutInfo.address"
            required
            outlined
            placeholder="Nhập địa chỉ giao hàng của bạn"
            class="address-field"
            hide-details="auto"
        ></v-text-field>
      </div>

      <div class="checkout-section">
        <h3 class="section-title">
          <v-icon class="mr-2">mdi-cash-multiple</v-icon>
          Hình thức thanh toán
        </h3>
        <v-select
            v-model="checkoutInfo.payment_mode"
            :items="paymentModes"
            outlined
            hide-details="auto"
        ></v-select>
      </div>

      <div v-if="checkoutInfo.payment_mode === 'stripe'" class="checkout-section card-section">
        <h3 class="section-title">
          <v-icon class="mr-2">mdi-credit-card</v-icon>
          Thông tin thẻ
        </h3>
        <div id="card-element" class="stripe-card-element"></div>
        <p v-if="stripeError" class="error-message">{{ stripeError }}</p>
      </div>

      <div class="checkout-section total-section">
        <h3 class="section-title">
          <v-icon class="mr-2">mdi-currency-usd</v-icon>
          Tổng tiền
        </h3>
        <v-text-field
            :value="`${Number(checkoutInfo.amount).toLocaleString('vi-VN')} đ`"
            readonly
            outlined
            class="total-field"
            hide-details="auto"
        ></v-text-field>
      </div>

      <div class="checkout-actions">
        <v-btn to="/shopping-cart" text class="return-btn">
          <v-icon left>mdi-arrow-left</v-icon>
          Quay lại giỏ hàng
        </v-btn>
        <v-btn
            type="submit"
            color="primary"
            class="checkout-btn"
            elevation="2"
            :loading="isSubmitting"
        >
          <v-icon left>mdi-check-circle</v-icon>
          Xác nhận thanh toán
        </v-btn>
      </div>
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
      stripe: null,
      elements: null,
      cardElement: null,
      stripeError: null,
      isSubmitting: false,

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
      this.stripe = await loadStripe('pk_test_51QSIce04G9pDHJKpuQjhstz1mBkR7l9hxZgrzSauIkIk7ZgtfEOMbJ35mLu8WMNGMElFhe3p7GQh4qMFnT0NmFRu00ypc83FB8');
      this.elements = this.stripe.elements();

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

      this.isSubmitting = true;

      if (this.checkoutInfo.payment_mode === 'stripe') {
        try {
          const {token, error} = await this.stripe.createToken(this.cardElement);
          if (error) {
            this.stripeError = error.message;
            this.isSubmitting = false;
            return;
          }
          this.checkoutInfo.stripeToken = token.id;
        } catch (error) {
          console.error('Error creating Stripe token:', error);
          this.$toast.error('Đã xảy ra lỗi khi tạo token. Vui lòng thử lại.');
          this.isSubmitting = false;
          return;
        }
      }

      apiConfigCheckout
          .checkout(this.checkoutInfo)
          .then((response) => {
            if (response.status === 200) {
              this.$toast.success('Thanh toán thành công');
              this.$router.push({path: '/home'});
            } else {
              this.$toast.warning('Thanh toán thất bại');
            }
          })
          .catch((error) => {
            console.error('Error during checkout:', error);
            this.$toast.error('Đã xảy ra lỗi, vui lòng thử lại');
          })
          .finally(() => {
            this.isSubmitting = false;
          });
    },
  },
};
</script>

<style scoped>
.checkout-container {
  max-width: 700px;
  margin: 50px auto;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.checkout-header {
  margin-bottom: 30px;
  text-align: center;
}

.checkout-divider {
  height: 3px;
  width: 80px;
  background: linear-gradient(to right, #764ba2, #667eea);
  margin: 0 auto;
}

.checkout-section {
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 12px;
  font-weight: 600;
}

.stripe-card-element {
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
  transition: all 0.2s ease;
}

.stripe-card-element:focus-within {
  border-color: #764ba2;
  box-shadow: 0 0 0 1px rgba(118, 75, 162, 0.2);
}

.error-message {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 8px;
  padding: 8px;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 4px;
}

.total-section {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  border: none;
}

.checkout-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}

.return-btn {
  color: #666;
}

.checkout-btn {
  background: linear-gradient(to right, #764ba2, #667eea) !important;
  padding: 12px 24px !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  border-radius: 8px !important;
  text-transform: none !important;
  font-size: 1rem !important;
  transition: all 0.3s ease !important;
}

.checkout-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 15px rgba(102, 126, 234, 0.25) !important;
}

/* Responsive styles */
@media (max-width: 600px) {
  .checkout-container {
    padding: 20px;
    margin: 30px auto;
  }

  .checkout-actions {
    flex-direction: column;
    gap: 15px;
  }

  .checkout-btn {
    width: 100%;
  }

  .return-btn {
    width: 100%;
  }
}
</style>