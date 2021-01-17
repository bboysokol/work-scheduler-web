import Axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
import VueCookies from "vue-cookies";
import VueRouter from "vue-router";
import App from "./App.vue";
import cookieHelper from "./helpers/cookieHelper";
import DashboardPlugin from "./helpers/dashboard-plugin";
import "./helpers/veeValidate";
import i18n from "./locales/i18n";
import router from "./router";
import authorizationService from "./services/authorizationService.js";
import companyService from "./services/companyService.js";
import profileService from "./services/profileService.js";
import scheduleService from "./services/scheduleService.js";
import shiftService from "./services/shiftService.js";
import userService from "./services/userService.js";
import store from "./store";

Vue.use(authorizationService);
Vue.use(companyService);
Vue.use(profileService);
Vue.use(scheduleService);
Vue.use(shiftService);
Vue.use(userService);

Vue.use(VueCookies);
Vue.use(VueAxios, Axios);
Vue.use(VueRouter);
Vue.use(DashboardPlugin);

Vue.axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

Vue.axios.interceptors.request.use(
	(config) => {
		const token = cookieHelper.getSessionCookie();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

Vue.axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		let errorResponse = error.response;
		if (!errorResponse) {
			router.push({
				name: "Login"
			});
			errorResponse = {
				data: {
					success: false,
					message: "Connection error"
				}
			};
		}
		Vue.prototype.$notify({
			message: error.response.data.Message,
			timeout: 3000,
			icon: "now-ui-icons ui-1_bell-53",
			horizontalAlign: "right",
			verticalAlign: "top",
			type: "danger"
		});
		return Promise.reject(errorResponse);
	}
);

new Vue({
	el: "#app",
	render: (h) => h(App),
	store,
	i18n,
	router
});
