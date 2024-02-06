<script>
	import colors from '../data/challenge01/colors';

	export let data;

	const nudgeX = 50;
	const nudgeY = 25;

	let color1870 = 'black';
	let color1880 = 'black';
	$: {
		if (data) {
			color1870 = colors[data.values['1870']].hex;
			color1880 = colors[data.values['1880']].hex;
		}
	}
</script>

{#if data}
	<div
		class="tooltip"
		style="position: absolute; top: {data.x + nudgeX}px; left: {data.y + nudgeY}px;"
	>
		<p>{data.name}</p>
		<div class="info">
			<span>
				<div class="bar bar-top" style="background-color:{color1870}" />
				1870: {data.values['1870']}</span
			>
			<span>
				<div class="bar bar-bottom" style="background-color:{color1880}" />
				1880: {data.values['1880']}
			</span>
		</div>
	</div>
{/if}

<style>
	.tooltip {
		background: white;
		box-shadow: 0 3px 15px rgba(0, 0, 0, 0.5);
		padding: 8px;
		border-radius: 3px;
		pointer-events: none;
		transition:
			top 300ms ease,
			left 300ms ease;
	}
	p {
		margin: 0;
		margin-bottom: 8px;
		font-weight: bold;
	}
	span {
		display: block;
		position: relative;
		padding: 4px 0;
	}
	span .bar {
		position: absolute;
		left: -8px;
		width: 4px;
		background-color: red;
	}
	span .bar.bar-top {
		top: 0;
		bottom: 2px;
	}
	span .bar.bar-bottom {
		top: 2px;
		bottom: 0;
	}
</style>
