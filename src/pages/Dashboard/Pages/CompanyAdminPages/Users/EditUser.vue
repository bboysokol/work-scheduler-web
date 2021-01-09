<template>
	<div class="row d-flex justify-content-center">
		<div class="col-lg-5 col-md-8">
			<ValidationObserver ref="edit" v-slot="{ handleSubmit }">
				<card class="card-user" v-if="userCopy !== null">
					<h5 slot="header" class="title">Edit User</h5>
					<form @submit.prevent="handleSubmit(save)">
						<div class="row">
							<div class="col-12">
								<el-select
									class="select-danger"
									v-model="userCopy.role"
								>
									<el-option
										v-for="option in roles"
										class="select-danger"
										:value="option.value"
										:label="option.label"
										:key="option.label"
									>
									</el-option>
								</el-select>
							</div>
							<div class="col-md-4">
								<fg-input
									type="text"
									:disabled="true"
									label="EmploymentType"
									placeholder="EmploymentType"
									v-model="
										userCopy.personalData.employmentType
									"
								>
								</fg-input>
							</div>
							<div class="col-md-8">
								<ValidationProvider
									name="Email"
									rules="required|email"
									v-slot="{ passed, errors }"
								>
									<fg-input
										type="email"
										label="Email"
										:error="errors[0]"
										:hasSuccess="passed"
										placeholder="Email"
										v-model="userCopy.email"
									>
									</fg-input>
								</ValidationProvider>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6">
								<fg-input
									disabled
									type="text"
									label="First Name"
									placeholder="First Name"
									v-model="userCopy.personalData.firstName"
								>
								</fg-input>
							</div>
							<div class="col-md-6">
								<fg-input
									disabled
									type="text"
									label="Last Name"
									placeholder="Last Name"
									v-model="userCopy.personalData.lastName"
								>
								</fg-input>
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
import { Select, Option } from "element-ui";
export default {
	components: {
		[Select.name]: Select,
		[Option.name]: Option
	},
	data() {
		return {
			test: "",
			userCopy: null,
			roles: [
				{ value: "Admin", label: "Admin" },
				{ value: "Moderator", label: "Moderator" },
				{ value: "Employee", label: "Employee" }
			]
		};
	},
	mounted() {
		if (this.$route.params.user) {
			this.userCopy = { ...this.$route.params.user };
			const fullname = this.userCopy.Fullname.split(" ");
			this.userCopy.firstName = fullname[0];
			this.userCopy.lastName = fullname[1];
		} else this.$router.push({ name: "Users Table" });
	},
	methods: {
		async save() {
			let isValidForm = await this.$refs.edit.validate();
			if (isValidForm) {
				const result = await this.$user.updateUser(this.userCopy.id, {
					email: this.userCopy.email,
					role: this.userCopy.role
				});
				if (result.status === true) {
					this.$notify({
						message: "User updated successfuly",
						timeout: 4000,
						icon: "now-ui-icons ui-1_bell-53",
						horizontalAlign: "bottom",
						verticalAlign: "right",
						type: "success"
					});
					this.$router.push({ name: "Users Table" });
				}
			}
		}
	}
};
</script>
<style></style>
