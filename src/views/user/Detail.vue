<template>
  <div class="product-detail-container">
    <div class="product-detail-content">
      <div class="product-image">
        <img src="../../assets/images/Alaska.jpg" alt="Product Image" class="product-main-image">
      </div>
      <div class="product-info">
        <h1 class="product-title">Giống Chó Alaska</h1>
        <p class="product-price">Giá: {{ formattedPrice }} VNĐ</p>
        <p class="product-description">
          Alaska là giống chó cảnh nổi tiếng với bộ lông dày và tính cách thân thiện. Chúng rất thích hợp làm bạn đồng hành trong gia đình.
        </p>
        <div class="product-options">
          <div class="option">
            <label for="color">Màu sắc:</label>
            <select id="color" class="product-select">
              <option value="white">Trắng</option>
              <option value="brown">Nâu</option>
              <option value="black">Đen</option>
            </select>
          </div>
          <div class="option">
            <label for="size">Kích thước:</label>
            <select id="size" class="product-select">
              <option value="small">Nhỏ</option>
              <option value="medium">Vừa</option>
              <option value="large">Lớn</option>
            </select>
          </div>
          <div class="option">
            <label for="quantity">Số lượng:</label>
            <input
                type="number"
                id="quantity"
                v-model="quantity"
                min="1"
                :max="maxQuantity"
                class="quantity-input"
            />
          </div>
        </div>
        <div class="product-buttons">
          <button class="add-to-cart-button" @click="addToCart">Thêm vào giỏ hàng</button>
          <button class="add-to-wishlist-button" @click="addToWishlist">Thêm vào danh sách yêu thích</button>
        </div>
      </div>
    </div>

    <!-- Phần đánh giá của khách hàng -->
    <div class="product-reviews">
      <h2 class="reviews-title">Đánh Giá Khách Hàng</h2>

      <!-- Hiển thị danh sách các đánh giá -->
      <div class="reviews-list">
        <div v-for="review in reviews" :key="review.id" class="review-item">
          <div class="review-user">
            <strong>{{ review.username }}</strong> <span class="review-date">{{ review.date }}</span>
          </div>
          <div class="review-rating">
            <span v-for="star in 5" :key="star" :class="{'filled': review.rating >= star}" class="star">&#9733;</span>
          </div>
          <p class="review-comment">{{ review.comment }}</p>
        </div>
      </div>

      <!-- Form gửi đánh giá -->
      <div class="review-form">
        <h3>Viết Đánh Giá Của Bạn</h3>
        <textarea v-model="newReview.comment" placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..." class="review-textarea"></textarea>
        <div class="review-rating-input">
          <label>Đánh giá:</label>
          <select v-model="newReview.rating" class="product-select">
            <option value="1">1 sao</option>
            <option value="2">2 sao</option>
            <option value="3">3 sao</option>
            <option value="4">4 sao</option>
            <option value="5">5 sao</option>
          </select>
        </div>
        <button class="submit-review-button" @click="submitReview">Gửi Đánh Giá</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetailPage',
  data() {
    return {
      quantity: 1,
      price: 10000000,
      maxQuantity: 10,
      reviews: [
        { id: 1, username: "Nguyễn Văn A", rating: 5, comment: "Chó Alaska rất đẹp và thân thiện, mình rất hài lòng!", date: "2024-10-01" },
        { id: 2, username: "Trần Thị B", rating: 4, comment: "Mới mua chó Alaska, rất đáng yêu nhưng có chút khó chăm sóc.", date: "2024-11-15" },
        { id: 3, username: "Lê Minh C", rating: 3, comment: "Chó khỏe mạnh, nhưng bộ lông hơi rụng nhiều.", date: "2024-09-30" },
      ],
      newReview: {
        username: "Người dùng",
        rating: 5,
        comment: "",
      },
    };
  },
  computed: {
    totalPrice() {
      return this.price * this.quantity;
    },
    formattedPrice() {
      return this.totalPrice.toLocaleString();
    }
  },
  methods: {
    addToCart() {
      alert(`Sản phẩm đã được thêm vào giỏ hàng! Số lượng: ${this.quantity}`);
    },
    addToWishlist() {
      alert(`Sản phẩm đã được thêm vào danh sách yêu thích!`);
    },
    submitReview() {
      if (this.newReview.comment.trim() === "") {
        alert("Vui lòng nhập nhận xét của bạn!");
        return;
      }

      const newReview = {
        ...this.newReview,
        id: this.reviews.length + 1,
        date: new Date().toLocaleDateString(),
      };
      this.reviews.push(newReview);
      this.newReview.comment = ""; // Reset comment field after submitting
      alert("Cảm ơn bạn đã gửi đánh giá!");
    }
  }
};
</script>

