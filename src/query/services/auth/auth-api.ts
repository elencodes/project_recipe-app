import { authorizationApi } from '~/query/base-api.ts';
import { ACCESS_TOKEN_HEADER } from '~/query/constants/auth-consts.ts';
import { ENDPOINTS } from '~/query/constants/endpoints.ts';
import { METHODS } from '~/query/constants/methods.ts';
import { resetAuth, setAccessToken } from '~/redux/slices/auth-slice';
import {
    AuthResponse,
    ForgotPasswordBody,
    ResetPasswordBody,
    SignInBody,
    SignUpBody,
    VerifyOtpBody,
} from '~/types/auth-types';

export const authApi = authorizationApi.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<AuthResponse, SignInBody>({
            query: (body) => ({
                url: ENDPOINTS.login,
                method: METHODS.post,
                body,
                credentials: 'include',
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { meta } = await queryFulfilled;
                    const accessToken = meta?.response?.headers.get(ACCESS_TOKEN_HEADER);

                    if (!accessToken) {
                        throw new Error(`There is no ${ACCESS_TOKEN_HEADER} in response`);
                    }

                    dispatch(setAccessToken(accessToken));
                } catch (error) {
                    dispatch(resetAuth());
                    console.log(error);
                }
            },
        }),
        signUp: builder.mutation<AuthResponse, SignUpBody>({
            query: (body) => ({ url: ENDPOINTS.signUp, method: METHODS.post, body }),
        }),
        forgotPassword: builder.mutation<AuthResponse, ForgotPasswordBody>({
            query: (body) => ({ url: ENDPOINTS.forgotPassword, method: METHODS.post, body }),
        }),
        verifyOtp: builder.mutation<AuthResponse, VerifyOtpBody>({
            query: (body) => ({ url: ENDPOINTS.checkVerificationCode, method: METHODS.post, body }),
        }),
        resetPassword: builder.mutation<AuthResponse, ResetPasswordBody>({
            query: (body) => ({ url: ENDPOINTS.resetCredentials, method: METHODS.post, body }),
        }),
        refreshToken: builder.mutation<AuthResponse, void>({
            query: () => ({
                url: ENDPOINTS.refreshToken,
                method: METHODS.get,
                credentials: 'include',
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { meta } = await queryFulfilled;

                    const accessToken = meta?.response?.headers.get(ACCESS_TOKEN_HEADER);

                    if (!accessToken) {
                        throw new Error(`There is no ${ACCESS_TOKEN_HEADER} in response`);
                    }

                    dispatch(setAccessToken(accessToken));
                } catch (error) {
                    dispatch(resetAuth());
                    console.log(error);
                }
            },
        }),

        checkAuth: builder.query<AuthResponse, void>({
            query: () => ({
                url: ENDPOINTS.checkAuth,
                method: METHODS.get,
                credentials: 'include',
            }),
        }),
    }),
});

export const {
    useSignInMutation,
    useSignUpMutation,
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
    useRefreshTokenMutation,
    useCheckAuthQuery,
} = authApi;
