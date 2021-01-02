import Axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
import VueCookies from "vue-cookies";
import VueRouter from "vue-router";
import App from "./App.vue";
import DashboardPlugin from "./helpers/dashboard-plugin";
import router from "./router";
import authorizationService from "./services/authorizationService.js";
import store from "./store";

Vue.use(authorizationService);
Vue.use(VueCookies);
Vue.use(VueAxios, Axios);
Vue.use(VueRouter);
Vue.use(DashboardPlugin);

Vue.axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

new Vue({
	el: "#app",
	render: (h) => h(App),
	store,
	router
});
