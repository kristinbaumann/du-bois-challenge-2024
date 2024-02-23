<script>
	import { scaleLinear } from 'd3-scale';

	import data from '../../data/challenge05/data.js';

	import Row from './Row.svelte';

	$: width = 355;
	const height = 620;
	let margin = {
		top: 30,
		right: 50,
		bottom: 10,
		left: 50
	};
	if (window.innerWidth < 425) {
		margin = {
			...margin,
			right: 10,
			left: 10
		};
	}
	$: innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	// xScale arbitrary from 0 to 100, horizontal axis divided in 2 parts (left half text, right half bars)
	$: xScale = scaleLinear().domain([0, 100]).range([0, innerWidth]);
	const yScale = scaleLinear().domain([0, 100]).range([0, innerHeight]);
</script>

<h2 class="headline">
	<span>Race Amalgation in Georgia.</span><br />
	<span class="subtitle">Based on a study of 40.000 individuals of negro descent.</span>
</h2>

<div class="chart-container" bind:clientWidth={width}>
	<svg {height}>
		<g transform="translate({margin.left},{margin.top})" class="test">
			{#each data as d, i}
				<Row {data} {d} {i} {yScale} bind:xScale />
			{/each}
		</g>
	</svg>
</div>

<style>
	svg {
		display: block;
		margin: auto;
		width: 100%;
	}
	.headline span.subtitle {
		font-family: 'ErieLight';
	}
	.test {
		background-color: pink;
	}
</style>
