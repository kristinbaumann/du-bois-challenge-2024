<script>
	import Challenge from '../components/Challenge.svelte';
	import Header from '../components/Header.svelte';
	import Intro from '../components/Intro.svelte';
	import {
		PUBLIC_MAX_SHOWN_CHALLENGE_DEV,
		PUBLIC_MAX_SHOWN_CHALLENGE_PROD
	} from '$env/static/public';
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';

	const maxShownChallenge = Number(
		dev ? PUBLIC_MAX_SHOWN_CHALLENGE_DEV : PUBLIC_MAX_SHOWN_CHALLENGE_PROD
	);

	let ComponentsArray = [];
	onMount(async () => {
		for (let i = 1; i <= maxShownChallenge; i++) {
			ComponentsArray[i] = (
				await import(`../components/Challenge${i}/Challenge${i}.svelte`)
			).default;
		}
	});
</script>

<Header />
<section class="inner">
	<Intro />
</section>
<section class="outer">
	{#each Array(maxShownChallenge) as _, j}
		<Challenge number={j + 1}>
			<svelte:component this={ComponentsArray[j + 1]}></svelte:component>
		</Challenge>
	{/each}
</section>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<style>
	@font-face {
		font-family: 'Gelasio';
		font-style: normal;
		font-weight: 400;
		src:
			local('Gelasio Regular'),
			local('Gelasio-Regular'),
			url(https://fonts.gstatic.com/s/gelasio/v1/cIf9MaFfvUQxTTqS9C6hYQ.woff2) format('woff2');
	}

	:global(body) {
		margin: 0;
		font-family: Ubuntu, sans-serif;
	}
	:global(section.inner) {
		max-width: 600px;
		margin: auto;
		padding: 20px 0;
	}
	:global(section.outer) {
		/* margin: 0 50px; */
		margin: auto;
		padding: 20px;
		max-width: 1200px;
	}
	:global(.recreation .headline) {
		margin-top: 0.5rem;
		text-align: center;
		text-transform: uppercase;
		font-size: 1rem;
	}

	:global(a) {
		color: black;
		transition: opacity 0.4s ease;
	}
	:global(a:hover) {
		opacity: 0.6;
		text-decoration: underline;
	}
</style>
