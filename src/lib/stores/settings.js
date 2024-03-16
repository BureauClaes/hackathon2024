import { writable } from 'svelte/store';

const settings = writable({
	filtersOpen: false,
	fontSize: 12
});

export default settings;
