<script>
	import data from '../../data/challenge03/data.js';
	import { scaleLinear } from 'd3-scale';
	import { max } from 'd3-array';

	const height = 500;
	const width = 400;
	const margin = {
		top: 20,
		right: 20,
		bottom: 20,
		left: 40
	};
	const barHeight = 10;

	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const xScale = scaleLinear()
		.domain([0, max(data, (d) => d.value)])
		.range([0, innerWidth]);
	const yScale = scaleLinear().domain([0, data.length]).range([0, innerHeight]);
</script>

<h2 class="headline">Acres of Land owned by Negroes in Georgia</h2>
<svg {width} {height}>
	<g transform="translate({margin.left}, {margin.top})">
		{#each data as d, i}
			<rect x={xScale(0)} y={yScale(i)} height={barHeight} width={xScale(d.value)} />
		{/each}
	</g>
</svg>

<style>
	svg {
		display: block;
		margin: auto;
		background-color: lightgray;
	}
	rect {
		fill: #d22a49;
	}
</style>
