<script>
	import { tweened } from 'svelte/motion';
	import { fade } from 'svelte/transition';
	import { inview } from 'svelte-inview';

	import { patterns } from '$lib/assets/images/patterns.js';

	export let yScale;
	export let barWidth;
	export let data;
	export let d;
	export let i;
	export let margin;

	let inView = false;

	let currentValue = tweened(0, {
		duration: 1000
	});
</script>

<g
	class={d.type}
	transform="translate(0,{yScale(data.reduce((acc, d, j) => (j < i ? acc + d.value : acc), 0))})"
	use:inview={{
		rootMargin: '-50px',
		unobserveOnEnter: true
	}}
	on:inview_enter={() => {
		inView = true;
		$currentValue = d.value;
	}}
>
	<defs>
		<pattern
			id="pattern-{d.type}"
			patternUnits="userSpaceOnUse"
			width={barWidth}
			height={yScale(d.value)}
		>
			<image href={patterns[d.type]} x="0" y="0" width="408" height="612" />
		</pattern>
	</defs>
	<rect x={0} y={0} width={barWidth} height={yScale($currentValue)} fill="url(#pattern-{d.type})" />
	{#if inView}
		<g transition:fade={{ delay: 350, duration: 1000 }}>
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
	{/if}
</g>

<style>
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
		stroke: #000;
	}
	.brown rect {
		stroke: #3a2117;
	}
	.yellow rect {
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
