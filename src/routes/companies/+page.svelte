<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { onMount } from 'svelte';

  onMount(() => {
    const currentUrl = page.url.pathname;
    if (currentUrl === '/companies') {
      goto('/companies/page/1/size/10');
    }
  });
</script>

<h1>Przekierowanie</h1>
