<script>
	import clsx from 'clsx';
	import { fly } from 'svelte/transition';
	import settings from '$lib/stores/settings';
</script>

<ul class="space-y-4">
	{#if $settings.prompt.length > 0}
		{#each $settings.prompt as entry, index (index)}
			<li transition:fly={{ y: 5 }}>
				<div class="flex flex-row gap-2 mb-1">
					<div class="bg-green-500 w-6 aspect-square rounded-full"></div>
					{entry.author}
				</div>
				<p
					class={clsx(
						'message',
						entry.author === 'Vous' && 'message-user',
						entry.author === 'dat' && 'message-dat'
					)}
				>
					{entry.text}
				</p>
			</li>
		{/each}
	{/if}
</ul>

<style lang="postcss">
	.message {
		@apply py-2 px-6 font-medium text-gray-60;
	}
</style>
