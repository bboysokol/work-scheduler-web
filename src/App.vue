<template>
	<div>
		<notifications></notifications>
		<router-view></router-view>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import cookieHelper from "./helpers/cookieHelper";
import roleRedirect from "./helpers/dictionaries/roleRedirect";
export default {
	computed: {
		...mapGetters(["user", "isLogged", "isAppAdmin"]),
		hasToken() {
			return cookieHelper.hasSessionCookie();
		}
	},
	methods: {
		...mapActions(["setCompany", "destroySession"]),
		async getCompanyData(id) {
			return await this.$company.getCompany(id);
		},
		restoreSession(newVal) {
			if (!this.isAppAdmin) {
				this.getCompanyData(newVal.CompanyId);
				this.setCompany(newVal.CompanyId);
			}
			this.$router.push(roleRedirect[this.user.role]);
		}
	},
	async mounted() {
		if (!this.isAppAdmin && this.isLogged) {
			const result = await this.getCompanyData(this.user.CompanyId);
			if (result.status) this.setCompany(result.data);
		}
	},
	watch: {
		user(newVal) {
			if (newVal !== null) {
				this.restoreSession(newVal);
			} else {
				this.$router.push({ name: "Login" });
			}
		},
		hasToken(newVal) {
			if (!newVal) this.destroySession();
		}
	}
};
</script>
