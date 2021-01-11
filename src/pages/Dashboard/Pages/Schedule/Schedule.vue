<template>
	<fullCalendar
		ref="calendar"
		id="calendar"
		defaultView="dayGridMonth"
		:plugins="calendarPlugins"
		:events="shifts"
		:selectable="true"
		@dateClick="dateClick"
		:header="header"
		:buttonIcons="buttonIcons"
		:selectHelper="true"
		:editable="true"
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
		dateClick: function(info) {
			// on select we show the Sweet Alert modal with an input
			Swal.fire({
				title: "Create an Event",
				html: `<div class="form-group">
          <input type="text" id="vnud-input" class="form-control">
          </div>`,
				showCancelButton: true,
				confirmButtonClass: "btn btn-success",
				cancelButtonClass: "btn btn-danger",
				buttonsStyling: false
			}).then(() => {
				var eventTitle = document.getElementById("vnud-input").value;
				if (eventTitle) {
					let calendarApi = this.$refs.calendar.getApi();
					calendarApi.addEvent({
						title: eventTitle,
						start: info.dateStr,
						className: "event-azure",
						allDay: true
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
					title: shift.isBlocked ? "Blocked shift" : "Shift",
					allDay: false,
					className: shift.isBlocked ? "event-red" : "event-azure",
					id: shift.id
				};
			});
			this.isLoading = false;
		},
		async clearShifts() {
			this.shifts.length = 0;
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
