<template>
  <div class="introduce-container">
    <h1>Giới thiệu về Pet Shop</h1>
    <p>
        Petshop của chúng tôi là điểm đến tin cậy dành cho những người yêu thú cưng. Chúng tôi cung cấp một loạt các sản phẩm chất lượng cao như thức ăn, đồ chơi, phụ kiện, cùng với các dịch vụ chuyên nghiệp như tắm rửa, cắt tỉa lông, chăm sóc sức khỏe và tư vấn dinh dưỡng cho thú cưng. Với đội ngũ nhân viên giàu kinh nghiệm và nhiệt huyết, chúng tôi luôn đặt sự hài lòng và an toàn của thú cưng lên hàng đầu. Hãy đến với chúng tôi để mang lại cho thú cưng của bạn cuộc sống khỏe mạnh và hạnh phúc!
    </p>
    <div class="image">
        <img src="https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_1280.jpg" class="image">
    </div>    
    <h2>Sản phẩm và dịch vụ</h2>
   <ul>
      <li>Các loại thú cưng</li>
      <li>Thức ăn cho thú cưng</li>
      <li>Đồ chơi và phụ kiện</li>
      <li>Dịch vụ chăm sóc sức khỏe</li>
      <li>Dịch vụ tắm và cắt tỉa lông</li>
      <li>Tư vấn chăm sóc thú cưng</li>
    </ul> 
    <h2>Khách hàng của Petshop</h2>
    <p>
        Người nuôi chó, mèo quan tâm sản phẩm đa dạng, giá cả cạnh tranh và chất lượng phục vụ tốt nhất thị trường. Petshop luôn khẳng định uy tín với chính sách hoàn tiền, đổi trả 100% khi xảy ra sự cố.
    </p>
    <div class="image">
        <img src="https://mevacon.giaoduc.edu.vn/wp-content/uploads/2023/07/lo%CC%82ng-cho%CC%81-me%CC%80o.jpeg" class="image">
    </div> 
    <h2>Chính sách bán hàng của PetShop</h2>
    <ul>
      <li>Cung cấp sản phẩm dịch vụ chăm sóc sức khỏe cho thú cưng, làm đẹp với chất lượng cao nhất - giá thấp nhất.</li>
      <li>Shop hỗ trợ đặt hàng, đổi trả, hoàn hàng, đền bù 100% với đơn hàng phát sinh lỗi từ phía shop</li>
      <li>Chính sách, quy trình đổi trả, hoàn tiền</li>
    </ul> 
    <h2>Liên hệ</h2>
    <ul>
        <ul class="lienhe">
            <router-link
            to="/contact"
            class="navbar-link"
            active-class="active-link"
            exact-active-class="exact-active-link">
            <span style="margin-right: 8px;font-size: 20px;" class="fa-solid fa-phone"></span>Thông tin liên hệ</router-link>
        </ul>
    </ul>
  </div>
  
</template>

<script>
export default {
  name: "IntroducePage"
};
</script>

<style scoped>
.introduce-container {
  max-width: 70%;
  margin: 0 auto;
  padding: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
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
.image{
    max-width: 70%;
    margin-left: 15%;
}

</style>