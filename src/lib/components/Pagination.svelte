<script lang="ts">
  export type PaginationType = {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number;
  };

  export type PageActions = {
    nextPage: () => void;
    previousPage: () => void;
  };
  //     let { increment, decrement }: Props = $props();

  let { pagination, actions }: { pagination: PaginationType; actions: PageActions } = $props();
</script>

<nav aria-label="Pagination" class="mt-5">
  <ul class="uk-pgn uk-pgn-default justify-center">
    <li>
      <button aria-label="placeholder" onclick={actions.previousPage}>
        <span data-uk-pgn-previous></span>
      </button>
    </li>
    <li><button>{pagination.first}</button></li>
    <li class="uk-disabled"><span>...</span></li>
    <li class={pagination.prev === null ? 'uk-disabled' : ''}>
      <button onclick={actions.previousPage}>{pagination.prev}</button>
    </li>
    <li class="uk-active">
      <span aria-current="page"
        >{pagination.prev === null ? pagination.first : pagination.prev + 1}</span
      >
    </li>
    <li class={pagination.next === null ? 'uk-disabled' : ''}>
      <button onclick={actions.nextPage}>{pagination.next}</button>
    </li>
    <li class="uk-disabled"><span>...</span></li>
    <li><button>{pagination.last}</button></li>
    <li>
      <button aria-label="placeholder" onclick={actions.nextPage}>
        <span data-uk-pgn-next></span>
      </button>
    </li>
  </ul>
</nav>
