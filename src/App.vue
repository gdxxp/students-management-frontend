<template>
  <a-config-provider :locale="zhCn">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import zhCn from '@arco-design/web-vue/es/locale/lang/zh-cn'
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
