import { writable } from 'svelte/store';

const settings = writable({
	filtersOpen: true,
	filters: [],
	fontSize: 12
});

export default settings;
