<script>
	import data from '../../data/challenge03/data.js';
	import { scaleLinear } from 'd3-scale';
	import { max } from 'd3-array';
	import { format } from 'd3-format';

	const height = 550;
	const width = 450;
	const margin = {
		top: 0,
		right: 10,
		bottom: 0,
		left: 25
	};
	const barHeight = 14;

	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const xScale = scaleLinear()
		.domain([0, max(data, (d) => d.value)])
		.range([0, innerWidth]);
	const yScale = scaleLinear().domain([0, data.length]).range([0, innerHeight]);

	$: hoveredIndex = null;
</script>

<h2 class="headline">Acres of Land owned by Negroes <br />in Georgia.</h2>
<svg {width} {height}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<g
		transform="translate({margin.left}, {margin.top})"
		on:mouseout={() => (hoveredIndex = null)}
		on:blur={() => (hoveredIndex = null)}
	>
		{#each data as d, i}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<g class="row" on:mouseover={() => (hoveredIndex = i)} on:focus={() => (hoveredIndex = i)}>
				<rect x={xScale(0)} y={yScale(i)} height={barHeight} width={xScale(d.value)} />
				<text
					x={xScale(0)}
					y={yScale(i) + barHeight / 2}
					dx={-3}
					dy={1}
					text-anchor="end"
					dominant-baseline="middle"
					class="yearLabel {hoveredIndex === i ? 'active' : ''}">{d.year}</text
				>
				<!-- {#if d.year === 1874 || d.year === 1899 || i === hoveredIndex} -->
				<text
					x={xScale(d.value) / 2}
					y={yScale(i) + barHeight / 2}
					text-anchor="middle"
					dominant-baseline="middle"
					class="valueLabel {d.year === 1874 || d.year === 1899 || hoveredIndex === i
						? 'active'
						: ''}">{format(',d')(d.value)}</text
				>
				<!-- {/if} -->
			</g>
		{/each}
	</g>
</svg>

<style>
	svg {
		display: block;
		margin: auto;
	}
	g.row {
		cursor: pointer;
	}
	rect {
		fill: #d22a49;
		transition: all 0.5s ease;
	}
	rect:hover {
		fill-opacity: 0.6;
	}
	text {
		font-size: 0.6rem;
		transition: all 0.5s ease;
	}
	text.yearLabel {
		font-weight: 200;
	}
	text.yearLabel.active {
		font-weight: 700;
	}
	text.valueLabel {
		font-weight: 700;
		pointer-events: none;
		opacity: 0;
	}
	text.valueLabel.active {
		opacity: 1;
	}
</style>
