<template>
  <Table @register="registerTable" />
</template>

<script setup>
import axios from "axios";
import { useTable } from "./Table";
import Table from "./Table/Table.vue";
import { columns, data } from "./Table/data";

async function ProjectGet() {
  return await axios("http://127.0.0.1:4523/m1/2265397-0-default/form");
}

const { registerTable } = useTable({
  // api: ProjectGet,
  // apiParams: 1,
  dragable: true,
  columns: columns,
  data: data,
});
</script>

<style scoped></style>
