<!-- 
Title 
  A  SERIES  OF  STATISTICAL  CHARTS,  ILLUSTRA-
TING  THE  CONDITIONS  OF  THE  DESCENDANTS  OF  FOR-
MER  AFRICAN  SLAVES  NOW  RESIDENT  IN  THE  UNITED
STATES  OF  AMERICA.

Title french
 UNE  SÉRIE  DE  CARTES  ET    DIAGRAMMES  STATISTIQUES  MONTRANT  LA
CONDITION  PRÉSENTE  DES  DESCENDANTS  DES  ANCIENS  ESCLAVES  AFRI-
CAINS  ACTEULLMENT  ÉTABLIS  DANS  LES  ETATS  UNIS  D'AMÉRIQUE.

Subtitle
"PREPARED AND EXECUTED BY"
"NEGRO STUDENTS UNDER THE"
"DIRECTION OF"
"ATLANTA UNIVERSITY"
"ATLANTA, GA."
"UNITED STATES OF AMERICA"

Subtitle french
"PREPARE ET EXECUTE PAR"
"NÈGRES ÉTUDIANTS SOUS"
"LA DIRECTION DE L’UNIVERSITÉ ATLANTA"
"D'ATLANTA"
"ETAT DE GEORGIA"
"ETATS UNIS D'AMERIQUE"

Breaker
"THE UNIVERSITY WAS FOUNDED IN 1867. IT HAS INSTRUCTED 6000 NEGRO STUDENTS"
"L'UNIVERSITÉ A ÉTÉ FONDÉE EN 1867. LA DONNÉ l'INSTRUCTION A'6000 ÉTUDIANTS NÈGRES"
"IT HAS GRADUATED 330 NEGROES AMONG WHOM ARE:"
"ELLE A D'ÉLIVRE DES DIPLOMES A 330 NÈGRES DONT :"

Bottom 
THE UNIVERSITY HAS 20 PROFESSORS AND INSTRUTORS AND 250 STUDENTS AT PRESENT.
     IT HAS FIVE BUILDING, 60 ACRES OF CAMPUS AND A LIBRARY OF 11,000 VOLUMES. IT AIMS TO RAISE
AND CIVILIZE THE SONS OF THE FREEDMEN BY TRAINING THEIR MORE CAPABLE MEMBERS IN THE LIBER-
AL ARTS ACCORDING TO THE BEST STANDARDS OF THE DAY.
     THE PROPER ACCOMPLISHMENT OF THIS WORK DEMANDS AN ENDOWMENT FUND OF $500,000.

Bottom french
L'UNIVERSITÉ A ACTUELLEMENT 20 PROFESSEURS ET INSTRUCTEURS ET 250 ÉTUDIANTS
     ELLE EST COMPOSEE DE CINC BÂTIMENTS, 60 ACRES (ENVIRON 26 HECTARES) DE TERRAIN SERVANT DE
COUR ET DE CHAMP DE RÉCREATION, ET D'UNE BIBLIOTHÈQUE CONTENANT 11,000 VOLUMES.
     SON BUT EST D'ÉLEVER ET DE CIVILISER LES FILS DES NEGRES AFFRANCHS EN DONNANT AUX MEUX
DOUES UNE ÉDUCATION DANS LES ARTS LIBÉRAUX EN ACCORD AVEC LES IDÉES LES PLUS PROGRESS -
SISTES DE L'EPOQUE.
     L'ACCOMPLISSEMENT DE CETTE OEUVRE  DEMANDE UNE DOTATION DE $500,000 (2,500,000 FRANCS) 

 -->

<script>
	import { arc } from 'd3-shape';
	import data from '../../data/challenge10/data';

	const height = 220;
	const width = 570;
	const margin = {
		top: 10,
		right: 10,
		bottom: 10,
		left: 10
	};
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const legendCircleRadius = 9;
	const legendYDist = 22;
	const legendXDistOuter = 10;

	const fn = arc();
	let total = data.reduce((total, s) => total + s.percentage, 0);
	let acc = -Math.PI / 2;
	const arcs = data.map((d) => {
		const optionsDefault = {
			innerRadius: 0,
			outerRadius: 100,
			startAngle: acc,
			endAngle: (acc += (Math.PI * 2 * d.percentage) / total)
		};

		return {
			value: d.percentage,
			color: d.color,
			label: d.occupation,
			d: fn(optionsDefault),
			centroidDefault: fn.centroid(optionsDefault),
			centroidOuter: fn.centroid({ ...optionsDefault, innerRadius: 70 })
		};
	});

	// sort data by orderLabels (as order in legends differs to order in pie)
	const labelData = [...data].sort((a, b) => a.orderLabels - b.orderLabels);
</script>

<h2 class="headline">
	<span>A series of statistical charts</span><br />
</h2>

<svg {width} {height}>
	<g transform="translate({margin.left},{margin.top})">
		<g class="pie" transform="translate({innerWidth / 2},{innerHeight / 2})">
			<!-- pie pieces -->
			{#each arcs as arc}
				<path d={arc.d} fill={arc.color} stroke={arc.color} data-label={arc.label} />
			{/each}
			<!-- value labels (placed close to the outer radius for small values) -->
			{#each arcs as arc}
				{#if arc.value > 10}
					<text x={arc.centroidDefault[0]} y={arc.centroidDefault[1]}>{arc.value}%</text>
				{:else}
					<text x={arc.centroidOuter[0]} y={arc.centroidOuter[1]} class={'tiny'}>{arc.value}%</text>
				{/if}
			{/each}
			<!-- border of whole pie -->
			<circle cx={0} cy={0} r={100} fill="none" stroke="#6c6c6c" />
		</g>
		<!-- legend left -->
		<g class="legend" transform="translate(0,{40})">
			{#each labelData as d, i}
				<circle cx={legendXDistOuter} cy={legendYDist * i} r={legendCircleRadius} fill={d.color} />
				<text
					x={legendXDistOuter + legendCircleRadius}
					y={legendYDist * i + legendCircleRadius / 2}
					dx={6}
					dy={-3}
					dominant-baseline="middle"
					text-anchor="start">{d.occupation}</text
				>
			{/each}
		</g>
		<!-- legend right -->
		<g class="legend french" transform="translate(0,{40})">
			{#each labelData as d, i}
				<circle
					cx={innerWidth - legendXDistOuter}
					cy={legendYDist * i}
					r={legendCircleRadius}
					fill={d.color}
				/>
				<text
					x={innerWidth - legendXDistOuter - legendCircleRadius}
					y={legendYDist * i + legendCircleRadius / 2}
					dx={-6}
					dy={-3}
					text-anchor="end">{d.occupationFrench}</text
				>
			{/each}
		</g>
	</g>
</svg>

<style>
	svg {
		display: inline-block;
		margin: 250px auto;
	}
	.pie text {
		text-anchor: middle;
		font-size: 0.8rem;
	}
	.pie text.tiny {
		font-size: 0.5rem;
	}
	.legend circle {
		stroke: #6c6c6c;
	}
	.legend text {
		font-size: 0.6rem;
		font-weight: 200;
		text-transform: uppercase;
	}
	.legend.french text {
		fill: #d22a49;
	}
</style>
