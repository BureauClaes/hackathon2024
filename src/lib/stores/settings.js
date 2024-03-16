import { writable } from 'svelte/store';

const settings = writable({
	filtersOpen: false,
	filters: [],
	fontSize: 12
});

export default settings;
