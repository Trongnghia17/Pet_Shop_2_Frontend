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
        <p><strong>Giá gốc:</strong> {{ product.original_price }} VND</p>
        <p class="discounted-price">
          <strong>Giảm còn:</strong> {{ product.selling_price }} VND
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
  width: 1250px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f2f2f2;
  color: #333;
  font-family: 'Arial', sans-serif;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.product-image {
  width: 100%;
  max-width: 450px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-image:hover {
  transform: scale(1.05);
}

.product-info {
  max-width: 600px;
  text-align: left;
  padding: 20px;
}

h1 {
  font-size: 2.4rem;
  color: #222;
  margin-bottom: 20px;
  font-weight: bold;
}

.product-description {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 20px;
  line-height: 1.6;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
}

.quantity-control button {
  background-color: #ff6f61;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.quantity-control button:hover {
  background-color: #e65a50;
}

.quantity-control input {
  width: 60px;
  text-align: center;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 6px;
}

.discounted-price {
  color: #ff3b30;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 15px 0;
}

button {
  background-color: #ff6f61;
  color: white;
  padding: 14px 18px;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 20px;
}

button:hover {
  background-color: #e65a50;
  transform: translateY(-2px);
}

button:active {
  background-color: #d95448;
  transform: translateY(0);
}

.loading {
  font-size: 1.5rem;
  color: #666;
  margin: 50px 0;
  text-align: center;
}

.comments-section {
  margin: 0 auto;
}

.comments-section h2 {
  margin-top: 20px;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
}

.comments-section ul {
  list-style-type: none;
  padding: 0;
}

.comments-section li {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
}

.comments-section li p {
  margin: 0;
}

.comments-section li p strong {
  color: #555;
}

.comments-section li p small {
  color: #999;
  display: block;
  margin-top: 5px;
}

@media screen and (max-width: 768px) {
  .product-container {
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .product-info {
    padding: 10px;
    text-align: center;
  }

  h1 {
    font-size: 2rem;
  }

  .discounted-price {
    font-size: 1.3rem;
  }
}
.add-comment-section {
  margin: 0 auto;
}

.add-comment-section textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  margin-bottom: 10px;
}

.add-comment-section button {
  background-color: #ff6f61;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-comment-section button:hover {
  background-color: #e65a50;
}
</style>