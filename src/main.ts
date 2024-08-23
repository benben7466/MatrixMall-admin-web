import { createApp } from 'vue'
import App from './App.vue'
import setupPlugins from "@/plugins";

//样式
import 'element-plus/theme-chalk/dark/css-vars.css'
import "@/styles/index.scss";
import 'virtual:uno.css'
import "animate.css";

//SVG图标
import "virtual:svg-icons-register";

const app = createApp(App);
app.use(setupPlugins);
app.mount("#app");
