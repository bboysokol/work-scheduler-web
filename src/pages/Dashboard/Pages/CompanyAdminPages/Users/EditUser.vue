<template>
	<div class="row d-flex justify-content-center">
		<div class="col-lg-5 col-md-8">
			<ValidationObserver ref="edit" v-slot="{ handleSubmit }">
				<card class="card-user" v-if="userCopy !== null">
					<h5 slot="header" class="title">Edit User</h5>
					<form @submit.prevent="handleSubmit(save)">
						<div class="row">
							<div class="col-6">
								<label class="mb-0"> Role </label>
								<el-select
									class="select-danger"
									v-model="userCopy.role"
								>
									<el-option
										v-for="option in availableRoles"
										class="select-danger"
										:value="option.value"
										:label="option.label"
										:key="option.label"
									>
									</el-option>
								</el-select>
							</div>
							<div class="col-md-4">
								<ValidationProvider
									name="EmploymentType"
									rules="required"
									v-slot="{ passed, errors }"
								>
									<label class="mb-0">
										Employment Type
									</label>

									<el-select
										class="select-danger"
										:error="errors[0]"
										:hasSuccess="passed"
										v-model="
											userCopy.personalData.employmentType
										"
									>
										<el-option
											v-for="option in employmentTypes"
											class="select-danger"
											:value="option.value"
											:label="option.label"
											:key="option.label"
										>
										</el-option>
									</el-select>
								</ValidationProvider>
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
import { mapGetters } from "vuex";

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
				{ value: "Admin", label: "Admin", forAdmin: true },
				{ value: "Moderator", label: "Moderator", forAdmin: false },
				{ value: "Employee", label: "Employee", forAdmin: false }
			],
			employmentTypes: [
				{ value: 1, label: "1" },
				{ value: 0.75, label: "3/4" },
				{ value: 0.5, label: "1/2" },
				{ value: 0, label: "0" }
			]
		};
	},
	computed: {
		...mapGetters(["isAdmin"]),
		availableRoles() {
			return this.roles.filter(
				(i) => !i.forAdmin || (this.isAdmin && i.forAdmin)
			);
		}
	},
	mounted() {
		if (this.$route.params.user) {
			this.userCopy = { ...this.$route.params.user };
		} else this.$router.push({ name: "Users Table" });
	},
	methods: {
		async save() {
			let isValidForm = await this.$refs.edit.validate();
			if (isValidForm) {
				const result = await this.$user.updateUser(this.userCopy.id, {
					email: this.userCopy.email,
					role: this.userCopy.role,
					employmentType: this.userCopy.personalData.employmentType
				});
				if (result.status === true) {
					this.$notify({
						message: "User updated successfuly",
						timeout: 4000,
						icon: "now-ui-icons ui-1_bell-53",
						horizontalAlign: "right",
						verticalAlign: "top",
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
