<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import asideBlock  from '@/components/asideBlock.vue'
</script>

<template>
  <div id="layout">
    <asideBlock  />
    <RouterView />
  </div>
</template>

<style scoped></style>
