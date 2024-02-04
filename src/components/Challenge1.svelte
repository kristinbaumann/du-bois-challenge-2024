<!-- Negro Population of Georgia by Counties, 1870, 1880 (plate 06) -->
<!-- Credit for underlying Geojson file: Madison Giammaria -->
<script>
	import { geoPath, geoAlbers } from 'd3-geo';
	import dataCounties from '../data/counties_cleaned';
	import data1870 from '../data/data-1870_converted_corrected';
	import data1880 from '../data/data-1880_converted';
	import colors from '../data/colors';

	// map
	const projection = geoAlbers();
	projection.fitSize([450, 600], dataCounties);
	const drawCountyPath = geoPath(projection);

	$: hoveredCountyIndex = 0;
	$: selectedYear = '1880';

	$: getCountyColor = function getColor(c) {
		const countyNameWithNumber = c.properties.county;
		const countyName = countyNameWithNumber.substring(0, countyNameWithNumber.length - 2);
		const dataset = selectedYear === '1870' ? data1870 : data1880;
		const populationSize = dataset[countyName].Population;
		return colors[populationSize].hex;
	};
</script>

<div class="filter">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<p class={selectedYear === '1870' ? 'active' : ''} on:click={() => (selectedYear = '1870')}>
		1870
	</p>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<p class={selectedYear === '1880' ? 'active' : ''} on:click={() => (selectedYear = '1880')}>
		1880
	</p>
</div>
<svg width="500" height="600">
	<g transform="translate(25,0) rotate(5)">
		{#each dataCounties.features as c, i}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
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

<style>
	svg {
		background-color: lightgray;
	}
	path {
		cursor: pointer;
		stroke: #333333;
		stroke-opacity: 0.5;
		transition: all 0.5s ease;
	}
	.filter p {
		cursor: pointer;
	}
	.filter p.active {
		font-weight: bold;
	}
</style>
