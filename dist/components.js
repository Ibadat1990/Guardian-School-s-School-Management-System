import mainHeader from "../src/Components/mainHeader.js";
import navbar from "../src/Components/nav.js";

const app = Vue.createApp({
});
app.component("navbar-component", navbar);
app.component("main-header-component", mainHeader);
app.mount("#app");