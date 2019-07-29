interface PaginationModuleStateInterface {
    _itemCount: number | null;
    _offset: number | null;
    _limit: number | null;
    _url: string | null;
}
export const state = (): PaginationModuleStateInterface => {
    return {
        _itemCount: null,
        _offset: null,
        _limit: null,
        _url: null,
    };
};
export const mutations = {
    setItemCount(state: PaginationModuleStateInterface, newItemCount: number): void {
        state._itemCount = newItemCount;
    },
    setOffset(state: PaginationModuleStateInterface, newOffset: number): void {
        state._offset = newOffset;
    },
    setLimit(state: PaginationModuleStateInterface, newLimit: number): void {
        state._limit = newLimit;
    },
    updateUrl(state: PaginationModuleStateInterface): void {
        state._url = `https://pokeapi.co/api/v2/pokemon/?offset=${state._offset}&limit=${state._limit}`;
    },
};
export const getters = {
    itemCount: (state: PaginationModuleStateInterface): number | null => state._itemCount,
    pageCount: (state: PaginationModuleStateInterface): number | null => Math.ceil(state._itemCount! / state._limit!),
    currentPage: (state: PaginationModuleStateInterface): number | null => Math.ceil(state._offset! / state._limit! + 1),
    offset: (state: PaginationModuleStateInterface): number | null => state._offset,
    limit: (state: PaginationModuleStateInterface): number | null => state._limit,
    url: (state: PaginationModuleStateInterface): string | null => state._url,
};