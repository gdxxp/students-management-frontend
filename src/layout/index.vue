<template>
  <div class="root">
    <layout-header />
    <div class="main">
      <div class="side-bar">
        <layout-sidebar />
      </div>
      <div class="container">
        <router-view />
      </div>
    </div>
    <layout-footer />
  </div>
</template>

<script lang="ts" setup>
import LayoutSidebar from '@/layout/components/sidbar/layout-sidebar.vue'
import LayoutHeader from '@/layout/components/header/layout-header.vue'
import LayoutFooter from '@/layout/components/footer/layout-footer.vue'
</script>

<style scoped>
.root {
  max-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.main {
  display: flex;
  flex: 1;
}

.container {
  padding: 10px;
}
</style>
