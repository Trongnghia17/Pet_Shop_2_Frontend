<template>
  <div>
    <v-dialog
        :value="open"
        @keydown="$event.key === 'Escape' && toggle()"
        max-width="600"
        persistent
        scrollable
    >
      <v-card v-if="check">
        <v-card-title>
          <div class="text-center" style="width: 100%">{{ title }}</div>
          <v-btn
              @click="toggle"
              color="secondary"
              icon
              class="position-absolute-top-right"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="text-center">
          {{ alertMsg }}
        </v-card-text>
        <v-card-actions class="justify-center custom-card-actions">
          <v-btn
              style="margin-left: 150px !important; background: red ; color: white"
              depressed
              @click="OK"
              width="130"
          >Xác nhận
          </v-btn>
          <v-btn
              style="color: white; background: #515151 "
              depressed
              @click="toggle"
              width="130"
          >Hủy bỏ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'deleteDialog',
  data() {
    return {
      id: null,
    };
  },
  watch: {
    open(value) {
      if (value) {
        this.id = this.data.id;
      }
    },
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: 'Thông báo',
    },
    alertMsg: {
      type: String,
      default: 'Bạn có xác nhận xóa bản ghi không?',
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggle() {
      this.$emit('toggle');
      this.reset();
    },
    OK() {
      this.$emit('OK');
      this.toggle();
    },
    reset() {
      this.id = null;
    },
  },
};
</script>




