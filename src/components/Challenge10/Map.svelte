<script>
	import { geoPath, geoAlbersUsa } from 'd3-geo';
	import mapGeo from '../../data/challenge10/states-20m-geo.json';

	const height = 250;
	const width = 300;

	const margin = { top: 20, right: 20, bottom: 20, left: 20 };

	let projection = geoAlbersUsa();
	projection.fitSize([width, height], mapGeo);
	let drawPath = geoPath(projection);

	$: console.log(mapGeo);
</script>

<div class="chart-container-map">
	<svg {width} {height}>
		{#each mapGeo.features as c, i}
			{#if c.properties.NAME !== 'Alaska' && c.properties.NAME !== 'Hawaii'}
				<path d={drawPath(c)} data-label={c.properties.NAME} class="state" fill="black" />
			{/if}
		{/each}
	</svg>
</div>

<style>
</style>
