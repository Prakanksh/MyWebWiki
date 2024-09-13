// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VTreeview } from 'vuetify/labs/VTreeview';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { md1 } from 'vuetify/blueprints'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components: {
    VTreeview,
    ...components,
  },
  directives,
  blueprint: md1,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})



const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
