<template>
	<div class="container-fluid">
		<div class="row d-flex justify-content-center">
			<div class="col-12">
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
										format="HH:mm"
										start-placeholder="Start time"
										end-placeholder="End time"
									>
									</el-time-picker>
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
									<el-autocomplete
										:disabled="
											!newShift.date || !newShift.time
										"
										class="inline-input w-100"
										v-model="newShift.fullname"
										:fetch-suggestions="getUsers"
										placeholder="User"
										:trigger-on-focus="false"
										:clearable="true"
										size="small"
									></el-autocomplete>
								</fg-input>
							</ValidationProvider>

							<n-button
								:disabled="
									!newShift.date ||
										!newShift.time ||
										!newShift.fullname
								"
								@click.native="createShift"
								type="primary"
								round
								block
							>
								Create Shift
							</n-button>
						</div>
						<div
							class="col-12 col-md-4 d-flex flex-column justify-content-start"
						>
							<div>
								<h6>Update shift</h6>
								<small>
									click a shift on the calendar to edit
								</small>
							</div>
							<ValidationProvider
								name="TimeRangeStart"
								rules="required"
								v-slot="{ passed, errors }"
							>
								<fg-input
									:error="errors[0]"
									:hasSuccess="passed"
								>
									<el-time-picker
										class="mt-2"
										:disabled="!editedShift.start"
										v-model="editedShift.start"
										:picker-options="{
											selectableRange: `00:00:00 - ${editedShift.end}`
										}"
										placeholder="Shift start time"
									>
									</el-time-picker>
								</fg-input>
							</ValidationProvider>
							<ValidationProvider
								name="TimeRangeEnd"
								rules="required"
								v-slot="{ passed, errors }"
							>
								<fg-input
									:error="errors[0]"
									:hasSuccess="passed"
								>
									<el-time-picker
										:disabled="!editedShift.end"
										v-model="editedShift.end"
										:picker-options="{
											selectableRange: `${editedShift.start} - 24:00:00`
										}"
										placeholder="Shift end time"
									>
									</el-time-picker>
								</fg-input>
							</ValidationProvider>
							<ValidationProvider
								name="User"
								rules="required"
								v-slot="{ passed, errors }"
							>
								<fg-input
									:error="errors[0]"
									:hasSuccess="passed"
								>
									<el-autocomplete
										:disabled="!editedShift.fullname"
										class="inline-input w-100"
										v-model="editedShift.fullname"
										:fetch-suggestions="getUsers"
										placeholder="User"
										:trigger-on-focus="false"
										:clearable="true"
										size="small"
									></el-autocomplete>
								</fg-input>
							</ValidationProvider>
							<n-button
								:disabled="
									!editedShift.start ||
										!editedShift.end ||
										!editedShift.fullname
								"
								@click.native="updateShift"
								type="primary"
								class="mt-md-auto mt-3"
								round
								block
							>
								Update Shift
							</n-button>
						</div>
						<div
							class="col-12 col-md-4 d-flex flex-column justify-content-start"
						>
							<div>
								<h6>Generate Schedule</h6>
								<small>
									select a date range and number of employees
								</small>
							</div>
							<ValidationProvider
								name="DateRange"
								rules="required"
								v-slot="{ passed, errors }"
							>
								<fg-input
									class="mt-2"
									:error="errors[0]"
									:hasSuccess="passed"
								>
									<el-date-picker
										v-model="scheduleConfig.range"
										type="datetimerange"
										start-placeholder="Start Date"
										end-placeholder="End Date"
										:default-time="['08:00:00', '16:00:00']"
									>
									</el-date-picker>
								</fg-input>
							</ValidationProvider>

							<ValidationProvider
								name="EmployeeLimit"
								rules="required|numeric|min_value:1"
								v-slot="{ passed, errors }"
							>
								<fg-input
									type="number"
									:error="errors[0]"
									min="1"
									:hasSuccess="passed"
									class="no-border form-control-lg"
									placeholder="Number of employees"
									addon-left-icon="now-ui-icons users_single-02"
									v-model="scheduleConfig.employeeLimit"
								>
								</fg-input>
							</ValidationProvider>
							<n-button
								@click.native="generateSchedules"
								:disabled="!scheduleConfig.range.length > 0"
								type="primary"
								class="mt-md-auto mt-3"
								round
								block
							>
								Generate Schedule
							</n-button>
						</div>
					</div>
				</card>
				<card class="card-calendar">
					<div
						class="col-12 d-flex justify-content-between align-items-center flex-column flex-md-row"
					>
						<h5>
							{{
								`${dateRange.start.toDateString()} - ${dateRange.end.toDateString()}`
							}}
						</h5>
						<div class="d-flex flex-column flex-md-row mb-3">
							<n-button
								@click.native="move(-1)"
								type="primary"
								icon
								round
							>
								<i class="now-ui-icons arrows-1_minimal-left">
								</i>
							</n-button>
							<n-button
								@click.native="setToday()"
								type="primary"
								round
							>
								Today
							</n-button>
							<n-button
								@click.native="move(1)"
								type="primary"
								icon
								round
							>
								<i class="now-ui-icons arrows-1_minimal-right">
								</i>
							</n-button>
						</div>
					</div>
					<scheduler
						:dateRange="dateRange"
						@edited="setEdited"
						@shiftPicked="editRow"
					></scheduler>
					<div class="d-flex justify-content-end">
						<n-button
							v-if="edited"
							native-type="submit"
							type="success"
							round
							size="lg"
						>
							Save Changes
						</n-button>
					</div>
				</card>
			</div>
		</div>
	</div>
