<template>
  <div class="container">
    <div class="sidebar">
      <ul class="sidebar-menu">
        <li><a href="#"><span class="icon">&#128054;</span> Giống Chó Cảnh</a></li>
        <li><a href="#"><span class="icon">&#128049;</span> Giống Mèo Cảnh</a></li>
        <li><a href="#"><span class="icon">&#129309;</span> Hợp Tác</a></li>
        <li><a href="#"><span class="icon">&#128230;</span> Phụ Kiện Chó Mèo</a></li>
        <li><a href="#"><span class="icon">&#9986;&#65039;</span> Spa & Grooming</a></li>
      </ul>
    </div>

    <div class="main-content">
      <div class="banner-slider">
        <div class="banner">
          <div class="banner-item">
            <img src="../../assets/anh4.jpg" alt="An Tâm Đón Pet" class="banner-image">
          </div>
          <div class="banner-item">
            <img src="../../assets/anh2.jpeg" alt="Trả Góp 0%" class="banner-image">
          </div>
          <div class="banner-item">
            <img src="../../assets/anh1.jpeg" alt="Bảo Hiểm Sức Khỏe" class="banner-image">
          </div>
        </div>
        <div class="banner-controls">
          <button @click="prevBanner">Previous</button>
          <button @click="nextBanner">Next</button>
        </div>
      </div>
      <div class="dog-breeds-container-with-banner">
        <div class="dog-breeds-banner">
          <img src="../../assets/banner1.jpg" alt="Giống Chó Cảnh Banner" class="dog-breeds-banner-image">
        </div>
        <div class="dog-breeds-container">
          <div class="dog-breeds">
            <div class="dog-breed-item">
              <img src="../../assets/Alaska.jpg" alt="Alaska" class="dog-breed-image">
              <p>Alaska</p>
              <p class="price">Giá: 10.000.000 - 20.000.000 VNĐ</p>
            </div>
            <div class="dog-breed-item">
              <img src="../../assets/Alaska.jpg" alt="Alaska" class="dog-breed-image">
              <p>Alaska</p>
              <p class="price">Giá: 10.000.000 - 20.000.000 VNĐ</p>
            </div>
            <div class="dog-breed-item">
              <img src="../../assets/Alaska.jpg" alt="Alaska" class="dog-breed-image">
              <p>Alaska</p>
              <p class="price">Giá: 10.000.000 - 20.000.000 VNĐ</p>
            </div>
            <div class="dog-breed-item">
              <img src="../../assets/Alaska.jpg" alt="Alaska" class="dog-breed-image">
              <p>Alaska</p>
              <p class="price">Giá: 10.000.000 - 20.000.000 VNĐ</p>
            </div>
            <div class="dog-breed-item">
              <img src="../../assets/Alaska.jpg" alt="Alaska" class="dog-breed-image">
              <p>Alaska</p>
              <p class="price">Giá: 10.000.000 - 20.000.000 VNĐ</p>
            </div>
            <div class="dog-breed-item">
              <img src="../../assets/Alaska.jpg" alt="Alaska" class="dog-breed-image">
              <p>Alaska</p>
              <p class="price">Giá: 10.000.000 - 20.000.000 VNĐ</p>
            </div>
            <div class="dog-breed-item">
              <img src="../../assets/Alaska.jpg" alt="Alaska" class="dog-breed-image">
              <p>Alaska</p>
              <p class="price">Giá: 10.000.000 - 20.000.000 VNĐ</p>
            </div>
            <div class="dog-breed-item">
              <img src="../../assets/Alaska.jpg" alt="Alaska" class="dog-breed-image">
              <p>Alaska</p>
              <p class="price">Giá: 10.000.000 - 20.000.000 VNĐ</p>
            </div>
            <div class="dog-breed-item">
              <img src="../../assets/Alaska.jpg" alt="Alaska" class="dog-breed-image">
              <p>Alaska</p>
              <p class="price">Giá: 10.000.000 - 20.000.000 VNĐ</p>
            </div>
            <div class="dog-breed-item">
              <img src="../../assets/Alaska.jpg" alt="Alaska" class="dog-breed-image">
              <p>Alaska</p>
              <p class="price">Giá: 10.000.000 - 20.000.000 VNĐ</p>
            </div>
          </div>
        </div>
      </div>
      <div class="cat-breeds-container-with-banner">
        <div class="cat-breeds-banner">
          <img src="../../assets/banner_cat.jpg" alt="Giống Mèo Cảnh Banner" class="cat-breeds-banner-image">
        </div>
        <div class="cat-breeds-container">
          <div class="cat-breeds">
            <div class="cat-breed-item">
              <img src="../../assets/siamese.jpg" alt="Siamese" class="cat-breed-image">
              <p>Siamese</p>
              <p class="price">Giá: 5.000.000 - 15.000.000 VNĐ</p>
            </div>
            <div class="cat-breed-item">
              <img src="../../assets/siamese.jpg" alt="Siamese" class="cat-breed-image">
              <p>Siamese</p>
              <p class="price">Giá: 5.000.000 - 15.000.000 VNĐ</p>
            </div>
            <div class="cat-breed-item">
              <img src="../../assets/siamese.jpg" alt="Siamese" class="cat-breed-image">
              <p>Siamese</p>
              <p class="price">Giá: 5.000.000 - 15.000.000 VNĐ</p>
            </div>
            <div class="cat-breed-item">
              <img src="../../assets/siamese.jpg" alt="Siamese" class="cat-breed-image">
              <p>Siamese</p>
              <p class="price">Giá: 5.000.000 - 15.000.000 VNĐ</p>
            </div>
            <div class="cat-breed-item">
              <img src="../../assets/siamese.jpg" alt="Siamese" class="cat-breed-image">
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
  mounted() {
    this.startBannerSlider();
  },
  methods: {
    startBannerSlider() {
      setInterval(() => {
        this.nextBanner();
      }, 3000);
    },
    nextBanner() {
      this.currentBannerIndex = (this.currentBannerIndex + 1) % this.banners.length;
    },
    prevBanner() {
      this.currentBannerIndex = (this.currentBannerIndex - 1 + this.banners.length) % this.banners.length;
    },
    handleClick(item) {
      alert(`Bạn đã chọn: ${item.text}`);
    }
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
}

