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

	// *** change width based on window size
	// greater than 1200px -> 500px
	// between 1024 and 1200px -> 400px
	// between 768 and 1024px (not wrapped) -> 320px
	// between 700 and 768px (wrapped) --> 650px
	// between 425px and 700px (wrapped) --> 380px
	// 375px to 425px (wrapped) --> 310px
	// 320 to 375px (wrapped) --> 260px
	const windowWidth = window.innerWidth;
	let width;
	let startOffsetRadialTextLeft = '45%';
	let startOffsetRadialTextRight = '55%';
	switch (true) {
		case windowWidth >= 1200:
			width = 500;
			break;
		case windowWidth >= 1024:
			width = 400;
			break;
		case windowWidth > 768:
			startOffsetRadialTextLeft = '35%';
			startOffsetRadialTextRight = '65%';
			width = 320;
			break;
		case windowWidth >= 700:
			width = 650;
			break;
		case windowWidth >= 425:
			width = 380;
			break;
		case windowWidth >= 375:
			startOffsetRadialTextLeft = '35%';
			startOffsetRadialTextRight = '65%';
			width = 310;
			break;
		default:
			startOffsetRadialTextLeft = '30%';
			startOffsetRadialTextRight = '70%';
			width = 260;
	}

	const margin = {
		top: 15,
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
		<span>The Georgio Negro.</span>
		<span class="subtitle">
			<span>A social study</span>
			<span>By</span>
			<span>W. E. Burghardt Du Bois.</span>
		</span>
	</h2>
	<div class="chart-container">
		<svg {width} {height} style="display: block;">
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
							startOffset={startOffsetRadialTextLeft}
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
							startOffset={startOffsetRadialTextRight}
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
		<span>THIS CASE IS DEVOTED TO A SERIES OF CHARTS, MAPS, AND OTHER DEVI</span>
		<span>CES DESIGNED TO ILLUSTRATE THE DEVELOPMENT OF THE AMERICAN NEGRO IN A</span>
		<span>SINGLE TYPICAL STATE OF THE UNITED STATES.</span>
		<span class="break"></span>
		<span>"The problem of the 20th Century is the the problem of the </span><span>color-line."</span
		>
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
		/* width: 100%; */
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
		margin-bottom: 90px;
	}
	p,
	.legend span {
		text-transform: uppercase;
		font-size: 0.8rem;
		font-weight: 200;
	}
	.legend {
		display: flex;
		flex-direction: column;
		margin: 15px auto 0;
		max-width: 252px;
	}
	.legend div {
		display: flex;
		margin-bottom: 10px;
		flex-grow: 0;
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
		margin: 35px 0 50px;
		padding: 0 3px;
	}
	.fine-print span {
		display: block;
	}
	.fine-print span.break {
		display: block;
		margin: 10px 0;
	}
	@media (max-width: 768px) {
		.fine-print span {
			display: inline;
		}
	}
</style>
