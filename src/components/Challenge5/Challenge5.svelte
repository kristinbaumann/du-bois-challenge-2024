<script>
	import { scaleLinear } from 'd3-scale';

	const data = [
		{
			type: 'black',
			value: 44,
			label: 'I.E. full-blooded negroes.'
		},
		{
			type: 'brown',
			value: 40,
			label: 'i.e. persons with some white blood or descendants of light colored africans'
		},
		{
			type: 'yellow',
			value: 16,
			label: 'i.e. persons with more with white than negro blood'
		}
	];

	const height = 620;
	const width = 390;
	const margin = {
		top: 30,
		right: 0,
		bottom: 10,
		left: 190
	};
	const innerHeight = height - margin.top - margin.bottom;
	const barWidth = 200;

	const yScale = scaleLinear().domain([0, 100]).range([0, innerHeight]);
</script>

<h2 class="headline">
	<span>Race Amalgation in Georgia.</span><br />
	<span class="subtitle">Based on a study of 40.000 individuals of negro descent</span>
</h2>

<svg {height} {width}>
	<g transform="translate({margin.left},{margin.top})">
		{#each data as d, i}
			<g
				class={d.type}
				transform="translate(0,{yScale(
					data.reduce((acc, d, j) => (j < i ? acc + d.value : acc), 0)
				)})"
			>
				<rect x={0} y={0} width={barWidth} height={yScale(d.value)} />
				<text x={barWidth / 2} y={yScale(d.value) / 2} class="valueLabel">{d.value}%</text>
				<text x={-margin.left} y={60} class="typeLabel">{d.type}.</text>
				<text x={-margin.left} y={80} class="descriptionLabel">{d.label}</text>
			</g>
		{/each}
	</g>
</svg>

<style>
	svg {
		display: block;
		margin: auto;
		background-color: lightgray;
	}
	.valueLabel {
		text-anchor: middle;
	}
	.black text.valueLabel {
		fill: white;
	}
	.brown text.valueLabel {
		fill: darkred;
	}
	.brown rect {
		fill: #3a2117;
	}
	.yellow rect {
		fill: #f9ba00;
	}
	.typeLabel {
		text-transform: uppercase;
		font-size: 1.1rem;
	}
	.descriptionLabel {
		text-transform: uppercase;
		font-size: 0.6rem;
	}
</style>
