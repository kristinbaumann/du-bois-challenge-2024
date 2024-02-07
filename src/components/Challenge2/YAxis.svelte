<script>
	import data from '../../data/challenge02/data.js';
	export let xScale;
	export let yScale;
</script>

<g class="YearAxis">
	{#each data as d}
		<text
			x={0}
			y={yScale(d.Year)}
			class="label"
			text-anchor="end"
			dominant-baseline="middle"
			dx={-5}>{d.Year}</text
		>
		<text
			x={xScale(0)}
			y={yScale(d.Year)}
			class="label"
			text-anchor="start"
			dx={15}
			dominant-baseline="middle">{d.Free}</text
		>
	{/each}
</g>

<style>
	.label {
		fill: green;
	}
</style>
