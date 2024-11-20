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
              <i class="fa fa-angle-right"></i>
              <a href="#"> Trang chủ</a>
            </li>
            <li>
              <i class="fa fa-angle-right"></i>
              <a href="#"> Giới thiệu</a>
            </li>
            <li>
              <i class="fa fa-angle-right"></i>
              <a href="#"> Dịch vụ</a>
            </li>
            <li>
              <i class="fa fa-angle-right"></i>
              <a href="#"> F.A.Q</a>
            </li>
            <li>
              <i class="fa fa-angle-right"></i>
              <a href="#"> Hoạt động xã hội</a>
            </li>
            <li>
              <i class="fa fa-angle-right"></i>
              <a href="#"> Chính sách thanh toán đổi trả - hoàn tiền</a>
            </li>
            <li>
              <i class="fa fa-angle-right"></i>
              <a href="#"> Điều khoản bảo mật thông tin</a>
            </li>
            <li>
              <i class="fa fa-angle-right"></i>
              <a href="#"> Liên hệ quảng cáo</a>
            </li>
          </ul>
        </div>
        <div class="footer-right">
          <h3>LIÊN HỆ</h3>
          <p>
            <span class="mdi mdi-facebook"></span>
            <a href="https://www.facebook.com/thanhthuongvu52" target="_blank">
              facebook.com
            </a>
          </p>
          <p>
            <span class="mdi mdi-instagram"></span>
            <a href="https://www.instagram.com/phucng.hiii/" target="_blank">
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
            <a href="mailto:lettocinema@gmail.com">hphuc2401@gmail.com</a>
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
}

.footer-content {
  max-width: 1400px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
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
  color: #dc0004;
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
.name-cinema {
  cursor: pointer;
  margin-bottom: 20px;
  margin-left: 5px;
}
.name-cinema:hover {
  color: #1db4f0;
  text-decoration: underline;
}
.address-cinema {
  margin: 10px;
}
</style>
