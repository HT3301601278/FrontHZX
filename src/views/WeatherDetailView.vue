<template>
    <div class="weather-detail-view">
      <el-card class="weather-card">
        <template #header>
          <div class="card-header">
            <h2>天气数据详情</h2>
          </div>
        </template>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <CitySelector @city-selected="handleCitySelected" />
          </el-form-item>
          <el-form-item>
            <DateRangePicker @date-range-changed="handleDateRangeChange" />
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="updateWeatherData" :disabled="!selectedCity.id">更新数据</el-button>
            <el-button type="primary" @click="fetchWeatherData" :disabled="!selectedCity.name || !dateRange.startDate || !dateRange.endDate">查询</el-button>
          </el-form-item>
        </el-form>
        <el-alert
          v-if="error"
          :title="error"
          type="error"
          show-icon
          :closable="false"
        />
        <div v-if="!error && chartData" class="chart-container">
          <WeatherChart :chartData="chartData" />
        </div>
        <div v-if="!error && weatherData.length" class="data-list-container">
          <WeatherDataList :weatherData="weatherData" />
        </div>
      </el-card>
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
    background-color: #f0f8ff;
    min-height: 100vh;
  }

  .weather-card {
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .weather-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-header h2 {
    margin: 0;
    color: #1e90ff;
  }

  .chart-container, .data-list-container {
    margin-top: 20px;
  }

  :deep(.el-card__header) {
    background-color: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
  }

  :deep(.el-button--primary) {
    background-color: #1e90ff;
    border-color: #1e90ff;
  }

  :deep(.el-button--primary:hover) {
    background-color: #187bcd;
    border-color: #187bcd;
  }

  :deep(.el-button--success) {
    background-color: #42b983;
    border-color: #42b983;
  }

  :deep(.el-button--success:hover) {
    background-color: #3aa876;
    border-color: #3aa876;
  }

  :deep(.el-form-item) {
    margin-bottom: 15px;
  }

  :deep(.el-form--inline .el-form-item) {
    margin-right: 0;
    margin-bottom: 15px;
  }

  :deep(.el-form--inline) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  </style>