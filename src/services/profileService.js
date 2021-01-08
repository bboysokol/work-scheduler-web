import requestSender from "../helpers/requestSender";

export default function(Vue) {
	Vue.profile = {
		async updateProfile(id, request) {
			const result = await requestSender.send(
				{
					method: "put",
					url: `/profiles/${id}`
				},
				request
			);

			return result;
		}
	};

	Object.defineProperties(Vue.prototype, {
		$profile: {
			get: () => Vue.profile
		}
	});
}
