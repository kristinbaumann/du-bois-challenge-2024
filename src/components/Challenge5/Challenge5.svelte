<script>
	import { scaleLinear } from 'd3-scale';

	const data = [
		{
			type: 'black',
			value: 44,
			label: ['IE. full-blooded', 'negroes.']
		},
		{
			type: 'brown',
			value: 40,
			label: [
				'ie. persons with',
				'some white blood',
				'or descendants',
				'of light colored',
				' africans'
			]
		},
		{
			type: 'yellow',
			value: 16,
			label: ['ie. persons with', 'more with white than', 'negro blood']
		}
	];

	const height = 620;
	const width = 355;
	const margin = {
		top: 30,
		right: 0,
		bottom: 10,
		left: 150
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
				<text x={-margin.left} y={40} class="typeLabel">{d.type}.</text>
				<foreignObject x={-margin.left + 30} y={45} width={130} height={200}>
					<p class="descriptionLabel" xmlns="http://www.w3.org/1999/xhtml">
						{#each d.label as l}
							{l}<br />
						{/each}
					</p>
				</foreignObject>
			</g>
		{/each}
	</g>
</svg>

<style>
	svg {
		display: block;
		margin: auto;
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
	.black rect {
		fill: #000;
		stroke: #000;
	}
	.brown rect {
		fill: #3a2117;
		stroke: #3a2117;
	}
	.yellow rect {
		fill: #f9ba00;
		stroke: #f9ba00;
	}
	.typeLabel {
		text-transform: uppercase;
		font-size: 1.1rem;
	}
	.descriptionLabel {
		text-transform: uppercase;
		font-size: 0.6rem;
		font-weight: 200;
		margin-top: 0;
	}
</style>
