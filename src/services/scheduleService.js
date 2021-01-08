import requestSender from "../helpers/requestSender";

export default function(Vue) {
	Vue.schedule = {
		async getSchedules(query) {
			const result = await requestSender.send({
				method: "get",
				url: `/schedules`,
				params: query
			});

			return result;
		},
		async generateSchedule(request) {
			const result = await requestSender.send(
				{
					method: "post",
					url: `/schedules`
				},
				request
			);
			return result;
		},
		async updateSchedule(request) {
			const result = await requestSender.send(
				{
					method: "put",
					url: "/schedules"
				},
				request
			);
			return result;
		},
		async deleteSchedule(id) {
			const result = await requestSender.send({
				method: "delete",
				url: `/schedules/${+id}`
			});
			return result;
		}
	};

	Object.defineProperties(Vue.prototype, {
		$schedule: {
			get: () => Vue.schedule
		}
	});
}
