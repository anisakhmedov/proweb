<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AsideBlock  from '@/components/AsideBlock.vue'
</script>

<template>
  <div id="layout">
    <AsideBlock  />
    <RouterView />
  </div>
</template>

<style scoped></style>
