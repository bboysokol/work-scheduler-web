<template>
	<ValidationObserver ref="activate" v-slot="{ handleSubmit }">
		<form @submit.prevent="handleSubmit(submit)">
			<div class="col-md-4 ml-auto mr-auto">
				<form @submit.prevent="activate">
					<card class="card-login card-plain">
						<div slot="header">
							<div class="logo-container">
								<img
									src="/work-scheduler-web/img/ws-logo.png"
									alt=""
								/>
							</div>
						</div>
						<div>
							<p class="link" style="font-size:16px">
								Enter the password with which you will log into
								the website
							</p>
							<ValidationProvider
								name="Password"
								rules="required|min:5"
								v-slot="{ passed, errors }"
							>
								<fg-input
									type="password"
									:error="errors[0]"
									:hasSuccess="passed"
									class="no-border form-control-lg mb-0"
									placeholder="New Password"
									addon-left-icon="now-ui-icons ui-1_lock-circle-open"
									v-model="password"
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
								Activate
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
			token: "",
			password: "example"
		};
	},
	created() {
		if (this.$route.params.token) this.token = this.$route.params.token;
	},
	methods: {
		async activate() {
			let isValidForm = await this.$refs.activate.validate();
			if (isValidForm) {
				const result = await this.$auth.activateAccount({
					token: this.token,
					newPassword: this.password
				});
				if (result.status) {
					this.$notify({
						message:
							"User activated successfuly. Now you can login into your account",
						timeout: 4000,
						icon: "now-ui-icons ui-1_bell-53",
						horizontalAlign: "right",
						verticalAlign: "top",
						type: "success"
					});
					this.$router.push({ name: "Login" });
				}
			}
		},
		submit() {
			alert("Form has been submitted!");
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
