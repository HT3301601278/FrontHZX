import axios from 'axios';

export default {
  namespaced: true,
  state: {
    devices: [],
  },
  mutations: {
    SET_DEVICES(state, devices) {
      state.devices = devices;
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
        const response = await axios.get('/api/devices');
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
  },
  getters: {
    getDevices: (state) => state.devices,
  },
};