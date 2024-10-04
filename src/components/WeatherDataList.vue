<template>
    <div class="weather-data-list">
      <h3>天气数据列表</h3>
      <table>
        <thead>
          <tr>
            <th>日期</th>
            <th>城市</th>
            <th>温度 (°C)</th>
            <th>天气状况</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in weatherData" :key="item.id">
            <td>{{ formatDate(item.date) }}</td>
            <td>{{ item.city }}</td>
            <td>{{ item.temperature }}</td>
            <td>{{ item.condition }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WeatherDataList',
    props: {
      weatherData: {
        type: Array,
        required: true
      }
    },
    setup() {
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      };
  
      return {
        formatDate
      };
    }
  };
  </script>
  
  <style scoped>
  .weather-data-list {
    margin-top: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>