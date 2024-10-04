<template>
  <div class="weather-overview">
    <h3>天气概览</h3>
    <div v-if="latestWeather">
      <p><strong>城市：</strong>{{ latestWeather.city }}</p>
      <p><strong>天气：</strong>{{ latestWeather.dailyWeatherList[0].wea }}</p>
      <p><strong>温度：</strong>{{ latestWeather.dailyWeatherList[0].temDay }}°C / {{ latestWeather.dailyWeatherList[0].temNight }}°C</p>
      <p><strong>更新时间：</strong>{{ formatDate(latestWeather.updateTime) }}</p>
    </div>
    <p v-else-if="error">{{ error }}</p>
    <p v-else>加载中...</p>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';

export default {
  name: 'WeatherOverview',
  props: {
    weatherData: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const latestWeather = ref(null);
    const error = ref(null);

    const formatDate = (timestamp) => {
      return new Date(timestamp).toLocaleString();
    };

    watch(() => props.weatherData, (newData) => {
      if (newData) {
        latestWeather.value = newData;
        error.value = null;
      }
    });

    return {
      latestWeather,
      error,
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
</style>