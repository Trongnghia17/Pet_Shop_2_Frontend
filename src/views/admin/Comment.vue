<template>
  <div>
    <div
        style="font-size: 1.3rem; font-weight: 500; padding-bottom: 2rem  "
    >
      Bình luận
    </div>
    <v-row class="ma-0">

    </v-row>


  </div>
</template>

<script>

import axiosInstance from "../../axiosInstance";
import apiConfigComment from "../../store/comment";


export default {
  name: 'CommentPage',
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
      apiConfigComment.comment().then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res);
        }
      });
    },





  }
};
</script>
<style scoped>
</style>