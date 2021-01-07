<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	computed: {
		...mapGetters(["user"])
	},
	methods: {
		...mapActions(["setCompany"]),
		async getCompanyData(id) {
			return await this.$company.getCompany(id);
		},
		restoreSession(newVal) {
			this.getCompanyData(newVal.CompanyId);
			this.$router.push({ name: "Dashboard" });
			this.setCompany(newVal.CompanyId);
		}
	},
	async created() {
		const result = await this.getCompanyData(this.user.CompanyId);
		console.log(result);
		if (result.status) this.setCompany(result.data);
	},
	watch: {
		user(newVal) {
			if (newVal !== null) {
				this.restoreSession(newVal);
			} else {
				this.$router.push({ name: "Login" });
			}
		}
	}
};
</script>
