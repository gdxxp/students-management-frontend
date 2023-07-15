<template>
  <a-result status="404" subtitle="您访问的页面不存在...">
    <template #extra>
      <a-space>
        <a-button type="primary" @click="goBack()">返回</a-button>
      </a-space>
    </template>
  </a-result>
</template>

<script lang="ts" setup>
import router from '@/router'

const goBack = () => {
  router.back()
}
</script>

<style scoped></style>
