<template>
	<div class="row d-flex justify-content-center">
		<div class="col-lg-5 col-md-8">
			<card class="card-user">
				<div slot="image" class="image">
					<img src="img/bg5.jpg" alt="..." />
				</div>
				<div>
					<div class="author">
						<a href="#">
							<img
								class="avatar border-gray"
								src="img/mike.jpg"
								alt="..."
							/>
							<h5 class="title">Mike Andrew</h5>
						</a>
						<p class="description">
							michael24
						</p>
					</div>
					<p class="description text-center">
						"Lamborghini Mercy <br />
						Your chick she so thirsty <br />
						I'm in that two seat Lambo"
					</p>
				</div>
				<div slot="footer" class="button-container">
					<n-button href="#" type="neutral" icon round size="lg">
						<i class="fa fa-facebook-square"></i>
					</n-button>
					<n-button href="#" type="neutral" icon round size="lg">
						<i class="fa fa-twitter"></i>
					</n-button>
					<n-button href="#" type="neutral" icon round size="lg">
						<i class="fa fa-google-plus-square"></i>
					</n-button>
				</div>
			</card>
		</div>
	</div>
</template>
<script>
export default {};
</script>
<style></style>
