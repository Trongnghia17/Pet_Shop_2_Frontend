<template>
  <div class="cart-container">
    <h2>GIỎ HÀNG CỦA BẠN <span>({{ cartItems.length }} sản phẩm)</span></h2>
    <table class="cart-table" v-if="cartItems.length">
      <thead>
      <tr>
        <th>Chọn</th>
        <th>Ảnh sản phẩm</th>
        <th>Tên sản phẩm</th>
        <th>Đơn giá</th>
        <th>Số lượng</th>
        <th>Thành tiền</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in cartItems" :key="item.id">
        <td>
          <input
              type="checkbox"
              v-model="item.is_selected"
              @change="updateCartQuantity(item)"
          />
        </td>
        <td>
          <img :src="`${baseURL}/${item.product.image}`" alt="Ảnh sản phẩm" style="width: 100px; height: 100px;" />
        </td>
        <td>
          {{ item.product.name }}
          <br/>
          <button class="remove-btn" @click="askForDeleteItem(item)">Xóa sản phẩm</button>
        </td>
        <td>{{ formatPrice(item.product.selling_price) }}đ</td>
        <td>
          <div class="quantity-control">
            <button @click="decreaseQuantity(item)">-</button>
            <input
                type="text"
                v-model="item.product_quantity"
                @input="updateCartQuantity(item)"
            />
            <button
                @click="increaseQuantity(item)"
            >+</button>
          </div>
        </td>
        <td>
          {{ formatPrice(item.product.selling_price * item.product_quantity) }}đ
        </td>
      </tr>
      </tbody>
    </table>
    <div class="cart-summary" v-if="cartItems.length">
      <p><strong>Tạm tính:</strong> {{ formatPrice(selectedTotalPrice) }}đ</p>
      <p><strong>Thành tiền:</strong> <span class="highlight">{{ formatPrice(selectedTotalPrice) }}đ</span></p>
    </div>
    <div class="cart-actions" v-if="cartItems.length">
      <button class="btn btn-secondary" @click="$router.push({ path: '/home' })">Tiếp tục mua hàng</button>
      <button class="btn btn-primary" @click="checkoutSelected">Thực hiện thanh toán</button>
    </div>
    <p v-else>Giỏ hàng của bạn đang trống.</p>
    <Delete
        :visible="openDelete"
        :message="message_noti"
        @confirm="confirmDelete"
        @cancel="cancelDelete"
    />
  </div>
</template>

<script>
import apiConfigCart from "../../store/cart";
import Delete from "../../components/cart/Delete.vue";
import axiosInstance from "../../axiosInstance";
import { formatPrice } from "../../utils/formatters";

