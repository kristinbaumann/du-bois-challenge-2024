<!-- inspired by https://observablehq.com/@d3/world-map-svg -->

<script>
	import { geoInterruptedMollweideHemispheres } from 'd3-geo-projection';
	import { geoPath } from 'd3-geo';
	import { path } from 'd3-path';
	import { feature } from 'topojson-client';

	import worldData from '../../data/challenge04/land-110m.json';
	import polygonLayers from '../../data/challenge04/polygon_export.json';
	import lineLayers from '../../data/challenge04/lines_export.json';
	import pointLayer from '../../data/challenge04/points_export.json';
	import star from '$lib/assets/images/star.svg';
	import starCircle from '$lib/assets/images/star-circle.svg';
	import lines from '$lib/assets/images/lines.svg';

	const width = 500;
	const margin = {
		top: 10,
		right: 0,
		bottom: 10,
		left: 0
	};
	const innerWidth = width - margin.left - margin.right;
	const radius = innerWidth / 4;
	const circleTextOffset = 6;

	// map
	const projection = geoInterruptedMollweideHemispheres();
	const land = feature(worldData, worldData.objects.land);
	const outline = {
		type: 'Sphere'
	};
	function getHeight() {
		const [[x0, y0], [x1, y1]] = geoPath(projection.fitWidth(innerWidth, outline)).bounds(outline);
		const dy = Math.ceil(y1 - y0);
		const l = Math.min(Math.ceil(x1 - x0), dy);
		projection.scale((projection.scale() * (l - 1)) / l).precision(0.2);
		return dy;
	}
	const height = getHeight() + margin.top + margin.bottom;
	const getPath = geoPath(projection);

	// marker
	const georgiaLocation = projection(pointLayer.features[0].geometry.coordinates);
	const markerSize = 9;

	// text
	function getCircleTextPathLeft() {
		const p = path();
		p.arc(0, 0, radius + circleTextOffset, 1.5 * Math.PI, 0);
		return p.toString();
	}
	function getCircleTextPathRight() {
		const p = path();
		p.arc(0, 0, radius + circleTextOffset, Math.PI, 1.5 * Math.PI);
		return p.toString();
	}
</script>

<div class="wrapper">
	<h2 class="headline">
		<span>The Georgio Negro.</span><br />
		<span class="subtitle">A social study<br />By<br />W. E. Burghardt Du Bois.</span>
	</h2>
	<div>
		<svg {height} {width} style="display: block;">
			<g transform="translate({margin.left},{margin.top})">
				<defs>
					<path id="outline" d={getPath(outline)} class="outline" />
					<clipPath id="clip"><use xlink:href="#outline" /></clipPath>
				</defs>
				<g clip-path="url({'#clip'})">
					<!-- background world -->
					<use href="#outline" fill="#dcba9e" />
					<!-- world -->
					<path d={getPath(land)} class="world" />
					<!-- polygons in America and Africa -->
					{#each polygonLayers.features as layer}
						<path d={getPath(layer)} class="layers {layer.properties.type}" />
					{/each}
					<!-- lines between continents -->
					{#each lineLayers.features as layer}
						<path d={getPath(layer)} class="lines" />
					{/each}
					<!-- marker -->
					<image
						href={star}
						height={markerSize}
						width={markerSize}
						x={georgiaLocation[0] - markerSize / 2 - 1}
						y={georgiaLocation[1] - markerSize / 2 - 1}
						dx={-2}
					/>
				</g>
				<!-- outline around two circles -->
				<use href="#outline" fill="none" stroke="#000" />
			</g>
			<!-- text on circles -->
			<g>
				<g transform="translate({margin.left + radius},{margin.top + radius})">
					<defs>
						<path d={getCircleTextPathLeft()} id="text-path-left-circle" stroke="red" fill="none" />
					</defs>
					<text
						><textPath
							href="#text-path-left-circle"
							class="circle-text"
							startOffset="45%"
							text-anchor="middle">Distribution of</textPath
						></text
					>
				</g>
				<g transform="translate({margin.left + 3 * radius},{margin.top + radius})">
					<defs>
						<path
							d={getCircleTextPathRight()}
							id="text-path-right-circle"
							stroke="red"
							fill="none"
						/>
					</defs>
					<text
						><textPath
							href="#text-path-right-circle"
							class="circle-text"
							startOffset="55%"
							text-anchor="middle">the negro race</textPath
						></text
					>
				</g>
			</g>
		</svg>
		<div class="legend">
			<div>
				<img src={lines} alt="" />
				<span>Routes of the african slave trade</span>
			</div>
			<div>
				<img src={starCircle} alt="" />
				<span>The state of Georgia</span>
			</div>
		</div>
	</div>

	<p class="fine-print">
		THIS CASE IS DEVOTED TO A SERIES OF CHARTS,MAPS, AND OTHER DEVI-<br /> CES DESIGNED TO
		ILLUSTRATE THE DEVELOPMENT OF THE AMERICAN NEGRO IN A <br />SINGLE TYPICAL STATE OF THE UNITED
		STATES.<br /><br />
		"The problem of the 20th Century is the the problem of the<br /> color-line."
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
	textPath.circle-text {
		fill: #333;
		font-size: 0.5rem;
		text-transform: uppercase;
	}
	.headline {
		margin-bottom: 75px;
	}
	p,
	.legend span {
		text-transform: uppercase;
		font-size: 0.8rem;
		font-weight: 200;
	}
	.legend {
		margin: 15px auto 0;
		width: 270px;
	}
	.legend div {
		display: flex;
		margin-bottom: 10px;
	}
	.legend div span {
		display: block;
	}
	.legend img {
		height: 14px;
		margin-right: 10px;
		margin-top: 2px;
	}
	.fine-print {
		margin-bottom: 60px;
	}
</style>
