<template>
  <div class="introduce-container">
    <h1 class="main-title">Giới thiệu về Quà Tặng</h1>
    <section class="introduction">
      <p>
        Tại Quà Tặng, chúng tôi tự hào mang đến những món quà ý nghĩa, sang trọng và phù hợp với mọi dịp đặc biệt.
        Với sứ mệnh giúp khách hàng truyền tải tình cảm, chúng tôi cung cấp đa dạng các sản phẩm và dịch vụ chất lượng cao:
      </p>
      <ul class="highlight-list">
        <li>Quà tặng cá nhân hóa theo yêu cầu.</li>
        <li>Hộp quà sang trọng, tinh tế cho các dịp lễ tết.</li>
        <li>Phụ kiện và đồ trang trí độc đáo.</li>
        <li>Dịch vụ gói quà chuyên nghiệp, đẹp mắt.</li>
      </ul>
      <p>
        Với đội ngũ sáng tạo và tận tâm, chúng tôi luôn nỗ lực mang đến những món quà ấn tượng, giúp bạn thể hiện tình cảm trọn vẹn nhất.
      </p>
    </section>

    <div class="image-container">
      <img src="https://cdn.pixabay.com/photo/2017/12/22/08/01/gifts-3030279_1280.jpg" alt="Quà Tặng" class="responsive-image">
    </div>

    <section class="products-services">
      <h2>Sản phẩm và Dịch vụ</h2>
      <p>Khám phá những món quà độc đáo mà chúng tôi mang đến:</p>
      <ul>
        <li>Quà tặng cá nhân hóa theo tên, logo.</li>
        <li>Giỏ quà, hộp quà cho các dịp đặc biệt.</li>
        <li>Trang sức, đồ lưu niệm sang trọng.</li>
        <li>Dịch vụ gói quà chuyên nghiệp.</li>
        <li>Thiệp chúc mừng đi kèm theo yêu cầu.</li>
      </ul>
    </section>

    <section class="customers">
      <h2>Khách hàng của Quà Tặng</h2>
      <p>
        Chúng tôi luôn thấu hiểu nhu cầu của khách hàng khi tìm kiếm món quà ý nghĩa. Với chính sách hỗ trợ tối ưu, Quà Tặng cam kết:
      </p>
      <ul>
        <li>Đảm bảo chất lượng sản phẩm, giá cả hợp lý.</li>
        <li>Hoàn tiền, đổi trả 100% khi có sự cố.</li>
        <li>Dịch vụ tư vấn quà tặng tận tâm, chuyên nghiệp.</li>
      </ul>
      <div class="image-container">
        <img src="https://cdn.pixabay.com/photo/2016/11/23/17/00/gift-1853662_1280.jpg" alt="Khách hàng Quà Tặng" class="responsive-image">
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
  </div>
</template>

<script>
export default {
  name: "IntroduceGiftPage"
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
</style>