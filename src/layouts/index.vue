<template>
  <div class="layout-wrapper">
    <layout-nav />
    <div class="layout-container">
      <layout-header />
      <div class="layout-content-wrapper">
        <layout-content />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import layoutContent from './c-cpns/layout-content.vue'
import layoutHeader from './c-cpns/layout-header.vue'
import layoutNav from './c-cpns/layout-nav.vue'
</script>

<style lang="scss" scoped>
.layout-wrapper {
  min-height: 100vh;
  width: 100vw;

  display: flex;
  .layout-container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    /* height: calc(100vh - 80px); */
    .layout-content-wrapper {
      width: 100%;
      height: calc(100vh - 80px);
      padding: 20px;
      background-color: #f3f6fc;
      box-sizing: border-box;
    }
  }
}
</style>
