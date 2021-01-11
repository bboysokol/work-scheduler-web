<template>
	<div style="overflow-x: scroll; overflow-y: scroll; max-height:700px">
		<table class="table table-bordered">
			<thead>
				<tr>
					<th scope="col" style="min-width:150px" class="text-center">
						DAY/HOURS
					</th>
					<th scope="col" style="min-width:250px">
						EMPLOYEES
					</th>
					<th scope="col" v-for="(i, index) in 25" :key="index">
						{{ ` ${i - 1}:00 ` }}
					</th>
				</tr>
			</thead>

			<tbody v-if="!isLoading">
				<tr v-for="day in schedules" :key="day.name">
					<td class="text-center">
						{{ day.name }}
					</td>
					<td class="p-0 d-flex flex-column">
						<div
							v-for="shift in day.shifts"
							:key="shift.fullname"
							style=" overflow-x:hidden; word-break: break-all"
							class="text-left entity-bordered employees"
							@click="editRow(shift)"
						>
							{{ shift.fullname }}
						</div>
					</td>

					<td v-for="(i, index) in 25" :key="index" class="p-0 ">
						<div
							v-for="shift in day.shifts"
							:key="shift.title"
							class="time-test px-0 entity-bordered d-flex flex-row"
							style="color:white"
							@click="editRow(shift)"
							:class="[
								isFilled(shift, i - 1) ? 'shift-fill' : ''
							]"
						>
							.
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
export default {
	props: {
		dateRange: {
			required: true,
			type: Object
		}
	},
	mounted() {
		this.fetchSchedule();
	},
	data() {
		return {
			isLoading: true,
			schedules: [
				{ name: "Monday", shifts: [] },
				{ name: "Tuesday", shifts: [] },
				{ name: "Wednesday", shifts: [] },
				{ name: "Thursday", shifts: [] },
				{ name: "Friday", shifts: [] },
				{ name: "Saturday", shifts: [] },
				{ name: "Sunday", shifts: [] }
			],
			edited: false
		};
	},
	methods: {
		isFilled(item, i) {
			return item.start.getHours() <= i && item.end.getHours() >= i;
		},
		editRow(row) {
			this.$emit("shiftPicked", row);
		},
		async fetchSchedule() {
			this.isLoading = true;
			this.clearShifts();

			const result = await this.$schedule.getSchedules({
				startDate: this.dateRange.start,
				endDate: this.dateRange.end
			});
			result.data.forEach((schedule) => {
				this.schedules[
					new Date(schedule.date).getUTCDay()
				].shifts = schedule.workingTimeRegisters.map((shift) => {
					const temporaryStart = new Date(shift.startTime);
					const temporaryEnd = new Date(shift.endTime);
					return {
						start: new Date(
							temporaryStart.setHours(
								temporaryStart.getHours() -
									temporaryStart.getTimezoneOffset() / 60
							)
						),
						end: new Date(
							temporaryEnd.setHours(
								temporaryEnd.getHours() -
									temporaryEnd.getTimezoneOffset() / 60
							)
						),
						fullname: `${shift.user.personalData.firstName} ${shift.user.personalData.lastName}`
					};
				});
			});
			this.isLoading = false;
		},
		async clearShifts() {
			await this.schedules.forEach(
				(schedule) => (schedule.shifts.length = 0)
			);
		}
	},
	watch: {
		dateRange: {
			deep: true,
			handler() {
				this.fetchSchedule();
			}
		}
	}
};
</script>
<style lang="scss">
.el-loading-spinner .path {
	stroke: #66615b !important;
}
.shift-fill {
	&:nth-child(even) {
		background-color: lighten(#285281, 50%) !important;
		color: lighten(#285281, 50%) !important;
	}

	&:nth-child(odd) {
		background: #285281 !important;
		color: #285281 !important;
	}
}
.entity-bordered {
	&:first-child {
		border-top: none;
		border-bottom: none;
	}
	&:last-child {
		border-bottom: none;
	}
	border-top: 1px solid #dee2e6;
	height: 21px;
}
</style>
