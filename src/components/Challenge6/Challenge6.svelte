<script>
	import { scaleLinear } from 'd3-scale';
	import { path } from 'd3-path';
	import { randomUniform } from 'd3-random';

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

	const width = 560;
	const height = 620;
	const margin = {
		top: 40,
		right: 1,
		bottom: 25,
		left: 0
	};
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	// width black over the years (estimated)
	const wBlack = {
		1800: 50,
		1840: 81,
		1860: 100,
		1890: 83
	};

	// width for 1890 (hand measured using plotdigitizer.com)
	const wWhite = 24;
	const wLightYellow = 8;
	const wDarkYellow = 7.5;
	const wBrown = 10;
	const wSum = wWhite + wLightYellow + wDarkYellow + wBrown + wBlack[1890];
	// factor for 1890
	const xPercFact = data[0].negroes / wBlack[1890];

	// x scale from right to left
	const xScale = scaleLinear()
		.domain([0, xPercFact * wSum])
		.range([innerWidth, 0]);

	// y scale from top to bottom (not based on years to recreate skewed axis)
	const yScale = scaleLinear().domain([1, 4]).range([0, innerHeight]);
	const minY = 0.92;

	/**
	 * pre-calculated points
	 */
	// > black
	const xBlackLeft1890 =
		innerWidth -
		xScale(xPercFact * (wSum - wWhite - wLightYellow - wDarkYellow - wBrown - wBlack[1890]));
	const xBlackLeft1860 = innerWidth - xScale(xPercFact * (wSum - wBlack[1860]));
	const xBlackLeft1840 = innerWidth - xScale(xPercFact * (wSum - wBlack[1840]));
	const xBlackLeft1800 = innerWidth - xScale(xPercFact * (wSum - wBlack[1800]));
	// > brown
	const xBrownLeft1890 =
		innerWidth - xScale(xPercFact * (wSum - wWhite - wLightYellow - wDarkYellow - wBrown));
	// > dark yellow
	const xDarkYellowLeft1890 =
		innerWidth - xScale(xPercFact * (wSum - wWhite - wLightYellow - wDarkYellow));
	// > light yellow
	const xLightYellowLeft1890 = innerWidth - xScale(xPercFact * (wSum - wWhite - wLightYellow));
	// > white
	const xWhiteLeft1890 = innerWidth - xScale(xPercFact * (wSum - wWhite));

	// > tip of the triangles, in 1800, same as meeting point between brown and dark yellow in 1890
	const triangleTip = {
		x: xDarkYellowLeft1890,
		y: minY
	};

	/**
	 * polygon paths
	 */

	// > brown counter clock wise
	function drawPathBrown() {
		const pa = path();
		pa.moveTo(triangleTip.x, triangleTip.y);
		pa.lineTo(triangleTip.x, yScale(4));
		pa.lineTo(xBrownLeft1890, yScale(4));
		pa.closePath();
		return pa.toString();
	}
	// > dark yellow clock wise
	function drawPathDarkYellow() {
		const pa = path();
		pa.moveTo(triangleTip.x, triangleTip.y);
		pa.lineTo(triangleTip.x, yScale(4));
		pa.lineTo(xLightYellowLeft1890, yScale(4));
		pa.closePath();
		return pa.toString();
	}
	// > light yellow clock wise
	function drawPathLightYellow() {
		const pa = path();
		pa.moveTo(triangleTip.x, triangleTip.y);
		pa.lineTo(xLightYellowLeft1890, yScale(4));
		pa.lineTo(xWhiteLeft1890, yScale(4));
		pa.closePath();
		return pa.toString();
	}
	// > black counter clock wise
	function drawPathBlack() {
		const pa = path();
		pa.moveTo(triangleTip.x, yScale(minY + 0.03)); // start at triangle tip
		pa.lineTo(xBlackLeft1800, yScale(1)); // to left in 1800
		pa.lineTo(xBlackLeft1840, yScale(2)); // to down left in 1840
		pa.lineTo(xBlackLeft1860, yScale(3)); // to down left in 1860
		pa.lineTo(xBlackLeft1890, yScale(4)); // to down left in 1890
		pa.lineTo(xBrownLeft1890, yScale(4)); // to right in 1890
		pa.closePath(); // back up to triangle tip
		return pa.toString();
	}
	// > fuzzy line and area
	function drawFuzzyElements() {
		let randomSet = [];
		const minX = xBlackLeft1800;
		const maxX = xScale(400000); // arbitrary value for fuzzy line ending
		const maxY = 1; // further above we have minY = 0.92
		const step = 1;
		let y;
		let counter = 1;
		let breakpoint = 45; // breakpoint is the x value where the fuzzy line hits the triangle start
		for (let x = minX; x + step <= maxX; x += step) {
			const randomNumber = randomUniform(-2, 2)();
			// beginning of fuzzy line til triangle tip
			if (x < minX + breakpoint) {
				// y increases from minY (0.92) to maxY (1) in 45 steps, adjusted by random number
				y = yScale(maxY - ((maxY - minY) / breakpoint) * counter) - randomNumber;
				counter++;
			} else {
				// from triangle tip to arbitrary end
				y = yScale(minY) - randomNumber;
			}
			randomSet.push({ x, y });
		}

		// slow start to avoid the fuzzy line to start at the very left
		const slowStart = 5;

		// fuzzy line
		const pa = path();
		pa.moveTo(xBlackLeft1800, yScale(maxY));
		for (let k = slowStart; k < randomSet.length; k++) {
			pa.lineTo(randomSet[k].x, randomSet[k].y);
		}
		pa.lineTo(xScale(0), yScale(maxY + 0.05));

		// fuzzy area
		const area = path();
		area.moveTo(xBlackLeft1800, yScale(maxY));
		for (let j = slowStart; j < breakpoint; j++) {
			area.lineTo(randomSet[j].x, randomSet[j].y);
		}
		area.lineTo(triangleTip.x, yScale(2));

		return {
			fuzzyLine: pa.toString(),
			fuzzyArea: area.toString()
		};
	}

	const { fuzzyLine, fuzzyArea } = drawFuzzyElements();
