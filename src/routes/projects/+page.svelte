<script lang="ts">
	import { onMount } from 'svelte';
	import type { Item } from '$lib/types';

	let items: Item[] = [];

	onMount(async () => {
		const response = await fetch('http://localhost:5000/projects');
		if (response.ok) {
			items = (await response.json()) as Item[];
		} else {
			console.error('Błąd podczas ładowania danych:', response.status);
		}
	});
</script>

<h1>Lista Obiektów</h1>

{#if items.length === 0}
	<p>Ładowanie danych...</p>
{:else}
	<ul>
		{#each items as item}
			<li>
				<strong>{item.name}</strong> - {item.description}
			</li>
		{/each}
	</ul>
{/if}