.container {
  display: flex;
}

.sidebar {
  width: 20%;
  height: 22.3cm;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar-menu {
  list-style-type: none;
  padding: 0;
}

.sidebar-menu li {
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.sidebar-menu li a {
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.sidebar-menu li a:hover {
  transform: scale(1.1);
}

.sidebar-menu li a .icon {
  margin-right: 10px;
}

.main-content {
  width: 80%;
  padding: 20px;
}

.banner-slider {
  position: relative;
}

.banner {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
  animation: slide 15s linear infinite;
}

@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.banner-item {
  flex: 1;
  background-color: #ffcccb;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  position: relative;
  max-width: 30%;
  transition: transform 0.3s ease;
  display: inline-block;
}

.banner-item:hover {
  transform: scale(1.1);
}

.banner-image {
  width: 100%;
  border-radius: 8px;
}

.banner-controls {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.banner-text {
  position: absolute;
  bottom: 15px;
  left: 15px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
}

.banner-item h2, .banner-item h3 {
  margin: 0;
}

.dog-breeds-container-with-banner {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.dog-breeds-banner {
  flex: 0 0 15%;
  margin-right: 20px;
}

.dog-breeds-banner-image {
  width: 110%;
  height: 15.45cm;
  object-fit: cover;
  border-radius: 8px;
}

.dog-breeds-container {
  flex: 4;
  padding: 10px;
}

.dog-breeds {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.dog-breed-item {
  width: 18%;
  text-align: center;
}

.dog-breed-image {
  width: 100%;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.dog-breed-image:hover {
  transform: scale(1.1);
}

.cat-breeds-container-with-banner {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.cat-breeds-banner {
  flex: 0 0 15%;
  margin-right: 20px;
}

.cat-breeds-banner-image {
  width: 110%;
  height: 15.45cm;
  object-fit: cover;
  border-radius: 8px;
}

.cat-breeds-container {
  flex: 4;
  padding: 10px;
}

.cat-breeds {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.cat-breed-item {
  width: 18%;
  text-align: center;
}

.cat-breed-image {
  width: 100%;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.cat-breed-image:hover {
  transform: scale(1.1);
}
</style>
