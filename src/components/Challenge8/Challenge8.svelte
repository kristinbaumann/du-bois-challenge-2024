<!-- 
	In 1890 nearly one fifth of them owned their own homes and farms.
	This advance was accomplished entirely without state aid, and in the 
	face of proscriptive laws.

	En 1890 environ un cinquième étaient propriétaires de leurs hab-
	itations et de leurs fermes. Ce progrès s'été accompli sans 
	secours aucun de l'etat et en présence de lois défavorables.

	In 1860 nearly 90% of the blacks were slaves.
	En 1860 environ 90% des nègres étaient esclaves.

	1860 
	11% free laborers - ouvriers libres
	89% slaves - esclaves

	1890
	19% peasant proprietors - paysans proprietaires
	81% tenants - métayers
 -->
<script>
	const data1860 = {
		slaves: 86,
		free: 11
	};
	const data1890 = {
		owners: 19,
		tenants: 81
	};

	const height = 630;
	const width = 570;
	const margin = {
		top: 50,
		right: 20,
		bottom: 45,
		left: 80
	};
	const barHeight = 20;
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;
</script>

<h2 class="headline">
	<p>The Rise of the Negroes from Slavery to Freedom in one generation.</p>
	<p>Progrès Graduel des Nègres de l'escavage à la liberté en une Génération.</p>
	<p>Done by Atlanta University.</p>
</h2>
<svg {width} {height}>
	<g transform="translate({margin.left},{margin.top})"> </g>
</svg>

<style>
	.headline p {
		font-weight: 700;
		margin-top: 0;
		color: #333;
		font-size: 0.85rem;
	}

	.headline p:nth-of-type(2) {
		margin-top: 25px;
	}
	.headline p:nth-of-type(3) {
		margin-top: 40px;
		font-size: 0.7rem;
	}
	svg {
		background-color: lightgray;
		margin-top: 20px;
	}
</style>