</template>
<script>
import Loading from "src/pages/Dashboard/Layout/LoadingMainPanel.vue";
import {
	TimeSelect,
	DatePicker,
	Button,
	TimePicker,
	Autocomplete
} from "element-ui";

const Scheduler = () => ({
	component: import("./Scheduler.vue"),
	loading: Loading,
	delay: 100
});
export default {
	data() {
		return {
			edited: false,
			editedShift: {},
			newShift: {},
			scheduleConfig: {
				range: [],
				employeeLimit: 1
			},
			availableUsers: [],
			dateRange: {
				start: null,
				end: null
			}
		};
	},
	created() {
		this.setToday();
	},
	components: {
		Scheduler,
		[DatePicker.name]: DatePicker,
		[TimePicker.name]: TimePicker,
		[Autocomplete.name]: Autocomplete,
		[TimeSelect.name]: TimeSelect,
		[Button.name]: Button
	},
	methods: {
		setEdited(state) {
			this.edited = state;
		},
		editRow(row) {
			this.editedShift = row;
		},
		getUsers() {
			console.log("hihi");
		},
		async generateSchedules() {
			const startRange = this.scheduleConfig.range[0];
			const endRange = this.scheduleConfig.range[1];
			let shift = [];
			for (
				let element = startRange;
				element <= endRange;
				element.setDate(element.getDate() + 1)
			) {
				shift.push({
					date: new Date(element),
					startTime: new Date(element),
					endTime: new Date(
						new Date(element).setHours(endRange.getHours())
					),
					employeeLimit: +this.scheduleConfig.employeeLimit
				});
			}
			const result = await this.$schedule.generateSchedule(shift);
			if (result.status)
				this.$notify({
					message:
						"Schedule generated successfuly. Refresh page for results",
					timeout: 4000,
					icon: "now-ui-icons ui-1_bell-53",
					horizontalAlign: "right",
					verticalAlign: "top",
					type: "success"
				});
		},
		createShift() {
			console.log(this.newShift);
		},
		updateShift() {
			console.log(this.editedShift);
		},
		move(state) {
			this.dateRange.start = new Date(
				this.dateRange.start.setDate(
					this.dateRange.start.getDate() + 7 * state
				)
			);
			this.dateRange.end = new Date(
				this.dateRange.end.setDate(
					this.dateRange.end.getDate() + 7 * state
				)
			);
		},
		setToday() {
			const today = new Date();
			const dayOfWeek = today.getUTCDay();
			this.dateRange.start = new Date(
				new Date().setDate(today.getDate() - dayOfWeek + 1)
			);
			this.dateRange.end = new Date(
				new Date().setDate(today.getDate() + (7 - dayOfWeek))
			);
		}
	}
};
</script>
<style>
.card-calendar {
	min-height: 400px;
}
</style>
