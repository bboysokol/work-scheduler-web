<template>
	<ValidationObserver ref="login" v-slot="{ handleSubmit }">
		<form @submit.prevent="handleSubmit(submit)">
			<div class="col-md-4 ml-auto mr-auto">
				<form @submit.prevent="login">
					<card class="card-login card-plain">
						<div slot="header">
							<div class="logo-container">
								<img src="img/ws-logo.png" alt="" />
							</div>
						</div>

						<div>
							<ValidationProvider
								name="Email"
								rules="required|email"
								v-slot="{ passed, errors }"
							>
								<fg-input
									type="email"
									:error="errors[0]"
									:hasSuccess="passed"
									class="no-border form-control-lg"
									placeholder="Email"
									addon-left-icon="now-ui-icons ui-1_email-85"
									v-model="email"
								>
								</fg-input>
							</ValidationProvider>

							<ValidationProvider
								name="Password"
								rules="required|min:5"
								v-slot="{ passed, errors }"
							>
								<fg-input
									type="password"
									:error="errors[0]"
									:hasSuccess="passed"
									class="no-border form-control-lg"
									placeholder="Password"
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
								Get Started
							</n-button>
							<div class="pull-left">
								<h6>
									<router-link
										class="link footer-link"
										to="/register"
									>
										Create Account
									</router-link>
								</h6>
							</div>

							<div class="pull-right">
								<h6>
									<a href="#pablo" class="link footer-link"
										>Need Help?</a
									>
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
	name: "login",
	data() {
		return {
			email: "admin@workscheduler.com",
			password: "example"
		};
	},
	methods: {
		async login() {
			let isValidForm = await this.$refs.login.validate();
			if (isValidForm) {
				await this.$auth.logIn({
					email: this.email,
					password: this.password
				});
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
