<template>
  <v-dialog
      :value="open"
      :max-width="1000"
      @keydown="$event.key === 'Escape' && toggle()"
      scrollable
      persistent
  >
    <v-card>
      <v-card-title class="border-title-dialog" style="padding-left: 33px">
        Xem thông tin đơn hàng
        <v-btn
            @click="toggle"
            icon
            style="position: absolute; top: 0; right: 0"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pb-2">
        <v-container>
          <!-- Thông tin đơn hàng -->
          <v-row>
            <v-col cols="6">
              <strong>Mã đơn hàng:</strong> {{ dataItem.id }}
            </v-col>
            <v-col cols="6">
              <strong>Ngày tạo đơn mua:</strong> {{ formatDate(dataItem.created_at) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <strong>Địa chỉ:</strong> {{ dataItem.address }}
            </v-col>
            <v-col cols="6">
              <strong>Phương thức thanh toán:</strong> {{ paymentMode }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <strong>Số tiền:</strong> {{ formatCurrency(dataItem.amount) }}
            </v-col>
            <v-col cols="6">
              <strong>Trạng thái:</strong> {{ dataItem.tracking_no }}
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <!-- Danh sách sản phẩm -->
          <h5>Danh sách sản phẩm</h5>
          <v-row v-for="item in dataItem.order_items" :key="item.id" class="mb-3">
            <v-col cols="2">
              <v-img  :src="`${baseURL}/${item.image}`" max-height="50" max-width="50" class="rounded"></v-img>
            </v-col>
            <v-col cols="6">
              <strong>{{ item.name }}</strong>
              <div>Số lượng: {{ item.quantity }}</div>
              <div>Giá: {{ formatCurrency(item.price) }}</div>
            </v-col>
            <v-col cols="4">
              <strong>Tổng:</strong> {{ formatCurrency(item.quantity * item.price) }}
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions style="position: sticky; bottom: 0; background: #f6f9ff; padding-right: 2rem; padding-top: 10px; padding-bottom: 10px;">
        <v-spacer></v-spacer>
        <v-btn class="text-none secondary ma" depressed @click="toggle">
          <span class="caption-btn">Hủy</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axiosInstance from "@/axiosInstance";

export default {
  name: 'DetailProduct',
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    dataItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      baseURL: axiosInstance.defaults.baseURL,

    }
  },
  computed: {
    paymentMode() {
      return this.dataItem.payment_mode === 'cod' ? 'Nhận hàng thanh toán' : this.dataItem.payment_mode === 'stripe' ? 'Thanh toán online' : this.dataItem.payment_mode;
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle');
    },
    formatDate(date) {
      return new Date(date).toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(amount);
    },
  },
};
</script>

<style scoped>
/* Đặt tiêu đề và bố cục chính */
.border-title-dialog {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3f51b5;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

/* Nút đóng ở góc trên phải */
.v-btn[icon] {
  color: #9e9e9e;
  transition: color 0.3s;
}
.v-btn[icon]:hover {
  color: #f44336;
}

/* Phần thông tin đơn hàng */
.v-container {
  background: #f9fafe;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
v-row {
  margin-bottom: 10px;
}

/* Thông tin sản phẩm */
h5 {
  font-size: 1.25rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 16px;
}

.v-img {
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Cột thông tin sản phẩm */
.v-col {
  font-size: 0.875rem;
  line-height: 1.5;
}
.v-col strong {
  font-size: 1rem;
  color: #424242;
}

/* Divider */
.v-divider {
  margin: 12px 0;
  border-color: #e0e0e0;
}

/* Nút hành động */
.v-card-actions {
  background: #f6f9ff;
  border-top: 1px solid #e0e0e0;
  padding: 10px 16px;
}
.v-btn.secondary {
  background: #e0e0e0;
  color: #424242;
  transition: background 0.3s, color 0.3s;
}
.v-btn.secondary:hover {
  background: #d32f2f;
  color: white;
}

/* Nút Hủy */
.caption-btn {
  font-size: 0.875rem;
  font-weight: bold;
}

/* Hiệu ứng hover cho thông tin sản phẩm */
.v-row:hover {
  background: #f5f5f5;
  border-radius: 8px;
  transition: background 0.3s;
}
</style>

