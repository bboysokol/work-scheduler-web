import Vue from "vue";
import Vuex from "vuex";
import cookieHelper from "../helpers/cookieHelper";
import parseJwt from "../helpers/parseJwt";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
		company: null
	},
	getters: {
		user: (state) => state.user,
		company: (state) => state.company,
		isLogged: (state) => !!state.user,
		isAppAdmin: (state) => !!state.user && state.user.role === "AppAdmin",
		isAdmin: (state) => !!state.user && state.user.role === "Admin",
		isModerator: (state) => !!state.user && state.user.role === "Moderator"
	},
	mutations: {
		storeUser(state, user) {
			state.user = user;
		},
		storeCompany(state, company) {
			state.company = company;
		},
		storeFullname(state, fullname) {
			state.user.Fullname = fullname;
		}
	},
	actions: {
		setSession({ commit }, token) {
			commit("storeUser", parseJwt(token));
			cookieHelper.setSessionCookie(token);
		},
		setCompany({ commit }, company) {
			commit("storeCompany", company);
		},
		setFullName({ commit }, fullname) {
			commit("storeFullname", fullname);
		},
		restoreSession({ dispatch, state }) {
			if (cookieHelper.hasSessionCookie() && state.user === null) {
				dispatch("setSession", cookieHelper.getSessionCookie());
			}
		},
		destroySession({ commit }) {
			commit("storeUser", null);
			commit("storeCompany", null);
			cookieHelper.deleteSessionCookie();
		}
	}
});
