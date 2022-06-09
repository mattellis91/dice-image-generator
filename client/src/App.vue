<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <!-- <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink> -->
  <RouterView />
</template>

<style>
@import '@/assets/base.css';
@import '@/assets/bootstrap.min.css';
@import '@/assets/style.css';
</style>
