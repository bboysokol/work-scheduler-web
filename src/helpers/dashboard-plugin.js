import "bootstrap/scss/bootstrap.scss";
import locale from "element-ui/lib/locale";
import lang from "element-ui/lib/locale/lang/en";
import "es6-promise/auto";
import Notifications from "src/components/NotificationPlugin";
import "../assets/css/demo.css";
import "../assets/sass/now-ui-dashboard.scss";
import SideBar from "../components/SidebarPlugin";
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import "./polyfills";

locale.use(lang);

export default {
	install(Vue) {
		Vue.use(GlobalComponents);
		Vue.use(GlobalDirectives);
		Vue.use(SideBar);
		Vue.use(Notifications);
	}
};
