<script lang="ts">
  import { page } from '$app/state';
  import { getCompanyById, type Company } from '$lib/api/company';
  import { onMount } from 'svelte';
  import { compileModule } from 'svelte/compiler';

  let company: Company | null = $state(null);
  let companyId = page.params.id;
  const loadData = async () => {
    // const test = generateData(30);
    const result = await getCompanyById(companyId);
    if (result.success) {
      company = result.data;
    }
  };
  onMount(loadData);
</script>

<h1>Company ID: {company?.id}</h1>
<p>name: {company?.name}</p>
<p>nip: {company?.nip}</p>
<p>regon: {company?.regon}</p>
<p>website: {company?.website}</p>
