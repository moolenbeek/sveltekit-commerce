<script lang="ts">
	import * as Card from "$lib/components/ui/card/index";
	import { Button } from "$lib/components/ui/button/index";
	import { Input } from "$lib/components/ui/input/index";
	import { superForm } from "sveltekit-superforms";
	import { onMount } from 'svelte';
	export let data;

	const { form, errors, enhance } = superForm(data.form);

	let formElement: HTMLFormElement;

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Tab' && !formElement.contains(document.activeElement)) {
			event.preventDefault();
			document.getElementById('name')?.focus();
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<div class="flex items-center justify-center pt-16">
	<Card.Root class="w-[350px]">
		<Card.Header>
			<Card.Title>Login</Card.Title>
			<Card.Description
				>Don't have an account? <a href="/register" class="text-primary">Register</a
				></Card.Description
			>
		</Card.Header>
		<form method="POST" use:enhance bind:this={formElement}>
			<Card.Content>
				<Input type="text" id="name" name="name" placeholder="Username" bind:value={$form.name} required />
				{#if $errors.name}<p class="text-red-500 text-sm mt-1">{$errors.name}</p>{/if}
				
				<div class="mt-4">
					<Input type="password" id="password" name="password" placeholder="Password" bind:value={$form.password} required />
					{#if $errors.password}<p class="text-red-500 text-sm mt-1">{$errors.password}</p>{/if}
				</div>
			</Card.Content>
			<Card.Footer>
				<Button type="submit" class="w-full">Login</Button>
			</Card.Footer>
		</form>
	</Card.Root>
</div>
