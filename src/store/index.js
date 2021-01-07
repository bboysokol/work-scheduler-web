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
		company: (state) => state.company
	},
	mutations: {
		storeUser(state, user) {
			state.user = user;
		},
		storeCompany(state, company) {
			state.company = company;
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
		restoreSession({ dispatch, state }) {
			if (cookieHelper.hasSessionCookie() && state.user === null) {
				dispatch("setSession", cookieHelper.getSessionCookie());
			}
		},
		destroySession({ commit }) {
			commit("storeUser", null);
			commit("setCompany", null);
			cookieHelper.deleteSessionCookie();
		}
	}
});
