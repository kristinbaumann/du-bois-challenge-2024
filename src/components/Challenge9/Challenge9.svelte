<script>
	import { scaleLinear } from 'd3-scale';
	import data from '../../data/challenge09/data.js';

	let width = 570;
	let height = 570;
	const margin = {
		top: 25,
		right: 20,
		bottom: 10,
		left: 20
	};
	const innerHeight = height - margin.top - margin.bottom;
	$: innerWidth = width - margin.left - margin.right;

	$: xScale = scaleLinear().domain([1790, 1870]).range([0, innerWidth]);
	const yScale = scaleLinear().domain([0, 100]).range([0, innerHeight]);
	$: freePaths = data
		.map((d, i) => {
			if (i === data.length - 1) {
				return null;
			}
			const next = data[i + 1];
			return {
				topLeft: { x: xScale(d.Year), y: 0 },
				topRight: { x: xScale(next.Year), y: 0 },
				bottomRight: { x: xScale(next.Year), y: yScale(next.Free) },
				bottomLeft: { x: xScale(d.Year), y: yScale(d.Free) }
			};
		})
		.filter((d) => d !== null)
		.map(
			(d) =>
				`M ${d.topLeft.x} ${d.topLeft.y} L ${d.topRight.x} ${d.topRight.y} L ${d.bottomRight.x} ${d.bottomRight.y} L ${d.bottomLeft.x} ${d.bottomLeft.y} Z`
		);
</script>

<h2 class="headline">
	<p>Proportion of freemen and Slaves among american negroes .</p>
	<p>Progrès des Nègres libres et des esclaves en amérique .</p>
	<p>Done by Atlanta University .</p>
</h2>
<div class="chart-container" bind:clientWidth={width}>
	<svg {height}>
		<g transform="translate({margin.left},{margin.top})">
			<rect x={xScale(1790)} y={yScale(0)} width={xScale(1870)} height={yScale(100)} fill="black" />
			<g class="polygons">
				{#each freePaths as p}
					<path d={p} />
				{/each}
			</g>
			<g class="xaxis" dominant-baseline="text-after-edge">
				{#each data as d}
					<text x={xScale(d.Year)} y={0}>{d.Year}</text>
					{#if d.Year !== 1870}
						<line x1={xScale(d.Year)} y1={0} x2={xScale(d.Year)} y2={yScale(d.Free)} />
					{/if}
				{/each}
			</g>
			<g class="valueLabels" dominant-baseline="text-after-edge">
				{#each data as d}
					<text x={xScale(d.Year)} y={d.Year !== 1870 ? yScale(d.Free) : yScale(12)} dy={-1}
						>{d.Free}%</text
					>
				{/each}
			</g>
			<g class="typeLabels" dominant-baseline="middle">
				<text x={xScale(1830)} y={yScale(4)}>Free - Libre</text>
				<text x={xScale(1830)} y={yScale(43)} class="light">Slaves</text>
				<text x={xScale(1830)} y={yScale(48)} class="light">Esclaves</text>
			</g>
		</g>
	</svg>
</div>

<style>
	.headline p {
		font-weight: 700;
		margin-top: 0;
		color: #333;
		font-size: 0.85rem;
		padding: 0 5px;
	}
	.headline p:nth-of-type(2) {
		margin-top: 25px;
	}
	.headline p:nth-of-type(3) {
		margin-top: 30px;
		font-size: 0.7rem;
	}
	svg {
		margin: 40px auto 0;
		display: block;
		width: 100%;
	}
	.polygons path {
		fill: #1e7c4d;
		stroke: #1e7c4d;
		stroke-width: 1;
		transition: opacity 0.5s ease;
	}
	.polygons path:hover {
		opacity: 0.6;
	}
	.xaxis text {
		text-anchor: middle;
		font-weight: bold;
		stroke: black;
		font-size: 0.8rem;
	}
	.xaxis line {
		stroke: #333;
		stroke-width: 1;
	}
	.valueLabels text {
		text-anchor: middle;
		font-weight: bold;
		font-size: 0.8rem;
		stroke: black;
	}
	.typeLabels text {
		text-anchor: middle;
		font-weight: bold;
		font-size: 1.2rem;
		text-transform: uppercase;
		letter-spacing: 0.2rem;
		stroke: black;
	}
	.typeLabels text.light {
		fill: #e8d7c8;
		stroke: #e8d7c8;
		font-size: 1.4rem;
	}
</style>
