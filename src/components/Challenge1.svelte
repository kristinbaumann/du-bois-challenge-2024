<!-- Negro Population of Georgia by Counties, 1870, 1880 (plate 06) -->
<!-- Credit for Geojson file: Madison Giammaria -->
<script>
	import { geoPath, geoAlbers } from 'd3-geo';
	import data from '../data/counties_cleaned';

	const dataset = data.features;

	const projection = geoAlbers();
	projection.fitSize([450, 600], data);
	const path = geoPath(projection);
</script>

<svg width="500" height="600">
	<g transform="translate(25,0)">
		{#each dataset as c}
			<path d={path(c)} id={c.properties.county} class="county" fill="green" fill-opacity={0.5} />
		{/each}
	</g>
</svg>

<style>
	svg {
		background-color: lightgray;
	}
	path.county {
		stroke: darkgreen;
	}
</style>
