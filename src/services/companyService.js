import requestSender from "../helpers/requestSender";

export default function(Vue) {
	Vue.company = {
		async getCompanies(query) {
			const result = await requestSender.send({
				method: "get",
				url: `/companies`,
				params: query
			});

			return result;
		},
		async addCompany(request) {
			const result = await requestSender.send(
				{
					method: "post",
					url: `/companies`
				},
				request
			);
			return result;
		},
		async getCompany(id) {
			const result = await requestSender.send({
				method: "get",
				url: `/companies/${+id}`
			});
			return result;
		},
		async updateCompany(id, request) {
			const result = await requestSender.send(
				{
					method: "put",
					url: `/companies/${+id}`
				},
				request
			);
			return result;
		},
		async deleteCompany(id) {
			const result = await requestSender.send({
				method: "delete",
				url: `/companies/${+id}`
			});
			return result;
		}
	};

	Object.defineProperties(Vue.prototype, {
		$company: {
			get: () => Vue.company
		}
	});
}
