<template>
  <div class="introduce-container">
    <h1 class="main-title">Liên hệ</h1>
    <p>
      Chúng tôi luôn sẵn sàng hỗ trợ bạn trong quá trình sử dụng dịch vụ. Nếu có bất kỳ thắc mắc nào, bạn có thể liên hệ với chúng tôi thông qua các phương thức sau:
    </p>
    <ul>
      <li>Điện thoại: <a href="tel:+0123456789">0123456789</a></li>
      <li>Email: <a href="trannghia270403@gmail.com">petshop@gmail.com</a></li>
      <li>Hỗ trợ trực tuyến qua Zalo: <a href="https://zalo.me/0338989024" target="_blank">Zalo Official</a></li>
    </ul>
    <p>
      Thời gian hỗ trợ:
      <ul>
        <li>Thứ Hai - Thứ Sáu: 8:00 - 18:00</li>
        <li>Thứ Bảy: 9:00 - 16:00</li>
        <li>Chủ Nhật và ngày lễ: Nghỉ</li>
      </ul>
    </p>

    <h2>Địa chỉ</h2>
    <p>
      Bạn có thể ghé thăm cửa hàng của chúng tôi tại địa chỉ:
    </p>
    <p><strong>Cửa hàng thú cưng PetShop</strong></p>
    <p>Trường đại học Kiến Trúc Hà Nội</p>

    <h2>Bản đồ</h2>
    <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2992574804607!2d105.789266!3d20.980638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ade83ba9e115%3A0x6f4fdb5e1e9e39ed!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaeG6v24gdHLDumMgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1734418279922!5m2!1svi!2s"
        width="100%"
        height="450"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
    </iframe>

    <h2>Mạng xã hội</h2>
    <p>Theo dõi chúng tôi để nhận được các thông tin ưu đãi và cập nhật mới nhất:</p>
    <ul>
      <li>Facebook: <a href="https://facebook.com" target="_blank">facebook.com</a></li>
      <li>Instagram: <a href="https://instagram.com" target="_blank">instagram.com</a></li>
      <li>TikTok: <a href="https://tiktok.com" target="_blank">tiktok.com</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "IntroducePage"
};
</script>

<style scoped>
.main-title {
  text-align: center;
  color: #34495e;
  margin-bottom: 30px;
}
.introduce-container {
  width: 1250px;
  margin: 0 auto;
  padding: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

h2 {
  color: #34495e;
  margin-top: 20px;
  margin-bottom: 25px;
}

p {
  line-height: 1.6;
  margin-bottom: 20px;
}

ul {
  padding-left: 20px;
}

ul li {
  margin-bottom: 10px;
}

a {
  color: #1db4f0;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
