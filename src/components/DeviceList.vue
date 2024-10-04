<template>
    <div class="device-list">
      <h3>设备列表</h3>
      <table>
        <thead>
          <tr>
            <th>设备名称</th>
            <th>设备位置</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="device in devices" :key="device.id">
            <td>{{ device.name }}</td>
            <td>{{ device.location }}</td>
            <td>
              <button @click="$emit('view-device', device)">查看</button>
              <button @click="$emit('delete-device', device.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DeviceList',
    props: {
      devices: {
        type: Array,
        required: true
      }
    },
    emits: ['delete-device', 'view-device']
  };
  </script>
  
  <style scoped>
  .device-list {
    margin-top: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  button {
    margin-right: 5px;
  }
  </style>