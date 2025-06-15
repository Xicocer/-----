/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { RecycleScroller, DynamicScroller } from 'vue3-virtual-scroller'


// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css'

const app = createApp(App)

app.component('RecycleScroller', RecycleScroller)
app.component('DynamicScroller', DynamicScroller)

registerPlugins(app)

app.mount('#app')
