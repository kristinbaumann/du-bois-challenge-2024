<!-- inspired by https://observablehq.com/@d3/world-map-svg -->

<script>
	import { geoInterruptedMollweideHemispheres } from 'd3-geo-projection';
	import { geoPath } from 'd3-geo';
	import { feature } from 'topojson-client';

	import worldData from '../../data/challenge04/land-110m.json';
	import polygonLayers from '../../data/challenge04/polygon_export.json';
	import lineLayers from '../../data/challenge04/lines_export.json';
	import pointLayer from '../../data/challenge04/points_export.json';
	import star from '$lib/assets/star.svg';

	const projection = geoInterruptedMollweideHemispheres();

	const width = 500;

	const land = feature(worldData, worldData.objects.land);

	const outline = {
		type: 'Sphere'
	};
	function getHeight() {
		const [[x0, y0], [x1, y1]] = geoPath(projection.fitWidth(width, outline)).bounds(outline);
		const dy = Math.ceil(y1 - y0);
		const l = Math.min(Math.ceil(x1 - x0), dy);
		projection.scale((projection.scale() * (l - 1)) / l).precision(0.2);
		return dy;
	}
	const height = getHeight();
	const path = geoPath(projection);

	const georgiaLocation = projection(pointLayer.features[0].geometry.coordinates);
	const markerSize = 9;
</script>

<div class="wrapper">
	<h2 class="headline">
		The Georgio Negro.<br />A social study<br />By<br />W. E. Burghardt Du Bois.
	</h2>
	<svg {height} {width} style="display: block;">
		<defs>
			<path id="outline" d={path(outline)} class="outline" />
			<clipPath id="clip"><use xlink:href={'http://localhost:5173/#outline'} /></clipPath>
		</defs>
		<g clip-path="url({'http://localhost:5173/#clip'})">
			<use xlink:href="http://localhost:5173/#outline" fill="#dcba9e" />
			<path d={path(land)} class="world" />
			{#each polygonLayers.features as layer}
				<path d={path(layer)} class="layers {layer.properties.type}" />
			{/each}
			{#each lineLayers.features as layer}
				<path d={path(layer)} class="lines" />
			{/each}
			<image
				href={star}
				height={markerSize}
				width={markerSize}
				x={georgiaLocation[0] - markerSize / 2 - 1}
				y={georgiaLocation[1] - markerSize / 2 - 1}
				dx={-2}
			/>
		</g>

		<use xlink:href={'http://localhost:5173/#outline'} fill="none" stroke="#000" />
	</svg>

	<p>
		THIS CASE IS DEVOTED TO THE SERIES OF CHARTS,MAPS, AND OTHER DEVI-<br /> CES DESIGNED TO
		ILLUSTRATE THE DEVELOPMENT OF THE AMERICAN NEGRO IN A <br />SINGLE TYPICAL STATE OF THE UNITED
		STATES
	</p>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}
	svg {
		display: block;
		margin: auto;
	}
	p {
		text-align: center;
		font-size: 0.7rem;
	}
	path.world {
		fill: #e3ae5f;
		stroke: #333;
		stroke-opacity: 0.3;
	}
	path.outline {
		stroke: #333;
		stroke-opacity: 0.3;
		stroke-width: 1px;
	}
	path.layers.dark {
		fill: #151211;
	}
	path.layers.light {
		fill: #956c56;
	}
	path.lines {
		fill: none;
		stroke: #333;
	}
</style>