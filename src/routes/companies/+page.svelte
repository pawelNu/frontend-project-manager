<script lang="ts">
  import { onMount } from 'svelte';
  import { generateCompanies, type Company } from '$lib/data-generator/generator';

  let companies: Company[] = [];

  onMount(async () => {
    const response = await fetch('http://localhost:5000/companies');
    if (response.ok) {
      companies = (await response.json()) as Company[];
    } else {
      console.error('Błąd podczas ładowania danych:', response.status);
    }
    // console.log(JSON.stringify(companies, null, 2));
  });
</script>

<!-- TODO finish here -->
<!-- TODO list all companies -->

<h1>All companies page</h1>

{#if companies.length === 0}
  <p>Ładowanie danych...</p>
{:else}
  <ul>
    {#each companies as company}
      <li>
        <strong>{company.name}</strong> - {company.nip}
      </li>
    {/each}
  </ul>
{/if}
