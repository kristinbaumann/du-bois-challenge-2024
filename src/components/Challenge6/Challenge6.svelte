<script>
	import { scaleLinear } from 'd3-scale';

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

	const xPercFactor1800 = 500000 / 99; // adjust
	const xPercFactor1840 = 2000000 / 95; // adjust
	const xPercFactor1860 = 3542147 / 90;
	const xPercFactor1890 = 6337980 / 85;
	const xScale = scaleLinear()
		.domain([0, xPercFactor1890 * 132])
		.range([innerWidth, 0]);
</script>

<h2 class="headline">
	<span class="subtitle"
		>The Amalgation of the White and Black elements in the population in the United States.</span
	>
</h2>
<svg {width} {height}>
	<g transform="translate({margin.left}, {margin.top})">
		<rect
			x={innerWidth - xScale(0)}
			y={500}
			width={innerWidth - xScale(xPercFactor1890 * 132)}
			height={20}
		/>
		<rect
			x={innerWidth - xScale(xPercFactor1890 * (132 - 24))}
			y={450}
			width={innerWidth - xScale(xPercFactor1890 * 24)}
			height={20}
			fill="white"
		/>
		<rect
			x={innerWidth - xScale(xPercFactor1890 * (132 - 24 - 8))}
			y={450}
			width={innerWidth - xScale(xPercFactor1890 * 8)}
			height={20}
			fill="gold"
		/>
		<rect
			x={innerWidth - xScale(xPercFactor1890 * (132 - 24 - 8 - 7.5))}
			y={450}
			width={innerWidth - xScale(xPercFactor1890 * 7.5)}
			height={20}
			fill="yellow"
		/>
		<rect
			x={innerWidth - xScale(xPercFactor1890 * (132 - 24 - 8 - 7.5 - 7.5))}
			y={450}
			width={innerWidth - xScale(xPercFactor1890 * 7.5)}
			height={20}
			fill="brown"
		/>
		<rect
			x={innerWidth - xScale(xPercFactor1890 * (132 - 24 - 8 - 7.5 - 7.5 - 85))}
			y={450}
			width={innerWidth - xScale(xPercFactor1890 * 85)}
			height={20}
			fill="black"
		/>
	</g>
</svg>

<style>
	svg {
		display: block;
		margin: 70px 0 0 auto;
		background-color: lightgray;
	}
</style>
