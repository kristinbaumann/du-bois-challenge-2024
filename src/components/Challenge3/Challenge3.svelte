<script>
	import data from '../../data/challenge03/data.js';
	import { scaleLinear } from 'd3-scale';
	import { max } from 'd3-array';
	import { format } from 'd3-format';

	const height = 550;
	const width = 400;
	const margin = {
		top: 0,
		right: 20,
		bottom: 0,
		left: 40
	};
	const barHeight = 14;

	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const xScale = scaleLinear()
		.domain([0, max(data, (d) => d.value)])
		.range([0, innerWidth]);
	const yScale = scaleLinear().domain([0, data.length]).range([0, innerHeight]);
</script>

<h2 class="headline">Acres of Land owned by Negroes <br />in Georgia.</h2>
<svg {width} {height}>
	<g transform="translate({margin.left}, {margin.top})">
		{#each data as d, i}
			<rect x={xScale(0)} y={yScale(i)} height={barHeight} width={xScale(d.value)} />
			<text
				x={xScale(0)}
				y={yScale(i) + barHeight / 2}
				dx={-3}
				dy={1}
				text-anchor="end"
				dominant-baseline="middle"
				class="yearLabel">{d.year}</text
			>
			{#if d.year === 1874 || d.year === 1899}
				<text
					x={xScale(d.value) / 2}
					y={yScale(i) + barHeight / 2}
					text-anchor="middle"
					dominant-baseline="middle"
					class="valueLabel">{format(',d')(d.value)}</text
				>
			{/if}
		{/each}
	</g>
</svg>

<style>
	svg {
		display: block;
		margin: auto;
	}
	rect {
		fill: #d22a49;
		cursor: pointer;
	}
	text {
		font-size: 0.6rem;
		font-weight: 200;
	}
	text.valueLabel {
		font-weight: 700;
	}
</style>
