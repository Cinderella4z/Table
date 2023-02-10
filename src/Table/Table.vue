<template>
  <table :style="{ width: tableWidth + 'px' }">
    <thead>
      <tr>
        <th
          v-for="titleItem in data.columns"
          :style="{ width: titleItem.width + 'px' }"
        >
          {{ titleItem.title }}
        </th>
      </tr>
    </thead>
    <tbody v-drag="data.dragable">
      <tr v-for="dataItem in data.data" :key="dataItem[0]">
        <td
          v-for="index in data.columns"
          :style="{ width: index.width + 'px' }"
        >
          {{ dataItem[index.dataIndex] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { reactive, getCurrentInstance, onMounted, computed } from "vue";
import vDrag from "./drag";
const emit = defineEmits(["register"]);
const instance = getCurrentInstance();
const data = reactive({
  columns: [],
  data: [],
  dragable: false,
});
const tableWidth = computed(() => {
  let width = 8;
  data.columns.map((item) => (width += item.width));
  return width;
});
onMounted(() => {
  emit("register", instance);
});
const setColumns = (columns) => {
  data.columns = columns;
};
const setBodyData = async (param) => {
  console.log(param);
  if (param instanceof Function) {
    const res = await param();
    data.data = res.data;
  } else {
    data.data = param;
  }
};
const setDragable = (bool) => {
  data.dragable = bool;
};

defineExpose({ setColumns, setBodyData, setDragable });
</script>
<style scoped>
.dragStyle {
  background-color: #f5f7fa !important;
}
table {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  border-collapse: collapse;
  color: #606266;
  display: inline-block;
  position: relative;
  width: 1008px;
}
thead {
  display: block;
  color: #909399;
  background-color: #fafafa;
  position: sticky;
  top: 0;
  box-shadow: 1px 2px 10px #dcdfe6;
}
thead th {
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  overflow: hidden;
  display: inline-block;
  width: 200px;
  padding: 20px 0 20px 5px;
  text-align: left;
}
thead th:last-child {
  border-right: 0;
}
tbody {
  display: block;
  max-height: 500px;
  overflow-y: auto;
}
td {
  box-sizing: border-box;
  display: inline-block;
  border: 1px solid #ebeef5;
  padding-left: 5px;
  width: 200px;
  padding: 10px 0 10px 5px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  border-top: 0;
}
tr:nth-child(2n) {
  display: inline-block;
  background-color: #fafafa;
}
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

td::-webkit-scrollbar {
  width: 3px;
  height: 3px;
} /* 这是针对缺省样式 (必须的) */
td::-webkit-scrollbar-track {
  background-color: #ebeef5;
} /* 滚动条的滑轨背景颜色 */
td::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border: 10px;
} /* 滑块颜色 */
</style>
