<template>
	<div style="overflow-x: scroll; overflow-y: scroll; max-height:700px">
		<table style="width:100%; border: 1px solid black; ">
			<tr style="border: 1px solid black;">
				<th
					style="border: 1px solid black; min-width:150px"
					class="p-0"
				>
					Day
				</th>
				<th
					style="border: 1px solid black; min-width:150px"
					class="p-0"
				></th>
				<th
					v-for="(i, index) in 25"
					:key="index"
					style="border: 1px solid black; min-width:150px"
					class="p-0"
				>
					{{ i - 1 }}
				</th>
			</tr>
			<tr
				v-for="(day, index) in schedules"
				:key="index"
				style="border: 1px solid black"
			>
				<td style="border: 1px solid black" class="p-0">
					{{ day.name }}
				</td>
				<td class="p-0">
					<table style="width:100%">
						<tr
							v-for="shift in day.shifts"
							:key="shift.title"
							style="border: 1px solid black; width:100%!important"
						>
							{{
								shift.title
							}}
						</tr>
					</table>
				</td>

				<td v-for="(i, index) in 25" :key="index" class="p-0">
					<table style="width:100%">
						<tr
							v-for="shift in day.shifts"
							:key="shift.title"
							class="time-test"
							:class="[
								isFilled(shift, i - 1) ? 'test-class' : ''
							]"
						>
							.
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</div>
</template>
<script>
import Swal from "sweetalert2";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();
export default {
	async mounted() {
		const result = await this.$schedule.getSchedules({
			startDate: new Date(2021, 0, 4),
			endDate: new Date(2021, 0, 10)
		});
		console.log(result);
		const shifts = [];
		result.data.forEach((schedule) => {
			this.schedules[
				new Date(schedule.date).getDay() - 1
			].shifts = schedule.workingTimeRegisters.map((shift) => ({
				start: new Date(shift.startTime),
				end: new Date(shift.endTime),
				allDay: false,
				title: `${shift.user.personalData.firstName} ${shift.user.personalData.lastName}`
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
					end: new Date(y, m, 1),
					allDay: false,

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
		isFilled(item, i) {
			console.log(item.start.getHours() <= i && item.end.getHours() >= i);
			return item.start.getHours() <= i && item.end.getHours() >= i;
		},
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
.test-class {
	background: red !important;
	border-radius: 20px;
}
.time-test {
	border-top: 1px solid black;
	padding: 2px 0 2px;
}
</style>
