<template>
  <div class="layout-nav">
    <div class="logo">
      <img class="logo-img" src="/src/assets/img/logo.png" alt="" />
      <div class="logo-title">OKOK's 个人空间</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.layout-nav {
  width: 250px;
  min-height: 100vh;
  background-color: rgb(1, 12, 47);
  padding: 10px;
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding-top: 10px;
    .logo-img {
      width: 35px;
      height: 35px;
    }
    .logo-title {
      font-size: 18px;
      font-weight: bold;
      margin-left: 5px;
      color: #fff;
    }
  }
}
</style>
