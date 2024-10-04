<template>
    <div class="device-management-view">
      <h2>设备管理</h2>
      <div v-if="error" class="error-message">{{ error }}</div>
      <button @click="showAddDeviceForm = true">添加新设备</button>
      <DeviceList 
        :devices="devices" 
        @delete-device="deleteDevice"
        @view-device="viewDeviceDetails"
      />
      
      <div v-if="showAddDeviceForm" class="add-device-form">
        <h3>添加新设备</h3>
        <form @submit.prevent="addDevice">
          <input v-model="newDevice.name" placeholder="设备名称" required>
          <input v-model="newDevice.location" placeholder="设备位置" required>
          <button type="submit">添加</button>
          <button type="button" @click="showAddDeviceForm = false">取消</button>
        </form>
      </div>

      <div v-if="selectedDevice" class="device-details">
        <h3>设备详情</h3>
        <p><strong>名称：</strong>{{ selectedDevice.name }}</p>
        <p><strong>位置：</strong>{{ selectedDevice.location }}</p>
        <p><strong>状态：</strong>{{ selectedDevice.status ? '开启' : '关闭' }}</p>
        <button @click="toggleDeviceStatus(selectedDevice)">
          {{ selectedDevice.status ? '关闭设备' : '开启设备' }}
        </button>
        <button @click="selectedDevice = null">关闭</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import DeviceList from '@/components/DeviceList.vue';
  
  export default {
    name: 'DeviceManagementView',
    components: {
      DeviceList
    },
    setup() {
      const store = useStore();
      const devices = ref([]);
      const showAddDeviceForm = ref(false);
      const newDevice = ref({ name: '', location: '' });
      const selectedDevice = ref(null);

      const fetchDevices = async () => {
        try {
          await store.dispatch('device/fetchDevices');
          devices.value = store.getters['device/getDevices'];
        } catch (error) {
          console.error('Failed to fetch devices:', error);
          // 显示错误消息给用户
          // 这里可以使用一个全局的错误处理机制，比如 Vuex 中的一个 mutation
          store.commit('SET_ERROR', '获取设备列表失败，请稍后再试');
        }
      };

      onMounted(async () => {
        await fetchDevices();
      });

      const addDevice = async () => {
        await store.dispatch('device/addDevice', newDevice.value);
        devices.value = store.getters['device/getDevices'];
        showAddDeviceForm.value = false;
        newDevice.value = { name: '', location: '' };
      };

      const deleteDevice = async (deviceId) => {
        await store.dispatch('device/deleteDevice', deviceId);
        devices.value = store.getters['device/getDevices'];
      };

      const viewDeviceDetails = (device) => {
        selectedDevice.value = device;
      };

      const toggleDeviceStatus = async (device) => {
        await store.dispatch('device/toggleDeviceStatus', device.id);
        selectedDevice.value = store.getters['device/getDeviceById'](device.id);
      };

      return {
        devices,
        showAddDeviceForm,
        newDevice,
        selectedDevice,
        addDevice,
        deleteDevice,
        viewDeviceDetails,
        toggleDeviceStatus
      };
    }
  };
  </script>
  
  <style scoped>
  .device-management-view {
    padding: 20px;
  }
  
  .add-device-form, .device-details {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  form input {
    display: block;
    margin-bottom: 10px;
    padding: 5px;
    width: 100%;
  }
  
  button {
    margin-right: 10px;
  }
  </style>