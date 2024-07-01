import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from "axios";

loadFonts()


axios.defaults.baseURL = process.env.VUE_APP_API_URL ?? 'http://localhost'
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true;


try {
  await axios.get('/sanctum/csrf-cookie')
  await store.dispatch('getUser')
} catch (e) {
  //console.error(e)
}

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
