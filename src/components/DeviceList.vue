<template>
    <div class="device-list">
      <h3>设备列表</h3>
      <table>
        <thead>
          <tr>
            <th>设备名称</th>
            <th>设备类型</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="device in devices" :key="device.id">
            <td>{{ device.name }}</td>
            <td>{{ device.type }}</td>
            <td>
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
    emits: ['delete-device']
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
    background-color: #f44336;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #d32f2f;
  }
  </style>