import { baseApi } from '~/query/base-api';
import { ENDPOINTS } from '~/query/constants/endpoints';
import { METHODS } from '~/query/constants/methods';
import { setUserRecipes } from '~/redux/slices/user-recipes-slice';
import { transformBlogsResponse } from '~/utils/transform-blogs-response';

import { BloggerInfo, BlogsBody, BlogsResponse, RecipesByUserIdResponse } from './types';

export const blogsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query<BlogsResponse, BlogsBody>({
            query: (params) => ({
                url: ENDPOINTS.blogs,
                method: METHODS.get,
                params,
            }),
            transformResponse: transformBlogsResponse,
            providesTags: ['Blogs'],
        }),
        toggleSubscription: builder.mutation<void, { fromUserId: string; toUserId: string }>({
            query: (body) => ({
                url: ENDPOINTS.subscription,
                method: METHODS.patch,
                body,
            }),
            invalidatesTags: ['Blogs'],
        }),
        getBloggerById: builder.query<BloggerInfo, { bloggerId: string; currentUserId: string }>({
            query: ({ bloggerId, currentUserId }) => ({
                url: `${ENDPOINTS.blogs}/${bloggerId}`,
                method: METHODS.get,
                params: { currentUserId },
            }),
            providesTags: ['Blogs'],
        }),
        getRecipeByUserId: builder.query<RecipesByUserIdResponse, string>({
            query: (id) => ({ url: `${ENDPOINTS.recipeByUser}${id}` }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        setUserRecipes({
                            bookmarks: data.myBookmarks || [],
                            notes: data.notes || [],
                        }),
                    );
                } catch (error) {
                    console.error('Failed to save recipes to store:', error);
                }
            },
        }),
    }),
});

export const {
    useGetBlogsQuery,
    useToggleSubscriptionMutation,
    useGetBloggerByIdQuery,
    useGetRecipeByUserIdQuery,
} = blogsApi;
