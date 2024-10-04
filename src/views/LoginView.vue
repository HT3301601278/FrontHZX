<template>
    <div class="login-container">
      <div class="login-box">
        <h2 class="title">{{ isLogin ? '登录' : '注册' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <label for="username">用户名：</label>
            <input type="text" id="username" v-model="username" required>
          </div>
          <div class="input-group">
            <label for="password">密码：</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <div v-if="!isLogin" class="input-group">
            <label for="email">邮箱：</label>
            <input type="email" id="email" v-model="email" required>
          </div>
          <button type="submit" class="submit-btn">{{ isLogin ? '登录' : '注册' }}</button>
        </form>
        <p class="toggle-mode">
          {{ isLogin ? '还没有账号？' : '已有账号？' }}
          <a href="#" @click.prevent="toggleMode">{{ isLogin ? '注册' : '登录' }}</a>
        </p>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
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
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f8ff;
}

.login-box {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.title {
  color: #1e90ff;
  text-align: center;
  margin-bottom: 1.5rem;
}

.input-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4a4a4a;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #1e90ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #187bcd;
}

.toggle-mode {
  text-align: center;
  margin-top: 1rem;
}

.toggle-mode a {
  color: #1e90ff;
  text-decoration: none;
}

.error {
  color: #ff4500;
  text-align: center;
  margin-top: 1rem;
}
</style>