<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="logo-left">
        <div class="login-header">OKOK's 个人空间</div>
        <div class="login-desc">
          OKOK个人空间，用做于记录自己个人生活的系统！
        </div>
      </div>
      <div class="login-form">
        <el-form
          label-width="auto"
          style="width: 100%"
          ref="formRef"
          :rules="rules"
          :model="loginFormInfo"
        >
          <div class="login-title">登录</div>
          <el-form-item prop="username">
            <el-input
              v-model="loginFormInfo.username"
              placeholder="请输入账号"
              :suffix-icon="Avatar"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="loginFormInfo.password"
              type="password"
              :suffix-icon="Hide"
            />
          </el-form-item>
          <el-form-item prop="captcha">
            <div class="captcha-item">
              <el-input
                placeholder="请输入验证码"
                v-model="loginFormInfo.captcha"
              ></el-input>
              <img
                class="captcha-img"
                :src="captchaImg"
                alt=""
                @click.stop="getCaptcha"
              />
            </div>
          </el-form-item>
        </el-form>
        <el-button class="btn" type="primary" block @click="handleLogin">
          登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Avatar, Hide } from '@element-plus/icons-vue'

import userStore from '@/store/modules/user'

import { loginApi } from '@/api'

import type { FormInstance, FormRules } from 'element-plus'
import type { ILoginParams } from '@/api/types/login-types'

const router = useRouter()
const user = userStore()

const formRef = ref<FormInstance>()
const captchaImg = ref(
  `http://localhost:3000/api/v1/auth/captcha?time=${new Date().getTime()}`,
)
const loginFormInfo = ref<ILoginParams>({
  username: 'OKOK',
  password: '12345678',
  captcha: '',
})
const rules = ref<FormRules<ILoginParams>>({
  username: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
  captcha: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur',
    },
  ],
})

const getCaptcha = () => {
  console.log(new Date().getTime())
  captchaImg.value = `http://localhost:3000/api/v1/auth/captcha?time=${new Date().getTime()}`
}

const handleLogin = async () => {
  try {
    await formRef.value?.validate()
    const res = await loginApi(loginFormInfo.value)

    user.setToken(res.token)
    user.setUserInfo().then(() => {
      console.log('登录成功')
      router.replace('/')
    })
  } catch (error) {
    console.log(error)
    getCaptcha()
  }

  // console.log(validate)
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  width: 100vw;
  height: 100vh;
  background-color: #031b4a;
  background-image: url('../../assets/img/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  backdrop-filter: blur(100px); /* 背景模糊 */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;
  .login-container {
    width: 700px;
    height: 250px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 30px 20px;
    box-sizing: border-box;
    justify-content: space-between;
    position: relative;
    .login-form {
      position: absolute;
      right: 20px;
      top: -18%;
      bottom: -50%;
      width: 320px;
      height: 350px;
      background-color: #fff;
      border-radius: 10px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .login-title {
        color: #000;
        margin-bottom: 20px;
        font-size: 20px;
        font-weight: bold;
      }
      .btn {
        width: 100%;
      }
      .captcha-img {
        width: 100px;
        height: 30px;
        cursor: pointer;
        text-align: right;
      }
      .captcha-item {
        display: flex;
        width: 100%;
        justify-content: space-between;
      }
    }
    .logo-left {
      width: 50%;
      padding: 30px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .login-header {
        font-size: 28px;
        font-weight: bold;
        text-align: left;
        line-height: 1.2;
        margin-bottom: 20px;
      }
      .login-desc {
        font-size: 14px;
        line-height: 1.5;
      }
    }
  }
}
.login-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: inherit;
  background-size: inherit;
  background-position: inherit;
  filter: blur(4px);
  z-index: -1; /* 确保伪元素位于背景下方 */
}
</style>
