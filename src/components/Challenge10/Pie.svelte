<script>
	import { arc } from 'd3-shape';
	import data from '../../data/challenge10/data';

	const height = 200;
	let width = 500;
	const margin = {
		top: 10,
		right: 10,
		bottom: 10,
		left: 10
	};
	const innerHeight = height - margin.top - margin.bottom;
	$: innerWidth = width - margin.left - margin.right;

	const fn = arc();
	let total = data.reduce((total, s) => total + s.percentage, 0);
	let acc = -Math.PI / 2;
	const arcs = data.map((d) => {
		const optionsDefault = {
			innerRadius: 0,
			outerRadius: 100,
			startAngle: acc,
			endAngle: (acc += (Math.PI * 2 * d.percentage) / total)
		};

		return {
			value: d.percentage,
			color: d.color,
			label: d.occupation,
			d: fn(optionsDefault),
			centroidDefault: fn.centroid(optionsDefault),
			centroidOuter: fn.centroid({ ...optionsDefault, innerRadius: 70 })
		};
	});

	// sort data by orderLabels (as order in legends differs to order in pie)
	const labelData = [...data].sort((a, b) => a.orderLabels - b.orderLabels);

	const legendCircleRadius = 9;
	const legendYDist = 22;
	const legendXDistOuter = 10;
</script>

<div class="chart-container-pie" bind:clientWidth={width}>
	<svg {height}>
		<g transform="translate({margin.left},{margin.top})">
			<g class="pie" transform="translate({innerWidth / 2},{innerHeight / 2})">
				<!-- pie pieces  -->
				{#each arcs as arc}
					<path d={arc.d} fill={arc.color} stroke={arc.color} data-label={arc.label} />
				{/each}
				<!-- value labels (placed close to the outer radius for small values)  -->
				{#each arcs as arc}
					{#if arc.value > 10}
						<text x={arc.centroidDefault[0]} y={arc.centroidDefault[1]}>{arc.value}%</text>
					{:else}
						<text x={arc.centroidOuter[0]} y={arc.centroidOuter[1]} class="tiny">{arc.value}%</text>
					{/if}
				{/each}
				<!-- border of whole pie  -->
				<circle cx={0} cy={0} r={100} fill="none" stroke="#6c6c6c" />
			</g>
			<!-- legend left  -->
			<g class="legend" transform="translate(0,{40})">
				{#each labelData as d, i}
					<circle
						cx={legendXDistOuter}
						cy={legendYDist * i}
						r={legendCircleRadius}
						fill={d.color}
					/>
					<text
						x={legendXDistOuter + legendCircleRadius}
						y={legendYDist * i + legendCircleRadius / 2}
						dx={6}
						dy={-3}
						dominant-baseline="middle"
						text-anchor="start">{d.occupation}</text
					>
				{/each}
			</g>
			<!-- legend right  -->
			<g class="legend french" transform="translate(0,{40})">
				{#each labelData as d, i}
					<circle
						cx={innerWidth - legendXDistOuter}
						cy={legendYDist * i}
						r={legendCircleRadius}
						fill={d.color}
					/>
					<text
						x={innerWidth - legendXDistOuter - legendCircleRadius}
						y={legendYDist * i + legendCircleRadius / 2}
						dx={-6}
						dy={-3}
						text-anchor="end">{d.occupationFrench}</text
					>
				{/each}
			</g>
		</g>
	</svg>
</div>

<style>
	svg {
		display: inline-block;
		margin: 0 auto;
		width: 100%;
	}
	.pie text {
		text-anchor: middle;
		font-size: 0.8rem;
		stroke: black;
	}
	.pie text.tiny {
		font-size: 0.5rem;
	}
	.legend circle {
		stroke: #6c6c6c;
	}
	.legend text {
		font-size: 0.6rem;
		font-weight: 200;
		text-transform: uppercase;
	}
	.legend.french text {
		fill: #d22a49;
	}
</style>
