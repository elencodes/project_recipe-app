import { baseApi } from '~/query/base-api.ts';
import { ENDPOINTS } from '~/query/constants/endpoints.ts';
import { METHODS } from '~/query/constants/methods';
import { FileUploadResponse } from '~/query/services/file/types.ts';

export const fileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation<FileUploadResponse, FormData>({
            query: (formData) => ({
                url: ENDPOINTS.fileUpload,
                method: METHODS.post,
                body: formData,
            }),
        }),
    }),
});

export const { useUploadFileMutation } = fileApi;
