<script>
	import data from '../../data/challenge02/data.js';
	export let xScale;
	export let yScale;
</script>

<g class="YAxis">
	{#each data as d}
		<text
			x={0}
			y={yScale(d.Year)}
			class="tickLabel"
			text-anchor="end"
			dominant-baseline="middle"
			dx={-25}>{d.Year}</text
		>
		<text
			x={xScale(0)}
			y={yScale(d.Year)}
			class="tickLabel"
			text-anchor="start"
			dx={25}
			dominant-baseline="middle">{d.Free}{d.Year === 1790 || d.Year === 1870 ? '%' : ''}</text
		>
	{/each}
	<foreignObject x={xScale(0)} y={-40} width={80} height={200}>
		<div class="axisLabel" xmlns="http://www.w3.org/1999/xhtml">
			Percent <br />of <br />Free Negroes
		</div>
	</foreignObject>
</g>

<style>
	.tickLabel {
		fill: black;
	}
	.axisLabel {
		font-size: 0.5rem;
		text-align: center;
		text-transform: uppercase;
	}
</style>
