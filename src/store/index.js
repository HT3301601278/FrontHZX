import { createStore } from 'vuex'
import user from './modules/user'
import weather from './modules/weather'
import device from './modules/device'

export default createStore({
  modules: {
    user,
    weather,
    device
  }
})
