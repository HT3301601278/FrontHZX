<template>
    <div v-if="loading" class="global-loading">
      加载中...
    </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  
  export default {
    name: 'GlobalLoading',
    setup() {
      const store = useStore()
      const loading = computed(() => store.state.loading)
  
      return {
        loading
      }
    }
  }
  </script>
  
  <style scoped>
  .global-loading {
    background-color: #e6f7ff;
    color: #1890ff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
  }
  </style>