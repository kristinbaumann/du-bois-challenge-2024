<script>
	import { scaleLinear } from 'd3-scale';

	const data1860 = {
		slaves: 89,
		free: 11
	};
	const data1890 = {
		owners: 19,
		tenants: 81
	};

	const height = 630;
	const width = 570;
	const margin = {
		top: 35,
		right: 20,
		bottom: 10,
		left: 80,
		bar1860: {
			top: 320, // how much space is above the left bar
			bottom: 0
		},
		bar1890: {
			top: 0,
			bottom: 140 // how much space is below the right bar
		}
	};
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	// x scale is divided in 3 equal sized pieces
	const barWidth = innerWidth / 3;
	const xScale = scaleLinear().domain([0, 3]).range([0, innerWidth]);
	// y scale is different for left and right bar
	const yScale1860 = scaleLinear()
		.domain([0, 100])
		.range([0, innerHeight - margin.bar1860.top - margin.bar1860.bottom]);
	const yScale1890 = scaleLinear()
		.domain([0, 100])
		.range([0, innerHeight - margin.bar1890.top - margin.bar1890.bottom]);
</script>

<h2 class="headline">
	<p>The Rise of the Negroes from Slavery to Freedom in one generation.</p>
	<p>Progrès Graduel des Nègres de l'escavage à la liberté en une Génération.</p>
	<p>Done by Atlanta University.</p>
</h2>
<div class="explaner explaner-top">
	<p>
		In 1890 nearly one fifth of them owned their own homes and farms.<br />
		This advance was accomplished entirely without state aid, and in the <br />
		face of proscriptive laws.
	</p>
	<p>
		En 1890 environ un cinquième étaient propriétaires de leurs hab-<br />
		itations et de leurs fermes. Ce progrès s'été accompli sans <br />
		secours aucun de l'etat et en présence de lois défavorables.
	</p>
</div>
<div class="explaner explaner-bottom">
	<p>In 1860 nearly 90% of the blacks were slaves.</p>
	<p>En 1860 environ 90% des nègres étaient esclaves.</p>
</div>

<!-- <svg {width} {height}>
	<g transform="translate({margin.left},{margin.top})">
		<g class="bar1860" transform="translate(0,{margin.bar1860.top})">
			<rect
				x={xScale(0)}
				y={0}
				width={barWidth}
				height={yScale1860(data1860.free)}
				fill="#1E7C4D"
			/>
			<rect
				x={xScale(0)}
				y={yScale1860(data1860.free)}
				width={barWidth}
				height={yScale1860(data1860.slaves)}
				fill="black"
			/>
			<text x={xScale(0.5)} y={0} dy={-4} class="yearLabel">1860</text>
			<g
				transform="translate({xScale(0)},{yScale1860(0) + yScale1860(data1860.free) / 2})"
				class="rowLabel"
			>
				<text dx={1} dy={2} dominant-baseline="middle">{data1860.free}%</text>
				<text x={xScale(0.9)} dy={-3} text-anchor="end">free laborers</text>
				<text x={xScale(0.9)} dy={10} text-anchor="end">ouvriers libres</text>
			</g>
			<g
				transform="translate({xScale(0.5)},{yScale1860(data1860.free) +
					yScale1860(data1860.slaves) / 2})"
				class="centerLabel red"
			>
				<text dy={-15}>89%</text>
				<text dy={0}>Slaves</text>
				<text dy={15}>Esclaves</text>
			</g>
		</g>
		<g class="bar1890" transform="translate(0,{margin.bar1890.top})">
			<rect
				x={xScale(2)}
				y={0}
				width={barWidth}
				height={yScale1890(data1890.owners)}
				fill="#d22a49"
			/>
			<rect
				x={xScale(2)}
				y={yScale1890(data1890.owners)}
				width={barWidth}
				height={yScale1890(data1890.tenants)}
				fill="#1E7C4D"
			/>
			<text x={xScale(2.5)} y={0} class="yearLabel" dy={-4}>1890</text>
			<g
				transform="translate({xScale(2.5)},{yScale1890(0) + yScale1890(data1890.owners) / 2 + 5})"
				class="centerLabel"
			>
				<text dy={-15}>19%</text>
				<text dy={0}>peasant proprietors</text>
				<text dy={15}>paysans proprietaires</text>
			</g>
			<g
				transform="translate({xScale(2.5)},{yScale1890(data1890.owners) +
					yScale1890(data1890.tenants) / 2})"
				class="centerLabel"
			>
				<text dy={-15}>81%</text>
				<text dy={0}>tenants</text>
				<text dy={15}>métayers</text>
			</g>
		</g>
		<g class="lines">
			dashed lines, order here is top to bottom
			<line
				x1={xScale(1)}
				y1={margin.bar1860.top + yScale1860(0)}
				x2={xScale(2)}
				y2={yScale1890(data1890.owners)}
			/>
			<line
				x1={xScale(1)}
				y1={margin.bar1860.top + yScale1860(0)}
				x2={xScale(2)}
				y2={yScale1890(40)}
			/>
			<line
				x1={xScale(1)}
				y1={margin.bar1860.top + yScale1860(5.5)}
				x2={xScale(2)}
				y2={yScale1890(60)}
			/>
			<line
				x1={xScale(1)}
				y1={margin.bar1860.top + yScale1860(5.5)}
				x2={xScale(2)}
				y2={yScale1890(85)}
			/>
			<line
				x1={xScale(1)}
				y1={margin.bar1860.top + yScale1860(data1860.free)}
				x2={xScale(2)}
				y2={yScale1890(100)}
			/>
		</g>
	</g>
</svg> -->

<style>
	.headline p {
		font-weight: 700;
		margin-top: 0;
		color: #333;
		font-size: 0.85rem;
	}

	.headline p:nth-of-type(2) {
		margin-top: 25px;
	}
	.headline p:nth-of-type(3) {
		margin-top: 40px;
		font-size: 0.7rem;
	}
	svg {
		margin-top: 20px;
	}
	.yearLabel {
		font-weight: 700;
		font-size: 1.1rem;
		text-anchor: middle;
	}
	.centerLabel text {
		font-size: 0.7rem;
		font-weight: 700;
		text-anchor: middle;
		text-transform: uppercase;
	}
	.centerLabel.red text {
		fill: #d22a49;
	}
	.centerLabel text:nth-of-type(1) {
		font-size: 1.1rem;
	}
	.rowLabel text {
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
	}
	.rowLabel text:nth-of-type(1) {
		font-size: 1.1rem;
	}
	.lines line {
		stroke: #b5b5b5;
		stroke-dasharray: 4;
	}
	.explaner {
		position: absolute;
		text-transform: uppercase;
		font-size: 0.6rem;
		line-height: 1.4;
	}
	.explaner-top {
		top: 185px;
		left: 10px;
	}
	.explaner-bottom {
		top: 340px;
		left: 40px;
	}
</style>
