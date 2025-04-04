<script lang="ts">
  import MainMenu2 from './MainMenu.svelte';

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' }
  ];
</script>

<!-- <nav class="navbar">
  {#each links as link}
    <a href={link.href} class={page.url.pathname.startsWith(link.href) ? 'active' : ''}>
      {link.label}
    </a>
  {/each}
</nav> -->
<!-- TODO create main menu with links -->
<!-- TODO create all ticket page -->
<!-- TODO create single ticket page -->

<ul class="uk-tab navbar-font" data-uk-tab>
  <!-- <li class="uk-active"><a href="/">Active</a></li> -->
  <li class="uk-active">
    <!-- <MainMenu /> -->
    <MainMenu2 />
  </li>
  <li><a href="/">Item</a></li>
  <li>
    <a href="/">
      <span class="mr-2">More</span>
      <uk-icon icon="chevron-down"></uk-icon>
    </a>
    <div class="uk-drop min-w-52" data-uk-dropdown="mode: click">
      <ul class="uk-nav uk-dropdown-nav">
        <li class="uk-active"><a href="/">Active</a></li>
        <li><a href="/">Item</a></li>
        <li class="uk-nav-header">Header</li>
        <li><a href="/">Item</a></li>

        <li class="uk-nav-divider"></li>
        <li><a href="/">Item</a></li>
      </ul>
    </div>
  </li>
</ul>
