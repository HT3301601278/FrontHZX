<template>
    <div class="login-view">
      <h2>{{ isLogin ? '登录' : '注册' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="username">用户名：</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div>
          <label for="password">密码：</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div v-if="!isLogin">
          <label for="email">邮箱：</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <button type="submit">{{ isLogin ? '登录' : '注册' }}</button>
      </form>
      <p>
        {{ isLogin ? '还没有账号？' : '已有账号？' }}
        <a href="#" @click.prevent="toggleMode">{{ isLogin ? '注册' : '登录' }}</a>
      </p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'LoginView',
    setup() {
      const store = useStore();
      const router = useRouter();
      const username = ref('');
      const password = ref('');
      const email = ref('');
      const isLogin = ref(true);
      const error = ref('');

      const handleSubmit = async () => {
        try {
          if (isLogin.value) {
            await store.dispatch('user/login', { username: username.value, password: password.value });
          } else {
            await store.dispatch('user/register', { username: username.value, password: password.value, email: email.value });
          }
          router.push('/dashboard');
        } catch (err) {
          error.value = typeof err === 'string' ? err : '发生错误，请稍后再试';
        }
      };

      const toggleMode = () => {
        isLogin.value = !isLogin.value;
        error.value = '';
      };

      return {
        username,
        password,
        email,
        isLogin,
        error,
        handleSubmit,
        toggleMode
      };
    }
  };
  </script>
  
  <style scoped>
  .login-view {
    max-width: 300px;
    margin: 0 auto;
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
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>