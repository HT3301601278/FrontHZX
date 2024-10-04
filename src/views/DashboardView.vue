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
                <WeatherOverview />
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
            <WeatherTrend />
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import { ref } from 'vue';
import { ElRow, ElCol, ElCard, ElButton } from 'element-plus';
import WeatherOverview from '@/components/WeatherOverview.vue';
import DeviceOverview from '@/components/DeviceOverview.vue';
import WeatherTrend from '@/components/WeatherTrend.vue';

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
    const refreshData = () => {
      // 实现刷新数据的逻辑
    };

    return {
      refreshData
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