export default {
  name: 'ShoppingCart',
  data() {
    return {
      cartItems: [],
      openDelete: false,
      id: null,
      message_noti: '',
      baseURL: axiosInstance.defaults.baseURL,
    };
  },
  components: {
    Delete,
  },
  computed: {
    selectedTotalPrice() {
      return this.cartItems
          .filter(item => item.is_selected)
          .reduce((total, item) => total + item.product.selling_price * item.product_quantity, 0);
    },
  },
  methods: {
    formatPrice,
    fetchCart() {
      apiConfigCart.getListCart()
          .then(response => {
            this.cartItems = response.data.cart;
          })
          .catch(error => {
            console.error('Error fetching cart data:', error);
          });
    },
    increaseQuantity(item) {
      item.product_quantity++;
      this.updateCartQuantity(item);
    },
    decreaseQuantity(item) {
      if (item.product_quantity > 1) {
        item.product_quantity--;
        this.updateCartQuantity(item);
      }
    },
    updateCartQuantity(item) {
      const data = {
        quantity: item.product_quantity,
        is_selected: item.is_selected
      };
      apiConfigCart.updateCart(item.id, data)
          .then(response => {
            if (response.status === 200) {
              // this.$toast.success('Cập nhật số lượng thành công');
            } else {
              this.$toast.warning('Cập nhật số lượng thất bại');
            }
          })
          .catch(error => {
            console.error('Error updating cart quantity:', error);
            this.$toast.error('Đã xảy ra lỗi, vui lòng thử lại');
          });
    },
    askForDeleteItem(item) {
      this.id = item.id;
      this.openDelete = true;
      this.message_noti = `Bạn có muốn hủy sản phẩm ${item.product.name} khỏi giỏ hàng không?`;
    },
    async confirmDelete() {
      try {
        const response = await apiConfigCart.deleteCart(this.id);
        if (response.status === 200) {
          this.$toast.success('Xóa thành công');
          this.fetchCart();
        } else {
          this.$toast.warning('Xóa thất bại');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        this.$toast.error('Đã xảy ra lỗi, vui lòng thử lại');
      } finally {
        this.openDelete = false;
      }
    },
    cancelDelete() {
      this.openDelete = false;
    },
    checkoutSelected() {
      const selectedItems = this.cartItems.filter(item => item.is_selected);
      if (selectedItems.length === 0) {
        this.$toast.warning('Vui lòng chọn ít nhất một sản phẩm để thanh toán');
        return;
      }
      const amount = selectedItems.reduce(
          (total, item) => total + item.product.selling_price * item.product_quantity,
          0
      );
      this.$router.push({ path: '/checkout', query: { amount } });
    },
  },
  created() {
    this.fetchCart();
  },
};
</script>

<style scoped>
.cart-container {
  font-family: 'Segoe UI', Arial, sans-serif;
  width: 1200px;
  margin: 30px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
}

.cart-container h2 {
  text-align: left;
  font-size: 1.5rem;
  margin-bottom: 25px;
  color: #34495e;
  font-weight: 600;
}

.cart-container h2 span {
  color: #764ba2;
  font-size: 1rem;
  font-weight: 500;
}

.cart-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.cart-table th,
.cart-table td {
  border: none;
  padding: 15px;
  text-align: center;
}

.cart-table tr {
  border-bottom: 1px solid #f1f1f1;
}

.cart-table th {
  background: linear-gradient(to right, #764ba2, #8a65b7);
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

.cart-table tbody tr:hover {
  background-color: #f8f9fa;
}

.cart-table img {
  max-width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.remove-btn {
  color: #764ba2;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  margin-top: 8px;
  transition: all 0.2s ease;
  padding: 5px 10px;
}

.remove-btn:hover {
  color: #ff5252;
  text-decoration: underline;
}

.quantity-control {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  width: fit-content;
  margin: 0 auto;
}

.quantity-control button {
  width: 36px;
  height: 36px;
  background-color: #f5f5f5;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  color: #34495e;
  transition: all 0.2s ease;
}

.quantity-control button:hover {
  background-color: #e0e0e0;
  color: #764ba2;
}

.quantity-control input {
  width: 50px;
  height: 36px;
  text-align: center;
  border: none;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  font-size: 0.9rem;
}

.cart-summary {
  margin-top: 30px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  text-align: right;
}

.cart-summary p {
  margin: 10px 0;
  font-size: 1rem;
  color: #34495e;
}

.cart-summary .highlight {
  color: #764ba2;
  font-size: 1.5rem;
  font-weight: 700;
}

.cart-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 25px;
}

.cart-actions .btn {
  padding: 12px 25px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s;
}

.cart-actions .btn-primary {
  background-color: #764ba2;
  color: white;
}

.cart-actions .btn-primary:hover {
  background-color: #8a65b7;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(118, 75, 162, 0.3);
}

.cart-actions .btn-secondary {
  background-color: #f5f5f5;
  color: #34495e;
}

.cart-actions .btn-secondary:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cart-table th:first-child,
.cart-table td:first-child {
  text-align: center;
  width: 50px;
}

.cart-table input[type="checkbox"] {
  transform: scale(1.2);
  cursor: pointer;
  accent-color: #764ba2;
}

/* Empty cart message */
.cart-container > p {
  text-align: center;
  padding: 40px 0;
  color: #7f8c8d;
  font-size: 1.1rem;
}
</style>