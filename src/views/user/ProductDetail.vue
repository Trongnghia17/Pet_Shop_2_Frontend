<template>
  <div class="product-detail">
    <div v-if="product" class="product-container">
      <img
          v-if="product.image"
          :src="`${baseURL}/${product.image}`"
          :alt="product.name"
          class="product-image"
      />
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p class="product-description">{{ product.description }}</p>
        <p><strong>Số lượng:</strong> {{ product.quantity }}</p>
        <div class="quantity-control">
          <button @click="decreaseQuantity">-</button>
          <input
              type="text"
              v-model="quantity"
              @input="updateCartQuantity"
          />
          <button @click="increaseQuantity">+</button>
        </div>
        <p><strong>Giá gốc:</strong> {{ formatPrice(product.original_price) }} VND</p>
        <p class="discounted-price">
          <strong>Giảm còn:</strong> {{ formatPrice(product.selling_price) }} VND
        </p>
        <button @click="addToCart(product)">Thêm vào giỏ</button>
      </div>
    </div>
    <div v-else class="loading">
      <p>Đang tải thông tin sản phẩm...</p>
    </div>

    <!-- Comments Section -->
    <div v-if="product && product.comments && product.comments.length" class="comments-section">
      <h2>Bình luận</h2>
      <ul>
        <li v-for="comment in product.comments" :key="comment.id">
          <p><strong>{{ comment.user.name }}:</strong> {{ comment.comment }}</p>
          <p><small>{{ new Date(comment.created_at).toLocaleString() }}</small></p>
        </li>
      </ul>
    </div>

    <!-- Add Comment Section -->
    <div v-if="product" class="add-comment-section">
      <textarea v-model="comment" placeholder="Viết bình luận của bạn..."></textarea>
      <button @click="addComment">Gửi bình luận</button>
    </div>
  </div>
</template>

<script>
import axiosInstance from "../../axiosInstance";
import apiConfigCart from "../../store/cart";
import apiConfigHome from "../../store/home";
import apiConfigComment from "../../store/comment";
import Cookies from "js-cookie";
import { formatPrice } from '@/utils/formatters';

