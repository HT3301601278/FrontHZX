<template>
    <div class="device-overview">
      <h3>设备概览</h3>
      <el-row>
        <el-col :span="24">
          <el-statistic title="总设备数" :value="deviceCount">
            <template #suffix>
              <el-icon><Monitor /></el-icon>
            </template>
          </el-statistic>
        </el-col>
      </el-row>
      <el-button type="primary" @click="navigateToDeviceManagement">查看详情</el-button>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { ElRow, ElCol, ElStatistic, ElButton, ElIcon } from 'element-plus';
  import { Monitor } from '@element-plus/icons-vue';
  
  export default {
    name: 'DeviceOverview',
    components: {
      ElRow,
      ElCol,
      ElStatistic,
      ElButton,
      ElIcon,
      Monitor
    },
    setup() {
      const store = useStore();
      const router = useRouter();
      const deviceCount = ref(0);

      const fetchDeviceData = async () => {
        try {
          await store.dispatch('device/fetchDevices');
          const devices = store.getters['device/getDevices'];
          deviceCount.value = devices.length;
        } catch (error) {
          console.error('获取设备数据失败:', error);
        }
      };

      const navigateToDeviceManagement = () => {
        router.push('/device-management');
      };

      onMounted(fetchDeviceData);

      return {
        deviceCount,
        navigateToDeviceManagement
      };
    }
  };
  </script>
  
  <style scoped>
  .device-overview {
    padding: 20px;
  }
  </style>