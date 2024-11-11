import { defineStore } from 'pinia'
import { getUserInfoApi } from '@/api'

import { IUserState } from './types/userStoreType'



const userStore = defineStore('user', {
  state: (): IUserState => ({
    token: localStorage.getItem('token') || '',
    userInfo: null,
    menuList: [],
    roleList: []
  }),
  actions: {
    setToken(token: string) {
      localStorage.setItem('token', token)
      this.token = token
    },
    async setUserInfo() {
      // this.userInfo = userInfo
      const res = await getUserInfoApi()
      console.log('res', res)
    },
    loginOut() {
      this.token = ''
      this.userInfo = null
      this.menuList = []
      this.roleList = []
      localStorage.clear()
    }
  }
})

export default userStore