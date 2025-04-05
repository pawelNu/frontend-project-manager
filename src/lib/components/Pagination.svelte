<script lang="ts">
  export type PaginationType = {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number;
  };

  //   TODO add setting page size
  export type PageActions = {
    setPageNumber: (pageNum: number | null) => void;
  };

  let { pagination, actions }: { pagination: PaginationType; actions: PageActions } = $props();

  function getDisabledStyle(pageNum: number | null): string {
    if (pageNum === null) {
      return 'uk-disabled';
    } else if (pagination.prev !== null && pageNum === pagination.prev + 1) {
      return 'uk-disabled';
    }
    return '';
  }
</script>

<nav aria-label="Pagination" class="mt-5">
  <ul class="uk-pgn uk-pgn-default justify-center">
    <li class={getDisabledStyle(pagination.prev)}>
      <button aria-label="placeholder" onclick={() => actions.setPageNumber(pagination.prev)}>
        <span data-uk-pgn-previous></span>
      </button>
    </li>
    <li class={getDisabledStyle(pagination.prev)}>
      <button onclick={() => actions.setPageNumber(pagination.first)}>{pagination.first}</button>
    </li>
    <li class="uk-disabled"><span>...</span></li>
    <li class={getDisabledStyle(pagination.prev)}>
      <button onclick={() => actions.setPageNumber(pagination.prev)}>{pagination.prev}</button>
    </li>
    <li class="uk-active">
      <span aria-current="page"
        >{pagination.prev === null ? pagination.first : pagination.prev + 1}</span
      >
    </li>
    <li class={pagination.next === null ? 'uk-disabled' : ''}>
      <button onclick={() => actions.setPageNumber(pagination.next)}>{pagination.next}</button>
    </li>
    <li class="uk-disabled"><span>...</span></li>
    <li class={getDisabledStyle(pagination.next)}>
      <button onclick={() => actions.setPageNumber(pagination.last)}>{pagination.last}</button>
    </li>
    <li class={getDisabledStyle(pagination.next)}>
      <button aria-label="placeholder" onclick={() => actions.setPageNumber(pagination.next)}>
        <span data-uk-pgn-next></span>
      </button>
    </li>
  </ul>
</nav>
