<template>
  <div class="city-selector">
    <el-select v-model="selectedProvince" placeholder="选择省份" @change="handleProvinceChange">
      <el-option v-for="province in provinces" :key="province" :label="province" :value="province"></el-option>
    </el-select>
    <el-select v-model="selectedMarket" placeholder="选择市场" @change="handleMarketChange" :disabled="!selectedProvince">
      <el-option v-for="market in markets" :key="market" :label="market" :value="market"></el-option>
    </el-select>
    <el-select v-model="selectedCity" placeholder="选择城市" @change="handleCityChange" :disabled="!selectedMarket">
      <el-option v-for="city in cities" :key="city.cityZh" :label="city.cityZh" :value="city.id"></el-option>
    </el-select>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import cityData from '@/assets/city.json';

export default {
  name: 'CitySelector',
  emits: ['city-selected'],
  setup(props, { emit }) {
    const provinces = ref([]);
    const markets = ref([]);
    const cities = ref([]);
    const selectedProvince = ref('');
    const selectedMarket = ref('');
    const selectedCity = ref('');

    onMounted(() => {
      provinces.value = [...new Set(cityData.map(city => city.provinceZh))];
    });

    const handleProvinceChange = () => {
      selectedMarket.value = '';
      selectedCity.value = '';
      markets.value = [...new Set(cityData.filter(city => city.provinceZh === selectedProvince.value).map(city => city.marketZh))];
    };

    const handleMarketChange = () => {
      selectedCity.value = '';
      cities.value = cityData.filter(city => city.provinceZh === selectedProvince.value && city.marketZh === selectedMarket.value);
    };

    const handleCityChange = () => {
      const selectedCityObj = cities.value.find(city => city.id === selectedCity.value);
      emit('city-selected', { id: selectedCity.value, name: selectedCityObj ? selectedCityObj.cityZh : '' });
    };

    return {
      provinces,
      markets,
      cities,
      selectedProvince,
      selectedMarket,
      selectedCity,
      handleProvinceChange,
      handleMarketChange,
      handleCityChange
    };
  }
}
</script>

<style scoped>
.city-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>