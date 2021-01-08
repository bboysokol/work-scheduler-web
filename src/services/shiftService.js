import requestSender from "../helpers/requestSender";

export default function(Vue) {
	Vue.shift = {
		async getShifts(query) {
			const result = await requestSender.send({
				method: "get",
				url: `/shifts`,
				params: query
			});

			return result;
		},
		async addShift(request) {
			const result = await requestSender.send(
				{
					method: "post",
					url: `/shifts`
				},
				request
			);
			return result;
		},
		async updateShift(id, request) {
			const result = await requestSender.send(
				{
					method: "put",
					url: `/shifts/${+id}`
				},
				request
			);
			return result;
		},
		async deleteShift(id) {
			const result = await requestSender.send({
				method: "delete",
				url: `/shifts/${+id}`
			});
			return result;
		}
	};

	Object.defineProperties(Vue.prototype, {
		$shift: {
			get: () => Vue.shift
		}
	});
}
