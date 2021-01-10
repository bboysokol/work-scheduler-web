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

			<tbody>
				<tr v-for="(day, index) in schedules" :key="index">
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
	async mounted() {
		const result = await this.$schedule.getSchedules({
			startDate: new Date(2021, 0, 5),
			endDate: new Date(2021, 0, 11)
		});
		const shifts = [];
		result.data.forEach((schedule) => {
			this.schedules[
				new Date(schedule.date).getUTCDay()
			].shifts = schedule.workingTimeRegisters.map((shift) => ({
				start: new Date(shift.startTime),
				end: new Date(shift.endTime),
				fullname: `${shift.user.personalData.firstName} ${shift.user.personalData.lastName}`
			}));
		});
		console.log(shifts);
	},
	data() {
		return {
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
