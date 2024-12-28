<template>
  <div>
    <div
        style="font-size: 1.3rem; font-weight: 500; padding-bottom: 2rem  "
    >
      Danh sách đơn hàng
    </div>
    <v-row class="ma-0">

    </v-row>


  </div>
</template>

<script>

import axiosInstance from "../../axiosInstance";


export default {
  name: 'CartPage',
  components: {

  },
  data() {
    return {

      baseURL: axiosInstance.defaults.baseURL,
    };
  },
  computed: {

  },
  watch: {},

  mounted() {
    this.getListOrder()

  },
  methods:{

    getListOrder() {

      apiConfig.getAllProduct(data).then((res) => {
        console.log(res);

        if (res.status === 200) {
          this.listItemProduct = res.data.products;
        }
      });
    },





  }
};
</script>
<style scoped>
</style>