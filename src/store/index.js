import { createStore } from 'vuex'
import user from './modules/user'
import weather from './modules/weather'
import device from './modules/device'

export default createStore({
  state: {
    error: null,
    loading: false,
    // 其他状态...
  },
  mutations: {
    SET_ERROR(state, error) {
      state.error = error
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    // 其他 mutations...
  },
  modules: {
    user,
    weather,
    device
  }
})