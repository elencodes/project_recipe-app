import { baseApi } from '~/query/base-api.ts';
import { ENDPOINTS } from '~/query/constants/endpoints.ts';
import { clearState, setCategories, setSubCategories } from '~/redux/slices/category-slice';
import { Category, CombinedCategoriesAndSubCategories, SubCategory } from '~/types/category-type';
import { LOCALSTORAGE_KEYS, setDataToLocalStorage } from '~/utils/manage-local-storage';

export const categoriesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => ENDPOINTS.category,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    const { categories, subCategories }: CombinedCategoriesAndSubCategories =
                        data.reduce(
                            (acc, curr) => {
                                if ('rootCategoryId' in curr) {
                                    acc.subCategories.push(curr as SubCategory);
                                } else {
                                    acc.categories.push(curr);
                                }
                                return acc;
                            },
                            {
                                categories: [],
                                subCategories: [],
                            } as CombinedCategoriesAndSubCategories,
                        );

                    dispatch(setCategories(categories));
                    dispatch(setSubCategories(subCategories));
                    setDataToLocalStorage(LOCALSTORAGE_KEYS.CATEGORIES, categories);
                    setDataToLocalStorage(LOCALSTORAGE_KEYS.SUBCATEGORIES, subCategories);
                } catch (error) {
                    dispatch(clearState());
                    console.error('Failed to fetch categories:', error);
                }
            },
        }),
    }),
});

export const { useGetCategoriesQuery } = categoriesApi;
