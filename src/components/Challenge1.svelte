<!-- Negro Population of Georgia by Counties, 1870, 1880 (plate 06) -->
<!-- Credit for underlying Geojson file: Madison Giammaria -->
<script>
	import { geoPath, geoAlbers } from 'd3-geo';
	import dataCounties from '../data/challenge01/counties_cleaned';
	import data1870 from '../data/challenge01/data-1870_converted_corrected';
	import data1880 from '../data/challenge01/data-1880_converted_corrected';
	import colors from '../data/challenge01/colors';

	const projection = geoAlbers();
	projection.fitSize([425, 450], dataCounties);
	const drawCountyPath = geoPath(projection);

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
		},
		{
			key: 'relative',
			label: 'Relative Change from 1870 to 1880',
			dataset: data1870
		}
	];

	$: hoveredCountyIndex = null;
	$: selectedFilter = filterOptions[0];

	let tooltipX = 0;
	let tooltipY = 0;

	function extractCountyName(nameWithNumber) {
		return nameWithNumber.substring(0, nameWithNumber.length - 2);
	}
	function toTitleCase(str) {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}

	function getCountyNameFromIndex(index) {
		if (index && dataCounties.features[index]) {
			return toTitleCase(extractCountyName(dataCounties.features[index].properties.county));
		}
		return '';
	}

	function getPopulationSizeFromIndex(index, year) {
		if (!index) {
			return '';
		}
		const countyNameWithNumber = dataCounties.features[index].properties.county;
		const countyName = extractCountyName(countyNameWithNumber);
		let populationSize = 0;
		if (year === '1870') {
			populationSize = data1870[countyName].Population;
		} else {
			populationSize = data1880[countyName].Population;
		}
		return populationSize;
	}

	$: getCountyColor = function getColor(c) {
		const countyNameWithNumber = c.properties.county;
		const countyName = extractCountyName(countyNameWithNumber);
		const dataset = selectedFilter.dataset;
		const populationSize = dataset[countyName].Population;
		return colors[populationSize].hex;
	};
</script>

<h2 class="headline">Negro Population of Georgia By Counties.</h2>

<div class="filter">
	<p>Color map by:</p>
	{#each filterOptions as option}
		<button
			class={selectedFilter === option ? 'active' : ''}
			on:click={() => (selectedFilter = option)}
		>
			{option.label}
		</button>
	{/each}
</div>
<div class="map-plus-legend">
	<svg width="450" height="500">
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

	<div class="legend">
		{#each Object.values(colors) as color}
			<p>
				<span style="background-color: {color.hex} "
				></span>{color.populationDescription.toLowerCase()}
			</p>
		{/each}
	</div>
</div>
<!-- {#if hoveredCountyIndex} -->
<div
	class="tooltip"
	style="position: absolute;
	top: {tooltipX}px;
	left: {tooltipY}px;"
>
	<p>{getCountyNameFromIndex(hoveredCountyIndex)}</p>
	<p></p>
	<div class="info">
		<span>Count in 1870: {getPopulationSizeFromIndex(hoveredCountyIndex, '1870')}</span>
		<br />
		<span>Count for 1880: {getPopulationSizeFromIndex(hoveredCountyIndex, '1880')} </span>
	</div>
	<span class="bar" />
</div>

<!-- {/if} -->

<style>
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
		margin-bottom: 5px;
	}
	.filter p {
		margin-bottom: 10px;
	}
	.map-plus-legend {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.tooltip {
		background: white;
		box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.15);
		padding: 8px;
		border-radius: 3px;
		pointer-events: none;
		transition:
			top 300ms ease,
			left 300ms ease;
	}
	.tooltip .bar {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 3px;
		width: 100%;
		background: black;
	}
</style>
