<template>
    <div class="dashboard-view">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>仪表盘概览</span>
                <el-button class="button" text @click="refreshData">刷新数据</el-button>
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
      
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="24">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>天气趋势</span>
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
}

.box-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 3px 0;
}
</style>