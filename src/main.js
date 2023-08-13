import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'
import GoogleMap from 'vue-google-maps-ui'

const app = createApp(App);
app.use(router).mount('#app');
app.component('Googlemap', GoogleMap)


