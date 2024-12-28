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
        <td>{{ item.product.selling_price }}đ</td>
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
          {{ item.product.selling_price * item.product_quantity }}đ
        </td>
      </tr>
      </tbody>
    </table>
    <div class="cart-summary" v-if="cartItems.length">
      <p><strong>Tạm tính:</strong> {{ selectedTotalPrice }}đ</p>
      <p><strong>Thành tiền:</strong> <span class="highlight">{{ selectedTotalPrice }}đ</span></p>
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
  font-family: Arial, sans-serif;
  width: 1250px;
  margin: 0 auto;
  padding-top: 30px;
  background-color: #fff;
}

.cart-container h2 {
  text-align: left;
  font-size: 18px;
  margin-bottom: 20px;
}

.cart-container span {
  color: #666;
  font-size: 14px;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
}

.cart-table th,
.cart-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.cart-table th {
  background-color: #f9f9f9;
}

.cart-table img {
  max-width: 100px;
  height: auto;
}

.remove-btn {
  color: #ff0000;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
}

.quantity-control {
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-control button {
  width: 30px;
  height: 30px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  cursor: pointer;
}

.quantity-control input {
  width: 50px;
  text-align: center;
  border: 1px solid #ddd;
}

.cart-summary {
  text-align: right;
  margin-top: 20px;
}

.cart-summary p {
  margin: 5px 0;
}

.cart-summary .highlight {
  color: #ff9900;
  font-size: 18px;
}

.cart-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cart-actions .btn {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.cart-actions .btn-primary {
  background-color: #ffcc00;
  color: #000;
}

.cart-actions .btn-secondary {
  background-color: #ddd;
  color: #000;
}
.cart-table th:first-child,
.cart-table td:first-child {
  text-align: center;
  width: 50px;
}

.cart-table input[type="checkbox"] {
  transform: scale(1.2);
  cursor: pointer;
}

</style>