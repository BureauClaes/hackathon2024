<script>
	import clsx from 'clsx';
	import PromptInteraction from '../lib/components/PromptInteraction.svelte';
	import Notification from '../lib/components/Notification.svelte';
	import DatabasesFilter from '../lib/components/DatabasesFilter.svelte';
	import settings from '$lib/stores/settings';

	let isPrompting = false,
		promptInput,
		items,
		filtersOpen;

	$: {
		if ($settings.filtersOpen !== true && $settings.filtersOpen !== false) {
			$settings.filtersOpen = filtersOpen;
		} else {
			filtersOpen = $settings.filtersOpen;
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		if (promptInput !== '' && promptInput !== undefined) {
			prompt = [
				...prompt,
				{
					author: 'user',
					text: promptInput
				}
			];

			promptInput = '';
			fetch('https://dummyapi.online/api/todos')
				.then((response) => response.json())
				.then((json) => (items = json));
		}
	}

	let prompt = [
		{
			author: 'user',
			text: 'Quel est le budget de ce projet ?'
		},
		{
			author: 'dat',
			text: 'Le prix estimé est de 30€'
		},
		{
			author: 'user',
			text: 'Et combien de temps pourra-t-il durer ?'
		}
	];
</script>

<!-- <button on:click={() => (isPrompting = !isPrompting)}>Toggle prompt</button> -->
<section class="px-2 max-h-[calc(100vh-74px)] overflow-y-scroll">
	<h1 class="text-3xl font-bold underline">Hello world!</h1>
	{#if prompt}
		<PromptInteraction {prompt} />
	{/if}
</section>
<!-- Bottom bar -->
<aside class="fixed bottom-2 w-[calc(100%-2rem)] left-4 grid grid-cols-[auto_56px] gap-2">
	<!-- Prompt input -->
	<form action="" class="relative w-full">
		<input
			type="text"
			class="w-full z-0 p-4 bg-neutral-200 rounded-cards"
			placeholder="Message..."
			bind:value={promptInput}
		/>
		<!-- Send button -->
		<button
			class="absolute z-20 rounded-cards p-4 right-0 top-1/2 -translate-y-1/2 flex flex-row justify-center can-hover:hover:translate-y-[calc(-50%-0.3rem)] transition-all duration-200"
			on:click={(e) => {
				handleSubmit(e);
			}}
			><span class="sr-only">Submit</span>
			<svg class="w-5 aspect-square" fill="#000" viewBox="0 0 24 24">
				<path
					d="M13 7.828V20h-2V7.828l-5.364 5.364-1.414-1.414L12 4l7.778 7.778-1.414 1.414L13 7.828Z"
				></path>
			</svg>
		</button>
	</form>
	<!-- Filters button -->
	<button
		class="relative {clsx(
			filtersOpen && 'bg-neutral-300',
			!filtersOpen && 'bg-neutral-200 can-hover:hover:bg-neutral-300'
		)} transition-all duration-200 rounded-cards w-fit aspect-square grid place-items-center"
		on:click={() => ($settings.filtersOpen = !$settings.filtersOpen)}
	>
		<svg
			class="w-6 aspect-square h-fit fill-black"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			{#if filtersOpen}
				<!-- Close icon -->
				<path
					d="m12 10.583 4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414L12 13.41l-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.633l4.95 4.95Z"
				></path>
			{:else}
				<!-- Filter icon -->
				<path
					d="M2 18h7v2H2v-2Zm0-7h9v2H2v-2Zm0-7h20v2H2V4Zm18.674 9.025 1.156-.391 1 1.732-.916.805a4.017 4.017 0 0 1 0 1.658l.916.805-1 1.732-1.156-.391c-.41.37-.898.655-1.435.83L19 21h-2l-.24-1.196a3.996 3.996 0 0 1-1.434-.83l-1.156.392-1-1.732.916-.805a4.017 4.017 0 0 1 0-1.658l-.916-.805 1-1.732 1.156.391c.41-.37.898-.655 1.435-.83L17 11h2l.24 1.196c.536.174 1.024.46 1.434.83v-.001ZM18 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
				></path>
			{/if}
		</svg>
		<!-- Notification -->
		{#if $settings.filters.length > 0}
			<Notification>{$settings.filters.length}</Notification>
		{/if}
	</button>
</aside>
{#if $settings.filtersOpen}
	<DatabasesFilter {filtersOpen} />
{/if}

<style lang="postcss">
</style>
