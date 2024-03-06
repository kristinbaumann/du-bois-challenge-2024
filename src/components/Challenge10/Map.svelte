<script>
	import { geoPath, geoAlbersUsa } from 'd3-geo';
	import mapGeo from '../../data/challenge10/states-20m-geo.json';
	import mapData from '../../data/challenge10/map_data.json';

	const height = 100;
	const width = 150;

	// create a unit projection
	let projection = geoAlbersUsa().scale(1).translate([0, 0]);

	// create a path generator
	let path = geoPath(projection);

	// Compute the bounds of the map, then derive scale & translate.
	const b = path.bounds(mapGeo),
		s = 0.95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
		t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

	// Update the projection to use computed scale & translate.
	projection.scale(s).translate(t);

	function getColor(stateName) {
		const el = mapData.filter((el) => el.NAME === stateName);
		if (el.length === 0) {
			return 'black';
		}
		const colorPattern = {
			A: 'white',
			B: '#896557', // brown
			BL: '#000', // black
			LB: '#7a89b6', // light blue
			DB: '#20266b', // dark blue
			DG: 'darkgrey', // dark grey
			LG: 'lightgrey', // light grey
			R: '#e2415d', // red
			P: '#f2c0b0', // pink
			Y: '#fec45f' // yellow
		};
		return colorPattern[el[0].type];
	}
</script>

<div class="chart-container-map">
	<svg {width} {height}>
		{#each mapGeo.features as c, i}
			{#if c.properties.NAME !== 'Alaska' && c.properties.NAME !== 'Hawaii' && c.properties.NAME !== 'Puerto Rico'}
				<path
					d={path(c)}
					data-label={c.properties.NAME}
					class={`state ${c.properties.NAME}`}
					fill={getColor(c.properties.NAME)}
				/>
			{/if}
		{/each}
	</svg>
</div>

<style>
	svg {
		display: block;
		margin: 0 auto;
	}
	path.state {
		stroke: #333;
		stroke-width: 1;
	}
</style>
