<template>
  <div class="page-container">
    <div class="section-header">
      <h2>Liên hệ</h2>
      <p class="section-subtitle">Chúng tôi luôn sẵn sàng hỗ trợ bạn trong quá trình sử dụng dịch vụ</p>
    </div>

    <div class="contact-container">
      <div class="contact-info">
        <div class="contact-item">
          <div class="contact-icon">
            <i class="fas fa-phone-alt"></i>
          </div>
          <div>
            <h3>Điện thoại</h3>
            <p><a href="tel:+0338989024">0338989024</a></p>
          </div>
        </div>

        <div class="contact-item">
          <div class="contact-icon">
            <i class="fas fa-envelope"></i>
          </div>
          <div>
            <h3>Email</h3>
            <p><a href="mailto:trannghia270403@gmail.com">trannghia270403@gmail.com</a></p>
          </div>
        </div>

        <div class="contact-item">
          <div class="contact-icon">
            <i class="fas fa-comment-dots"></i>
          </div>
          <div>
            <h3>Zalo</h3>
            <p><a href="https://zalo.me/0338989024" target="_blank">Zalo Official</a></p>
          </div>
        </div>

        <div class="contact-item">
          <div class="contact-icon">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <div>
            <h3>Địa chỉ cửa hàng</h3>
            <p>Trường đại học Kiến Trúc Hà Nội</p>
          </div>
        </div>

        <div class="contact-item">
          <div class="contact-icon">
            <i class="fas fa-clock"></i>
          </div>
          <div>
            <h3>Thời gian hỗ trợ</h3>
            <p>Thứ Hai - Thứ Sáu: 8:00 - 18:00</p>
            <p>Thứ Bảy: 9:00 - 16:00</p>
            <p>Chủ Nhật và ngày lễ: Nghỉ</p>
          </div>
        </div>
      </div>

      <div class="contact-form">
        <h3>Gửi tin nhắn cho chúng tôi</h3>
        <div v-if="submitStatus === 'success'" class="form-success">
          <div class="success-icon"><i class="fas fa-check-circle"></i></div>
          <h4>Cảm ơn bạn đã liên hệ!</h4>
          <p>Tin nhắn của bạn đã được gửi thành công. Chúng tôi sẽ phản hồi sớm nhất có thể.</p>
        </div>
        <form v-else @submit.prevent="sendEmail">
          <div class="form-group">
            <input
                type="text"
                v-model="formData.name"
                placeholder="Họ và tên"
                required
                :class="{'error-input': errors.name}"
            />
            <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
          </div>
          <div class="form-group">
            <input
                type="email"
                v-model="formData.email"
                placeholder="Email"
                required
                :class="{'error-input': errors.email}"
            />
            <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
          </div>
          <div class="form-group">
            <input
                type="text"
                v-model="formData.phone"
                placeholder="Số điện thoại"
                :class="{'error-input': errors.phone}"
            />
            <div v-if="errors.phone" class="error-message">{{ errors.phone }}</div>
          </div>
          <div class="form-group">
            <textarea
                rows="5"
                v-model="formData.message"
                placeholder="Nội dung tin nhắn"
                required
                :class="{'error-input': errors.message}"
            ></textarea>
            <div v-if="errors.message" class="error-message">{{ errors.message }}</div>
          </div>
          <button
              type="submit"
              class="submit-btn"
              :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">
              <i class="fas fa-spinner fa-spin"></i> Đang gửi...
            </span>
            <span v-else>Gửi tin nhắn</span>
          </button>
        </form>
      </div>
    </div>

    <div class="map-section">
      <h3 class="section-title">Bản đồ</h3>
      <div class="map-container">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2992574804607!2d105.789266!3d20.980638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ade83ba9e115%3A0x6f4fdb5e1e9e39ed!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaeG6v24gdHLDumMgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1734418279922!5m2!1svi!2s"
            width="100%"
            height="450"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>

    <div class="social-section">
      <h3 class="section-title">Kết nối với chúng tôi</h3>
      <p>Theo dõi chúng tôi để nhận được các thông tin ưu đãi và cập nhật mới nhất:</p>
      <div class="social-links">
        <a href="https://facebook.com" target="_blank" class="social-link">
          <div class="social-icon facebook">
            <i class="fab fa-facebook-f"></i>
          </div>
          <span>Facebook</span>
        </a>
        <a href="https://instagram.com" target="_blank" class="social-link">
          <div class="social-icon instagram">
            <i class="fab fa-instagram"></i>
          </div>
          <span>Instagram</span>
        </a>
        <a href="https://tiktok.com" target="_blank" class="social-link">
          <div class="social-icon tiktok">
            <i class="fab fa-tiktok"></i>
          </div>
          <span>TikTok</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';

