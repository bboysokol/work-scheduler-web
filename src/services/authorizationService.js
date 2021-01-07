import requestSender from "../helpers/requestSender";
import store from "../store";

export default function(Vue) {
	Vue.auth = {
		async logIn(loginRequest) {
			const result = await requestSender.send(
				{
					method: "post",
					url: `/authentication/login`
				},
				loginRequest
			);
			if (result.status)
				store.dispatch("setSession", result.data.accessToken);
			return result;
		},
		async register(registerRequest) {
			const result = await requestSender.send(
				{
					method: "post",
					url: `/authentication/register`
				},
				registerRequest
			);
			return result;
		},
		async activateAccount(request) {
			const result = await requestSender.send(
				{
					method: "put",
					url: `/authentication`
				},
				request
			);
			return result;
		}
	};

	Object.defineProperties(Vue.prototype, {
		$auth: {
			get: () => Vue.auth
		}
	});
}
