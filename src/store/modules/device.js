import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export default {
  namespaced: true,
  state: {
    devices: [],
  },
  mutations: {
    SET_DEVICES(state, devices) {
      state.devices = devices;
    },
    UPDATE_DEVICE(state, updatedDevice) {
      const index = state.devices.findIndex(device => device.id === updatedDevice.id);
      if (index !== -1) {
        state.devices.splice(index, 1, updatedDevice);
      }
    },
    ADD_DEVICE(state, device) {
      state.devices.push(device);
    },
    REMOVE_DEVICE(state, deviceId) {
      state.devices = state.devices.filter(device => device.id !== deviceId);
    },
  },
  actions: {
    async fetchDevices({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/devices`);
        commit('SET_DEVICES', response.data);
      } catch (error) {
        console.error('Error fetching devices:', error);
        throw error;
      }
    },
    async addDevice({ commit }, deviceData) {
      try {
        const response = await axios.post('/api/devices', deviceData);
        commit('ADD_DEVICE', response.data);
        return response.data;
      } catch (error) {
        console.error('Error adding device:', error);
        throw error;
      }
    },
    async deleteDevice({ commit }, deviceId) {
      try {
        await axios.delete(`/api/devices/${deviceId}`);
        commit('REMOVE_DEVICE', deviceId);
      } catch (error) {
        console.error('Error deleting device:', error);
        throw error;
      }
    },
    async toggleDeviceStatus({ commit }, deviceId) {
      // 假设我们有一个toggleDeviceStatus API
      const updatedDevice = await toggleDeviceStatus(deviceId);
      commit('UPDATE_DEVICE', updatedDevice);
    },
  },
  getters: {
    getDevices: (state) => state.devices,
    getDeviceById: (state) => (id) => state.devices.find(device => device.id === id),
  },
};