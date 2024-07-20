import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './style.css'



// importing primvue components for use
import ToastService from 'primevue/toastservice';


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

//START setting primevue components for use
app.use(Toast);
// END setting primevue components for use
app.mount('#app')
