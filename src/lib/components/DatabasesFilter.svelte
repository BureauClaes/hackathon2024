<script>
	import settings from '$lib/stores/settings';

	import clsx from 'clsx';
	import { fade } from 'svelte/transition';

	export let filtersOpen;

	let filterQuery, filterDatabaseElement, selectedFilters;

	// Databases Sources
	const databasesSource = [
		{
			id: 'db1',
			checked: false,
			category: 'Mobilité',
			type: 'first',
			label: 'Pomme'
		},
		{
			id: 'db2',
			checked: false,
			category: 'Mobilité',

			label: 'Poire'
		},
		{
			id: 'db3',
			checked: false,
			category: 'Mobilité',
			label: 'Abricot'
		},
		{
			id: 'db4',
			checked: false,
			category: 'Environnement',
			label: 'Fraise',
			type: 'first'
		},
		{
			id: 'db5',
			checked: false,
			category: 'Environnement',
			label: 'Database 5'
		},
		{
			id: 'db6',
			checked: false,
			category: 'Culture',
			label: 'Database 6',
			type: 'first'
		},
		{
			id: 'db7',
			checked: false,
			category: 'Culture',
			label: 'Database 7'
		},
		{
			id: 'db8',
			checked: false,
			category: 'Santé',
			label: 'Database 8',
			type: 'first'
		}
	];

	let databases = databasesSource;

	// Check selected databases compared to original databases list
	if ($settings.filters && $settings.filters.length > 0) {
		databases.map((database, index) => {
			$settings.filters.map((filter) => {
				if (database.id === filter.id) {
					database.checked = true;
				}
			});
		});
	}

	function filterDatabases(string) {
		if (string && string.length > 2) {
			databases = databases.filter((database) => {
				// Item label
				let original = database.label.toLowerCase();
				// Query string
				let search = string.toLowerCase();

				if (original.includes(search)) {
					return database;
				}
			});
		}
	}

	function resetDatabase() {
		databases = databasesSource.map((db) => ({ ...db, checked: false }));
	}

	$: {
		if (filterQuery && filterQuery.length > 2) {
			filterDatabases(filterQuery);
		} else if ((filterQuery && filterQuery.length <= 2) || !filterQuery) {
			resetDatabase();
		}

		databases.forEach((database, indexA) => {
			const indexB = $settings.filters.findIndex((filter) => filter.id === database.id);
			if (indexB !== -1) {
				databases[indexA] = $settings.filters[indexB];
			}
		});
	}
</script>

<modal
	open
	class="absolute w-full top-0 bg-white min-h-screen z-20 px-4 pb-10 pt-5"
	transition:fade={{ duration: 100 }}
>
	<!-- Filter bar -->
	<aside class="w-full left-4 grid grid-cols-[auto_56px] gap-2">
		<!-- Filter input -->
		<form action="" class="relative w-full">
			<input
				type="text"
				class="w-full z-0 p-4 bg-neutral-200 rounded-cards"
				placeholder="Chercher une base de données"
				bind:value={filterQuery}
				on:keydown={filterDatabases}
			/>
		</form>
		<!-- Close button --><button
			class="relative bg-neutral-200 can-hover:hover:bg-neutral-300 transition-all duration-200 rounded-cards w-fit aspect-square grid place-items-center"
			on:click={() => ($settings.filtersOpen = !$settings.filtersOpen)}
		>
			<!-- Close icon -->
			<svg
				class="w-6 aspect-square h-fit fill-black"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="m12 10.583 4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414L12 13.41l-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.633l4.95 4.95Z"
				></path>
			</svg>
		</button>
	</aside>

	<!-- Checkboxes -->
	<div class="mt-7 w-full flex flex-row justify-between">
		<p>
			{$settings.filters.length} filtre<span
				class={clsx(
					'',
					$settings.filters.length > 1 && 'inline',
					$settings.filters.length <= 1 && 'hidden'
				)}>s</span
			>
			sélectionné<span
				class={clsx(
					'',
					$settings.filters.length > 1 && 'inline',
					$settings.filters.length <= 1 && 'hidden'
				)}>s</span
			>
		</p>
		<button
			class="underline font-semibold"
			disabled={$settings.filters.length <= 0}
			on:click={() => {
				$settings.filters = [];
				databases = databasesSource.map((db) => ({ ...db, checked: false }));
			}}>Réinitialiser</button
		>
	</div>
	<form action="" inputmode="none" class="">
		<ul class="w-full space-y-2 flex flex-col">
			{#each databases as database}
				{#if database}
					{#if database.type == 'first'}
						<li class="!mt-10 font-semibold">
							{database.category}
						</li>
					{/if}
					<li
						class="block font-medium {database.type == 'first'
							? 'relative before:absolute before:-top-full before:font-bold before:text-gray-60'
							: ''}"
					>
						<input
							type="checkbox"
							class="sr-only"
							id={database.id}
							bind:checked={database.checked}
							on:click={() => {
								// Update
								database.checked = !database.checked;
								// Add checked database if not included in filters
								if (database.checked && !$settings.filters.includes(database)) {
									$settings.filters = [...$settings.filters, database];
								} else if (!database.checked) {
									// Remove unchecked database
									$settings.filters = $settings.filters.filter((d) => d.id !== database.id);
								}
							}}
						/><label
							class="card-{database.category.toLocaleLowerCase()}  py-3 border-2 pl-4 w-full block rounded-cards hover:cursor-pointer transition-[background] duration-200 {clsx(
								'',
								database.checked && 'checked'
							)} "
							for={database.id}>{database.label}</label
						>
					</li>
				{/if}
			{/each}
		</ul>
	</form>
</modal>

<style>
</style>
