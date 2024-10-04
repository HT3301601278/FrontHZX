<template>
    <div class="weather-detail-view">
      <h2>天气数据详情</h2>
      <button @click="refreshWeatherData">刷新数据</button>
      <CitySelector @city-changed="handleCityChange" />
      <DateRangePicker @date-range-changed="handleDateRangeChange" />
      <div v-if="error" class="error-message">{{ error }}</div>
      <WeatherChart v-if="!error" :chartData="chartData" />
      <WeatherDataList v-if="!error" :weatherData="weatherData" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import CitySelector from '@/components/CitySelector.vue';
  import DateRangePicker from '@/components/DateRangePicker.vue';
  import WeatherChart from '@/components/WeatherChart.vue';
  import WeatherDataList from '@/components/WeatherDataList.vue';
  
  export default {
    name: 'WeatherDetailView',
    components: {
      CitySelector,
      DateRangePicker,
      WeatherChart,
      WeatherDataList
    },
    setup() {
      const store = useStore();
      const chartData = ref(null);
      const weatherData = ref([]);
      const selectedCity = ref('');
      const dateRange = ref({ startDate: '', endDate: '' });
      const error = ref(null);

      const fetchWeatherData = async () => {
        if (selectedCity.value && dateRange.value.startDate && dateRange.value.endDate) {
          try {
            await store.dispatch('weather/fetchWeatherByCityAndDateRange', {
              city: selectedCity.value,
              startDate: dateRange.value.startDate,
              endDate: dateRange.value.endDate
            });
            chartData.value = store.getters['weather/getChartData'];
            weatherData.value = store.getters['weather/getWeatherData'];
            error.value = null;
          } catch (err) {
            console.error('获取天气数据失败:', err);
            error.value = err.message || '获取天气数据失败';
            chartData.value = null;
            weatherData.value = [];
          }
        }
      };

      const handleCityChange = (city) => {
        selectedCity.value = city;
        fetchWeatherData();
      };

      const handleDateRangeChange = (range) => {
        dateRange.value = range;
        fetchWeatherData();
      };

      const refreshWeatherData = async () => {
        await fetchWeatherData();
      };

      onMounted(() => {
        selectedCity.value = '北京';
        const today = new Date();
        const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        dateRange.value = {
          startDate: oneWeekAgo.toISOString().split('T')[0],
          endDate: today.toISOString().split('T')[0]
        };
        fetchWeatherData();
      });

      return {
        chartData,
        weatherData,
        error,
        handleCityChange,
        handleDateRangeChange,
        refreshWeatherData
      };
    }
  };
  </script>
  
  <style scoped>
  .weather-detail-view {
    padding: 20px;
  }
  .error-message {
    color: red;
    margin-bottom: 10px;
  }
  </style>