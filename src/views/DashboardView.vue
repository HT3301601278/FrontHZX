<template>
    <div class="dashboard-view">
      <h2>仪表盘</h2>
      <WeatherOverview />
    </div>
</template>

<script>
import WeatherOverview from '@/components/WeatherOverview.vue';

export default {
  name: 'DashboardView',
  components: {
    WeatherOverview
  }
};
</script>

<style scoped>
.dashboard-view {
  padding: 20px;
}
</style>