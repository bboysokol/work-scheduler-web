<template>
	<div class="panel-header">
		<div class="header text-center">
			<h2 class="title">FullCalendar.io</h2>
			<p class="category">
				<n-button @click.native="generate" type="success" round>
					Generate
				</n-button>
				Handcssssssrafted by our friends from
				<a target="_blank" href="https://fullcalendar.io/"
					>FullCalendar.io</a
				>. Please checkout their
				<a href="https://fullcalendar.io/docs/" target="_blank"
					>full documentation.</a
				>
			</p>
		</div>
	</div>
</template>
<script>
export default {
	methods: {
		async generate() {
			const result = await this.$schedule.generateSchedule([
				{
					date: new Date("January 9, 2021 08:00:00"),
					startTime: new Date("January 9, 2021 08:00:00"),
					endTime: new Date("January 9, 2021 16:00:00"),
					employeeLimit: 4
				}
			]);
			console.log(result);
		},
		created() {}
	}
};
</script>
