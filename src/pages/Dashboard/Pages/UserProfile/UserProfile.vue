<template>
	<div class="row d-flex justify-content-center">
		<div class="col-lg-5 col-md-8">
			<card class="card-user">
				<div slot="image" class="image"></div>
				<div>
					<div class="author">
						<a href="#">
							<h2 class="mb-0">
								<i class="now-ui-icons users_circle-08"></i>
							</h2>
							<h5 class="title">{{ user.Fullname }}</h5>
						</a>
						<p class="description">
							{{ user.email }}
						</p>
						<p class="description" v-if="company">
							{{ company.name }}
						</p>
					</div>
					<p class="description text-center">
						{{ `Role: ${user.role}` }}
					</p>
					<p class="description text-center" v-if="company">
						{{ `Employment : ${user.EmploymentType}` }}
					</p>
				</div>
				<div slot="footer" class="button-container">
					<router-link :to="{ name: 'Edit Profile' }">
						<n-button type="success" round size="lg">
							Edit
						</n-button>
					</router-link>
				</div>
			</card>
		</div>
	</div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
	computed: {
		...mapGetters(["user", "company"])
	}
};
</script>
<style></style>
