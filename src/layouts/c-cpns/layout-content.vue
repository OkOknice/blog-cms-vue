<template>
  <div class="layout-content">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.layout-content {
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
}
</style>
