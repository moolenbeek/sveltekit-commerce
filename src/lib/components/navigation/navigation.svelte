<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Sun, Moon, ShoppingCart, Menu } from "lucide-svelte";
	import { Sheet, SheetContent, SheetTrigger } from "$lib/components/ui/sheet";
	import { writable } from 'svelte/store';
	import { onMount } from "svelte";

	export let user: any;

	let isDarkMode: boolean;
	let isMenuOpen = writable(false);

	onMount(() => {
		isDarkMode = document.documentElement.classList.contains("dark");
	});

	function toggleDarkMode() {
		isDarkMode = !isDarkMode;
		document.documentElement.classList.toggle("dark", isDarkMode);
	}

	$: if (isDarkMode !== undefined) {
		document.documentElement.classList.toggle("dark", isDarkMode);
	}

	function toggleMenu() {
		isMenuOpen.update(value => !value);
	}
</script>

<nav class="border-b bg-background">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<a href="/" class="text-xl font-bold">website</a>
			<div class="flex items-center space-x-4">
				<div class="hidden sm:flex items-center space-x-4">
					{#if !user}
						<a href="/login" class="text-sm font-medium hover:text-primary">Login</a>
					{:else}
						<a href="/account" class="text-sm font-medium hover:text-primary">{user.firstName} {user.lastName}</a>
						<form action="/logout" method="POST">
							<Button type="submit" class="outline">Logout</Button>
						</form>
					{/if}
				</div>
				<Button variant="ghost" size="icon" on:click={toggleDarkMode}>
					{#if isDarkMode}
						<Sun class="h-[1.2rem] w-[1.2rem]" />
					{:else}
						<Moon class="h-[1.2rem] w-[1.2rem]" />
					{/if}
				</Button>
				<Button variant="ghost" size="icon" on:click={() => window.location.href = '/cart'}>
					<ShoppingCart class="h-[1.2rem] w-[1.2rem]" />
				</Button>
				<div class="sm:hidden">
					<Sheet bind:open={$isMenuOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" on:click={toggleMenu}>
								<Menu class="h-[1.2rem] w-[1.2rem]" />
							</Button>
						</SheetTrigger>
						<SheetContent>
							<nav class="flex flex-col space-y-4">
								{#if !user}
									<a href="/login" class="text-sm font-medium hover:text-primary">Login</a>
								{:else}
									<a href="/">{user.firstName} {user.lastName}</a>
									<form action="/logout" method="POST">
										<Button type="submit" class="outline w-full">Logout</Button>
									</form>
								{/if}
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</div>
	</div>
</nav>