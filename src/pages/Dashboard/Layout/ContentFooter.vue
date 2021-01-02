<template>
	<footer class="footer">
		<div class="container-fluid d-flex flex-wrap justify-content-between">
			<nav>
				<ul class="footer-menu">
					<li>
						<router-link :to="{ path: '/dashboard' }"
							>Work Scheduler</router-link
						>
					</li>
				</ul>
			</nav>
			<div class="copyright">
				&copy; {{ year }}
				<a href="https://github.com/bboysokol" target="_blank"
					>Przemysław Sokołowski</a
				>
			</div>
		</div>
	</footer>
</template>
<script>
export default {
	data() {
		return {
			year: new Date().getFullYear()
		};
	}
};
</script>
<style></style>
