<!-- Negro Population of Georgia by Counties, 1870, 1880 (plate 06) -->
<!-- Credit for Geojson file: Madison Giammaria -->
<script>
	import { onMount } from 'svelte';
	import { json } from 'd3-fetch';
	import { geoPath, geoNaturalEarth1, geoAlbers } from 'd3-geo';

	// load geojson data of counties in Georgia
	let dataset = [];
	onMount(async () => {
		let data = await json(
			'https://raw.githubusercontent.com/Giammaria/Du-Bois-DVS-challenge/main/2024/challenge-01/data/counties.geojson'
			// './counties2.geojson'
		);
		dataset = data.features;
	});
	$: console.log(dataset);

	// const projection = geoNaturalEarth1();
	const projection = geoAlbers();
	const path = geoPath(projection);

	const b = path.bounds(dataset);
	$: console.log('b', b);
</script>

<svg width="800" height="500">
	{#each dataset as data}
		<path
			d={path(data)}
			id={data.properties.county}
			class="county"
			fill="green"
			fill-opacity={0.5}
		/>
	{/each}
</svg>

<style>
	path.county {
		/* fill: none; */
		stroke: darkgreen;
	}
</style>
