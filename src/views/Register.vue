<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="elevation-2">
          <v-row>
            <v-col cols="12" md="6">
              <v-img
                  src="@/assets/gpet.jpg"
                  alt="Logo"
                  class="rounded-t"
                  contain
                  height="250px"
              ></v-img>
            </v-col>
            <v-col cols="12" md="6">
              <v-card-title class="text-center">
                <h2 class="text-uppercase">Đăng ký</h2>
              </v-card-title>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                      v-model="registerInput.name"
                      label="Họ và tên"
                      outlined
                      dense
                      :error-messages="errorList.name"
                  ></v-text-field>
                  <v-text-field
                      v-model="registerInput.email"
                      label="Email"
                      outlined
                      dense
                      :error-messages="errorList.email"
                  ></v-text-field>
                  <v-text-field
                      v-model="registerInput.password"
                      label="Mật khẩu"
                      type="password"
                      outlined
                      dense
                      :error-messages="errorList.password"
                  ></v-text-field>
                  <v-btn
                      block
                      color="primary"
                      class="mt-4"
                      @click="registerSubmit"
                  >
                    Đăng ký
                  </v-btn>
                </v-form>
                <v-row class="mt-4" justify="center">
                  <p>Bạn đã có tài khoản rồi?</p>
                  <v-btn text to="/login" class="ml-2">
                    Đăng nhập
                  </v-btn>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";


export default {
  name: 'RegisterPage',
  data() {
    return {
      registerInput: {
        name: "",
        email: "",
        password: "",
      },
      errorList: {},
    };
  },
  methods: {
    async registerSubmit() {
      try {
        const response = await axios.post("/api/register", this.registerInput);
        if (response.data.status === 200) {
          console.log(response)

          this.$router.push("/");
        } else {
          console.log(response);
          console.log(response.data.validation_errors);
          this.errorList = response.data.validation_errors;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.v-container {
  max-width: 800px;
}
</style>
