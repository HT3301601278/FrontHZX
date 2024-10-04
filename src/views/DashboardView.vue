<template>
    <div class="dashboard-view">
      <h2>仪表盘</h2>
      <WeatherOverview />
      <nav>
        <router-link to="/weather-detail">天气详情</router-link> |
        <router-link to="/device-management">设备管理</router-link> |
        <router-link to="/user-profile">用户信息</router-link>
      </nav>
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
  
  nav {
    margin-top: 20px;
  }
  
  nav a {
    margin-right: 10px;
    text-decoration: none;
    color: #2c3e50;
  }
  
  nav a:hover {
    color: #42b983;
  }
  </style>