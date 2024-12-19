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
       Sửa giống loài
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
              Tên giống loài(<span class="red--text">*</span>)</span
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
              Mô tả</span
            >
            <v-text-field
                class="pt-1"
                outlined
                dense
                v-model="description"
                :error-messages="descriptionError"
                @input="descriptionError = []"
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
            <span class="fw-500">Hình ảnh</span>
<!--            <v-file-input-->
<!--                ref="fileInput"-->
<!--                outlined-->
<!--                accept="image/*"-->
<!--                @change="handleImage"-->
<!--            ></v-file-input>-->
            <!-- Thêm thẻ img để hiển thị ảnh -->
            <div v-if="picturePreview" style="margin-top: 10px;">
              <img
                  :src="picturePreview"
                  alt="Hình ảnh"
                  style="max-width: 100%; max-height: 200px; border: 1px solid #ccc; border-radius: 5px;"
              />
            </div>
          </v-col>

        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions style="position: sticky; bottom: 0; background: #f6f9ff; padding-right: 2rem; padding-top: 10px; padding-bottom: 10px;">
        <v-spacer></v-spacer>
        <v-btn class="text-none primary ma" depressed @click="checkValidate()"
        ><span class="caption-btn">Lưu</span>
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
import { isNullOrEmpty } from "@/utils/validators";
import axiosInstance from "../../axiosInstance";

export default {
  name: 'UpdateCategory',
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
  components: {

  },
  data() {
    return {
      name: null,
      nameError: [],
      descriptionError: [],
      description: null,
      status: 1,
      openLoading: false,
      statusList: [
        {text: 'Mở bán', value: 1},
        {text: 'Đừng bán', value: 2},
      ],
      slug: null,
      picture: null,
      picturePreview: null, // URL để hiển thị ảnh preview
      baseURL: axiosInstance.defaults.baseURL,
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
          description: this.description,
          status: this.status,
          slug: this.slug,
          image: this.picture,
        }
        // const formData = new FormData();
        // formData.append('name', this.name);
        // formData.append('description', this.description);
        // formData.append('status', this.status);
        // formData.append('slug', this.slug);
        // formData.append('image', this.picture);

        const response = await apiConfig.updateCategory(id, formData);
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
    reset() {
      this.name = null;
      this.nameError = [];
      this.description = null;
      this.descriptionError = [];
      this.status = null;
      this.picture = null;
      this.slug = null;
      // this.$refs.fileInput.reset();
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
        this.name = this.dataItem.name
        this.description = this.dataItem.description
        this.status = this.dataItem.status
        this.slug = this.dataItem.slug
        this.picture = null; // Reset ảnh mới
        this.picturePreview = this.dataItem.image
            ? `${this.baseURL}/${this.dataItem.image}`
            : null; // URL của ảnh từ dữ liệu

      }
    },
  },
}
</script>
