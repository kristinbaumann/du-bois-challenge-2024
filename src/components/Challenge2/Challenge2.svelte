<!-- Slave and Free Negroes (plate 12) -->
<script>
	import { scaleLinear } from 'd3-scale';
	import { path } from 'd3-path';
	import { getPointsData } from './helpers.js';

	const width = 300;
	const height = 600;

	const margin = { top: 10, right: 10, bottom: 10, left: 10 };
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const xScale = scaleLinear().domain([0, 3]).range([innerWidth, 0]);
	const yScale = scaleLinear().domain([1790, 1870]).range([0, innerHeight]);

	const freeAreaPoints = getPointsData('free', xScale, yScale);
	const slaveAreaPoints = getPointsData('slaves', xScale, yScale);

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
<svg {width} {height}>
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
	</g>
</svg>

<style>
	svg {
		background-color: lightgray;
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
</style>
