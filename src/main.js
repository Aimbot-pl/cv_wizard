window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
window.html2pdf = require('html2pdf.js/dist/html2pdf.bundle.js');
window.gsap = require('gsap');

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");