export default {
  name: "ContactPage",
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        message: ''
      },
      errors: {},
      isSubmitting: false,
      submitStatus: null
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.formData.name.trim()) {
        this.errors.name = 'Vui lòng nhập họ và tên';
      }

      if (!this.formData.email.trim()) {
        this.errors.email = 'Vui lòng nhập email';
      } else if (!this.validateEmail(this.formData.email)) {
        this.errors.email = 'Email không hợp lệ';
      }

      if (this.formData.phone && !this.validatePhone(this.formData.phone)) {
        this.errors.phone = 'Số điện thoại không hợp lệ';
      }

      if (!this.formData.message.trim()) {
        this.errors.message = 'Vui lòng nhập nội dung tin nhắn';
      }

      return Object.keys(this.errors).length === 0;
    },

    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },

    validatePhone(phone) {
      const re = /^(\+\d{1,3}[- ]?)?\d{9,11}$/;
      return re.test(String(phone));
    },

    async sendEmail() {
      if (!this.validateForm()) return;

      this.isSubmitting = true;

      try {
        // Replace these with your actual EmailJS service details
        const serviceID = 'service_2704';
        const templateID = 'template_aibari6';
        const userID = 'iqtsyh496VvKOAOkF';

        const templateParams = {
          from_name: this.formData.name,
          from_email: this.formData.email,
          from_phone: this.formData.phone,
          message: this.formData.message
        };

        await emailjs.send(serviceID, templateID, templateParams, userID);

        this.submitStatus = 'success';
        this.resetForm();
      } catch (error) {
        console.error('Failed to send email:', error);
        alert('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau!');
      } finally {
        this.isSubmitting = false;
      }
    },

    resetForm() {
      this.formData = {
        name: '',
        email: '',
        phone: '',
        message: ''
      };
      this.errors = {};
    }
  }
};
</script>

<style scoped>
.page-container {
  width: 1250px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #34495e;
  margin-bottom: 15px;
  font-weight: 700;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.8rem;
  color: #34495e;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
}

/* Contact Section */
.contact-container {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  width: 100%;
  margin-bottom: 60px;
}

.contact-info {
  flex: 1 1 400px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
  background-color: #f8f9fe;
  padding: 25px;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.contact-item:hover {
  transform: translateY(-5px);
}

.contact-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  margin-right: 20px;
  flex-shrink: 0;
}

.contact-item h3 {
  color: #34495e;
  font-size: 1.2rem;
  margin: 0 0 8px 0;
  font-weight: 600;
}

.contact-item p {
  margin: 0 0 5px 0;
  color: #667eea;
  font-weight: 500;
}

.contact-item a {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-item a:hover {
  color: #764ba2;
  text-decoration: underline;
}

.contact-form {
  flex: 1 1 450px;
  background-color: white;
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.contact-form h3 {
  color: #34495e;
  font-size: 1.5rem;
  margin: 0 0 25px 0;
  font-weight: 600;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.error-input {
  border-color: #e74c3c !important;
}

.error-message {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 5px;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-3px);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-success {
  text-align: center;
  padding: 20px;
  background-color: #f0fff4;
  border-radius: 8px;
  border: 1px solid #c6f6d5;
}

.success-icon {
  font-size: 3rem;
  color: #48bb78;
  margin-bottom: 15px;
}

.form-success h4 {
  color: #2f855a;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.form-success p {
  color: #4a5568;
}

/* Map Section */
.map-section {
  margin-bottom: 60px;
}

.map-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

/* Social Section */
.social-section {
  text-align: center;
  margin-bottom: 40px;
}

.social-section p {
  max-width: 600px;
  margin: 0 auto 30px;
  color: #7f8c8d;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #34495e;
  transition: transform 0.3s ease;
}

.social-link:hover {
  transform: translateY(-5px);
}

.social-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  margin-bottom: 10px;
}

.facebook {
  background: #3b5998;
}

.instagram {
  background: linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D);
}

.tiktok {
  background: #000000;
}

/* Responsive */
@media (max-width: 768px) {
  .section-header h2 {
    font-size: 2rem;
  }

  .contact-item, .social-links {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .contact-icon {
    margin: 0 auto 15px;
  }
}

@media (max-width: 576px) {
  .section-header h2 {
    font-size: 1.8rem;
  }

  .contact-form {
    padding: 25px 20px;
  }
}
</style>