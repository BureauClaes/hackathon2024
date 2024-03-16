<script>
	import { fade } from 'svelte/transition';
	import PromptInteraction from '../lib/components/PromptInteraction.svelte';

	let isPrompting = false,
		promptInput,
		items;

	async function handleSubmit(e) {
		e.preventDefault();
		console.log(promptInput);
		if (promptInput !== '') {
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

			console.log(items[Math.floor(Math.random() * items.length)]);
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

<h1 class="text-3xl font-bold underline">Hello world!</h1>
<button on:click={() => (isPrompting = !isPrompting)}>Toggle prompt</button>
<section class="px-2 h-[30dvh] overflow-y-scroll">
	{#if isPrompting}
		<ul class="grid grid-cols-2 w-full gap-4" transition:fade>
			<li class="">
				<p class="tag tag-low">Low</p>
				Quel est le budget de ce projet ?
			</li>
			<li class="">
				<p class="tag tag-high">High</p>
				Quel est le budget de ce projet ?
			</li>
			<li class="">
				<p class="tag tag-medium">Medium</p>
				Quel est le budget de ce projet ?
			</li>
			<li class="">
				<p class="tag tag-low">Low</p>
				Quel est le budget de ce projet ?
			</li>
		</ul>
	{/if}
	{#if prompt}
		<PromptInteraction {prompt} />
	{/if}
</section>
<aside
	class="fixed bottom-2 w-[calc(100%-1rem)] left-2 overflow-hidden shadow-lg bg-neutral-200 rounded-cards"
>
	<form action="" class="relative">
		<input
			type="text"
			class="w-full z-0 py-1 px-3"
			placeholder="Message..."
			bind:value={promptInput}
		/>
		<button
			class=" z-20 right-0 flex flex-row justify-center"
			on:click={(e) => {
				handleSubmit(e);
			}}
			><svg class="w-2" fill="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M13 7.828V20h-2V7.828l-5.364 5.364-1.414-1.414L12 4l7.778 7.778-1.414 1.414L13 7.828Z"
				></path>
			</svg> Submit</button
		>
	</form>
</aside>
