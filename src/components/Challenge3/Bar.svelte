<!-- rectangle width animated with motion -->
<script>
	import { tweened } from 'svelte/motion';
	import { inview } from 'svelte-inview';

	export let xScale;
	export let yScale;
	export let barHeight;
	export let index;
	export let value;

	let currentValue = tweened(0, {
		duration: 2000
	});
</script>

<rect
	x={xScale(0)}
	y={yScale(index)}
	height={barHeight}
	width={xScale($currentValue)}
	use:inview={{
		rootMargin: '-100px',
		unobserveOnEnter: true
	}}
	on:inview_enter={() => {
		$currentValue = value;
	}}
/>

<style>
	rect {
		fill: #d22a49;
		transition: all 0.5s ease;
	}
	rect:hover {
		fill-opacity: 0.6;
	}
</style>
