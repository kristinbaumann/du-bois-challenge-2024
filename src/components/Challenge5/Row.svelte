<script>
	import { patterns } from '$lib/assets/images/patterns.js';

	export let yScale;
	export let data;
	export let d;
	export let i;
	export let xScale;
</script>

<g
	class={d.type}
	transform="translate(0,{yScale(data.reduce((acc, d, j) => (j < i ? acc + d.value : acc), 0))})"
>
	<defs>
		<pattern
			id="pattern-{d.type}"
			patternUnits="userSpaceOnUse"
			width={xScale(50)}
			height={yScale(d.value)}
		>
			<image href={patterns[d.type]} x="0" y="0" width="408" height="612" />
		</pattern>
	</defs>
	<rect
		x={xScale(50)}
		y={0}
		width={xScale(50)}
		height={yScale(d.value)}
		fill="url(#pattern-{d.type})"
	/>
	<g>
		<text x={xScale(75)} y={yScale(d.value) / 2} class="valueLabel">{d.value}%</text>
		<text x={0} y={30} class="typeLabel">{d.type}.</text>
		<foreignObject x={0 + 30} y={45} width={130} height={200}>
			<p class="descriptionLabel" xmlns="http://www.w3.org/1999/xhtml">
				{#each d.label as l}
					{l}<br />
				{/each}
			</p>
		</foreignObject>
	</g>
</g>

<style>
	.valueLabel {
		text-anchor: middle;
	}
	.black text.valueLabel {
		fill: white;
		stroke: white;
	}
	.brown text.valueLabel {
		fill: darkred;
		stroke: darkred;
		stroke-width: 2px;
	}
	.yellow text.valueLabel {
		fill: black;
		stroke: black;
		stroke-width: 2px;
	}
	.black rect {
		stroke: #000;
	}
	.brown rect {
		stroke: #3a2117;
	}
	.yellow rect {
		stroke: #f9ba00;
	}
	.typeLabel {
		font-family:
			Milestone One,
			sans-serif;
		letter-spacing: 0.1rem;
		text-transform: uppercase;
		font-size: 1.4rem;
	}
	.descriptionLabel {
		text-transform: uppercase;
		font-size: 0.6rem;
		font-weight: 200;
		margin-top: 0;
	}
</style>
