import { baseApi } from '~/query/base-api.ts';
import { ENDPOINTS } from '~/query/constants/endpoints.ts';
import { METHODS } from '~/query/constants/methods';
import { Note } from '~/query/services/blogs/types.ts';
import {
    CreateNoteRequest,
    DeleteNoteResponse,
    MeasureUnitsResponse,
    StatisticResponse,
    UpdatePasswordRequest,
    UpdateUserName,
    UserAllResponse,
    UserInfoResponse,
} from '~/query/services/user/types.ts';
import { setUserBookmarks, setUserSubscribers } from '~/redux/slices/user-recipes-slice.ts';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMeasureUnits: builder.query<MeasureUnitsResponse, void>({
            query: () => ({
                url: ENDPOINTS.measureUnits,
                method: METHODS.get,
            }),
        }),
        getUserInfo: builder.query<UserInfoResponse, void>({
            query: () => ({
                url: ENDPOINTS.userInfo,
                method: METHODS.get,
            }),
            transformResponse: (response: UserInfoResponse) => ({
                ...response,
                totalSubscribers: response.subscribers?.length || 0,
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                const { data } = await queryFulfilled;
                const totalSubscribers = data.subscribers?.length || 0;
                dispatch(setUserSubscribers(totalSubscribers));
            },
            providesTags: ['UserInfo'],
        }),
        getUserAll: builder.query<UserAllResponse[], void>({
            query: () => ({
                url: ENDPOINTS.usersAll,
                method: METHODS.get,
            }),
        }),
        getStatistic: builder.query<StatisticResponse, void>({
            query: () => ({
                url: ENDPOINTS.statistic,
                method: METHODS.get,
            }),
            transformResponse: (response: StatisticResponse) => {
                const totalLikes = response.likes?.reduce((acc, item) => acc + item.count, 0) || 0;
                const totalBookmarks =
                    response.bookmarks?.reduce((acc, item) => acc + item.count, 0) || 0;

                return {
                    ...response,
                    totalLikes,
                    totalBookmarks,
                };
            },
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                const { data } = await queryFulfilled;
                const totalBookmarks =
                    data.bookmarks?.reduce((acc, item) => acc + item.count, 0) || 0;
                dispatch(setUserBookmarks(totalBookmarks));
            },
            providesTags: ['UserInfo'],
        }),
        createNote: builder.mutation<Note, CreateNoteRequest>({
            query: (body) => ({
                url: ENDPOINTS.createNote,
                method: METHODS.post,
                body,
            }),
            invalidatesTags: ['UserInfo'],
        }),
        deleteNote: builder.mutation<DeleteNoteResponse, string>({
            query: (noteId) => ({
                url: `${ENDPOINTS.createNote}/${noteId}`,
                method: METHODS.delete,
            }),
        }),
        uploadUserPhoto: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: ENDPOINTS.uploadUserPhoto,
                method: METHODS.post,
                body: formData,
            }),
            invalidatesTags: ['UserInfo'],
        }),
        updateUserInfo: builder.mutation<void, UpdateUserName>({
            query: (body) => ({
                url: ENDPOINTS.updateUserInfo,
                method: METHODS.patch,
                body,
            }),
            invalidatesTags: ['UserInfo'],
        }),
        updateUserPassword: builder.mutation<void, UpdatePasswordRequest>({
            query: (body) => ({
                url: ENDPOINTS.updateUserPassword,
                method: METHODS.patch,
                body,
            }),
        }),
        deleteAccount: builder.mutation<void, void>({
            query: () => ({
                url: ENDPOINTS.deleteAccount,
                method: METHODS.delete,
            }),
        }),
    }),
});

export const {
    useGetMeasureUnitsQuery,
    useGetUserInfoQuery,
    useGetUserAllQuery,
    useGetStatisticQuery,
    useCreateNoteMutation,
    useDeleteNoteMutation,
    useUploadUserPhotoMutation,
    useUpdateUserInfoMutation,
    useUpdateUserPasswordMutation,
    useDeleteAccountMutation,
} = userApi;
