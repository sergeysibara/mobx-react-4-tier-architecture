import { observable, action, makeObservable, toJS } from 'mobx';
import { ObjectType } from '../types';

// Format description - https://github.com/typicode/json-server#filter
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IFiltersState extends Record<string, unknown> {}

// Format description - https://github.com/typicode/json-server#paginate
export type PagingStateType = {
  _start?: number; // offset from first element in server search results
  _page?: number; // page number
  _limit?: number; // page size
};

// Format description - https://github.com/typicode/json-server#sort
export type SortingStateType = {
  _sort?: string;
  _order?: string;
};

/**
 * Base class for stores with search params (sorting, paging, filtration).
 */
export default class SearchParamsStore<T extends IFiltersState> {
  @observable
  protected filtersState: T = {} as T;

  @observable
  protected pagingState: PagingStateType = {
    _limit: 5,
  };

  @observable
  protected sortingState: SortingStateType = {
    _sort: 'title',
    _order: 'asc',
  };

  constructor(
    filters?: T,
    paging?: PagingStateType,
    sorting?: SortingStateType,
  ) {
    makeObservable(this);
    if (filters) {
      this.filtersState = filters;
    }

    if (sorting) {
      this.sortingState = sorting;
    }

    if (paging) {
      this.pagingState = paging;
    }
  }

  getFilters(): T {
    return this.filtersState;
  }

  getSearchParamsMergedToJS(): ObjectType {
    return {
      ...toJS(this.filtersState),
      ...toJS(this.pagingState),
      ...toJS(this.sortingState),
    };
  }

  @action
  setFilters(filters: ObjectType, merge = true) {
    if (merge) {
      this.filtersState = { ...this.filtersState, ...filters };
    } else {
      this.filtersState = filters as T;
    }
  }
}

export type SearchParamsStoreType = SearchParamsStore<IFiltersState>;
