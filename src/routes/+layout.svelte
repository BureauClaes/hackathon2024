<script>
	import '../app.css';
	import Nav from '../lib/components/Nav.svelte';
</script>

<main class="flex justify-center items-center h-screen">
	<div class="relative max-w-[400px] max-h-fit bg-white mx-auto">
		<Nav />
		<slot />
	</div>
</main>

<style>
</style>
