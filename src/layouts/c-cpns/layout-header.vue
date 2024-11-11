<template>
  <div class="layout-header">
    <div class="layout-top">
      <div class="menu">
        <el-dropdown>
          <span class="el-dropdown-link">
            Dropdown List
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
            <span class="menu-name">/ 测试</span>
          </span>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item disabled>Action 4</el-dropdown-item>
              <el-dropdown-item divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="userinfo">
        <div class="full-screen" @click="openFullScreen">
          <el-icon><full-screen /></el-icon>
        </div>
        <div class="username">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar
                size="small"
                src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
              ></el-avatar>
              <span class="name">OKOK</span>
              <el-button type="success" size="small" plain>
                超级管理员
              </el-button>
            </span>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="loginOut">退出系统</el-dropdown-item>
                <el-dropdown-item>个人中心</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <!-- <div class="roleName">
         
        </div> -->
      </div>
    </div>
    <div class="layout-bottom"></div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import userStore from '@/store/modules/user'

import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowDown, FullScreen } from '@element-plus/icons-vue'

// const route = useRoute()
const router = useRouter()
const user = userStore()

const loginOut = () => {
  console.log('退出系统')
  ElMessageBox({
    title: '提示',
    message: '确定要退出系统吗？',
    showCancelButton: true,
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage({
      type: 'success',
      message: '退出成功',
    })
    user.loginOut()
    router.replace('/login')
  })
}

const openFullScreen = () => {
  console.log('全屏')
  document.documentElement.requestFullscreen()
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.layout-header {
  height: 80px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  .layout-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .full-screen {
      cursor: pointer;
    }
    .menu-name {
      font-size: 12px;
      color: #000;
    }
    .userinfo {
      display: flex;
      align-items: center;
      .name {
        margin-left: 5px;
        margin-right: 10px;
      }
      div {
        margin: 0 5px;
      }
    }
  }
}
</style>
