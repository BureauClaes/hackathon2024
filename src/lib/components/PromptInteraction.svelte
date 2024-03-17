<script>
	import clsx from 'clsx';
	import settings from '$lib/stores/settings';

	let prompts = [
		{
			id: 3,
			questions: [
				{
					text: "La région de Charleroi compte 4 RAVel: de Leers-Nord à Anhée, de Chaudfontaine à Erquelinnes, de Fontaine-l'Evêque à Monceau-sur-Sambre et de Gosselies (Charleroi) à Châtelet.",
					img: '/images/ravel.png'
				},
				{
					text: "L'itinéraire le plus court est la ligne 112 de Fontaine-l'Evêque à Monceau-sur-Sambre. Avec un total de 4,5km."
				},
				{ text: 'Oui le parcourt est faisable en famille et en groupe.' }
			]
		},
		{
			id: 3,
			questions: [
				{
					text: "En 2022, l'espérance de vie moyenne à la naissance (EV) est de 81,7 ans en Belgique."
				},
				{
					text: "Elle était plus élevée chez les femmes (83,8ans) que chez les hommes (79,5ans). L'EV a augmenté plus rapidement chez les hommes que chez les femmes."
				}
			]
		}
	];

	let currentQuestion = prompts[0].questions[0];
	let answersSent = 0;
	let loading = false,
		showSources1,
		showSources2;

	function checkForRavel(params) {
		showSources1 = true;
		showSources2 = false;

		if (answersSent === 1) {
			$settings.answers = [...$settings.answers, { author: 'dat', text: currentQuestion.text }];
		}

		if (answersSent === 2) {
			currentQuestion = prompts[0].questions[1];
			loading = true;
			setTimeout(() => {
				$settings.answers = [...$settings.answers, { author: 'dat', text: currentQuestion.text }];
			}, 1000);
			setTimeout(() => {
				loading = false;
			}, 1000);
		}
		if (answersSent === 4) {
			currentQuestion = prompts[0].questions[2];
			loading = true;
			setTimeout(() => {
				$settings.answers = [...$settings.answers, { author: 'dat', text: currentQuestion.text }];
			}, 1000);
			setTimeout(() => {
				loading = false;
			}, 1000);
			setTimeout(() => {}, 3000);
		}
	}

	function checkManual() {
		showSources2 = true;
		showSources1 = false;

		if (answersSent === 1) {
			currentQuestion = prompts[1].questions[0];
			loading = true;
			setTimeout(() => {
				$settings.answers = [...$settings.answers, { author: 'dat', text: currentQuestion.text }];
			}, 1000);
			setTimeout(() => {
				loading = false;
			}, 1700);
		}
		if (answersSent === 3) {
			currentQuestion = prompts[1].questions[1];
			loading = true;
			setTimeout(() => {
				$settings.answers = [...$settings.answers, { author: 'dat', text: currentQuestion.text }];
			}, 1000);
			setTimeout(() => {
				loading = false;
			}, 1900);
			setTimeout(() => {}, 3000);
		}
	}

	$: {
		$settings.answers = $settings.answers;
		answersSent++;
		if ($settings.selectedPrompt == 3) {
			checkForRavel();
		} else {
			$settings.selectedPrompt == 2;
			checkManual();
		}
	}
</script>

{answersSent}

<ul class="space-y-4 h-[720px] overflow-y-auto mt-20">
	<li class=" bg-teal-100 shadow-sm w-full px-3 py-5 flex flex-col gap-2 rounded-cards mb-4">
		<p class="text-sm leading-[1.2] mb-2">
			Cette analyse est basee sur les données publiques suivantes :
		</p>
		<ul class="flex flex-row gap-2">
			{#if showSources2}
				<li>
					<a href="https://data.gov.be/en/node/368346" target="_blank">Espérence de vie</a>
				</li>
				<li>
					<a href="https://data.gov.be/en/node/368324" tarfet="_blank">Maladie ou problème</a>
				</li>
			{/if}
			{#if showSources1}
				<li>
					<a href="https://data.gov.be/en/node/259496" target="_blank">Rapport RAVel </a>
				</li>
				<li>
					<a href="https://data.gov.be/en/node/431587" tarfet="_blank">Aménagements cyclables</a>
				</li>
			{/if}
		</ul>
	</li>

	{#if $settings.answers.length > 0}
		{#each $settings.answers as entry, index (index)}
			<li style="animation-delay: {1000 * index};" class=" pl-2">
				<div class="flex flex-row gap-2 mb-1">
					<div
						class="bg-teal-700 w-6 aspect-square rounded-full {entry.author === 'dat' &&
							'!bg-white shadow-sm before:content-["❉"] grid place-items-center'}"
					></div>
					{entry.author}
				</div>
				<p
					class={clsx(
						'message ',
						entry.author === 'Vous' && 'message-user',
						entry.author === 'dat' && 'message-dat'
					)}
				>
					{entry.text}
				</p>
				{#if entry.img}
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img src={entry.img} alt="image" />
				{/if}
			</li>
		{/each}
		{#if loading}
			<li><img src="/images/loading.gif" class="w-8 ml-10" alt="loading" /></li>
		{/if}
	{/if}
	<li></li>
</ul>

<style lang="postcss">
	.message {
		@apply py-2 px-8 font-medium;
	}

	li:last-of-type {
		animation: important2 forwards 400ms;
	}
	@keyframes important2 {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	li > a {
		@apply py-1 px-2 text-sm rounded-full bg-teal-700 text-white;
	}
</style>
