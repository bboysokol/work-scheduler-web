<template>
	<div class="container-fluid">
		<div class="row d-flex justify-content-center">
			<div class="col-lg-10">
				<card class="card-calendar">
					<scheduler></scheduler>
				</card>
			</div>
		</div>
	</div>
</template>
<script>
import Loading from "src/pages/Dashboard/Layout/LoadingMainPanel.vue";

const Scheduler = () => ({
	component: import("./Scheduler.vue"),
	loading: Loading,
	delay: 100
});
export default {
	components: {
		Scheduler
	}
};
</script>
<style>
.card-calendar {
	min-height: 400px;
}
</style>
