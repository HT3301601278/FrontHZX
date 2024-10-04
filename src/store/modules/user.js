import axios from 'axios';

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
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/api/login', credentials);
        commit('SET_USER', response.data.user);
        commit('SET_TOKEN', response.data.token);
        return response.data.user;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await axios.post('/api/register', userData);
        commit('SET_USER', response.data.user);
        commit('SET_TOKEN', response.data.token);
        return response.data.user;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
    async updateProfile({ commit }, userData) {
      try {
        const response = await axios.put('/api/user/profile', userData);
        commit('SET_USER', response.data);
        return response.data;
      } catch (error) {
        console.error('Profile update error:', error);
        throw error;
      }
    },
    logout({ commit }) {
      commit('CLEAR_USER');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },
};