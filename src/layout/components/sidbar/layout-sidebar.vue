<template>
  <a-menu
    :accordion="true"
    :collapsed="isCollapsed"
    :default-selected-keys="['0']"
    :selected-keys="selected"
    :style="{
      width: '220px',
      height: 'calc(100vh - 97px)',
      borderRight: '1px solid #e8e8e8',
      paddingTop: '5px'
    }"
    breakpoint="xl"
  >
    <a-menu-item key="0" @click="handleClickMenuItem({ path: '/system/info', selected: '0' })">
      <template #icon>
        <icon-nav size="22" />
      </template>
      学生信息
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts" setup>
import useMenuStore from '@/stores/modules/menu'
import router from '@/router'
import { computed, onMounted } from 'vue'

/** Data Start **/
const menuStore = useMenuStore()
/** Data End **/

/** Computed Start **/
const isCollapsed = computed(() => menuStore.isCollapsed)
const selected = computed(() => menuStore.selected)
/** Computed End **/

/** Method Start **/
// 页面跳转
const handleClickMenuItem = (item: { path: string; selected: string }) => {
  // 设置菜单状态
  menuStore.setSelected(item.selected)

  // 跳转
  router.push(item.path)
}
/** Method End **/

onMounted(() => {
  // 获取菜单状态
  menuStore.loadSelected()
})
</script>

<style scoped></style>
