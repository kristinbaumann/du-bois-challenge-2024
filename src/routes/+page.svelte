<script>
	import Challenge from '../components/Challenge.svelte';
	import Challenge1 from '../components/Challenge1/Challenge1.svelte';
	import Challenge2 from '../components/Challenge2/Challenge2.svelte';
	import Challenge3 from '../components/Challenge3/Challenge3.svelte';
	import Header from '../components/Header.svelte';
	import Intro from '../components/Intro.svelte';
</script>

<Header />
<section class="inner">
	<Intro />
</section>
<section class="outer">
	<Challenge number="1">
		<Challenge1 />
	</Challenge>
	<Challenge number="2">
		<Challenge2 />
	</Challenge>
	<Challenge number="3">
		<Challenge3 />
	</Challenge>
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
