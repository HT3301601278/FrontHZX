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
  import { onMounted, ref } from 'vue';
  import { useStore } from 'vuex';
  import * as echarts from 'echarts';
  
  export default {
    name: 'WeatherTrend',
    setup() {
      const store = useStore();
      const chartInstance = ref(null);
  
      const initChart = () => {
        const chartDom = document.getElementById('weather-chart');
        chartInstance.value = echarts.init(chartDom);
      };
  
      const updateChart = (data) => {
        const option = {
          title: {
            text: '近7天温度趋势'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: data.dates
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} °C'
            }
          },
          series: [
            {
              name: '温度',
              type: 'line',
              data: data.temperatures,
              markPoint: {
                data: [
                  { type: 'max', name: '最高温' },
                  { type: 'min', name: '最低温' }
                ]
              }
            }
          ]
        };
        chartInstance.value.setOption(option);
      };
  
      const fetchWeatherTrend = async () => {
        try {
          // 假设我们有一个获取近7天天气趋势的action
          await store.dispatch('weather/fetchWeatherTrend');
          const trendData = store.getters['weather/getWeatherTrend'];
          updateChart(trendData);
        } catch (error) {
          console.error('获取天气趋势数据失败:', error);
        }
      };
  
      onMounted(() => {
        initChart();
        fetchWeatherTrend();
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