import { writable } from 'svelte/store';

const settings = writable({
	filtersOpen: false,
	filters: [],
	isAnswering: false,
	selectedPrompt: '',
	answers: [],
	fontSize: 12
});

export default settings;
