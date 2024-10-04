<template>
    <div class="weather-chart">
      <div v-if="loading">加载中...</div>
      <div v-else-if="error">加载失败: {{ error }}</div>
      <canvas v-else ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, watch } from 'vue';
  import Chart from 'chart.js/auto';
  
  export default {
    name: 'WeatherChart',
    props: {
      chartData: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      const chartCanvas = ref(null);
      let chart = null;
      const loading = ref(true);
      const error = ref(null);

      const createChart = () => {
        if (chart) {
          chart.destroy();
        }

        try {
          const ctx = chartCanvas.value.getContext('2d');
          chart = new Chart(ctx, {
            type: 'line',
            data: props.chartData,
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
          loading.value = false;
          error.value = null;
        } catch (err) {
          console.error('Error creating chart:', err);
          loading.value = false;
          error.value = '创建图表时出错';
        }
      };

      onMounted(() => {
        if (props.chartData) {
          createChart();
        } else {
          loading.value = false;
        }
      });

      watch(() => props.chartData, (newData) => {
        if (newData) {
          loading.value = true;
          createChart();
        }
      });

      return {
        chartCanvas,
        loading,
        error
      };
    }
  };
  </script>
  
  <style scoped>
  .weather-chart {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    height: 400px;
    position: relative;
  }
  </style>