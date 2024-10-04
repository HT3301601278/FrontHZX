import { register, login } from '@/api/user';

export default {
  namespaced: true,
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    CLEAR_USER(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  actions: {
    async register({ commit }, userData) {
      try {
        const response = await register(userData);
        commit('SET_USER', response);
        commit('SET_TOKEN', response.token);
        return response;
      } catch (error) {
        console.error('Registration error:', error);
        throw error.response?.data || error.message || '注册失败';
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await login(credentials);
        commit('SET_USER', response);
        // 由于后端没有返回 token，我们可以使用用户 ID 作为临时的身份验证标识
        commit('SET_TOKEN', response.id.toString());
        return response;
      } catch (error) {
        console.error('Login error:', error);
        console.error('Error response:', error.response);
        console.error('Error message:', error.message);
        throw error.response?.data || error.message || '登录失败';
      }
    },
    logout({ commit }) {
      commit('CLEAR_USER');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
  },
};