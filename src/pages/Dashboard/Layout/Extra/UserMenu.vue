<template>
	<div class="user user__menu">
		<div class="photo">
			<i class="now-ui-icons users_circle-08"></i>
		</div>
		<div class="info">
			<a
				data-toggle="collapse"
				:aria-expanded="!isClosed"
				@click.stop="toggleMenu"
				href="#"
			>
				<span>
					{{ `${user.Fullname}` }}
					<b class="caret"></b>
				</span>
			</a>
			<div class="clearfix"></div>
			<div>
				<collapse-transition>
					<ul class="nav user-menu__nav" v-show="!isClosed">
						<slot>
							<li>
								<router-link
									tag="a"
									:to="{ name: 'User Page' }"
								>
									<span class="sidebar-mini-icon">MP</span>
									<span class="sidebar-normal"
										>My Profile</span
									>
								</router-link>
							</li>
							<li>
								<router-link
									tag="a"
									:to="{ name: 'Edit Profile' }"
								>
									<span class="sidebar-mini-icon">EP</span>
									<span class="sidebar-normal"
										>Edit Profile</span
									>
								</router-link>
							</li>
						</slot>
					</ul>
				</collapse-transition>
			</div>
		</div>
	</div>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";
import { mapGetters } from "vuex";

export default {
	name: "user-menu",
	components: {
		CollapseTransition
	},
	props: {
		title: {
			type: String,
			default: "James Amos"
		},
		image: {
			type: String,
			default: "img/james.jpg"
		}
	},
	data() {
		return {
			isClosed: true
		};
	},
	computed: {
		...mapGetters(["user"])
	},
	methods: {
		toggleMenu() {
			this.isClosed = !this.isClosed;
		}
	}
};
</script>
<style>
.user__menu ul.user-menu__nav {
	margin-top: 0;
	padding-top: 20px;
}
</style>
