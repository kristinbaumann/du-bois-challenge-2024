<script>
	import { originals } from '$lib/assets/originals/originals.js';

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
		padding: 10px;
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
	@media (max-width: 768px) {
		.original {
			flex-basis: 100%;
		}
		.recreation {
			flex-basis: 100%;
		}
	}

	.original img {
		width: 100%;
		max-width: fit-content;
	}

	h2 {
		margin: 0 0 5px;
	}
	.recreation-wrapper {
		font-family: ErieLight, sans-serif;
		background-color: #e4cfbed9;
		border-radius: 10px;
		padding: 20px;
		position: relative;
	}
	@media (max-width: 767px) {
		.recreation-wrapper {
			padding: 10px 5px;
		}
	}
	#challenge5 .recreation-wrapper {
		padding: 10px 5px;
	}
	#challenge6 .recreation-wrapper {
		padding: 5px 0 0 5px;
	}
	#challenge8 .recreation-wrapper,
	#challenge9 .recreation-wrapper {
		padding: 5px 0 0;
	}
</style>
