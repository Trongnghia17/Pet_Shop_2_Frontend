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
        Sửa thông tin thú cưng
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
          <v-col cols="6" style="padding-right: 10px ; padding-left: 10px">
            <span class="fw-500">
                  Trạng thái
                 </span>
            <v-autocomplete
                class="pt-1"
                v-model="status"
                :items="statusList"
                item-text="text"
                outlined
                dense
            ></v-autocomplete>
          </v-col>
          <v-col cols="6" style="padding-right: 10px ; padding-left: 10px">
             <span class="fw-500">
                  Hình ảnh
                 </span>
            <!-- <v-file-input
                ref="fileInput"
                outlined
                accept="image/*"
                @change="handleImage"
            ></v-file-input> -->
            <div v-if="picturePreview" style="margin-top: 10px;">
              <img
                  :src="picturePreview"
                  alt="Hình ảnh"
                  style="max-width: 100%; max-height: 200px; border: 1px solid #ccc; border-radius: 5px;"
              />
            </div>
          </v-col>
          <v-col cols="6" style="padding-right: 10px ; padding-left: 10px">
        <v-checkbox
          v-model="featured"
          :item="featuredList"
          label="Sản phẩm nổi bật"
          item-text="text"
        ></v-checkbox>
      </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions
          style="position: sticky; bottom: 0; background: #f6f9ff; padding-right: 2rem; padding-top: 10px; padding-bottom: 10px;">
        <v-spacer></v-spacer>
        <v-btn class="text-none primary ma" depressed @click="checkValidate()"
        ><span class="caption-btn">Lưu</span>
        </v-btn
        >
        <v-btn class="text-none primary ma" depressed @click="reset()"
        ><span class="caption-btn">Nhập lại</span>
        </v-btn
        >
        <v-btn class="text-none secondary ma" depressed @click="toggle">
          <span class="caption-btn">Hủy</span>
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>
<script>
import apiConfig from '@/apiConfig';
import {isNullOrEmpty} from '@/utils/validators';
import axiosInstance from "../../axiosInstance";


export default {
  name: 'UpdateProduct',
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
      picturePreview: null,
      picture: null,
      slug: null,
      listItemCategory: [],
      baseURL: axiosInstance.defaults.baseURL,
      statusList: [
        {text: 'Mở bán', value: 1},
        {text: 'Đừng bán', value: 2},
      ],
      featuredList: [
        {text: 'Có', value: 1},
        {text: 'Không', value: 0},
      ],
      status: null,
      featured: false,
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
  mounted() {
    this.getListItems()
  },
  methods: {
    handleImage(file) {
      if (file) {
        this.picture = file;
        this.picturePreview = URL.createObjectURL(file);
      } else {
        this.picture = null;
        this.picturePreview = null;
      }
    },
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
    async save() {
      try {
        let id = this.dataItem.id;
        const formData = {
          name: this.name,
          brand: this.brand,
          selling_price: this.sellingPrice,
          original_price: this.originalPrice,
          quantity: this.quantity,
          category_id: this.category_id,
          slug: this.slug,
          image: this.picture,
          status: this.status,
          featured: this.featured,
        }
        const response = await apiConfig.updateProduct(id, formData);
        if (response.data.status === 200) {
          this.$toast.success(response.data.message);
          this.toggle();
          this.$emit('success');
        } else {
          this.$toast.warning(response.data.message);
        }
      } catch (error) {
        console.error(error);
        this.$toast.error('An error occurred, please try again');
      }
    },
    getListItems() {
      apiConfig.getAllCategory().then((res) => {
        if (res.status === 200) {
          this.listItemCategory = res.data.category;
        }
      });
    },
    toggle() {
      this.reset();
      this.$emit('toggle')
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
      this.picture = null;
      this.status = null;
      this.featured = false;
    },
  },
  watch: {
    name() {
      this.slug = this.generatedSlug;
    },
    open(value) {
      if (value) {
        this.name = this.dataItem.name
        this.brand = this.dataItem.brand
        this.sellingPrice = this.dataItem.selling_price
        this.originalPrice = this.dataItem.original_price
        this.quantity = this.dataItem.quantity
        this.category_id = this.dataItem.category_id
        this.slug = this.dataItem.slug
        this.status = this.dataItem.status
        this.picture = null;
        this.featured = this.dataItem.featured;
        this.picturePreview = this.dataItem.image
            ? `${this.baseURL}/${this.dataItem.image}`
            : null;

      }
    },

  }
};
</script>
