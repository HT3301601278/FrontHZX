<template>
    <div v-if="error" class="global-error">
      {{ error }}
    </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  
  export default {
    name: 'GlobalError',
    setup() {
      const store = useStore()
      const error = computed(() => store.state.error)
  
      return {
        error
      }
    }
  }
  </script>
  
  <style scoped>
  .global-error {
    background-color: #ffcccc;
    color: #cc0000;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
  }
  </style>