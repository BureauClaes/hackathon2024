<script>
	import clsx from 'clsx';
	import { fade } from 'svelte/transition';
	import settings from '$lib/stores/settings';
</script>

<ul class="space-y-4 pt-[4vh] pl-2">
	{#if $settings.answers.length > 0}
		{#each $settings.answers as entry, index (index)}
			<li style="animation-delay: {1000 * index};">
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
</style>
