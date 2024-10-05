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
              <button @click="handleDelete(device.id)">删除</button>
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
    emits: ['delete-device', 'view-device'],
    methods: {
      handleDelete(id) {
        console.log('Deleting device with ID:', id);
        this.$emit('delete-device', id);
      }
    }
  };
  </script>
  
  <style scoped>
  .device-list {
    margin-top: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 4px;
    overflow: hidden;
  }
  
  th, td {
    border: 1px solid #e9ecef;
    padding: 12px;
    text-align: left;
  }
  
  th {
    background-color: #f8f9fa;
    color: #1e90ff;
    font-weight: bold;
  }
  
  tr:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  tr:hover {
    background-color: #e9ecef;
  }
  
  .el-button {
    margin-right: 5px;
  }
  </style>