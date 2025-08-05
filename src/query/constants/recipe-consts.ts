import { SortBy, SortOrder } from '../services/recipes/types';

export const NEWEST_RECIPES_LIMIT = 10;
export const JUICIEST_RECIPES_LIMIT = 8;
export const JUICIEST_RECIPES_MAIN_PAGE_LIMIT = 4;
export const FILTER_RECIPES_LIMIT = 8;
export const RANDOM_CATEGORY_RECIPES_LIMIT = 5;
export const INITIAL_PAGE_NUM = 1;

export const JUICIEST_PARAMS = {
    sortBy: SortBy.LIKES,
    limit: JUICIEST_RECIPES_MAIN_PAGE_LIMIT,
    sortOrder: SortOrder.DESC,
};

export const NEWEST_PARAMS = {
    limit: NEWEST_RECIPES_LIMIT,
    sortBy: SortBy.DATE,
};

export const JUICIEST_PAGE_PARAMS = {
    sortBy: SortBy.LIKES,
    limit: JUICIEST_RECIPES_LIMIT,
    sortOrder: SortOrder.DESC,
};
