<template>
  <div class="device-management-view">
    <el-card class="device-card">
      <template #header>
        <div class="card-header">
          <h2>设备管理</h2>
          <el-button type="primary" @click="showAddDeviceDialog">添加设备</el-button>
        </div>
      </template>
      <DeviceList :devices="devices" @delete-device="deleteDevice" @view-device="viewDeviceDetails" />
    </el-card>

    <!-- 添加设备对话框 -->
    <el-dialog v-model="addDeviceDialogVisible" title="添加设备" width="30%">
      <el-form :model="newDevice" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="newDevice.name"></el-input>
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="newDevice.location"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDeviceDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addDevice">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 设备详情对话框 -->
    <el-dialog v-model="deviceDetailsDialogVisible" title="设备详情" width="30%">
      <p><strong>名称：</strong>{{ selectedDevice.name }}</p>
      <p><strong>位置：</strong>{{ selectedDevice.location }}</p>
    </el-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import DeviceList from '@/components/DeviceList.vue';

export default {
  name: 'DeviceManagementView',
  components: {
    DeviceList
  },
  setup() {
    const store = useStore();
    const devices = ref([]);
    const addDeviceDialogVisible = ref(false);
    const deviceDetailsDialogVisible = ref(false);
    const newDevice = ref({ name: '', location: '' });
    const selectedDevice = ref({});

    const fetchDevices = async () => {
      try {
        await store.dispatch('device/fetchDevices');
        devices.value = store.getters['device/getDevices'];
        console.log('Fetched devices:', devices.value);
        // 检查每个设备是否有id属性
        devices.value.forEach((device, index) => {
          if (!device.id) {
            console.error(`Device at index ${index} has no id:`, device);
          }
        });
      } catch (error) {
        ElMessage.error('获取设备列表失败，请稍后再试');
      }
    };

    onMounted(fetchDevices);

    const showAddDeviceDialog = () => {
      addDeviceDialogVisible.value = true;
      newDevice.value = { name: '', location: '' };
    };

    const addDevice = async () => {
      try {
        await store.dispatch('device/addDevice', newDevice.value);
        ElMessage.success('设备添加成功');
        addDeviceDialogVisible.value = false;
        await fetchDevices();
      } catch (error) {
        ElMessage.error('添加设备失败，请稍后再试');
      }
    };

    const deleteDevice = async (deviceId) => {
      console.log('Deleting device with ID:', deviceId);
      if (!deviceId) {
        console.error('无效的设备ID:', deviceId);
        ElMessage.error('无效的设备ID');
        return;
      }
      try {
        console.log('Dispatching deleteDevice action with ID:', deviceId);
        await store.dispatch('device/deleteDevice', deviceId);
        console.log('Device deleted successfully');
        ElMessage.success('设备删除成功');
        await fetchDevices();
      } catch (error) {
        console.error('删除设备失败:', error);
        ElMessage.error('删除设备失败，请稍后再试');
      }
    };

    const viewDeviceDetails = (device) => {
      selectedDevice.value = device;
      deviceDetailsDialogVisible.value = true;
    };

    return {
      devices,
      addDeviceDialogVisible,
      deviceDetailsDialogVisible,
      newDevice,
      selectedDevice,
      showAddDeviceDialog,
      addDevice,
      deleteDevice,
      viewDeviceDetails,
      fetchDevices
    };
  }
};
</script>

<style scoped>
.device-management-view {
  padding: 20px;
  background-color: #f0f8ff;
  min-height: 100vh;
}

.device-card {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.device-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  color: #1e90ff;
}

:deep(.el-card__header) {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

:deep(.el-button--primary) {
  background-color: #1e90ff;
  border-color: #1e90ff;
}

:deep(.el-button--primary:hover) {
  background-color: #187bcd;
  border-color: #187bcd;
}

:deep(.el-dialog__header) {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 15px 20px;
}

:deep(.el-dialog__title) {
  color: #1e90ff;
}

:deep(.el-dialog__body) {
  padding: 20px;
}

:deep(.el-form-item__label) {
  color: #4a4a4a;
}

:deep(.el-input__inner) {
  border-color: #dcdfe6;
}

:deep(.el-input__inner:focus) {
  border-color: #1e90ff;
}
</style>