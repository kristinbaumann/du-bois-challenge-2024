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
		top: 20,
		right: 20,
		bottom: 0,
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

	const xPercFactor1800 = 500000 / 99; // adjust
	const xPercFactor1840 = 2000000 / 95; // adjust
	const xPercFactor1860 = 3542147 / 90;
	const xPercFactor1890 = 6337980 / 85;
	const xScale = scaleLinear()
		.domain([0, xPercFactor1890 * wSum])
		.range([innerWidth, 0]);

	// tip of the triangles, in 1800, same as meeting point between brown and dark yellow in 1890
	const triangleTipX =
		innerWidth - xScale(xPercFactor1890 * (wSum - wWhite - wLightYellow - wDarkYellow));

	function drawPathBrown() {
		const pa = path();
		const topPoint = {
			x: triangleTipX,
			y: 50
		};
		pa.moveTo(topPoint.x, topPoint.y);
		pa.lineTo(topPoint.x, 540);
		pa.lineTo(
			innerWidth - xScale(xPercFactor1890 * (wSum - wWhite - wLightYellow - wDarkYellow - wBrown)),
			540
		);
		pa.closePath();
		return pa.toString();
	}
	function drawPathDarkYellow() {
		const pa = path();
		const topPoint = {
			x: triangleTipX,
			y: 50
		};
		pa.moveTo(topPoint.x, topPoint.y);
		pa.lineTo(topPoint.x, 540);
		pa.lineTo(innerWidth - xScale(xPercFactor1890 * (wSum - wWhite - wLightYellow)), 540);
		pa.closePath();
		return pa.toString();
	}
	function drawPathLightYellow() {
		const pa = path();
		const topPoint = {
			x: triangleTipX,
			y: 50
		};
		pa.moveTo(topPoint.x, topPoint.y);
		pa.lineTo(innerWidth - xScale(xPercFactor1890 * (wSum - wWhite - wLightYellow)), 540);
		pa.lineTo(innerWidth - xScale(xPercFactor1890 * (wSum - wWhite)), 540);
		pa.closePath();
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
		<!-- white -->
		<rect
			x={innerWidth - xScale(xPercFactor1890 * (wSum - wWhite))}
			y={540}
			width={innerWidth - xScale(xPercFactor1890 * wWhite)}
			height={10}
			fill="#d1c6ba"
		/>
		<!-- light yellow -->
		<rect
			x={innerWidth - xScale(xPercFactor1890 * (wSum - wWhite - wLightYellow))}
			y={540}
			width={innerWidth - xScale(xPercFactor1890 * wLightYellow)}
			height={10}
			fill="#e7ca87"
		/>
		<!-- // dark yellow -->
		<rect
			x={innerWidth - xScale(xPercFactor1890 * (wSum - wWhite - wLightYellow - wDarkYellow))}
			y={540}
			width={innerWidth - xScale(xPercFactor1890 * wDarkYellow)}
			height={10}
			fill="#f4ad00"
		/>
		<!-- brown -->
		<rect
			x={innerWidth -
				xScale(xPercFactor1890 * (wSum - wWhite - wLightYellow - wDarkYellow - wBrown))}
			y={540}
			width={innerWidth - xScale(xPercFactor1890 * wBrown)}
			height={10}
			fill="#895c38"
		/>
		<rect
			x={innerWidth -
				xScale(xPercFactor1890 * (wSum - wWhite - wLightYellow - wDarkYellow - wBrown - wBlack))}
			y={540}
			width={innerWidth - xScale(xPercFactor1890 * wBlack)}
			height={10}
			fill="black"
		/>
		<rect
			x={innerWidth - xScale(xPercFactor1890 * (wSum - wWhite - wLightYellow - wDarkYellow))}
			y={50}
			width={innerWidth - xScale(xPercFactor1890 * (wWhite + wLightYellow + wDarkYellow))}
			height={10}
			fill="#d1c6ba"
		/>
		<rect
			x={innerWidth - xScale(xPercFactor1890 * (wSum - wWhite - wLightYellow - wDarkYellow - 20))}
			y={50}
			width={innerWidth - xScale(xPercFactor1890 * 20)}
			height={10}
			fill="black"
		/>
		<path d={drawPathBrown()} fill="#895c38" />
		<path d={drawPathDarkYellow()} fill="#f4ad00" />
		<path d={drawPathLightYellow()} fill="#e7ca87" />
	</g>
</svg>

<style>
	svg {
		display: block;
		margin: 70px 0 0 auto;
		background-color: rgba(211, 211, 211, 0.5);
	}
</style>
