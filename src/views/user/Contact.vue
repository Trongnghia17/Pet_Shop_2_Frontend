<template>
  <div class="introduce-container">
    <h2>Liên hệ</h2>
    <p>
      Nếu bạn gặp phải vấn đề trong khi trải nghiệm dịch vụ hoặc cần giải đáp thắc mắc, vui lòng liên hệ với chúng tôi qua số điện thoại <a href="tel:+011223344">0123456789</a> hoặc email <a href="mailto:info@petshop.com">petshop@gmail.com</a>.
    </p>
    <h2>Địa chỉ</h2>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2992574804607!2d105.789266!3d20.980638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ade83ba9e115%3A0x6f4fdb5e1e9e39ed!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaeG6v24gdHLDumMgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1734418279922!5m2!1svi!2s" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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

h2 {
  color: #34495e;
  margin-top: 20px;
  margin-bottom: 25px;
}

p {
  line-height: 1.6;
  margin-bottom: 20px;
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