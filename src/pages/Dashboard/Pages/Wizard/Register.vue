<template>
	<ValidationObserver ref="register" v-slot="{ handleSubmit }">
		<form @submit.prevent="handleSubmit(register)">
			<div class="row">
				<div class="col-lg-5 ml-auto">
					<div class="info-area info-horizontal mt-5">
						<div class="icon icon-primary">
							<i class="now-ui-icons media-2_sound-wave"></i>
						</div>
						<div class="description">
							<h5 class="info-title">
								Auto generating schedules
							</h5>
							<p class="description">
								Employees determine the availability on the
								basis of which the schedule is generated
							</p>
						</div>
					</div>

					<div class="info-area info-horizontal">
						<div class="icon icon-primary">
							<i class="now-ui-icons media-1_button-pause"></i>
						</div>
						<div class="description">
							<h5 class="info-title">Saving time</h5>
							<p class="description">
								The schedule arranges itself, and you can take a
								nap
							</p>
						</div>
					</div>

					<div class="info-area info-horizontal">
						<div class="icon icon-info">
							<i class="now-ui-icons users_single-02"></i>
						</div>
						<div class="description">
							<h5 class="info-title">Employee management</h5>
							<p class="description">
								Easily managed panel for managing employees
							</p>
						</div>
					</div>
				</div>
				<div class="col-lg-4 mr-auto">
					<card class="card-signup text-center" no-footer-line>
						<template slot="header">
							<img src="img/ws-logo.png" alt="" />
							<h4 class="card-title">Register</h4>
						</template>

						<ValidationProvider
							name="FirstName"
							rules="required"
							v-slot="{ passed, errors }"
						>
							<fg-input
								type="text"
								:error="errors[0]"
								:hasSuccess="passed"
								placeholder="First Name..."
								addon-left-icon="now-ui-icons users_circle-08"
								v-model="firstName"
							>
							</fg-input>
						</ValidationProvider>

						<ValidationProvider
							name="LastName"
							rules="required"
							v-slot="{ passed, errors }"
						>
							<fg-input
								type="text"
								:error="errors[0]"
								:hasSuccess="passed"
								placeholder="Last Name..."
								addon-left-icon="now-ui-icons text_caps-small"
								v-model="lastName"
							>
							</fg-input>
						</ValidationProvider>

						<ValidationProvider
							name="Email"
							rules="required|email"
							v-slot="{ passed, errors }"
						>
							<fg-input
								type="email"
								:error="errors[0]"
								:hasSuccess="passed"
								placeholder="Email..."
								addon-left-icon="now-ui-icons ui-1_email-85"
								v-model="email"
							>
							</fg-input>
						</ValidationProvider>

						<ValidationProvider
							name="Password"
							rules="required|confirmed:RepeatPassword"
							v-slot="{ passed, errors }"
						>
							<fg-input
								type="password"
								:error="errors[0]"
								:hasSuccess="passed"
								placeholder="Password..."
								addon-left-icon="now-ui-icons objects_key-25"
								v-model="password"
							>
							</fg-input>
						</ValidationProvider>

						<ValidationProvider
							name="RepeatPassword"
							rules="required"
							v-slot="{ passed, errors }"
						>
							<fg-input
								type="password"
								:error="errors[0]"
								:hasSuccess="passed"
								placeholder="Repeat Password..."
								addon-left-icon="now-ui-icons objects_key-25"
								v-model="repeatPassword"
							>
							</fg-input>
						</ValidationProvider>

						<n-button
							slot="footer"
							type="primary"
							native-type="submit"
							round
							size="lg"
						>
							Get Started
						</n-button>
					</card>
				</div>
			</div>
		</form>
	</ValidationObserver>
</template>
<script>
export default {
	data() {
		return {
			email: "",
			firstName: "",
			lastName: "",
			password: "",
			repeatPassword: ""
		};
	},
	methods: {
		async register() {
			let isValidForm = await this.$refs.register.validate();
			if (isValidForm) {
				var result = await this.$auth.register({
					email: this.email,
					firstName: this.firstName,
					lastName: this.lastName,
					password: this.password
				});
				if (result.status === true) {
					this.$router.push({
						name: "Pricing",
						params: { id: result.data }
					});
					if (this.$route.params.tier)
						this.$router.push({
							name: "CreateCompany",
							params: {
								id: result.data,
								tier: this.$route.params.tier
							}
						});
				}
			}
		}
	}
};
</script>
<style></style>
