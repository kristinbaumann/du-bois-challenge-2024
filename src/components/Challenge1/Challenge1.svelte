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

	$: console.log(window.innerWidth);

	let mapWidth;
	if (window.innerWidth < 400) {
		mapWidth = 220;
	} else {
		mapWidth = 300;
	}
	let mapHeight = mapWidth * 1.2;

	let projection = geoAlbers();
	$: projection.fitSize([mapWidth, mapHeight], dataCounties);
	$: drawCountyPath = geoPath(projection);

	const filterOptions = [
		{
			key: '1870',
			label: 'Count in 1870',
			dataset: data1870
		},
		{
			key: '1880',
			label: 'Count in 1880',
			dataset: data1880
		}
	];

	$: hoveredCountyIndex = null;
	$: selectedFilter = filterOptions[0];

	$: getCountyColor = function getColor(c) {
		const countyNameWithNumber = c.properties.county;
		const countyName = extractCountyName(countyNameWithNumber);
		const dataset = selectedFilter.dataset;
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

<div class="filter">
	<p>Color map by:</p>
	{#each filterOptions as option}
		<button class:active={selectedFilter === option} on:click={() => (selectedFilter = option)}>
			{option.label}
		</button>
	{/each}
</div>

<div class="map-plus-legend">
	<div class="chart-container" bind:clientWidth={mapWidth}>
		<svg height={mapHeight}>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<g transform="translate(25,0) rotate(6)" on:mouseleave={() => (hoveredCountyIndex = null)}>
				{#each dataCounties.features as c, i}
					<path
						d={drawCountyPath(c)}
						id={c.properties.county}
						class="county"
						fill={getCountyColor(c)}
						fill-opacity={hoveredCountyIndex === i ? 0.8 : 1}
						on:mouseover={() => (hoveredCountyIndex = i)}
						on:focus={() => (hoveredCountyIndex = i)}
					/>
				{/each}
			</g>
		</svg>
	</div>

	<div class="legend">
		{#each Object.values(colors) as color}
			<p>
				<span style="background-color: {color.hex} "
				></span>{color.populationDescription.toLowerCase()}
			</p>
		{/each}
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
	.filter button {
		cursor: pointer;
		background-color: rgba(0, 0, 0, 0.02);
		border: 1px solid #333;
		border-radius: 5px;
		transition: all 0.2s ease;
		margin-right: 12px;
		padding: 3px 10px;
	}
	.filter button:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
	.filter button.active {
		background-color: rgba(0, 0, 0, 0.7);
		color: rgba(356, 356, 356, 0.8);
	}
	.legend span {
		display: inline-block;
		width: 15px;
		height: 15px;
		border-radius: 50%;
		margin-right: 5px;
	}
	.filter {
		text-align: center;
		margin-bottom: 5px;
	}
	.filter p {
		margin-bottom: 10px;
	}
	.map-plus-legend {
		display: flex;
		justify-content: space-around;
		align-items: center;
		column-gap: 25px;
	}
	@media (max-width: 1024px) {
		.map-plus-legend {
			flex-direction: column;
		}
	}
</style>
