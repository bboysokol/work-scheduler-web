import requestSender from "../helpers/requestSender";

export default function(Vue) {
	Vue.user = {
		async getUsers(query) {
			const result = await requestSender.send({
				method: "get",
				url: `/users`,
				params: query
			});

			return result;
		},
		async addUser(request) {
			const result = await requestSender.send(
				{
					method: "post",
					url: `/users`
				},
				request
			);
			return result;
		},
		async getUser(id) {
			const result = await requestSender.send({
				method: "get",
				url: `/users/${+id}`
			});
			return result;
		},
		async updateUser(id, request) {
			const result = await requestSender.send(
				{
					method: "put",
					url: `/users/${+id}`
				},
				request
			);
			return result;
		},
		async deleteUser(id) {
			const result = await requestSender.send({
				method: "delete",
				url: `/users/${+id}`
			});
			return result;
		}
	};

	Object.defineProperties(Vue.prototype, {
		$user: {
			get: () => Vue.user
		}
	});
}
