<script>
	import { createEventDispatcher } from 'svelte';
	import settings from '$lib/stores/settings';

	import clsx from 'clsx';
	import { slide } from 'svelte/transition';

	export let filtersOpen;
	$: {
		if ($settings.filtersOpen !== true && $settings.filtersOpen !== false) {
			$settings.filtersOpen = filtersOpen;
		} else {
			filtersOpen = $settings.filtersOpen;
		}
	}
	const dispatch = createEventDispatcher();

	// Databases Sources
	let databases = [
		{
			id: 'db1',
			checked: false,
			category: 'Economie',
			label: 'Database 1'
		},
		{
			id: 'db2',
			checked: false,
			category: 'Economie',
			label: 'Database 2'
		},
		{
			id: 'db3',
			checked: false,
			category: 'Economie',
			label: 'Database 3'
		},
		{
			id: 'db4',
			checked: false,
			category: 'Economie',
			label: 'Database 4'
		},
		{
			id: 'db5',
			checked: false,
			category: 'Economie',
			label: 'Database 5'
		},
		{
			id: 'db6',
			checked: false,
			category: 'Economie',
			label: 'Database 6'
		},
		{
			id: 'db7',
			checked: false,
			category: 'Economie',
			label: 'Database 7'
		},
		{
			id: 'db8',
			checked: false,
			category: 'Economie',
			label: 'Database 8'
		}
	];

	// Selected Databases to export
	let selectedDatabases = [];

	function handleAddFilter(database) {
		dispatch('addfilter', {
			filters: selectedDatabases
		});
	}
</script>

<modal open class="absolute w-full top-0 bg-gray-20 h-screen z-20 px-4 py-10" transition:slide>
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
			<!-- Close icon -->
			<path
				d="m12 10.583 4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414L12 13.41l-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.633l4.95 4.95Z"
			></path>
		</svg>
	</button>
	<form action="" inputmode="none">
		<ul>
			{#each databases as database}
				<li>
					<input
						type="checkbox"
						id={database.id}
						on:click={() => {
							// Update
							database.checked = !database.checked;
							if (database.checked && !selectedDatabases.includes(database)) {
								selectedDatabases = [...selectedDatabases, database];
							} else if (!database.checked && selectedDatabases.includes(database)) {
								selectedDatabases = selectedDatabases.filter((d) => d !== database);
							}

							handleAddFilter(database);
						}}
					/><label for={database.id}>{database.label}</label>
				</li>
			{/each}
		</ul>
	</form>
</modal>

<style>
</style>
