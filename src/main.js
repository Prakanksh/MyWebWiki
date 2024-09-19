import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router

// Vuetify imports (if you're using Vuetify)
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App);

app.use(router); // Use the router
app.use(vuetify); // Use Vuetify if applicable

app.mount('#app');
