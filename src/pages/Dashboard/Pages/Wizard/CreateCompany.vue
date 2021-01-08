<template>
	<ValidationObserver ref="create" v-slot="{ handleSubmit }">
		<form @submit.prevent="handleSubmit(submit)">
			<div class="col-md-4 ml-auto mr-auto">
				<form @submit.prevent="create">
					<card class="card-login card-plain">
						<div slot="header">
							<div class="logo-container">
								<img src="/img/ws-logo.png" alt="" />
							</div>
						</div>
						<div>
							<p class="link" style="font-size:16px">
								Enter name of your company
							</p>
							<ValidationProvider
								name="CompanyName"
								rules="required"
								v-slot="{ errors, passed }"
							>
								<fg-input
									type="text"
									:error="errors[0]"
									:hasSuccess="passed"
									class="no-border form-control-lg mb-0"
									placeholder="Company Name"
									addon-left-icon="now-ui-icons ui-1_lock-circle-open"
									v-model="companyName"
								>
								</fg-input>
							</ValidationProvider>
						</div>
						<div slot="footer">
							<n-button
								native-type="submit"
								type="primary"
								round
								block
							>
								Create
							</n-button>
							<div class="pull-left">
								<h6>
									<router-link
										class="link footer-link"
										to="/login"
									>
										Login?
									</router-link>
								</h6>
							</div>
						</div>
					</card>
				</form>
			</div>
		</form>
	</ValidationObserver>
</template>
<script>
export default {
	data() {
		return {
			companyName: ""
		};
	},
	created() {
		if (!this.$route.params.id && !this.$route.params.tier)
			this.$router.push({ name: "Home" });
	},
	methods: {
		async create() {
			let isValidForm = await this.$refs.create.validate();
			if (isValidForm) {
				const result = await this.$company.addCompany({
					name: this.companyName,
					tier: +this.$route.params.tier,
					adminId: this.$route.params.id
				});
				if (result.status === true) {
					this.$notify({
						message: "Company created, now you can login",
						timeout: 4000,
						icon: "now-ui-icons ui-1_bell-53",
						horizontalAlign: "bottom",
						verticalAlign: "right",
						type: "success"
					});
					this.$router.push({ name: "Login" });
				}
			}
		}
	}
};
</script>
<style>
.navbar-nav .nav-item p {
	line-height: inherit;
	margin-left: 5px;
}
</style>
