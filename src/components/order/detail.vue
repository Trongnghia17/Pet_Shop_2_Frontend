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
              <strong>Ngày tạo:</strong> {{ formatDate(dataItem.created_at) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <strong>Địa chỉ:</strong> {{ dataItem.address }}
            </v-col>
            <v-col cols="6">
              <strong>Phương thức thanh toán:</strong> {{ dataItem.payment_mode }}
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
              <v-img :src="item.image" max-height="50" max-width="50" class="rounded"></v-img>
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
.border-title-dialog {
  font-size: 1.25rem;
  font-weight: bold;
}
.caption-btn {
  font-size: 0.875rem;
}
</style>
