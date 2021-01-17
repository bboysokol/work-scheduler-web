import DefaultHeader from "src/pages/Dashboard/DefaultHeader";
import DashboardLayout from "src/pages/Dashboard/Layout/DashboardLayout.vue";
import AuthLayout from "src/pages/Dashboard/Pages/AuthLayout.vue";
import SchedulerHeader from "src/pages/Dashboard/Pages/CompanyAdminPages/Scheduler/SchedulerHeader";
import ScheduleHeader from "src/pages/Dashboard/Pages/Schedule/ScheduleHeader";
import NotFound from "src/pages/GeneralViews/NotFoundPage.vue";
import VueRouter from "vue-router";
import roleRedirect from "../helpers/dictionaries/roleRedirect";
import store from "../store";

const Schedule = () =>
	import(
		/* webpackChunkName: "calendar" */ "src/pages/Dashboard/Pages/Schedule/ScheduleRoute.vue"
	);
const Scheduler = () =>
	import(
		/* webpackChunkName: "calendar" */ "src/pages/Dashboard/Pages/CompanyAdminPages/Scheduler/SchedulerRoute.vue"
	);

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
const ActivateAccount = () =>
	import(
		/* webpackChunkName: "auth" */ "src/pages/Dashboard/Pages/ActivateAccount/ActivateAccount.vue"
	);
const Register = () =>
	import(
		/* webpackChunkName: "auth" */ "src/pages/Dashboard/Pages/Wizard/Register.vue"
	);
const CreateCompany = () =>
	import(
		/* webpackChunkName: "auth" */ "src/pages/Dashboard/Pages/Wizard/CreateCompany.vue"
	);
const UsersTable = () =>
	import(
		/* webpackChunkName: "tables" */ "src/pages/Dashboard/Pages/CompanyAdminPages/Users/UsersTable.vue"
	);
const UserEdit = () =>
	import(
		/* webpackChunkName: "tables" */ "src/pages/Dashboard/Pages/CompanyAdminPages/Users/EditUser.vue"
	);
const CompanyEdit = () =>
	import(
		/* webpackChunkName: "tables" */ "src/pages/Dashboard/Pages/CompanyAdminPages/Company/EditCompany.vue"
	);
const UserAdd = () =>
	import(
		/* webpackChunkName: "tables" */ "src/pages/Dashboard/Pages/CompanyAdminPages/Users/AddUser.vue"
	);
const CompaniesTable = () =>
	import(
		/* webpackChunkName: "tables" */ "src/pages/Dashboard/Pages/AdminPages/Companies/CompaniesTable.vue"
	);

let userPages = {
	path: "/user",
	component: DashboardLayout,
	name: "Pages",
	redirect: "/user/me",
	children: [
		{
			path: "me",
			meta: {
				forEmployees: true
			},
			name: "UserProfile",
			components: { default: User, header: DefaultHeader }
		},
		{
			path: "edit",
			meta: {
				forEmployees: true
			},
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
			path: "/activate/:token",
			name: "ActivateAccount",
			component: ActivateAccount
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
		},
		{
			path: "/company",
			name: "CreateCompany",
			component: CreateCompany
		}
	]
};

const routes = [
	{
		path: "/",
		redirect: "/schedule",
		name: "Home"
	},
	userPages,
	authPages,
	{
		path: "/",
		component: DashboardLayout,
		redirect: "/schedule",
		name: "Dashboard",
		children: [
			{
				path: "schedule",
				meta: {
					auth: true
				},
				name: "Schedule",
				components: { default: Schedule, header: ScheduleHeader }
			},
			{
				path: "scheduler",
				meta: {
					admin: true
				},
				name: "Scheduler",
				components: { default: Scheduler, header: SchedulerHeader }
			},
			{
				path: "users",
				meta: {
					admin: true
				},
				name: "Users Table",
				components: { default: UsersTable, header: DefaultHeader }
			},
			{
				path: "company/edit",
				meta: {
					adminOnly: true
				},
				name: "Company Edit",
				components: { default: CompanyEdit, header: DefaultHeader }
			},
			{
				path: "users/edit",
				meta: {
					admin: true
				},
				name: "User Edit",
				components: {
					default: UserEdit,
					header: DefaultHeader
				}
			},
			{
				path: "users/add",
				meta: {
					admin: true
				},
				name: "User Add",
				components: {
					default: UserAdd,
					header: DefaultHeader
				}
			},
			{
				path: "companies",
				meta: {
					appAdmin: true
				},
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

router.beforeEach((to, from, next) => {
	store.dispatch("restoreSession");

	const { isAppAdmin, isAdmin, isModerator, isLogged, user } = store.getters;

	if (to.matched.some((route) => route.meta.appAdmin)) {
		!isAppAdmin ? next({ name: "Login" }) : next();
	} else if (to.matched.some((route) => route.meta.adminOnly)) {
		!isAdmin ? next({ name: "Login" }) : next();
	} else if (to.matched.some((route) => route.meta.admin)) {
		!isAdmin && !isModerator ? next({ name: "Login" }) : next();
	} else if (to.matched.some((route) => route.meta.auth)) {
		!isLogged || isAppAdmin || isAdmin ? next({ name: "Login" }) : next();
	} else if (to.matched.some((route) => route.meta.forEmployees)) {
		!isLogged ? next({ name: "Login" }) : next();
	} else {
		isLogged ? next(roleRedirect[user.role]) : next();
	}
});

export default router;
