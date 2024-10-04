import axios from 'axios';

export default {
  namespaced: true,
  state: {
    latestWeather: null,
    weatherData: [],
    chartData: null,
  },
  mutations: {
    SET_LATEST_WEATHER(state, weather) {
      state.latestWeather = weather;
    },
    SET_WEATHER_DATA(state, data) {
      state.weatherData = data;
    },
    SET_CHART_DATA(state, data) {
      state.chartData = data;
    },
  },
  actions: {
    async fetchLatestWeather({ commit }) {
      try {
        const response = await axios.get('/api/weather/latest');
        commit('SET_LATEST_WEATHER', response.data);
      } catch (error) {
        console.error('Error fetching latest weather:', error);
        throw error;
      }
    },
    async fetchWeatherData({ commit }, { city, startDate, endDate }) {
      try {
        const response = await axios.get('/api/weather', {
          params: { city, startDate, endDate },
        });
        commit('SET_WEATHER_DATA', response.data);
        commit('SET_CHART_DATA', processChartData(response.data));
      } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
      }
    },
  },
  getters: {
    getLatestWeather: (state) => state.latestWeather,
    getWeatherData: (state) => state.weatherData,
    getChartData: (state) => state.chartData,
  },
};

function processChartData(weatherData) {
  const labels = weatherData.map(item => item.date);
  const temperatures = weatherData.map(item => item.temperature);

  return {
    labels,
    datasets: [
      {
        label: '温度 (°C)',
        data: temperatures,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
}