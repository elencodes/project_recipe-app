import { LoaderFunction } from 'react-router';

import { store } from '~/redux/configure-store';
import { clearAllergens } from '~/redux/slices/allergens-slice.ts';
import { clearAuthors } from '~/redux/slices/authors-slice.ts';
import { clearSelectedCategories } from '~/redux/slices/category-slice.ts';
import { clearSides } from '~/redux/slices/garnish-slice.ts';
import { clearMeats } from '~/redux/slices/meat-slice.ts';
import {
    clearFilteredRecipes,
    clearPage,
    setIsFiltering,
    setShowedEmptyText,
} from '~/redux/slices/recipes-slice.ts';
import { clearInputValue, clearSearchValue, setInputValue } from '~/redux/slices/search-slice.ts';

export const clearStateLoader: LoaderFunction = async () => {
    store.dispatch(clearFilteredRecipes());
    store.dispatch(clearSelectedCategories());
    store.dispatch(clearAuthors());
    store.dispatch(clearMeats());
    store.dispatch(clearSides());
    store.dispatch(clearAllergens());
    store.dispatch(setShowedEmptyText(false));
    store.dispatch(setIsFiltering(false));
    store.dispatch(setInputValue(''));
    store.dispatch(clearPage());
    store.dispatch(clearInputValue());
    store.dispatch(clearSearchValue());
};
