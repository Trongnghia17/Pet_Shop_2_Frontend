<template>
    <v-dialog
        :value="open"
        :max-width="1000"
        @keydown="$event.key === 'Escape' && toggle()"
        scrollable
        persistent
    >
      <v-card>
        <v-card-title class="border-title-dialog"  style="padding-left: 33px">
          Tạo mới thú cưng
          <v-btn
              @click="toggle"
              icon
              style="position: absolute; top: 0; right: 0"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pb-2">
          <v-row class="ma-0" no-gutters style="color: black">
            <v-col cols="6" style="padding-right: 10px ; padding-left: 10px">
              <span class="fw-500">
                Tên thú cưng(<span class="red--text">*</span>)</span
              >
              <v-text-field
                  class="pt-1"
                  outlined
                  dense
                  v-model="name"
                  :error-messages="nameError"
                  @input="nameError = []"
              ></v-text-field>
            </v-col>
            <v-col cols="6" style="padding-right: 10px ; padding-left: 10px">
              <span class="fw-500">
                Slug
              </span>
              <v-text-field
                  class="pt-1"
                  outlined
                  dense
                  v-model="slug"
                  readonly
              ></v-text-field>
            </v-col>
            <v-col cols="6" style="padding-right: 10px ; padding-left: 10px">
          <span class="fw-500">
            Thể loại
          </span>
          <v-autocomplete
                class="pt-1"
                v-model="category_id"
                :items="listItemCategory"
                outlined
                dense
                item-text="name"
                item-value="id"
            ></v-autocomplete>
        </v-col>
            <v-col cols="6" style="padding-right: 10px ; padding-left: 10px">
              <span class="fw-500">
                Thương hiệu</span
              >
              <v-text-field
                  class="pt-1"
                  outlined
                  dense
                  v-model="brand"
                  :error-messages="brandError"
                  @input="brandError = []"
              ></v-text-field>
            </v-col>
            <v-col cols="6" style="padding-right: 10px ; padding-left: 10px">
              <span class="fw-500">
                    Giá bán
                   </span>
             <v-text-field
                  class="pt-1"
                  outlined
                  dense
                  v-model="sellingPrice"
              ></v-text-field>
            </v-col>
            <v-col cols="6" style="padding-right: 10px ; padding-left: 10px">
              <span class="fw-500">
                    Giá gốc
                   </span>
             <v-text-field
                  class="pt-1"
                  outlined
                  dense
                  v-model="originalPrice"
              ></v-text-field>
            </v-col>
            <v-col cols="6" style="padding-right: 10px ; padding-left: 10px">
              <span class="fw-500">
                    Số lượng
                   </span>
             <v-text-field
                  class="pt-1"
                  outlined
                  dense
                  v-model="quantity"
              ></v-text-field>
            </v-col>
  
  <!--          <v-col cols="6" style="padding-right: 10px; padding-left: 10px">-->
  <!--            <span class="fw-500">Hình ảnh sản phẩm</span>-->
  <!--            <div-->
  <!--                style="border: 2px dashed rgb(152, 157, 255); border-radius: 10px;"-->
  <!--                @click="selectFileOpen"-->
  <!--            >-->
  <!--              <v-row-->
  <!--                  class="ma-0"-->
  <!--                  justify="center"-->
  <!--                  align="center"-->
  <!--                  style="height: 47px"-->
  <!--              >-->
  <!--                <v-col cols="12" class="d-flex justify-center py-0">-->
  <!--                  <v-btn icon>-->
  <!--                    <v-icon size="40" color="primary">mdi-upload</v-icon>-->
  <!--                  </v-btn>-->
  <!--                </v-col>-->
  
  <!--                <v-file-input-->
  <!--                    multiple-->
  <!--                    @change="inputFile"-->
  <!--                    accept="image/*"-->
  <!--                    class="d-none"-->
  <!--                    id="input_file_add"-->
  <!--                ></v-file-input>-->
  <!--              </v-row>-->
  <!--            </div>-->
  <!--            <div v-if="imagePreview" class="mt-2">-->
  <!--              <v-img :src="imagePreview" max-height="150" max-width="150" contain></v-img>-->
  <!--            </div>-->
  <!--          </v-col>-->
  
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions style="position: sticky; bottom: 0; background: #f6f9ff; padding-right: 2rem; padding-top: 10px; padding-bottom: 10px;">
          <v-spacer></v-spacer>
          <v-btn class="text-none primary" depressed @click="checkValidate()"
          ><span class="caption-btn">Lưu</span>
          </v-btn
          >
          <v-btn class="text-none primary" depressed @click="reset"
          ><span class="caption-btn">Nhập lại</span>
          </v-btn
          >
          <v-btn class="text-none secondary" depressed @click="toggle">
            <span class="caption-btn">Hủy</span>
          </v-btn>
        </v-card-actions>
  
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import apiConfig from '@/apiConfig';
  import { isNullOrEmpty } from "@/utils/validators";
  
  export default {
    name: 'InsertProduct',
    props: {
      open: {
        type: Boolean,
        required: true,
      },
    },
    components: {
  
    },
    data() {
      return {
        categoryList: [],
        category_id: null,
        name: null,
        nameError: [],
        brandError: [],
        brand: null,
        openLoading: false,
        sellingPrice: null,
        originalPrice: null,
        quantity: null,
        selectedFile: null,
        imagePreview: null,
        slug: null,
        listItemCategory: []
      }
    },
    computed: {
      generatedSlug() {
        const normalizeVietnamese = (str) => {
          return str
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd')
              .replace(/Đ/g, 'D');
        };
  
        return this.name
            ? normalizeVietnamese(this.name)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '')
            : '';
      },
    },
    mounted(){
     this.getListItems()
    },
    methods: {
 
      checkValidate() {
        let hasError = false;
  
        if (isNullOrEmpty(this.name)) {
          hasError = true;
          this.nameError = ['Thông tin tên không được để trống'];
          return;
        }
  
        if (!hasError) {
          this.save();
        }
      },
      selectFileOpen() {
        document.getElementById('input_file_add').click();
      },
      inputFile(event) {
        const file = event.target.files[0];
        if (file) {
          this.selectedFile = file;
          this.imagePreview = URL.createObjectURL(file);
        }
      },
      getListItems(){
        apiConfig.getAllCategory().then((res) => {
        if (res.status === 200) {
          console.log(res.data.category);
          
          this.listItemCategory = res.data.category;
        }
      });
    },
      async save() {
        try {
          const formData = new FormData();
          formData.append('name', this.name);
          formData.append('brand', this.brand);
          formData.append('selling_price', this.sellingPrice);
          formData.append('original_price', this.originalPrice);
          formData.append('slug', this.slug);
          formData.append('quantity', this.quantity);
          formData.append('category_id', this.category_id);
          // if (this.selectedFile) {
          //   formData.append('image', this.selectedFile);
          // }
  
          const response = await apiConfig.addProduct(formData);
          console.log(response);
          if (response.data.status === 200) {
            this.$toast.success(response.data.message);
            this.reset();
            this.$emit('success'); // Trigger sự kiện thành công
          } else {
            this.$toast.warning(response.data.message);
          }
        } catch (error) {
          console.error(error);
          this.$toast.error('Có lỗi xảy ra, vui lòng thử lại');
        }
      },
      reset() {
        this.name = null;
        this.nameError = [];
        this.brand = null;
        this.brandError = [];
        this.sellingPrice = null;
        this.originalPrice = null;
        this.quantity = null;
        this.selectedFile = null;
        this.imagePreview = null;
        this.slug = null;
        this.category_id = null;
      },
  
      toggle() {
        this.reset()
        this.$emit('toggle')
      },
    },
    watch: {
      name() {
        this.slug = this.generatedSlug;
      },
      open(value) {
        if (value) {
          setTimeout(() => {
            this.reset()
          }, 300)
        }
      },
    },
  }
  </script>
  <style scoped>
  .text-none{
    margin-right: 30px;
  }
  </style>