</script>

<h2 class="headline">
	<p>
		The Amalgation of the White and Black elements of the population <br />in the United States.
	</p>
	<p>Amalgamation des elements blancs et noirs parmi lar population Americaine.</p>
	<p>Done by Atlanta University.</p>
</h2>

<!-- <svg {width} {height}>
	<g transform="translate({margin.left}, {margin.top})">
		<g class="polygons">
			<path d={drawPathBlack()} fill="black" stroke="black" />
			<path d={fuzzyLine} fill="none" stroke="black" stroke-width="0.5" />
			<path d={fuzzyArea} fill="black" stroke="black" stroke-width="0.5" />
			<path d={drawPathBrown()} fill="#895c38" stroke="#895c38" />
			<path d={drawPathDarkYellow()} fill="#f4ad00" />
			<path d={drawPathLightYellow()} fill="#e7ca87" />
		</g>
		from triangle tip down 2x
		<g class="polygonLines">
			<line
				x1={triangleTip.x}
				y1={triangleTip.y}
				x2={xLightYellowLeft1890}
				y2={yScale(4)}
				stroke="#333"
				stroke-width="0.75px"
			/>
			<line
				x1={triangleTip.x}
				y1={triangleTip.y}
				x2={xBrownLeft1890 + 15}
				y2={yScale(4)}
				stroke="#333"
				stroke-width="0.75px"
			/>
		</g>
		<g class="yearLines">
			<g y1={yScale(1)} y2={yScale(1)}>
				<line x1={xScale(160000)} x2={triangleTip.x} class="dark" />
				<line x1={triangleTip.x} x2={xBlackLeft1800} class="light" />
			</g>
			<line x1={xScale(0)} y1={yScale(2)} x2={xBlackLeft1840} y2={yScale(2)} class="light" />
			<line x1={xScale(0)} y1={yScale(3)} x2={xBlackLeft1860} y2={yScale(3)} class="light" />
			<line x1={xScale(0)} y1={yScale(4)} x2={xBlackLeft1890} y2={yScale(4)} class="dark" />
		</g>
		<g class="yearLabels" dominant-baseline="middle">
			<text x={xBlackLeft1890} y={yScale(4)} id="yearLabel1890" dy={8}>1890</text>
			<text x={xBlackLeft1860} y={yScale(3)} dx={-8}>1860</text>
			<text x={xBlackLeft1840} y={yScale(2)} dx={-8}>1840</text>
			<text x={xBlackLeft1800} y={yScale(1)} dx={-8}>1800</text>
		</g>
		<g class="otherLabels">
			<text
				x={xBlackLeft1890 + (xBrownLeft1890 - xBlackLeft1890) / 2}
				y={yScale(4)}
				dy={-4}
				class="size-l">6.337.980</text
			>
			<text
				x={xBlackLeft1890 + (xBrownLeft1890 - xBlackLeft1890) / 2}
				y={yScale(4)}
				dy={12}
				class="size-m black">85%</text
			>
			<text x={triangleTip.x} y={yScale(4)} dy={-4} class="size-m black">1.113.063</text>
			<text x={triangleTip.x} y={yScale(4)} dy={12} class="size-m black">15%</text>
			<text
				x={xBlackLeft1860 + (xBrownLeft1890 - xBlackLeft1860) / 2}
				y={yScale(3)}
				dy={-4}
				class="size-m">3.542.147</text
			>
			<text
				x={xBlackLeft1860 + (xBrownLeft1890 - xBlackLeft1860) / 2}
				y={yScale(3)}
				dy={15}
				class="size-m">90%</text
			>
			<text x={triangleTip.x} y={yScale(3)} dy={-4} class="size-s black">411.613</text>
			<text x={triangleTip.x} y={yScale(3)} dy={10} class="size-s black">10%</text>
			<text
				x={xBlackLeft1860 + (xBrownLeft1890 - xBlackLeft1860) / 2}
				y={yScale(3.5)}
				class="size-m">Negroes</text
			>
			<text x={triangleTip.x} y={yScale(3.5)} class="size-s black">Mulattoes</text>
			<text x={triangleTip.x} y={yScale(3.5)} dy={10} class="size-s black">Mulâtres</text>
			<text x={triangleTip.x + (triangleTip.x - xScale(0) / 2)} y={yScale(3.5)} class="size-m black"
				>Whites</text
			>
		</g>
	</g>
</svg> -->

<style>
	svg {
		display: block;
		margin: 0px 0 0 auto;
	}
	.headline p {
		font-weight: 400;
		text-transform: none;
		margin-top: 0;
		font-family: 'Times New Roman', Times, serif;
		color: #333;
	}
	.headline p:nth-of-type(2) {
		font-size: 0.8rem;
	}
	.headline p:nth-of-type(3) {
		font-size: 0.6rem;
	}
	.yearLabels text {
		text-anchor: end;
		font-size: 0.7rem;
	}
	.yearLabels text#yearLabel1890 {
		text-anchor: start;
	}
	.yearLines line {
		stroke-width: 0.5px;
	}
	.yearLines line.light {
		stroke: white;
	}
	.yearLines line.dark {
		stroke-width: 0.25px;
		stroke: #000;
	}
	.otherLabels text {
		text-anchor: middle;
		fill: white;
		text-transform: uppercase;
	}
	.otherLabels text.size-l {
		font-size: 0.9rem;
	}
	.otherLabels text.size-m {
		font-size: 0.7rem;
	}
	.otherLabels text.size-s {
		font-size: 0.5rem;
	}
	.otherLabels text.black {
		fill: black;
	}
</style>
