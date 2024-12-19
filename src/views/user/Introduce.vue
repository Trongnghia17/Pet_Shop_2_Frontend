<template>
  <div class="introduce-container">
    <h1 class="main-title">Giới thiệu về Pet Shop</h1>
    <section class="introduction">
      <p>
        Tại Pet Shop, chúng tôi tự hào là điểm đến lý tưởng cho những người yêu thương thú cưng.
        Với sứ mệnh mang lại sự chăm sóc tốt nhất, chúng tôi cung cấp đa dạng các sản phẩm và dịch vụ chất lượng cao:
      </p>
      <ul class="highlight-list">
        <li>Thức ăn dinh dưỡng phù hợp từng loại thú cưng.</li>
        <li>Đồ chơi và phụ kiện độc đáo, an toàn.</li>
        <li>Các dịch vụ chuyên nghiệp như tắm rửa, cắt tỉa lông.</li>
        <li>Chăm sóc sức khỏe và tư vấn dinh dưỡng toàn diện.</li>
      </ul>
      <p>
        Với đội ngũ nhân viên nhiệt huyết, giàu kinh nghiệm, chúng tôi luôn đặt sự hài lòng của khách hàng và an toàn cho thú cưng lên hàng đầu.
      </p>
    </section>

    <div class="image-container">
      <img src="https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_1280.jpg" alt="Pet Shop" class="responsive-image">
    </div>

    <section class="products-services">
      <h2>Sản phẩm và Dịch vụ</h2>
      <p>Khám phá những điều tuyệt vời mà Pet Shop mang đến cho bạn:</p>
      <ul>
        <li>Các loại thú cưng đa dạng.</li>
        <li>Thức ăn chuyên dụng cho từng giống loài.</li>
        <li>Phụ kiện hiện đại, thiết kế tinh tế.</li>
        <li>Dịch vụ tắm rửa, cắt tỉa lông chuyên nghiệp.</li>
        <li>Chăm sóc sức khỏe và tiêm phòng.</li>
        <li>Tư vấn chăm sóc và dinh dưỡng.</li>
      </ul>
    </section>

    <section class="customers">
      <h2>Khách hàng của Pet Shop</h2>
      <p>
        Chúng tôi luôn thấu hiểu nhu cầu của người nuôi chó, mèo và các thú cưng khác. Với chính sách hỗ trợ tối ưu, Pet Shop cam kết:
      </p>
      <ul>
        <li>Đảm bảo chất lượng sản phẩm, giá cả hợp lý.</li>
        <li>Hoàn tiền, đổi trả 100% khi có sự cố.</li>
        <li>Dịch vụ chăm sóc khách hàng chu đáo, tận tâm.</li>
      </ul>
      <div class="image-container">
        <img src="https://mevacon.giaoduc.edu.vn/wp-content/uploads/2023/07/lo%CC%82ng-cho%CC%81-me%CC%80o.jpeg" alt="Khách hàng Pet Shop" class="responsive-image">
      </div>
    </section>

    <section class="policy">
      <h2>Chính sách bán hàng</h2>
      <p>Cam kết mang lại trải nghiệm mua sắm tốt nhất:</p>
      <ul>
        <li>Sản phẩm chất lượng cao với giá cả hợp lý.</li>
        <li>Hỗ trợ đặt hàng, đổi trả và đền bù 100% nếu có lỗi phát sinh.</li>
        <li>Quy trình đổi trả, hoàn tiền minh bạch và nhanh chóng.</li>
      </ul>
    </section>

<!--    <section class="contact">-->
<!--      <h2>Liên hệ</h2>-->
<!--      <p>Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ nhanh chóng:</p>-->
<!--      <router-link-->
<!--          to="/contact"-->
<!--          class="contact-link">-->
<!--        <i class="fa-solid fa-phone"></i> Thông tin liên hệ-->
<!--      </router-link>-->
<!--    </section>-->
  </div>
</template>

<script>
export default {
  name: "IntroducePage"
};
</script>

<style scoped>
.introduce-container {
  width: 1250px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  line-height: 1.8;
  color: #2c3e50;
}

.main-title {
  text-align: center;
  color: #34495e;
  margin-bottom: 30px;
}

h2 {
  color: #2980b9;
  margin-top: 30px;
  margin-bottom: 15px;
}

p {
  margin-bottom: 20px;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 20px;
}

ul li {
  margin-bottom: 10px;
}

.highlight-list {
  list-style-type: square;
  margin-top: 10px;
}

.image-container {
  text-align: center;
  margin: 20px 0;
}

.responsive-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.contact-link {
  display: inline-block;
  color: #1abc9c;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
}

.contact-link i {
  margin-right: 8px;
}

.contact-link:hover {
  text-decoration: underline;
}
</style>
