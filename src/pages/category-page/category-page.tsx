import { Button, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import {
    CategoryPageLayout,
    CategoryPreviewSection,
    CustomTabs,
    FilteredResultsSection,
    GlobalSpinner,
} from '~/components';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { FILTER_RECIPES_LIMIT } from '~/query/constants/recipe-consts.ts';
import { useGetRecipeByCategoryIdInfiniteQuery } from '~/query/services/recipes/recipes-api.ts';
import { useAppSelector } from '~/redux/hooks';
import { selectCategories, selectSubCategories } from '~/redux/slices/category-slice.ts';
import { selectFilteredRecipes } from '~/redux/slices/recipes-slice.ts';

const { SearchErrorToast } = TOAST_MESSAGES;

export const CategoryPage = () => {
    const { toast } = useCustomToast();
    const { category: categorySlug, subcategory: subcategorySlug } = useParams();
    const categories = useAppSelector(selectCategories);
    const subCategories = useAppSelector(selectSubCategories);
    const navigate = useNavigate();
    const category = categories.find((cat) => cat.category === categorySlug);
    const tabs = subCategories.filter((sub) => sub.rootCategoryId === category?._id);
    const subcategory = tabs.find((sub) => sub.category === subcategorySlug);
    const filteredRecipes = useAppSelector(selectFilteredRecipes);

    if (!category || !subcategory) {
        navigate(PATHS.NOT_FOUND);
    }

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching, isError } =
        useGetRecipeByCategoryIdInfiniteQuery(
            {
                id: subcategory?._id,
                limit: FILTER_RECIPES_LIMIT,
            },
            {
                refetchOnMountOrArgChange: true,
            },
        );

    const allRecipes = data?.pages.flatMap((page) => page.data) ?? [];
    const shouldShowLoadMoreButton = hasNextPage && !isLoading;

    useEffect(() => {
        if (isError) {
            toast(SearchErrorToast);
        }
    }, [isError, toast]);

    if (filteredRecipes.length) {
        return (
            <CategoryPageLayout title={category?.title} description={category?.description}>
                <FilteredResultsSection />
            </CategoryPageLayout>
        );
    }

    return (
        <>
            {isFetching && <GlobalSpinner isOpen={true} />}
            <CategoryPageLayout
                title={category?.title}
                description={category?.description ?? `Раздел: ${subcategory?.title}`}
            >
                <Flex flexDirection='column' gap={0} justifyContent='center' alignItems='center'>
                    <CustomTabs
                        tabs={tabs.map((tab) => ({
                            label: tab.title,
                            slug: tab.category,
                        }))}
                        recipes={allRecipes}
                    />

                    {shouldShowLoadMoreButton && (
                        <Button
                            bg='lime.400'
                            color='black'
                            mt={6}
                            onClick={() => fetchNextPage()}
                            isLoading={isFetchingNextPage}
                        >
                            Загрузить еще
                        </Button>
                    )}
                    <CategoryPreviewSection />
                </Flex>
            </CategoryPageLayout>
        </>
    );
};
