<script lang="ts">
  export type PaginationType = {
    first: number;
    prev: number | null;
    current: number;
    next: number | null;
    last: number;
    pages: number;
    items: number;
    pageSize: number;
  };

  export type PageActions = {
    setPageNumberAndSize: (num: number | null, size: number) => void;
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

  let pageSize: number = $state(pagination.pageSize);

  function changePageNumberAndSize(e: Event, num: number | null, size: number) {
    e.preventDefault();
    if (num !== null) {
      actions.setPageNumberAndSize(num, size);
      pageSize = size;
    }
  }
</script>

<nav aria-label="Pagination" class="mt-5 flex justify-center">
  <div>
    <ul class="uk-pgn uk-pgn-default justify-center">
      <li class={getDisabledStyle(pagination.prev)}>
        <!-- <button onclick={() => actions.setPageNumber(pagination.first)}>{pagination.first}</button> -->
        <button onclick={(e) => changePageNumberAndSize(e, pagination.first, pageSize)}
          >{pagination.first}</button
        >
      </li>
      <li class={getDisabledStyle(pagination.prev)}>
        <!-- <button aria-label="placeholder" onclick={() => actions.setPageNumber(pagination.prev)}> -->
        <button
          aria-label="placeholder"
          onclick={(e) => changePageNumberAndSize(e, pagination.prev, pageSize)}
        >
          <span data-uk-pgn-previous></span>
        </button>
      </li>
      <li class="uk-active">
        <span aria-current="page">{pagination.current}</span>
      </li>
      <li class={getDisabledStyle(pagination.next)}>
        <!-- <button aria-label="placeholder" onclick={() => actions.setPageNumber(pagination.next)}> -->
        <button
          aria-label="placeholder"
          onclick={(e) => changePageNumberAndSize(e, pagination.next, pageSize)}
        >
          <span data-uk-pgn-next></span>
        </button>
      </li>
      <li class={getDisabledStyle(pagination.next)}>
        <!-- <button onclick={() => actions.setPageNumber(pagination.last)}>{pagination.last}</button> -->
        <button onclick={(e) => changePageNumberAndSize(e, pagination.last, pageSize)}
          >{pagination.last}</button
        >
      </li>
    </ul>
  </div>
  <div>
    <button class="uk-btn uk-btn-default" type="button">Page size: {pageSize}</button>
    <div class="uk-drop uk-dropdown min-w-36" data-uk-dropdown="mode: click">
      <ul class="uk-dropdown-nav uk-nav">
        {#each [5, 10, 25, 50] as pageSize}
          <li>
            <!-- <a href="/" onclick={(e) => changePageSize(e, pageSize)}>{pageSize}</a> -->
            <a href="/" onclick={(e) => changePageNumberAndSize(e, pagination.first, pageSize)}
              >{pageSize}</a
            >
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>
