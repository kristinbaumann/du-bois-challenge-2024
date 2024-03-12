<!-- rectangle width animated with motion -->
<script>
	export let xScale;
	export let yScale;
	export let barHeight;
	export let index;
	export let value;
	export let country;
</script>

<rect
	x={xScale(0)}
	y={yScale(index)}
	height={barHeight}
	width={xScale(value)}
	fill="url(#pattern-green-{index})"
	class:highlight={country === 'Negroes, U.S.A.'}
/>

<style>
	rect {
		stroke: black;
		stroke-width: 0.5px;
		transition: all 0.5s ease;
	}
	rect.highlight {
		fill: url(#pattern-red);
	}
	rect:hover {
		fill-opacity: 0.6;
	}
</style>
