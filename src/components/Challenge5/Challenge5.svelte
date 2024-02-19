<script>
	import { scaleLinear } from 'd3-scale';

	import data from '../../data/challenge05/data.js';

	import Row from './Row.svelte';

	const height = 620;
	const width = 355;
	const margin = {
		top: 30,
		right: 0,
		bottom: 10,
		left: 150
	};
	const innerHeight = height - margin.top - margin.bottom;
	const barWidth = 200;

	const yScale = scaleLinear().domain([0, 100]).range([0, innerHeight]);
</script>

<h2 class="headline">
	<span>Race Amalgation in Georgia.</span><br />
	<span class="subtitle">Based on a study of 40.000 individuals of negro descent.</span>
</h2>

<svg {height} {width}>
	<g transform="translate({margin.left},{margin.top})">
		{#each data as d, i}
			<Row {data} {d} {i} {margin} {yScale} {barWidth} />
		{/each}
	</g>
</svg>

<style>
	svg {
		display: block;
		margin: auto;
	}
	.headline span.subtitle {
		font-weight: 200;
	}
</style>
