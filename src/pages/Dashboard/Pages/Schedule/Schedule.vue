<template>
	<fullCalendar
		ref="calendar"
		id="calendar"
		defaultView="dayGridMonth"
		:plugins="calendarPlugins"
		:events="shifts"
		:selectable="true"
		@eventClick="dateClick"
		:header="header"
		:buttonIcons="buttonIcons"
		:selectHelper="true"
		:editable="false"
	/>
</template>
<script>
import Swal from "sweetalert2";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

export default {
	components: {
		FullCalendar
	},
	mounted() {
		this.fetchShifts();
	},
	data() {
		return {
			calendarPlugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
			header: {
				center: "dayGridMonth,timeGridWeek,timeGridDay",
				right: "prev,next,today"
			},
			buttonIcons: {
				close: "fa-times",
				prev: "fc-icon-left-single-arrow",
				next: "fc-icon-right-single-arrow",
				prevYear: "fc-icon-left-single-arrow",
				nextYear: "fc-icon-right-single-arrow"
			},
			shifts: []
		};
	},
	methods: {
		dateClick(info) {
			if (info.event.classNames.includes("event-red"))
				Swal.fire({
					title: "Are you sure?",
					text: `You won't be able to revert this!`,
					type: "warning",
					showCancelButton: true,
					confirmButtonClass: "btn btn-success btn-fill",
					cancelButtonClass: "btn btn-danger btn-fill",
					confirmButtonText: "Yes, delete it!",
					buttonsStyling: false
				}).then((result) => {
					if (result.value) {
						this.deleteShift(+info.event.title.split("-")[1]);
						info.event.remove();
						Swal.fire({
							title: "Deleted!",
							text: `You deleted a shift`,
							type: "success",
							confirmButtonClass: "btn btn-success btn-fill",
							buttonsStyling: false
						});
					}
				});
		},
		async fetchShifts() {
			this.isLoading = true;
			this.clearShifts();

			const dateRange = this.$refs.calendar.getApi().state.dateProfile
				.currentRange;

			const result = await this.$shift.getShifts({
				startDate: dateRange.start,
				endDate: dateRange.end
			});
			this.shifts = result.data.map((shift) => {
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
					title: shift.isBlocked ? `Blocked-${shift.id}` : "Shift",
					allDay: false,
					className: shift.isBlocked ? "event-red" : "event-azure"
				};
			});
			this.isLoading = false;
		},
		async clearShifts() {
			this.shifts.length = 0;
		},
		async deleteShift(id) {
			await this.$shift.deleteShift(id);
		}
	}
};
</script>
<style>
#fullCalendar {
	min-height: 300px;
}

.el-loading-spinner .path {
	stroke: #66615b !important;
}
</style>
