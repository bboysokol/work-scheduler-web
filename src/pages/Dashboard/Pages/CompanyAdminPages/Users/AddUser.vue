<template>
	<div class="row d-flex justify-content-center">
		<div class="col-lg-5 col-md-8">
			<ValidationObserver ref="add" v-slot="{ handleSubmit }">
				<card class="card-user">
					<h5 slot="header" class="title">New User</h5>
					<form @submit.prevent="handleSubmit(save)">
						<div class="row">
							<div class="col-12">
								<el-select
									class="select-danger"
									v-model="user.role"
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
							<div class="col-12">
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
										v-model="user.email"
									>
									</fg-input>
								</ValidationProvider>
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
										v-model="user.firstName"
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
										v-model="user.lastName"
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
								Add
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
			user: {
				firstName: "",
				lastName: "",
				email: "",
				role: "Employee"
			},
			roles: [
				{ value: "Admin", label: "Admin" },
				{ value: "Moderator", label: "Moderator" },
				{ value: "Employee", label: "Employee" }
			]
		};
	},
	methods: {
		async save() {
			let isValidForm = await this.$refs.add.validate();
			if (isValidForm) {
				const result = await this.$user.addUser(this.user);
				if (result.status === true) {
					this.$notify({
						message: "User added successfuly",
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
