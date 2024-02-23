<script>
	import Challenge from '../components/Challenge.svelte';
	import Header from '../components/Header.svelte';
	import Intro from '../components/Intro.svelte';
	import {
		PUBLIC_MAX_SHOWN_CHALLENGE_DEV,
		PUBLIC_MAX_SHOWN_CHALLENGE_PROD,
		PUBLIC_FATHOM_SITE_ID,
		PUBLIC_FATHOM_URL
	} from '$env/static/public';
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import * as Fathom from 'fathom-client';

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
		Fathom.load(PUBLIC_FATHOM_SITE_ID, {
			url: PUBLIC_FATHOM_URL
		});
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
	/* page headline font */
	@font-face {
		font-family: 'Gelasio';
		font-style: normal;
		font-weight: 400;
		src:
			local('Gelasio Regular'),
			local('Gelasio-Regular'),
			url(https://fonts.gstatic.com/s/gelasio/v1/cIf9MaFfvUQxTTqS9C6hYQ.woff2) format('woff2');
	}

	/* light font for labels in charts */
	@font-face {
		font-family: 'ErieLight';
		src: url('fonts/ErieLight/30c6f356622bd29b5ba4fb9ad5a15f3b.eot');
		src:
			url('fonts/ErieLight/30c6f356622bd29b5ba4fb9ad5a15f3b.eot?#iefix') format('embedded-opentype'),
			url('fonts/ErieLight/30c6f356622bd29b5ba4fb9ad5a15f3b.woff2') format('woff2'),
			url('fonts/ErieLight/30c6f356622bd29b5ba4fb9ad5a15f3b.woff') format('woff'),
			url('fonts/ErieLight/30c6f356622bd29b5ba4fb9ad5a15f3b.ttf') format('truetype'),
			url('fonts/ErieLight/30c6f356622bd29b5ba4fb9ad5a15f3b.svg#ErieLight') format('svg');
	}

	/* bold font for headlines in adaptions  */
	@font-face {
		font-family: 'Milestone One';
		src: url('fonts/Milestone-One/Milestone One.otf');
	}

	:global(body) {
		margin: 0;
		font-family: Ubuntu, sans-serif;
	}
	:global(section.inner) {
		max-width: 600px;
		margin: auto;
		padding: 20px 20px;
	}
	:global(section.outer) {
		margin: auto;
		padding: 20px 10px;
		max-width: 1200px;
	}
	:global(.recreation .headline) {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		text-align: center;
		text-transform: uppercase;
		font-family:
			Milestone One,
			sans-serif;
		font-size: 1.5rem;
		letter-spacing: 0.1rem;
		color: #333;
	}

	:global(a) {
		color: black;
		transition: opacity 0.4s ease;
	}
	:global(a:hover) {
		opacity: 0.6;
		text-decoration: underline;
	}
	:global(.headline span.subtitle) {
		font-size: 0.8rem;
		margin-top: 4px;
	}
	:global(.headline span.subtitle span) {
		display: block;
	}
</style>
