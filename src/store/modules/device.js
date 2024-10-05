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
        console.log('API response:', response.data);
        // 检查每个设备是否有id属性
        response.data.forEach((device, index) => {
          if (!device.id) {
            console.error(`Device at index ${index} from API has no id:`, device);
          }
        });
        commit('SET_DEVICES', response.data);
      } catch (error) {
        console.error('Error fetching devices:', error);
        throw error;
      }
    },
    async addDevice({ commit }, deviceData) {
      try {
        const response = await axios.post(`${API_URL}/devices`, deviceData);
        commit('ADD_DEVICE', response.data);
        return response.data;
      } catch (error) {
        console.error('Error adding device:', error);
        throw error;
      }
    },
    async deleteDevice({ commit }, deviceId) {
      console.log('Store: Deleting device with ID:', deviceId);
      try {
        console.log('Store: Sending DELETE request to:', `${API_URL}/devices/${deviceId}`);
        await axios.delete(`${API_URL}/devices/${deviceId}`);
        console.log('Store: DELETE request successful');
        commit('REMOVE_DEVICE', deviceId);
        return '设备删除成功';
      } catch (error) {
        console.error('Store: Error deleting device:', error);
        throw error;
      }
    },
    async toggleDeviceStatus({ commit }, deviceId) {
      try {
        // 假设我们有一个toggleDeviceStatus API
        const response = await axios.post(`${API_URL}/devices/${deviceId}/toggle`);
        commit('UPDATE_DEVICE', response.data);
        return response.data;
      } catch (error) {
        console.error('Error toggling device status:', error);
        throw error;
      }
    },
  },
  getters: {
    getDevices: (state) => state.devices,
    getDeviceById: (state) => (id) => state.devices.find(device => device.id === id),
  },
};