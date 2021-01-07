<template>
	<div class="row d-flex justify-content-center">
		<div class="col-lg-5 col-md-8">
			<ValidationObserver ref="edit" v-slot="{ handleSubmit }">
				<card
					class="card-user"
					v-if="company !== null && userCopy !== null"
				>
					<h5 slot="header" class="title">Edit Profile</h5>
					<form @submit.prevent="handleSubmit(save)">
						<div class="row">
							<div class="col-md-7">
								<fg-input
									type="text"
									label="Company"
									:disabled="true"
									placeholder="Company"
									v-model="company.name"
								>
								</fg-input>
							</div>
							<div class="col-md-5">
								<fg-input
									type="text"
									label="Role"
									:disabled="true"
									placeholder="Role"
									v-model="userCopy.role"
								>
								</fg-input>
							</div>
							<div class="col-md-4">
								<fg-input
									type="text"
									:disabled="true"
									label="EmploymentType"
									placeholder="EmploymentType"
									v-model="userCopy.EmploymentType"
								>
								</fg-input>
							</div>
							<div class="col-md-8">
								<fg-input
									type="email"
									label="Email"
									:disabled="true"
									placeholder="Email"
									v-model="userCopy.email"
								>
								</fg-input>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6">
								<ValidationProvider
									name="FirstName"
									rules="required"
									v-slot="{ passed, errors }"
								>
									<fg-input
										type="text"
										:error="errors[0]"
										:hasSuccess="passed"
										label="First Name"
										placeholder="First Name"
										v-model="userCopy.firstName"
									>
									</fg-input>
								</ValidationProvider>
							</div>
							<div class="col-md-6">
								<ValidationProvider
									name="LastName"
									rules="required"
									v-slot="{ passed, errors }"
								>
									<fg-input
										type="text"
										:error="errors[0]"
										:hasSuccess="passed"
										label="Last Name"
										placeholder="Last Name"
										v-model="userCopy.lastName"
									>
									</fg-input>
								</ValidationProvider>
							</div>
						</div>
						<div class="button-container">
							<n-button
								native-type="submit"
								type="success"
								round
								size="lg"
							>
								Save
							</n-button>
						</div>
					</form>
				</card>
			</ValidationObserver>
		</div>
	</div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
	data() {
		return {
			userCopy: null
		};
	},
	computed: {
		...mapGetters(["user", "company"])
	},
	mounted() {
		this.userCopy = { ...this.user };
		const fullname = this.userCopy.Fullname.split(" ");
		this.userCopy.firstName = fullname[0];
		this.userCopy.lastName = fullname[1];
	},
	methods: {
		async save() {
			let isValidForm = await this.$refs.edit.validate();
			if (isValidForm) {
				const result = await this.$auth.logIn({
					email: this.email,
					password: this.password
				});
				console.log(result);
			}
			alert("Your data: " + JSON.stringify(this.user));
		}
	}
};
</script>
<style></style>
