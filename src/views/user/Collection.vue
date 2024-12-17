<template>
  <div class="introduce-container">
    <h1>Giới thiệu về Pet Shop</h1>
    <p>
      Chào mừng bạn đến với Pet Shop, nơi cung cấp các sản phẩm và dịch vụ tốt nhất cho thú cưng của bạn. Chúng tôi tự hào là một trong những cửa hàng thú cưng hàng đầu, cung cấp mọi thứ từ thức ăn, đồ chơi, phụ kiện đến các dịch vụ chăm sóc sức khỏe cho thú cưng.
    </p>
    <h2>Sứ mệnh của chúng tôi</h2>
    <p>
      Sứ mệnh của chúng tôi là mang đến cho thú cưng của bạn những sản phẩm và dịch vụ tốt nhất, giúp chúng có một cuộc sống khỏe mạnh và hạnh phúc. Chúng tôi cam kết cung cấp các sản phẩm chất lượng cao và dịch vụ chuyên nghiệp, đáp ứng mọi nhu cầu của thú cưng và chủ nhân.
    </p>
    <h2>Sản phẩm và dịch vụ</h2>
    <ul>
      <li>Thức ăn cho thú cưng</li>
      <li>Đồ chơi và phụ kiện</li>
      <li>Dịch vụ chăm sóc sức khỏe</li>
      <li>Dịch vụ tắm và cắt tỉa lông</li>
      <li>Tư vấn chăm sóc thú cưng</li>
    </ul>
    <h2>Liên hệ</h2>
    <p>
      Nếu bạn có bất kỳ câu hỏi nào hoặc cần tư vấn, vui lòng liên hệ với chúng tôi qua số điện thoại <a href="tel:+011223344">113114115</a> hoặc email <a href="mailto:info@petshop.com">phucnguancut@gmail.com</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: "IntroducePage"
};
</script>

<style scoped>
.introduce-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

h2 {
  color: #34495e;
  margin-top: 20px;
}

p {
  line-height: 1.6;
  margin-bottom: 20px;
}

ul {
  list-style-type: disc;
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