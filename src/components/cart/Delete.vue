<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <p>{{ message }}</p>
      <button @click="confirm">Xác nhận</button>
      <button @click="cancel">Hủy</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteConfirmation',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* Darker background for better focus */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it is above other elements */
}

.modal {
  background: white;
  padding: 30px; /* Increased padding for better spacing */
  border-radius: 10px; /* More rounded corners */
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Added shadow for depth */
  max-width: 400px; /* Limit the width for better readability */
  width: 90%; /* Responsive width */
}

.modal p {
  font-size: 16px; /* Increased font size for better readability */
  margin-bottom: 20px; /* Space between text and buttons */
}

.modal button {
  margin: 10px;
  padding: 10px 20px;
  cursor: pointer;
  border: none; /* Remove default border */
  border-radius: 5px; /* Rounded corners for buttons */
  background-color: #1abc9c; /* Primary button color */
  color: white; /* White text color */
  font-size: 14px; /* Font size for buttons */
  transition: background-color 0.3s; /* Smooth transition for hover effect */
}

.modal button:hover {
  background-color: #16a085; /* Darker shade on hover */
}

.modal button.cancel {
  background-color: #e74c3c; /* Different color for cancel button */
}

.modal button.cancel:hover {
  background-color: #c0392b; /* Darker shade on hover for cancel button */
}
</style>