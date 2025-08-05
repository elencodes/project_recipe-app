import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authorizationApi, baseApi } from '~/query/base-api.ts';

import { allergensReducer, allergensSlice } from './slices/allergens-slice.ts';
import appReducer, { appSlice } from './slices/app-slice.ts';
import { authReducer, authSlice } from './slices/auth-slice.ts';
import { authorsReducer, authorsSlice } from './slices/authors-slice.ts';
import { categoryReducer, categorySlice } from './slices/category-slice.ts';
import { garnishReducer, garnishSlice } from './slices/garnish-slice.ts';
import { meatReducer, meatSlice } from './slices/meat-slice.ts';
import { recipesReducer, recipesSlice } from './slices/recipes-slice.ts';
import { searchReducer, searchSlice } from './slices/search-slice.ts';
import { subscriptionsReducer, subscriptionsSlice } from './slices/subscriptions-slice.ts';
import { userRecipesReducer, userRecipesSlice } from './slices/user-recipes-slice.ts';

const isProduction = false;

const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [authorizationApi.reducerPath]: authorizationApi.reducer,
    [allergensSlice.name]: allergensReducer,
    [authorsSlice.name]: authorsReducer,
    [categorySlice.name]: categoryReducer,
    [garnishSlice.name]: garnishReducer,
    [meatSlice.name]: meatReducer,
    [recipesSlice.name]: recipesReducer,
    [searchSlice.name]: searchReducer,
    [authSlice.name]: authReducer,
    [subscriptionsSlice.name]: subscriptionsReducer,
    [userRecipesSlice.name]: userRecipesReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware, authorizationApi.middleware),
    devTools: !isProduction,
});
