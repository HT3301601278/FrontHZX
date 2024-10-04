<template>
    <div class="weather-data-list">
      <h3>天气数据列表</h3>
      <table>
        <thead>
          <tr>
            <th>日期</th>
            <th>天气</th>
            <th>白天天气</th>
            <th>夜间天气</th>
            <th>白天温度 (°C)</th>
            <th>夜间温度 (°C)</th>
            <th>风况</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in weatherData" :key="item.id">
            <td>{{ formatDate(item.date) }}</td>
            <td>{{ item.wea }}</td>
            <td>{{ item.weaDay }}</td>
            <td>{{ item.weaNight }}</td>
            <td>{{ item.temDay }}</td>
            <td>{{ item.temNight }}</td>
            <td>{{ item.win }}</td>
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