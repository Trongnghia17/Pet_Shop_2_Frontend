<template>
  <div>
    <div
        style="font-size: 1.3rem; font-weight: 500; padding-bottom: 2rem  "
    >
      Quản lý đơn hàng
    </div>
    <v-row class="ma-0">
      <v-col cols="12" class="pb-0 px-0">
        <v-card class="w-100" flat>

          <v-data-table
              :headers="headers"
              :items="listItemOrder"
              hide-default-footer
              loading-text="Xin chờ"
              sort-by="stt"
              no-results-text="Không có dữ liệu thỏa mãn"
              no-data-text="Không có dữ liệu thỏa mãn"
              class="elevation-1"
              fixed-header
              light
              style="padding-left: 1rem!important; padding-right: 1rem!important;"
          >
            

            <template v-slot:[`item.stt`]="{ item }">
              <div class="">
                {{ getItemIndex(item) }}
              </div>
            </template>
            <template v-slot:[`item.created_at`]="{ item }">
              <div>
                {{ formatDate(item.created_at) }}
              </div>
            </template>
            <template v-slot:[`item.payment_mode`]="{ item }">
              <div class="">
                <v-chip v-if="item.payment_mode === 'cod'" small outlined color="green">
                  Nhận hàng thanh toán
                </v-chip>
                <v-chip v-if="item.payment_mode === 'stripe'" small outlined color="orange">
                  Thanh toán online
                </v-chip>
              </div>
            </template>

            <template v-slot:[`item.action`]="{ item }">
              <div class="d-flex align-center justify-center">
                <!--cập nhật-->
                <v-tooltip bottom
                >
                  <template v-slot:activator="{ on }">
                    <v-icon
                        class="mr-2"
                        @click="setActionDetailOrder(item)"
                        v-on="on"
                    >
                      mdi-eye
                    </v-icon
                    >
                  </template>
                  <span> Xem chi tiết </span>
                </v-tooltip>
                
              </div>
            </template>
          </v-data-table>


        </v-card>
      </v-col>
    </v-row>
    <Detail
        :dataItem="dataItemDetailOrder"
        :open="openDialogDetailOrder"
        @toggle="openDialogDetailOrder = !openDialogDetailOrder"
    ></Detail>

  </div>
</template>

<script>
import apiConfigOrders from "@/store/order";
import axiosInstance from "../../axiosInstance";
import Detail from "../../components/order/detail.vue";

export default {
  name: 'ProductPage',
  components: {
    Detail,
  },
  data() {
    return {
      openDialogDetailOrder: false,
      dataItemDetailOrder: {},
      baseURL: axiosInstance.defaults.baseURL,
      listItemOrder: [],
      page: 1,
      pageCount: null,
      pageSize: 50,
    };
  },
  computed: {
    headers() {
      return [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '1%',
          align: 'center'
        },
        {
          text: 'Mã đơn hàng',
          sortable: false,
          value: 'tracking_no',
          width: '4%',
          align: 'center'
        },
        {
          text: 'Tổng tiền',
          value: 'amount',
          sortable: false,
          align: 'center',
          width: '5%'
        },
        {
          text: 'Ngày đặt',
          value: 'created_at',
          sortable: false,
          align: 'center',
          width: '5%'
        },
        {
          text: 'Trạng thái',
          value: 'payment_mode',
          sortable: false,
          align: 'center',
          width: '5%'
        },
        {
          text: 'Chức năng',
          value: 'action',
          sortable: false,
          align: 'center',
          width: '5%'
        }
      ]
    }
  },
  watch: {},

  mounted() {
    this.initialize()

  },
  methods:{
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('vi-VN', options);
    },
    getListOrder() {
      apiConfigOrders.orderAdmin().then((res) => {
        this.listItemOrder = res.data.orders

      });
    },
    setActionDetailOrder(item) {
      this.dataItemDetailOrder = item
      this.openDialogDetailOrder = true
    },
    getItemIndex(item) {
      return (this.page - 1) * this.pageSize + this.listItemOrder.indexOf(item) + 1
    },

    initialize() {
      this.getListOrder()
    },



  }
};
</script>
<style scoped>
</style>
