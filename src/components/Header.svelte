<script>
	import * as Fathom from 'fathom-client';
</script>

<header>
	<h1>Du Bois Challenge 2024</h1>
	<p>
		By <a
			href="https://www.kristin-baumann.com"
			target="_blank"
			on:click={() => Fathom.trackEvent('click link to kristin-baumann.com in header')}
			>Kristin Baumann</a
		>
	</p>
</header>

<style>
	header {
		padding: 20px 0;
		text-align: center;
		background-color: #e4cfbed9;
		box-shadow: 0 -6px 10px 5px rgba(0, 0, 0, 0.2);
	}
	h1 {
		font-family: 'Gelasio', sans-serif;
	}
	p {
		font-weight: 400;
	}
</style>
