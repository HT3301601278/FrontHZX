<template>
    <div class="device-management-view">
      <h2>设备管理</h2>
      <button @click="showAddDeviceForm = true">添加新设备</button>
      <DeviceList :devices="devices" @delete-device="deleteDevice" />
      
      <div v-if="showAddDeviceForm" class="add-device-form">
        <h3>添加新设备</h3>
        <form @submit.prevent="addDevice">
          <input v-model="newDevice.name" placeholder="设备名称" required>
          <input v-model="newDevice.type" placeholder="设备类型" required>
          <button type="submit">添加</button>
          <button type="button" @click="showAddDeviceForm = false">取消</button>
        </form>
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
      const newDevice = ref({ name: '', type: '' });
  
      onMounted(async () => {
        await store.dispatch('device/fetchDevices');
        devices.value = store.getters['device/getDevices'];
      });
  
      const addDevice = async () => {
        await store.dispatch('device/addDevice', newDevice.value);
        devices.value = store.getters['device/getDevices'];
        showAddDeviceForm.value = false;
        newDevice.value = { name: '', type: '' };
      };
  
      const deleteDevice = async (deviceId) => {
        await store.dispatch('device/deleteDevice', deviceId);
        devices.value = store.getters['device/getDevices'];
      };
  
      return {
        devices,
        showAddDeviceForm,
        newDevice,
        addDevice,
        deleteDevice
      };
    }
  };
  </script>
  
  <style scoped>
  .device-management-view {
    padding: 20px;
  }
  
  .add-device-form {
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