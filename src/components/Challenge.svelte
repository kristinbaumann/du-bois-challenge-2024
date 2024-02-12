<script>
	import originalPlate06 from '$lib/assets/originals/original-plate-06.jpg';
	import originalPlate12 from '$lib/assets/originals/original-plate-12.jpg';
	import originalPlate1 from '$lib/assets/originals/original-plate-01.jpg';

	const originals = {
		1: originalPlate06,
		2: originalPlate12,
		4: originalPlate1
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
			<p>Adaptation</p>
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
		margin: 0 0 30px;
	}
	.challenge-wrapper {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-around;
		column-gap: 5px;
		flex-wrap: wrap;
	}
	.original {
		flex-shrink: 0;
		flex-grow: 1;
		flex-basis: 49%;
	}
	.recreation {
		flex-shrink: 0;
		flex-grow: 1;
		flex-basis: 49%;
	}
	@media (max-width: 1160px) {
		.original {
			flex-basis: 100%;
		}
		.recreation {
			flex-basis: 100%;
		}
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
		position: relative;
		aspect-ratio: 0.79;
	}
</style>
