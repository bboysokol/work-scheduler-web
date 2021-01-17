<template>
	<div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
		<side-bar>
			<template slot="links">
				<user-menu v-if="isLogged"></user-menu>
				<sidebar-item
					v-if="isLogged && !isAdmin && !isAppAdmin"
					:link="{
						name: 'Schedule',
						icon: 'now-ui-icons media-1_album',
						path: '/schedule'
					}"
				></sidebar-item>
				<sidebar-item
					v-if="isAdmin || isModerator"
					:link="{
						name: 'Scheduler',
						icon: 'now-ui-icons el-icon-magic-stick',
						path: '/scheduler'
					}"
				></sidebar-item>
				<sidebar-item
					v-if="isAdmin"
					:link="{
						name: 'Company',
						icon: 'now-ui-icons el-icon-office-building',
						path: '/company/edit'
					}"
				></sidebar-item>
				<sidebar-item
					v-if="isAdmin || isModerator"
					:link="{
						name: 'Users',
						icon: 'now-ui-icons users_single-02',
						path: '/users'
					}"
				></sidebar-item>
				<sidebar-item
					v-if="isAppAdmin"
					:link="{
						name: 'Companies',
						icon: 'now-ui-icons users_single-02',
						path: '/companies'
					}"
				></sidebar-item>
			</template>
		</side-bar>
		<div class="main-panel">
			<top-navbar></top-navbar>
			<router-view name="header"></router-view>

			<div
				:class="{ content: !$route.meta.hideContent }"
				@click="toggleSidebar"
			>
				<zoom-center-transition :duration="200" mode="out-in">
					<router-view></router-view>
				</zoom-center-transition>
				<content-footer v-if="!$route.meta.hideFooter"></content-footer>
			</div>
		</div>
	</div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
	return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
	if (hasElement(className)) {
		new PerfectScrollbar(`.${className}`);
	} else {
		setTimeout(() => {
			initScrollbar(className);
		}, 100);
	}
}

import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import UserMenu from "./Extra/UserMenu.vue";
import { ZoomCenterTransition } from "vue2-transitions";
import { mapGetters } from "vuex";

export default {
	components: {
		TopNavbar,
		ContentFooter,
		UserMenu,
		ZoomCenterTransition
	},
	methods: {
		toggleSidebar() {
			if (this.$sidebar.showSidebar) {
				this.$sidebar.displaySidebar(false);
			}
		}
	},
	computed: {
		...mapGetters(["isAdmin", "isAppAdmin", "isModerator", "isLogged"])
	},
	mounted() {
		let docClasses = document.body.classList;
		let isWindows = navigator.platform.startsWith("Win");
		if (isWindows) {
			// if we are on windows OS we activate the perfectScrollbar function
			initScrollbar("sidebar");
			initScrollbar("sidebar-wrapper");

			docClasses.add("perfect-scrollbar-on");
		} else {
			docClasses.add("perfect-scrollbar-off");
		}
	}
};
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
	from {
		opacity: 0;
		transform: scale3d($scaleSize, $scaleSize, $scaleSize);
	}
	to {
		opacity: 1;
	}
}
.main-panel .zoomIn {
	animation-name: zoomIn95;
}
@keyframes zoomOut95 {
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
		transform: scale3d($scaleSize, $scaleSize, $scaleSize);
	}
}
.main-panel .zoomOut {
	animation-name: zoomOut95;
}
</style>
