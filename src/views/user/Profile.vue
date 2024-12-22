<template>
  <div class="profile-container">

    <!-- Shop Header -->
    <header class="shop-header">
      <div class="shop-avatar">
        <img src="https://via.placeholder.com/100" alt="Shop Avatar" />
      </div>
      <div class="shop-info">
        <h1 class="shop-name"> PETSHOP</h1>
        <p class="shop-description">
          PetShop chuyên cung cấp các giống thú cưng chất lượng cao, đa dạng lựa chọn và dịch vụ tận tâm.
        </p>
      </div>
    </header>

    <!-- Form Section -->
    <div class="form-section">
      <div class="form-card">
        <h2 class="section-title">Thông Tin Vận Chuyển</h2>
        <form class="form" @submit.prevent="updateInformation">
          <div class="form-group">
            <div class="input-group">
              <label for="name">Họ và tên</label>
              <input type="text" id="name" v-model="formData.name" placeholder="Điền họ tên của bạn." required />
            </div>
            <div class="input-group">
              <label for="phone">Số điện thoại</label>
              <input type="tel" id="phone" v-model="formData.phone" placeholder="Điện thoại liên lạc với bạn." required />
            </div>
          </div>

          <div class="input-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="formData.email" placeholder="Địa chỉ email của bạn." />
          </div>

          <div class="input-group">
            <label for="address">Địa chỉ</label>
            <input type="text" id="address" v-model="formData.address" placeholder="Địa chỉ của bạn." required />
          </div>

          <div class="form-group">
            <div class="input-group">
              <label for="city">Tỉnh / Thành Phố</label>
              <select id="city" v-model="formData.city" required>
                <option value="">Chọn tỉnh thành</option>
                <option v-for="city in cities" :key="city.value" :value="city.value">
                  {{ city.text }}
                </option>
              </select>
            </div>
            <div class="input-group">
              <label for="district">Quận Huyện</label>
              <input type="text" id="district" v-model="formData.district" placeholder="Quận, huyện của bạn." />
            </div>
            <div class="input-group">
              <label for="ward">Phường Xã</label>
              <input type="text" id="ward" v-model="formData.ward" placeholder="Phường, xã của bạn." />
            </div>
          </div>

          <div class="input-group">
            <label for="note">Ghi chú</label>
            <textarea id="note" v-model="formData.note" rows="3" placeholder="Ghi chú thêm cho đơn hàng..."></textarea>
          </div>

          <button type="submit" class="submit-btn">Cập nhật thông tin</button>
        </form>
      </div>

      <!-- Hiển thị thông tin đã cập nhật -->
      <div v-if="updatedInfo" class="updated-info">
        <h2 class="section-title">Thông Tin Đã Cập Nhật</h2>
        <p><strong>Họ và tên:</strong> {{ updatedInfo.name }}</p>
        <p><strong>Số điện thoại:</strong> {{ updatedInfo.phone }}</p>
        <p><strong>Email:</strong> {{ updatedInfo.email }}</p>
        <p><strong>Địa chỉ:</strong> {{ updatedInfo.address }}</p>
        <p><strong>Tỉnh / Thành Phố:</strong> {{ getCityName(updatedInfo.city) }}</p>
        <p><strong>Quận Huyện:</strong> {{ updatedInfo.district }}</p>
        <p><strong>Phường Xã:</strong> {{ updatedInfo.ward }}</p>
        <p><strong>Ghi chú:</strong> {{ updatedInfo.note }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserProfile",
  data() {
    return {
      // Dữ liệu của form
      formData: {
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        district: "",
        ward: "",
        note: "",
      },
      updatedInfo: null, // Lưu thông tin đã cập nhật
      // Danh sách thành phố (giả lập)
      cities: [
        { value: "hanoi", text: "Hà Nội" },
        { value: "hcm", text: "TP. Hồ Chí Minh" },
        { value: "danang", text: "Đà Nẵng" },
      ],
    };
  },
  methods: {
    // Xử lý cập nhật thông tin
    updateInformation() {
      if (!this.formData.name || !this.formData.phone || !this.formData.address || !this.formData.city) {
        alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
        return;
      }

      // Cập nhật thông tin
      this.updatedInfo = { ...this.formData }; // Sao chép dữ liệu từ formData

      alert("Thông tin đã được cập nhật!");
    },
    // Lấy tên tỉnh/thành từ giá trị
    getCityName(value) {
      const city = this.cities.find((city) => city.value === value);
      return city ? city.text : "N/A";
    },
  },
};
</script>
<style scoped>
/* Container tổng thể */
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  color: #333;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Header */
.shop-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.shop-avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #f5a623;
}

.shop-info {
  flex: 1;
}

.shop-name {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.shop-description {
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
}

/* Form Section */
.form-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Card */
.form-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.updated-info {
  background-color: #e6f7e6;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: #f5a623;
  margin-bottom: 15px;
  border-bottom: 2px solid #f5a623;
  padding-bottom: 5px;
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  gap: 20px;
}

.input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 5px;
}

input,
textarea,
select {
  padding: 10px;
  font-size: 1rem;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s ease;
  background-color: #f9f9f9;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #f5a623;
}

/* Submit button */
.submit-btn {
  background-color: #f5a623;
  color: white;
  border: none;
  padding: 15px;
  font-size: 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 20px;
}

.submit-btn:hover {
  background-color: #d48c1c;
}
</style>
