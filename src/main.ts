import { createApp } from 'vue'

import App from './App.vue'
import { install } from '@/install'
import '@arco-themes/vue-ihbut/css/arco.css'
import './style.css'

const app = createApp(App)

app.use(install)

app.mount('#app')
