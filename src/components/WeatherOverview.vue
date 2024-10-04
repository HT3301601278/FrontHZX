<template>
  <div class="weather-overview">
    <h3>天气概览</h3>
    <div v-if="latestWeather" class="weather-content">
      <div class="weather-info">
        <p><strong>城市：</strong>{{ latestWeather.city }}</p>
        <p>
          <strong>天气：</strong>
          {{ latestWeather.dailyWeatherList[0].wea }}
        </p>
        <p><strong>温度：</strong>{{ latestWeather.dailyWeatherList[0].temDay }}°C / {{ latestWeather.dailyWeatherList[0].temNight }}°C</p>
        <p><strong>更新时间：</strong>{{ formatDate(latestWeather.updateTime) }}</p>
      </div>
      <div class="weather-icon-container">
        <img :src="getWeatherIcon(latestWeather.dailyWeatherList[0].weaImg)" :alt="latestWeather.dailyWeatherList[0].wea" class="weather-icon">
      </div>
    </div>
    <p v-else-if="error">{{ error }}</p>
    <p v-else>加载中...</p>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import bingbao from '@/assets/bingbao.png';
import feng from '@/assets/feng.png';
import lei from '@/assets/lei.png';
import mai from '@/assets/mai.png';
import qing from '@/assets/qing.png';
import shachen from '@/assets/shachen.png';
import wu from '@/assets/wu.png';
import xue from '@/assets/xue.png';
import yin from '@/assets/yin.png';
import yu from '@/assets/yu.png';
import yun from '@/assets/yun.png';

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

    const weatherIcons = {
      bingbao, feng, lei, mai, qing, shachen, wu, xue, yin, yu, yun
    };

    const formatDate = (timestamp) => {
      return new Date(timestamp).toLocaleString();
    };

    const getWeatherIcon = (weaImg) => {
      return weatherIcons[weaImg] || '';
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
      formatDate,
      getWeatherIcon
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
  position: relative;
}

.weather-content {
  display: flex;
  justify-content: space-between;
}

.weather-info {
  flex: 1;
}

.weather-icon-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.weather-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>