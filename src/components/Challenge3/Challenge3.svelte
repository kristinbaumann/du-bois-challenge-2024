<script>
	import data from '../../data/challenge03/data.js';
	import { scaleLinear } from 'd3-scale';
	import { max } from 'd3-array';
	import { format } from 'd3-format';

	import Bar from './Bar.svelte';

	const height = 645;
	let width = 450;
	const margin = {
		top: 0,
		right: 10,
		bottom: 0,
		left: 25
	};
	const barHeight = 14;

	$: innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	$: xScale = scaleLinear()
		.domain([0, max(data, (d) => d.value)])
		.range([0, innerWidth]);
	const yScale = scaleLinear().domain([0, data.length]).range([0, innerHeight]);

	$: hoveredIndex = null;
</script>

<h2 class="headline">Acres of Land owned by Negroes <br />in Georgia.</h2>
<div class="chart-container" bind:clientWidth={width}>
	<svg {height}>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<g
			transform="translate({margin.left}, {margin.top})"
			on:mouseout={() => (hoveredIndex = null)}
			on:blur={() => (hoveredIndex = null)}
		>
			{#each data as d, i}
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<g class="row" on:mouseover={() => (hoveredIndex = i)} on:focus={() => (hoveredIndex = i)}>
					<Bar {xScale} {yScale} {barHeight} index={i} value={d.value} />
					<text
						x={xScale(0)}
						y={yScale(i) + barHeight / 2}
						dx={-3}
						dy={1}
						text-anchor="end"
						dominant-baseline="middle"
						class="yearLabel {hoveredIndex === i ? 'active' : ''}">{d.year}</text
					>
					<text
						x={xScale(d.value) / 2}
						y={yScale(i) + barHeight / 2}
						text-anchor="middle"
						dominant-baseline="middle"
						dy={1}
						class="valueLabel {d.year === 1874 || d.year === 1899 || hoveredIndex === i
							? 'active'
							: ''}">{format(',d')(d.value)}</text
					>
				</g>
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
	.headline {
		margin-bottom: 10px;
	}
	g.row {
		cursor: pointer;
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
		font-size: 0.7rem;
	}
	text.valueLabel.active {
		opacity: 1;
	}
</style>
