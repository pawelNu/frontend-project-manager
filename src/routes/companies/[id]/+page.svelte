<script lang="ts">
  import { page } from '$app/state';
  import {
    getCompanyAddressesByCompanyId,
    getCompanyById,
    type Address,
    type Company
  } from '$lib/api/company';
  import { onMount } from 'svelte';

  let company: Company | null = $state(null);
  let addresses: Address[] = $state([]);
  let companyId = page.params.id;
  const loadData = async () => {
    const companyData = await getCompanyById(companyId);
    if (companyData.success) {
      company = companyData.data;
    }
    const companyAddressesData = await getCompanyAddressesByCompanyId(company?.id);
    if (companyAddressesData.success) {
      addresses = companyAddressesData.data;
    }
  };
  onMount(loadData);
</script>

<!-- TODO add more info about company: address, contacts... -->
<!-- TODO start here -->

<h1 class="uk-h3">Company details:</h1>
<div class="m-4">
  <h1>Company ID: {company?.id}</h1>
  <p>name: {company?.name}</p>
  <p>nip: {company?.nip}</p>
  <p>regon: {company?.regon}</p>
  <p>website: {company?.website}</p>
</div>
<h1 class="uk-h3">Addresses:</h1>
<div class="m-4">
  {#each addresses as address}
    <div class="uk-card uk-card-body max-w-sm">
      <h3 class="uk-card-title">{address.city}</h3>
      <p>{address.street}</p>
      <p>{address.postalCode}</p>
    </div>
  {/each}
</div>
