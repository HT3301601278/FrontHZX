<template>
    <div class="weather-chart">
      <div v-if="loading">加载中...</div>
      <div v-if="error">加载失败: {{ error }}</div>
      <canvas v-if="chartData" ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, watch, nextTick } from 'vue';
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

      const createChart = async () => {
        if (chart) {
          chart.destroy();
        }

        console.log('Creating chart, chartData:', props.chartData);
        console.log('Canvas element:', chartCanvas.value);

        try {
          await nextTick();
          if (!chartCanvas.value) {
            console.error('Canvas element is null after nextTick');
            throw new Error('Canvas element not found');
          }
          const ctx = chartCanvas.value.getContext('2d');
          if (!ctx) {
            console.error('Unable to get canvas context');
            throw new Error('Unable to get canvas context');
          }
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
          console.log('Chart data:', props.chartData);
          loading.value = false;
          error.value = '创建图表时出错: ' + err.message;
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
        console.log('chartData changed:', newData);
        if (newData) {
          nextTick(() => {
            createChart();
          });
        }
      }, { immediate: true, deep: true });

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