<template>
	<div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
		<notifications></notifications>
		<side-bar>
			<template slot="links">
				<user-menu></user-menu>
				<sidebar-item
					:link="{
						name: 'Schedule',
						icon: 'now-ui-icons media-1_album',
						path: '/schedule'
					}"
				></sidebar-item>
				<sidebar-item
					:link="{
						name: 'Scheduler',
						icon: 'now-ui-icons media-1_album',
						path: '/scheduler'
					}"
				></sidebar-item>
				<sidebar-item
					:link="{
						name: 'Users',
						icon: 'now-ui-icons users_single-02',
						path: '/users'
					}"
				></sidebar-item>
				<sidebar-item
					:link="{
						name: 'Companies',
						icon: 'now-ui-icons users_single-02',
						path: '/companies'
					}"
				></sidebar-item>
				<sidebar-item
					:link="{
						name: 'Login',
						path: '/login',
						icon: 'now-ui-icons design_image'
					}"
				></sidebar-item>
				<sidebar-item
					:link="{
						name: 'Wizard',
						icon: 'now-ui-icons design_image'
					}"
				>
					<sidebar-item
						:link="{ name: 'Pricing', path: '/pricing' }"
					></sidebar-item>
					<sidebar-item
						:link="{ name: 'Register', path: '/register' }"
					></sidebar-item>
					<sidebar-item
						:link="{ name: 'Wizard', path: '/forms/wizard' }"
					></sidebar-item>
				</sidebar-item>
				<sidebar-item
					:link="{
						name: 'Components',
						icon: 'now-ui-icons education_atom'
					}"
				>
					<sidebar-item
						:link="{ name: 'Buttons', path: '/components/buttons' }"
					></sidebar-item>
					<sidebar-item
						:link="{
							name: 'Grid System',
							path: '/components/grid-system'
						}"
					></sidebar-item>
					<sidebar-item
						:link="{ name: 'Panels', path: '/components/panels' }"
					></sidebar-item>
					<sidebar-item
						:link="{
							name: 'Sweet Alert',
							path: '/components/sweet-alert'
						}"
					></sidebar-item>
					<sidebar-item
						:link="{
							name: 'Notifications',
							path: '/components/notifications'
						}"
					></sidebar-item>
					<sidebar-item
						:link="{ name: 'Icons', path: '/components/icons' }"
					></sidebar-item>
					<sidebar-item
						:link="{
							name: 'Typography',
							path: '/components/typography'
						}"
					></sidebar-item>
				</sidebar-item>
				<sidebar-item
					:link="{
						name: 'Forms',
						icon: 'now-ui-icons files_single-copy-04'
					}"
				>
					<sidebar-item
						:link="{
							name: 'Regular Forms',
							path: '/forms/regular'
						}"
					></sidebar-item>
					<sidebar-item
						:link="{
							name: 'Extended Forms',
							path: '/forms/extended'
						}"
					></sidebar-item>
					<sidebar-item
						:link="{
							name: 'Validation Forms',
							path: '/forms/validation'
						}"
					></sidebar-item>
				</sidebar-item>
				<sidebar-item
					:link="{
						name: 'Forms',
						icon: 'now-ui-icons files_single-copy-04'
					}"
				>
				</sidebar-item>
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
		// try to init it later in case this component is loaded async
		setTimeout(() => {
			initScrollbar(className);
		}, 100);
	}
}

import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import UserMenu from "./Extra/UserMenu.vue";
import { ZoomCenterTransition } from "vue2-transitions";

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
