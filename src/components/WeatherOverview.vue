<template>
    <div class="weather-overview">
      <h3>天气概览</h3>
      <div v-if="latestWeather">
        <p><strong>城市：</strong>{{ latestWeather.city }}</p>
        <p><strong>温度：</strong>{{ latestWeather.temperature }}°C</p>
        <p><strong>天气：</strong>{{ latestWeather.condition }}</p>
        <p><strong>更新时间：</strong>{{ formatDate(latestWeather.timestamp) }}</p>
      </div>
      <p v-else>加载中...</p>
      <button @click="refreshData">刷新数据</button>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'WeatherOverview',
    setup() {
      const store = useStore();
      const latestWeather = ref(null);
  
      const fetchLatestWeather = async () => {
        await store.dispatch('weather/fetchLatestWeather');
        latestWeather.value = store.getters['weather/getLatestWeather'];
      };
  
      const refreshData = async () => {
        await fetchLatestWeather();
      };
  
      const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
      };
  
      onMounted(fetchLatestWeather);
  
      return {
        latestWeather,
        refreshData,
        formatDate
      };
    }
  };
  </script>
  
  <style scoped>
  .weather-overview {
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  button {
    margin-top: 10px;
  }
  </style>