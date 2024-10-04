<template>
  <div class="weather-trend">
    <el-row>
      <el-col :span="24">
        <div id="weather-chart" style="width: 100%; height: 300px;"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';

export default {
  name: 'WeatherTrend',
  props: {
    weatherData: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const chartInstance = ref(null);

    const initChart = () => {
      const chartDom = document.getElementById('weather-chart');
      chartInstance.value = echarts.init(chartDom);
    };

    const updateChart = (data) => {
      const dates = data.dailyWeatherList.map(item => item.date);
      const weaData = data.dailyWeatherList.map(item => item.wea);

      const option = {
        title: {
          text: '未来天气趋势'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: dates
        },
        yAxis: {
          type: 'category',
          data: [...new Set(weaData)]
        },
        series: [
          {
            name: '天气',
            type: 'line',
            data: weaData
          }
        ]
      };
      chartInstance.value.setOption(option);
    };

    watch(() => props.weatherData, (newData) => {
      if (newData && chartInstance.value) {
        updateChart(newData);
      }
    });

    onMounted(() => {
      initChart();
      if (props.weatherData) {
        updateChart(props.weatherData);
      }
    });

    return {};
  }
};
</script>

<style scoped>
.weather-trend {
  width: 100%;
  height: 300px;
}
</style>