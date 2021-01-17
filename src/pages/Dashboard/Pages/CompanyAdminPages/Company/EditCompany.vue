<template>
	<div class="row d-flex justify-content-center">
		<div class="col-lg-5 col-md-8">
			<ValidationObserver ref="edit" v-slot="{ handleSubmit }">
				<card class="card-user" v-if="companyCopy !== null">
					<h5 slot="header" class="title">Edit Company</h5>
					<form @submit.prevent="handleSubmit(save)">
						<div class="row">
							<!-- <div class="col-12">
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
							</div> -->
							<div class="col-md-8">
								<ValidationProvider
									name="CompanyName"
									rules="required"
									v-slot="{ passed, errors }"
								>
									<fg-input
										type="text"
										label="Company Name"
										:error="errors[0]"
										:hasSuccess="passed"
										placeholder="Company Name"
										v-model="companyCopy.name"
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
import { Select, Option } from "element-ui";
import { mapGetters } from "vuex";
export default {
	components: {
		[Select.name]: Select,
		[Option.name]: Option
	},
	computed: {
		...mapGetters(["company"])
	},
	data() {
		return {
			companyCopy: null
		};
	},
	mounted() {
		this.companyCopy = this.company;
	},
	watch: {
		company(newVal) {
			this.companyCopy = newVal;
		}
	},
	methods: {
		async save() {
			let isValidForm = await this.$refs.edit.validate();
			if (isValidForm) {
				const result = await this.$company.updateCompany(
					this.companyCopy.id,
					{
						name: this.companyCopy.name,
						tier: this.companyCopy.tier
					}
				);
				if (result.status === true) {
					this.$notify({
						message: "Company updated successfuly",
						timeout: 4000,
						icon: "now-ui-icons ui-1_bell-53",
						horizontalAlign: "right",
						verticalAlign: "top",
						type: "success"
					});
				}
			}
		}
	}
};
</script>
<style></style>
