<template>
	<div>
		<div class="wrapper wrapper-full-page">
			<div
				class="full-page section-image"
				:class="pageClass"
				filter-color="black"
				data-image="/img/bg13.jpg"
			>
				<div class="content">
					<div class="container">
						<zoom-center-transition
							:duration="pageTransitionDuration"
							mode="out-in"
						>
							<router-view></router-view>
						</zoom-center-transition>
					</div>
				</div>
				<footer class="footer">
					<div class="container-fluid">
						<nav>
							<ul>
								<li>
									<a href="https://www.creative-tim.com">
										Work Scheduler
									</a>
								</li>
							</ul>
						</nav>
						<div class="copyright">
							&copy; {{ year }}
							<a
								href="https://github.com/bboysokol"
								target="_blank"
								>Przemysław Sokołowski</a
							>
						</div>
					</div>
				</footer>
				<div
					class="full-page-background"
					style="backgroundImage: url('/img/bg13.jpg')"
				></div>
			</div>
		</div>
	</div>
</template>
<script>
import { ZoomCenterTransition } from "vue2-transitions";

export default {
	components: {
		ZoomCenterTransition
	},
	props: {
		backgroundColor: {
			type: String,
			default: "black"
		}
	},
	data() {
		return {
			showMenu: false,
			menuTransitionDuration: 250,
			pageTransitionDuration: 200,
			year: new Date().getFullYear(),
			pageClass: "login-page"
		};
	},
	methods: {
		toggleNavbar() {
			document.body.classList.toggle("nav-open");
			this.showMenu = !this.showMenu;
		},
		closeMenu() {
			document.body.classList.remove("nav-open");
			this.showMenu = false;
		},
		setPageClass() {
			this.pageClass = `${this.$route.name}-page`.toLowerCase();
		}
	},
	beforeDestroy() {
		this.closeMenu();
	},
	beforeRouteUpdate(to, from, next) {
		if (this.showMenu) {
			this.closeMenu();
			setTimeout(() => {
				next();
			}, this.menuTransitionDuration);
		} else {
			next();
		}
	},
	watch: {
		$route() {
			this.setPageClass();
		}
	}
};
</script>
<style lang="scss">
$scaleSize: 0.8;
@keyframes zoomIn8 {
	from {
		opacity: 0;
		transform: scale3d($scaleSize, $scaleSize, $scaleSize);
	}
	100% {
		opacity: 1;
	}
}
.wrapper-full-page .zoomIn {
	animation-name: zoomIn8;
}
@keyframes zoomOut8 {
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
		transform: scale3d($scaleSize, $scaleSize, $scaleSize);
	}
}
.wrapper-full-page .zoomOut {
	animation-name: zoomOut8;
}
</style>
