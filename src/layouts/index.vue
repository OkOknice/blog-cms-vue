<template>
  <div class="layout-wrapper">
    <layout-header />
    <div class="layout-container">
      <layout-nav />
      <layout-content />
    </div>
  </div>
</template>

<script setup lang="ts">
import layoutContent from './layout-content.vue'
import layoutHeader from './layout-header.vue'
import layoutNav from './layout-nav.vue'
</script>

<style lang="scss" scoped>
.layout-wrapper {
  min-height: 100vh;
  width: 100vw;
  background-color: #f3f6fc;
  .layout-container {
    display: flex;
    height: calc(100vh - 80px);
  }
}
</style>
