<template>
	<div class="container-fluid">
		<div class="row d-flex justify-content-center">
			<div class="col-lg-10">
				<card>
					<div class="d-flex flex-column flex-md-row">
						<div
							class="col-12 col-md-4 d-flex flex-column justify-content-start"
						>
							<div>
								<h6>Add shift</h6>
								<small>
									complete the form to create a shift
								</small>
							</div>
							<ValidationObserver ref="newShift">
								<ValidationProvider
									name="Date"
									rules="required"
									v-slot="{ passed, errors }"
								>
									<fg-input
										:error="errors[0]"
										:hasSuccess="passed"
									>
										<el-date-picker
											v-model="newShift.date"
											class="mt-md-auto mt-2"
											type="date"
											placeholder="Pick a day"
										>
										</el-date-picker>
									</fg-input>
								</ValidationProvider>

								<ValidationProvider
									name="TimeRange"
									rules="required"
									v-slot="{ passed, errors }"
								>
									<fg-input
										:error="errors[0]"
										:hasSuccess="passed"
									>
										<el-time-picker
											:disabled="!newShift.date"
											is-range
											v-model="newShift.time"
											range-separator="To"
											step="00:30"
											:picker-options="
												`00:00:00 - 24:00:00`
											"
											format="HH:mm"
											start-placeholder="Start time"
											end-placeholder="End time"
										>
										</el-time-picker>
									</fg-input>
								</ValidationProvider>
								<n-button
									:disabled="!newShift.date || !newShift.time"
									@click.native="createShift"
									type="primary"
									round
									block
								>
									Create Shift
								</n-button>
							</ValidationObserver>
						</div>
					</div>
				</card>
				<card class="card-calendar">
					<schedule :refresh="refresh"></schedule>
				</card>
			</div>
		</div>
	</div>
</template>
<script>
import Loading from "src/pages/Dashboard/Layout/LoadingMainPanel.vue";
import { TimePicker, DatePicker } from "element-ui";

const Schedule = () => ({
	component: import("./Schedule.vue"),
	loading: Loading,
	delay: 100
});
export default {
	components: {
		Schedule,
		[DatePicker.name]: DatePicker,
		[TimePicker.name]: TimePicker
	},
	data() {
		return {
			newShift: {},
			refresh: false
		};
	},
	methods: {
		async createShift() {
			let isValidForm = await this.$refs.newShift.validate();
			if (isValidForm) {
				const startTime = new Date(
					this.newShift.date.setHours(
						this.newShift.time[0].getHours()
					)
				);
				const endTime = new Date(
					this.newShift.date.setHours(
						this.newShift.time[1].getHours()
					)
				);
				var result = await this.$shift.addShift([
					{
						startTime,
						endTime
					}
				]);
				if (result.status === true) {
					this.$notify({
						message: "Shift created successfuly",
						timeout: 4000,
						icon: "now-ui-icons ui-1_bell-53",
						horizontalAlign: "right",
						verticalAlign: "top",
						type: "success"
					});
					this.refresh = !this.refresh;
				}
			}
		}
	}
};
</script>
<style>
.card-calendar {
	min-height: 400px;
}
</style>
