<template>
  <div>
    <div
        style="font-size: 1.3rem; font-weight: 500; padding-bottom: 2rem  "
    >
      Bình luận
    </div>
    <v-row class="ma-0">
      <v-col cols="12" class="pb-0 px-0">
        <v-card class="w-100" flat
        >
          <v-data-table
              :headers="headers"
              :items="listItemComment"
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


            <template v-slot:[`item.stt`]="{ item }">
              <div class="">
                {{ getItemIndex(item) }}
              </div>
            </template>
            <template v-slot:[`item.name`]="{ item }">
              <div>
                {{ item.product.name }}
              </div>
            </template>

            <template v-slot:[`item.image`]="{ item }">
              <img
                  v-if="item.product.image"
                  :src="`${baseURL}/${item.product.image}`"
                  width="50px"
              />
            </template>

          </v-data-table>


        </v-card>
      </v-col>
    </v-row>


  </div>
</template>

<script>

import axiosInstance from "../../axiosInstance";
import apiConfigComment from "../../store/comment";


export default {
  name: 'CommentPage',
  components: {},
  data() {
    return {
      page: 1,
      pageCount: null,
      pageSize: 50,
      listItemComment: [],
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
          text: 'Hình ảnh',
          sortable: false,
          value: 'image',
          align: 'center'
        },
        {
          text: 'Tên sản phẩm',
          sortable: false,
          value: 'name',
          align: 'center'
        },
        {
          text: 'Bình luận',
          sortable: false,
          value: 'comment',
          align: 'center'
        },


      ]
    }
  },
  watch: {},

  mounted() {
    this.getListOrder()

  },
  methods: {
    getListOrder() {
      apiConfigComment.comment().then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.listItemComment = res.data.comment;
          console.log(res);
        }
      });
    },
    getItemIndex(item) {
      return (this.page - 1) * this.pageSize + this.listItemComment.indexOf(item) + 1
    },



  }
};
</script>
<style scoped>
</style>