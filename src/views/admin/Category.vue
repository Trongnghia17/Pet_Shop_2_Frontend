<template>
  <div>
      <div
          style="font-size: 1.3rem; font-weight: 500; padding-bottom: 2rem  "
      >
        Quản lý giống thú cưng
      </div>
    <v-row class="ma-0">
      <v-col cols="12" class="pb-0 px-0">
        <v-card class="w-100" flat
                :style="pageCount <= 1 ? `padding-bottom: 1rem!important` : ''">

            <v-data-table
                :headers="headers"
                :items="listItem"
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
                        label="Tên giống thú cưng"
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
                          @click="setActionUpdateCategory(item)"
                          v-on="on"
                      >
                        mdi-pencil
                      </v-icon
                      >
                    </template>
                    <span> Sửa </span>
                  </v-tooltip>

                  <!--xóa-->
                  <v-tooltip bottom
                  >
                    <template v-slot:activator="{ on }">
                      <v-icon
                          class="mr-2"
                          @click="askForDeleteItem(item)"
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
        :dataItem="dataItemUpdateCategory"
        :open="openUpdateCategory"
        @toggle="openUpdateCategory = !openUpdateCategory"
        @success="getListItems"
    ></Update>
    <Delete
        :open="openDelete"
        :check="true"
        :alert-msg="message_noti"
        @toggle="openDelete = !openDelete"
        @OK="deleteCategory"
    />
  </div>
</template>
<script>
import { isNullOrEmpty } from "@/utils/validators";
import apiConfig from "@/apiConfig";
import Insert from "../../components/caterory/insert.vue";
import Update from "../../components/caterory/update.vue";
import Delete from "../../components/caterory/delete.vue";
import axiosInstance from "../../axiosInstance";


export default {
  name: 'CategoryPage',
  components: {
    Insert,
    Update,
    Delete,
  },
  data() {
    return {
      openDialogInsert: false,
      openDelete: false,
      dataItem: {},
      openDialogDetail: false,
      message_noti: '',
      openDeleteDialog: false,
      openEditDialog: false,
      startIndex: 1,
      page: 1,
      pageCount: null,
      pageSize: 50,
      total_item: 0,
      customPage: 1,
      listItem: [],
      id: null,
      addBtn: false,
      deleteBtn: false,
      sorted: null,
      name: null,
      openLoading: false,
      sortAsc: true,
      valueSort: null,
      dataItemUpdateCategory: {},
      openUpdateCategory: false,
      baseURL: axiosInstance.defaults.baseURL,

    }
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
          text: 'Hình ảnh',
          sortable: false,
          value: 'image',
          width: '4%',
          align: 'center'
        },
        {
          text: 'Tên giống thú cưng',
          sortable: false,
          value: 'name',
          width: '4%',
          align: 'center'
        },

        {
          text: 'Mô tả',
          sortable: false,
          value: 'description',
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
          text: 'Chức năng',
          value: 'action',
          sortable: false,
          align: 'center',
          width: '1%'
        }
      ]
    }
  },

  watch: {},

  mounted() {
    this.initialize()

  },

  methods: {
    searchBySort(value, type) {
      this.valueSort = value
      this.sortAsc = type
      this.getListItems()
    },
    setActionUpdateCategory(item) {
      this.dataItemUpdateCategory = item
      this.openUpdateCategory = true
    },
    reset() {
      this.active = null
    },


    getItemIndex(item) {
      return (this.page - 1) * this.pageSize + this.listItem.indexOf(item) + 1
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
    getListItems() {
      const payload = {
        name: this.name,
      };
      const data = {
        params: {
          ...payload,
        },
      };
      apiConfig.getAllCategory(data).then((res) => {
        if (res.status === 200) {
          this.listItem = res.data.category;
        }
      });
    },

    searchValidate() {
      this.search()
    },

    searchEmpty() {
      setTimeout(() => {
        if (isNullOrEmpty(this.name)) {
          this.search()
        }
      }, 10)
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

    async deleteCategory() {
      try {
        const response = await apiConfig.deleteCategory(this.id);
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

    askForDeleteItem(item) {
      this.id = item.id;
      this.openDelete = true;
      this.message_noti = `Bạn có xác nhận xóa bản ghi không?`;
    },

  }
}
</script>
