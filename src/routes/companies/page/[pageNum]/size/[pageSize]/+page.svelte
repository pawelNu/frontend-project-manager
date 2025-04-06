<script lang="ts">
  import { page } from '$app/state';
  import { getCompanies, type Company } from '$lib/api/company';
  import Pagination, { type PaginationType } from '$lib/components/Pagination.svelte';
  import { generateData } from '$lib/generator';
  import { onMount } from 'svelte';
  import { pushState } from '$app/navigation';

  const { pageNum, pageSize } = page.params;
  console.log(' loadData   pageNum:', pageNum);
  console.log(' loadData   pageSize:', pageSize);

  export const paginationState: PaginationType = {
    first: 1,
    prev: null,
    current: parseInt(pageNum) || 1,
    next: null,
    last: 1,
    pages: 1,
    items: 1,
    pageSize: parseInt(pageSize) || 10
  };

  let companies: Company[] = $state([]);
  let pagination: PaginationType = $state(paginationState);

  function setPageNumberAndSize(pageNum: number | null, pageSize: number) {
    if (pageNum !== null) {
      pushState(`/companies/page/${pageNum}/size/${pageSize}`, {});
      pagination.current = pageNum;
      pagination.pageSize = pageSize;
      loadData();
    }
  }

  const loadData = async () => {
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

  $effect(() => {
    const { pageNum, pageSize } = page.params;
    // Tylko jeśli parametry są inne, ładujemy dane
    if (pageNum && pageSize) {
      //   loadData(); // Załaduj dane tylko wtedy, gdy parametry się zmieniły
    }
  });

  onMount(loadData);
</script>

<h1>All companies page</h1>

{#if companies.length === 0}
  <p>Ładowanie danych...</p>
{:else}
  <table class="uk-table uk-table-divider uk-table-hover">
    <thead>
      <tr>
        <th>Name</th>
        <th>Nip</th>
        <th>Regon</th>
        <th>Website</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      {#each companies as company}
        <tr>
          <td>{company.name}</td>
          <td>{company.nip}</td>
          <td>{company.regon}</td>
          <td>{company.website}</td>
          <td><a href={`/companies/${company.id}`} class="uk-link-text">Details</a></td>
        </tr>
      {/each}
    </tbody>
  </table>

  <Pagination {pagination} actions={{ setPageNumberAndSize }} />
{/if}