<style scoped>
/* Cấu hình lại kiểu dáng của thanh số lượng */
.quantity-input {
  width: 70px;
  padding: 10px;
  font-size: 1.2rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  text-align: center;
  transition: border-color 0.3s ease;
}

.quantity-input:focus {
  outline: none;
  border-color: #ff6f61;
}

/* Cấu hình container sản phẩm */
.product-detail-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px;
  background: linear-gradient(to bottom, #f4f4f9, #e9e9f5);
  min-height: 100vh;
}

.product-detail-content {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  padding: 25px;
  border-radius: 20px;
  transition: transform 0.3s ease;
}

.product-detail-content:hover {
  transform: translateY(-5px);
}

.product-image {
  flex: 1;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background: linear-gradient(135deg, #f9f9f9, #e0e0e0);
  padding: 15px;
}

.product-main-image {
  width: 100%;
  border-radius: 15px;
  object-fit: cover;
  max-height: 500px;
}

.product-info {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #333;
}

.product-title {
  font-size: 2.8rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
  letter-spacing: 0.5px;
}

.product-price {
  font-size: 1.8rem;
  color: #ff6f61;
  font-weight: bold;
  margin-bottom: 25px;
  background: #fff5f5;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(255, 111, 97, 0.2);
}

.product-description {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 25px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.product-options {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
}

.product-select {
  padding: 10px;
  font-size: 1.1rem;
  border-radius: 10px;
  border: 1px solid #ddd;
  width: 180px;
  background: #f9f9f9;
  transition: background-color 0.3s ease;
}

.product-select:hover {
  background-color: #ff6f61;
  color: #fff;
}

.product-buttons button {
  padding: 15px 25px;
  border-radius: 10px;
  font-size: 1.4rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.product-buttons button:hover {
  transform: translateY(-3px);
}

.add-to-cart-button {
  background-color: #ff6f61;
  color: white;
  border: none;
}

.add-to-cart-button:hover {
  background-color: #ff4b3a;
}

.add-to-wishlist-button {
  background-color: #ddd;
  color: #333;
  border: none;
}

.add-to-wishlist-button:hover {
  background-color: #bbb;
}

/* Phần đánh giá */
.product-reviews {
  margin-top: 50px;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.reviews-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #ff6f61;
  padding-bottom: 10px;
}

.reviews-list {
  margin-bottom: 30px;
}

.review-item {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.review-user {
  font-weight: bold;
  font-size: 1.1rem;
}

.review-date {
  font-size: 0.9rem;
  color: #777;
  margin-left: 10px;
}

.review-rating {
  margin-top: 5px;
}

.star {
  color: #ff6f61;
  font-size: 1.4rem;
  margin-right: 3px;
}

.filled {
  color: gold;
}

.review-comment {
  margin-top: 10px;
  font-size: 1.1rem;
  color: #333;
}

.review-form {
  padding: 25px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.review-textarea {
  width: 100%;
  padding: 15px;
  font-size: 1.1rem;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
  min-height: 120px;
  resize: vertical;
}

.submit-review-button {
  background-color: #ff6f61;
  color: white;
  border: none;
  padding: 15px 25px;
  font-size: 1.4rem;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.submit-review-button:hover {
  background-color: #ff4b3a;
  transform: translateY(-3px);
}
</style>
