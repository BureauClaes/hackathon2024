<script>
	import '../app.css';
	import Nav from '../lib/components/Nav.svelte';
</script>

<main class="max-h-[100dvh] flex justify-center items-center">
	<div
		class="relative max-w-[400px] h-[800px] max-h-fit pt-[10vh] bg-white mx-auto border-red-500 translate-y-[10%]"
	>
		<Nav />
		<slot />
	</div>
</main>

<style>
</style>
