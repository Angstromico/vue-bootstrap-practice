import { createApp } from 'vue'
import './style.css'
import { createBootstrap } from 'bootstrap-vue-next'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import App from './App.vue'

// 1. Create the instance
const app = createApp(App)

// 2. Install the plugin on the instance
app.use(createBootstrap())

// 3. Mount it
app.mount('#app')
