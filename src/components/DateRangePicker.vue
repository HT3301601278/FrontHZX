<template>
    <div class="date-range-picker">
      <label for="start-date">开始日期：</label>
      <input type="date" id="start-date" v-model="startDate" @change="emitDateRangeChange">
      <label for="end-date">结束日期：</label>
      <input type="date" id="end-date" v-model="endDate" @change="emitDateRangeChange">
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  
  export default {
    name: 'DateRangePicker',
    emits: ['date-range-changed'],
    setup(props, { emit }) {
      const startDate = ref(new Date().toISOString().split('T')[0]);
      const endDate = ref(new Date().toISOString().split('T')[0]);
  
      const emitDateRangeChange = () => {
        emit('date-range-changed', { startDate: startDate.value, endDate: endDate.value });
      };
  
      watch([startDate, endDate], () => {
        emitDateRangeChange();
      });
  
      return {
        startDate,
        endDate,
        emitDateRangeChange
      };
    }
  };
  </script>
  
  <style scoped>
  .date-range-picker {
    margin-bottom: 20px;
  }
  
  input[type="date"] {
    margin-right: 10px;
    padding: 5px;
  }
  </style>