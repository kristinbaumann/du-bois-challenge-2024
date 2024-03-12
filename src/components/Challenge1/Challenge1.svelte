<!-- Negro Population of Georgia by Counties, 1870, 1880 (plate 06) -->
<!-- Credit for underlying Geojson file: Madison Giammaria -->
<script>
	import { geoPath, geoAlbers } from 'd3-geo';
	import dataCounties from '../../data/challenge01/counties_cleaned';
	import data1870 from '../../data/challenge01/data-1870_converted_corrected';
	import data1880 from '../../data/challenge01/data-1880_converted_corrected';
	import colors from '../../data/challenge01/colors';
	import Tooltip from './Tooltip.svelte';
	import { extractCountyName, getCountyNameFromIndex, getPopulationSizeFromIndex } from './helpers';

	let width = 300;
	let height = 350;

	// create a unit projection
	let projection = geoAlbers().scale(1).translate([0, 0]);

	// create a path generator
	let drawCountyPath = geoPath(projection);

	// Compute the bounds of the map, then derive scale & translate.
	const b = drawCountyPath.bounds(dataCounties),
		s = 0.95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
		t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

	// Update the projection to use computed scale & translate.
	projection.scale(s).translate(t);

	$: hoveredCountyIndex = null;

	$: getCountyColor = function getColor(dataset, c) {
		const countyNameWithNumber = c.properties.county;
		const countyName = extractCountyName(countyNameWithNumber);
		const populationSize = dataset[countyName].Population;
		return colors[populationSize].hex;
	};

	$: getTooltipData = function getData() {
		if (!hoveredCountyIndex) {
			return null;
		}
		const county = dataCounties.features[hoveredCountyIndex];
		const centroid = drawCountyPath.centroid(county);

		return {
			x: centroid[1],
			y: centroid[0],
			name: getCountyNameFromIndex(hoveredCountyIndex),
			values: {
				'1870': getPopulationSizeFromIndex(hoveredCountyIndex, '1870'),
				'1880': getPopulationSizeFromIndex(hoveredCountyIndex, '1880')
			}
		};
	};
</script>

<h2 class="headline">Negro Population of Georgia By Counties.</h2>

<div class="map-plus-legend top">
	<div class="chart-container">
		<svg {width} {height}>
			<text x={60} y={30} class="year-label">1870</text>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<g transform="translate(0,0) rotate(7)" on:mouseleave={() => (hoveredCountyIndex = null)}>
				{#each dataCounties.features as c, i}
					<path
						d={drawCountyPath(c)}
						id={c.properties.county}
						class="county"
						fill={getCountyColor(data1870, c)}
						fill-opacity={hoveredCountyIndex === i ? 0.8 : 1}
						on:mouseover={() => (hoveredCountyIndex = i)}
						on:focus={() => (hoveredCountyIndex = i)}
					/>
				{/each}
			</g>
		</svg>
	</div>

	<div class="legend">
		{#each Object.values(colors) as color, i}
			{#if i < 3}
				<p>
					<span style="background-color: {color.hex} "
					></span>{color.populationDescription.toLowerCase()}
				</p>
			{/if}
		{/each}
	</div>
</div>
<div class="map-plus-legend bottom">
	<div class="legend">
		{#each Object.values(colors) as color, i}
			{#if i >= 3}
				<p>
					<span style="background-color:{color.hex}"
					></span>{color.populationDescription.toLowerCase()}
				</p>
			{/if}
		{/each}
	</div>
	<div class="chart-container">
		<svg {width} {height}>
			<text x={60} y={30} class="year-label">1880</text>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<g transform="translate(0,0) rotate(7)" on:mouseleave={() => (hoveredCountyIndex = null)}>
				{#each dataCounties.features as c, i}
					<path
						d={drawCountyPath(c)}
						id={c.properties.county}
						class="county"
						fill={getCountyColor(data1880, c)}
						fill-opacity={hoveredCountyIndex === i ? 0.8 : 1}
						on:mouseover={() => (hoveredCountyIndex = i)}
						on:focus={() => (hoveredCountyIndex = i)}
					/>
				{/each}
			</g>
		</svg>
	</div>
</div>
<Tooltip data={getTooltipData()} />

<style>
	svg {
		width: 100%;
	}
	path {
		cursor: pointer;
		stroke: #333333;
		stroke-opacity: 0.5;
		transition: all 0.4s ease;
	}

	.map-plus-legend {
		display: flex;
		justify-content: space-around;
		align-items: center;
		column-gap: 10px;
	}

	.legend span {
		display: inline-block;
		width: 15px;
		height: 15px;
		border-radius: 50%;
		margin-right: 5px;
	}
	.legend p {
		margin: 2rem 0;
	}
	.year-label {
		font-weight: bold;
		stroke: black;
	}
	@media (max-width: 767px) {
		.map-plus-legend {
			flex-direction: column;
		}
		.map-plus-legend.bottom {
			flex-direction: column-reverse;
		}
	}
</style>
