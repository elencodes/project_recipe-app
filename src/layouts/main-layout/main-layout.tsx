import { lazy, Suspense } from 'react';

import { GlobalSpinner } from '~/components';
import { JUICIEST_PARAMS, NEWEST_PARAMS } from '~/query/constants/recipe-consts.ts';
import { useGetBlogsQuery } from '~/query/services/blogs/blogs-api';
import { useGetCategoriesQuery } from '~/query/services/categories/categories-api.ts';
import { useGetRecipesQuery } from '~/query/services/recipes/recipes-api.ts';
import { useGetMeasureUnitsQuery, useGetUserInfoQuery } from '~/query/services/user/user-api.ts';
import { useAppSelector } from '~/redux/hooks.ts';
import { selectAppLoading } from '~/redux/slices/app-slice.ts';
import { selectUserId } from '~/redux/slices/auth-slice';

const Layout = lazy(() => import('~/components/layout/layout/layout.tsx'));

export const MainLayout = () => {
    const isLoading = useAppSelector(selectAppLoading);
    const currentUserId = useAppSelector(selectUserId);
    const { isLoading: loadingCategory } = useGetCategoriesQuery();
    const { isLoading: loadingMeasure } = useGetMeasureUnitsQuery();
    const { isLoading: loadingNewest } = useGetRecipesQuery(NEWEST_PARAMS);
    const { isLoading: loadingJuiciest } = useGetRecipesQuery(JUICIEST_PARAMS);
    const { isLoading: loadingBloggers } = useGetBlogsQuery(
        {
            currentUserId,
            limit: '',
        },
        { refetchOnMountOrArgChange: true },
    );

    const { isLoading: loadingUser } = useGetUserInfoQuery();

    const showLoader =
        isLoading ||
        loadingCategory ||
        loadingNewest ||
        loadingJuiciest ||
        loadingMeasure ||
        loadingBloggers ||
        loadingUser;

    return (
        <>
            <GlobalSpinner isOpen={showLoader} />
            <Suspense fallback={<GlobalSpinner isOpen={true} />}>
                <Layout />
            </Suspense>
        </>
    );
};
