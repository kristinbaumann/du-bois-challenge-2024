<script>
	export let xScale;
</script>

<g class="XAxis">
	{#each [1, 2, 3] as d}
		<text x={xScale(d)} y={0} dy={-8} class="tickLabel">{d}%</text>
		<line x1={xScale(d)} y1={-6} x2={xScale(d)} y2={0} class="tick" />
	{/each}
</g>

<style>
	.tickLabel {
		text-anchor: middle;
		dominant-baseline: auto;
		font-size: 0.6rem;
	}
	.tick {
		stroke: rgba(0, 0, 0, 0.4);
	}
</style>
