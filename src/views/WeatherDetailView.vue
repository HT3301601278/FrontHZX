<template>
    <div class="weather-detail-view">
      <h2>天气数据详情</h2>
      <CitySelector @city-changed="handleCityChange" />
      <DateRangePicker @date-range-changed="handleDateRangeChange" />
      <WeatherChart :chartData="chartData" />
      <WeatherDataList :weatherData="weatherData" />
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

      const fetchWeatherData = async () => {
        if (selectedCity.value && dateRange.value.startDate && dateRange.value.endDate) {
          await store.dispatch('weather/fetchWeatherData', {
            city: selectedCity.value,
            startDate: dateRange.value.startDate,
            endDate: dateRange.value.endDate
          });
          chartData.value = store.getters['weather/getChartData'];
          weatherData.value = store.getters['weather/getWeatherData'];
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

      onMounted(() => {
        // 初始加载数据，可以设置默认值
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
        handleCityChange,
        handleDateRangeChange
      };
    }
  };
  </script>
  
  <style scoped>
  .weather-detail-view {
    padding: 20px;
  }
  </style>