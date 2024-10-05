<template>
    <div class="user-profile-view">
      <el-card class="profile-card">
        <template #header>
          <div class="card-header">
            <h2>用户信息</h2>
          </div>
        </template>
        <div v-if="user">
          <el-form v-if="!isEditing" label-width="80px">
            <el-form-item label="用户名">
              <span>{{ user.username }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ user.email }}</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="startEditing">编辑信息</el-button>
            </el-form-item>
          </el-form>
          <el-form v-else :model="editedUser" label-width="100px" @submit.prevent="updateProfile">
            <el-form-item label="用户名">
              <el-input v-model="editedUser.username" required></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="editedUser.email" type="email" required></el-input>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="editedUser.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码">
              <el-input v-model="confirmPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" native-type="submit">保存</el-button>
              <el-button @click="cancelEditing">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-else>
          <p>请先登录以查看用户信息。</p>
          <el-button type="primary" @click="$router.push('/login')">去登录</el-button>
        </div>
      </el-card>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'UserProfileView',
    setup() {
      const store = useStore();
      const user = computed(() => store.getters['user/getUser']); // 修改这里
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
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f8ff;
  }

  .profile-card {
    width: 100%;
    max-width: 500px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .profile-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-header h2 {
    margin: 0;
    color: #1e90ff;
  }

  :deep(.el-card__header) {
    background-color: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
  }

  :deep(.el-button--primary) {
    background-color: #1e90ff;
    border-color: #1e90ff;
  }

  :deep(.el-button--primary:hover) {
    background-color: #187bcd;
    border-color: #187bcd;
  }

  :deep(.el-form-item__label) {
    color: #4a4a4a;
  }

  :deep(.el-input__inner) {
    border-color: #dcdfe6;
  }

  :deep(.el-input__inner:focus) {
    border-color: #1e90ff;
  }
  </style>