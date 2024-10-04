import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || '注册失败';
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || '登录失败';
  }
};

// 新增的 updateUser 方法
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || '更新用户信息失败';
  }
};