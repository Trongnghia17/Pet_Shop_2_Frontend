<template>
  <div>
    <div class="title">
    <h1>Danh sách thú cưng</h1>
    <v-btn
            class="gradient-button"
            @click="popupCreate"
          >
            <v-icon >mdi-plus</v-icon>
            <span >Thêm thú cưng</span>
          </v-btn>
      </div>
    <table>
      <thead>
        <tr>
          <th style="width: 10%;">Giống loài</th>
          <th>Tên</th>
          <th>Miêu tả</th>
          <th>Ảnh</th>
          <th style="width: 10%;">Trạng thái</th>
          <th class="big-col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in pets" :key="category.id">
          <td>{{ category.species }}</td>
          <td>{{ category.name }}</td>
          <td>{{ category.description }}</td>
          <td>{{ category.image }}</td>
          <td>{{ category.status }}</td>
          <td class="big-col">
            <button @click="editPet(category.id)"><v-icon>mdi-pencil</v-icon></button>
            <button @click="deletePet(category.id)"><v-icon>mdi-delete</v-icon></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import apiClient from '@/api.js';

export default {
  name: 'PetPage',
  data() {
    return {
      pets: [
        {
          id: 1,
          species: 'Chó',
          name: 'Corgi',
          description: 'Chó Corgi xinh xắn',
          image: 'https://images.unsplash.com/photo-1560807707-9b1b5e13e7f2',
          status: 'Đã bán'
        },
        {
          id: 2,
          species: 'Mèo',
          name: 'Mèo Anh',
          description: 'Mèo Anh đen',
          image: 'https://images.unsplash.com/photo-1560807707-9b1b5e13e7f2',
          status: 'Còn hàng'
        }
      ]
    };
  },
};
</script>
<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #2c3e50;
  text-align: left;
  color: white;
}
.big-col {
  width: 30%;
}
</style>