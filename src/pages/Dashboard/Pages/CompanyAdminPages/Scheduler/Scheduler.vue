<template>
	<fullCalendar
		ref="calendar"
		defaultView="dayGridMonth"
		:plugins="calendarPlugins"
		:events="events"
		:selectable="true"
		@dateClick="dateClick"
		:header="header"
		:buttonIcons="buttonIcons"
		:defaultAllDay="false"
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

const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();
export default {
	components: {
		FullCalendar
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
			events: [
				{
					title: "All Day Event",
					start: new Date(y, m, 1),
					className: "event-default"
				},
				{
					id: 999,
					title: "Repeating Event",
					start: new Date(y, m, d - 4, 6, 0),
					allDay: false,
					className: "event-rose"
				},
				{
					id: 999,
					title: "Repeating Event",
					start: new Date(y, m, d + 3, 6, 0),
					allDay: false,
					className: "event-rose"
				},
				{
					title: "Meeting",
					start: new Date(y, m, d - 1, 10, 30),
					allDay: false,
					className: "event-green"
				},
				{
					title: "Lunch",
					start: new Date(y, m, d + 7, 12, 0),
					end: new Date(y, m, d + 7, 14, 0),
					allDay: false,
					className: "event-red"
				},
				{
					title: "Md-pro Launch",
					start: new Date(y, m, d - 2, 12, 0),
					allDay: true,
					className: "event-azure"
				},
				{
					title: "Birthday Party",
					start: new Date(y, m, d + 1, 19, 0),
					end: new Date(y, m, d + 1, 22, 30),
					allDay: false,
					className: "event-azure"
				},
				{
					title: "Click for Creative Tim",
					start: new Date(y, m, 21),
					end: new Date(y, m, 22),
					url: "http://www.creative-tim.com/",
					className: "event-orange"
				},
				{
					title: "Click for Google",
					start: new Date(y, m, 21),
					end: new Date(y, m, 22),
					url: "http://www.creative-tim.com/",
					className: "event-orange"
				}
			]
		};
	},
	methods: {
		dateClick: function(info) {
			console.log(this.$refs);
			Swal.fire({
				title: "Create an Event",
				html: `<div class="form-group">
		  <input type="text" id="vnud-input" class="form-control">
          <input type="text" id="vnud-input2" class="form-control">
          <input type="text" id="vnud-input3" class="form-control">
          </div>`,
				showCancelButton: true,
				confirmButtonClass: "btn btn-success",
				cancelButtonClass: "btn btn-danger",
				buttonsStyling: false
			}).then(() => {
				const dateArray = info.dateStr.split("-");
				console.log(dateArray);
				const date = {
					year: +dateArray[0],
					month: +dateArray[1] - 1,
					day: +dateArray[2].slice(0, 2)
				};
				console.log(
					info.dateStr,
					date,
					+document.getElementById("vnud-input3").value
				);

				var eventTitle = document.getElementById("vnud-input").value;
				if (eventTitle) {
					let calendarApi = this.$refs.calendar.getApi();
					calendarApi.addEvent({
						title: eventTitle,
						start: new Date(
							date.year,
							date.month,
							date.day,
							+document.getElementById("vnud-input2").value
						),
						end: new Date(
							date.year,
							date.month,
							date.day,
							+document.getElementById("vnud-input3").value
						),
						allDay: false
					});
				}
			});
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
