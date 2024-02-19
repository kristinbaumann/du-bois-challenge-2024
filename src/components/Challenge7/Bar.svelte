<!-- rectangle width animated with motion -->
<script>
	import { tweened } from 'svelte/motion';
	import { inview } from 'svelte-inview';

	export let xScale;
	export let yScale;
	export let barHeight;
	export let index;
	export let value;
	export let country;

	let currentValue = tweened(0, {
		duration: 500
	});
</script>

<rect
	x={xScale(0)}
	y={yScale(index)}
	height={barHeight}
	width={xScale($currentValue)}
	fill="url(#pattern-green-{index})"
	use:inview={{
		rootMargin: '-20px',
		unobserveOnEnter: true
	}}
	on:inview_enter={() => {
		$currentValue = value;
	}}
	class={country === 'Negroes, U.S.A.' ? 'highlight' : ''}
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
