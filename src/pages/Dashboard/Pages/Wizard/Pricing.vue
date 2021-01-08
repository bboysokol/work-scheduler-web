<template>
	<div>
		<div class="row">
			<div class="col-md-6 ml-auto mr-auto text-center">
				<h2 class="title">Pick the best plan for you</h2>
				<h5 class="description">
					You have Free Unlimited Updates and Premium Support on each
					package.
				</h5>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-4 col-md-6">
				<card
					class="card-pricing"
					plain
					no-footer-line
					category="Free use"
				>
					<div class="card-icon icon-warning">
						<i class="now-ui-icons media-1_button-power"></i>
					</div>
					<h3 class="card-title">FREE</h3>
					<ul>
						<li>Complete documentation</li>
						<li>Working materials in Sketch</li>
					</ul>

					<n-button
						slot="footer"
						type="primary"
						round
						@click.native="choose(0)"
						>Choose</n-button
					>
				</card>
			</div>

			<div class="col-lg-4 col-md-6">
				<card
					class="card-pricing"
					no-footer-line
					plain
					category="Medium"
				>
					<div class="card-icon icon-primary">
						<i class="now-ui-icons objects_diamond"></i>
					</div>
					<h3 class="card-title">69$</h3>
					<ul>
						<li>Working materials in EPS</li>
						<li>6 months access to the library</li>
					</ul>

					<n-button slot="footer" type="" round disabled
						>Coming soon</n-button
					>
				</card>
			</div>

			<div class="col-lg-4 col-md-6">
				<card
					class="card-pricing"
					plain
					no-footer-line
					category="Enterprise"
				>
					<div class="card-icon icon-success ">
						<i class="now-ui-icons media-2_sound-wave"></i>
					</div>
					<h3 class="card-title">69$</h3>
					<ul>
						<li>Working materials in PSD</li>
						<li>1 year access to the library</li>
					</ul>

					<n-button slot="footer" type="" round disabled
						>Coming soon</n-button
					>
				</card>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	methods: {
		choose(tier) {
			if (this.$route.params.id) {
				this.$router.push({
					name: "CreateCompany",
					params: {
						id: this.$route.params.id,
						tier: +tier
					}
				});
			} else {
				this.$router.push({
					name: "Register",
					params: {
						tier: +tier
					}
				});
			}
		}
	}
};
</script>
<style></style>
