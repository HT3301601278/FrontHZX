<template>
    <div class="user-profile-view">
      <h2>用户信息</h2>
      <div v-if="!isEditing">
        <p><strong>用户名：</strong>{{ user.username }}</p>
        <p><strong>邮箱：</strong>{{ user.email }}</p>
        <button @click="startEditing">编辑信息</button>
      </div>
      <form v-else @submit.prevent="updateProfile">
        <div>
          <label for="username">用户名：</label>
          <input id="username" v-model="editedUser.username" required>
        </div>
        <div>
          <label for="email">邮箱：</label>
          <input id="email" v-model="editedUser.email" type="email" required>
        </div>
        <button type="submit">保存</button>
        <button type="button" @click="cancelEditing">取消</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'UserProfileView',
    setup() {
      const store = useStore();
      const isEditing = ref(false);
      const user = computed(() => store.getters['user/getUser']);
      const editedUser = ref({ ...user.value });
  
      const startEditing = () => {
        isEditing.value = true;
        editedUser.value = { ...user.value };
      };
  
      const cancelEditing = () => {
        isEditing.value = false;
      };
  
      const updateProfile = async () => {
        await store.dispatch('user/updateProfile', editedUser.value);
        isEditing.value = false;
      };
  
      return {
        user,
        isEditing,
        editedUser,
        startEditing,
        cancelEditing,
        updateProfile
      };
    }
  };
  </script>
  
  <style scoped>
  .user-profile-view {
    padding: 20px;
  }
  
  form div {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 5px;
  }
  
  button {
    margin-right: 10px;
  }
  </style>