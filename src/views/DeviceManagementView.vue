<template>
  <div class="device-management-view">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>设备管理</span>
          <el-button type="primary" @click="showAddDeviceDialog">添加新设备</el-button>
        </div>
      </template>
      
      <el-table :data="devices" style="width: 100%">
        <el-table-column prop="name" label="设备名称" />
        <el-table-column prop="location" label="设备位置" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="viewDeviceDetails(scope.row)">查看</el-button>
            <el-button size="small" type="danger" @click="deleteDevice(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加设备对话框 -->
    <el-dialog v-model="addDeviceDialogVisible" title="添加新设备">
      <el-form :model="newDevice" label-width="120px">
        <el-form-item label="设备名称">
          <el-input v-model="newDevice.name" />
        </el-form-item>
        <el-form-item label="设备位置">
          <el-input v-model="newDevice.location" />
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
    <el-dialog v-model="deviceDetailsDialogVisible" title="设备详情">
      <p><strong>名称：</strong>{{ selectedDevice.name }}</p>
      <p><strong>位置：</strong>{{ selectedDevice.location }}</p>
    </el-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';

export default {
  name: 'DeviceManagementView',
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
      try {
        await store.dispatch('device/deleteDevice', deviceId);
        ElMessage.success('设备删除成功');
        await fetchDevices();
      } catch (error) {
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
      viewDeviceDetails
    };
  }
};
</script>

<style scoped>
.device-management-view {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-button {
  margin-left: 10px;
}
</style>