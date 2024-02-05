<script>
	import originalPlate06 from '$lib/assets/originals/original-plate-06.jpg';

	const originals = {
		1: originalPlate06
	};

	export let number;
</script>

<div class="challenge" id="challenge{number}">
	<h2>Challenge {number}</h2>
	<div class="challenge-wrapper">
		<div class="original">
			<p>Original</p>
			<img
				src={originals[number]}
				alt="Original data visualisation by Wes Du Bois for challenge number {number} in 2024"
			/>
		</div>
		<div class="recreation">
			<p>Recreation</p>
			<div class="recreation-wrapper">
				<slot />
			</div>
		</div>
	</div>
</div>

<style>
	.challenge {
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 0px 15px 0px rgba(0, 0, 0, 0.1);
	}
	.challenge-wrapper {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		column-gap: 25px;
	}
	.original {
		width: 33%;
	}
	.recreation {
		width: 66%;
	}

	.original img {
		width: 100%;
	}

	h2 {
		margin: 0 0 5px;
	}
	.recreation-wrapper {
		background-color: #e4cfbed9;
		border-radius: 10px;
		padding: 20px;
	}
</style>
