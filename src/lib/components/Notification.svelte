<script>
	export let border = false;
</script>

<span
	class="absolute rounded-full bg-black text-white aspect-square grid place-items-center {border
		? 'border-2 border-white w-8  -right-3 -top-3'
		: 'w-6  -right-2 -top-2'}"><slot /></span
>
