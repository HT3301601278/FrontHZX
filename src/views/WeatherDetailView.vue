<template>
    <div class="weather-detail-view">
      <h2>天气数据详情</h2>
      <CitySelector @city-selected="handleCitySelected" />
      <DateRangePicker @date-range-changed="handleDateRangeChange" />
      <el-button type="primary" @click="fetchWeatherData" :disabled="!selectedCity.name || !dateRange.startDate || !dateRange.endDate">查询</el-button>
      <el-button type="primary" @click="updateWeatherData" :disabled="!selectedCity.id">更新数据</el-button>
      <div v-if="error" class="error-message">{{ error }}</div>
      <WeatherChart v-if="!error && chartData" :chartData="chartData" />
      <WeatherDataList v-if="!error && weatherData.length" :weatherData="weatherData" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import CitySelector from '@/components/CitySelector.vue';
  import DateRangePicker from '@/components/DateRangePicker.vue';
  import WeatherChart from '@/components/WeatherChart.vue';
  import WeatherDataList from '@/components/WeatherDataList.vue';
  import axios from 'axios';
  import { ElMessage } from 'element-plus';

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
      const selectedCity = ref({ id: '', name: '' });
      const dateRange = ref({ startDate: '', endDate: '' });
      const error = ref(null);

      const handleCitySelected = (city) => {
        selectedCity.value = city;
      };

      const updateWeatherData = async () => {
        if (selectedCity.value.id) {
          try {
            const response = await axios.post(`http://localhost:8080/api/weather/update/${selectedCity.value.id}`);
            console.log('Weather data updated:', response.data);
            ElMessage.success('天气数据已成功更新');
          } catch (err) {
            console.error('更新天气数据失败:', err);
            error.value = err.message || '更新天气数据失败';
            ElMessage.error(error.value);
          }
        }
      };

      const fetchWeatherData = async () => {
        if (selectedCity.value.name && dateRange.value.startDate && dateRange.value.endDate) {
          try {
            const response = await axios.get(`http://localhost:8080/api/weather/city/${encodeURIComponent(selectedCity.value.name)}/date-range`, {
              params: {
                startDate: dateRange.value.startDate,
                endDate: dateRange.value.endDate
              }
            });
            const data = response.data;
            console.log('Received data:', data);
            if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].dailyWeatherList)) {
              console.log('Weather data:', data[0].dailyWeatherList);
              weatherData.value = data[0].dailyWeatherList;
              console.log('Processed chart data:', processChartData(data[0].dailyWeatherList));
              chartData.value = processChartData(data[0].dailyWeatherList);
              error.value = null;
            } else {
              throw new Error('Invalid data format received from server');
            }
          } catch (err) {
            console.error('获取天气数据失败:', err);
            error.value = err.message || '获取天气数据失败';
            chartData.value = null;
            weatherData.value = [];
          }
        }
      };

      const processChartData = (weatherData) => {
        console.log('Processing chart data:', weatherData);
        if (!Array.isArray(weatherData) || weatherData.length === 0) {
          console.log('Weather data is empty or not an array');
          return null;
        }

        const labels = weatherData.map(item => item.date);
        const dayTemperatures = weatherData.map(item => parseInt(item.temDay) || 0);
        const nightTemperatures = weatherData.map(item => parseInt(item.temNight) || 0);

        const chartData = {
          labels,
          datasets: [
            {
              label: '白天温度 (°C)',
              data: dayTemperatures,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
            {
              label: '夜间温度 (°C)',
              data: nightTemperatures,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
            },
          ],
        };

        console.log('Processed chart data:', chartData);
        return chartData;
      };

      const handleDateRangeChange = (range) => {
        dateRange.value = range;
        fetchWeatherData();
      };

      return {
        chartData,
        weatherData,
        error,
        selectedCity,
        dateRange,
        handleCitySelected,
        handleDateRangeChange,
        updateWeatherData,
        fetchWeatherData
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