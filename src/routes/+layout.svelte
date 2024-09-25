<script lang="ts">
	import "../app.css";
	import { ModeWatcher } from "mode-watcher";
	import Navigation from "$lib/components/navigation/navigation.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<ModeWatcher />

<Navigation user={data.user} />

<slot />