<template>
    <footer class="footer">
      <v-divider></v-divider>
      <div class="footer-content">
        <div class="footer-left">
          <!-- <img
            alt="Footer logo"
            src="../assets/logofooter.png"
            class="footer-logo"
          /> -->
          <ul>
            <li>
              <div class="footer1">
            <router-link 
            to="/home" 
            active-class="active-link" 
            exact-active-class="exact-active-link">
            <span style="margin-right: 8px; font-size: 20px;" class="fa-solid fa-house"></span>Trang chủ</router-link>
            </div>
            </li>
            <li class="footer1">
            <router-link 
            to="/introduce"
            class="navbar-link"
            active-class="active-link"
            exact-active-class="exact-active-link">
            <span style="margin-right: 8px;font-size: 20px;" class="fa-solid fa-circle-info"></span>Giới thiệu</router-link>
        </li>
            <li>
              <i style="margin-right: 8px; font-size: 20px;" class="fa fa-handshake"></i>
              <a href="#"> Hoạt động xã hội</a>
            </li>
            <li>
              <i style="margin-right: 8px; font-size: 20px;" class="fa fa-exchange-alt"></i>
              <a href="#"> Chính sách thanh toán đổi trả - hoàn tiền</a>
            </li>
            <li>
              <i style="margin-right: 8px; font-size: 20px;" class="fa fa-lock"></i>
              <a href="#"> Điều khoản bảo mật thông tin</a>
            </li>
            <li>
              <i style="margin-right: 8px; font-size: 20px;" class="fa fa-envelope"></i>
              <a href="#"> Liên hệ quảng cáo</a>
            </li>
          </ul>
        </div>
        <img src="../assets/images/logo.png" alt="logo" class="logo">

        
        <div class="footer-right">
          <h3>LIÊN HỆ</h3>
          <p>
            <span class="mdi mdi-facebook"></span>
            <a href="https://www.facebook.com/" target="_blank">
              facebook.com
            </a>
          </p>
          <p>
            <span class="mdi mdi-instagram"></span>
            <a href="https://www.instagram.com/" target="_blank">
              instagram.com
            </a>
          </p>
          <p>
            <span class="fa-brands fa-tiktok"></span>
            <a href="https://www.tiktok.com/vi-VN/" target="_blank">
              tiktok.com
            </a>
          </p>
          <p>
            <span class="fa-solid fa-phone"></span>
            <a href="tel:+0123445567">0865202584 </a>
          </p>
          <p>
            <span class="fa-solid fa-envelope"></span>
            <a href="mailto:petshop@gmail.com">petshop@gmail.com</a>
          </p>
        </div>
      </div>
      <p style="text-align: center">
        &copy; 2024 Pet Shop. All rights reserved.
      </p>
    </footer>
  </template>
  
  <script>
  export default {
    name: "AppFooter",
  };
  </script>
  
  <style scoped>
.footer {
  color: grey;
  padding: 20px 0;
  text-align: right;
  position: relative;
  bottom: 0;
  width: 100%;
  z-index: 300;
}

.footer-right {
  text-align: left;
  width: 20%;
  margin-top: 20px;
}

.footer-left {
  text-align: left;
  width: 25%;
  margin: 30px;
}

.footer-content {
  max-width: 70%;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 15px;
}

.footer-content p {
  margin: 5px 0;
}

.footer-content a {
  color: #1db4f0;
  text-decoration: none;
}

.footer-content a:hover {
  text-decoration: underline;
}

.footer-logo {
  width: 70%;
  height: auto;
}

.footer-content ul {
  list-style-type: none;
}

.footer-content ul a {
  color: grey;
}

.footer-content ul a:hover {
  color: #1db4f0;
}

.footer-content ul li {
  margin: 5px 0;
}

h3 {
  margin-bottom: 20px;
  color: #3d0bf0b6;
}

.footer-right p {
  margin: 10px 0;
}

.footer-right p a {
  margin-left: 5px;
}
ul {
  list-style-type: none;
  padding: 0;
}
.logo{
  width: 25%;
  margin-right: 12%;
  top : 0;
}
</style>
