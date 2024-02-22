<script>
	import * as Fathom from 'fathom-client';
</script>

<p>
	The goal of <a
		href="https://github.com/ajstarks/dubois-data-portraits/blob/master/challenge/2024/README.md"
		target="_blank"
		on:click={() => Fathom.trackEvent('click link to external challenge description')}
		>this challenge</a
	> is to celebrate the data viz legacy of W.E.B Du Bois—a Black American civil rights activist, sociologist
	and writer—by recreating the visualizations from the 1900 Paris Exposition using modern tools.
</p>

<p>
	I specialize in coding interactive, responsive data visualizations. Therefore I used D3 and Svelte
	to create a modern adaptation of Du Bois' originals.
</p>
<p>
	You can find the corresponding code
	<a
		href="https://github.com/kristinbaumann/du-bois-challenge-2024/"
		target="_blank"
		on:click={() => Fathom.trackEvent('click link to Github repo of this project')}
		>here on Github</a
	>.
</p>

<style>
	p {
		line-height: 1.8rem;
	}
</style>
