<!-- Slave and Free Negroes (plate 12) -->
<script>
	import { scaleLinear } from 'd3-scale';
	import { path } from 'd3-path';
	import { getPointsData, drawWobblyLineArea } from './helpers.js';
	import YAxis from './YAxis.svelte';
	import XAxis from './XAxis.svelte';

	let width = 300;
	const height = 600;

	const margin = { top: 40, right: 70, bottom: 10, left: 70 };
	$: innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	$: xScale = scaleLinear().domain([0, 3]).range([innerWidth, 0]);
	const yScale = scaleLinear().domain([1790, 1870]).range([0, innerHeight]);

	$: freeAreaPoints = getPointsData('free', xScale, yScale);
	$: slaveAreaPoints = getPointsData('slaves', xScale, yScale);
	$: wobblyData = drawWobblyLineArea(xScale, yScale);

	function drawPath(set) {
		const p = path();
		p.moveTo(set.topRight.x, set.topRight.y);
		p.lineTo(set.topLeft.x, set.topLeft.y);
		p.lineTo(set.bottomLeft.x, set.bottomLeft.y);
		p.lineTo(set.bottomRight.x, set.bottomRight.y);
		p.closePath();
		return p.toString();
	}
</script>

<h2 class="headline">Slaves and free negroes.</h2>
<div class="chart-container" bind:clientWidth={width}>
	<svg {height}>
		<g transform="translate({margin.left}, {margin.top})">
			<g class="freeAreas">
				{#each freeAreaPoints as area}
					<path d={drawPath(area)} class="free" />
				{/each}
			</g>
			<g class="slaveAreas">
				{#each slaveAreaPoints as area}
					<path d={drawPath(area)} class="slave" />
				{/each}
			</g>
			<path d={wobblyData.area} class="wobblyArea" />
			<path d={wobblyData.line} class="wobblyLine" />
			<YAxis {xScale} {yScale} />
			<XAxis {xScale} />
		</g>
	</svg>
</div>

<style>
	.chart-container {
		margin: 0 auto;
		max-width: 380px;
	}
	svg {
		display: block;
		margin: auto;
		font-weight: 200;
		font-size: 0.9rem;
		width: 100%;
	}
	path {
		stroke: #e4cfbed9;
	}
	path.free {
		fill: #c31f3d;
	}
	path.slave {
		fill: black;
	}
	path.wobblyLine {
		stroke: black;
		fill: none;
		stroke-width: 2px;
	}
	path.wobblyArea {
		fill: #e8d7c8;
		stroke: none;
	}
</style>
