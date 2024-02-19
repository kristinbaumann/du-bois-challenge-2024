<script>
	import { scaleLinear } from 'd3-scale';
	import { path } from 'd3-path';

	const data = [
		{
			year: 1890,
			negroes: 6337980,
			mulattoes: 1113063
		},
		{
			year: 1860,
			negroes: 3542147,
			mulattoes: 411613
		}
	];

	const width = 520;
	const height = 590;
	const margin = {
		top: 40,
		right: 20,
		bottom: 20,
		left: 20
	};
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const wWhite = 24;
	const wLightYellow = 8;
	const wDarkYellow = 7.5;
	const wBrown = 8.5;
	const wBlack = 84;
	const wSum = wWhite + wLightYellow + wDarkYellow + wBrown + wBlack;

	const xPercFactor1890 = 6337980 / 84;

	// x scale from right to left
	const xScale = scaleLinear()
		.domain([0, xPercFactor1890 * wSum])
		.range([innerWidth, 0]);

	// y scale from top to bottom (not based on years to recreate skewed axis)
	const yScale = scaleLinear().domain([1, 4]).range([0, innerHeight]);

	/**
	 * pre-calculated points
	 */
	const y1890 = yScale(4);
	// > black
	const xBlackLeft1890 =
		innerWidth -
		xScale(xPercFactor1890 * (wSum - wWhite - wLightYellow - wDarkYellow - wBrown - wBlack));
	const xBlackLeft1860 = innerWidth - xScale(xPercFactor1890 * 30);
	const xBlackLeft1840 = innerWidth - xScale(xPercFactor1890 * 50);
	const xBlackLeft1800 = innerWidth - xScale(xPercFactor1890 * 80);
	// > brown
	const xBrownLeft1890 =
		innerWidth - xScale(xPercFactor1890 * (wSum - wWhite - wLightYellow - wDarkYellow - wBrown));
	// > dark yellow
	const xDarkYellowLeft1890 =
		innerWidth - xScale(xPercFactor1890 * (wSum - wWhite - wLightYellow - wDarkYellow));
	// > light yellow
	const xLightYellowLeft1890 =
		innerWidth - xScale(xPercFactor1890 * (wSum - wWhite - wLightYellow));
	// > white
	const xWhiteLeft1890 = innerWidth - xScale(xPercFactor1890 * (wSum - wWhite));
	// > tip of the triangles, in 1800, same as meeting point between brown and dark yellow in 1890
	const triangleTip = {
		x: xDarkYellowLeft1890,
		y: yScale(1)
	};

	/**
	 * polygon paths
	 */

	// > brown counter clock wise
	function drawPathBrown() {
		const pa = path();
		pa.moveTo(triangleTip.x, triangleTip.y);
		pa.lineTo(triangleTip.x, y1890);
		pa.lineTo(xBrownLeft1890, y1890);
		pa.closePath();
		return pa.toString();
	}
	// > dark yellow clock wise
	function drawPathDarkYellow() {
		const pa = path();
		pa.moveTo(triangleTip.x, triangleTip.y);
		pa.lineTo(triangleTip.x, y1890);
		pa.lineTo(xLightYellowLeft1890, y1890);
		pa.closePath();
		return pa.toString();
	}
	// > light yellow clock wise
	function drawPathLightYellow() {
		const pa = path();
		pa.moveTo(triangleTip.x, triangleTip.y);
		pa.lineTo(xLightYellowLeft1890, y1890);
		pa.lineTo(xWhiteLeft1890, y1890);
		pa.closePath();
		return pa.toString();
	}
	// > black counter clock wise
	function drawPathBlack() {
		const pa = path();
		pa.moveTo(triangleTip.x, triangleTip.y); // start at triangle tip
		pa.lineTo(xBlackLeft1800, yScale(1)); // to left in 1800
		pa.lineTo(xBlackLeft1840, yScale(2)); // to down left in 1840
		pa.lineTo(xBlackLeft1860, yScale(3)); // to down left in 1860
		pa.lineTo(xBlackLeft1890, y1890); // to down left in 1890
		pa.lineTo(xBrownLeft1890, y1890); // to right in 1890
		pa.closePath(); // back up to triangle tip
		return pa.toString();
	}
</script>

<h2 class="headline">
	<span class="subtitle"
		>The Amalgation of the White and Black elements in the population in the United States.</span
	>
</h2>
<svg {width} {height}>
	<g transform="translate({margin.left}, {margin.top})">
		<g class="polygons">
			<path d={drawPathBrown()} fill="#895c38" />
			<path d={drawPathDarkYellow()} fill="#f4ad00" />
			<path d={drawPathLightYellow()} fill="#e7ca87" />
			<path d={drawPathBlack()} fill="black" />
		</g>
		<g class="yearLabels" dominant-baseline="middle">
			<text x={xBlackLeft1890} y={yScale(4)} id="yearLabel1890" dy={8}>1890</text>
			<text x={xBlackLeft1860} y={yScale(3)} dx={-8}>1860</text>
			<text x={xBlackLeft1840} y={yScale(2)} dx={-8}>1840</text>
			<text x={xBlackLeft1800} y={yScale(1)} dx={-8}>1800</text>
		</g>
		<g class="yearLines">
			<line x1={xScale(0)} y1={yScale(1)} x2={xBlackLeft1800} y2={yScale(1)}></line>
			<line x1={xScale(0)} y1={yScale(2)} x2={xBlackLeft1840} y2={yScale(2)}></line>
			<line x1={xScale(0)} y1={yScale(3)} x2={xBlackLeft1860} y2={yScale(3)}></line>
			<line x1={xScale(0)} y1={yScale(4)} x2={xBlackLeft1890} y2={yScale(4)}></line>
		</g>
	</g>
</svg>

<style>
	svg {
		display: block;
		margin: 70px 0 0 auto;
		background-color: rgba(211, 211, 211, 0.5);
	}
	.yearLabels text {
		text-anchor: end;
		font-size: 0.7rem;
	}
	.yearLabels text#yearLabel1890 {
		text-anchor: start;
	}
	.yearLines line {
		stroke: white;
		stroke-width: 1;
	}
</style>
