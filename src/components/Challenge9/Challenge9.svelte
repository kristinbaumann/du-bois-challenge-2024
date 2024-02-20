<script>
	import { scaleLinear } from 'd3-scale';
	import data from '../../data/challenge09/data.js';

	const height = 570;
	const width = 570;
	const margin = {
		top: 25,
		right: 20,
		bottom: 10,
		left: 20
	};
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const xScale = scaleLinear().domain([1790, 1870]).range([0, innerWidth]);
	const yScale = scaleLinear().domain([0, 100]).range([0, innerHeight]);
	const freePaths = data
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
<svg {width} {height}>
	<g transform="translate({margin.left},{margin.top})">
		<rect x={xScale(1790)} y={yScale(0)} width={xScale(1870)} height={yScale(100)} fill="black" />
		<g class="polygons">
			{#each freePaths as d}
				<path {d} fill="#1e7c4d" />
			{/each}
		</g>
	</g>
</svg>

<style>
	.headline p {
		font-weight: 700;
		margin-top: 0;
		color: #333;
		font-size: 0.85rem;
	}
	.headline p:nth-of-type(2) {
		margin-top: 25px;
	}
	.headline p:nth-of-type(3) {
		margin-top: 30px;
		font-size: 0.7rem;
	}
	svg {
		background-color: lightgray;
		margin: 40px auto 0;
		display: block;
	}
</style>
