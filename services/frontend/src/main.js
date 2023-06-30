import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5050/"; // the fast api backend

app.use(router);
app.mount("#app");
