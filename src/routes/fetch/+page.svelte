<script>
	let items;

	// https://dummyapi.online/api/todos
	fetch('https://dummyapi.online/api/todos')
		.then((response) => response.json())
		.then((json) => (items = json));

	$: console.log(items);
</script>

<h1 class="text-3xl font-bold underline">Hello world!</h1>
<section class="px-2">
	<ul class="grid grid-cols-2 w-full gap-4">
		{#if items}
			{#each items as item}
				<li class="">
					{item.title}
					<p class="text-sm tag-{item.priority} w-fit px-4 rounded-full">{item.priority}</p>
				</li>{/each}
		{/if}
	</ul>
</section>

<style lang="postcss">
	li {
		@apply aspect-square rounded-cards bg-slate-300;
	}

	.tag-low {
		@apply bg-green-500;
	}
	.tag-medium {
		@apply bg-yellow-300;
	}
	.tag-high {
		@apply bg-red-500;
	}
</style>
