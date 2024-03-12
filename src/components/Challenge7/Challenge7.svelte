<!-- 
	From: https://github.com/ajstarks/dubois-data-portraits/blob/master/challenge/2024/challenge07/Note
This chart has no units, so extrapilating the illiteracy rate of Black
Americans in the 1890 Census (56.8%, source "Excerpts are taken from
Chapter 1 of 120 Years of American Education: A Statistical Portrait
(Edited by Tom Snyder, National Center for Education Statistics,
1993).", https://nces.ed.gov/naal/lit_history.asp).

56.8% -- 8.8cm on the chart yields 6.45454 illitercy points/cm. by
measuring the length of each bar (recorded in ill.d), you can compute
the illteracy points.
-->

<script>
	import { scaleLinear } from 'd3-scale';
	import { randomInt } from 'd3-random';
	import data from '../../data/challenge07/data.js';
	import Bar from './Bar.svelte';
	import markerGreen from '$lib/assets/images/marker_green.png';
	import markerRed from '$lib/assets/images/marker_red.png';

	const height = 450;
	let width = 300;
	const margin = {
		top: 40,
		right: 20,
		bottom: 45,
		left: 70
	};
	const barHeight = 22;
	const innerHeight = height - margin.top - margin.bottom;
	$: innerWidth = width - margin.left - margin.right;

	$: xScale = scaleLinear().domain([0, 73]).range([0, innerWidth]);
	const yScale = scaleLinear()
		.domain([0, data.length - 1])
		.range([0, innerHeight]);
</script>

<h2 class="headline">
	<p>Illiteracy of the American Negroes compared with that of other nations.</p>
	<p>Proportion d'illettrés parmi les Nègres Americains comparée à celle des autres nations.</p>
	<p>Done by Atlanta University.</p>
</h2>
<div class="chart-container" bind:clientWidth={width}>
	<svg {height}>
		<defs>
			<!-- multiple green marker pattern -->
			{#each data as d, i}
				<pattern
					id="pattern-green-{i}"
					patternUnits="userSpaceOnUse"
					width={yScale(73)}
					height={barHeight}
					patternTransform="translate(-{20 * randomInt(10)()},0)"
					preserveAspectRatio="xMinYMid"
				>
					<image href={markerGreen} x="0" y="0" width="1000" height="160" />
				</pattern>
			{/each}
			<!-- red marker pattern -->
			<pattern id="pattern-red" patternUnits="userSpaceOnUse" width={yScale(56)} height={barHeight}>
				<image href={markerRed} x="0" y="0" width="1274" height="259" />
			</pattern>
		</defs>
		<g transform="translate({margin.left}, {margin.top})">
			{#each data as d, i}
				<text x={-margin.left} y={yScale(i) + barHeight / 2} dominant-baseline="central"
					>{d.country}</text
				>
				<Bar bind:xScale {yScale} {barHeight} index={i} value={d.value} country={d.country} />
			{/each}
		</g>
	</svg>
</div>

<style>
	.headline p {
		font-family: 'Times New Roman', Times, serif;
		font-size: 1rem;
		font-weight: 400;
		color: #333;
		text-transform: none;
		margin-top: 0;
	}
	.headline p:nth-of-type(2) {
		font-size: 0.7rem;
	}
	.headline p:nth-of-type(3) {
		font-size: 0.6rem;
	}
	svg {
		display: block;
		width: 100%;
		padding: 0 10px;
	}
	text {
		font-size: 0.6rem;
	}
</style>
