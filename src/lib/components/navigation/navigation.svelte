<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Sun, Moon, ShoppingCart, Menu, User, LogOut } from "lucide-svelte";
	import { Sheet, SheetContent, SheetTrigger } from "$lib/components/ui/sheet";
	import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
	import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "$lib/components/ui/dropdown-menu";
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
						<Button variant="secondary" size="sm" href="/login">
							Login
						</Button>
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
				{#if user}
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Avatar>
								<AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
								<AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<div class="px-2 py-1.5 text-sm">
								<p class="font-semibold">{user.firstName} {user.lastName}</p>
								<p class="text-muted-foreground">{user.email}</p>
							</div>
							<DropdownMenuItem>
								<a href="/account" class="w-full text-sm flex items-center">
										<User class="h-4 w-4 mr-2" />
										Account
								</a>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<form action="/logout" method="POST" class="w-full">
									<button type="submit" class="w-full text-left text-sm flex items-center">
										<LogOut class="h-4 w-4 mr-2" />
										Logout
									</button>
								</form>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				{/if}
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
									<Button href="/login">Login</Button>
								{:else}
									<a href="/">{user.firstName} {user.lastName}</a>
									<form action="/logout" method="POST">
										<Button type="submit" class="outline w-full">Logout</Button>
									</form>
									<Avatar>
										<AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
										<AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
									</Avatar>
								{/if}
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</div>
	</div>
</nav>