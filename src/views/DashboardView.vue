<template>
    <div class="dashboard-view">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card class="dashboard-card">
            <template #header>
              <div class="card-header">
                <h2>仪表盘概览</h2>
                <el-button type="primary" @click="refreshData">刷新数据</el-button>
              </div>
            </template>
            <el-row :gutter="20">
              <el-col :span="12">
                <WeatherOverview :weatherData="weatherData" />
              </el-col>
              <el-col :span="12">
                <DeviceOverview />
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      
      <el-row :gutter="20" class="mt-20">
        <el-col :span="24">
          <el-card class="dashboard-card">
            <template #header>
              <div class="card-header">
                <h2>天气趋势</h2>
              </div>
            </template>
            <WeatherTrend :weatherData="weatherData" />
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { ElRow, ElCol, ElCard, ElButton, ElMessage } from 'element-plus';
import WeatherOverview from '@/components/WeatherOverview.vue';
import DeviceOverview from '@/components/DeviceOverview.vue';
import WeatherTrend from '@/components/WeatherTrend.vue';
import axios from 'axios';

export default {
  name: 'DashboardView',
  components: {
    ElRow,
    ElCol,
    ElCard,
    ElButton,
    WeatherOverview,
    DeviceOverview,
    WeatherTrend
  },
  setup() {
    const weatherData = ref(null);

    const refreshData = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/weather/update/CN101070101');
        weatherData.value = response.data;
        ElMessage.success('数据刷新成功');
      } catch (error) {
        console.error('刷新数据失败:', error);
        ElMessage.error('刷新数据失败');
      }
    };

    onMounted(refreshData);

    return {
      refreshData,
      weatherData
    };
  }
};
</script>

<style scoped>
.dashboard-view {
  padding: 20px;
  background-color: #f0f8ff;
  min-height: 100vh;
}

.dashboard-card {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.dashboard-card:hover {
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

.mt-20 {
  margin-top: 20px;
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
</style>