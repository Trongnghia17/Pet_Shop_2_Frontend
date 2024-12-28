<template>
  <div>
    <CardGlobal style="margin-right: 20px!important; margin-left: 20px!important;border-radius: 0px!important;">
      <div
          style="font-size: 1.3rem; font-weight: 500;"
          class="pa-1 primary--text"
      >
        Thống kê
      </div>
    </CardGlobal>
    <v-col class="ma-0">
      <v-row class="px-3">
        <v-col cols="12" md="3" class="d-flex">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-card
                  class="flex-grow-1 ma-3 pa-4"
                  style="border-radius: 16px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); border: 1px solid black;"
                  v-bind="attrs"
                  v-on="on"
              >
                <v-list-item>
                  <v-avatar size="56">
                    <v-icon style="color: #01BC63" large>mdi-cat</v-icon>
                  </v-avatar>
                  <v-list-item-content class="text-right">
                    <span class="overline caption-btn">Tổng số giống loài</span>
                    <v-list-item-title class="headline mb-1 text-right">
                      <span class="number-report">{{ category }}</span>
                    </v-list-item-title>
                    <v-divider></v-divider>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </template>
            <span>{{ category }} giống loài </span>
          </v-tooltip>
        </v-col>
        <v-col cols="12" md="3" class="d-flex">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-card
                  class="flex-grow-1 ma-3 pa-4"
                  style="border-radius: 16px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); border: 1px solid black;"
                  v-bind="attrs"
                  v-on="on"
              >
                <v-list-item>
                  <v-avatar size="56">
                    <v-icon large style="color: #01BC63">mdi-paw</v-icon>
                  </v-avatar>
                  <v-list-item-content class="text-right">
                    <span class="overline caption-btn">Tổng số thú cưng</span>
                    <v-list-item-title class="headline mb-1 text-right">
                      <span class="number-report">{{ product }}</span>
                    </v-list-item-title>
                    <v-divider></v-divider>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </template>
            <span>{{ product }} thú cưng</span>
          </v-tooltip>
        </v-col>

        <v-col cols="12" md="3" class="d-flex">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-card
                  class="flex-grow-1 ma-3 pa-4"
                  style="border-radius: 16px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); border: 1px solid black;"
                  v-bind="attrs"
                  v-on="on"
              >
                <v-list-item>
                  <v-avatar size="56">
                    <v-icon large style="color: #01BC63">mdi-plus-thick</v-icon>
                  </v-avatar>
                  <v-list-item-content class="text-right">
                    <span class="overline caption-btn">Tổng số đơn hàng</span>
                    <v-list-item-title class="headline mb-1 text-right">
                      <span class="number-report">{{ order }}</span>
                    </v-list-item-title>
                    <v-divider></v-divider>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </template>
            <span>{{ order  }} đơn hàng</span>
          </v-tooltip>
        </v-col>

        <v-col cols="12" md="3" class="d-flex">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-card
                  class="flex-grow-1 ma-3 pa-4"
                  style="border-radius: 16px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); border: 1px solid black;"
                  v-bind="attrs"
                  v-on="on"
              >
                <v-list-item>
                  <v-avatar size="56">
                    <v-icon style="color: #01BC63" large>mdi-account-multiple</v-icon>
                  </v-avatar>
                  <v-list-item-content class="text-right">
                    <span class="overline caption-btn">Tổng số bình luận </span>
                    <v-list-item-title class="headline mb-1 text-right">
                      <span class="number-report">{{ comment  }}</span>
                    </v-list-item-title>
                    <v-divider></v-divider>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </template>
            <span>{{ comment }} bình luận</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import apiDashboard from "../../store/dashboard";
export default {
  name: 'DashboardPage',
  data() {
    return {
      dashboard: null,
      category: null,
      product: null,
      order: null,
      comment: null,
    };
  },
  mounted() {
    this.getDashBoard();
  },
  components: {

  },
  computed: {

  },
  methods: {
    getDashBoard() {
      apiDashboard.getDashBoard()
          .then(response => {
            console.log(response);
            this.dashboard = response.data;
            this.category = response.data.categories,
            this.product = response.data.products;
            this.order = response.data.orders;
            this.comment = response.data.comments;
          })
          .catch(error => {
            console.error('Error fetching cart data:', error);
          });
    },

  },
};

</script>

