<template>
    <div class="city-selector">
      <label for="city-select">选择城市：</label>
      <select id="city-select" v-model="selectedCity" @change="emitCityChange">
        <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
      </select>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'CitySelector',
    emits: ['city-changed'],
    setup(props, { emit }) {
      const cities = ['北京', '上海', '广州', '深圳', '杭州']; // 这里可以从API获取或存储在Vuex中
      const selectedCity = ref(cities[0]);
  
      const emitCityChange = () => {
        emit('city-changed', selectedCity.value);
      };
  
      return {
        cities,
        selectedCity,
        emitCityChange
      };
    }
  };
  </script>
  
  <style scoped>
  .city-selector {
    margin-bottom: 20px;
  }
  
  select {
    padding: 5px;
    font-size: 16px;
  }
  </style>