<template>
	<navbar :show-navbar="showNavbar">
		<div class="navbar-wrapper">
			<div
				class="navbar-toggle"
				:class="{ toggled: $sidebar.showSidebar }"
			>
				<navbar-toggle-button @click.native="toggleSidebar">
				</navbar-toggle-button>
			</div>
			<a class="navbar-brand" href="#pablo">
				{{ $route.name }}
			</a>
		</div>
		<button
			@click="toggleNavbar"
			class="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navigation"
			aria-controls="navigation-index"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-bar navbar-kebab"></span>
			<span class="navbar-toggler-bar navbar-kebab"></span>
			<span class="navbar-toggler-bar navbar-kebab"></span>
		</button>

		<template slot="navbar-menu">
			<ul class="navbar-nav">
				<drop-down
					tag="li"
					position="right"
					class="nav-item"
					icon="now-ui-icons location_world"
				>
					<a class="dropdown-item" href="#">English</a>
				</drop-down>

				<li class="nav-item">
					<router-link class="nav-link" :to="{ name: 'UserProfile' }">
						<i class="now-ui-icons users_single-02"></i>
						<p>
							<span class="d-lg-none d-md-block">Account</span>
						</p>
					</router-link>
				</li>
				<li class="nav-item">
					<n-button
						class="my-0"
						@click.native="destroySession()"
						type="danger"
						simple
						block
					>
						Logout
					</n-button>
				</li>
			</ul>
		</template>
	</navbar>
</template>
<script>
import { Navbar, NavbarToggleButton } from "src/components";
import { mapActions } from "vuex";

export default {
	components: {
		Navbar,
		NavbarToggleButton
	},
	computed: {
		routeName() {
			const { name } = this.$route;
			return this.capitalizeFirstLetter(name);
		}
	},
	data() {
		return {
			activeNotifications: false,
			showNavbar: false
		};
	},
	methods: {
		...mapActions(["destroySession"]),
		capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		},
		toggleNotificationDropDown() {
			this.activeNotifications = !this.activeNotifications;
		},
		closeDropDown() {
			this.activeNotifications = false;
		},
		toggleSidebar() {
			this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
		},
		toggleNavbar() {
			this.showNavbar = !this.showNavbar;
		},
		hideSidebar() {
			this.$sidebar.displaySidebar(false);
		}
	}
};
</script>
<style></style>