export default {
  name: "ProductDetail",
  data() {
    return {
      product: null,
      baseURL: axiosInstance.defaults.baseURL,
      quantity: 1,
      comment: "",
    };
  },
  mounted() {
    this.fetchProductDetail();
  },
  methods: {
    formatPrice,
    addComment() {
      const isLoggedIn = Cookies.get("token");
      if (!isLoggedIn) {
        this.$toast.error('Bạn cần đăng nhập mới có thể bình luận');
        this.$router.push({ path: '/login' });
        return;
      }
      const slug = this.$route.params.product_slug;
      let data = {
        comment: this.comment,
      };
      apiConfigComment.addComment(slug,data)
          .then(response => {
            if (response.status === 200) {
              this.$toast.success('Bình luận thành công');
              this.product.comments.push({
                user: { name: 'Bản thân' }, // Replace with actual user data
                comment: this.comment,
                created_at: new Date().toISOString()
              });
              this.comment = ''; // Clear the comment input
            } else {
              console.error("Failed to add comment:", response);
            }
          })
          .catch(error => {
            console.error("Error adding comment:", error);
          });
    },
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    updateCartQuantity() {
      // This method can be used to handle any additional logic when the quantity is updated
    },
    async fetchProductDetail() {
      const category_slug  = this.$route.params.category_slug;
      const product_slug = this.$route.params.product_slug
      try {
        const response = await apiConfigHome.detailProduct(category_slug,product_slug);
        console.log(response.data.product)
        this.product = response.data.product;
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    },
    async addToCart(product) {
      const isLoggedIn = Cookies.get("token");
      if (!isLoggedIn) {
        this.$toast.error('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng');
        this.$router.push({path: '/login'});
        return;
      }
      const data = {
        product_id: product.id,
        product_quantity: this.quantity,
      };
      try {
        const response = await apiConfigCart.addCart(data);
        if (response.status === 200) {
          this.$toast.success("Thêm vào giỏ hàng thành công");
          this.$router.push({path: "/shopping-cart"});
        } else {
          console.error("Failed to add product to cart:", response.data);
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    },
  },
};
</script>

<style scoped>
.product-detail {
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 0;
  font-family: 'Poppins', 'Roboto', sans-serif;
  color: #333;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(118, 75, 162, 0.08);
  width: 100%;
  padding: 0;
  overflow: hidden;
}

.product-image {
  width: 45%;
  height: 500px;
  object-fit: cover;
  border-radius: 0;
  box-shadow: none;
  margin: 0;
  transition: all 0.5s ease;
}

.product-info {
  flex: 1;
  min-width: 300px;
  padding: 40px 40px 40px 20px;
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
  line-height: 1.2;
  border-bottom: none;
  padding-bottom: 0;
  position: relative;
}

h1::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(to right, #764ba2, #9778c3);
}

.product-description {
  font-size: 1rem;
  color: #666;
  margin: 25px 0;
  line-height: 1.7;
  background: none;
  padding: 0;
  border-left: none;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 25px 0;
  background: none;
  padding: 0;
  max-width: 200px;
}

.quantity-control button {
  background: linear-gradient(to right, #764ba2, #8a65b7);
  color: white;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(118, 75, 162, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.quantity-control input {
  width: 60px;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px 5px;
  transition: all 0.3s;
}

.discounted-price {
  color: #764ba2;
  font-weight: 600;
  font-size: 1.7rem;
  margin: 10px 0 25px;
  padding: 0;
  background: none;
  border-radius: 0;
  display: block;
}

.add-to-cart-btn {
  background: linear-gradient(to right, #764ba2, #8a65b7);
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(118, 75, 162, 0.3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: auto;
  align-self: flex-start;
}

.add-to-cart-btn:hover {
  box-shadow: 0 8px 20px rgba(118, 75, 162, 0.4);
  transform: translateY(-2px);
}

.loading {
  font-size: 1.2rem;
  color: #666;
  margin: 40px auto;
  text-align: center;
  padding: 30px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  width: 80%;
}

.comments-section {
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(118, 75, 162, 0.08);
}

.comments-section h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 30px;
  font-weight: 600;
  position: relative;
  padding-left: 0;
}

.comments-section h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(to right, #764ba2, #8a65b7);
}

.comments-section ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.comments-section li {
  background: #f9f9f9;
  padding: 20px 25px;
  border-radius: 15px;
  margin-bottom: 15px;
  transition: all 0.3s;
  border: none;
  border-left: none;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
}

.comments-section li p {
  margin: 0;
  line-height: 1.6;
}

.comments-section li p strong {
  color: #555;
  font-weight: 600;
}

.comments-section li p small {
  color: #999;
  font-size: 0.8rem;
  margin-top: 5px;
  display: block;
}

.add-comment-section {
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(118, 75, 162, 0.08);
}

.add-comment-section textarea {
  width: 100%;
  height: 120px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 15px;
  font-size: 1rem;
  margin-bottom: 20px;
  transition: all 0.3s;
  resize: vertical;
  font-family: inherit;
}

.add-comment-section textarea:focus {
  border-color: #764ba2;
  box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.1);
  outline: none;
}

.add-comment-section button {
  background: linear-gradient(to right, #764ba2, #8a65b7);
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(118, 75, 162, 0.2);
}

@media screen and (max-width: 1200px) {
  .product-detail {
    width: 90%;
    margin: 30px auto;
  }
}

@media screen and (max-width: 992px) {
  .product-image {
    width: 100%;
    height: 400px;
  }

  .product-info {
    padding: 30px;
  }
}

@media screen and (max-width: 768px) {
  .product-container {
    flex-direction: column;
  }

  .product-image {
    height: 350px;
    width: 100%;
  }

  .product-info {
    padding: 25px;
  }

  h1 {
    font-size: 1.8rem;
    text-align: left;
  }

  .comments-section,
  .add-comment-section {
    padding: 25px;
  }
}

@media screen and (max-width: 576px) {
  .product-detail {
    margin: 20px auto;
  }

  .product-image {
    height: 280px;
  }

  h1 {
    font-size: 1.6rem;
  }

  .discounted-price {
    font-size: 1.4rem;
  }
}
/* Add this style for the generic button styling */
button {
  background: linear-gradient(to right, #764ba2, #8a65b7);
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(118, 75, 162, 0.3);
}

button:hover {
  background: linear-gradient(to right, #8a65b7, #9778c3);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(118, 75, 162, 0.4);
}

/* Keep specific styling for quantity buttons */
.quantity-control button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.2rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(118, 75, 162, 0.2);
}

/* Keep specific styling for the comment button */
.add-comment-section button {
  padding: 12px 30px;
  font-size: 1rem;
  box-shadow: 0 5px 15px rgba(118, 75, 162, 0.2);
}
</style>