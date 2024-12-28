<template>
  <div>
      <div
          style="font-size: 1.3rem; font-weight: 500; padding-bottom: 2rem  "
      >
        Quản lý thú cưng
      </div>
    <v-row class="ma-0">
      <v-col cols="12" class="pb-0 px-0">
        <v-card class="w-100" flat
                :style="pageCount <= 1 ? `padding-bottom: 1rem!important` : ''">

            <v-data-table
                :headers="headers"
                :items="listItemProduct"
                :items-per-page="pageSize"
                :page.sync="page"
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

              <template v-slot:top>
                <v-row class="ma-0">
                  <v-col cols="2" class="pr-0 pb-0" style="padding-left: 0px">
                    <v-text-field
                        hide-details=""
                        outlined
                        dense
                        v-model="name"
                        label="Tên sản phẩm thú cưng"
                        @keydown.enter="search"
                        @keyup="searchEmpty"
                        :append-icon="'mdi-magnify'"
                    ></v-text-field>
                  </v-col>
                  <v-col class="col-auto">
                    <v-btn
                        class="primary text-none"
                        @click="searchValidate"
                        depressed
                        height="40"
                    >
                      <v-icon small style="padding-right: 5px">mdi-filter</v-icon>
                      <span class="caption-btn">Tìm kiếm</span>
                    </v-btn>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="col-auto pr-0">
                    <v-btn
                           class="primary text-none"
                           @click="openDialogInsert = true"
                           depressed
                           height="40"
                    >
                      <v-icon style="padding-right: 5px" small>mdi-plus</v-icon>
                      <span class="caption-btn">Thêm mới</span>
                    </v-btn
                    >
                  </v-col>
                </v-row>
              </template>

              <template v-slot:[`item.stt`]="{ item }">
                <div class="">
                  {{ getItemIndex(item) }}
                </div>
              </template>
              <template v-slot:[`item.status`]="{ item }">
                <div class="">
                  <v-chip v-if="item.status === 1" small outlined color="green">
                    Mở bán
                  </v-chip>
                  <v-chip v-if="item.status === 2" small outlined color="orange">
                    Đừng bán
                  </v-chip>
                </div>
              </template>
              <template v-slot:[`item.featured`]="{ item }">
                <div class="">
                  <v-chip v-if="item.featured === 1" small outlined>
                    Có
                  </v-chip>
                  <v-chip v-if="item.featured === 0" small outlined>
                    Không
                  </v-chip>
                </div>
              </template>

              <template v-slot:[`item.image`]="{ item }">
                <img
                    v-if="item.image"
                    :src="`${baseURL}/${item.image}`"
                    width="50px"
                />
              </template>

              <template v-slot:[`item.action`]="{ item }">
                <div class="d-flex align-center justify-center">
                  <!--cập nhật-->
                  <v-tooltip bottom
                  >
                    <template v-slot:activator="{ on }">
                      <v-icon
                          class="mr-2"
                          @click="setActionDetailProduct(item)"
                          v-on="on"
                      >
                        mdi-eye
                      </v-icon
                      >
                    </template>
                    <span> Xem chi tiết </span>
                  </v-tooltip>
                  <v-tooltip bottom
                  >
                    <template v-slot:activator="{ on }">
                      <v-icon
                          class="mr-2"
                          @click="setActionUpdateProduct(item)"
                          v-on="on"
                      >
                        mdi-pencil
                      </v-icon
                      >
                    </template>
                    <span> Sửa </span>
                  </v-tooltip>
      
                  <v-tooltip bottom
                  >
                    <template v-slot:activator="{ on }">
                      <v-icon
                          class="mr-2"
                          @click="askForDeleteItemProduct(item)"
                          v-on="on"
                      >
                        mdi-delete
                      </v-icon
                      >
                    </template>
                    <span>Xóa</span>
                  </v-tooltip>
                </div>
              </template>
            </v-data-table>


        </v-card>
      </v-col>
    </v-row>
    <Insert
        :open="openDialogInsert"
        @toggle="openDialogInsert = !openDialogInsert"
        @success="getListItems"
    ></Insert>
    <Update
    :dataItem="dataItemUpdateProduct"
    :open="openUpdateProduct"
    @toggle="openUpdateProduct = !openUpdateProduct"
    @success="getListItems"
    ></Update>
    <Detail
        :dataItem="dataItemDetailProduct"
        :open="openDialogDetail"
        @toggle="openDialogDetail = !openDialogDetail"
        @success="getListItems"
    ></Detail>
    <Delete
        :open="openDelete"
        :check="true"
        :alert-msg="message_noti"
        @toggle="openDelete = !openDelete"
        @OK="deleteProduct"
    />
  </div>
