<template>
	<div>
		<modal
			:show.sync="modals.classic"
			headerClasses="justify-content-center"
		>
			<h4 slot="header" class="title title-up">Block shift</h4>
			<ValidationObserver ref="newShift">
				<ValidationProvider
					name="TimeRange"
					rules="required"
					v-slot="{ passed, errors }"
				>
					<fg-input :error="errors[0]" :hasSuccess="passed">
						<el-time-picker
							is-range
							v-model="timeRange"
							range-separator="To"
							step="00:30"
							:picker-options="`00:00:00 - 24:00:00`"
							format="HH:mm"
							start-placeholder="Start time"
							end-placeholder="End time"
						>
						</el-time-picker>
					</fg-input>
				</ValidationProvider>
			</ValidationObserver>
			<template slot="footer">
				<n-button
					@click.native="createShift"
					type="primary"
					round
					block
				>
					Create Shift
				</n-button>
				<n-button
					type="danger"
					@click.native="modals.classic = false"
					round
				>
					Close
				</n-button>
			</template>
		</modal>
		<fullCalendar
			ref="calendar"
			id="calendar"
			defaultView="dayGridMonth"
			:plugins="calendarPlugins"
			:events="shifts"
			:selectable="true"
			@prev="console.log('test')"
			@eventClick="dateClick"
			@select="createShiftClick"
			:header="header"
			:buttonIcons="buttonIcons"
			:selectHelper="true"
			:editable="false"
		/>
	</div>
</template>
<script>
import Swal from "sweetalert2";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { TimePicker } from "element-ui";

export default {
	components: {
		FullCalendar,
		[TimePicker.name]: TimePicker
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
			shifts: [],
			modals: {
				classic: false
			},
			timeRange: [new Date(0, 0, 0, 8, 0), new Date(0, 0, 0, 16, 0)],
			blockedShifts: []
		};
	},
	methods: {
		bindEvents() {
			const prevButton = document.getElementsByClassName(
				"fc-prev-button"
			)[0];
			prevButton.addEventListener("click", () => this.fetchShifts());
			const nextButton = document.getElementsByClassName(
				"fc-next-button"
			)[0];
			nextButton.addEventListener("click", () => this.fetchShifts());

			const todayButton = document.getElementsByClassName(
				"fc-today-button"
			)[0];
			todayButton.addEventListener("click", () => this.fetchShifts());

			const dayButton = document.getElementsByClassName(
				"fc-timeGridDay-button"
			)[0];
			dayButton.addEventListener("click", () => this.fetchShifts());

			const weekButton = document.getElementsByClassName(
				"fc-timeGridWeek-button"
			)[0];
			weekButton.addEventListener("click", () => this.fetchShifts());

			const monthButton = document.getElementsByClassName(
				"fc-dayGridMonth-button"
			)[0];
			monthButton.addEventListener("click", () => this.fetchShifts());
		},
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
				}).then(async (result) => {
					if (result.value) {
						const deleteResult = await this.deleteShift(
							+info.event.title.split("-")[1]
						);
						if (deleteResult.status) {
							info.event.remove();
							Swal.fire({
								title: "Deleted!",
								text: `You deleted a shift`,
								type: "success",
								confirmButtonClass: "btn btn-success btn-fill",
								buttonsStyling: false
							});
							this.blockedShifts.length = 0;
							this.fetchShifts();
						}
					}
				});
		},
		createShiftClick(info) {
			if (info.date) {
				this.blockedShifts.push({ date: info.date });
			} else {
				for (
					let element = info.start;
					element < info.end;
					element.setDate(element.getDate() + 1)
				) {
					this.blockedShifts.push({
						date: new Date(element)
					});
				}
			}
			this.modals.classic = true;
		},
		async createShift() {
			let isValidForm = await this.$refs.newShift.validate();
			if (isValidForm) {
				const shifts = this.blockedShifts.map((item) => ({
					startTime: new Date(
						item.date.setHours(this.timeRange[0].getHours())
					),
					endTime: new Date(
						item.date.setHours(this.timeRange[1].getHours())
					)
				}));

				var result = await this.$shift.addShift(shifts);
				if (result.status === true) {
					this.$notify({
						message: "Shifts created successfuly",
						timeout: 4000,
						icon: "now-ui-icons ui-1_bell-53",
						horizontalAlign: "right",
						verticalAlign: "top",
						type: "success"
					});
					this.fetchShifts();
				}
			}
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
			this.bindEvents();
		},
		async clearShifts() {
			this.shifts.length = 0;
		},
		async deleteShift(id) {
			return await this.$shift.deleteShift(id);
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
