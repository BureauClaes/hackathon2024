<script>
	import clsx from 'clsx';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export let prompt = [];

	onMount(() => {
		console.log(prompt);
	});
</script>

<ul class="space-y-4">
	{#if prompt.length > 0}
		{#each prompt as entry, index (index)}
			<li
				transition:fly={{ y: 5 }}
				class={clsx(
					'message',
					entry.author === 'user' && 'message-user',
					entry.author === 'dat' && 'message-dat'
				)}
			>
				{entry.text}
			</li>
		{/each}
	{/if}
</ul>

<style lang="postcss">
	.message {
		@apply rounded-cards bg-neutral-200 py-2 px-4;
	}

	.message-user {
		@apply bg-neutral-700 text-white rounded-br-none;
	}

	.message-dat {
		@apply rounded-bl-none;
	}
</style>
