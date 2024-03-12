<script>
	export let xScale;
	export let yScale;
	export let barHeight;
	export let index;
	export let value;
</script>

<rect x={xScale(0)} y={yScale(index)} height={barHeight} width={xScale(value)} />

<style>
	rect {
		fill: #d22a49;
	}
	rect:hover {
		fill-opacity: 0.6;
	}
</style>
