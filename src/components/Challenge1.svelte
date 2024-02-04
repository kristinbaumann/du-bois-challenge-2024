<!-- Negro Population of Georgia by Counties, 1870, 1880 (plate 06) -->
<!-- Credit for Geojson file: Madison Giammaria -->
<script>
	import { geoPath, geoAlbers } from 'd3-geo';
	import data from '../data/counties_cleaned';
	import data1870 from '../data/data-1870_converted_corrected';
	import colors from '../data/colors';

	const dataset = data.features;
	const projection = geoAlbers();
	projection.fitSize([450, 600], data);
	const path = geoPath(projection);

	console.log(data1870, colors);

	function getColor(c) {
		const countyNameWithNumber = c.properties.county;
		const countyName = countyNameWithNumber.substring(0, countyNameWithNumber.length - 2);
		const populationSize = data1870[countyName].Population;
		const color = colors[populationSize].hex;
		// console.log(countyName, populationSize, color);
		return color;
	}
	function getPopulationSize(c) {
		const countyNameWithNumber = c.properties.county;
		const countyName = countyNameWithNumber.substring(0, countyNameWithNumber.length - 2);
		return data1870[countyName].Population;
	}
</script>

<svg width="500" height="600">
	<g transform="translate(25,0) rotate(5)">
		{#each dataset as c}
			<path
				d={path(c)}
				id={c.properties.county}
				class="county"
				data-color={getColor(c)}
				data-pop={getPopulationSize(c)}
				fill={getColor(c)}
			/>
		{/each}
	</g>
</svg>

<style>
	svg {
		background-color: lightgray;
	}
	path.county {
		stroke: #333333;
		stroke-opacity: 0.5;
	}
</style>
