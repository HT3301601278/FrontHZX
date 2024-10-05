# 气象数据在线监测系统

## 项目概述

这是一个基于Vue 3和Element Plus的气象数据在线监测系统。该系统允许用户查看实时天气数据、管理智能设备,并提供用户认证功能。

## 技术栈

- Vue 3
- Vuex 4
- Vue Router 4
- Element Plus
- Axios
- Chart.js
- ECharts

## 项目结构

```
src/
|-- api/
|-- assets/
|-- components/
|-- router/
|-- store/
|   |-- modules/
|-- views/
|-- App.vue
|-- main.js
```

### 主要目录说明

- `api/`: 包含与后端API通信的函数
- `assets/`: 存放静态资源文件
- `components/`: 存放可复用的Vue组件
- `router/`: 定义应用的路由配置
- `store/`: Vuex状态管理
  - `modules/`: 存放Vuex模块
- `views/`: 存放页面级的Vue组件
- `App.vue`: 应用的根组件
- `main.js`: 应用的入口文件

## 核心功能

1. 用户认证
2. 天气数据展示
3. 设备管理
4. 数据可视化

## 组件详解

### 1. LoginView (登录页面)

文件位置: `src/views/LoginView.vue`

这个组件处理用户登录和注册功能。

主要特点:

- 使用Element Plus的表单组件
- 支持切换登录和注册模式
- 使用Vuex进行状态管理


### 2. DashboardView (仪表盘页面)

文件位置: `src/views/DashboardView.vue`

这是用户登录后的主页面,展示天气概览和设备概览。

主要特点:

- 使用Element Plus的布局组件
- 包含WeatherOverview和DeviceOverview子组件
- 实现数据刷新功能

### 3. WeatherDetailView (天气详情页面)

文件位置: `src/views/WeatherDetailView.vue`

这个页面展示详细的天气数据和趋势图。

主要特点:

- 使用CitySelector组件选择城市
- 使用DateRangePicker组件选择日期范围
- 展示WeatherChart和WeatherDataList组件


### 4. DeviceManagementView (设备管理页面)

文件位置: `src/views/DeviceManagementView.vue`

这个页面允许用户管理智能设备。

主要特点:

- 展示设备列表
- 支持添加、删除和查看设备详情
- 使用Element Plus的对话框组件

### 5. WeatherOverview (天气概览组件)

文件位置: `src/components/WeatherOverview.vue`

这个组件展示最新的天气信息。

主要特点:

- 展示城市、天气状况、温度等信息
- 使用动态图标展示天气状况

### 6. DeviceList (设备列表组件)

文件位置: `src/components/DeviceList.vue`

这个组件展示设备列表,并提供设备管理功能。

主要特点:

- 使用表格展示设备信息
- 提供查看和删除设备的按钮

### 7. WeatherChart (天气图表组件)

文件位置: `src/components/WeatherChart.vue`

这个组件使用Chart.js库绘制天气趋势图。

主要特点:

- 动态创建和更新图表
- 展示温度变化趋势


## Vuex 状态管理

项目使用Vuex进行状态管理,主要包含以下模块:

1. User模块 (`src/store/modules/user.js`)
   - 处理用户认证状态
   - 管理用户信息

2. Weather模块 (`src/store/modules/weather.js`)
   - 管理天气数据
   - 处理天气相关的API请求

3. Device模块 (`src/store/modules/device.js`)
   - 管理设备列表
   - 处理设备相关的API请求

## 路由配置

路由配置文件位于 `src/router/index.js`。主要路由包括:

- `/`: 登录页面
- `/dashboard`: 仪表盘
- `/weather-detail`: 天气详情
- `/device-management`: 设备管理
- `/user-profile`: 用户信息

路由守卫确保只有认证用户才能访问受保护的路由。

## API 通信

项目使用Axios库与后端API进行通信。API相关函数位于 `src/api/` 目录下。

## 样式和主题

项目使用Element Plus提供的UI组件,并进行了一些自定义样式调整。主要的全局样式定义在 `App.vue` 文件中。

## 如何运行项目

1. 克隆项目仓库
2. 安装依赖: `npm install`
3. 运行开发服务器: `npm run serve`
4. 在浏览器中访问 `http://localhost:8080`

## 学习建议

1. 从 `main.js` 开始,了解项目的入口和全局配置
2. 研究 `App.vue` 文件,了解应用的整体结构
3. 逐个查看 `views/` 目录下的页面组件
4. 深入研究 `components/` 目录下的可复用组件
5. 学习 Vuex 状态管理的使用方式
6. 了解 Vue Router 的配置和使用
7. 研究与后端API的通信方式