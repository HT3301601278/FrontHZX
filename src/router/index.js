import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import WeatherDetailView from '../views/WeatherDetailView.vue'
import DeviceManagementView from '../views/DeviceManagementView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/weather-detail',
    name: 'weatherDetail',
    component: WeatherDetailView,
    meta: { requiresAuth: true }
  },
  {
    path: '/device-management',
    name: 'deviceManagement',
    component: DeviceManagementView,
    meta: { requiresAuth: true }
  },
  {
    path: '/user-profile',
    name: 'userProfile',
    component: UserProfileView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['user/isAuthenticated']) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router