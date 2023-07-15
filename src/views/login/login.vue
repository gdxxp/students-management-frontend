<template>
  <div class="login-con flex justify-center items-center">
    <div class="hidden md:flex justify-center items-center">
      <img
        src="../../assets/img/image_login.jpg"
        width="400"
        height="400"
        alt="image"
        style="border-radius: 5px 0 0 5px"
      />
    </div>
    <div class="flex justify-center items-center" style="border-radius: 5px; overflow: hidden">
      <div
        class="flex flex-col justify-center items-center bg-white"
        style="height: 400px; width: 400px"
      >
        <div class="text-3xl mb-5">学生信息管理系统</div>
        <a-space class="flex flex-col items-center p-3" direction="vertical">
          <div class="mt-5">
            <a-input
              v-model="loginForm.username"
              class="w-full"
              placeholder="请输入用户名"
              size="large"
              style="width: 320px"
              @keyup.enter="handleLogin()"
            >
              <template #prefix>
                <icon-user />
              </template>
            </a-input>
          </div>
          <div class="mt-3">
            <a-input
              v-model="loginForm.password"
              class="w-full"
              placeholder="请输入密码"
              size="large"
              style="width: 320px"
              type="password"
              @keyup.enter="handleLogin()"
            >
              <template #prefix>
                <icon-lock />
              </template>
            </a-input>
          </div>
        </a-space>
        <a-space class="mt-2" direction="vertical" style="width: 320px">
          <a-button long size="large" type="primary" @click="handleLogin()">登录</a-button>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { checkToken, login } from '@/api'
import cache from '@/utils/cache'
import router from '@/router'
import { Message } from '@arco-design/web-vue'
import { onMounted, reactive } from 'vue'
import useMenuStore from '@/stores/modules/menu'

const menuStore = useMenuStore()

const loginForm = reactive({
  username: '',
  password: ''
})

const handleLogin = async () => {
  if (!loginForm.username.trim() || !loginForm.password.trim()) {
    Message.error({
      content: '用户名或密码不能为空'
    })
    return
  }
  const formData = new FormData()
  formData.set('username', `${loginForm.username}`)
  formData.set('password', `${loginForm.password}`)
  const resp = await login(formData)
  if (resp.code === 200) {
    cache.set('token', resp.data.token)
    Message.success({
      content: '登录成功'
    })
    await router.push('/system/info')
  } else {
    Message.error({
      content: '用户名或密码错误'
    })
  }
}

onMounted(async () => {
  const resp = await checkToken()
  if (resp.code === 200) {
    Message.success({
      content: '登录成功'
    })
    if (cache.get('selected')) {
      await menuStore.loadSelected()
    } else {
      await router.push('/system/info')
    }
  }
})
</script>

<style scoped>
.login-con {
  width: 100%;
  height: 100vh;
  background-image: url('/src/assets/img/bg_login.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
