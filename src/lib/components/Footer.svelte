<script>
	let year = 2000;
</script>

<footer class="bg-neutral-800 text-white mt-12 rounded-t-cards py-8 px-4">
	<a href="/" class="font-bold text-3xl"> dat.</a>
	<h3>Thématiques</h3>
	<ul class="">
		<li><a href="">Politique</a></li>
		<li><a href="">Économie</a></li>
		<li><a href="">Culture</a></li>
		<li><a href="">Santé</a></li>
		<li><a href="">Environnement</a></li>
	</ul>
	<p>© {year} dat. All rights reserved.</p>
</footer>

<style>
	h3 {
		@apply text-3xl;
	}

	a {
		@apply hover:opacity-80 transition-opacity;
	}
</style>
