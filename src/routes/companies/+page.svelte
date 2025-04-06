<script lang="ts">
  import { page } from '$app/state';
  import { getCompanies, type Company } from '$lib/api/company';
  import Pagination, { type PaginationType } from '$lib/components/Pagination.svelte';
  import { generateData } from '$lib/generator';
  import { onMount } from 'svelte';

  export const paginationState: PaginationType = {
    first: 1,
    prev: null,
    current: 1,
    next: null,
    last: 1,
    pages: 1,
    items: 1,
    pageSize: 10
  };

  let companies: Company[] = $state([]);
  let pagination: PaginationType = $state(paginationState);

  function setPageNumber(pageNum: number | null) {
    if (pageNum !== null) {
      pagination.current = pageNum;
      loadData();
    }
  }
  function setPageSize(size: number | null) {
    if (size !== null) {
      pagination.pageSize = size;
      loadData();
    }
  }

  const loadData = async () => {
    // const test = generateData(10);
    const result = await getCompanies(pagination.current, pagination.pageSize);
    if (result.success) {
      companies = result.data.data;
      pagination = {
        first: result.data.first,
        prev: result.data.prev,
        current: result.data.prev === null ? result.data.first : result.data.prev + 1,
        next: result.data.next,
        last: result.data.last,
        pages: result.data.pages,
        items: result.data.items,
        pageSize: pagination.pageSize
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
        <a href={`${page.url.pathname}/${company.id}`}>Link</a>
      </li>
    {/each}
  </ul>
  <Pagination {pagination} actions={{ setPageNumber, setPageSize }} />
{/if}
