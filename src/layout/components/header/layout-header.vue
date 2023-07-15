<template>
  <div class="header">
    <div class="header-main">
      <img src="../../../assets/img/logo.png" alt="logo" class="header-logo" />
      <div style="flex: 1"></div>
      <a-dropdown trigger="hover">
        <div class="header-user">
          <a-avatar style="background-color: #ffffff; color: #0367a9">
            <icon-user />
          </a-avatar>
          <icon-down class="header-user-down" />
        </div>
        <template #content>
          <a-doption @click="handleLogout()">
            <template #icon>
              <icon-export />
            </template>
            退出登录
          </a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import cache from '@/utils/cache'
import router from '@/router'
import {Message} from "@arco-design/web-vue";

/** Data Start **/
/** Data End **/

/** Method Start **/
// 退出登录
const handleLogout = () => {
  cache.clear()
  router.push('/login')
  Message.success({
    content: '退出成功'
  })
}
/** Method End **/
</script>

<style scoped>
.header {
  height: 61px;
  background: rgb(155, 248, 160);
  width: 100%;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
}

.header-main {
  padding: 0 10px;
  width: 100%;
  display: flex;
  align-items: center;
}

.header-logo {
  height: 50px;
}

.header-user {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.header-user-down {
  color: #ffffff;
  font-size: 18px;
  margin-left: 5px;
  transition: 0.1s;
}

.header-user:hover .header-user-down {
  transform: rotate(180deg);
}
</style>
