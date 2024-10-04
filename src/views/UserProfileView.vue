<template>
    <div class="user-profile-view">
      <h2>用户信息</h2>
      <div v-if="user">
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
          <div>
            <label for="password">新密码：</label>
            <input id="password" v-model="editedUser.password" type="password">
          </div>
          <div>
            <label for="confirmPassword">确认新密码：</label>
            <input id="confirmPassword" v-model="confirmPassword" type="password">
          </div>
          <button type="submit">保存</button>
          <button type="button" @click="cancelEditing">取消</button>
        </form>
      </div>
      <div v-else>
        <p>请先登录以查看用户信息。</p>
        <router-link to="/login">去登录</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'UserProfileView',
    setup() {
      const store = useStore();
      const user = computed(() => store.state.user.currentUser);
      const isEditing = ref(false);
      const editedUser = ref({});
      const confirmPassword = ref('');
  
      const startEditing = () => {
        isEditing.value = true;
        editedUser.value = { ...user.value };
      };
  
      const cancelEditing = () => {
        isEditing.value = false;
      };
  
      const updateProfile = async () => {
        if (editedUser.value.password && editedUser.value.password !== confirmPassword.value) {
          alert('两次输入的密码不一致');
          return;
        }
        try {
          await store.dispatch('user/updateProfile', editedUser.value);
          isEditing.value = false;
          alert('更新成功');
        } catch (error) {
          alert(error.message || '更新失败');
        }
      };
  
      return {
        user,
        isEditing,
        editedUser,
        confirmPassword,
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