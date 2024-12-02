<template>
  <div class="container">
    <div class="sidebar">
      <ul class="sidebar-menu">
        <li><a href="#"><span class="icon">🐶</span> Giống Chó Cảnh</a></li>
        <li><a href="#"><span class="icon">🐱</span> Giống Mèo Cảnh</a></li>
        <li><a href="#"><span class="icon">💍</span> Hợp Tác</a></li>
        <li><a href="#" @click.prevent="navigateToAccessory"><span class="icon">📦</span> Phụ Kiện Chó Mèo</a></li>
        <li><a href="#"><span class="icon">✂️</span> Spa & Grooming</a></li>
      </ul>
    </div>

    <div class="main-content">
      <div class="banner-slider">
        <div class="banner">
          <div class="banner-item">
            <img src="../../assets/images/anh4.jpg" alt="An Tâm Đón Pet" class="banner-image">
          </div>
          <div class="banner-item">
            <img src="../../assets/images/anh2.jpeg" alt="Trả Góp 0%" class="banner-image">
          </div>
          <div class="banner-item">
            <img src="../../assets/images/anh1.jpeg" alt="Bảo Hiểm Sức Khỏe" class="banner-image">
          </div>
        </div>
      </div>
      <div class="dog-breeds-container-with-banner">
        <div class="dog-breeds-banner">
          <img src="../../assets/images/banner1.jpg" alt="Giống Chó Cảnh Banner" class="dog-breeds-banner-image">
        </div>
        <div class="dog-breeds-container">
          <div class="dog-breeds">
            <div v-for="index in 10" :key="index" class="dog-breed-item" @click="navigateToDetail">
              <img src="../../assets/images/Alaska.jpg" alt="Alaska" class="dog-breed-image">
              <p>Alaska</p>
              <p class="price">Giá: 10.000.000 - 20.000.000 VNĐ</p>
            </div>
          </div>
        </div>
      </div>
      <div class="cat-breeds-container-with-banner">
        <div class="cat-breeds-banner">
          <img src="../../assets/images/banner_cat.jpg" alt="Giống Mèo Cảnh Banner" class="cat-breeds-banner-image">
        </div>
        <div class="cat-breeds-container">
          <div class="cat-breeds">
            <div v-for="index in 5" :key="index" class="cat-breed-item" @click="navigateToDetail">
              <img src="../../assets/images/siamese.jpg" alt="Siamese" class="cat-breed-image">
              <p>Siamese</p>
              <p class="price">Giá: 5.000.000 - 15.000.000 VNĐ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data() {
    return {
      banners: [
        {type: 'h2', text: 'An Tâm Đón Pet', description: 'Với Gói Bảo Hành Toàn Diện 365 Ngày'},
        {type: 'h3', text: 'Trả Góp 0% Trong 12 Tháng'},
        {type: 'h3', text: 'Bảo Hiểm Sức Khỏ Lên Tới 1.000.000Đ'}
      ],
      currentBannerIndex: 0
    };
  },
  methods: {
    navigateToDetail() {
      window.location.href = 'http://localhost:8080/detail';
    },
    nextBanner() {
      this.currentBannerIndex = (this.currentBannerIndex + 1) % this.banners.length;
    },
    prevBanner() {
      this.currentBannerIndex = (this.currentBannerIndex - 1 + this.banners.length) % this.banners.length;
    },
    handleClick(item) {
      alert(`Bạn đã chọn: ${item.text}`);
    },
    navigateToAccessory() {
      this.$router.push({ name: 'Accessory' });
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f1f1f1;
}

.container {
  display: flex;
  background-color: #fff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
  flex-wrap: wrap;
}

.sidebar {
  width: 100%;
  max-width: 300px;
  height: auto;
  background-color: #ff6f61;
  color: #fff;
  padding: 20px;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
}

.sidebar-menu {
  list-style-type: none;
  padding: 0;
}

.sidebar-menu li {
  padding: 20px;
  margin-bottom: 10px;
  background-color: #ff8a75;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.sidebar-menu li a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.sidebar-menu li a:hover {
  transform: scale(1.1);
  color: #ffd3b6;
}

.sidebar-menu li a .icon {
  margin-right: 15px;
}

.main-content {
  width: 100%;
  padding: 30px;
}

.banner-slider {
  position: relative;
  margin-bottom: 30px;
}

.banner {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  width: 100%;
}

.banner-item {
  flex: 1;
  background-color: #ffd3b6;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  position: relative;
  max-width: 30%;
  transition: transform 0.3s ease;
  display: inline-block;
}

.banner-item:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.banner-image {
  width: 100%;
  border-radius: 15px;
}

.banner-controls {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.banner-item h2, .banner-item h3 {
  margin: 0;
  color: #444;
}

.dog-breeds-container-with-banner, .cat-breeds-container-with-banner {
  display: flex;
  align-items: center;
  margin-top: 30px;
  flex-wrap: wrap;
}

.dog-breeds-banner, .cat-breeds-banner {
  flex: 0 0 100%;
  max-width: 300px;
  margin-right: 30px;
}

.dog-breeds-banner-image, .cat-breeds-banner-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
}

.dog-breeds-container, .cat-breeds-container {
  flex: 1;
  padding: 20px;
}

.dog-breeds, .cat-breeds {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}

.dog-breed-item, .cat-breed-item {
  width: calc(50% - 30px);
  max-width: 200px;
  text-align: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.dog-breed-image, .cat-breed-image {
  width: 100%;
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.dog-breed-item:hover, .cat-breed-item:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.dog-breed-image:hover, .cat-breed-image:hover {
  transform: scale(1.1);
}
</style>