</template>

<script>
import Insert from '@/components/product/Insert.vue';
import { isNullOrEmpty } from "@/utils/validators";
import apiConfig from "@/apiConfig";
import Update from '@/components/product/Update.vue';
import Delete from '@/components/product/Delete.vue';
import axiosInstance from "../../axiosInstance";
import Detail from '@/components/product/Detail.vue';

export default {
  name: 'ProductPage',
  components: {
    Insert,
    Update,
    Delete,
    Detail,
  },
  data() {
    return {
      startIndex: 1,
      page: 1,
      pageCount: null,
      pageSize: 50,
      total_item: 0,
      customPage: 1,
      openDialogInsert: false,
      openDelete: false,
      dataItem: {},
      openDialogDetail: false,
      message_noti: '',
      openDeleteDialog: false,
      openEditDialog: false,
      name: null,
      id: null,
      listItemProduct: [],
      addBtn: false,
      deleteBtn: false,
      sorted: null,
      openLoading: false,
      sortAsc: true,
      valueSort: null,
      dataItemUpdateProduct: {},
      dataItemDetailProduct: {},
      openUpdateProduct: false,
      baseURL: axiosInstance.defaults.baseURL,
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
          text: 'Tên sản phẩm',
          sortable: false,
          value: 'name',
          width: '4%',
          align: 'center'
        },
        {
          text: 'Hình ảnh',
          sortable: false,
          value: 'image',
          width: '4%',
          align: 'center'
        },
        {
          text: 'Thương hiệu',
          sortable: false,
          value: 'brand',
          width: '4%',
          align: 'center'
        },
        {
          text: 'Giá bán',
          sortable: false,
          value: 'selling_price',
          width: '4%',
          align: 'center'
        },
        {
          text: 'Giá gốc',
          sortable: false,
          value: 'original_price',
          width: '4%',
          align: 'center'
        },
        {
          text: 'Số lượng',
          sortable: false,
          value: 'quantity',
          width: '4%',
          align: 'center'
        },
        {
          text: 'Trạng thái',
          sortable: false,
          value: 'status',
          width: '4%',
          align: 'center'
        },
        {
          text: 'Phổ biến',
          sortable: false,
          value: 'featured',
          width: '4%',
          align: 'center'
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
    searchEmpty() {
      setTimeout(() => {
        if (isNullOrEmpty(this.name)) {
          this.search()
        }
      }, 10)
    },
    getListItems() {
      const payload = {
        name: this.name,
      };
      const data = {
        params: {
          ...payload,
        },
      };
      apiConfig.getAllProduct(data).then((res) => {

        if (res.status === 200) {
          this.listItemProduct = res.data.products;
        }
      });
  },
    searchBySort(value, type) {
      this.valueSort = value
      this.sortAsc = type
      this.getListItems()
    },
    setActionUpdateProduct(item) {
      this.dataItemUpdateProduct = item
      this.openUpdateProduct = true
    },
    setActionDetailProduct(item) {
      this.dataItemDetailProduct = item
      this.openDialogDetail = true
    },
    reset() {
      this.active = null
    },
    getItemIndex(item) {
      return (this.page - 1) * this.pageSize + this.listItemProduct.indexOf(item) + 1
    },
    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.page = 1
        this.pageSize = pageSizes
        this.$refs.paginationKH.reset()
        this.getListItems()
      }
    },
    changePage(value) {
      this.page = value
      this.getListItems()
    },
    searchValidate() {
      this.search()
    },
    search() {
      this.page = 1
      this.getListItems()
    },

    initialize() {
      this.getListItems()
    },

    setActionDetail(item) {
      this.dataItem = item
      this.openDialogDetail = true
    },
    async deleteProduct() {
      try {
        const response = await apiConfig.deleteProduct(this.id);
        if (response.status === 200) {
          this.$toast.success('Xóa thành công');
          this.getListItems();
        } else {
          this.$toast.warning('Xóa thất bại');
        }
      } catch (error) {
        console.error(error);
        this.$toast.error('Đã xảy ra lỗi, vui lòng thử lại');
      } finally {
        this.openDelete = false;
      }
    },


    //ask to delete
    askForDeleteItemProduct(item) {
      this.id = item.id;
      (this.openDelete = true),
      (this.message_noti = `Bạn có xác nhận xóa bản ghi không?`)
    },
  }
};
</script>
<style scoped>
</style>