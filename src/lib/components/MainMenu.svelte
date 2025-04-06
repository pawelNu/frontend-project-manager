<script lang="ts">
  import { page } from '$app/state';
  import ThemeButton from './ThemeButton.svelte';

  type LinkType = {
    label: string;
    links: {
      label: string;
      href: string;
    }[];
  };

  const links: LinkType[] = [
    { label: 'Home', links: [{ label: 'Home', href: '/' }] },
    {
      label: 'Companies',
      links: [
        { label: 'All companies', href: '/companies' },
        { label: 'Add company', href: '/companies/add' }
      ]
    },
    {
      label: 'About',
      links: [
        { label: 'About', href: '/about' },
        { label: 'About test', href: '/about-test' }
      ]
    }
  ];
</script>

<button
  class="uk-btn uk-btn-default mr-2"
  type="button"
  data-uk-toggle="target: #offcanvas-nav-primary"
>
  Main menu
</button>

<div id="offcanvas-nav-primary" data-uk-offcanvas="overlay: false">
  <div class="uk-offcanvas-bar p-4">
    <ul class="uk-nav-center uk-nav uk-nav-primary">
      <ul class="uk-accordion" data-uk-accordion>
        {#each links as link}
          {@render menuItemFromLink(link)}
        {/each}
        <li><ThemeButton /></li>
      </ul>
    </ul>
  </div>
</div>

{#snippet menuItemFromLink(link: LinkType)}
  <li class={link.links.some((subLink) => page.url.pathname === subLink.href) ? 'uk-open' : ''}>
    <a class="uk-accordion-title" href="/href-placeholder">
      {link.label}
      <span class="uk-accordion-icon">
        <uk-icon icon="chevron-down"></uk-icon>
      </span>
    </a>
    <div class="uk-accordion-content">
      <ul class="uk-nav uk-nav-primary">
        {#each link.links as menuLink}
          <li class={page.url.pathname === menuLink.href ? 'uk-active' : ''}>
            <a href={menuLink.href}>{menuLink.label}</a>
          </li>
        {/each}
      </ul>
    </div>
  </li>
{/snippet}
