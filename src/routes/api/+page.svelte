<script lang="ts">
	import { onMount } from 'svelte';

	export let form;

	$: console.log(form);

	onMount(() => {
		let buttonSubmit = document.getElementById('submitQuestion');

		buttonSubmit.addEventListener('click', (e) => {
			let questionInput = document.getElementById('question').value;
			localStorage.setItem('currentQuestion', questionInput);
		});

		if (form) {
			let response = form;
			let question = localStorage.getItem('currentQuestion') || '';

			let data = JSON.parse(localStorage.getItem('questionAnswerData')) || [];

			data.push({ question, response });
			localStorage.setItem('questionAnswerData', JSON.stringify(data));
		}
	});
</script>

<section class="px-2 pt-6">
	<div class="w-fit">
		<div id="responseBlock">
			{@html `<div>${form}</div>`}
		</div>
		<form method="post" action="#">
			<div class="flex flex-col items-start mb-3">
				<label for="question" class="mb-2">Posez votre question :</label>
				<textarea
					class="bg-[#F0F0F0] rounded-xl"
					id="question"
					name="question"
					rows="4"
					cols="50"
					required
				></textarea>
			</div>
			<div class="flex flex-col items-end">
				<input
					value="Envoyer"
					type="submit"
					id="submitQuestion"
					class="px-5 py-2 bg-primary rounded-xl font-bold duration-300 hover:bg-primary-hover"
				/>
			</div>
		</form>
	</div>
</section>
