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
      <div class="banner">
        <div class="banner-item">
          <img src="../assets/anh4.jpg" alt="An Tâm Đón Pet" class="banner-image">
        </div>
        <div class="banner-item">
          <img src="../assets/anh2.jpeg" alt="Trả Góp 0%" class="banner-image">
        </div>
        <div class="banner-item">
          <img src="../assets/anh1.jpeg" alt="Bảo Hiểm Sức Khỏe" class="banner-image">
        </div>
      </div>
      <div class="dog-breeds-container-with-banner">
        <div class="dog-breeds-banner">
          <img src="../assets/banner1.jpg" alt="Giống Chó Cảnh Banner" class="dog-breeds-banner-image">
        </div>
        <div class="dog-breeds-container">
          <div class="dog-breeds">
            <div class="dog-breed-item">
              <img src="../assets/Alaska.jpg" alt="Alaska" class="dog-breed-image">
              <p>Alaska</p>
            </div>
            <div class="dog-breed-item">
              <img src="../assets/border_collie.jpg" alt="Border Collie" class="dog-breed-image">
              <p>Border Collie</p>
            </div>
            <div class="dog-breed-item">
              <img src="../assets/bull_phap.jpg" alt="Bull Pháp" class="dog-breed-image">
              <p>Bull Pháp</p>
            </div>
            <div class="dog-breed-item">
              <img src="../assets/corgi.jpg" alt="Corgi" class="dog-breed-image">
              <p>Corgi</p>
            </div>
            <div class="dog-breed-item">
              <img src="../assets/golden.jpg" alt="Golden" class="dog-breed-image">
              <p>Golden</p>
            </div>
            <div class="dog-breed-item">
              <img src="../assets/husky.jpg" alt="Husky" class="dog-breed-image">
              <p>Husky</p>
            </div>
            <div class="dog-breed-item">
              <img src="../assets/labrador.jpg" alt="Labrador" class="dog-breed-image">
              <p>Labrador</p>
            </div>
            <div class="dog-breed-item">
              <img src="../assets/phoc_soc.jpg" alt="Phốc Sóc" class="dog-breed-image">
              <p>Phốc Sóc</p>
            </div>
            <div class="dog-breed-item">
              <img src="../assets/poodle.jpg" alt="Poodle" class="dog-breed-image">
              <p>Poodle</p>
            </div>
            <div class="dog-breed-item">
              <img src="../assets/pug.jpg" alt="Pug" class="dog-breed-image">
              <p>Pug</p>
            </div>
          </div>
        </div>
      </div>
      <div class="cat-breeds-container-with-banner">
        <div class="cat-breeds-banner">
          <img src="../assets/banner_cat.jpg" alt="Giống Mèo Cảnh Banner" class="cat-breeds-banner-image">
        </div>
        <div class="cat-breeds-container">
          <div class="cat-breeds">
            <div class="cat-breed-item">
              <img src="../assets/siamese.jpg" alt="Siamese" class="cat-breed-image">
              <p>Siamese</p>
            </div>
            <div class="cat-breed-item">
              <img src="../assets/persian.jpg" alt="Persian" class="cat-breed-image">
              <p>Persian</p>
            </div>
            <div class="cat-breed-item">
              <img src="../assets/bengal.jpg" alt="Bengal" class="cat-breed-image">
              <p>Bengal</p>
            </div>
            <div class="cat-breed-item">
              <img src="../assets/maine_coon.jpg" alt="Maine Coon" class="cat-breed-image">
              <p>Maine Coon</p>
            </div>
            <div class="cat-breed-item">
              <img src="../assets/ngan.jpg" alt="ngan" class="cat-breed-image">
              <p>Ragdoll</p>
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
        { type: 'h2', text: 'An Tâm Đón Pet', description: 'Với Gói Bảo Hành Toàn Diện 365 Ngày' },
        { type: 'h3', text: 'Trả Góp 0% Trong 12 Tháng' },
        { type: 'h3', text: 'Bảo Hiểm Sức Khỏ Lên Tới 1.000.000Đ' }
      ]
    };
  },
  methods: {
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
  .banner {
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .banner-item {
    flex: 1;
    background-color: #ffcccb;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    cursor: pointer;
    position: relative;
    max-width: 30%;
    transition: transform 0.3s ease;
  }
  .banner-item:hover {
    transform: scale(1.1);
  }
  .banner-image {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    width: 100%;
    height: 7.45cm;
    object-fit: cover;
    border-radius: 8px;
  }
  .dog-breeds-container {
    flex: 4;
    max-height: 280px;
    overflow-y: auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
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
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    width: 100%;
    height: 7.5cm;
    object-fit: cover;
    border-radius: 8px;
  }
  .cat-breeds-container {
    flex: 4;
    max-height: 280px;
    overflow-y: auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
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
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
</style>
