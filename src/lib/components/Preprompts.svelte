<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import settings from '$lib/stores/settings';

	export let preprompts;
	let selectedPrompt;
	const dispatch = createEventDispatcher();

	function handleClick(e) {
		dispatch('startprompt', { prompt: selectedPrompt });
	}
</script>

<h2 class="mt-10 font-semibold opacity-50">Tendance</h2>
<ul class="grid grid-cols-2 grid-rows-2 gap-2">
	{#each preprompts as prompt}
		{#if prompt.section == 'Tendance'}
			<li>
				<button
					class="flex flex-col justify-center card card-{prompt.category.toLowerCase()}"
					on:click={() => {
						selectedPrompt = prompt;
						handleClick();
						$settings.selectedPrompt = 3;
					}}
				>
					<span>{prompt.category}</span>
					{prompt.prompt}</button
				>
			</li>
		{/if}
	{/each}
</ul>
<h2 class="mt-6 font-semibold opacity-50">Pour vous</h2>
<ul class="grid grid-cols-1 grid-rows-2 gap-2 mb-2">
	{#each preprompts as prompt}
		{#if prompt.section == 'Pour vous'}
			<li>
				<button
					disabled
					on:click={() => {
						selectedPrompt = prompt;
						handleClick();
					}}
					class="flex flex-col justify-center card card-{prompt.category.toLowerCase()}"
				>
					<span>{prompt.category}</span>
					{prompt.prompt}</button
				>
			</li>
		{/if}
	{/each}
</ul>

<style lang="postcss">
	span {
		@apply text-xs tracking-wide mb-1 opacity-60;
	}
	li > button {
		@apply rounded-cards border-2 text-left p-2 leading-[1.2] font-semibold h-[100px];
	}
</style>
