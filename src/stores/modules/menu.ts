import { defineStore } from 'pinia'
import cache from '@/utils/cache'
import router from '@/router'

const ROUTE_LIST = ['/system/info']

export type MenuState = {
  selected: string[]
  isCollapsed: boolean
}

const useMenuStore = defineStore({
  id: 'menu',
  state: (): MenuState => {
    return {
      selected: [],
      isCollapsed: false
    }
  },
  actions: {
    setSelected(selected: string) {
      this.selected = [selected]

      // 设置缓存
      cache.set('selected', this.selected)
    },
    async loadSelected() {
      // 获取缓存
      this.selected = cache.get('selected') || ['0']
      await router.push(ROUTE_LIST[Number(this.selected)])
    },
    toggleMenu() {
      this.isCollapsed = !this.isCollapsed
    }
  }
})

export default useMenuStore
