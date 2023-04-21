import { createApp } from 'vue';
import { createPinia } from 'pinia';

// import App from './App.vue';
import App from './OrderApp.vue';
import router from './router';
// import i18n from './i18n.js';

import './assets/css/main.css';

const app = createApp(App);

// app.use(i18n);
app.use(createPinia());
app.use(router);

app.mount('#app');
