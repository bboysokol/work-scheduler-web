import SweetAlertHeader from "src/pages/Dashboard/Components/Headers/SweetAlertHeader";
import DefaultHeader from "src/pages/Dashboard/DefaultHeader";
import DashboardLayout from "src/pages/Dashboard/Layout/DashboardLayout.vue";
import AuthLayout from "src/pages/Dashboard/Pages/AuthLayout.vue";
import SchedulerHeader from "src/pages/Dashboard/Pages/CompanyAdminPages/Scheduler/SchedulerHeader";
import ScheduleHeader from "src/pages/Dashboard/Pages/Schedule/ScheduleHeader";
// GeneralViews
import NotFound from "src/pages/GeneralViews/NotFoundPage.vue";
import VueRouter from "vue-router";

// Calendar
const Schedule = () =>
	import(
		/* webpackChunkName: "calendar" */ "src/pages/Dashboard/Pages/Schedule/ScheduleRoute.vue"
	);
const Scheduler = () =>
	import(
		/* webpackChunkName: "calendar" */ "src/pages/Dashboard/Pages/CompanyAdminPages/Scheduler/SchedulerRoute.vue"
	);
// Components pages
const Buttons = () =>
	import(
		/* webpackChunkName: "components" */ "src/pages/Dashboard/Components/Buttons.vue"
	);
const GridSystem = () =>
	import(
		/* webpackChunkName: "components" */ "src/pages/Dashboard/Components/GridSystem.vue"
	);
const Panels = () =>
	import(
		/* webpackChunkName: "components" */ "src/pages/Dashboard/Components/Panels.vue"
	);
const SweetAlert = () =>
	import(
		/* webpackChunkName: "components" */ "src/pages/Dashboard/Components/SweetAlert.vue"
	);
const Notifications = () =>
	import(
		/* webpackChunkName: "components" */ "src/pages/Dashboard/Components/Notifications.vue"
	);
const Icons = () =>
	import(
		/* webpackChunkName: "components" */ "src/pages/Dashboard/Components/Icons.vue"
	);
const Typography = () =>
	import(
		/* webpackChunkName: "components" */ "src/pages/Dashboard/Components/Typography.vue"
	);

// Forms pages
const RegularForms = () => import("src/pages/Dashboard/Forms/RegularForms.vue");
const ExtendedForms = () =>
	import("src/pages/Dashboard/Forms/ExtendedForms.vue");
const ValidationForms = () =>
	import("src/pages/Dashboard/Forms/ValidationForms.vue");
const Wizard = () => import("src/pages/Dashboard/Pages/Wizard/Wizard.vue");

// Pages
const User = () =>
	import(
		/* webpackChunkName: "pages" */ "src/pages/Dashboard/Pages/UserProfile/UserProfile.vue"
	);
const EditUser = () =>
	import(
		/* webpackChunkName: "pages" */ "src/pages/Dashboard/Pages/UserProfile/EditProfile.vue"
	);
const Pricing = () =>
	import(
		/* webpackChunkName: "pages" */ "src/pages/Dashboard/Pages/Wizard/Pricing.vue"
	);
const Login = () =>
	import(
		/* webpackChunkName: "auth" */ "src/pages/Dashboard/Pages/Login/Login.vue"
	);
const Register = () =>
	import(
		/* webpackChunkName: "auth" */ "src/pages/Dashboard/Pages/Wizard/Register.vue"
	);

const UsersTable = () =>
	import(
		/* webpackChunkName: "tables" */ "src/pages/Dashboard/Pages/CompanyAdminPages/Users/UsersTable.vue"
	);

const CompaniesTable = () =>
	import(
		/* webpackChunkName: "tables" */ "src/pages/Dashboard/Pages/AdminPages/Companies/CompaniesTable.vue"
	);

let componentsMenu = {
	path: "/components",
	component: DashboardLayout,
	redirect: "/components/buttons",
	name: "Components",
	children: [
		{
			path: "buttons",
			name: "Buttons",
			components: { default: Buttons, header: DefaultHeader }
		},
		{
			path: "grid-system",
			name: "Grid System",
			components: { default: GridSystem, header: DefaultHeader }
		},
		{
			path: "panels",
			name: "Panels",
			components: { default: Panels, header: DefaultHeader }
		},
		{
			path: "sweet-alert",
			name: "Sweet Alert",
			components: { default: SweetAlert, header: SweetAlertHeader }
		},
		{
			path: "notifications",
			name: "Notifications",
			components: { default: Notifications, header: DefaultHeader }
		},
		{
			path: "icons",
			name: "Icons",
			components: { default: Icons, header: DefaultHeader }
		},
		{
			path: "typography",
			name: "Typography",
			components: { default: Typography, header: DefaultHeader }
		}
	]
};
let formsMenu = {
	path: "/forms",
	component: DashboardLayout,
	redirect: "/forms/regular",
	name: "Forms",
	children: [
		{
			path: "regular",
			name: "Regular Forms",
			components: { default: RegularForms, header: DefaultHeader }
		},
		{
			path: "extended",
			name: "Extended Forms",
			components: { default: ExtendedForms, header: DefaultHeader }
		},
		{
			path: "validation",
			name: "Validation Forms",
			components: { default: ValidationForms, header: DefaultHeader }
		},
		{
			path: "wizard",
			name: "Wizard",
			components: { default: Wizard, header: DefaultHeader }
		}
	]
};

let pagesMenu = {
	path: "/user",
	component: DashboardLayout,
	name: "Pages",
	redirect: "/pages/user",
	children: [
		{
			path: "me",
			name: "User Page",
			components: { default: User, header: DefaultHeader }
		},
		{
			path: "edit",
			name: "Edit Profile",
			components: { default: EditUser, header: DefaultHeader }
		}
	]
};

let authPages = {
	path: "/",
	component: AuthLayout,
	name: "Authentication",
	children: [
		{
			path: "/login",
			name: "Login",
			component: Login
		},
		{
			path: "/register",
			name: "Register",
			component: Register
		},
		{
			path: "/pricing",
			name: "Pricing",
			component: Pricing
		}
	]
};

const routes = [
	{
		path: "/",
		redirect: "/schedule",
		name: "Home"
	},
	componentsMenu,
	formsMenu,
	pagesMenu,
	authPages,
	{
		path: "/",
		component: DashboardLayout,
		redirect: "/schedule",
		name: "Dashboard",
		children: [
			{
				path: "schedule",
				name: "Schedule",
				components: { default: Schedule, header: ScheduleHeader }
			},
			{
				path: "scheduler",
				name: "Scheduler",
				components: { default: Scheduler, header: SchedulerHeader }
			},
			{
				path: "users",
				name: "Users Table",
				components: { default: UsersTable, header: DefaultHeader }
			},
			{
				path: "companies",
				name: "Companies Table",
				components: { default: CompaniesTable, header: DefaultHeader }
			}
		]
	},
	{ path: "*", component: NotFound }
];

const router = new VueRouter({
	mode: "history",
	routes,
	linkActiveClass: "active"
});

// router.beforeEach((to, from, next) => {
// 	store.dispatch("restoreSession");
// 	const { user } = store.getters;
// 	if (to.matched.some((route) => route.meta.requiresAuth)) {
// 		!user ? next({ name: "Login" }) : next();
// 	}
// 	if (to.matched.some((route) => !route.meta.requiresAuth)) {
// 		user ? next({ name: "Home" }) : next();
// 	}
// });

export default router;