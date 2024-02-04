<!-- Negro Population of Georgia by Counties, 1870, 1880 (plate 06) -->
<!-- Credit for underlying Geojson file: Madison Giammaria -->
<script>
	import { geoPath, geoAlbers } from 'd3-geo';
	import dataCounties from '../data/challenge01/counties_cleaned';
	import data1870 from '../data/challenge01/data-1870_converted_corrected';
	import data1880 from '../data/challenge01/data-1880_converted_corrected';
	import colors from '../data/challenge01/colors';
	import original from '$lib/assets/originals/original-plate-06.jpg';

	const projection = geoAlbers();
	projection.fitSize([450, 600], dataCounties);
	const drawCountyPath = geoPath(projection);

	$: hoveredCountyIndex = null;
	$: selectedYear = '1880';

	$: getCountyColor = function getColor(c) {
		const countyNameWithNumber = c.properties.county;
		const countyName = countyNameWithNumber.substring(0, countyNameWithNumber.length - 2);
		const dataset = selectedYear === '1870' ? data1870 : data1880;
		const populationSize = dataset[countyName].Population;
		return colors[populationSize].hex;
	};
</script>

<h2>Negro Population of Georgia By County</h2>
<div class="filter">
	<button class={selectedYear === '1870' ? 'active' : ''} on:click={() => (selectedYear = '1870')}>
		1870
	</button>
	<button class={selectedYear === '1880' ? 'active' : ''} on:click={() => (selectedYear = '1880')}>
		1880
	</button>
</div>
<svg width="500" height="600">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<g transform="translate(25,0) rotate(5)" on:mouseleave={() => (hoveredCountyIndex = null)}>
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
<img src={original} alt="Original by Wes Du Bois" />
<div class="legend">
	{#each Object.values(colors) as color}
		<p><span style="background-color: {color.hex} "></span>{color.populationDescription}</p>
	{/each}
</div>

<style>
	svg {
		background-color: lightgray;
	}
	path {
		cursor: pointer;
		stroke: #333333;
		stroke-opacity: 0.5;
		transition: all 0.4s ease;
	}
	.filter button.active {
		font-weight: bold;
	}
	img {
		height: 600px;
		position: absolute;
	}
	.legend span {
		display: inline-block;
		width: 15px;
		height: 15px;
		border-radius: 50%;
		margin-right: 5px;
	}
</style>
