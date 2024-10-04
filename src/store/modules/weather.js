import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const addWeatherData = async (weatherData) => {
  try {
    const response = await axios.post(`${API_URL}/weather`, weatherData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || '添加天气数据失败';
  }
};

export const fetchLatestWeather = async () => {
  try {
    const response = await axios.get(`${API_URL}/weather/latest`);
    return response.data;
  } catch (error) {
    console.error('获取最新天气数据失败:', error);
    if (error.response && error.response.status === 404) {
      throw new Error('未找到最新天气数据，请确保数据已被添加');
    }
    throw error.response?.data || error.message || '获取最新天气数据失败';
  }
};

export const fetchWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${API_URL}/weather/city/${encodeURIComponent(city)}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || '获取城市天气数据失败';
  }
};

export const updateWeatherByCityId = async (cityId, weatherData) => {
  try {
    const response = await axios.post(`${API_URL}/weather/update/${cityId}`, weatherData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || '更新天气数据失败';
  }
};

export const fetchWeatherByCityAndDateRange = async (city, startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}/weather/city/${encodeURIComponent(city)}/date-range`, {
      params: { startDate, endDate }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || '获取指定日期范围的天气数据失败';
  }
};

export const fetchWeatherByCityAndDate = async (city, date) => {
  try {
    const response = await axios.get(`${API_URL}/weather/city/${encodeURIComponent(city)}/date`, {
      params: { date }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || '获取指定日期的天气数据失败';
  }
};

export default {
  namespaced: true,
  state: {
    latestWeather: null,
    weatherData: [],
    chartData: null,
    error: null,
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
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchLatestWeather({ commit }) {
      try {
        const data = await fetchLatestWeather();
        commit('SET_LATEST_WEATHER', data);
        commit('SET_ERROR', null);
      } catch (error) {
        console.error('获取最新天气数据错误:', error);
        commit('SET_ERROR', error.message);
        throw error;
      }
    },
    async fetchWeatherByCityAndDateRange({ commit }, { city, startDate, endDate }) {
      try {
        const data = await fetchWeatherByCityAndDateRange(city, startDate, endDate);
        commit('SET_WEATHER_DATA', data);
        commit('SET_CHART_DATA', processChartData(data));
        commit('SET_ERROR', null);
      } catch (error) {
        console.error('获取指定日期范围的天气数据错误:', error);
        commit('SET_ERROR', error.message);
        throw error;
      }
    },
  },
  getters: {
    getLatestWeather: (state) => state.latestWeather,
    getWeatherData: (state) => state.weatherData,
    getChartData: (state) => state.chartData,
    getError: (state) => state.error,
  },
};

function processChartData(weatherData) {
  const labels = weatherData.map(item => item.date);
  const temperatures = weatherData.map(item => parseInt(item.temDay));

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