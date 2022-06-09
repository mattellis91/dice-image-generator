<script setup lang="ts">
import { onMounted } from 'vue';
import axios from 'axios';

onMounted(() => {
  console.log("mounted");
  axios.get("http://localhost:5000/").then((res) => {
    console.log(res);
  });
});
</script>

<template>
  <main>
    <div>test</div>
  </main>
</template>
