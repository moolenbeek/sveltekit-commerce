<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Sun, Moon, ShoppingCart, User, LogOut } from "lucide-svelte";
	import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
	import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "$lib/components/ui/dropdown-menu";
	import { onMount } from "svelte";

	export let user: any;

	let isDarkMode: boolean;

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
</script>

<nav class="border-b bg-background">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<a href="/" class="text-xl font-bold">website</a>
			<div class="flex items-center space-x-4">
				{#if !user}
					<Button variant="secondary" size="sm" href="/login">
						Login
					</Button>
				{/if}
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
			</div>
		</div>
	</div>
</nav>