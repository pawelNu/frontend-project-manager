<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar />

<div class="uk-container uk-container-expand m-10">
  <slot />
</div>

<Footer />
