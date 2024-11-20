<template>
  <div class="admin-container">
    <div class="sidebar">
      <ul class="admin-list">
        <li class="admin-block"><a href="#">Danh mục</a></li>
        <li class="admin-block"><a href="#">Users</a></li>
        <li class="admin-block"><a href="#">Settings</a></li>
        <li class="admin-block"><a href="#">Reports</a></li>
        <li class="admin-block"><a href="#">Logs</a></li>
      </ul>
    </div>
    <div class="main-content">
      <h1>Welcome to Admin</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminPage"
};
</script>

<style scoped>
.admin-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
}

.admin-list {
  list-style-type: none;
  padding: 0;
}

.admin-block {
  margin: 10px 0;
}

.admin-block a {
  color: white;
  text-decoration: none;
}

.admin-block a:hover {
  text-decoration: underline;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>