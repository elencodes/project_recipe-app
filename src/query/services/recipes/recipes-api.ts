import { baseApi } from '~/query/base-api.ts';
import { ENDPOINTS } from '~/query/constants/endpoints.ts';
import { METHODS } from '~/query/constants/methods.ts';

import {
    BookmarkRecipeResponse,
    CreateRecipeBody,
    CreateRecipeResponse,
    LikeRecipeResponse,
    PageParam,
    Recipe,
    RecipeByCategoryQueryParams,
    RecipeQueryParams,
    RecipeResponse,
    SaveDraftBody,
    SaveDraftResponse,
} from './types.ts';

export const recipesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRecipes: builder.query<RecipeResponse, RecipeQueryParams>({
            query: (params) => ({
                url: ENDPOINTS.recipes,
                method: METHODS.get,
                params,
            }),
            providesTags: ['Recipe', 'AllRecipes'],
        }),
        getRecipeByCategory: builder.query<RecipeResponse, RecipeByCategoryQueryParams>({
            query: ({ id, ...params }) => ({
                url: `${ENDPOINTS.recipesByCategory}/${id}`,
                params: params,
            }),
            providesTags: ['Recipe'],
        }),
        getRecipeById: builder.query<Recipe, string>({
            query: (id) => ({ url: `${ENDPOINTS.recipes}/${id}` }),
            providesTags: ['Recipe'],
        }),
        getRecipeByCategoryId: builder.infiniteQuery<
            RecipeResponse,
            RecipeByCategoryQueryParams,
            PageParam
        >({
            infiniteQueryOptions: {
                initialPageParam: { page: 1 },
                getNextPageParam(lastPage) {
                    if (!lastPage?.meta) return undefined;
                    const nextPage = lastPage.meta.page + 1;
                    return nextPage > lastPage.meta.totalPages ? undefined : { page: nextPage };
                },
            },
            query: ({ queryArg, pageParam }) => {
                const { id, ...restParams } = queryArg;
                const page = pageParam?.page || 1;
                return {
                    url: `${ENDPOINTS.recipesByCategory}/${id}`,
                    params: { ...restParams, page },
                };
            },
            providesTags: ['Recipe'],
        }),
        getRecipesInfinite: builder.infiniteQuery<
            RecipeResponse,
            RecipeQueryParams,
            { page: number }
        >({
            infiniteQueryOptions: {
                initialPageParam: { page: 1 },
                getNextPageParam(lastPage) {
                    const nextPage = lastPage.meta.page + 1;
                    return nextPage > lastPage.meta.totalPages ? undefined : { page: nextPage };
                },
            },
            query: ({ queryArg, pageParam }) => {
                const page = pageParam?.page || 1;
                return {
                    url: ENDPOINTS.recipes,
                    method: METHODS.get,
                    params: { ...queryArg, page },
                };
            },
            providesTags: ['Recipe'],
        }),
        getRecipesWithFilters: builder.query<RecipeResponse, RecipeQueryParams>({
            query: (params) => ({
                url: ENDPOINTS.recipes,
                method: METHODS.get,
                params,
            }),
            providesTags: ['Recipe'],
        }),
        createRecipe: builder.mutation<CreateRecipeResponse, CreateRecipeBody>({
            query: (body) => ({
                url: ENDPOINTS.recipes,
                method: METHODS.post,
                body,
            }),
            invalidatesTags: ['Recipe'],
        }),
        editRecipe: builder.mutation<CreateRecipeResponse, { id: string; body: CreateRecipeBody }>({
            query: ({ id, body }) => ({
                url: `${ENDPOINTS.recipes}/${id}`,
                method: METHODS.patch,
                body,
            }),
            invalidatesTags: ['Recipe', 'UserInfo'],
        }),
        saveDraft: builder.mutation<SaveDraftResponse, SaveDraftBody>({
            query: (body) => ({
                url: ENDPOINTS.saveDraft,
                method: METHODS.post,
                body,
            }),
            invalidatesTags: ['Recipe', 'UserInfo'],
        }),
        likeRecipe: builder.mutation<LikeRecipeResponse, string>({
            query: (id) => ({
                url: `${ENDPOINTS.recipes}/${id}${ENDPOINTS.like}`,
                method: METHODS.post,
            }),
            invalidatesTags: ['Recipe'],
        }),
        bookmarkRecipe: builder.mutation<BookmarkRecipeResponse, string>({
            query: (id) => ({
                url: `${ENDPOINTS.recipes}/${id}${ENDPOINTS.bookmark}`,
                method: METHODS.post,
            }),
            invalidatesTags: ['Recipe'],
        }),
        deleteRecipe: builder.mutation<void, string>({
            query: (id) => ({
                url: `${ENDPOINTS.recipes}/${id}`,
                method: METHODS.delete,
            }),
            invalidatesTags: ['AllRecipes'],
        }),
        editDraft: builder.mutation<SaveDraftResponse, { draftId: string; body: SaveDraftBody }>({
            query: ({ draftId, body }) => ({
                url: `${ENDPOINTS.editDraft}${draftId}`,
                method: METHODS.patch,
                body,
            }),
            invalidatesTags: ['UserInfo'],
        }),
        recommendRecipe: builder.mutation<void, string>({
            query: (id) => ({
                url: `${ENDPOINTS.recommendRecipe}/${id}`,
                method: METHODS.post,
            }),
            invalidatesTags: ['UserInfo', 'Recipe'],
        }),
    }),
});

export const {
    useGetRecipesQuery,
    useGetRecipeByCategoryQuery,
    useGetRecipeByIdQuery,
    useGetRecipeByCategoryIdInfiniteQuery,
    useGetRecipesInfiniteInfiniteQuery,
    useLazyGetRecipesWithFiltersQuery,
    useCreateRecipeMutation,
    useEditRecipeMutation,
    useSaveDraftMutation,
    useLikeRecipeMutation,
    useBookmarkRecipeMutation,
    useDeleteRecipeMutation,
    useEditDraftMutation,
    useRecommendRecipeMutation,
} = recipesApi;
