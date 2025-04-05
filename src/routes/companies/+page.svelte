<script lang="ts">
  import { getCompanies, type Company } from '$lib/api/company';
  import Pagination, { type PaginationType } from '$lib/components/Pagination.svelte';
  import { onMount } from 'svelte';

  export const paginationState: PaginationType = {
    first: 1,
    prev: null,
    next: null,
    last: 1,
    pages: 1,
    items: 1
  };

  let companies: Company[] = $state([]);
  let pagination: PaginationType = $state(paginationState);
  let pageNumber: number = $state(1);
  let pageSize: number = $state(3);

  function nextPage() {
    if (pagination.next !== null) {
      pageNumber = pagination.next;
      loadData(); // np. oddzielna funkcja
    }
  }

  function previousPage() {
    if (pagination.prev !== null) {
      pageNumber = pagination.prev;
      loadData();
    }
  }

  const loadData = async () => {
    // const test = generateData(2);
    const result = await getCompanies(pageNumber, pageSize);
    if (result.success) {
      companies = result.data.data;
      pagination = {
        first: result.data.first,
        prev: result.data.prev,
        next: result.data.next,
        last: result.data.last,
        pages: result.data.pages,
        items: result.data.items
      };
    }
  };
  onMount(loadData);
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
  <Pagination {pagination} actions={{ previousPage, nextPage }} />
{/if}
